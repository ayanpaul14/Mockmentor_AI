import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Footer from '../components/Footer';

const ROLES = [
  { id: 'SDE',             icon: '💻', desc: 'Software Development Engineer',       color: '#eef2ff', border: '#c7d2fe', darkColor: '#1e1b4b', darkBorder: '#3730a3' },
  { id: 'Data Analyst',    icon: '📊', desc: 'Data & Business Analytics',           color: '#f0fdf4', border: '#bbf7d0', darkColor: '#052e16', darkBorder: '#166534' },
  { id: 'Product Manager', icon: '🎯', desc: 'Product Strategy & Roadmap',          color: '#fff7ed', border: '#fed7aa', darkColor: '#431407', darkBorder: '#9a3412' },
  { id: 'DevOps',          icon: '⚙️',  desc: 'Infrastructure & CI/CD',             color: '#fdf4ff', border: '#e9d5ff', darkColor: '#2e1065', darkBorder: '#7e22ce' },
  { id: 'Coding Round',    icon: '⚡',  desc: 'Data Structures, Algorithms & Logic', color: '#fffdf5', border: '#fef08a', darkColor: '#422006', darkBorder: '#a16207' },
];

const LEVELS = [
  { id: 'Fresher',     icon: '🌱', desc: '0 – 1 year experience', color: '#f0fdf4', border: '#bbf7d0', darkColor: '#052e16', darkBorder: '#166534' },
  { id: 'Experienced', icon: '🚀', desc: '2+ years experience',   color: '#eff6ff', border: '#bfdbfe', darkColor: '#172554', darkBorder: '#1d4ed8' },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role, setRole]       = useState('');
  const [level, setLevel]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleStart = async () => {
    if (!role || !level) return setError('Please select both a role and experience level.');
    setError(''); setLoading(true);
    if (role === 'Coding Round') {
      const fallbackQuestionData = { topic: 'Arrays', question: 'Two Sum:\n\nGiven an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]' };
      setLoading(false);
      navigate('/coding-round', { state: { role, level, question: fallbackQuestionData } });
      return;
    }
    try {
      const { data } = await api.get('/questions', { params: { role, level } });
      if (!data) return setError('No questions found for this role and level in database.');
      navigate('/interview', { state: { question: data, role, level } });
    } catch (err) {
      setError(err.response?.data?.error || 'Could not fetch a question. Try again.');
    } finally { setLoading(false); }
  };

  // Helper: get card styles based on dark mode
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />
      <div className="flex-1 page-wrap py-12 sm:py-16">

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
            <span className="text-xs text-[#666] dark:text-[#8b949e] font-medium">Ready to practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111] dark:text-[#e6edf3] tracking-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Developer'}! 👋
          </h1>
          <p className="text-[#888] dark:text-[#8b949e] text-sm sm:text-base">
            Choose your role and experience level to get a tailored interview question.
          </p>
        </div>

        <div className="max-w-2xl space-y-8">

          {/* Role selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-[#111] dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-[#111] text-xs">1</span>
              </div>
              <label className="text-xs font-semibold text-[#555] dark:text-[#8b949e] uppercase tracking-widest">I am interviewing for</label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  className="relative p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 group"
                  style={role === r.id
                    ? { background: '#111', borderColor: '#111', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
                    : { background: r.color, borderColor: r.border }
                  }>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: role === r.id ? 'rgba(255,255,255,0.15)' : '#fff' }}>
                      {r.icon}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${role === r.id ? 'text-white' : 'text-[#111]'}`}>{r.id}</p>
                      <p className={`text-xs mt-0.5 ${role === r.id ? 'text-white/60' : 'text-[#888]'}`}>{r.desc}</p>
                    </div>
                  </div>
                  {role === r.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Level selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-[#111] dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-[#111] text-xs">2</span>
              </div>
              <label className="text-xs font-semibold text-[#555] dark:text-[#8b949e] uppercase tracking-widest">Experience level</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LEVELS.map((l) => (
                <button key={l.id} type="button" onClick={() => setLevel(l.id)}
                  className="relative p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200"
                  style={level === l.id
                    ? { background: '#111', borderColor: '#111', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
                    : { background: l.color, borderColor: l.border }
                  }>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: level === l.id ? 'rgba(255,255,255,0.15)' : '#fff' }}>
                    {l.icon}
                  </div>
                  <p className={`font-semibold text-sm ${level === l.id ? 'text-white' : 'text-[#111]'}`}>{l.id}</p>
                  <p className={`text-xs mt-0.5 ${level === l.id ? 'text-white/60' : 'text-[#888]'}`}>{l.desc}</p>
                  {level === l.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-100 dark:border-red-800/30 text-red-500 rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {(role || level) && (
            <div className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm">
              <span className="text-lg">📋</span>
              <div className="flex-1">
                <p className="text-xs text-[#aaa] dark:text-[#484f58] uppercase tracking-widest mb-1">Your selection</p>
                <p className="text-sm font-medium text-[#111] dark:text-[#e6edf3]">{role || '—'} · {level || '—'}</p>
              </div>
              {role && level && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">Ready ✓</span>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={handleStart} disabled={loading || !role || !level}
              className="flex-1 py-4 rounded-2xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: loading || !role || !level ? '#aaa' : 'linear-gradient(135deg, #111 0%, #374151 100%)', boxShadow: !loading && role && level ? '0 8px 24px rgba(0,0,0,0.2)' : 'none' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Setting up environment...
                </span>
              ) : '🚀 Start practice round'}
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="flex-1 py-4 rounded-2xl text-sm font-semibold bg-white dark:bg-[#161b22] border-2 border-[#e0ddd8] dark:border-[#30363d] text-[#555] dark:text-[#8b949e] hover:border-[#999] dark:hover:border-[#8b949e] transition-all duration-200 shadow-sm">
              📊 Open Analytics Charts
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}