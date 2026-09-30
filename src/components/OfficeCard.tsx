'use client';

import React from 'react';
import { OfficeItem } from '@/data/types';
import { CampusImagePlaceholder } from './CampusImagePlaceholder';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface OfficeCardProps {
  office: OfficeItem;
  onOpen: (office: OfficeItem) => void;
}

export function OfficeCard({ office, onOpen }: OfficeCardProps) {
  const handleClick = () => {
    soundFx.playClick();
    onOpen(office);
  };

  // Extract a crisp one-line purpose from department or first issue
  const oneLinePurpose = office.issuesHandled[0]
    ? `${office.issuesHandled[0].split(' and ')[0]}.`
    : 'Essential administrative student support desk.';

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-void-900/60 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cursed-purple/40 hover:shadow-[0_8px_25px_-5px_rgba(157,78,221,0.15)] corner-brackets-subtle"
    >
      {/* Visual Header / Real Office Photo */}
      <div className="relative overflow-hidden aspect-[16/10] bg-void-950">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <CampusImagePlaceholder
            imageSrc={office.image || '/images/placeholder.jpg'}
            locationName={office.name}
            category={office.department.split('&')[0].trim()}
            aspectRatio="video"
            showOverlayPrompt={false}
          />
        </div>

        {/* Minimal Department Tag */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-cursed-magenta font-medium">
          {office.department.split('&')[0].trim()}
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            {office.department}
          </span>

          <h3 className="text-base font-bold text-white group-hover:text-cursed-magenta transition-colors line-clamp-1">
            {office.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {oneLinePurpose}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cursed-magenta transition-colors">
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            VIEW OFFICE DETAILS
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
