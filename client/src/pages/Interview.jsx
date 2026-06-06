import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import Footer from '../components/Footer';

export default function Interview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, level, question } = location.state || {};
  const targetQuestion = typeof question === 'object' ? question?.question : question;
  const targetTopic = question?.topic || 'General';

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return setError('Please type or dictate an answer before submitting.');
    setLoading(true); setError(''); setEvalResult(null);
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.post('/evaluate', {
        role: role || 'SDE', level: level || 'Fresher', topic: targetTopic,
        question: targetQuestion, candidateAnswer: currentAnswer.trim()
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success && data.result) { setEvalResult(data.result); }
      else { setError('Evaluation response payload format unrecognized.'); }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit answer for AI analysis.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 font-sans text-[#111] dark:text-[#e6edf3] bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-6 py-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8e4dc] dark:border-[#30363d] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-bold">{role || 'Verbal Track'}</span>
            <h1 className="text-xl font-bold tracking-tight mt-0.5">Active Interview Session</h1>
          </div>
          <button onClick={() => navigate('/home')}
            className="bg-white dark:bg-[#161b22] hover:bg-[#f5f2ec] dark:hover:bg-[#21262d] text-xs font-semibold px-4 py-2 border border-[#e8e4dc] dark:border-[#30363d] text-[#555] dark:text-[#8b949e] rounded-xl transition-all">
            ← Quit Session
          </button>
        </div>

        {/* Question Panel */}
        <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#faf9f7] dark:bg-[#21262d] border border-[#e8e4dc] dark:border-[#30363d] px-2.5 py-1 rounded-md uppercase tracking-wider text-[#555] dark:text-[#8b949e]">
              Topic: {targetTopic}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#222] dark:text-[#e6edf3] font-medium leading-relaxed">
            {targetQuestion || "No interview questions retrieved. Please head back to the selection matrix dashboard."}
          </p>
        </div>

        {/* Answer + Eval Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Input Area */}
          <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#555] dark:text-[#8b949e] uppercase tracking-wider block">Your Response:</label>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your detailed answer here or structure your technical thoughts..."
                disabled={loading || evalResult}
                className="w-full h-48 p-3 text-sm bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] text-[#111] dark:text-[#e6edf3] rounded-xl focus:outline-none focus:border-indigo-500 font-sans resize-none disabled:opacity-60 placeholder-[#bbb] dark:placeholder-[#484f58]"
              />
            </div>
            {error && <p className="text-xs text-red-500 font-mono">⚠️ {error}</p>}
            {!evalResult && (
              <button onClick={handleSubmitAnswer} disabled={loading || !currentAnswer.trim()}
                className="w-full py-3 bg-[#111] dark:bg-white hover:bg-[#222] dark:hover:bg-[#f0ede6] text-white dark:text-[#111] font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-40">
                {loading ? '🤖 Analyzing parameters...' : '📨 Submit Answer'}
              </button>
            )}
          </div>

          {/* AI Feedback Panel */}
          <div className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-5 shadow-sm space-y-4">
            <label className="text-xs font-bold text-[#555] dark:text-[#8b949e] uppercase tracking-wider block border-b border-[#f0ede6] dark:border-[#30363d] pb-1">AI Evaluation Analysis:</label>

            {evalResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{evalResult.scores?.clarity ?? '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Clarity</p>
                  </div>
                  <div className="bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{evalResult.scores?.depth ?? '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Depth</p>
                  </div>
                  <div className="bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-amber-500 dark:text-amber-400">{evalResult.scores?.keywords ?? '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Keywords</p>
                  </div>
                </div>
                <button onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5">
                  📊 View Updated Analytics Dashboard
                </button>
                <div className="bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] rounded-xl p-3 space-y-1">
                  <p className="text-xs font-bold text-[#111] dark:text-[#e6edf3]">Strengths:</p>
                  <ul className="text-xs text-[#555] dark:text-[#8b949e] list-inside list-disc space-y-0.5">
                    {evalResult.strengths?.map((str, i) => <li key={i}>{str}</li>) || <li>No criteria listed.</li>}
                  </ul>
                </div>
                <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-800/30 rounded-xl p-3 space-y-1">
                  <p className="text-xs font-bold text-red-800 dark:text-red-400">Missed Points:</p>
                  <ul className="text-xs text-red-700 dark:text-red-400 list-inside list-disc space-y-0.5">
                    {evalResult.missed_points?.map((pt, i) => <li key={i}>{pt}</li>) || <li>No recommendations listed.</li>}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center text-[#aaa] dark:text-[#484f58] border border-dashed border-[#e8e4dc] dark:border-[#30363d] rounded-xl">
                <span className="text-xl mb-1">🤖</span>
                <p className="text-xs font-medium">Awaiting evaluation submission stream context...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}