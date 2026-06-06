import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const faqs = [
  {
    category: '🚀 Getting started',
    items: [
      { q: 'How do I start a mock interview?', a: 'After logging in, go to the Home page. Select your role (SDE, Data Analyst, PM, or DevOps) and your experience level (Fresher or Experienced). Click "Start interview" and you will receive a real interview question tailored to your selection.' },
      { q: 'Do I need to create an account?', a: 'Yes, a free account is required to track your progress and save your session history. Registration takes under 30 seconds — just your name, email, and a password.' },
      { q: 'Is MockMentor completely free?', a: 'Yes. MockMentor is 100% free to use. There are no hidden charges, no credit card required, and no premium tier. All features including AI scoring and voice input are available to all users.' },
    ]
  },
  {
    category: '🤖 AI evaluation',
    items: [
      { q: 'How does the AI score my answer?', a: 'Your answer is evaluated on three dimensions: Clarity (how well-structured your answer is), Depth (whether you go beyond surface level), and Keywords (how many expected technical concepts you covered). Each is scored from 0–10 and a weighted overall score is calculated.' },
      { q: 'Why did I get a low score even though my answer seemed good?', a: 'The AI is intentionally strict — it evaluates whether your answer covers the key technical concepts expected for that topic at your experience level. Check the "What you missed" section on the feedback page for specific gaps.' },
      { q: 'How long should my answer be?', a: 'Aim for 3–6 sentences that cover the core concept, an explanation, and a practical example. Answers under 10 characters will not be accepted. Answers are capped at 800 characters for evaluation consistency.' },
    ]
  },
  {
    category: '🎤 Voice input',
    items: [
      { q: 'How do I use voice input?', a: 'On the Interview page, click the "🎤 Voice" button and speak your answer clearly. Your speech will be transcribed and added to the answer box. Voice input works best in Chrome or Edge on Windows.' },
      { q: 'Voice input is not working — what do I do?', a: 'Voice input requires microphone permission in your browser. Click the lock icon in the address bar and ensure microphone access is set to "Allow". Voice input is only supported in Chrome and Edge.' },
    ]
  },
  {
    category: '📊 Dashboard & progress',
    items: [
      { q: 'What does the dashboard show?', a: 'Your dashboard shows: total sessions completed, your average score, your weakest topic, a score trend chart of your last 20 sessions, and a table of recent sessions with individual scores.' },
      { q: 'How is my weakest topic calculated?', a: 'The system groups all your sessions by topic and calculates the average score for each. The topic with the lowest average score is flagged as your weakest topic.' },
    ]
  },
];

export default function Help() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />

      <div className="flex-1 page-wrap py-12 sm:py-16">

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="text-sm">💬</span>
            <span className="text-xs text-[#666] dark:text-[#8b949e] font-medium">Help centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111] dark:text-[#e6edf3] tracking-tight mb-3" style={{ letterSpacing: '-0.03em' }}>
            How can we help?
          </h1>
          <p className="text-[#888] dark:text-[#8b949e] text-sm leading-relaxed">
            Find answers to common questions about MockMentor AI.
          </p>
        </div>

        {/* Quick links */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { icon: '🚀', label: 'Get started', to: '/register' },
            { icon: '🎯', label: 'Practice now', to: '/home' },
            { icon: '📊', label: 'Dashboard', to: '/dashboard' },
            { icon: '📧', label: 'Contact us', to: 'mailto:ayanpaul626@gmail.com', external: true },
          ].map((l) => (
            l.external
              ? <a key={l.label} href={l.to}
                  className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-2xl mb-2">{l.icon}</div>
                  <p className="text-xs font-semibold text-[#111] dark:text-[#e6edf3]">{l.label}</p>
                </a>
              : <Link key={l.label} to={l.to}
                  className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-2xl mb-2">{l.icon}</div>
                  <p className="text-xs font-semibold text-[#111] dark:text-[#e6edf3]">{l.label}</p>
                </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-bold text-[#111] dark:text-[#e6edf3] text-base mb-4">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">
                      <button className="w-full px-5 py-4 flex items-center justify-between text-left"
                        onClick={() => setOpen(isOpen ? null : key)}>
                        <span className="font-medium text-sm text-[#111] dark:text-[#e6edf3] pr-4">{item.q}</span>
                        <span className="text-[#aaa] dark:text-[#484f58] flex-shrink-0 transition-transform duration-200"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-[#f0ede6] dark:border-[#30363d]">
                          <p className="text-sm text-[#666] dark:text-[#8b949e] leading-relaxed mt-4">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="rounded-2xl px-6 py-10 text-center" style={{ background: 'linear-gradient(135deg, #111 0%, #374151 100%)' }}>
            <div className="text-3xl mb-3">🤝</div>
            <h2 className="font-bold text-white text-lg mb-2">Still need help?</h2>
            <p className="text-[#888] text-sm mb-6">Can't find your answer? Reach out and we'll get back to you.</p>
            <a href="mailto:ayanpaul626@gmail.com"
              className="bg-white text-[#111] font-semibold px-8 py-3 rounded-xl text-sm hover:bg-[#f5f2ec] transition-colors inline-block">
              Email support →
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}