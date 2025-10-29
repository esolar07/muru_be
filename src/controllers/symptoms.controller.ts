import { Request, Response } from 'express';
import { prisma } from '../lib/db';


export const getSymptoms = async (req: Request, res: Response) => {
  try {
    const { categoryIds } = req.query;

    let categoryIdArray: number[] = [];
    if (categoryIds) {
      if (typeof categoryIds === 'string') {
        categoryIdArray = categoryIds.split(',').map((id) => parseInt(id.trim(), 10)).filter((id) => !isNaN(id));
      }
    }

    const whereClause = categoryIdArray.length > 0
      ? { symptomCategoryId: { in: categoryIdArray } }
      : {};

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
};

export const updateSymptom = async (req: Request, res: Response) => {
  try {
    const symptomId = parseInt(req.params.id);

    if (isNaN(symptomId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid symptom ID',
      });
    }

    const { highIndications, lowIndications, symptomCategoryId } = req.body;

    if (!Array.isArray(highIndications) || !Array.isArray(lowIndications)) {
      return res.status(400).json({
        success: false,
        error: 'highIndications and lowIndications must be arrays',
      });
    }

    const existingSymptom = await prisma.symptom.findUnique({
      where: { id: symptomId },
    });

    if (!existingSymptom) {
      return res.status(404).json({
        success: false,
        error: 'Symptom not found',
      });
    }

    if (symptomCategoryId !== undefined) {
      const categoryExists = await prisma.symptomCategory.findUnique({
        where: { id: symptomCategoryId },
      });

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          error: 'Invalid symptom category ID',
        });
      }
    }

    const updatedSymptom = await prisma.symptom.update({
      where: { id: symptomId },
      data: {
        highIndications,
        lowIndications,
        ...(symptomCategoryId !== undefined && { symptomCategoryId }),
      },
      include: {
        symptomCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: updatedSymptom,
    });
  } catch (error) {
    console.error('Error updating symptom:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update symptom',
    });
  }
};
