import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';
import Session from '../models/Session.js';
import User from '../models/User.js'; 
import { protect } from '../middleware/auth.js';

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getPreviousDay = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

const BASE_SYSTEM_PROMPT = `You are MockMentor, a strict but fair technical interview evaluator.

Evaluate the candidate's submission and return ONLY a valid JSON object. No markdown fences, no explanations, no extra text — just raw JSON.

Scoring rules:
- clarity: How well-structured, clear, and cleanly formulated is the answer? (0-10)
- depth: Does the answer go deep into core technical mechanics beyond surface level? (0-10)  
- keywords: How many core technical terms, tools, or expected concepts were properly covered? (0-10)
- overall: (clarity x 0.25) + (depth x 0.40) + (keywords x 0.35), rounded to 1 decimal

Be honest. Weak or generic answers score 3-4. Reserve 9-10 for truly exceptional answers only.`;

const JSON_SCHEMA_PROMPT = `\nReturn ONLY this exact JSON structure:
{
  "scores": { "clarity": 0, "depth": 0, "keywords": 0, "overall": 0.0 },
  "missed_points": ["point 1", "point 2"],
  "strengths": ["strength 1", "strength 2"],
  "model_answer": "Provide the ideal solution here (For code rounds, provide clean, optimal, well-commented code solution blocks here)",
  "one_line_verdict": "max 12 words verdict here"
}`;

const buildPrompt = (role, level, topic, question, answer) => `
Role: ${role}
Level: ${level}
Topic: ${topic}

Interview question/problem: "${question}"

Candidate's submission/implementation: "${answer}"

Evaluate strictly and return only the specified JSON object.`;

router.post('/', protect, async (req, res) => {
  const { role, level, topic, question, candidateAnswer } = req.body;

  if (!role || !level || !topic || !question || !candidateAnswer) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const trimmed = candidateAnswer.slice(0, 800);
  let activeSystemPrompt = BASE_SYSTEM_PROMPT + JSON_SCHEMA_PROMPT;

  if (role === 'Coding Round') {
    activeSystemPrompt = `You are MockMentor, an elite competitive programming judge and strict technical software evaluator.
    
    Evaluate the candidate's raw code submission. Check for edge cases, clean language patterns, semantic compilation health, execution optimizations, and code robustness.
    
    Scoring rules for Coding:
    - clarity: Variable naming consistency, clean indentations, syntax accuracy, and formatting. (0-10)
    - depth: Algorithmic optimization, awareness of Time and Space complexity (Big-O analysis), and handling of dangerous edge cases. (0-10)
    - keywords: Selection and correct utilization of optimal data structures (e.g., Arrays, HashMaps, Two-Pointers, Trees) and appropriate built-in language APIs. (0-10)
    - overall: (clarity x 0.25) + (depth x 0.40) + (keywords x 0.35), rounded to 1 decimal

    CRITICAL CODE REQUIREMENT: In the "model_answer" JSON parameter field, you MUST provide the fully optimized, production-grade, well-commented code snippet solution that solves the given problem statement perfectly. Send it as a clean text string inside the JSON property. Do not write markdown blocks inside markdown blocks.

    ` + JSON_SCHEMA_PROMPT;
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: activeSystemPrompt },
        { role: 'user',   content: buildPrompt(role, level, topic, typeof question === 'object' ? question.question : question, trimmed) },
      ],
      temperature: 0.2,
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
      role, level, topic, question: typeof question === 'object' ? question.question : question,
      candidateAnswer: trimmed,
      scores:       result.scores,
      missedPoints: result.missed_points,
      strengths:    result.strengths,
      modelAnswer:  result.model_answer,
      verdict:      result.one_line_verdict,
    });

    // ── Streak calculation ──
    const today = new Date().toISOString().split('T')[0]; 
    const user  = await User.findById(req.user._id);

    if (user.lastSessionDate === today) {
      // Already practiced today
    } else if (user.lastSessionDate === getPreviousDay(today)) {
      user.currentStreak  += 1;
      user.longestStreak   = Math.max(user.longestStreak, user.currentStreak);
    } else {
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