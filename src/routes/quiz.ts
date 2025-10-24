import { Router, Request, Response } from 'express';
import { prisma } from '../lib/db';
import { randomUUID } from 'crypto';

const router = Router();

// POST /api/quiz/submit-symptoms - Store selected symptoms for a session
router.post('/submit-symptoms', async (req: Request, res: Response) => {
  try {
    const { sessionId, symptoms } = req.body;

    // Validation
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: symptoms array is required',
      });
    }

    // Validate each symptom entry
    for (const symptom of symptoms) {
      if (!symptom.categoryId || typeof symptom.categoryId !== 'number') {
        return res.status(400).json({
          success: false,
          error: 'Invalid request: each symptom must have a valid categoryId',
        });
      }
      if (!Array.isArray(symptom.selectedHighSymptoms) || !Array.isArray(symptom.selectedLowSymptoms)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request: selectedHighSymptoms and selectedLowSymptoms must be arrays',
        });
      }
    }

    let finalSessionId = sessionId;

    // If no sessionId provided, create a new session
    if (!finalSessionId) {
      finalSessionId = randomUUID();
      await prisma.quizSession.create({
        data: {
          sessionId: finalSessionId,
        },
      });
    } else {
      // Check if session exists, if not create it
      const existingSession = await prisma.quizSession.findUnique({
        where: { sessionId: finalSessionId },
      });

      if (!existingSession) {
        await prisma.quizSession.create({
          data: {
            sessionId: finalSessionId,
          },
        });
      }
    }

    // Store selected symptoms
    const createdSymptoms = await Promise.all(
      symptoms.map((symptom: {
        categoryId: number;
        selectedHighSymptoms: string[];
        selectedLowSymptoms: string[];
      }) =>
        prisma.selectedSymptom.create({
          data: {
            sessionId: finalSessionId,
            categoryId: symptom.categoryId,
            selectedHighSymptoms: symptom.selectedHighSymptoms,
            selectedLowSymptoms: symptom.selectedLowSymptoms,
          },
        })
      )
    );

    res.status(201).json({
      success: true,
      data: {
        sessionId: finalSessionId,
        symptomsStored: createdSymptoms.length,
        symptoms: createdSymptoms,
      },
    });
  } catch (error) {
    console.error('Error storing selected symptoms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to store selected symptoms',
    });
  }
});

// GET /api/quiz/session/:sessionId - Retrieve a quiz session with all selected symptoms
router.get('/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await prisma.quizSession.findUnique({
      where: { sessionId },
      include: {
        selectedSymptoms: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Error fetching quiz session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz session',
    });
  }
});

export default router;
