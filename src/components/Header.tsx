import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, LanguageCode } from '../types';
import { Sprout, Truck, QrCode, Globe, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeOrdersCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onSelectRole, activeOrdersCount }) => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);

  const currentLangObj = availableLanguages.find(l => l.code === language) || availableLanguages[0];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectRole('farmer')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-sky-400 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-slate-950/90 rounded-2xl flex items-center justify-center">
                <span className="text-2xl animate-pulse">🌱</span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border border-slate-900"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" /> 4.0
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-400 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Interface Role Switcher */}
          <nav className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/20 shadow-inner">
            {/* Farmer Interface */}
            <button
              onClick={() => onSelectRole('farmer')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'farmer'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sprout className={`w-4 h-4 ${currentRole === 'farmer' ? 'text-emerald-300 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{t.roles.farmer}</span>
              <span className="sm:hidden">Farmer</span>
            </button>

            {/* Logistics Interface */}
            <button
              onClick={() => onSelectRole('logistics')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'logistics'
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] border border-sky-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Truck className={`w-4 h-4 ${currentRole === 'logistics' ? 'text-sky-300' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{t.roles.logistics}</span>
              <span className="sm:hidden">Fleet</span>
              {activeOrdersCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 rounded-full">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            {/* Customer Interface */}
            <button
              onClick={() => onSelectRole('customer')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'customer'
                  ? 'bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] border border-fuchsia-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <QrCode className={`w-4 h-4 ${currentRole === 'customer' ? 'text-pink-300' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{t.roles.customer}</span>
              <span className="sm:hidden">Passport</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 hidden md:inline" />
            </button>
          </nav>

          {/* Multilingual Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/30 text-slate-200 hover:border-purple-400 text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Globe className="w-4 h-4 text-purple-400 animate-spin-slow" />
              <span className="text-base">{currentLangObj.flag}</span>
              <span className="font-semibold text-slate-200">{currentLangObj.native}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Dropdown Menu */}
            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-purple-500/40 shadow-2xl p-1.5 z-50 animate-scale-in">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-purple-500/20">
                    Select Language / भाषा
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as LanguageCode);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all ${
                          language === lang.code
                            ? 'bg-purple-600/30 text-purple-200 font-semibold border border-purple-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.native}</span>
                        </span>
                        <span className="text-xs text-slate-500 font-mono">({lang.label})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
