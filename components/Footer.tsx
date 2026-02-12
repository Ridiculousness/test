
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/5 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">AdBuy<span className="text-blue-500">.ai</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The world's most powerful AI platform for automated media buying. Scale your brand to the moon.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Media Planner</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Creative Lab</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Predictive Bidding</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">ROI Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-600">
          <p>© 2025 AdBuy AI Technology Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
