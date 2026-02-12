import React, { useState } from 'react';
import { supabase, isDemoMode } from '../services/supabaseClient.ts';

interface SignupProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode || !supabase) {
      setShowOtp(true);
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) setShowOtp(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 p-4 rounded-xl text-white font-bold">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;