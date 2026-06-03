import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import api from '../api/axios';

export default function CodingRound() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the dynamic question object passed from Home.jsx
  const { role, level, question } = location.state || {};
  
  // Safely extract the topic and problem text string whether it arrives as an object or raw string
  const targetQuestion = typeof question === 'object' ? question?.question : question;
  const targetTopic = question?.topic || 'Algorithms';

  // State initialization with starter placeholder templates
  const [code, setCode] = useState(`/**\n * Write your optimized solution here...\n */\nfunction solution() {\n  \n}`);
  const [loading, setLoading] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [error, setError] = useState('');

  // Local tracking configuration mock records
  const testCases = [
    { inp: 'Sample Case 1', exp: 'Match', got: 'Match', pass: true },
    { inp: 'Sample Case 2', exp: 'Match', got: 'Match', pass: true },
  ];

  const handleAIEvaluation = async () => {
    setLoading(true);
    setError('');
    setEvalResult(null); 
    try {
      // 🔑 Grab your login token from localStorage to authenticate the request
      const token = localStorage.getItem('token');

      // Send the real dynamic question variables along with your Auth Header configuration
      const { data } = await api.post('/evaluate', {
        role: role || 'Coding Round',
        level: level || 'Fresher',
        topic: targetTopic, 
        question: targetQuestion || 'Problem statement fallback metadata details...',
        candidateAnswer: code.trim(),
      }, {
        // ✅ SECURE ATTACHMENT: Forces the backend middleware to identify you and save metrics
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (data.success && data.result) {
        setEvalResult(data.result);
      } else {
        setError('Evaluation response payload format unrecognized.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'AI Evaluation sequence failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 font-sans select-none text-[#111]" style={{ background: '#fafaf7' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8e4dc] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#111] rounded-lg flex items-center justify-center font-bold text-white text-xs">M</div>
            <span className="text-sm font-semibold tracking-tight">MockMentor</span>
            <span className="text-xs text-[#aaa]">/ {role || 'Coding Round'} Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
              className="bg-white hover:bg-[#f5f2ec] text-xs font-semibold px-3 py-1.5 border border-[#e8e4dc] text-[#555] rounded-xl transition-all"
            >
              ← Leave Session
            </button>
            <div className="bg-white border border-[#e8e4dc] text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm uppercase tracking-wider text-indigo-600">
              {level || 'Assessment'} Mode
            </div>
          </div>
        </div>

        {/* Workspace: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT PANEL: Problem Details */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg tracking-tight">Problem Statement</h3>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">Dynamic</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#faf9f7] text-[#555] border border-[#e8e4dc] px-2.5 py-1 rounded-full">{targetTopic}</span>
                </div>
              </div>
              
              <p className="text-sm text-[#444] leading-relaxed whitespace-pre-line bg-[#faf9f7] border border-[#e8e4dc] rounded-xl p-4 font-mono">
                {targetQuestion || "No interview challenge parameters were retrieved. Please return to your selector matrix page to re-roll."}
              </p>
            </div>

            <div className="bg-[#fcfbf9] border border-[#e8e4dc] rounded-xl p-4 space-y-1">
              <p className="font-semibold text-xs text-[#111]">Instructions:</p>
              <ul className="list-disc pl-5 text-xs text-[#666] space-y-1">
                <li>Write a functional, performant code block inside the editor layout workspace window.</li>
                <li>Ensure edge cases, boundary structures, and complex computational loops are handled carefully.</li>
                <li>Click the audit action block below to initiate an automated deep LLM code quality inspection pipeline pass.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT PANEL: Monaco Integrated Editor Workspace */}
          <div className="bg-[#1e1e1e] rounded-2xl shadow-xl border border-neutral-800 overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="bg-[#181818] px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs font-mono text-neutral-400">solution.js</span>
              <div className="w-8" />
            </div>
            
            <div className="flex-1 py-2 min-h-[300px]">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  fontSize: 12,
                  fontFamily: 'Fira Code, Menlo, Monaco, monospace',
                  minimap: { enabled: false },
                  automaticLayout: true,
                  lineNumbersMinChars: 3,
                  cursorBlinking: 'smooth',
                  padding: { top: 8, bottom: 8 }
                }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM METRICS PANEL: Assertion Logs and AI Payload Analysis Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Local Unit Test Suite Block */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#f0ede6] pb-2">
              <h4 className="font-semibold text-sm">Automated Test Cases</h4>
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">AI GRADING ENABLED</span>
            </div>

            <div className="divide-y divide-[#f0ede6]">
              {testCases.map((test, index) => (
                <div key={index} className="py-2.5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border bg-emerald-50 border-emerald-200 text-emerald-700">
                    ✓
                  </div>
                  <div className="font-mono text-xs space-y-0.5 truncate">
                    <p className="text-[#666] truncate"><span className="text-[#aaa] font-sans">Sandbox environment:</span> {test.inp}</p>
                    <p className="text-emerald-600">
                      <span className="text-[#aaa] font-sans">Status:</span> Pipeline Operational
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleAIEvaluation}
                disabled={loading}
                className="flex-1 py-3 bg-[#111] hover:bg-[#222] text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? '⚡ Requesting AI Audit...' : '⚡ Submit for AI Eval'}
              </button>
            </div>
          </div>

          {/* AI Code Auditor Execution Panel */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#f0ede6] pb-2">
              <h4 className="font-semibold text-sm">AI Analytics Diagnostic Node</h4>
            </div>

            {error && <p className="text-xs text-red-500 font-mono">⚠️ {error}</p>}

            {evalResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#faf9f7] border border-[#e8e4dc] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-indigo-600">{(evalResult.scores?.clarity !== undefined) ? evalResult.scores.clarity : '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Clarity</p>
                  </div>
                  <div className="bg-[#faf9f7] border border-[#e8e4dc] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-emerald-600">{(evalResult.scores?.depth !== undefined) ? evalResult.scores.depth : '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Complexity</p>
                  </div>
                  <div className="bg-[#faf9f7] border border-[#e8e4dc] p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-amber-500">{(evalResult.scores?.keywords !== undefined) ? evalResult.scores.keywords : '—'}/10</p>
                    <p className="text-[10px] text-[#aaa] font-medium uppercase tracking-wider">Code Quality</p>
                  </div>
                </div>

                {/* Instant redirection button to clear your single-page app cache states */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  📊 Save & View Updated Analytics Dashboard
                </button>

                <div className="bg-[#faf9f7] border border-[#e8e4dc] rounded-xl p-3 space-y-1.5">
                  <p className="text-xs font-bold text-[#111]">Key Accomplishments:</p>
                  <ul className="text-xs text-[#555] list-inside list-disc space-y-0.5">
                    {evalResult.strengths?.map((str, i) => <li key={i}>{str}</li>) || <li>No analysis reported.</li>}
                  </ul>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-xl p-3 space-y-1.5">
                  <p className="text-xs font-bold text-red-800">Identified Vulnerabilities & Edge Cases:</p>
                  <ul className="text-xs text-red-700 list-inside list-disc space-y-0.5">
                    {evalResult.missed_points?.map((pt, i) => <li key={i}>{pt}</li>) || <li>No vulnerabilities reported.</li>}
                  </ul>
                </div>

                <div className="bg-[#1e1e1e] rounded-xl p-3 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre max-h-[180px]">
                  <p className="font-sans font-bold text-white mb-1">Optimized Solution Model Reference:</p>
                  {evalResult.model_answer || '// No solution reference available.'}
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center text-[#aaa] border border-dashed border-[#e8e4dc] rounded-xl">
                <span className="text-xl mb-1">🤖</span>
                <p className="text-xs font-medium">Pending active evaluation cycle stream output.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}