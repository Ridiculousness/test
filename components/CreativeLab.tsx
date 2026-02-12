import React, { useState } from 'react';
import { geminiService } from '../services/geminiService.ts';

interface CreativeLabProps {
  hasKey: boolean;
  onActivate: () => void;
}

const CreativeLab: React.FC<CreativeLabProps> = ({ hasKey, onActivate }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasKey) {
      onActivate();
      return;
    }
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await geminiService.generateAdCreative(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="creative-lab" className="py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Visual Intelligence
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Creative Studio.</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Describe your product or campaign vision. Our image engine will generate high-converting, professional ad creatives in seconds.
            </p>
            <form onSubmit={handleGenerate} className="space-y-6">
              <textarea
                placeholder="e.g., A minimalist shot of a luxury watch on a marble surface, cinematic lighting, 8k..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-44 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  hasKey ? 'Generate High-Res Creative' : 'Activate Image Engine'
                )}
              </button>
              {!hasKey && (
                <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                  Activation required to connect to Gemini 2.5
                </p>
              )}
            </form>
          </div>
          <div className="lg:w-1/2 w-full aspect-square bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center relative group">
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
            {imageUrl ? (
              <img src={imageUrl} alt="Generated" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
            ) : (
              <div className="text-center px-10">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                  <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-slate-600 font-medium">Your AI-generated ad creative will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeLab;