'use client';

import React, { useState } from 'react';
import { CLUBS } from '@/data/manual/clubsData';
import { ClubCategory } from '@/data/manual/types';
import { CATEGORY_KANJI } from '@/data/manual/quizData';
import { ClubCard } from './ClubCard';
import { soundFx } from '@/lib/sound';
import { cn } from '@/lib/utils';
import { Users, Filter } from 'lucide-react';

const CATEGORIES: Array<'All' | ClubCategory> = ['All', 'Technical', 'Cultural', 'Sports', 'Social'];

export function ClubDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ClubCategory>('All');

  const handleFilterClick = (cat: 'All' | ClubCategory) => {
    soundFx.playClick();
    setSelectedCategory(cat);
  };

  const filteredClubs = CLUBS.filter((c) =>
    selectedCategory === 'All' ? true : c.cat === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-4 h-4 text-electric-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              CAMPUS ORGANIZATIONS // MATRIX
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Find your <span className="text-gradient-cyan">club</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Every verified student union, society, and squad — and exactly how to join.
          </p>
        </div>

        {/* Count Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 text-xs font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
          <span>{filteredClubs.length} CLUBS ACTIVE</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 mr-1 text-xs font-mono text-slate-400">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>FILTER:</span>
        </div>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const kanji = cat === 'All' ? '全' : CATEGORY_KANJI[cat];

          return (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all',
                isSelected
                  ? 'bg-cursed-purple text-white font-bold border border-cursed-magenta/50 shadow-[0_0_15px_rgba(157,78,221,0.4)]'
                  : 'bg-void-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
              )}
            >
              <span>{cat}</span>
              <span className="text-[10px] opacity-60 font-serif-jp">{kanji}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClubs.map((club) => (
          <ClubCard key={club.name} club={club} />
        ))}
      </div>
    </div>
  );
}
