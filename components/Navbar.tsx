
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">AdBuy<span className="text-blue-500">.ai</span></span>
        </button>

        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-400">
          <a href="#features" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="hover:text-white transition-colors">Features</a>
          <a href="#creative-lab" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="hover:text-white transition-colors">Creative Studio</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="hover:text-white transition-colors">Pricing</a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="hover:text-white transition-colors">Generator</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('login')}
            className="hidden sm:block text-sm font-bold text-white hover:text-blue-400 transition-colors"
          >
            Log in
          </button>
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-white text-[#020617] px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-50 transition-all shadow-xl active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
