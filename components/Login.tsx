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

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode || !supabase) {
      setShowOtp(true);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMessage({ type: 'error', text: error.message });
    else setShowOtp(true);
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode || !supabase) {
      onNavigate('landing');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
    if (error) setMessage({ type: 'error', text: error.message });
    else onNavigate('landing');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{showOtp ? 'Verify' : 'Login'}</h2>
        {!showOtp ? (
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-blue-600 p-4 rounded-xl text-white font-bold">Login</button>
            <button type="button" onClick={handleDemoAccess} className="w-full text-slate-500 text-sm">Use Demo Mode</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input 
              type="text" 
              placeholder="Code" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-center text-2xl"
              onChange={(e) => setToken(e.target.value)}
            />
            <button className="w-full bg-blue-600 p-4 rounded-xl text-white font-bold">Verify</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;