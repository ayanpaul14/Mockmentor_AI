import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';
import Session from '../models/Session.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are MockMentor, a strict but fair technical interview evaluator.

Evaluate the candidate's answer and return ONLY a valid JSON object. No markdown fences, no explanation, no extra text — just raw JSON.

Scoring rules:
- clarity: How well-structured and articulate is the answer? (0-10)
- depth: Does the answer go beyond surface-level? (0-10)  
- keywords: How many expected technical concepts were covered? (0-10)
- overall: (clarity x 0.25) + (depth x 0.40) + (keywords x 0.35), rounded to 1 decimal

Be honest. Weak answers score 3-4. Reserve 9-10 for exceptional answers only.

Return ONLY this exact JSON structure:
{
  "scores": { "clarity": 0, "depth": 0, "keywords": 0, "overall": 0.0 },
  "missed_points": ["point 1", "point 2"],
  "strengths": ["strength 1", "strength 2"],
  "model_answer": "3-5 sentence ideal answer here",
  "one_line_verdict": "max 12 words verdict here"
}`;

const buildPrompt = (role, level, topic, question, answer) => `
Role: ${role}
Level: ${level}
Topic: ${topic}

Interview question: "${question}"

Candidate's answer: "${answer}"

Evaluate strictly and return only the JSON object.`;

router.post('/', protect, async (req, res) => {
  const { role, level, topic, question, candidateAnswer } = req.body;

  if (!role || !level || !topic || !question || !candidateAnswer) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const trimmed = candidateAnswer.slice(0, 800);

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: buildPrompt(role, level, topic, question, trimmed) },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content || '';

    let result;
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      result = JSON.parse(cleaned);
    } catch {
      console.error('JSON parse failed. Raw:', raw);
      return res.status(500).json({ error: 'AI returned invalid format. Try again.' });
    }

    await Session.create({
  userId: req.user._id,
  role, level, topic, question,
  candidateAnswer: trimmed,
  scores:       result.scores,
  missedPoints: result.missed_points,
  strengths:    result.strengths,
  modelAnswer:  result.model_answer,
  verdict:      result.one_line_verdict,
});

// ── Streak calculation ──
const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
const user  = await User.findById(req.user._id);

if (user.lastSessionDate === today) {
  // Already practised today — no change
} else if (user.lastSessionDate === getPreviousDay(today)) {
  // Practised yesterday — extend streak
  user.currentStreak  += 1;
  user.longestStreak   = Math.max(user.longestStreak, user.currentStreak);
} else {
  // Missed a day or first ever session — reset
  user.currentStreak  = 1;
  user.longestStreak  = Math.max(user.longestStreak, 1);
}

user.lastSessionDate = today;
await user.save();

res.json({
  success: true,
  result,
  streak: {
    current: user.currentStreak,
    longest: user.longestStreak,
    isNewDay: user.lastSessionDate !== today,
  }
});
  } catch (err) {
    console.error('Evaluation error:', err.message);
    res.status(500).json({ error: 'Evaluation failed. Please try again.' });
  }
});

export default router;