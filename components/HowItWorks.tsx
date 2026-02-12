
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Connect Channels",
      desc: "Securely link your Meta, Google, and TikTok accounts. Our AI begins analyzing your historical data instantly to find untapped opportunities.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Define Objectives",
      desc: "Set your target ROAS, CPA thresholds, and daily limits. AdBuy's brain translates your business goals into granular bidding and budget strategies.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Autopilot Scaling",
      desc: "Sit back as the AI works 24/7. It shifts budget from failing ads to winners, refreshes creative, and scales your winners to new heights.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The AdBuy Engine</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Traditional media buying is reactive. Our engine is proactive, managing millions of data points every second to ensure your ROAS never dips.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              <div className="mb-10 relative">
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1">
                  {step.icon}
                </div>
                <span className="absolute -top-6 -left-4 text-6xl font-black text-white/[0.03] select-none group-hover:text-blue-500/5 transition-colors duration-500">
                  {step.num}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
