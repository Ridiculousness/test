import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { AdStrategy } from '../types';

const StrategyGenerator: React.FC = () => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<AdStrategy | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) return;

    setLoading(true);
    try {
      const result = await geminiService.generateAdStrategy(product);
      setStrategy(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate strategy. Please check your internet connection or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-32 bg-[#020617] transition-colors relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0b0f1a] rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-white/5">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -z-0"></div>

          <div className="relative z-10 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Strategy Generator</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Experience the precision of AdBuy.ai. Describe your product or brand to see our AI build a high-converting media plan.</p>
          </div>

          <form onSubmit={handleGenerate} className="relative z-10 mb-16">
            <div className="flex flex-col md:flex-row gap-5">
              <input
                type="text"
                placeholder="e.g., A premium D2C skincare brand targeting Gen Z in Europe..."
                className="flex-1 bg-white/[0.03] border border-white/10 text-white px-8 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg placeholder:text-slate-600 shadow-inner"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(37,99,235,0.3)] active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : 'Generate Strategy'}
              </button>
            </div>
          </form>

          {strategy && (
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Core Message</h3>
                      <p className="text-2xl md:text-3xl font-bold text-white leading-tight">{strategy.headline}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Targeting Segments</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{strategy.targetAudience}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Omnichannel Mix</h3>
                      <div className="flex flex-wrap gap-3">
                        {strategy.channels.map((ch, i) => (
                          <span key={i} className="bg-white/5 text-blue-100 px-5 py-2 rounded-full text-sm font-bold border border-white/10 shadow-sm">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#020617] rounded-[2rem] p-10 border border-white/5 shadow-2xl space-y-10">
                    <div>
                      <h3 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Allocation Strategy</h3>
                      <p className="text-white text-lg font-semibold leading-relaxed">{strategy.suggestedBudget}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-purple-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Viral Creative Hook</h3>
                      <p className="text-slate-300 italic text-xl leading-relaxed">"{strategy.creativeHook}"</p>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          </div>
                          <div>
                             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Est. ROAS Lift</p>
                             <p className="text-emerald-400 font-black text-2xl">+42.8%</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StrategyGenerator;
