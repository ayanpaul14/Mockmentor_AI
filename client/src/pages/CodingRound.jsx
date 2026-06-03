import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import api from '../api/axios';

export default function CodingRound() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};`);

  const [loading, setLoading] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [error, setError] = useState('');

  // Local tracking configuration mock records
  const testCases = [
    { inp: '[2,7,11,15], 9', exp: '[0,1]', got: '[0,1]', pass: true },
    { inp: '[3,2,4], 6',     exp: '[1,2]', got: '[1,2]', pass: true },
    { inp: '[3,3], 6',       exp: '[0,1]', got: 'undefined', pass: false },
  ];

  const handleAIEvaluation = async () => {
    setLoading(true);
    setError('');
    setEvalResult(null); // Clear previous reports during new submission cycles
    try {
      const { data } = await api.post('/evaluate', {
        role: 'Coding Round',
        level: 'Fresher',
        topic: 'Arrays', 
        question: 'Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        candidateAnswer: code.trim(),
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
            <span className="text-xs text-[#aaa]">/ Coding Round Matrix</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
              className="bg-white hover:bg-[#f5f2ec] text-xs font-semibold px-3 py-1.5 border border-[#e8e4dc] text-[#555] rounded-xl transition-all"
            >
              ← Dashboard
            </button>
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#dc2626]">
              ⏱️ 24:31
            </div>
            <div className="bg-white border border-[#e8e4dc] text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm">
              JavaScript
            </div>
          </div>
        </div>

        {/* Workspace: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT PANEL: Problem Details */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg tracking-tight">Two Sum</h3>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">Medium</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#faf9f7] text-[#555] border border-[#e8e4dc] px-2.5 py-1 rounded-full">Arrays</span>
                </div>
              </div>
              <p className="text-sm text-[#444] leading-relaxed">
                Given an array of integers <code className="font-mono bg-[#f1f5f9] px-1 py-0.5 rounded text-xs text-indigo-600">nums</code> and an integer <code className="font-mono bg-[#f1f5f9] px-1 py-0.5 rounded text-xs text-indigo-600">target</code>, return indices of the two numbers such that they add up to target.
              </p>
            </div>

            <div className="bg-[#faf9f7] border border-[#e8e4dc] rounded-xl p-4 font-mono text-xs text-[#555] space-y-1">
              <p className="font-sans font-semibold text-xs text-[#111] mb-1">Example 1:</p>
              <p><span className="text-[#aaa]">Input:</span> nums = [2,7,11,15], target = 9</p>
              <p><span className="text-[#aaa]">Output:</span> [0,1]</p>
              <p className="text-[#aaa] italic">// Explanation: nums[0] + nums[1] == 9, we return [0, 1].</p>
            </div>

            <div className="bg-[#faf9f7] border border-[#e8e4dc] rounded-xl p-4 space-y-1">
              <p className="font-semibold text-xs text-[#111]">Constraints:</p>
              <ul className="list-disc pl-5 text-xs font-mono text-[#666] space-y-0.5">
                <li>2 ≤ nums.length ≤ 10⁴</li>
                <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
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

        {/* BOTTOM METRICS PANEL: Assertion Logs and Groq Payload Analysis Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Local Unit Test Suite Block */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#f0ede6] pb-2">
              <h4 className="font-semibold text-sm">Automated Test Cases</h4>
              <div className="flex gap-2 text-[10px] font-bold">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">2 PASSED</span>
                <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md">1 FAILED</span>
              </div>
            </div>

            <div className="divide-y divide-[#f0ede6]">
              {testCases.map((test, index) => (
                <div key={index} className="py-2.5 flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border ${
                    test.pass ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                  }`}>
                    {test.pass ? '✓' : '✗'}
                  </div>
                  <div className="font-mono text-xs space-y-0.5 truncate">
                    <p className="text-[#666] truncate"><span className="text-[#aaa] font-sans">Input:</span> {test.inp}</p>
                    <p className={test.pass ? 'text-emerald-600' : 'text-red-600'}>
                      <span className="text-[#aaa] font-sans">Output:</span> {test.got} {!test.pass && `(Expected: ${test.exp})`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-3 border border-[#e0ddd8] bg-white text-[#555] font-semibold text-xs rounded-xl hover:border-[#bbb] transition-all">
                ▶ Run Test Assertions
              </button>
              <button 
                onClick={handleAIEvaluation}
                disabled={loading}
                className="flex-1 py-3 bg-[#111] hover:bg-[#222] text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? '⚡ Requesting Llama Audit...' : '⚡ Submit for AI Eval'}
              </button>
            </div>
          </div>

          {/* AI Code Auditor Execution Panel */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#f0ede6] pb-2">
              <h4 className="font-semibold text-sm">Groq AI Analytics Diagnostic Node</h4>
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
                  <p className="font-sans font-bold text-xs text-white mb-1">Optimized Solution Model Reference:</p>
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