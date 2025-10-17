import { Router, Request, Response } from 'express';
import { prisma } from '../lib/db';

const router = Router();

// GET /api/symptoms?categoryIds=1,2,3 - Get symptoms grouped by category
router.get('/', async (req: Request, res: Response) => {
  try {
    const { categoryIds } = req.query;

    // Parse category IDs from query string
    let categoryIdArray: number[] = [];
    if (categoryIds) {
      if (typeof categoryIds === 'string') {
        categoryIdArray = categoryIds.split(',').map((id) => parseInt(id.trim(), 10)).filter((id) => !isNaN(id));
      }
    }

    // Build the where clause
    const whereClause = categoryIdArray.length > 0
      ? { symptomCategoryId: { in: categoryIdArray } }
      : {};

    // Fetch symptoms with their categories
    const symptoms = await prisma.symptom.findMany({
      where: whereClause,
      include: {
        symptomCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        symptomCategoryId: 'asc',
      },
    });

    // Group symptoms by category
    const groupedSymptoms = symptoms.reduce((acc, symptom) => {
      const categoryId = symptom.symptomCategoryId;
      const categoryName = symptom.symptomCategory.name;

      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          categoryName,
          symptoms: [],
        };
      }

      acc[categoryId].symptoms.push({
        id: symptom.id,
        highIndications: symptom.highIndications,
        lowIndications: symptom.lowIndications,
        createdAt: symptom.createdAt,
        updatedAt: symptom.updatedAt,
      });

      return acc;
    }, {} as Record<number, {
      categoryId: number;
      categoryName: string;
      symptoms: Array<{
        id: number;
        highIndications: any;
        lowIndications: any;
        createdAt: Date;
        updatedAt: Date;
      }>;
    }>);

    // Convert to array
    const result = Object.values(groupedSymptoms);

    res.json({
      success: true,
      data: result,
      count: result.length,
      totalSymptoms: symptoms.length,
    });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch symptoms',
    });
  }
});

export default router;
