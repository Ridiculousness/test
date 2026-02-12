import React, { useState } from 'react';
import { geminiService } from '../services/geminiService.ts';
import { AdStrategy } from '../types.ts';

interface StrategyGeneratorProps {
  hasKey: boolean;
  onActivate: () => void;
}

const StrategyGenerator: React.FC<StrategyGeneratorProps> = ({ hasKey, onActivate }) => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<AdStrategy | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasKey) {
      onActivate();
      return;
    }
    if (!product.trim()) return;

    setLoading(true);
    try {
      const result = await geminiService.generateAdStrategy(product);
      setStrategy(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-32 bg-[#020617] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0b0f1a] rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative border border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Strategy Generator</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Input your product details and let Gemini 3 architect your entire media buying funnel.</p>
          </div>

          <form onSubmit={handleGenerate} className="mb-16 relative">
            <div className="flex flex-col md:flex-row gap-5">
              <input
                type="text"
                placeholder="e.g., A premium D2C skincare brand..."
                className="flex-1 bg-white/[0.03] border border-white/10 text-white px-8 py-5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  hasKey ? 'Generate Strategy' : 'Activate AI Engine'
                )}
              </button>
            </div>
            {!hasKey && (
              <p className="text-[10px] text-slate-500 mt-4 text-center font-bold uppercase tracking-widest">
                Requires API Key Activation to use Gemini 3
              </p>
            )}
          </form>

          {strategy && (
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Headline</h3>
                    <p className="text-2xl font-bold text-white leading-tight">{strategy.headline}</p>
                  </div>
                  <div>
                    <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Targeting</h3>
                    <p className="text-slate-400 leading-relaxed">{strategy.targetAudience}</p>
                  </div>
                </div>
                <div className="bg-[#020617] p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
                  <h3 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Budget Plan</h3>
                  <p className="text-white text-lg font-medium">{strategy.suggestedBudget}</p>
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