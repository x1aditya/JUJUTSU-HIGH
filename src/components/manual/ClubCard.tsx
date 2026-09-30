'use client';

import React from 'react';
import { Club } from '@/data/manual/types';
import { CATEGORY_KANJI } from '@/data/manual/quizData';
import { CATEGORY_COLORS } from '@/data/manual/clubsData';
import { cn } from '@/lib/utils';

interface ClubCardProps {
  club: Club;
  className?: string;
}

export function ClubCard({ club, className }: ClubCardProps) {
  const kanji = CATEGORY_KANJI[club.cat];
  const colors = CATEGORY_COLORS[club.cat];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-void-900/70 backdrop-blur-md p-5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1',
        colors.border,
        colors.borderHover,
        'shadow-glass-panel hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      {/* Background Japanese Watermark Kanji */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -right-2 -top-4 font-serif-jp text-8xl font-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-25',
          colors.kanjiColor
        )}
      >
        {kanji}
      </span>

      {/* Top Header Row */}
      <div className="relative z-10 mb-3">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border mb-3',
            colors.tagBg,
            colors.tagText,
            colors.border
          )}
        >
          <span>{club.cat}</span>
          <span className="font-serif-jp opacity-75">{kanji}</span>
        </span>

        <h3 className="text-lg font-bold text-white group-hover:text-electric-cyan transition-colors">
          {club.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
          {club.about}
        </p>
      </div>

      {/* Join Information Box */}
      <div
        className={cn(
          'relative z-10 mt-3 pt-3 border-l-2 pl-3 text-xs text-slate-300 font-mono bg-white/[0.02] rounded-r-lg py-1.5',
          colors.accentLine
        )}
      >
        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">
          HOW TO JOIN //
        </span>
        <span>{club.join}</span>
      </div>
    </div>
  );
}
