import React, { useState } from 'react';
import { supabase, isDemoMode } from '../services/supabaseClient.ts';

interface SignupProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // If we're already in demo mode or Supabase isn't configured, skip real auth
    if (isDemoMode || !supabase) {
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) {
        // Handle the specific rate limit error with a helpful UI message
        if (error.message.includes("rate limit")) {
          setErrorMsg("The authentication server is rate-limited. Please use 'Demo Mode' to skip verification.");
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try Demo Mode.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkipToDemo = () => {
    // Navigate directly to landing as if logged in
    onNavigate('landing');
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 text-center">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Account Created</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            {isDemoMode || !supabase
              ? "Your demo account is ready! You can now log in using Demo Mode."
              : "Check your email for a confirmation link to activate your account."}
          </p>
          <button 
            onClick={() => onNavigate('login')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Join the future of media buying</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-3">
              <span className="text-red-400 text-sm font-medium">{errorMsg}</span>
              {errorMsg.includes("rate limit") && (
                <button 
                  onClick={handleSkipToDemo}
                  className="text-xs font-bold text-white bg-red-500/20 py-2 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/20"
                >
                  Skip Verification & Launch Demo →
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Create Free Account'}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0f1a] px-2 text-slate-500 font-bold tracking-widest">or</span></div>
            </div>

            <button 
              type="button"
              onClick={handleSkipToDemo}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              🚀 Continue in Demo Mode
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account? <button onClick={() => onNavigate('login')} className="text-blue-400 font-bold hover:underline">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;