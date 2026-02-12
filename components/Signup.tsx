
import React, { useState } from 'react';
import { supabase, isDemoMode } from '../services/supabaseClient';

interface SignupProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleDemoAccess = () => {
    setLoading(true);
    setTimeout(() => {
      onNavigate('landing');
      setLoading(false);
    }, 800);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemoMode || !supabase) {
      setMessage({ type: 'success', text: "[DEMO] Account created. Please enter any 6 digits." });
      setShowOtp(true);
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: "Registration successful! Enter the code from your email." });
        setShowOtp(true);
      }
    } catch (err) {
      setMessage({ type: 'error', text: "Failed to connect to Supabase." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (isDemoMode || !supabase) {
      handleDemoAccess();
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        onNavigate('landing');
      }
    } catch (err) {
      setMessage({ type: 'error', text: "Verification failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{showOtp ? 'Confirm Email' : 'Start Scaling.'}</h2>
          <p className="text-slate-400 mb-10 max-w-xs mx-auto">
            {showOtp ? `We sent a 6-digit code to ${email}` : 'Create your account and automate your media buying in seconds.'}
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {!showOtp ? (
            <form onSubmit={handleSignUp} className="space-y-6 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="jane@brand.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Minimum 6 characters" 
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Create Account"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#020617] px-2 text-slate-600 tracking-tighter">OR</span></div>
              </div>

              <button 
                type="button"
                onClick={handleDemoAccess}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
              >
                🚀 Use Instant Demo
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Enter Code</label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl font-black tracking-[0.5em] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Confirm Account'}
              </button>

              <button 
                type="button"
                onClick={() => setShowOtp(false)}
                className="w-full text-slate-400 text-sm font-bold hover:text-white transition-colors py-2"
              >
                ← Edit Info
              </button>
            </form>
          )}

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account? <button onClick={() => onNavigate('login')} className="text-blue-400 font-bold hover:underline">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
