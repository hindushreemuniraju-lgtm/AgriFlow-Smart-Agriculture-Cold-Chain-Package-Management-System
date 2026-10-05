import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { UserRole, LanguageCode } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Sprout, 
  PackageCheck, 
  ShoppingCart, 
  Truck, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  User, 
  Layers, 
  Check, 
  LogIn, 
  LogOut, 
  PlusCircle, 
  Wallet,
  Settings,
  Mic
} from 'lucide-react';
import { SarvamVoiceAssistantModal } from './voice/SarvamVoiceAssistantModal';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeOrdersCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onSelectRole, activeOrdersCount }) => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { user, isLoggedIn, logout, setIsAuthModalOpen, setIsRoleOnboardingOpen, switchRole, toggleRole } = useAuth();
  
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  const currentLangObj = availableLanguages.find(l => l.code === language) || availableLanguages[0];

  const handleRoleClick = (role: UserRole) => {
    switchRole(role);
    onSelectRole(role);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/90 border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleRoleClick('farmer')}>
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
                  <Sparkles className="w-3 h-3 text-sky-400" /> SIH26236
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-400 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Interface Role Switcher (4 Unified Modes) */}
          <nav className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/20 shadow-inner">
            
            {/* 1. Farmer Interface */}
            <button
              onClick={() => handleRoleClick('farmer')}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'farmer'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sprout className={`w-4 h-4 ${currentRole === 'farmer' ? 'text-emerald-200 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Farmer</span>
            </button>

            {/* 2. Packaging Interface (SIH26236) */}
            <button
              onClick={() => handleRoleClick('packaging')}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'packaging'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <PackageCheck className={`w-4 h-4 ${currentRole === 'packaging' ? 'text-purple-200' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Packaging AI</span>
              <span className="md:hidden">Pack</span>
              <span className="hidden lg:inline text-[9px] bg-purple-500/30 text-purple-200 px-1.5 py-0.2 rounded font-mono font-bold">
                SIH
              </span>
            </button>

            {/* 3. Customer Interface */}
            <button
              onClick={() => handleRoleClick('customer')}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'customer'
                  ? 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-pink-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShoppingCart className={`w-4 h-4 ${currentRole === 'customer' ? 'text-pink-200' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Marketplace</span>
              <span className="sm:hidden">Shop</span>
            </button>

            {/* 4. Logistics & Fleet Interface */}
            <button
              onClick={() => handleRoleClick('logistics')}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                currentRole === 'logistics'
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] border border-sky-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Truck className={`w-4 h-4 ${currentRole === 'logistics' ? 'text-sky-200' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Fleet</span>
              {activeOrdersCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 rounded-full">
                  {activeOrdersCount}
                </span>
              )}
            </button>

          </nav>

          {/* Right Action Controls: Unified User Profile + Multilingual Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Unified User Account Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-slate-200 hover:border-purple-400 text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="text-xs font-bold text-white block leading-tight truncate max-w-[120px]">{user.name}</span>
                  <span className="text-[10px] text-purple-300 font-mono block capitalize">{currentRole} Mode</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-purple-500/40 shadow-2xl p-4 z-50 animate-scale-in text-slate-200 space-y-3">
                    
                    {/* User Card */}
                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-base font-bold text-white shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                        <p className="text-[10px] text-purple-300 font-mono truncate">{user.location}</p>
                      </div>
                    </div>

                    {/* Wallet Balance */}
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Wallet className="w-3.5 h-3.5 text-purple-400" /> Wallet Balance
                      </span>
                      <span className="font-bold text-emerald-400 font-mono">{formatCurrency(user.walletBalance)}</span>
                    </div>

                    {/* Fast Role Switcher */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Switch Active Workspace
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                        <button
                          onClick={() => {
                            handleRoleClick('farmer');
                            setUserMenuOpen(false);
                          }}
                          className={`p-2 rounded-xl flex items-center gap-1.5 text-left transition-all ${
                            currentRole === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span>👨‍🌾</span> <span>Farmer</span>
                        </button>

                        <button
                          onClick={() => {
                            handleRoleClick('packaging');
                            setUserMenuOpen(false);
                          }}
                          className={`p-2 rounded-xl flex items-center gap-1.5 text-left transition-all ${
                            currentRole === 'packaging' ? 'bg-purple-600 text-white' : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span>📦</span> <span>Packaging</span>
                        </button>

                        <button
                          onClick={() => {
                            handleRoleClick('customer');
                            setUserMenuOpen(false);
                          }}
                          className={`p-2 rounded-xl flex items-center gap-1.5 text-left transition-all ${
                            currentRole === 'customer' ? 'bg-pink-600 text-white' : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span>🛒</span> <span>Customer</span>
                        </button>

                        <button
                          onClick={() => {
                            handleRoleClick('logistics');
                            setUserMenuOpen(false);
                          }}
                          className={`p-2 rounded-xl flex items-center gap-1.5 text-left transition-all ${
                            currentRole === 'logistics' ? 'bg-sky-600 text-white' : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span>🚚</span> <span>Fleet</span>
                        </button>
                      </div>
                    </div>

                    {/* Manage Roles & Auth Action Buttons */}
                    <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                      <button
                        onClick={() => {
                          setIsRoleOnboardingOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-purple-300 hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Manage & Add Platform Roles</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-sky-400" />
                        <span>Account & Security Settings</span>
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Sarvam AI Indic Voice Mitra Button */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-700/30 to-indigo-700/30 hover:from-purple-600/40 hover:to-indigo-600/40 border border-purple-500/40 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer"
              title="Open Kisan Sarvam AI Voice Mitra"
            >
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Sarvam Voice</span>
            </button>

            {/* Multilingual Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-slate-200 hover:border-purple-400 text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="font-semibold text-slate-200 hidden sm:inline">{currentLangObj.native}</span>
              </button>

              {/* Language Dropdown Menu */}
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
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
      </div>

      {/* Sarvam AI Indic Voice Assistant Modal */}
      <SarvamVoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
      />
    </header>
  );
};
