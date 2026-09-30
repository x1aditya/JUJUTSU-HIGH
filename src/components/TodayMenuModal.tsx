'use client';

import React, { useEffect } from 'react';
import { FoodItem } from '@/data/types';
import { soundFx } from '@/lib/sound';
import { 
  X, 
  Sparkles, 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Flame 
} from 'lucide-react';

interface TodayMenuModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TodayMenuModal({ food, isOpen, onClose }: TodayMenuModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      soundFx.playModalOpen();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !food) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-2xl backdrop-blur-2xl z-10 animate-modal-enter flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-void-850">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              {food.type} • MENU OVERVIEW
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {food.name}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-electric-blue shrink-0" />
              <span>{food.location}</span>
            </div>
          </div>

          {/* Today's Special Dish */}
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/20">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Today's Special Rotation
            </span>
            <p className="text-sm font-semibold text-white italic">
              "{food.todaysSpecial}"
            </p>
          </div>

          {/* Opening Hours / Meal Shift Times */}
          <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cursed-magenta" />
              Opening Hours
            </span>
            <p className="text-slate-200 text-xs font-mono">
              {food.openingHours}
            </p>
          </div>

          {/* Popular Items */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Popular Menu Offerings:
            </span>
            <div className="space-y-1.5">
              {food.menuPreview.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-void-850/60 border border-white/5 text-slate-200"
                >
                  <span className="truncate">{item}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">Sample</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-void-850 border-t border-white/5 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-400 text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}
