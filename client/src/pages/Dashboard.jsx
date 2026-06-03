import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import api from '../api/axios';
import Footer from '../components/Footer';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const color = score >= 7 ? '#059669' : score >= 5 ? '#d97706' : '#dc2626';
  return (
    <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl px-4 py-3 shadow-xl text-xs">
      <p className="text-[#aaa] mb-1">{label}</p>
      <p className="font-bold text-base" style={{ color }}>
        {score}<span className="text-xs font-normal text-[#bbb]">/10</span>
      </p>
    </div>
  );
};

export default function Dashboard() {
  const navigate  = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgScore: '0.0', weakestTopic: 'None yet' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/sessions')
      .then(({ data }) => {
        if (data && Array.isArray(data)) {
          setSessions(data);
          
          // 📊 Calculate stats from raw session array dynamically to prevent crashes
          const total = data.length;
          let totalScore = 0;
          const topicScores = {};

          data.forEach(s => {
            const score = s.scores?.overall || 0;
            totalScore += score;

            if (s.topic) {
              if (!topicScores[s.topic]) topicScores[s.topic] = { sum: 0, count: 0 };
              topicScores[s.topic].sum += score;
              topicScores[s.topic].count += 1;
            }
          });

          // Find weakest topic
          let weakest = 'None yet';
          let lowestAvg = 11;
          Object.keys(topicScores).forEach(topic => {
            const avg = topicScores[topic].sum / topicScores[topic].count;
            if (avg < lowestAvg) {
              lowestAvg = avg;
              weakest = topic;
            }
          });

          setStats({
            total,
            avgScore: total > 0 ? (totalScore / total).toFixed(1) : '0.0',
            weakestTopic: weakest
          });
        }
      })
      .catch(() => setError('Could not load sessions.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#111] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold">M</span>
          </div>
          <p className="text-[#aaa] text-sm">Loading your analytics dashboard…</p>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
      <Footer />
    </div>
  );

  const chartData = [...sessions].reverse().slice(-20)
    .map((s, i) => ({ name: `Q${i + 1}`, score: s.scores?.overall ?? 0 }));

  const avgNum = parseFloat(stats.avgScore);
  const avgColor  = avgNum >= 7 ? '#059669' : avgNum >= 5 ? '#d97706' : '#dc2626';
  const avgBg     = avgNum >= 7 ? '#f0fdf4' : avgNum >= 5 ? '#fffbeb' : '#fef2f2';
  const avgBorder = avgNum >= 7 ? '#bbf7d0' : avgNum >= 5 ? '#fde68a' : '#fecaca';

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />
      <div className="flex-1 page-wrap py-10 sm:py-14">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#e8e4dc] rounded-full px-4 py-2 mb-4 shadow-sm">
              <span className="text-sm">📊</span>
              <span className="text-xs text-[#666] font-medium">Your analytics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111] tracking-tight" style={{ letterSpacing: '-0.03em' }}>
              My progress
            </h1>
            <p className="text-[#888] text-sm mt-1">Track your improvement over time</p>
          </div>
          <button onClick={() => navigate('/home')}
            className="py-3 px-7 rounded-2xl text-sm font-bold text-white transition-all duration-200 self-start sm:self-auto"
            style={{ background: 'linear-gradient(135deg, #111, #374151)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            🚀 Practice now
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: '#eef2ff' }}>🎯</div>
              <span className="text-xs text-[#bbb] bg-[#f5f2ec] px-2 py-1 rounded-full">total</span>
            </div>
            <p className="text-4xl font-bold text-[#111] tracking-tight mb-1" style={{ letterSpacing: '-0.03em' }}>
              {stats.total}
            </p>
            <p className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Sessions completed</p>
          </div>

          <div className="border-2 rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            style={{ background: avgBg, borderColor: avgBorder }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl bg-white">⭐</div>
              <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.7)', color: avgColor }}>/10</span>
            </div>
            <p className="text-4xl font-bold tracking-tight mb-1" style={{ color: avgColor, letterSpacing: '-0.03em' }}>
              {stats.avgScore}
            </p>
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: avgColor, opacity: 0.7 }}>Average score</p>
          </div>

          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl bg-white">🎯</div>
              <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full font-medium">focus here</span>
            </div>
            <p className="text-xl font-bold text-[#111] truncate mb-1">{stats.weakestTopic}</p>
            <p className="text-xs text-amber-600/70 uppercase tracking-widest font-medium">Weakest topic</p>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 ? (
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-5 sm:p-7 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-[#111] text-base">Score trend</h2>
                <p className="text-xs text-[#aaa] mt-0.5">Your last {chartData.length} sessions</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}></div>
                <span className="text-xs text-[#aaa]">Score out of 10</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f2ec" />
                <XAxis dataKey="name" tick={{ fill: '#bbb', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: '#bbb', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={7} stroke="#6366f1" strokeDasharray="4 4" strokeOpacity={0.3}
                  label={{ value: 'Good ✓', fill: '#6366f1', fontSize: 10, position: 'insideTopRight' }} />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3}
                  fill="url(#scoreGrad)"
                  dot={{ fill: '#6366f1', strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-14 text-center mb-8 shadow-sm">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-[#aaa] text-sm mb-6">No sessions yet. Start your first interview!</p>
            <button onClick={() => navigate('/home')}
              className="py-3 px-8 rounded-2xl text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg, #111, #374151)' }}>
              Start practising →
            </button>
          </div>
        )}

        {/* Recent sessions */}
        {sessions.length > 0 && (
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 sm:px-6 py-4 border-b-2 border-[#f0ede6] flex items-center justify-between"
              style={{ background: 'linear-gradient(to right, #faf9f7, #fff)' }}>
              <div className="flex items-center gap-2">
                <span className="text-sm">📋</span>
                <h2 className="font-bold text-[#111] text-sm">Recent sessions</h2>
              </div>
              <span className="text-xs text-[#bbb] bg-[#f5f2ec] px-3 py-1 rounded-full">{sessions.length} total</span>
            </div>

            {sessions.slice(0, 10).map((s, i) => {
              const score = s.scores?.overall || 0;
              const scoreColor  = score >= 7 ? '#059669' : score >= 5 ? '#d97706' : '#dc2626';
              const scoreBg     = score >= 7 ? '#f0fdf4' : score >= 5 ? '#fffbeb' : '#fef2f2';
              const scoreBorder = score >= 7 ? '#bbf7d0' : score >= 5 ? '#fde68a' : '#fecaca';
              const scoreLabel  = score >= 7 ? 'Good' : score >= 5 ? 'Fair' : 'Needs work';
              return (
                <div key={s._id} className={`flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-[#faf9f7] transition-colors ${i !== 0 ? 'border-t border-[#f5f2ec]' : ''}`}>
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 mr-3">
                    <div className="w-10 h-10 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center border-2 font-bold text-sm"
                      style={{ background: scoreBg, color: scoreColor, borderColor: scoreBorder }}>
                      {score}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#111] font-medium truncate">{s.question}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-[#bbb]">{s.topic}</span>
                        <span className="text-[#ddd] text-xs">·</span>
                        <span className="text-xs text-[#bbb]">{s.role}</span>
                        <span className="text-[#ddd] text-xs">·</span>
                        <span className="text-xs text-[#bbb]">
                          {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full font-semibold flex-shrink-0 hidden sm:inline-block border"
                    style={{ background: scoreBg, color: scoreColor, borderColor: scoreBorder }}>
                    {scoreLabel}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}