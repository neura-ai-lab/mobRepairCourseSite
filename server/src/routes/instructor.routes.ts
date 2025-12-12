import { Router, Response } from 'express';
import Course from '../models/Course';
import Note from '../models/Note';
import Enrollment from '../models/Enrollment';
import Purchase from '../models/Purchase';
import User from '../models/User';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Instructor dashboard stats
router.get('/:id/dashboard', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Only allow instructor themselves or admin
    if (req.user?.userId !== Number(id) && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const courses = await Course.findAll({ where: { instructorId: id } });
    const notes = await Note.findAll({ where: { instructorId: id } });

    const courseIds = courses.map(c => c.id);
    const noteIds = notes.map(n => n.id);

    const totalPublishedCourses = courses.filter(c => c.status === 'published').length;
    const totalPublishedNotes = notes.filter(n => n.status === 'published').length;

    // Total students: count unique users enrolled across these courses
    let totalStudents = 0;
    if (courseIds.length) {
      const enrollments = await Enrollment.findAll({ where: { courseId: courseIds } });
      const unique = new Set(enrollments.map(e => e.userId));
      totalStudents = unique.size;
    }

    // Revenue: sum purchases for courseIds and noteIds
    let totalEarnings = 0;
    const purchasesWhere: any = { };
    const Op = (require('sequelize') as any).Op;
    purchasesWhere[Op.or] = [];
    if (courseIds.length) purchasesWhere[Op.or].push({ itemType: 'course', itemId: courseIds });
    if (noteIds.length) purchasesWhere[Op.or].push({ itemType: 'note', itemId: noteIds });

    if (purchasesWhere[Op.or].length) {
      const purchases = await Purchase.findAll({ where: purchasesWhere, order: [['createdAt','DESC']], limit: 20 });
      totalEarnings = purchases.reduce((s, p: any) => s + Number(p.amount || 0), 0);

      // Attach purchaser info for recent purchases
      const recentPurchases = await Promise.all(purchases.map(async (p: any) => {
        const user = await User.findByPk(p.userId);
        return {
          id: p.id,
          student: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Student',
          itemType: p.itemType,
          itemId: p.itemId,
          amount: Number(p.amount || 0),
          date: p.createdAt
        };
      }));

      return res.json({
        success: true,
        data: {
          totalEarnings,
          totalStudents,
          totalPublishedCourses,
          totalPublishedNotes,
          courses,
          notes,
          recentPurchases
        }
      });
    }

    // No purchases
    res.json({
      success: true,
      data: {
        totalEarnings: 0,
        totalStudents,
        totalPublishedCourses,
        totalPublishedNotes,
        courses,
        notes,
        recentPurchases: []
      }
    });
  } catch (error: any) {
    console.error('Instructor dashboard error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to get dashboard' });
  }
});

export default router;
