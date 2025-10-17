import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Muru API is running' });
});

app.listen(PORT, () => {
  console.log(`Muru API server running on port ${PORT}`);
});