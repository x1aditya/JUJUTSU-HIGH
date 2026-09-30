'use client';

import React from 'react';
import { LocationItem } from '@/data/types';
import { CampusImagePlaceholder } from './CampusImagePlaceholder';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface LocationCardProps {
  location: LocationItem;
  onOpenDetails: (location: LocationItem) => void;
}

export function LocationCard({ location, onOpenDetails }: LocationCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    onOpenDetails(location);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-void-900/60 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40 hover:shadow-[0_8px_25px_-5px_rgba(0,240,255,0.15)] corner-brackets-subtle"
    >
      {/* Visual Header / Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-void-950">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <CampusImagePlaceholder
            imageSrc={location.image}
            locationName={location.name}
            category={location.subCategory}
            aspectRatio="video"
            showOverlayPrompt={false}
          />
        </div>

        {/* Minimal Category Tag */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-electric-cyan font-medium">
          {location.subCategory}
        </div>
      </div>

      {/* Clean, Minimal Card Body */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            {location.category}
          </span>

          <h3 className="text-base font-bold text-white group-hover:text-electric-cyan transition-colors line-clamp-1">
            {location.name}
          </h3>

          {/* One-line clean description */}
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-1 leading-relaxed">
            {location.description}
          </p>
        </div>

        {/* View Details Action CTA */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-electric-blue transition-colors">
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            VIEW DETAILS
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
