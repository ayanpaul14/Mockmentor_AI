import { Link } from 'react-router-dom';

export default function Footer() {
  const GITHUB_URL = 'https://github.com/ayanpaul14';

  return (
    <footer className="border-t-2 border-[#e8e4dc] bg-white mt-auto">
      <div className="page-wrap py-10 sm:py-12">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
              <div className="w-7 h-7 bg-[#111] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="font-bold text-[#111] text-sm">MockMentor</span>
            </Link>
            <p className="text-xs text-[#aaa] leading-relaxed max-w-[180px]">
              AI-powered mock interview practice built for placement prep.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="text-xs bg-[#f5f2ec] hover:bg-[#e8e4dc] text-[#555] px-3 py-1.5 rounded-full transition-colors font-medium">
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-[#111] uppercase tracking-widest mb-4">Product</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/"         className="text-xs text-[#888] hover:text-[#111] transition-colors">Features</Link>
              <Link to="/"         className="text-xs text-[#888] hover:text-[#111] transition-colors">How it works</Link>
              <Link to="/dashboard"className="text-xs text-[#888] hover:text-[#111] transition-colors">Dashboard</Link>
              <Link to="/home"     className="text-xs text-[#888] hover:text-[#111] transition-colors">Practice now</Link>
              <Link to="/help"     className="text-xs text-[#888] hover:text-[#111] transition-colors">Help & FAQ</Link>
            </div>
          </div>

          {/* Roles */}
          <div>
            <p className="text-xs font-bold text-[#111] uppercase tracking-widest mb-4">Roles</p>
            <div className="flex flex-col gap-2.5">
              {['SDE', 'Data Analyst', 'Product Manager', 'DevOps'].map((l) => (
                <Link key={l} to="/home" className="text-xs text-[#888] hover:text-[#111] transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          {/* Developer + Legal */}
          <div>
            <p className="text-xs font-bold text-[#111] uppercase tracking-widest mb-4">Developer</p>
            <div className="flex flex-col gap-2.5">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#888] hover:text-[#111] transition-colors">GitHub ↗</a>
              <Link to="/help"    className="text-xs text-[#888] hover:text-[#111] transition-colors">Help & FAQ</Link>
              <Link to="/privacy" className="text-xs text-[#888] hover:text-[#111] transition-colors">Privacy policy</Link>
              <Link to="/terms"   className="text-xs text-[#888] hover:text-[#111] transition-colors">Terms of use</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8e4dc] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#ccc]">© 2026 MockMentor AI — Built for placement preparation</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacy" className="text-xs text-[#ccc] hover:text-[#111] transition-colors">Privacy</Link>
            <Link to="/terms"   className="text-xs text-[#ccc] hover:text-[#111] transition-colors">Terms</Link>
            <Link to="/help"    className="text-xs text-[#ccc] hover:text-[#111] transition-colors">Help</Link>
            <div className="flex items-center gap-1.5 bg-[#f5f2ec] px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-[#777]">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}