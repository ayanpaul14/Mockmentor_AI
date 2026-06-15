<div align="center">

<img src="https://img.shields.io/badge/MockMentor-AI-6366f1?style=for-the-badge&logo=openai&logoColor=white" alt="MockMentor AI" />

# MockMentor AI

### AI-powered mock interview platform for placement preparation

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-f97316?style=flat-square&logo=meta)](https://groq.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=flat-square&logo=vercel)](https://mockmentor-ai.vercel.app)

<br/>

[**🚀 Live Demo**](https://mockmentor-ai.vercel.app) &nbsp;•&nbsp; [**🐛 Report Bug**](https://github.com/ayanpaul14/Mockmentor_AI/issues) &nbsp;•&nbsp; [**✨ Request Feature**](https://github.com/ayanpaul14/Mockmentor_AI/issues)

</div>

---

## What is MockMentor AI?

MockMentor AI is a full-stack interview preparation platform that helps students and developers practise real interview questions and receive instant AI-powered feedback. It evaluates your answers on three dimensions — **clarity**, **depth**, and **keyword coverage** — and shows you exactly what you missed, along with a model answer.

Built with the MERN stack and powered by **LLaMA 3.3-70B via Groq**, it demonstrates real-world full-stack engineering: JWT authentication, AI integration, Monaco code editor, voice input, activity heatmap, dark mode, and live data visualisation.

---

## Features

| Feature | Description |
|---|---|
| 🤖 **AI Evaluation** | Answers scored on clarity, depth, and keywords (0–10 each) using LLaMA 3.3-70B via Groq |
| 💻 **Coding Round** | Full Monaco Editor sandbox for writing and submitting code solutions in-browser |
| 🎤 **Voice Input** | Browser-native Web Speech API — speak your answer like a real interview |
| 📊 **Progress Dashboard** | Score trend chart, session history table, weakest topic detection |
| 🗓️ **Activity Heatmap** | GitHub-style 24-week contribution heatmap showing your practice streak |
| 🍩 **Topic Breakdown** | Donut rings showing Easy / Medium / Hard distribution across sessions |
| 🌙 **Dark / Light Mode** | Full dark mode across every page, persisted in localStorage |
| 💡 **Model Answers** | Ideal answer with side-by-side gap analysis after every submission |
| 🔐 **JWT Authentication** | Secure register/login with bcrypt password hashing |
| 🔥 **Streak Tracking** | Daily practice streak calculated and displayed on the profile page |
| 📱 **Fully Responsive** | Mobile-first design — works on all screen sizes |
| 🧠 **3D Brain Background** | Interactive Three.js anatomical brain on the landing page |
| 💬 **Floating Help Button** | Context-aware help button visible across all pages |
| 📋 **LeetCode-style Profile** | Submission history, topic bars, donut rings, heatmap — all in one profile |
| 🌐 **30+ Questions** | SDE, Data Analyst, Product Manager, DevOps, Coding Round — Fresher & Experienced |

---

## Pages

| Page | Description |
|---|---|
| `/` | Landing page with 3D brain, feature cards, testimonials, and CTA |
| `/register` | Account creation |
| `/login` | JWT login |
| `/home` | Role + level selector to start a practice session |
| `/interview` | Text + voice answer submission with live AI feedback |
| `/coding-round` | Monaco Editor coding environment with AI code audit |
| `/dashboard` | Analytics — score trend, stat cards, session history |
| `/profile` | LeetCode-style profile — heatmap, donut rings, submission table |
| `/feedback` | Detailed post-session breakdown with model answer |
| `/help` | FAQ accordion with quick links |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

---

## Tech stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS v3** — dark mode via `class` strategy
- **React Router v6** — client-side routing
- **Recharts** — AreaChart for score trends
- **Three.js** — 3D interactive brain on landing page
- **Monaco Editor** (`@monaco-editor/react`) — in-browser code editor
- **Axios** — API calls with JWT Authorization header
- **Web Speech API** — browser-native voice input

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JWT** (`jsonwebtoken`) — stateless auth
- **bcryptjs** — password hashing
- **Groq SDK** — LLaMA 3.3-70B for AI evaluation
- **dotenv**, **cors**, **express-async-handler**

### Deployment
- **Vercel** — frontend (auto-deploy on push)
- **Render** — backend (Node.js web service)
- **MongoDB Atlas** — M0 free cluster

---

## Project structure

```
mockmentor-ai/
├── client/                         # React frontend (Vite)
│   └── src/
│       ├── api/
│       │   └── axios.js            # Axios instance with baseURL
│       ├── components/
│       │   ├── Navbar.jsx          # Sticky navbar with dark mode toggle
│       │   ├── Footer.jsx          # Multi-column footer with route links
│       │   ├── ScoreBar.jsx        # Animated score progress bar
│       │   └── VoiceInput.jsx      # Web Speech API component
│       ├── context/
│       │   └── AuthContext.jsx     # Global auth state (user, login, logout)
│       ├── pages/
│       │   ├── Landing.jsx         # Hero + Three.js brain + features + CTA
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Home.jsx            # Role + level selector
│       │   ├── Interview.jsx       # Text/voice answer + AI feedback
│       │   ├── CodingRound.jsx     # Monaco Editor + AI code audit
│       │   ├── Feedback.jsx        # Full session breakdown
│       │   ├── Dashboard.jsx       # Analytics charts + session table
│       │   ├── Profile.jsx         # Heatmap + donuts + submission history
│       │   ├── Help.jsx            # FAQ accordion
│       │   ├── Privacy.jsx
│       │   └── Terms.jsx
│       └── App.jsx                 # Routes + ThemeProvider + FloatingHelp
└── server/                         # Node.js backend
    ├── middleware/
    │   └── auth.js                 # JWT protect middleware
    ├── models/
    │   ├── User.js                 # name, email, password, streak fields
    │   ├── Question.js             # role, level, topic, question
    │   └── Session.js              # userId, scores, strengths, missed_points
    ├── routes/
    │   ├── auth.js                 # POST /register, POST /login
    │   ├── questions.js            # GET /questions?role=&level=
    │   ├── evaluate.js             # POST /evaluate → Groq AI → save session
    │   └── sessions.js             # GET /sessions, GET /sessions/:id
    └── seed/
        ├── questions.json          # 30+ question bank
        └── seed.js                 # DB seeder script
```

---

## Getting started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (free) — [mongodb.com/atlas](https://mongodb.com/atlas)
- Groq API key (free) — [console.groq.com](https://console.groq.com)

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
# 🌱 Seeded 30+ questions successfully
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

Open `http://localhost:5173` in **Chrome** (required for voice input).

---

## API reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT |
| `GET` | `/api/questions?role=SDE&level=Fresher` | ✅ | Fetch random question |
| `POST` | `/api/evaluate` | ✅ | Submit answer for AI scoring + save session |
| `GET` | `/api/sessions` | ✅ | Get full session history + computed stats |
| `GET` | `/api/sessions/:id` | ✅ | Get single session detail |

### Evaluate request

```json
POST /api/evaluate
Authorization: Bearer <token>

{
  "role": "SDE",
  "level": "Fresher",
  "topic": "Data Structures",
  "question": "Explain how a hash map works.",
  "candidateAnswer": "A hash map stores key-value pairs using a hash function..."
}
```

### Evaluate response

```json
{
  "success": true,
  "result": {
    "scores": { "clarity": 7, "depth": 5, "keywords": 6, "overall": 5.9 },
    "missed_points": ["collision handling", "load factor", "amortized complexity"],
    "strengths": ["Correctly explained key-value storage", "Mentioned O(1) lookup"],
    "model_answer": "A hash map stores key-value pairs using a hash function to compute an index...",
    "one_line_verdict": "Good start — missed collision handling and load factor."
  },
  "streak": { "current": 3, "longest": 5, "isNewDay": true }
}
```

### Sessions response

```json
GET /api/sessions
Authorization: Bearer <token>

{
  "sessions": [ { "_id": "...", "topic": "OS", "scores": { "overall": 7.2 }, ... } ],
  "stats": { "total": 21, "avgScore": "5.8", "weakestTopic": "Networking" }
}
```

---

## Deployment

### Backend → Render

1. [render.com](https://render.com) → New Web Service → connect GitHub repo
2. Root directory: `server`
3. Build: `npm install` · Start: `npm start`
4. Add all `.env` variables in the Render environment panel

### Frontend → Vercel

1. Update `client/src/api/axios.js` → set `baseURL` to your Render backend URL
2. [vercel.com](https://vercel.com) → Import repo → Root directory: `client`
3. Deploy — Vercel auto-deploys on every `git push origin main`

---

## What I learned building this

- Designing and consuming a REST API with JWT-based authentication end-to-end
- **Prompt engineering** — structuring LLM system prompts to return strict JSON schemas for structured UI rendering
- Building a real-time progress tracking system with MongoDB session aggregation
- Integrating **Three.js** into a React component for a 3D interactive landing experience
- Implementing **Monaco Editor** for a full in-browser coding environment
- Building a **GitHub-style activity heatmap** from raw session timestamps
- Full **dark mode** architecture using Tailwind's `class` strategy with React context + localStorage persistence
- Deploying a split MERN app across Vercel + Render + MongoDB Atlas

---

## Roadmap

- [x] Coding round with Monaco Editor
- [x] Dark / light mode toggle
- [x] Activity heatmap on profile
- [x] LeetCode-style profile page
- [x] Streak tracking
- [ ] HR interview mode (behavioural questions)
- [ ] PDF report export of session history
- [ ] Leaderboard with college-based ranking
- [ ] Email reminders for daily practice
- [ ] Multi-language code editor support

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
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

Built with ❤️ by **[Ayan Paul](https://github.com/ayanpaul14)**

⭐ **Star this repo if it helped you prepare for your interviews!**

</div>
