import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { 
  Sprout, 
  PackageCheck, 
  ThermometerSnowflake, 
  Truck, 
  Store, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  emoji: string;
  color: string;
  roleTrigger?: UserRole;
}

interface AgriFlowPipelineVisualizerProps {
  currentStageIndex?: number;
  onSelectStage?: (role: UserRole) => void;
  activeRole?: UserRole;
}

export const AgriFlowPipelineVisualizer: React.FC<AgriFlowPipelineVisualizerProps> = ({
  onSelectStage,
  activeRole = 'farmer'
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stages: PipelineStage[] = [
    {
      id: 'farm',
      name: 'Farm Production',
      sub: 'Agronomy & Harvest',
      icon: <Sprout className="w-4 h-4 text-emerald-400" />,
      emoji: '🌱',
      color: '#10b981',
      roleTrigger: 'farmer'
    },
    {
      id: 'packaging',
      name: 'Packaging AI',
      sub: 'SIH26236 OTR/WVTR',
      icon: <PackageCheck className="w-4 h-4 text-purple-400" />,
      emoji: '📦',
      color: '#a855f7',
      roleTrigger: 'packaging'
    },
    {
      id: 'storage',
      name: 'Storage & Cold Chain',
      sub: 'Microclimate Lock',
      icon: <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />,
      emoji: '❄️',
      color: '#06b6d4',
      roleTrigger: 'packaging'
    },
    {
      id: 'transport',
      name: 'Fleet Logistics',
      sub: 'GPS & Telemetry',
      icon: <Truck className="w-4 h-4 text-sky-400" />,
      emoji: '🚚',
      color: '#0ea5e9',
      roleTrigger: 'logistics'
    },
    {
      id: 'market',
      name: 'Mandi & Realization',
      sub: 'APMC Price Discovery',
      icon: <Store className="w-4 h-4 text-amber-400" />,
      emoji: '🏛️',
      color: '#f59e0b',
      roleTrigger: 'farmer'
    },
    {
      id: 'customer',
      name: 'Marketplace & Passport',
      sub: 'Direct-to-Fork Trace',
      icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
      emoji: '🛒',
      color: '#ec4899',
      roleTrigger: 'customer'
    }
  ];

  // Subtle traveling animation across the 6 nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="w-full rounded-2xl bg-slate-950/80 border border-purple-500/20 p-3 sm:p-4 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-wider uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-400" /> AgriFlow Farm-to-Fork Pipeline
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Intelligent post-harvest chain
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          Step 0{activeStep + 1} / 0{stages.length} Active
        </div>
      </div>

      {/* Pipeline Stage Nodes Track */}
      <div className="relative flex items-center justify-between gap-1 sm:gap-2 pt-1 overflow-x-auto scrollbar-none">
        
        {/* Connecting Background Line */}
        <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-800 -z-0" />
        
        {/* Animated Active Progress Fill Line */}
        <div
          className="absolute top-5 left-4 h-0.5 bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 transition-all duration-700 -z-0"
          style={{ width: `${(activeStep / (stages.length - 1)) * 92}%` }}
        />

        {stages.map((stage, idx) => {
          const isCurrentActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={stage.id}
              onClick={() => stage.roleTrigger && onSelectStage?.(stage.roleTrigger)}
              className="relative z-10 flex flex-col items-center text-center group cursor-pointer shrink-0 min-w-[75px] sm:min-w-[100px] focus:outline-none"
            >
              {/* Circular Node with Traveling Pulsing Indicator */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-base sm:text-lg transition-all duration-500 shadow-md ${
                  isCurrentActive
                    ? 'scale-110 ring-2 ring-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)] bg-slate-900 border-2'
                    : isPassed
                    ? 'bg-slate-900/90 border border-slate-700 text-slate-300'
                    : 'bg-slate-950 border border-slate-800 text-slate-500'
                }`}
                style={{
                  borderColor: isCurrentActive ? stage.color : undefined
                }}
              >
                {stage.emoji}

                {/* Traveling Package Pulse on Active Node */}
                {isCurrentActive && (
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: stage.color }}
                  />
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-1.5 space-y-0.5">
                <span
                  className={`block text-[10px] sm:text-xs font-bold leading-tight transition-colors ${
                    isCurrentActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {stage.name}
                </span>
                <span className="hidden sm:block text-[9px] text-slate-500 font-mono">
                  {stage.sub}
                </span>
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
};
