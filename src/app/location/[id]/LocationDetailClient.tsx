'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LocationItem } from '@/data/types';
import { hasRealImage } from '@/data/locations';
import { CampusImagePlaceholder } from '@/components/CampusImagePlaceholder';
import { MapModal } from '@/components/MapModal';
import { isLocationSaved, toggleSavedLocation } from '@/lib/storage';
import { soundFx } from '@/lib/sound';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Mail, 
  Compass, 
  Bookmark, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

interface LocationDetailPageClientProps {
  location: LocationItem;
}

export function LocationDetailPageClient({ location }: LocationDetailPageClientProps) {
  const [saved, setSaved] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    setSaved(isLocationSaved(location.id));
  }, [location.id]);

  const handleToggleSave = () => {
    soundFx.playClick();
    const updated = toggleSavedLocation(location.id);
    setSaved(updated);
  };

  const handleOpenMap = () => {
    soundFx.playClick();
    setIsMapOpen(true);
  };

  const isPhotoBacked = hasRealImage(location.image);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/directory"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Photo evidence pending alert if accessed directly without real campus photo */}
        {!isPhotoBacked && (
          <div className="p-3.5 px-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Photo evidence pending — awaiting ground photographic survey verification.</span>
            </div>
            <Link
              href="/directory"
              onClick={() => soundFx.playClick()}
              className="text-[11px] underline hover:text-white shrink-0"
            >
              Browse Verified Directory
            </Link>
          </div>
        )}

        {/* Large Visual */}
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <CampusImagePlaceholder
            imageSrc={location.image}
            locationName={location.name}
            category={location.subCategory}
            aspectRatio="video"
          />
        </div>

        {/* Title, Category & Short Description */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold block mb-1">
            {location.category} • {location.subCategory}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {location.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {location.description}
          </p>
        </div>

        {/* Action Buttons: [ MAP ] and [ SAVE ] */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleOpenMap}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Compass className="w-4 h-4" />
            <span>View on Campus Map</span>
          </button>

          <button
            onClick={handleToggleSave}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
              saved
                ? 'border-cursed-magenta bg-cursed-purple text-white shadow-sm'
                : 'border-white/10 bg-void-850 text-slate-300 hover:text-white hover:border-white/20'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Location'}</span>
          </button>
        </div>

        {/* Compact Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs">
          <div className="p-4 rounded-xl bg-void-900 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Purpose
            </span>
            <p className="text-slate-200 leading-snug">
              {location.purpose}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void-900 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-electric-blue" /> Location
            </span>
            <p className="text-slate-200 font-mono text-[11px] leading-snug">
              {location.location}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void-900 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-cursed-magenta" /> Hours
            </span>
            <p className="text-slate-200 leading-snug">
              {location.hours}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void-900 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" /> Contact
            </span>
            <p className="text-slate-200 font-mono text-[11px] truncate leading-snug">
              {location.contact}
            </p>
          </div>
        </div>

        {/* Freshman Notes (Progressively revealed below) */}
        {location.importantNotes.length > 0 && (
          <div className="p-4 rounded-xl bg-void-900/60 border border-white/5 text-xs text-slate-300 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cursed-magenta font-semibold block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Important Freshman Notes
            </span>
            <ul className="space-y-1 list-disc list-inside text-slate-400">
              {location.importantNotes.map((note, idx) => (
                <li key={idx} className="leading-relaxed">{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Single Evaluation 1 Note */}
        <div className="pt-8 text-center text-[11px] font-mono text-slate-400">
          Evaluation 1 prototype — campus data will be verified during field investigation.
        </div>
      </div>

      {/* Blueprint Map Modal */}
      <MapModal
        location={location}
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />
    </div>
  );
}
