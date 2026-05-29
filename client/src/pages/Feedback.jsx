// import { useLocation, useNavigate } from 'react-router-dom';
// import ScoreBar from '../components/ScoreBar';
// import Footer from '../components/Footer';

// export default function Feedback() {
//   const { state }  = useLocation();
//   const navigate   = useNavigate();

//   if (!state?.result) { navigate('/home'); return null; }

//   const { result, question, answer } = state;
//   const { scores, missed_points, strengths, model_answer, one_line_verdict } = result;

//   const overallColor =
//     scores.overall >= 7 ? 'text-emerald-600' :
//     scores.overall >= 5 ? 'text-amber-500'   : 'text-red-500';

//   const overallBg =
//     scores.overall >= 7 ? 'bg-emerald-50 border-emerald-100' :
//     scores.overall >= 5 ? 'bg-amber-50 border-amber-100'     :
//                           'bg-red-50 border-red-100';

//   return (
//     <div className="flex flex-col min-h-screen bg-[#fafaf7]">
//       <div className="flex-1 page-wrap py-10 sm:py-14">
//         <div className="max-w-2xl mx-auto">

//           {/* Page header */}
//           <div className="mb-8 pb-6 border-b border-[#e8e4dc]">
//             <p className="text-xs text-[#bbb] uppercase tracking-widest mb-1">Feedback</p>
//             <h1 className="text-2xl sm:text-3xl font-medium text-[#111] tracking-tight">
//               {question.topic}
//             </h1>
//             <p className="text-sm text-[#aaa] mt-1">{question.role} · {question.level}</p>
//           </div>

//           {/* Overall score */}
//           <div className={`border rounded-2xl p-6 sm:p-8 mb-5 text-center ${overallBg}`}>
//             <p className="text-xs text-[#aaa] uppercase tracking-widest mb-3">Overall score</p>
//             <p className={`text-6xl sm:text-7xl font-medium mb-1 tracking-tight ${overallColor}`}>
//               {scores.overall}
//             </p>
//             <p className="text-[#bbb] text-sm mb-4">out of 10</p>
//             <div className="inline-block bg-white/80 border border-[#e8e4dc] rounded-full px-5 py-2">
//               <p className="text-[#555] text-sm italic">"{one_line_verdict}"</p>
//             </div>
//           </div>

//           {/* Score breakdown */}
//           <div className="card mb-4">
//             <p className="label mb-5">Score breakdown</p>
//             <div className="space-y-5">
//               <ScoreBar label="Clarity"  score={scores.clarity}  color="dark" />
//               <ScoreBar label="Depth"    score={scores.depth}    color="amber" />
//               <ScoreBar label="Keywords" score={scores.keywords} color="green" />
//             </div>
//           </div>

//           {/* Strengths */}
//           {strengths?.length > 0 && (
//             <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 sm:p-6 mb-4">
//               <p className="text-xs text-emerald-600 uppercase tracking-widest mb-4">
//                 What you did well
//               </p>
//               <ul className="space-y-2.5">
//                 {strengths.map((s, i) => (
//                   <li key={i} className="flex gap-2.5 text-sm text-emerald-800">
//                     <span className="mt-0.5 flex-shrink-0">✓</span>
//                     {s}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Missed points */}
//           {missed_points?.length > 0 && (
//             <div className="bg-red-50 border border-red-100 rounded-xl p-5 sm:p-6 mb-4">
//               <p className="text-xs text-red-500 uppercase tracking-widest mb-4">
//                 What you missed
//               </p>
//               <ul className="space-y-2.5">
//                 {missed_points.map((p, i) => (
//                   <li key={i} className="flex gap-2.5 text-sm text-red-700">
//                     <span className="mt-0.5 flex-shrink-0">✗</span>
//                     {p}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Model answer */}
//           <div className="bg-[#f5f2ec] border border-[#e8e4dc] border-l-4 border-l-[#111] rounded-r-xl rounded-l-none p-5 sm:p-6 mb-4">
//             <p className="label mb-3">Model answer</p>
//             <p className="text-[#333] text-sm leading-relaxed">{model_answer}</p>
//           </div>

//           {/* Your answer collapsible */}
//           <details className="card mb-8 cursor-pointer group">
//             <summary className="label mb-0 cursor-pointer group-open:text-[#111] transition-colors list-none flex items-center justify-between">
//               Your original answer
//               <span className="text-[#ccc] group-open:rotate-180 transition-transform inline-block">
//                 ▾
//               </span>
//             </summary>
//             <p className="text-[#666] text-sm leading-relaxed mt-4">{answer}</p>
//           </details>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="btn-outline flex-1 py-3 text-sm"
//             >
//               View dashboard
//             </button>
//             <button
//               onClick={() => navigate('/home')}
//               className="btn-primary flex-1 py-3 text-sm"
//             >
//               Next question →
//             </button>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


import { useLocation, useNavigate } from 'react-router-dom';
import ScoreBar from '../components/ScoreBar';
import Footer from '../components/Footer';

export default function Feedback() {
  const { state }  = useLocation();
  const navigate   = useNavigate();

  if (!state?.result) { navigate('/home'); return null; }

  const { result, question, answer } = state;
  const { scores, missed_points, strengths, model_answer, one_line_verdict } = result;

  const overallColor =
    scores.overall >= 7 ? '#059669' :
    scores.overall >= 5 ? '#d97706' : '#dc2626';

  const overallBg =
    scores.overall >= 7 ? { background: '#f0fdf4', borderColor: '#bbf7d0' } :
    scores.overall >= 5 ? { background: '#fffbeb', borderColor: '#fde68a' } :
                          { background: '#fef2f2', borderColor: '#fecaca' };

  const overallEmoji =
    scores.overall >= 7 ? '🎉' :
    scores.overall >= 5 ? '📈' : '💪';

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

          {/* Page header */}
          <div className="mb-8 pb-6 border-b border-[#e8e4dc]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{overallEmoji}</span>
              <p className="text-xs text-[#bbb] uppercase tracking-widest">Your feedback</p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#111] tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              {question.topic}
            </h1>
            <p className="text-sm text-[#aaa] mt-1">{question.role} · {question.level}</p>
          </div>

          {/* Overall score card */}
          <div className="border-2 rounded-2xl p-6 sm:p-10 mb-5 text-center relative overflow-hidden"
            style={overallBg}>
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span style={{ fontSize: 200, lineHeight: 1 }}>{overallEmoji}</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: overallColor }}>
                Overall score
              </p>
              <p className="text-7xl sm:text-8xl font-semibold mb-1 tracking-tight" style={{ color: overallColor, letterSpacing: '-0.04em' }}>
                {scores.overall}
              </p>
              <p className="text-sm mb-5" style={{ color: overallColor, opacity: 0.6 }}>out of 10</p>
              <div className="inline-flex items-center gap-2 bg-white/80 border border-white rounded-2xl px-5 py-2.5 shadow-sm">
                <span className="text-sm">💬</span>
                <p className="text-[#555] text-sm italic">"{one_line_verdict}"</p>
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 sm:p-6 mb-4 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm">📊</span>
              <p className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Score breakdown</p>
            </div>
            <div className="space-y-5">
              <ScoreBar label="Clarity — structure and articulation" score={scores.clarity} color="dark" />
              <ScoreBar label="Depth — beyond surface level" score={scores.depth} color="amber" />
              <ScoreBar label="Keywords — technical concepts covered" score={scores.keywords} color="green" />
            </div>
          </div>

          {/* Strengths */}
          {strengths?.length > 0 && (
            <div className="rounded-2xl p-5 sm:p-6 mb-4 border-2" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">✅</span>
                <p className="text-xs text-emerald-700 uppercase tracking-widest font-medium">What you did well</p>
              </div>
              <ul className="space-y-3">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-emerald-800">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-medium mt-0.5">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missed points */}
          {missed_points?.length > 0 && (
            <div className="rounded-2xl p-5 sm:p-6 mb-4 border-2" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">❌</span>
                <p className="text-xs text-red-600 uppercase tracking-widest font-medium">What you missed</p>
              </div>
              <ul className="space-y-3">
                {missed_points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm text-red-800">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-medium mt-0.5">
                      ✗
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Model answer */}
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl overflow-hidden mb-4 shadow-sm">
            <div className="px-5 sm:px-6 py-4 border-b border-[#f0ede6] flex items-center gap-2"
              style={{ background: 'linear-gradient(to right, #f5f2ec, #faf9f7)' }}>
              <span className="text-sm">💡</span>
              <p className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Model answer</p>
            </div>
            <div className="px-5 sm:px-6 py-5">
              <p className="text-[#333] text-sm leading-relaxed">{model_answer}</p>
            </div>
          </div>

          {/* Your answer collapsible */}
          <details className="bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden mb-8 shadow-sm group">
            <summary className="px-5 sm:px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-[#faf9f7] transition-colors list-none">
              <div className="flex items-center gap-2">
                <span className="text-sm">📝</span>
                <p className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Your original answer</p>
              </div>
              <span className="text-[#ccc] text-xs group-open:rotate-180 transition-transform inline-block">▾</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 border-t border-[#f0ede6]">
              <p className="text-[#666] text-sm leading-relaxed mt-4">{answer}</p>
            </div>
          </details>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/dashboard')}
              className="flex-1 py-3.5 rounded-2xl text-sm font-medium bg-white border border-[#e0ddd8] text-[#555] hover:border-[#bbb] transition-all">
              📊 View dashboard
            </button>
            <button onClick={() => navigate('/home')}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #111 0%, #333 100%)' }}>
              Next question →
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}