'use client';

import React from 'react';
import { FoodItem } from '@/data/types';
import { CampusImagePlaceholder } from './CampusImagePlaceholder';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface FoodCardProps {
  food: FoodItem;
  onOpenMenu: (food: FoodItem) => void;
}

export function FoodCard({ food, onOpenMenu }: FoodCardProps) {
  const handleClick = () => {
    soundFx.playClick();
    onOpenMenu(food);
  };

  // One-line clean description
  const oneLine = food.type === 'Mess'
    ? 'Standard 4-meal daily student dining rotation.'
    : food.type === 'Tuck Shop'
    ? 'Quick coffee, snacks and late-night recharge.'
    : 'Multi-cuisine food court and specialty beverages.';

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-void-900/60 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_8px_25px_-5px_rgba(245,158,11,0.15)] corner-brackets-subtle"
    >
      {/* Visual Header */}
      <div className="relative overflow-hidden aspect-[16/10] bg-void-950">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <CampusImagePlaceholder
            imageSrc={food.image}
            locationName={food.name}
            category={food.type}
            aspectRatio="video"
            showOverlayPrompt={false}
          />
        </div>

        {/* Type & Price Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-medium">
            {food.type}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-slate-400">
            {food.priceRange}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            DINING OUTLET
          </span>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {food.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-400 line-clamp-1 leading-relaxed">
            {oneLine}
          </p>
        </div>

        {/* View Menu CTA */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-amber-400 transition-colors">
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            VIEW MENU
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
