'use client';

import React from 'react';
import Image from 'next/image';
import { CAMPUS_DISCOVERIES } from '@/data/manual/campusData';
import { Camera, Eye, Hammer } from 'lucide-react';

export function CampusDiscoveries() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Camera className="w-4 h-4 text-electric-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              PHOTOGRAPHIC RECONNAISSANCE // GROUND SURVEY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Seen on <span className="text-gradient-cyan">campus</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            We discovered these physical hurdles in real time on campus, so we engineered software solutions.
          </p>
        </div>

        {/* Counter */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 text-xs font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
          <span>{CAMPUS_DISCOVERIES.length} REAL FIELD HUBS</span>
        </div>
      </div>

      {/* Grid of Discoveries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAMPUS_DISCOVERIES.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-void-900/70 backdrop-blur-xl transition-all duration-300 hover:border-electric-cyan/40 shadow-glass-panel flex flex-col hover:-translate-y-1"
          >
            {/* Real Campus Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-void-950">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-void-950/80 border border-white/10 text-[9px] font-mono text-slate-300 uppercase tracking-widest">
                VERIFIED ARCHIVE
              </div>
            </div>

            {/* Information Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-electric-cyan transition-colors">
                  {item.title}
                </h3>

                {/* We Saw */}
                <div className="mt-2.5 flex items-start gap-2 text-xs text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-mono">We saw:</strong> {item.saw}
                  </span>
                </div>
              </div>

              {/* So We Built */}
              <div className="pt-3 border-l-2 border-l-electric-cyan pl-3 bg-white/[0.02] rounded-r-xl py-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-electric-cyan uppercase tracking-wider mb-0.5">
                  <Hammer className="w-3 h-3" />
                  <span>SO WE BUILT</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">
                  {item.built}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
