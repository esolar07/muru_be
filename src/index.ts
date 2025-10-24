import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Muru API server running on port ${PORT}`);
});