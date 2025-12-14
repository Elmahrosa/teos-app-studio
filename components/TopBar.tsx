import React, { useState } from 'react';
import { Bell, Search, User, Command, Globe } from 'lucide-react';

export const TopBar: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects, templates, or docs..."
            className="w-full bg-slate-900 border border-slate-800 text-stone-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400/50 placeholder:text-slate-600"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Command className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-600 font-mono">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button 
          onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-stone-100 hover:bg-slate-900 transition-colors text-xs font-bold"
        >
          <Globe className="w-3 h-3" />
          {lang}
        </button>

        <div className="h-6 w-px bg-slate-800"></div>

        <button className="relative p-2 text-slate-400 hover:text-stone-100 hover:bg-slate-900 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border border-slate-950"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-stone-200">Ayman Engineer</div>
            <div className="text-xs text-slate-500">Lead Architect</div>
          </div>
          <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-900/20">
            AE
          </div>
        </div>
      </div>
    </header>
  );
};