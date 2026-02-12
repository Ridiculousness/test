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

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const checkKeyStatus = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      try {
        const selected = await aistudio.hasSelectedApiKey();
        setHasKey(selected);
        return selected;
      } catch (e) {
        setHasKey(false);
        return false;
      }
    } else {
      const exists = !!(typeof process !== 'undefined' && process.env?.API_KEY);
      setHasKey(exists);
      return exists;
    }
  };

  useEffect(() => {
    checkKeyStatus();
    document.documentElement.classList.add('dark');
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      try {
        await aistudio.openSelectKey();
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

  const landingPage = (
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
      
      <CreativeLab hasKey={!!hasKey} onActivate={handleSelectKey} />
      <StrategyGenerator hasKey={!!hasKey} onActivate={handleSelectKey} />
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
      <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
        <Navbar onNavigate={navigateTo} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow">
          {view === 'landing' && landingPage}
          {view === 'login' && <Login onNavigate={navigateTo} />}
          {view === 'signup' && <Signup onNavigate={navigateTo} />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;