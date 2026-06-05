import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

// ── Heatmap: last 24 weeks × 7 days ──────────────────────────────────────────
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
  const color = (n) => {
    if (!n) return '#f0ede6';
    if (n === 1) return '#0e4429';
    if (n === 2) return '#006d32';
    if (n === 3) return '#26a641';
    return '#39d353';
  };
  // group into weeks
  const weeks = [];
  for (let w = 0; w < 24; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day}
                title={`${day}: ${countByDay[day] || 0} session(s)`}
                style={{ background: color(countByDay[day] || 0) }}
                className="w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:scale-125"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] text-[#aaa]">Less</span>
        {['#f0ede6','#0e4429','#006d32','#26a641','#39d353'].map(c => (
          <div key={c} style={{ background: c }} className="w-[10px] h-[10px] rounded-[2px]" />
        ))}
        <span className="text-[10px] text-[#aaa]">More</span>
      </div>
    </div>
  );
}

// ── Donut ring for topic breakdown ───────────────────────────────────────────
function DonutRing({ solved, total, color, label }) {
  const pct = total > 0 ? solved / total : 0;
  const r = 28, stroke = 5;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="#e8e4dc" strokeWidth={stroke} />
        <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 35 35)" style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        <text x="35" y="38" textAnchor="middle" fill="#111" fontSize="13" fontWeight="bold">{solved}</text>
      </svg>
      <span className="text-[11px] font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

// ── Difficulty badge ──────────────────────────────────────────────────────────
function DiffBadge({ score }) {
  if (score >= 7) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1a3a2a] text-[#39d353] border border-[#39d353]/30">Easy</span>;
  if (score >= 5) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3a2e10] text-[#ffa116] border border-[#ffa116]/30">Medium</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3a1a1a] text-[#ef4743] border border-[#ef4743]/30">Hard</span>;
}

export default function Profile() {
  const { user } = useAuth();
  const location = useLocation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    api.get('/sessions', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        const list = data?.sessions ?? (Array.isArray(data) ? data : []);
        setSessions(list);
      })
      .catch(() => setError('Failed to load profile data.'))
      .finally(() => setLoading(false));
  }, [location]);

  // ── Computed stats ──────────────────────────────────────────────────────────
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
  const topTopics = Object.entries(topicMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const streak = (() => {
    if (!sessions.length) return 0;
    const days = [...new Set(sessions.map(s => new Date(s.createdAt).toISOString().split('T')[0]))].sort().reverse();
    let count = 0;
    let cur = new Date(); cur.setHours(0,0,0,0);
    for (const d of days) {
      const day = new Date(d); day.setHours(0,0,0,0);
      const diff = Math.round((cur - day) / 86400000);
      if (diff <= 1) { count++; cur = day; } else break;
    }
    return count;
  })();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#ffa116] flex items-center justify-center font-black text-black text-sm animate-pulse">M</div>
        <p className="text-[#aaa] text-sm font-mono">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen font-mono" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)', color: '#111' }}>
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-6">

        {/* ── TOP ROW: Profile card + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left: identity card */}
          <div className="bg-white border border-[#e8e4dc] rounded-xl p-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl text-black shadow-lg"
              style={{ background: 'linear-gradient(135deg, #ffa116, #ff6b35)' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold tracking-tight text-black">{user?.name || 'Ayan Paul'}</h2>
              <p className="text-xs text-[#aaa] mt-0.5">{user?.email || 'developer@domain.com'}</p>
            </div>
            <div className="w-full border-t border-[#e8e4dc] pt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-black">{total}</p>
                <p className="text-[10px] text-[#aaa] uppercase tracking-wider">Solved</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#ffa116]">{streak}</p>
                <p className="text-[10px] text-[#aaa] uppercase tracking-wider">Streak</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#58a6ff]">{avgScore}</p>
                <p className="text-[10px] text-[#aaa] uppercase tracking-wider">Avg</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#1a3a2a] text-[#39d353] border border-[#39d353]/20 font-bold">ACTIVE</span>
              {streak >= 3 && <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#3a2e10] text-[#ffa116] border border-[#ffa116]/20 font-bold">🔥 ON STREAK</span>}
              {total >= 10 && <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-50 text-[#58a6ff] border border-indigo-200 font-bold">VETERAN</span>}
            </div>
          </div>

          {/* Right: Solved breakdown */}
          <div className="lg:col-span-2 bg-white border border-[#e8e4dc] rounded-xl p-6 space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] font-bold">Problem Breakdown</h3>
            <div className="flex items-center justify-around">
              {/* Big total donut */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="38" fill="none" stroke="#e8e4dc" strokeWidth="7" />
                    <circle cx="45" cy="45" r="38" fill="none" stroke="#ffa116" strokeWidth="7"
                      strokeDasharray={`${(total / Math.max(total, 50)) * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                      strokeLinecap="round" transform="rotate(-90 45 45)"
                      style={{ transition: 'stroke-dasharray 1s ease' }} />
                    <text x="45" y="43" textAnchor="middle" fill="#111" fontSize="18" fontWeight="bold">{total}</text>
                    <text x="45" y="56" textAnchor="middle" fill="#aaa" fontSize="9">solved</text>
                  </svg>
                </div>
                <span className="text-[10px] text-[#aaa]">Total</span>
              </div>

              <div className="flex gap-6">
                <DonutRing solved={easy}   total={Math.max(easy, 1)}   color="#39d353" label="Easy" />
                <DonutRing solved={medium} total={Math.max(medium, 1)} color="#ffa116" label="Medium" />
                <DonutRing solved={hard}   total={Math.max(hard, 1)}   color="#ef4743" label="Hard" />
              </div>
            </div>

            {/* Topic bars */}
            <div className="space-y-2 pt-2 border-t border-[#e8e4dc]">
              <p className="text-[10px] uppercase tracking-widest text-[#aaa] font-bold mb-3">Top Topics</p>
              {topTopics.length > 0 ? topTopics.map(([topic, data]) => {
                const pct = Math.min((data.count / total) * 100, 100);
                const avg = (data.score / data.count).toFixed(1);
                return (
                  <div key={topic} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#555]">{topic}</span>
                      <span className="text-[10px] text-[#aaa]">{data.count} · avg {avg}</span>
                    </div>
                    <div className="h-1.5 bg-[#f0ede6] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #58a6ff, #ffa116)' }} />
                    </div>
                  </div>
                );
              }) : <p className="text-xs text-[#aaa]">No topic data yet.</p>}
            </div>
          </div>
        </div>

        {/* ── Activity Heatmap ── */}
        <div className="bg-white border border-[#e8e4dc] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] font-bold">Activity — Last 24 Weeks</h3>
            <span className="text-xs text-[#aaa]">{total} submissions</span>
          </div>
          <ActivityHeatmap sessions={sessions} />
        </div>

        {/* ── Submission History ── */}
        <div className="bg-white border border-[#e8e4dc] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e8e4dc] flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-[#aaa] font-bold">Recent Submissions</h3>
            <span className="text-[10px] text-[#aaa] bg-[#f0ede6] px-2 py-1 rounded-full">{total} total</span>
          </div>

          {error ? (
            <p className="text-xs text-[#ef4743] p-6">⚠️ {error}</p>
          ) : sessions.length === 0 ? (
            <div className="p-14 text-center text-[#aaa] text-xs">
              No submissions yet. Start practising!
            </div>
          ) : (
            <div className="divide-y divide-[#1e2535]">
              {/* Header row */}
              <div className="grid grid-cols-12 px-6 py-2 text-[10px] uppercase tracking-widest text-[#aaa]">
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
                  <div key={s._id}
                    className="grid grid-cols-12 px-6 py-3 hover:bg-[#faf9f7] transition-colors items-center group">
                    <div className="col-span-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: scoreColor }} />
                    </div>
                    <div className="col-span-5 min-w-0 pr-4">
                      <p className="text-xs text-[#111] truncate group-hover:text-white transition-colors">{s.question}</p>
                      <p className="text-[10px] text-[#aaa] mt-0.5">{s.role} · {s.level}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-[#58a6ff] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 truncate block max-w-[90px]">
                        {s.topic}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: scoreColor }}>{score}</span>
                      <span className="text-[10px] text-[#aaa]">/10</span>
                      <DiffBadge score={score} />
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-[10px] text-[#aaa]">
                        {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </span>
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