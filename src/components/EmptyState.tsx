import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetText?: string;
}

export function EmptyState({
  title = 'No Locations Discovered',
  message = 'No campus coordinates matched your spatial search parameters. Try adjusting your query or category filters.',
  onReset,
  resetText = 'Clear Filters & Reset',
}: EmptyStateProps) {
  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-void-850/60 p-10 sm:p-14 text-center backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden">
      {/* Background cyber circle */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full bg-cursed-purple/10 blur-3xl pointer-events-none" />

      <div className="relative mb-4 flex items-center justify-center w-16 h-16 rounded-2xl bg-void-800 border border-electric-blue/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
        <Compass className="w-8 h-8 text-electric-cyan animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-electric-blue/40 bg-electric-dark/20 text-electric-blue text-xs font-semibold uppercase tracking-wider hover:bg-electric-blue hover:text-void-950 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {resetText}
        </button>
      )}
    </div>
  );
}
