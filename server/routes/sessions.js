import express from 'express';
import Session from '../models/Session.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/sessions — get all sessions for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    // Build dashboard stats
    const total = sessions.length;
    const avgScore =
      total > 0
        ? (sessions.reduce((sum, s) => sum + (s.scores?.overall || 0), 0) / total).toFixed(1)
        : 0;

    // Find weakest topic
    const topicScores = {};
    sessions.forEach((s) => {
      if (!topicScores[s.topic]) topicScores[s.topic] = { total: 0, count: 0 };
      topicScores[s.topic].total += s.scores?.overall || 0;
      topicScores[s.topic].count += 1;
    });

    let weakestTopic = 'N/A';
    let lowestAvg = Infinity;
    Object.entries(topicScores).forEach(([topic, data]) => {
      const avg = data.total / data.count;
      if (avg < lowestAvg) {
        lowestAvg = avg;
        weakestTopic = topic;
      }
    });

    res.json({
      sessions,
      stats: { total, avgScore, weakestTopic },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sessions/:id — get single session detail
router.get('/:id', protect, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;