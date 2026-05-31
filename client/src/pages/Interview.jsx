import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VoiceInput from '../components/VoiceInput';
import Footer from '../components/Footer';
import api from '../api/axios';

export default function Interview() {
  const { state }   = useLocation();
  const navigate    = useNavigate();
  const [answer, setAnswer]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  // ✅ FIXED: Route security guards now execute safely AFTER layout mounting finishes
  useEffect(() => {
    if (!state?.question) {
      navigate('/home'); 
    }
  }, [state, navigate]);

  // If there's no state yet, render a safe structural layout block while the redirect takes over
  if (!state?.question) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center">
        <p className="text-xs text-[#aaa] font-mono">REDIRECTING TO ENVIRONMENT MATRIX...</p>
      </div>
    );
  }

  const { question, role, level } = state;
  const charPct = Math.min((answer.length / 800) * 100, 100);

  const handleSubmit = async () => {
    if (answer.trim().length < 10)
      return setError('Please write at least a sentence before submitting.');
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/evaluate', {
        role, level,
        topic: question.topic,
        question: question.question,
        candidateAnswer: answer.trim(),
      });
      navigate('/feedback', {
        state: { result: data.result, question, answer: answer.trim() },
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Evaluation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#fafaf7' }}>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
      </div>

      <div className="flex-1 page-wrap py-10 sm:py-14 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Progress bar */}
          <div className="h-1 bg-[#e8e4dc] rounded-full mb-8 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(charPct, 5)}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
          </div>

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="bg-[#111] text-white text-xs px-3 py-1.5 rounded-full font-medium">{role}</span>
            <span className="text-[#ddd] text-xs">·</span>
            <span className="bg-white border border-[#e0ddd8] text-[#666] text-xs px-3 py-1.5 rounded-full">{level}</span>
            <span className="text-[#ddd] text-xs">·</span>
            <span className="bg-white border border-[#e0ddd8] text-[#666] text-xs px-3 py-1.5 rounded-full">{question.topic}</span>
          </div>

          {/* Question card */}
          <div className="relative bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden mb-5 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1"
              style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <div className="px-5 sm:px-7 py-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <span className="text-white text-xs">?</span>
                </div>
                <p className="text-xs text-[#6366f1] uppercase tracking-widest font-medium">Interview Question</p>
              </div>
              <p className="text-[#111] text-base sm:text-lg font-medium leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {/* Answer card */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 sm:p-6 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">✍️</span>
                <label className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Your Answer</label>
              </div>
              <VoiceInput onTranscript={(t) => setAnswer((prev) => prev ? prev + ' ' + t : t)} />
            </div>
            <textarea
              className="input resize-none"
              rows={8}
              placeholder="Type your answer here, or click Voice to speak…"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="flex justify-between items-center mt-3">
              <span className={`text-xs font-medium ${answer.length > 750 ? 'text-amber-500' : 'text-[#ccc]'}`}>
                {answer.length}/800 characters
              </span>
              {answer.length >= 10 && (
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Ready to submit
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 rounded-xl px-4 py-3 text-sm flex items-center gap-2 mb-4">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => navigate('/home')}
              className="flex-1 py-3.5 rounded-2xl text-sm font-medium bg-white border border-[#e0ddd8] text-[#555] hover:border-[#bbb] transition-all">
              ← Back
            </button>
            <button onClick={handleSubmit} disabled={loading || answer.trim().length < 10}
              className="flex-[2] py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              style={{ background: 'linear-gradient(135deg, #111 0%, #333 100%)' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  AI is evaluating…
                </span>
              ) : '⚡ Submit for AI evaluation'}
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}