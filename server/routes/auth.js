// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// // POST /api/auth/register
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     const user = await User.create({ name, email, password });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ error: 'Invalid email or password' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;



import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Helper function to sign JWT tokens
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// ==========================================
// 🛡️ AUTHENTICATION MIDDLEWARE
// ==========================================
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from Bearer scheme
      token = req.headers.authorization.split(' ')[1];

      // Decode token to find payload id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from MongoDB and attach it to req.user (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

// ==========================================
// 📝 AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 🧠 PROFILE ROUTE ENDPOINT (PROTECTED)
// ==========================================

// GET /api/auth/profile/:id
router.get('/profile/:id', protect, async (req, res) => {
  try {
    // Resolve the intended target's ID
    const userId = req.params.id === 'me' ? req.user?._id : req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authorized, user ID missing' });
    }

    const userRecord = await User.findById(userId).select('-password');

    if (!userRecord) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Format payload cleanly for your React frontend layout structure
    res.json({
      name: userRecord.name,
      college: userRecord.college || 'Brainware University',
      specialization: userRecord.specialization || 'B.Tech CSE (AI & ML)',
      location: userRecord.location || 'Kolkata, India',
      streakCount: userRecord.currentStreak || 0,
      joinedDate: new Date(userRecord.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      // Calculate average score dynamically based on technical history records
      overallScore: userRecord.sessions && userRecord.sessions.length > 0
        ? Math.round(userRecord.sessions.reduce((acc, s) => acc + s.score, 0) / userRecord.sessions.length)
        : 0,
      topicScores: [
        {
          topic: 'Data Structures & Algorithms',
          score: userRecord.sessions?.filter(s => s.role.toLowerCase().includes('sde')).length > 0 ? 82 : 0,
          color: 'bg-cyan-500',
        },
        {
          topic: 'System Design',
          score: userRecord.sessions?.filter(s => s.topic.toLowerCase().includes('design')).length > 0 ? 76 : 0,
          color: 'bg-indigo-500',
        },
        {
          topic: 'Core Engineering Tracks',
          score: userRecord.sessions && userRecord.sessions.length > 0 ? 75 : 0,
          color: 'bg-emerald-500',
        },
      ],
      badges: userRecord.badges || [],
      sessions: userRecord.sessions || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;