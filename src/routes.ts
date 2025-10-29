import { Router } from 'express';
import { getAllCategories, updateCategory } from './controllers/categories.controller';
import { getSymptoms, updateSymptom } from './controllers/symptoms.controller';
import { submitSymptoms, getSession } from './controllers/quiz.controller';
import { getAllFormulas, getFormulaById, updateFormula } from './controllers/formulas.controller';

const router = Router();

// ============================================
// Category Routes
// ============================================

router.get('/api/categories', getAllCategories);
router.put('/api/categories/:id', updateCategory);

// ============================================
// Symptom Routes
// ============================================

router.get('/api/symptoms', getSymptoms);
router.put('/api/symptoms/:id', updateSymptom);

// ============================================
// Formula Routes
// ============================================

router.get('/api/formulas', getAllFormulas);
router.get('/api/formulas/:id', getFormulaById);
router.put('/api/formulas/:id', updateFormula);

// ============================================
// Quiz Routes
// ============================================

router.post('/api/quiz/submit-symptoms', submitSymptoms);
router.get('/api/quiz/session/:sessionId', getSession);

export default router;
