import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import CreativeLab from './components/CreativeLab.tsx';
import StrategyGenerator from './components/StrategyGenerator.tsx';
import Pricing from './components/Pricing.tsx';
import Footer from './components/Footer.tsx';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';

// Removed redundant manual declaration of 'aistudio' to prevent collision with the pre-configured AIStudio type provided by the environment.

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      // Check if platform requires key selection. Using 'any' to bypass declaration conflicts.
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        try {
          const selected = await aistudio.hasSelectedApiKey();
          setHasKey(selected);
        } catch (e) {
          console.error("Error checking API key status:", e);
          setHasKey(false);
        }
      } else {
        // Fallback for local/other environments
        setHasKey(!!(typeof process !== 'undefined' && process.env?.API_KEY));
      }
    };
    checkKey();
    document.documentElement.classList.add('dark');
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      try {
        await aistudio.openSelectKey();
        // Per instructions: assume key selection was successful after triggering openSelectKey() to mitigate race conditions.
        setHasKey(true); 
      } catch (e) {
        console.error("Error opening key selector:", e);
      }
    }
  };

  const navigateTo = (newView: 'landing' | 'login' | 'signup') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-2xl">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,99,235,0.3)]">
            <span className="text-white font-black text-3xl">A</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Activate AdBuy AI</h1>
          <p className="text-slate-400 mb-10 leading-relaxed">
            To use the Gemini 3 media buying engine, you must select a valid API key from a paid Google Cloud project.
          </p>
          <button 
            onClick={handleSelectKey}
            className="w-full bg-white text-[#020617] font-black py-5 rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
          >
            Select API Key
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="block mt-6 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
          >
            Billing Documentation
          </a>
        </div>
      </div>
    );
  }

  const mainContent = (
    <div className="bg-[#020617]">
      <Hero onNavigate={navigateTo} />
      
      <div className="py-24 border-y border-white/[0.03] bg-[#020617] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-16">
            Leading media buyers automate with AdBuy
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale transition-all duration-1000 hover:grayscale-0 hover:opacity-60">
             <div className="text-2xl font-black tracking-tighter italic text-white">Meta</div>
             <div className="text-2xl font-black tracking-tighter text-white">Google</div>
             <div className="text-2xl font-black tracking-tighter text-white">TikTok</div>
             <div className="text-2xl font-black tracking-tighter text-white">Snapchat</div>
          </div>
        </div>
      </div>

      <Features />
      <HowItWorks />
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>
      
      <CreativeLab />
      <StrategyGenerator />
      <Pricing />

      <section className="py-48 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-[1.1]">The future of media buying is <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">already here.</span></h2>
          <button 
            onClick={() => navigateTo('signup')}
            className="group relative bg-white text-[#020617] px-16 py-7 rounded-[2rem] text-xl font-black hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Get Started Free 
          </button>
        </div>
      </section>
    </div>
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#020617] text-slate-100">
        <Navbar onNavigate={navigateTo} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          {hasKey === null ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {view === 'landing' && mainContent}
              {view === 'login' && <Login onNavigate={navigateTo} />}
              {view === 'signup' && <Signup onNavigate={navigateTo} />}
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;