import React from 'react';

interface HeroProps {
  onNavigate: (view: 'landing' | 'login' | 'signup') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-44 pb-24 lg:pt-64 lg:pb-48 overflow-hidden bg-[#020617]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[180px] opacity-60"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full text-blue-400 text-[11px] font-black uppercase tracking-[0.25em] mb-12 backdrop-blur-md shadow-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Next-Gen Performance Marketing
        </div>

        <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tight leading-[0.9] mb-10 max-w-6xl mx-auto drop-shadow-2xl">
          Media buying <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">on autopilot.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-16 font-medium px-4">
          AdBuy.ai is the world's first advertising OS powered by Gemini 3. 
          Automated bidding, cross-channel budget shifting, and creative testing at scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-36">
          <button 
            onClick={() => onNavigate('signup')}
            className="w-full sm:w-auto bg-blue-600 text-white px-14 py-6 rounded-2xl text-lg font-bold hover:bg-blue-500 transition-all shadow-[0_0_60px_rgba(37,99,235,0.45)] active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Scaling Free
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </button>
          <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-14 py-6 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95">
            Book a Demo
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto px-4 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[3.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#0b0f1a] rounded-[3rem] p-3 shadow-2xl border border-white/10 overflow-hidden">
             <div className="bg-[#020617] rounded-[2.8rem] border border-white/5 p-4 md:p-10">
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/40"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/40"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-40 h-5 bg-white/5 rounded-full"></div>
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/20"></div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8">
                   <div className="space-y-5 col-span-1">
                     <div className="h-12 bg-blue-600/10 rounded-xl border border-blue-500/30 flex items-center px-4">
                       <div className="w-full h-2.5 bg-blue-400/30 rounded-full"></div>
                     </div>
                     {[1,2,3,4].map(i => (
                       <div key={i} className="h-12 bg-white/[0.03] rounded-xl border border-white/5"></div>
                     ))}
                   </div>
                   <div className="col-span-3 space-y-10">
                     <div className="grid grid-cols-3 gap-8">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-44 bg-white/[0.02] rounded-3xl border border-white/5 p-8 flex flex-col justify-between group/card hover:bg-white/[0.04] transition-colors">
                            <div className="w-20 h-2 bg-white/10 rounded-full"></div>
                            <div className="w-32 h-12 bg-blue-600/5 rounded-xl border border-blue-500/10"></div>
                          </div>
                        ))}
                     </div>
                     <div className="h-80 bg-gradient-to-br from-white/[0.04] to-transparent rounded-[2.5rem] border border-white/5 relative flex items-center justify-center group/main">
                        <div className="w-full px-20 h-px bg-white/5"></div>
                        <div className="absolute w-4/5 h-3/5 bg-blue-600/5 blur-[80px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-3/4 h-3/4 border border-dashed border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
