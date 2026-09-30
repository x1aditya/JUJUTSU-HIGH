'use client';

import React from 'react';
import { 
  Sparkles, 
  Users, 
  Calendar, 
  Trophy, 
  MessageSquareQuote, 
  Camera 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import { ManualTab } from '@/data/manual/types';

interface ManualNavigationProps {
  activeTab: ManualTab;
  onTabChange: (tab: ManualTab) => void;
}

const TABS: Array<{ id: ManualTab; label: string; icon: React.ElementType; kanji: string }> = [
  { id: 'quiz', label: 'Quiz', icon: Sparkles, kanji: '試' },
  { id: 'clubs', label: 'Clubs', icon: Users, kanji: '団' },
  { id: 'events', label: 'Events', icon: Calendar, kanji: '催' },
  { id: 'sports', label: 'Sports', icon: Trophy, kanji: '闘' },
  { id: 'tips', label: 'Tips', icon: MessageSquareQuote, kanji: '箴' },
  { id: 'campus', label: 'Campus', icon: Camera, kanji: '景' },
];

export function ManualNavigation({ activeTab, onTabChange }: ManualNavigationProps) {
  const handleSelect = (tab: ManualTab) => {
    if (tab !== activeTab) {
      soundFx.playClick();
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 overflow-x-auto no-scrollbar rounded-2xl bg-void-900/80 border border-white/10 backdrop-blur-xl shadow-glass-panel">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap group',
                isActive
                  ? 'bg-gradient-to-r from-cursed-purple to-electric-blue text-void-950 font-bold shadow-[0_0_20px_rgba(157,78,221,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-void-950' : 'text-slate-400 group-hover:text-electric-cyan')} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  'text-[10px] opacity-60 font-serif-jp hidden md:inline-block',
                  isActive ? 'text-void-950' : 'text-slate-500'
                )}
              >
                {tab.kanji}
              </span>

              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-electric-cyan shadow-[0_0_8px_#00f0ff]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
