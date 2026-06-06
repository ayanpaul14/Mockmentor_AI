import { Link } from 'react-router-dom';

export default function Footer() {
  const GITHUB_URL = 'https://github.com/ayanpaul14';

  return (
    <footer className="border-t-2 border-[#e8e4dc] dark:border-[#30363d] bg-white dark:bg-[#161b22] mt-auto transition-colors duration-200">
      <div className="page-wrap py-10 sm:py-12">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
              <div className="w-7 h-7 bg-[#111] dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white dark:text-[#111] text-xs font-bold">M</span>
              </div>
              <span className="font-bold text-[#111] dark:text-[#e6edf3] text-sm">MockMentor</span>
            </Link>
            <p className="text-xs text-[#aaa] dark:text-[#484f58] leading-relaxed max-w-[180px]">
              AI-powered mock interview practice built for placement prep.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="text-xs bg-[#f5f2ec] dark:bg-[#21262d] hover:bg-[#e8e4dc] dark:hover:bg-[#30363d] text-[#555] dark:text-[#8b949e] px-3 py-1.5 rounded-full transition-colors font-medium">
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-[#111] dark:text-[#e6edf3] uppercase tracking-widest mb-4">Product</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/"          className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Features</Link>
              <Link to="/"          className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">How it works</Link>
              <Link to="/dashboard" className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Dashboard</Link>
              <Link to="/home"      className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Practice now</Link>
              <Link to="/help"      className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Help & FAQ</Link>
            </div>
          </div>

          {/* Roles */}
          <div>
            <p className="text-xs font-bold text-[#111] dark:text-[#e6edf3] uppercase tracking-widest mb-4">Roles</p>
            <div className="flex flex-col gap-2.5">
              {['SDE', 'Data Analyst', 'Product Manager', 'DevOps'].map((l) => (
                <Link key={l} to="/home" className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          {/* Developer */}
          <div>
            <p className="text-xs font-bold text-[#111] dark:text-[#e6edf3] uppercase tracking-widest mb-4">Developer</p>
            <div className="flex flex-col gap-2.5">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">GitHub ↗</a>
              <Link to="/help"    className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Help & FAQ</Link>
              <Link to="/privacy" className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Privacy policy</Link>
              <Link to="/terms"   className="text-xs text-[#888] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">Terms of use</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8e4dc] dark:border-[#30363d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#ccc] dark:text-[#484f58]">© 2026 MockMentor AI — Built for placement preparation</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacy" className="text-xs text-[#ccc] dark:text-[#484f58] hover:text-[#111] dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms"   className="text-xs text-[#ccc] dark:text-[#484f58] hover:text-[#111] dark:hover:text-white transition-colors">Terms</Link>
            <Link to="/help"    className="text-xs text-[#ccc] dark:text-[#484f58] hover:text-[#111] dark:hover:text-white transition-colors">Help</Link>
            <div className="flex items-center gap-1.5 bg-[#f5f2ec] dark:bg-[#21262d] px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-[#777] dark:text-[#8b949e]">All systems operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}