import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // 1. Fire your backend API request through your custom AuthContext hook layer
      const response = await login(form.email, form.password);
      
      // 2. CRITICAL SYNC FIX: Ensure the raw token string is explicitly saved to browser memory
      // If your custom auth hook returns the raw payload object, extract the token explicitly.
      if (response?.token) {
        localStorage.setItem('token', response.token);
      } else if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // 3. Now that the token is safely written, your ProtectedRoute will pass it cleanly!
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#fafaf7' }}>

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)', animationDuration: '4s' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDuration: '6s' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#111] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-semibold">M</span>
              </div>
              <span className="font-semibold text-[#111] text-lg tracking-tight">MockMentor</span>
            </Link>
            <h1 className="text-2xl font-semibold text-[#111] mt-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Welcome back
            </h1>
            <p className="text-[#aaa] text-sm mt-1">Log in to continue practising</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-[#e8e4dc] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <input type="email" className="input" placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: loading ? '#888' : 'linear-gradient(135deg, #111 0%, #333 100%)' }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Logging in…
                  </span>
                ) : 'Login →'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#f0ede6]"></div>
              <span className="text-xs text-[#ccc]">or</span>
              <div className="flex-1 h-px bg-[#f0ede6]"></div>
            </div>

            <p className="text-center text-sm text-[#aaa]">
              No account?{' '}
              <Link to="/register" className="text-[#111] hover:underline font-medium">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            <span className="text-xs text-[#bbb]">Free forever · No credit card needed</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}