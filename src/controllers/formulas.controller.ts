import { Request, Response } from 'express';
import { prisma } from '../lib/db';


export const getAllFormulas = async (req: Request, res: Response) => {
  try {
    const formulas = await prisma.formula.findMany({
      include: {
        symptomCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: formulas,
      count: formulas.length,
    });
  } catch (error) {
    console.error('Error fetching formulas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch formulas',
    });
  }
};


export const getFormulaById = async (req: Request, res: Response) => {
  try {
    const formulaId = parseInt(req.params.id);

    if (isNaN(formulaId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid formula ID',
      });
    }

    const formula = await prisma.formula.findUnique({
      where: { id: formulaId },
      include: {
        symptomCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!formula) {
      return res.status(404).json({
        success: false,
        error: 'Formula not found',
      });
    }

    res.json({
      success: true,
      data: formula,
    });
  } catch (error) {
    console.error('Error fetching formula:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch formula',
    });
  }
};


export const updateFormula = async (req: Request, res: Response) => {
  try {
    const formulaId = parseInt(req.params.id);

    if (isNaN(formulaId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid formula ID',
      });
    }

    const {
      name,
      name2,
      name3,
      name4,
      shortDescription,
      supports,
      specialDetails,
      extraDetails,
      symptomCategoryId,
    } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Name is required and must be a string',
      });
    }

    if (!name2 || typeof name2 !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Name 2 (English name) is required and must be a string',
      });
    }

    if (!name3 || typeof name3 !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Name 3 (Chinese/Pinyin name) is required and must be a string',
      });
    }

    const existingFormula = await prisma.formula.findUnique({
      where: { id: formulaId },
    });

    if (!existingFormula) {
      return res.status(404).json({
        success: false,
        error: 'Formula not found',
      });
    }

    if (name !== existingFormula.name) {
      const nameExists = await prisma.formula.findUnique({
        where: { name },
      });

      if (nameExists) {
        return res.status(409).json({
          success: false,
          error: 'A formula with this name already exists',
        });
      }
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

    const updatedFormula = await prisma.formula.update({
      where: { id: formulaId },
      data: {
        name,
        name2,
        name3,
        name4: name4 || '',
        shortDescription: shortDescription || '',
        supports: supports || '',
        specialDetails: specialDetails || '',
        extraDetails: extraDetails || '',
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
      data: updatedFormula,
    });
  } catch (error) {
    console.error('Error updating formula:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update formula',
    });
  }
};
