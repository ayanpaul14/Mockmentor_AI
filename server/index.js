import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import evaluateRoutes from './routes/evaluate.js';
import sessionRoutes from './routes/sessions.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/evaluate', evaluateRoutes);
app.use('/api/sessions', sessionRoutes);

app.get('/', (req, res) => res.json({ message: 'MockMentor API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));