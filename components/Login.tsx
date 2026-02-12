import React, { useState } from 'react';
import { isDemoMode, supabase } from '../services/supabaseClient.ts';

interface LoginProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleDemoAccess = () => {
    onNavigate('landing');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (isDemoMode || !supabase) {
      setShowOtp(true);
      setMessage({ type: 'success', text: "Demo Mode Active: Enter any 6-digit code to proceed." });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setShowOtp(true);
        setMessage({ type: 'success', text: "Verification code sent! Please check your inbox." });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: "Authentication service unavailable." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (isDemoMode || !supabase) {
      onNavigate('landing');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ 
        email, 
        token, 
        type: 'email' 
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        onNavigate('landing');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: "Verification failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{showOtp ? 'Verification' : 'Sign In'}</h2>
            <p className="text-slate-400">{showOtp ? `We sent a 6-digit code to ${email}` : 'Access your AdBuy account'}</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {!showOtp ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Send Access Code'}
              </button>

              <button 
                type="button"
                onClick={handleDemoAccess}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
              >
                🚀 Launch Demo
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">6-Digit Code</label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-3xl font-black tracking-[0.4em] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Verify & Continue'}
              </button>

              <button 
                type="button"
                onClick={() => setShowOtp(false)}
                className="w-full text-slate-400 text-sm font-bold hover:text-white transition-colors py-2"
              >
                ← Back to Login
              </button>
            </form>
          )}

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account? <button onClick={() => onNavigate('signup')} className="text-blue-400 font-bold hover:underline">Sign up for free</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;