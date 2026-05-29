<div align="center">

<img src="https://img.shields.io/badge/MockMentor-AI-6366f1?style=for-the-badge&logo=openai&logoColor=white" alt="MockMentor AI" />

# MockMentor AI

### AI-powered mock interview platform for placement preparation

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=flat-square&logo=vercel)](https://mockmentor-ai.vercel.app)

<br/>

**[Live Demo](https://mockmentor-ai.vercel.app)** • **[Report Bug](https://github.com/ayanpaul14/Mockmentor_AI/issues)** • **[Request Feature](https://github.com/ayanpaul14/Mockmentor_AI/issues)**

<br/>

![MockMentor AI Screenshot](https://via.placeholder.com/900x500/111111/ffffff?text=MockMentor+AI+—+Screenshot)

</div>

---

## What is MockMentor AI?

MockMentor AI is a full-stack interview preparation platform that helps students and developers practise real interview questions and receive instant AI-powered feedback. It evaluates your answers on three dimensions — **clarity**, **depth**, and **keyword coverage** — and shows you exactly what you missed, along with a model answer.

Built with the MERN stack and powered by LLaMA 3 (via Groq), it demonstrates real-world full-stack engineering including JWT authentication, AI integration, voice input, and data visualisation.

---

## Features

| Feature | Description |
|---|---|
| 🤖 **AI Evaluation** | Answers scored on clarity, depth, and keywords (0–10 each) using LLaMA 3.3-70B |
| 🎤 **Voice Input** | Browser-native Web Speech API — speak your answer like a real interview |
| 📊 **Progress Dashboard** | Score trend chart (Recharts AreaChart), session history, weakest topic detection |
| 💡 **Model Answers** | Ideal answer with side-by-side gap analysis after every question |
| 🔐 **JWT Authentication** | Secure register/login with bcrypt password hashing |
| 📱 **Fully Responsive** | Mobile-first design with Tailwind CSS |
| 🌐 **24+ Questions** | SDE, Data Analyst, Product Manager, DevOps — Fresher & Experienced levels |

---

## Tech stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS v3** for styling
- **React Router v6** for navigation
- **Recharts** for dashboard charts
- **Axios** for API calls with JWT interceptor
- **Web Speech API** for voice input

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Groq SDK** (LLaMA 3.3-70B) for AI evaluation

### Deployment
- **Vercel** — frontend
- **Render** — backend
- **MongoDB Atlas** — database (free M0 cluster)

---

## Project structure

```
mockmentor-ai/
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── api/                # Axios instance with auth interceptor
│       ├── components/         # Navbar, Footer, ScoreBar, VoiceInput
│       ├── context/            # AuthContext (global auth state)
│       └── pages/              # Landing, Login, Register, Home,
│                               # Interview, Feedback, Dashboard,
│                               # Help, Privacy, Terms
└── server/                     # Node.js backend
    ├── middleware/             # JWT auth middleware
    ├── models/                 # Mongoose schemas (User, Question, Session)
    ├── routes/                 # Express routes (auth, questions, evaluate, sessions)
    └── seed/                   # Question bank JSON + seed script
```

---

## Getting started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (free)
- Groq API key (free — [console.groq.com](https://console.groq.com))

### 1. Clone the repository

```bash
git clone https://github.com/ayanpaul14/Mockmentor_AI.git
cd Mockmentor_AI
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/mockmentor
JWT_SECRET=your_secret_key_here
GROQ_API_KEY=gsk_your_groq_key_here
CLIENT_URL=http://localhost:5173
PORT=5000
```

### 3. Seed the question bank

```bash
node seed/seed.js
# ✅ Connected to MongoDB
# 🌱 Seeded 24 questions successfully
```

### 4. Start the backend

```bash
npm run dev
# 🚀 Server running on port 5000
# ✅ MongoDB connected
```

### 5. Set up the frontend

```bash
cd ../client
npm install
npm run dev
# VITE ready → http://localhost:5173
```

Open `http://localhost:5173` in Chrome.

---

## API reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login + receive JWT |
| `GET` | `/api/questions?role=SDE&level=Fresher` | ✅ | Fetch random question |
| `POST` | `/api/evaluate` | ✅ | Submit answer for AI scoring |
| `GET` | `/api/sessions` | ✅ | Get session history + stats |
| `GET` | `/api/sessions/:id` | ✅ | Get single session detail |

### AI evaluation payload

```json
POST /api/evaluate
{
  "role": "SDE",
  "level": "Fresher",
  "topic": "Data Structures",
  "question": "Explain how a hash map works.",
  "candidateAnswer": "A hash map stores key-value pairs..."
}
```

### AI evaluation response

```json
{
  "success": true,
  "result": {
    "scores": {
      "clarity": 7,
      "depth": 5,
      "keywords": 6,
      "overall": 5.9
    },
    "missed_points": ["Did not mention collision handling", "No mention of load factor"],
    "strengths": ["Correctly explained key-value storage", "Mentioned O(1) lookup"],
    "model_answer": "A hash map stores key-value pairs using a hash function...",
    "one_line_verdict": "Good start — missed collision handling and load factor."
  }
}
```

---

## Deployment

### Backend → Render (free)

1. Go to [render.com](https://render.com) → New Web Service → Connect repo
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables (same as `.env` above)

### Frontend → Vercel (free)

1. Update `client/src/api/axios.js` → set `baseURL` to your Render URL
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Root directory: `client`
4. Deploy

---

## Screenshots

| Page | Preview |
|------|---------|
| Landing | ![Landing](https://via.placeholder.com/400x250/f5f2ec/111111?text=Landing+page) |
| Interview | ![Interview](https://via.placeholder.com/400x250/f5f2ec/111111?text=Interview+page) |
| Feedback | ![Feedback](https://via.placeholder.com/400x250/f5f2ec/111111?text=Feedback+page) |
| Dashboard | ![Dashboard](https://via.placeholder.com/400x250/f5f2ec/111111?text=Dashboard) |

> Replace the placeholders above with real screenshots after deployment.

---

## What I learned building this

- Designing and consuming a REST API with JWT-based authentication end-to-end
- **Prompt engineering** — structuring LLM prompts to return strict JSON schemas for structured UI rendering
- Building a real-time progress tracking system with MongoDB aggregation queries
- Integrating browser-native Web Speech API for voice input
- Deploying a split MERN app to two separate free hosting platforms (Vercel + Render)

---

## Roadmap

- [ ] Add coding round questions with in-browser code editor
- [ ] HR interview mode (behavioural questions)
- [ ] Streak system with daily reminders
- [ ] PDF report export of session history
- [ ] Leaderboard with college-based ranking

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a pull request
```

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built with ❤️ by **[Ayan Paul](https://github.com/ayanpaul14)** — for placement preparation

⭐ Star this repo if it helped you!

</div>