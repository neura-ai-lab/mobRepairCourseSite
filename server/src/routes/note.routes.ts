import { Router, Response } from 'express';
import Note, { NoteStatus } from '../models/Note';
import User, { UserRole } from '../models/User';
import Category from '../models/Category';
import Purchase from '../models/Purchase';
import { authenticateToken, requireInstructor, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Get all published notes
router.get('/', async (req: any, res: Response) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    const where: any = { status: NoteStatus.PUBLISHED };
    
    if (category) {
      where.categoryId = category;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: notes } = await Note.findAndCountAll({
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
        notes,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get notes'
    });
  }
});

// Get note by ID
router.get('/:id', async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id, {
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
        }
      ]
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error: any) {
    console.error('Get note error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get note'
    });
  }
});

// Create note (instructor/admin only)
router.post('/', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      fileUrl,
      thumbnail,
      price,
      discountPrice,
      categoryId,
      pages,
      fileSize
    } = req.body;

    if (!title || !description || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and file URL are required'
      });
    }

    const note = await Note.create({
      title,
      description,
      fileUrl,
      thumbnail,
      price: price || 0,
      discountPrice,
      instructorId: req.user!.userId,
      categoryId,
      status: NoteStatus.DRAFT,
      pages,
      fileSize,
      downloads: 0
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error: any) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create note'
    });
  }
});

// Update note
router.put('/:id', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check ownership (unless admin)
    if (note.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this note'
      });
    }

    // Update fields
    Object.keys(updates).forEach(key => {
      if (key !== 'id' && key !== 'instructorId') {
        (note as any)[key] = updates[key];
      }
    });

    await note.save();

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error: any) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update note'
    });
  }
});

// Delete note
router.delete('/:id', authenticateToken, requireInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check ownership (unless admin)
    if (note.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note'
      });
    }

    // Soft delete by archiving
    note.status = NoteStatus.ARCHIVED;
    await note.save();

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete note'
    });
  }
});

// Purchase note
router.post('/:id/purchase', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { paymentMethod, transactionId } = req.body;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if already purchased
    const existingPurchase = await Purchase.findOne({
      where: {
        userId: req.user!.userId,
        itemType: 'note',
        itemId: Number(id)
      }
    });

    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: 'Already purchased this note'
      });
    }

    const purchase = await Purchase.create({
      userId: req.user!.userId,
      itemType: 'note',
      itemId: Number(id),
      amount: note.discountPrice || note.price,
      paymentMethod,
      transactionId
    });

    // Increment download count
    note.downloads += 1;
    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note purchased successfully',
      data: purchase
    });
  } catch (error: any) {
    console.error('Purchase error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to purchase'
    });
  }
});

// Download note (must be purchased or free)
router.get('/:id/download', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if free or purchased
    if (note.price > 0) {
      const purchase = await Purchase.findOne({
        where: {
          userId: req.user!.userId,
          itemType: 'note',
          itemId: Number(id)
        }
      });

      if (!purchase && note.instructorId !== req.user!.userId && req.user!.role !== UserRole.ADMIN) {
        return res.status(403).json({
          success: false,
          message: 'Please purchase this note to download'
        });
      }
    }

    res.json({
      success: true,
      data: {
        downloadUrl: note.fileUrl
      }
    });
  } catch (error: any) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get download link'
    });
  }
});

// Get instructor's notes
router.get('/instructor/:instructorId', async (req: any, res: Response) => {
  try {
    const { instructorId } = req.params;
    const { status, page = 1, limit = 12 } = req.query;

    const where: any = { instructorId };
    if (status) {
      where.status = status;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: notes } = await Note.findAndCountAll({
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
        notes,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get instructor notes error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get notes'
    });
  }
});

export default router;
