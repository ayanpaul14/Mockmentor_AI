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

// Whitelist configuration array handles dev ports, staging links, and main lines
const allowedOrigins = [
  'https://mockmentor-ai.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Permit background test tools or standalone extensions lacking origin headers (like Postman or curl)
    if (!origin) return callback(null, true);
    
    // Evaluate if the origin matches production, development ports, or any vercel branch preview patterns
    const isAllowed = allowedOrigins.includes(origin) || 
                      /^https:\/\/mockmentor-.*-ayanpaul14s-projects\.vercel\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Cross-Origin Request Blocked by App CORS Framework Layer'));
    }
  },
  credentials: true
}));

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