'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LocationItem } from '@/data/types';
import { CampusImagePlaceholder } from './CampusImagePlaceholder';
import { isLocationSaved, toggleSavedLocation } from '@/lib/storage';
import { soundFx } from '@/lib/sound';
import { 
  X, 
  MapPin, 
  Clock, 
  Mail, 
  Compass, 
  Bookmark, 
  Check, 
  ArrowUpRight,
  Sparkles,
  Lock
} from 'lucide-react';

interface LocationDetailModalProps {
  location: LocationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenMap: (location: LocationItem) => void;
}

export function LocationDetailModal({
  location,
  isOpen,
  onClose,
  onOpenMap,
}: LocationDetailModalProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (location) {
      setSaved(isLocationSaved(location.id));
    }
  }, [location]);

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

  if (!isOpen || !location) return null;

  const handleToggleSave = () => {
    soundFx.playClick();
    const updated = toggleSavedLocation(location.id);
    setSaved(updated);
  };

  const handleMapClick = () => {
    soundFx.playClick();
    onOpenMap(location);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* 1. Background Darkens */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* 2. Expanding Cyan Domain Ring */}
      <div className="absolute w-72 h-72 rounded-full border-2 border-electric-blue animate-domain-lock-ring pointer-events-none" />

      {/* 3. Location Panel Appears with Brief Glow */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-2xl backdrop-blur-2xl z-10 animate-modal-enter animate-domain-panel-glow flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-void-850">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-electric-cyan">
            <Lock className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
            <span>DOMAIN LOCK // {location.category}</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Visual Area with subtle zoom on opening */}
          <div className="overflow-hidden rounded-xl border border-white/5 group">
            <div className="transition-transform duration-700 hover:scale-[1.03]">
              <CampusImagePlaceholder
                imageSrc={location.image}
                locationName={location.name}
                category={location.subCategory}
                aspectRatio="video"
              />
            </div>
          </div>

          {/* Title & Short Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {location.name}
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Compact Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Primary Purpose
              </span>
              <p className="text-slate-200 font-medium leading-snug">
                {location.purpose}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-electric-blue" /> Spatial Location
              </span>
              <p className="text-slate-200 font-mono text-[11px] leading-snug">
                {location.location}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-cursed-magenta" /> Hours of Operation
              </span>
              <p className="text-slate-200 font-medium leading-snug">
                {location.hours}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> Contact / Helpdesk
              </span>
              <p className="text-slate-200 font-mono text-[11px] truncate leading-snug">
                {location.contact}
              </p>
            </div>
          </div>

          {/* Survival Tips if available */}
          {location.importantNotes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-void-850/60 border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cursed-magenta font-semibold block mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Freshman Note
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {location.importantNotes[0]}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions: [ MAP ] [ SAVE ] + Permalink */}
        <div className="p-5 px-6 bg-void-850 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/location/${location.id}`}
            onClick={() => soundFx.playClick()}
            className="text-xs font-mono text-slate-400 hover:text-electric-blue transition-colors flex items-center gap-1"
          >
            <span>Permalink Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSave}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                saved
                  ? 'border-cursed-magenta bg-cursed-purple text-white shadow-sm'
                  : 'border-white/10 bg-void-800 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleMapClick}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Map Blueprint</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
