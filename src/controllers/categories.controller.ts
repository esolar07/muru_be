import { Request, Response } from 'express';
import { prisma } from '../lib/db';


export const getAllCategories = async (req: Request, res: Response) => {
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
};


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category ID',
      });
    }

    const { name, details } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Name is required and must be a string',
      });
    }

    const existingCategory = await prisma.symptomCategory.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    if (name !== existingCategory.name) {
      const nameExists = await prisma.symptomCategory.findUnique({
        where: { name },
      });

      if (nameExists) {
        return res.status(409).json({
          success: false,
          error: 'A category with this name already exists',
        });
      }
    }

    const updatedCategory = await prisma.symptomCategory.update({
      where: { id: categoryId },
      data: {
        name,
        details: details || '',
      },
    });

    res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update category',
    });
  }
};
