import Footer from '../components/Footer';

const sections = [
  { title: 'Acceptance of terms', icon: '✅', content: `By accessing or using MockMentor AI, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the service. We reserve the right to update these terms at any time, and continued use of the service constitutes acceptance of any changes.` },
  { title: 'Use of the service', icon: '🎯', content: `MockMentor AI is provided for personal, non-commercial use for interview preparation purposes. You agree not to: use the service for any unlawful purpose, attempt to reverse-engineer or exploit the platform, share your account credentials with others, or use automated tools to scrape or abuse the service.` },
  { title: 'Account responsibility', icon: '👤', content: `You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activity that occurs under your account. You must notify us immediately if you suspect unauthorized access to your account.` },
  { title: 'AI-generated content', icon: '🤖', content: `The AI-generated feedback, scores, and model answers provided by MockMentor are for educational purposes only. They do not constitute professional career advice. We make no guarantees about the accuracy or completeness of AI evaluations.` },
  { title: 'Intellectual property', icon: '©️', content: `All content, design, and code on MockMentor AI is the property of MockMentor AI. You may not reproduce, distribute, or create derivative works without our express written permission. Your submitted answers remain your own content.` },
  { title: 'Limitation of liability', icon: '⚖️', content: `MockMentor AI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.` },
  { title: 'Termination', icon: '🚫', content: `We reserve the right to suspend or terminate your account at any time for violations of these terms, without prior notice. You may delete your account at any time by contacting us. Upon termination, your data will be deleted within 30 days.` },
  { title: 'Contact', icon: '📧', content: `For questions about these terms, contact us at: ayanpaul626@gmail.com` },
];

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)' }} />

      <div className="flex-1 page-wrap py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-full px-4 py-2 mb-5 shadow-sm">
              <span className="text-sm">📄</span>
              <span className="text-xs text-[#666] dark:text-[#8b949e] font-medium">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111] dark:text-[#e6edf3] tracking-tight mb-3" style={{ letterSpacing: '-0.03em' }}>Terms of use</h1>
            <p className="text-xs text-[#bbb] dark:text-[#484f58] uppercase tracking-widest">Last updated: May 2026</p>
          </div>

          <div className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 mb-6">
            <p className="text-sm text-[#555] dark:text-[#8b949e] leading-relaxed">
              These Terms of Use govern your access to and use of MockMentor AI. Please read them carefully before using the service. These terms form a legally binding agreement between you and MockMentor AI.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((s) => (
              <div key={s.title} className="bg-white dark:bg-[#161b22] border-2 border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{s.icon}</span>
                  <h2 className="font-bold text-[#111] dark:text-[#e6edf3] text-sm">{s.title}</h2>
                </div>
                <p className="text-sm text-[#666] dark:text-[#8b949e] leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}