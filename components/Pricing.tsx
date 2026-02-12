
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      name: "Starter",
      price: billingCycle === 'monthly' ? "49" : "39",
      desc: "Ideal for independent sellers and small boutiques.",
      features: ["Up to $5k Monthly Spend", "AI Creative Generator (10/mo)", "Automated Media Planner", "Email Support"],
      button: "Start Free Trial",
      highlight: false
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "199" : "159",
      desc: "For aggressive brands scaling across channels.",
      features: ["Up to $50k Monthly Spend", "Predictive Bidding Engine", "Advanced ROI Insights", "Priority 24/7 Support", "Unlimited AI Creatives"],
      button: "Scale with Pro",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Custom solutions for high-volume agencies.",
      features: ["Unlimited Ad Spend", "Custom Model Training", "Full API Access", "Account Strategist", "White-labeled Reports"],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Scale?</h2>
          
          <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl mb-12">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 group flex flex-col ${
                tier.highlight 
                  ? 'bg-[#0f172a] border-blue-500/50 shadow-2xl shadow-blue-600/10 scale-105 z-10' 
                  : 'bg-white/[0.02] border-white/5 text-white hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-3">{tier.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{tier.desc}</p>
              </div>

              <div className="mb-12">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-white">{tier.price === 'Custom' ? '' : '$'}{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-slate-500 text-sm font-bold">/mo</span>}
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-medium text-slate-300">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${tier.highlight ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-blue-500'}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${
                tier.highlight 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                {tier.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
