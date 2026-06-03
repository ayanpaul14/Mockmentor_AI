import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Footer from '../components/Footer';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dynamic metrics state hooks
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    codingRoundsCount: 0,
    verbalRoundsCount: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        // 📥 Fetch live records directly out of your MongoDB collection
        const { data } = await api.get('/sessions');
        
        if (data && Array.isArray(data)) {
          const total = data.length;
          let totalScoreSum = 0;
          let codingCount = 0;
          let verbalCount = 0;

          data.forEach(session => {
            // ✅ MATCHES BACKEND SCHEMA: Extracting straight from document root level properties
            const clarity = session.scores?.clarity || 0;
            const depth = session.scores?.depth || 0;
            const quality = session.scores?.keywords || 0;
            
            const avgSessionScore = (clarity + depth + quality) / 3;
            totalScoreSum += avgSessionScore;

            if (session.role === 'Coding Round') {
              codingCount++;
            } else {
              verbalCount++;
            }
          });

          setStats({
            totalSessions: total,
            averageScore: total > 0 ? (totalScoreSum / total).toFixed(1) : 0,
            codingRoundsCount: codingCount,
            verbalRoundsCount: verbalCount
          });
          
          // Render your 5 newest sessions directly on your tracking table feed
          setRecentSessions(data.slice(0, 5));
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to sync performance history profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 font-sans text-[#111]" style={{ background: '#fafaf7' }}>
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        
        {/* Profile Card Header */}
        <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#111] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">{user?.name || 'Developer Candidate'}</h2>
              <p className="text-xs text-[#aaa] font-mono">{user?.email || 'authenticated@mockmentor.ai'}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/home')}
            className="self-start sm:self-center bg-white hover:bg-[#f5f2ec] text-xs font-semibold px-4 py-2 border border-[#e8e4dc] text-[#555] rounded-xl transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* 📋 DYNAMIC METRICS CORE PANEL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e8e4dc] p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-[#111]">{loading ? '—' : stats.totalSessions}</p>
            <p className="text-[10px] text-[#aaa] font-semibold uppercase tracking-wider mt-1">Total Rounds</p>
          </div>
          <div className="bg-white border border-[#e8e4dc] p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">{loading ? '—' : `${stats.averageScore}/10`}</p>
            <p className="text-[10px] text-[#aaa] font-semibold uppercase tracking-wider mt-1">Average Rating</p>
          </div>
          <div className="bg-white border border-[#e8e4dc] p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-amber-500">{loading ? '—' : stats.codingRoundsCount}</p>
            <p className="text-[10px] text-[#aaa] font-semibold uppercase tracking-wider mt-1">Coding Arenas</p>
          </div>
          <div className="bg-white border border-[#e8e4dc] p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">{loading ? '—' : stats.verbalRoundsCount}</p>
            <p className="text-[10px] text-[#aaa] font-semibold uppercase tracking-wider mt-1">Verbal Tracks</p>
          </div>
        </div>

        {/* History Table Log Area */}
        <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm border-b border-[#f0ede6] pb-2">Recent Performance Log</h3>
          
          {error && <p className="text-xs text-red-500 font-mono">⚠️ {error}</p>}
          
          {loading ? (
            <p className="text-xs text-[#aaa] font-mono py-4 text-center">Synchronizing performance index logs...</p>
          ) : recentSessions.length === 0 ? (
            <div className="text-center py-8 text-[#aaa] border border-dashed border-[#e8e4dc] rounded-xl space-y-1">
              <p className="text-sm">No historical assessment sessions found.</p>
              <p className="text-xs">Complete an interview track to populate your global matrix charts!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-[#444] border-collapse">
                <thead>
                  <tr className="bg-[#faf9f7] text-[#888] border-b border-[#e8e4dc]">
                    <th className="p-3 font-semibold">Track Role</th>
                    <th className="p-3 font-semibold">Complexity</th>
                    <th className="p-3 font-semibold">Topic Cluster</th>
                    <th className="p-3 font-semibold">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ede6]">
                  {recentSessions.map((session) => (
                    <tr key={session._id} className="hover:bg-[#faf9f7]/50 transition-colors">
                      <td className="p-3 font-bold text-[#111]">{session.role}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-[#555] font-sans text-[10px] font-medium">
                          {session.level}
                        </span>
                      </td>
                      <td className="p-3 truncate max-w-[180px]">{session.topic || 'General'}</td>
                      <td className="p-3 text-[#aaa] font-sans text-[11px]">
                        {new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}