import { Router, Response } from 'express';
import User, { UserRole } from '../models/User';
import Enrollment from '../models/Enrollment';
import Purchase from '../models/Purchase';
import Course from '../models/Course';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    
    const where: any = {};
    if (role) {
      where.role = role;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get users'
    });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get user'
    });
  }
});

// Get user's enrolled courses
router.get('/:id/enrollments', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Only allow users to view their own enrollments or admin
    if (req.user?.userId !== Number(id) && req.user?.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these enrollments'
      });
    }

    const enrollments = await Enrollment.findAll({
      where: { userId: id },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: User,
              as: 'instructor',
              attributes: ['id', 'firstName', 'lastName', 'avatar']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error: any) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get enrollments'
    });
  }
});

// Get user's purchases
router.get('/:id/purchases', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Only allow users to view their own purchases or admin
    if (req.user?.userId !== Number(id) && req.user?.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these purchases'
      });
    }

    const purchases = await Purchase.findAll({
      where: { userId: id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: purchases
    });
  } catch (error: any) {
    console.error('Get purchases error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get purchases'
    });
  }
});

// Update user (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role, isActive, phone, bio } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user.toSafeObject()
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user'
    });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete by deactivating
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete user'
    });
  }
});

export default router;
