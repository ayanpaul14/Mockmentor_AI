import Footer from '../components/Footer';

const sections = [
  {
    title: 'Information we collect',
    icon: '📋',
    content: `When you create an account, we collect your name and email address. When you use the app, we store your interview session data — the questions asked, your answers, and AI-generated scores. We do not collect payment information, phone numbers, or any sensitive personal data.`
  },
  {
    title: 'How we use your information',
    icon: '🔍',
    content: `Your data is used solely to provide the MockMentor service — to authenticate your account, display your session history, and generate your progress dashboard. We do not sell your data to third parties. We do not use your data for advertising purposes.`
  },
  {
    title: 'AI processing',
    icon: '🤖',
    content: `Your interview answers are sent to an AI API (Groq/LLaMA) for evaluation. These requests include the question, your answer, your role, and experience level. No personally identifiable information (name, email) is included in AI requests. AI providers process this data according to their own privacy policies.`
  },
  {
    title: 'Data storage',
    icon: '🗄️',
    content: `Your data is stored securely in MongoDB Atlas. Passwords are hashed using bcrypt before storage — we never store plain-text passwords. Session tokens use JWT and expire after 30 days.`
  },
  {
    title: 'Data retention',
    icon: '🗓️',
    content: `Your account and session data is retained for as long as your account is active. You may request deletion of your account and all associated data at any time by emailing us.`
  },
  {
    title: 'Your rights',
    icon: '✅',
    content: `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at the email below. We will respond within 7 business days.`
  },
  {
    title: 'Contact',
    icon: '📧',
    content: `For any privacy-related questions or requests, email us at: support@mockmentor.ai`
  },
];

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(160deg, #fafaf7 0%, #f0ede6 100%)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />

      <div className="flex-1 page-wrap py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white border border-[#e8e4dc] rounded-full px-4 py-2 mb-5 shadow-sm">
              <span className="text-sm">🔒</span>
              <span className="text-xs text-[#666] font-medium">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111] tracking-tight mb-3" style={{ letterSpacing: '-0.03em' }}>
              Privacy policy
            </h1>
            <p className="text-xs text-[#bbb] uppercase tracking-widest">Last updated: May 2026</p>
          </div>

          {/* Intro */}
          <div className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-6 mb-6">
            <p className="text-sm text-[#555] leading-relaxed">
              MockMentor AI ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data. By using MockMentor, you agree to the practices described here.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((s) => (
              <div key={s.title} className="bg-white border-2 border-[#e8e4dc] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{s.icon}</span>
                  <h2 className="font-bold text-[#111] text-sm">{s.title}</h2>
                </div>
                <p className="text-sm text-[#666] leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}