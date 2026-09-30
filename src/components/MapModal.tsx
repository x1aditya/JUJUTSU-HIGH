'use client';

import React, { useEffect } from 'react';
import { LocationItem } from '@/data/types';
import { X, MapPin, Compass, Navigation, Info, ShieldAlert, Sparkles } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface MapModalProps {
  location: LocationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MapModal({ location, isOpen, onClose }: MapModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
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

  if (!isOpen || !location) return null;

  // Default coordinate or mapped location
  const posX = location.gridCoordinates?.x ?? 50;
  const posY = location.gridCoordinates?.y ?? 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-void-950/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-electric-blue/40 bg-void-900 shadow-2xl shadow-electric-blue/20 backdrop-blur-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-void-850">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-electric-dark/30 border border-electric-blue/50 text-electric-blue">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '18s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-electric-cyan font-bold">
                  CAMPUS SPATIAL BLUEPRINT // EVALUATION 1
                </span>
                <StatusBadge
                  status={location.verified ? 'verified' : 'pending'}
                  type="verification"
                  size="sm"
                />
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {location.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Interactive Grid Map Area */}
        <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] bg-void-950 overflow-hidden select-none p-4 flex items-center justify-center">
          {/* Cyber Blueprint Grid Background */}
          <div className="absolute inset-0 bg-cyber-grid opacity-75" />

          {/* Coordinate Axis Labels */}
          <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-500">
            NORTH CAMPUS SECTOR [Y-AXIS]
          </div>
          <div className="absolute bottom-2 left-4 text-[9px] font-mono text-slate-500">
            SOUTH CAMPUS ENTRANCE [GATE 1 / GATE 2]
          </div>
          <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500">
            GRID: [X: {posX}% | Y: {posY}%]
          </div>

          {/* Schematic Campus Zones (Polished high-tech vector styling) */}
          <div className="relative w-full h-full max-w-2xl max-h-[380px] rounded-2xl border border-white/10 bg-void-900/60 p-6 flex flex-col justify-between">
            {/* Campus Sectors Layout */}
            <div className="grid grid-cols-3 gap-3 h-full">
              {/* Sector 1: West / Admin */}
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Sector Alpha
                </span>
                <div className="text-[11px] font-bold text-slate-300">
                  Admin & Accounts Block
                </div>
                <span className="text-[9px] font-mono text-slate-500">Gate 1 Axis</span>
              </div>

              {/* Sector 2: Central Academic Axis */}
              <div className="rounded-xl border border-dashed border-electric-blue/20 bg-electric-dark/[0.05] p-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-electric-cyan">
                  Central Academic Hub
                </span>
                <div className="text-[11px] font-bold text-white">
                  Library & Food Concourse
                </div>
                <span className="text-[9px] font-mono text-slate-400">Central Lawn</span>
              </div>

              {/* Sector 3: Engineering & Labs */}
              <div className="rounded-xl border border-dashed border-cursed-purple/25 bg-cursed-purple/[0.04] p-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-cursed-magenta">
                  Sector Gamma
                </span>
                <div className="text-[11px] font-bold text-slate-200">
                  Block B2 & Labs Complex
                </div>
                <span className="text-[9px] font-mono text-slate-500">Hostel Pathway</span>
              </div>
            </div>

            {/* Glowing Target Beacon */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-700"
              style={{ left: `${posX}%`, top: `${posY}%` }}
            >
              {/* Radar pulse ripples */}
              <span className="absolute -inset-4 rounded-full bg-electric-blue/30 animate-ping opacity-75" />
              <span className="absolute -inset-8 rounded-full bg-cursed-purple/20 animate-pulse" />

              {/* Marker pin */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue to-cursed-purple text-void-950 font-bold shadow-[0_0_20px_#00f0ff] border-2 border-white">
                <MapPin className="w-6 h-6 fill-current text-void-950" />
              </div>

              {/* Tooltip callout */}
              <div className="mt-2 px-3 py-1 rounded-md bg-void-950 border border-electric-blue text-xs font-bold text-white whitespace-nowrap shadow-lg">
                📍 {location.name}
              </div>
            </div>
          </div>
        </div>

        {/* Informational Guidance Footer */}
        <div className="p-5 bg-void-850 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Spatial Note: </span>
              Located at <span className="font-mono text-electric-blue">{location.location}</span>.
              Estimated 3–5 min walk from Academic Concourse.
              <p className="text-[11px] text-slate-400 mt-0.5">
                Note: Pair A focuses on spatial identification and purpose. Turn-by-turn routing belongs to complementary scope.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shrink-0"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
