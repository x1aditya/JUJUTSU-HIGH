'use client';

import React from 'react';
import { SENIOR_TIPS } from '@/data/manual/tipsData';
import { MessageSquareQuote, GraduationCap } from 'lucide-react';

export function SeniorTips() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquareQuote className="w-4 h-4 text-electric-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              CAMPUS SURVIVAL WISDOM // SENIORS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Advice from <span className="text-gradient-cyan">seniors</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Unfiltered field advice from upperclassmen who have already conquered the campus trial.
          </p>
        </div>

        {/* Counter */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 text-xs font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
          <span>{SENIOR_TIPS.length} FIELD PROTOCOLS</span>
        </div>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SENIOR_TIPS.map((tip) => (
          <div
            key={tip.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-void-900/70 backdrop-blur-xl p-6 transition-all duration-300 hover:border-cursed-purple/50 shadow-glass-panel flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Top Quote Icon */}
            <div className="font-serif-jp text-6xl text-cursed-purple leading-none select-none -mb-3 opacity-80 group-hover:text-electric-cyan transition-colors">
              “
            </div>

            {/* Tip Body */}
            <p className="relative z-10 text-sm sm:text-base text-slate-200 leading-relaxed font-sans mb-6">
              {tip.text}
            </p>

            {/* Author Attribution */}
            <div className="relative z-10 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
              <GraduationCap className="w-4 h-4 text-electric-cyan" />
              <span>{tip.by}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
