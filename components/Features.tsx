
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Predictive AI Bidding",
      desc: "Stop manually tweaking bids. Our models predict conversion likelihood in real-time to win the best inventory.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      )
    },
    {
      title: "Creative Analysis",
      desc: "Automatically tag and analyze creative performance. Know exactly which visual elements drive ROI.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )
    },
    {
      title: "Auto-Budget Allocation",
      desc: "Scale winners and cut losers across accounts instantly. Shift budget from TikTok to Meta based on real-time ROAS.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    }
  ];

  return (
    <section id="features" className="py-32 bg-[#020617] transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Scale without the <br/><span className="text-blue-500">heavy lifting.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Traditional media buying is slow, manual, and reactive. AdBuy.ai transforms your workflow with proactive AI that manages the technical complexity while you focus on brand strategy.
            </p>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl opacity-50"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden">
               <div className="w-full space-y-4">
                 <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                 <div className="h-4 bg-white/10 rounded-full w-full"></div>
                 <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                 <div className="pt-8 grid grid-cols-2 gap-4">
                   <div className="h-32 bg-blue-600/20 rounded-2xl border border-blue-500/30"></div>
                   <div className="h-32 bg-purple-600/20 rounded-2xl border border-purple-500/30"></div>
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
