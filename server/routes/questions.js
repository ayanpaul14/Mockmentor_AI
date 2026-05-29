import express from 'express';
import Question from '../models/Question.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/questions?role=SDE&level=Fresher
// Returns one random question matching the filters
router.get('/', protect, async (req, res) => {
  const { role, level } = req.query;

  if (!role || !level) {
    return res.status(400).json({ error: 'role and level are required' });
  }

  try {
    const questions = await Question.find({ role, level });

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ error: 'No questions found for this role and level' });
    }

    // Pick a random question from the results
    const random = questions[Math.floor(Math.random() * questions.length)];
    res.json(random);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/questions/all — see all questions (useful for testing)
router.get('/all', protect, async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;