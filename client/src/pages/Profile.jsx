import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // ✅ ADD THIS
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Profile() {
  const { user } = useAuth();
  const location = useLocation(); // ✅ ADD THIS
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true); // ✅ Reset on every navigation
    setError('');

    const token = localStorage.getItem('token');

    api.get('/sessions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        if (data && Array.isArray(data)) {
          setSessions(data);
        }
      })
      .catch(() => setError('Could not verify profile metrics stream history.'))
      .finally(() => setLoading(false));
  }, [location]); // ✅ THE FIX: re-fetch every time you navigate to this page

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#fafaf7' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />
      
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 space-y-8 select-none text-[#111]">
        
        {/* User Identity Banner Card */}
        <div className="bg-white border-2 border-[#e8e4dc] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-[#111] flex items-center justify-center font-black text-3xl text-white shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold tracking-tight">{user?.name || 'Ayan Paul'}</h2>
            <p className="text-xs text-[#aaa] font-mono mt-0.5">{user?.email || 'developer@domain.com'}</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-50 border border-indigo-200 text-indigo-600 px-3 py-1 rounded-full">
                Active Member
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full">
                {sessions.length} Completed Runs
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Segment Blocks */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-[#555]">Historical Ledger Logs</h3>
          
          {loading ? (
            <p className="text-xs font-medium text-[#aaa] animate-pulse">Re-syncing account logs from cloud instance...</p>
          ) : error ? (
            <p className="text-xs font-mono text-red-500">⚠️ {error}</p>
          ) : sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s._id} className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{s.role} · {s.topic}</p>
                      <h4 className="text-sm font-semibold text-[#111] mt-0.5 leading-snug">{s.question}</h4>
                    </div>
                    <div className="bg-[#faf9f7] border border-[#e8e4dc] rounded-xl px-3 py-1.5 text-center font-mono flex-shrink-0">
                      <span className="text-sm font-bold text-[#111]">{s.scores?.overall || 0}</span>
                      <span className="text-[10px] text-[#aaa]">/10</span>
                    </div>
                  </div>

                  {s.candidateAnswer && (
                    <div className="bg-[#faf9f7] border border-[#e8e4dc] rounded-xl p-3 font-mono text-xs text-[#555] whitespace-pre-wrap max-h-24 overflow-y-auto">
                      <span className="font-sans font-bold text-[#111] block mb-1">Your response entry:</span>
                      {s.candidateAnswer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-[#e8e4dc] rounded-2xl p-10 text-center text-[#aaa] text-xs">
              No historical session tracking matches detected under your unique key reference record.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}