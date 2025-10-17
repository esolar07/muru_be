import express from 'express';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categories';
import symptomsRouter from './routes/symptoms';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Muru API is running' });
});

// API Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/symptoms', symptomsRouter);

app.listen(PORT, () => {
  console.log(`Muru API server running on port ${PORT}`);
});