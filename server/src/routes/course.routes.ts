import { Router, Response } from 'express';
import Course, { CourseStatus, CourseLevel } from '../models/Course';
import Video from '../models/Video';
import User, { UserRole } from '../models/User';
import Category from '../models/Category';
import Enrollment, { EnrollmentStatus } from '../models/Enrollment';
import { authenticateToken, requireInstructor, AuthRequest } from '../middleware/auth.middleware';
import { uploadCourseFiles } from '../middleware/upload.middleware';

const router = Router();

// Get all published courses
router.get('/', async (req: any, res: Response) => {
  try {
    const { category, level, search, page = 1, limit = 12 } = req.query;
    
    const where: any = { status: CourseStatus.PUBLISHED };
    
    if (category) {
      where.categoryId = category;
    }
    if (level) {
      where.level = level;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: courses } = await Course.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get courses'
    });
  }
});

// Get course by ID with videos
router.get('/:id', async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'firstName', 'lastName', 'avatar', 'bio']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: Video,
          as: 'videos',
          order: [['order', 'ASC']]
        }
      ]
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error: any) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get course'
    });
  }
});

// Create course (instructor/admin only)
router.post('/', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      shortDescription,
      thumbnail,
      price,
      discountPrice,
      categoryId,
      level,
      requirements,
      whatYouWillLearn
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const course = await Course.create({
      title,
      description,
      shortDescription,
      thumbnail,
      price: price || 0,
      discountPrice,
      instructorId: req.user!.userId,
      categoryId,
      level: level || CourseLevel.BEGINNER,
      status: CourseStatus.DRAFT,
      requirements,
      whatYouWillLearn
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error: any) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create course'
    });
  }
});

// Update course
router.put('/:id', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership (unless admin)
    if (course.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    // Update fields
    Object.keys(updates).forEach(key => {
      if (key !== 'id' && key !== 'instructorId') {
        (course as any)[key] = updates[key];
      }
    });

    await course.save();

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error: any) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update course'
    });
  }
});

// Delete course
router.delete('/:id', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership (unless admin)
    if (course.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    // Soft delete by archiving
    course.status = CourseStatus.ARCHIVED;
    await course.save();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete course'
    });
  }
});

// Add video to course
router.post('/:id/videos', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, videoUrl, thumbnail, duration, order, isFree } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add videos to this course'
      });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      duration,
      courseId: Number(id),
      order: order || 0,
      isFree: isFree || false
    });

    // Update course video count
    const videoCount = await Video.count({ where: { courseId: id } });
    course.totalLessons = videoCount;
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Video added successfully',
      data: video
    });
  } catch (error: any) {
    console.error('Add video error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add video'
    });
  }
});

// Enroll in course
router.post('/:id/enroll', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: {
        userId: req.user!.userId,
        courseId: Number(id)
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create({
      userId: req.user!.userId,
      courseId: Number(id),
      status: EnrollmentStatus.ACTIVE,
      progress: 0
    });

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error: any) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to enroll'
    });
  }
});

// Get instructor's courses
router.get('/instructor/:instructorId', async (req: any, res: Response) => {
  try {
    const { instructorId } = req.params;
    const { status, page = 1, limit = 12 } = req.query;

    const where: any = { instructorId };
    if (status) {
      where.status = status;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: courses } = await Course.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get instructor courses error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get courses'
    });
  }
});

export default router;
