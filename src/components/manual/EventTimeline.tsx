'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CAMPUS_EVENTS } from '@/data/manual/eventsData';
import { soundFx } from '@/lib/sound';
import { Calendar, Check, MapPin, Building, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EventTimeline() {
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());

  const handleToggleCalendar = (id: string) => {
    soundFx.playClick();
    setSavedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Calendar className="w-4 h-4 text-electric-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              CAMPUS SCHEDULE // CHRONOLOGICAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            This week on <span className="text-gradient-cyan">campus</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Upcoming summits, hackathons, and tournaments in verified date order.
          </p>
        </div>

        {/* Counter */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 text-xs font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
          <span>{CAMPUS_EVENTS.length} EVENTS SCHEDULED</span>
        </div>
      </div>

      {/* Events Stack */}
      <div className="space-y-3.5">
        {CAMPUS_EVENTS.map((event) => {
          const isAdded = savedEvents.has(event.id);

          return (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-void-900/70 backdrop-blur-md p-4 sm:p-5 transition-all duration-200 border-l-4 border-l-electric-cyan hover:border-white/20 shadow-glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                {/* Poster Thumbnail (if any) */}
                {event.image && (
                  <div className="relative w-14 h-20 sm:w-16 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-void-950">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Date Block */}
                <div className="flex-shrink-0 text-center w-14 py-1.5 px-2 rounded-xl bg-void-950/80 border border-white/10">
                  <span className="block font-serif-jp text-2xl sm:text-3xl font-black text-electric-cyan leading-none">
                    {event.day}
                  </span>
                  <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase mt-0.5">
                    {event.month}
                  </span>
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-electric-cyan transition-colors truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Building className="w-3 h-3 text-cursed-purple" />
                      <span>{event.club}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400 truncate">
                      <MapPin className="w-3 h-3 text-electric-cyan" />
                      <span>{event.place}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleToggleCalendar(event.id)}
                className={cn(
                  'w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all',
                  isAdded
                    ? 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-400'
                    : 'bg-gradient-to-r from-cursed-purple to-electric-blue text-void-950 font-bold hover:scale-[1.02] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ADDED ✔</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD TO CALENDAR</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
