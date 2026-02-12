import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const CreativeLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await geminiService.generateAdCreative(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      alert("Creative generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="creative-lab" className="py-32 bg-[#020617] transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Creative <br/><span className="text-blue-500">Studio.</span></h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Don't let design bottlenecks slow your scale. Generate high-fidelity, high-performance ad creatives in seconds using our proprietary vision models.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <textarea
                  placeholder="e.g. A hyper-realistic 3D render of a futuristic luxury watch on a dark background, neon blue lighting, cinematic bokeh..."
                  className="relative w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600 text-lg shadow-inner"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
              >
                {loading ? (
                   <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Rendering Masterpiece...
                   </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" /></svg>
                    Generate Creative
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:w-1/2 w-full aspect-square relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative h-full w-full bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-sm">
              {imageUrl ? (
                <img src={imageUrl} alt="Generated Ad" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
              ) : (
                <div className="text-center p-16">
                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-slate-500 font-bold text-lg max-w-xs mx-auto">Your AI-generated creative will materialize here.</p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 relative">
                     <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black text-2xl mb-2 tracking-tight">AI Drafting...</p>
                    <p className="text-slate-500 text-sm animate-pulse">Computing performance-optimized pixels</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeLab;
