
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CreativeLab from './components/CreativeLab';
import StrategyGenerator from './components/StrategyGenerator';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navigateTo = (newView: 'landing' | 'login' | 'signup') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const mainContent = (
    <div className="bg-[#020617]">
      <Hero onNavigate={navigateTo} />
      
      {/* Logos Marquee - Ultra-clean look */}
      <div className="py-24 border-y border-white/[0.03] bg-[#020617] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-16">
            Leading media buyers automate with AdBuy
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale transition-all duration-1000 hover:grayscale-0 hover:opacity-60">
             <div className="text-2xl font-black tracking-tighter italic text-white flex items-center gap-2">
               <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">M</span> Meta
             </div>
             <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
               <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">G</span> Google
             </div>
             <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
               <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">T</span> TikTok
             </div>
             <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
               <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">S</span> Snapchat
             </div>
             <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
               <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">Y</span> YouTube
             </div>
          </div>
        </div>
      </div>

      <Features />
      <HowItWorks />
      
      {/* Visual Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>
      
      <CreativeLab />
      <StrategyGenerator />
      <Pricing />

      {/* Final Premium CTA */}
      <section className="py-48 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-[1.1]">The future of media buying is <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">already here.</span></h2>
          <p className="text-slate-400 text-xl mb-16 max-w-xl mx-auto leading-relaxed">
            Stop wasting time on manual uploads and bid adjustments. Let AdBuy automate your scale so you can build the brand.
          </p>
          <button 
            onClick={() => navigateTo('signup')}
            className="group relative bg-white text-[#020617] px-16 py-7 rounded-[2rem] text-xl font-black hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started Free 
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </button>
        </div>
      </section>
    </div>
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/40">
        <Navbar onNavigate={navigateTo} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          {view === 'landing' && mainContent}
          {view === 'login' && <Login onNavigate={navigateTo} />}
          {view === 'signup' && <Signup onNavigate={navigateTo} />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
