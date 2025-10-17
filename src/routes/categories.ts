import { Router, Request, Response } from 'express';
import { prisma } from '../lib/db';

const router = Router();

// GET /api/categories - Get all symptom categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.symptomCategory.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
});

export default router;
