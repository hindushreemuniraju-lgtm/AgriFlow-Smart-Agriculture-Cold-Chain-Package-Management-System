import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Sprout, PackageCheck, ShoppingCart, Truck, Check, Sparkles } from 'lucide-react';

export const RoleOnboardingModal: React.FC = () => {
  const { isRoleOnboardingOpen, setIsRoleOnboardingOpen, user, toggleRole, switchRole } = useAuth();

  if (!isRoleOnboardingOpen) return null;

  const rolesConfig: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'farmer',
      title: 'Farmer & Agro-Producer',
      subtitle: 'Manage crop agronomy, harvest schedules, live mandi radar & packaging BOMs',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-500/10'
    },
    {
      role: 'packaging',
      title: 'Packaging Intelligence Specialist',
      subtitle: 'SIH26236 FoodTech module: OTR/WVTR barrier analysis, gas exchange & material decision engine',
      icon: <PackageCheck className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-500/10'
    },
    {
      role: 'customer',
      title: 'Customer & Food Consumer',
      subtitle: 'Browse farm-to-table marketplace, scan digital product passports & buy authentic farm goods',
      icon: <ShoppingCart className="w-5 h-5 text-pink-400" />,
      color: 'border-pink-500/40 bg-pink-500/10'
    },
    {
      role: 'logistics',
      title: 'Transporter & Cold-Chain Fleet',
      subtitle: 'Bid on live logistics loads, evaluate highway distance suitability & monitor reefer telemetry',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/40 bg-sky-500/10'
    }
  ];

  const handleFinish = () => {
    setIsRoleOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-slate-100 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl -z-10" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" /> One Account • Dynamic Ecosystem
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">How do you want to use AgriFlow?</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Select one or multiple roles. You can switch or add more roles at any time.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-3 mb-6">
          {rolesConfig.map((item) => {
            const isSelected = user.roles.includes(item.role);
            return (
              <div
                key={item.role}
                onClick={() => toggleRole(item.role)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? `${item.color} shadow-[0_0_20px_rgba(168,85,247,0.2)] border-purple-400`
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="mt-0.5 w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                  {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                </div>

                <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{item.title}</h4>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest bg-purple-500/20 px-2 py-0.5 rounded-md">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleFinish}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <span>Save Preferences & Enter Platform</span>
          <Sparkles className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
