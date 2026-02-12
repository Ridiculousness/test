import React, { useState } from 'react';
import { geminiService } from '../services/geminiService.ts';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="creative-lab" className="py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold text-white mb-8">Creative Studio.</h2>
            <form onSubmit={handleGenerate} className="space-y-6">
              <textarea
                placeholder="Describe your ad creative..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-40 text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all"
              >
                {loading ? 'Generating...' : 'Generate Creative'}
              </button>
            </form>
          </div>
          <div className="lg:w-1/2 w-full aspect-square bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Generated" className="w-full h-full object-cover" />
            ) : (
              <p className="text-slate-500">Your creative will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeLab;