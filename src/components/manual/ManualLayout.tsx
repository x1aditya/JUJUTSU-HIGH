'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ManualTab } from '@/data/manual/types';
import { ManualNavigation } from './ManualNavigation';
import { ManualQuiz } from './ManualQuiz';
import { ClubDirectory } from './ClubDirectory';
import { EventTimeline } from './EventTimeline';
import { SportsArena } from './SportsArena';
import { SeniorTips } from './SeniorTips';
import { CampusDiscoveries } from './CampusDiscoveries';
import { Sparkles } from 'lucide-react';

interface ManualLayoutProps {
  initialTab?: ManualTab;
}

export function ManualLayout({ initialTab = 'quiz' }: ManualLayoutProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<ManualTab>(initialTab);

  // Sync state if initialTab changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tab: ManualTab) => {
    setActiveTab(tab);
    // Update shallow URL query without full page reload
    router.replace(`/manual?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Background Japanese Watermark Kanji "呪" */}
      <span
        aria-hidden="true"
        className="fixed -right-6 top-20 font-serif-jp text-[35vw] sm:text-[400px] font-black text-cursed-purple opacity-[0.03] select-none pointer-events-none z-0"
      >
        呪
      </span>

      {/* Top Atmospheric Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 backdrop-blur-md text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cursed-purple animate-pulse" />
          <span>CU STUDENT SURVIVAL • THE TRAINING MANUAL</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          <span className="font-serif-jp mr-2 text-cursed-purple">呪</span>
          The Training <span className="text-gradient-cyan">Manual</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400 font-sans">
          Clubs, campus events, sports bookings, senior survival protocols, and technique discovery.
        </p>
      </div>

      {/* Tab Selector Navigation */}
      <div className="relative z-10">
        <ManualNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Main Tab View Area */}
      <div className="relative z-10 animate-page-enter">
        {activeTab === 'quiz' && <ManualQuiz />}
        {activeTab === 'clubs' && <ClubDirectory />}
        {activeTab === 'events' && <EventTimeline />}
        {activeTab === 'sports' && <SportsArena />}
        {activeTab === 'tips' && <SeniorTips />}
        {activeTab === 'campus' && <CampusDiscoveries />}
      </div>
    </div>
  );
}
