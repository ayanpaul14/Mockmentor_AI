import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

// ── Heatmap ───────────────────────────────────────────────────────────────────
function ActivityHeatmap({ sessions }) {
  const today = new Date();
  const cells = [];
  for (let i = 167; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    cells.push(d.toISOString().split('T')[0]);
  }
  const countByDay = {};
  sessions.forEach(s => {
    const day = new Date(s.createdAt).toISOString().split('T')[0];
    countByDay[day] = (countByDay[day] || 0) + 1;
  });
  const lightColor = (n) => {
    if (!n) return '#f0ede6';
    if (n === 1) return '#0e4429';
    if (n === 2) return '#006d32';
    if (n === 3) return '#26a641';
    return '#39d353';
  };
  const darkColor = (n) => {
    if (!n) return '#1e2535';
    if (n === 1) return '#0e4429';
    if (n === 2) return '#006d32';
    if (n === 3) return '#26a641';
    return '#39d353';
  };
  const isDark = document.documentElement.classList.contains('dark');
  const color = isDark ? darkColor : lightColor;
  const emptyColor = isDark ? '#1e2535' : '#f0ede6';

  const weeks = [];
  for (let w = 0; w < 24; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div key={day} title={`${day}: ${countByDay[day] || 0} session(s)`}
                style={{ background: color(countByDay[day] || 0) }}
                className="w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:scale-125" />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">Less</span>
        {[emptyColor, '#0e4429', '#006d32', '#26a641', '#39d353'].map(c => (
          <div key={c} style={{ background: c }} className="w-[10px] h-[10px] rounded-[2px]" />
        ))}
        <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">More</span>
      </div>
    </div>
  );
}

// ── Donut Ring ────────────────────────────────────────────────────────────────
function DonutRing({ solved, total, color, label }) {
  const pct = total > 0 ? solved / total : 0;
  const r = 28, stroke = 5;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const isDark = document.documentElement.classList.contains('dark');
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke={isDark ? '#30363d' : '#e8e4dc'} strokeWidth={stroke} />
        <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 35 35)" style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        <text x="35" y="38" textAnchor="middle" fill={isDark ? '#e6edf3' : '#111'} fontSize="13" fontWeight="bold">{solved}</text>
      </svg>
      <span className="text-[11px] font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

// ── Difficulty Badge ──────────────────────────────────────────────────────────
function DiffBadge({ score }) {
  if (score >= 7) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-[#39d353] border border-emerald-200 dark:border-emerald-700/30">Easy</span>;
  if (score >= 5) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-[#ffa116] border border-amber-200 dark:border-amber-700/30">Medium</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-[#ef4743] border border-red-200 dark:border-red-700/30">Hard</span>;
}

export default function Profile() {
  const { user } = useAuth();
  const location = useLocation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true); setError('');
    const token = localStorage.getItem('token');
    api.get('/sessions', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        const list = data?.sessions ?? (Array.isArray(data) ? data : []);
        setSessions(list);
      })
      .catch(() => setError('Failed to load profile data.'))
      .finally(() => setLoading(false));
  }, [location]);

  const total = sessions.length;
  const avgScore = total > 0
    ? (sessions.reduce((s, x) => s + (x.scores?.overall || 0), 0) / total).toFixed(1)
    : '0.0';
  const easy   = sessions.filter(s => (s.scores?.overall || 0) >= 7).length;
  const medium = sessions.filter(s => { const o = s.scores?.overall || 0; return o >= 5 && o < 7; }).length;
  const hard   = sessions.filter(s => (s.scores?.overall || 0) < 5).length;

  const topicMap = {};
  sessions.forEach(s => {
    if (!s.topic) return;
    if (!topicMap[s.topic]) topicMap[s.topic] = { count: 0, score: 0 };
    topicMap[s.topic].count++;
    topicMap[s.topic].score += s.scores?.overall || 0;
  });
  const topTopics = Object.entries(topicMap).sort((a, b) => b[1].count - a[1].count).slice(0, 5);

  const streak = (() => {
    if (!sessions.length) return 0;
    const days = [...new Set(sessions.map(s => new Date(s.createdAt).toISOString().split('T')[0]))].sort().reverse();
    let count = 0; let cur = new Date(); cur.setHours(0,0,0,0);
    for (const d of days) {
      const day = new Date(d); day.setHours(0,0,0,0);
      const diff = Math.round((cur - day) / 86400000);
      if (diff <= 1) { count++; cur = day; } else break;
    }
    return count;
  })();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#111] dark:bg-white flex items-center justify-center font-bold text-white dark:text-[#111] animate-pulse">M</div>
        <p className="text-[#aaa] dark:text-[#484f58] text-sm">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#fafaf7] dark:bg-[#0d1117] text-[#111] dark:text-[#e6edf3] transition-colors duration-200">
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-4">

        {/* ── TOP ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Identity card */}
          <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl text-black shadow-lg"
              style={{ background: 'linear-gradient(135deg, #ffa116, #ff6b35)' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold tracking-tight text-[#111] dark:text-[#e6edf3]">{user?.name || 'Ayan Paul'}</h2>
              <p className="text-xs text-[#aaa] dark:text-[#484f58] mt-0.5 font-mono">{user?.email || 'developer@domain.com'}</p>
            </div>
            <div className="w-full border-t border-[#e8e4dc] dark:border-[#30363d] pt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-[#111] dark:text-[#e6edf3]">{total}</p>
                <p className="text-[10px] text-[#aaa] dark:text-[#484f58] uppercase tracking-wider">Solved</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#ffa116]">{streak}</p>
                <p className="text-[10px] text-[#aaa] dark:text-[#484f58] uppercase tracking-wider">Streak</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-500 dark:text-[#58a6ff]">{avgScore}</p>
                <p className="text-[10px] text-[#aaa] dark:text-[#484f58] uppercase tracking-wider">Avg</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-[#39d353] border border-emerald-200 dark:border-emerald-700/30 font-bold">ACTIVE</span>
              {streak >= 3 && <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-[#ffa116] border border-amber-200 dark:border-amber-700/30 font-bold">🔥 ON STREAK</span>}
              {total >= 10 && <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-[#58a6ff] border border-indigo-200 dark:border-indigo-700/30 font-bold">VETERAN</span>}
            </div>
          </div>

          {/* Breakdown */}
          <div className="lg:col-span-2 bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] dark:text-[#484f58] font-bold">Problem Breakdown</h3>

            {/* Donuts — responsive wrap on mobile */}
            <div className="flex flex-wrap items-center justify-around gap-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="#e8e4dc" strokeWidth="7" className="dark:stroke-[#30363d]" />
                  <circle cx="45" cy="45" r="38" fill="none" stroke="#ffa116" strokeWidth="7"
                    strokeDasharray={`${(total / Math.max(total, 50)) * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                    strokeLinecap="round" transform="rotate(-90 45 45)"
                    style={{ transition: 'stroke-dasharray 1s ease' }} />
                  <text x="45" y="43" textAnchor="middle" fill="#111" fontSize="18" fontWeight="bold" className="dark:fill-[#e6edf3]">{total}</text>
                  <text x="45" y="56" textAnchor="middle" fill="#aaa" fontSize="9">solved</text>
                </svg>
                <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">Total</span>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <DonutRing solved={easy}   total={Math.max(easy, 1)}   color="#39d353" label="Easy" />
                <DonutRing solved={medium} total={Math.max(medium, 1)} color="#ffa116" label="Medium" />
                <DonutRing solved={hard}   total={Math.max(hard, 1)}   color="#ef4743" label="Hard" />
              </div>
            </div>

            {/* Topic bars */}
            <div className="space-y-2 pt-2 border-t border-[#e8e4dc] dark:border-[#30363d]">
              <p className="text-[10px] uppercase tracking-widest text-[#aaa] dark:text-[#484f58] font-bold mb-3">Top Topics</p>
              {topTopics.length > 0 ? topTopics.map(([topic, data]) => {
                const pct = Math.min((data.count / total) * 100, 100);
                const avg = (data.score / data.count).toFixed(1);
                return (
                  <div key={topic} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#555] dark:text-[#8b949e]">{topic}</span>
                      <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">{data.count} · avg {avg}</span>
                    </div>
                    <div className="h-1.5 bg-[#f0ede6] dark:bg-[#30363d] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #58a6ff, #ffa116)' }} />
                    </div>
                  </div>
                );
              }) : <p className="text-xs text-[#aaa] dark:text-[#484f58]">No topic data yet.</p>}
            </div>
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] dark:text-[#484f58] font-bold">Activity — Last 24 Weeks</h3>
            <span className="text-xs text-[#aaa] dark:text-[#484f58]">{total} submissions</span>
          </div>
          <ActivityHeatmap sessions={sessions} />
        </div>

        {/* ── Submission Table ── */}
        <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-[#e8e4dc] dark:border-[#30363d] flex items-center justify-between bg-[#faf9f7] dark:bg-[#21262d]">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] dark:text-[#484f58] font-bold">Recent Submissions</h3>
            <span className="text-[10px] text-[#aaa] dark:text-[#484f58] bg-[#f0ede6] dark:bg-[#30363d] px-2 py-1 rounded-full">{total} total</span>
          </div>

          {error ? (
            <p className="text-xs text-red-500 p-6">⚠️ {error}</p>
          ) : sessions.length === 0 ? (
            <div className="p-14 text-center text-[#aaa] dark:text-[#484f58] text-xs">No submissions yet. Start practising!</div>
          ) : (
            <div className="divide-y divide-[#f0ede6] dark:divide-[#30363d]">

              {/* Desktop header — hidden on mobile */}
              <div className="hidden sm:grid grid-cols-12 px-6 py-2 text-[10px] uppercase tracking-widest text-[#aaa] dark:text-[#484f58]">
                <span className="col-span-1">Status</span>
                <span className="col-span-5">Problem</span>
                <span className="col-span-2">Topic</span>
                <span className="col-span-2">Score</span>
                <span className="col-span-2 text-right">Date</span>
              </div>

              {sessions.map((s) => {
                const score = s.scores?.overall || 0;
                const scoreColor = score >= 7 ? '#39d353' : score >= 5 ? '#ffa116' : '#ef4743';
                return (
                  <div key={s._id} className="group transition-colors hover:bg-[#faf9f7] dark:hover:bg-[#21262d]">

                    {/* Desktop row */}
                    <div className="hidden sm:grid grid-cols-12 px-6 py-3 items-center">
                      <div className="col-span-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: scoreColor }} />
                      </div>
                      <div className="col-span-5 min-w-0 pr-4">
                        <p className="text-xs text-[#111] dark:text-[#e6edf3] truncate">{s.question}</p>
                        <p className="text-[10px] text-[#aaa] dark:text-[#484f58] mt-0.5">{s.role} · {s.level}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-indigo-600 dark:text-[#58a6ff] bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-700/30 truncate block max-w-[90px]">{s.topic}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: scoreColor }}>{score}</span>
                        <span className="text-[10px] text-[#aaa]">/10</span>
                        <DiffBadge score={score} />
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">
                          {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Mobile card */}
                    <div className="sm:hidden px-4 py-3 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: scoreColor }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#111] dark:text-[#e6edf3] font-medium leading-snug">{s.question}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-indigo-600 dark:text-[#58a6ff] bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-700/30">{s.topic}</span>
                          <DiffBadge score={score} />
                          <span className="text-[10px] font-bold" style={{ color: scoreColor }}>{score}/10</span>
                          <span className="text-[10px] text-[#aaa] dark:text-[#484f58]">
                            {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}