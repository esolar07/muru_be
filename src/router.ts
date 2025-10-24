import { Router } from 'express';
import categoriesRouter from './routes/categories';
import symptomsRouter from './routes/symptoms';
import quizRouter from './routes/quiz';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Muru API is running' });
});

// API Routes
router.use('/api/categories', categoriesRouter);
router.use('/api/symptoms', symptomsRouter);
router.use('/api/quiz', quizRouter);

export default router;
