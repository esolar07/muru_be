import { Router } from 'express';
import routes from './routes';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Muru API is running' });
});

// All API Routes
router.use(routes);

export default router;
