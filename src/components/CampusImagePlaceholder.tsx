'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Camera, MapPin, Sparkles } from 'lucide-react';

interface CampusImagePlaceholderProps {
  imageSrc?: string;
  locationName: string;
  category?: string;
  aspectRatio?: 'video' | 'square' | 'tall';
  className?: string;
  showOverlayPrompt?: boolean;
}

export function CampusImagePlaceholder({
  imageSrc = '/images/placeholder.jpg',
  locationName,
  category,
  aspectRatio = 'video',
  className,
  showOverlayPrompt = true,
}: CampusImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  const isRealPhoto = Boolean(
    imageSrc &&
      !imageSrc.includes('placeholder') &&
      imageSrc.startsWith('/images/campus/') &&
      !hasError
  );

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'tall'
      ? 'aspect-[4/5]'
      : 'aspect-[16/10]';

  if (isRealPhoto) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border border-white/10 bg-void-950',
          'group corner-brackets',
          aspectClass,
          className
        )}
      >
        {/* Real Campus Image */}
        <img
          src={imageSrc}
          alt={locationName}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950/85 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Right "REAL CAMPUS PHOTO" Badge */}
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-void-950/90 border border-electric-blue/40 backdrop-blur-md text-[10px] font-mono font-bold tracking-wider text-electric-cyan shadow-lg">
          <Sparkles className="w-3 h-3 text-cursed-magenta" />
          <span>REAL CAMPUS PHOTO</span>
        </div>

        {/* Top Left Category Tag */}
        {category && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void-950/90 border border-white/10 backdrop-blur-md text-[10px] font-mono uppercase text-slate-300">
            {category}
          </div>
        )}

        {/* Bottom Coordinates & Tech Stamp */}
        <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[9px] font-mono text-slate-300 pointer-events-none">
          <span className="truncate max-w-[200px] font-medium drop-shadow">{locationName}</span>
          <span className="flex items-center gap-1 shrink-0 text-slate-400">
            <MapPin className="w-3 h-3 text-electric-blue/70" />
            CU-CHANDIGARH // SURVEY NODE
          </span>
        </div>
      </div>
    );
  }

  // Graceful Fallback Placeholder
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-void-850 via-void-900 to-void-950',
        'group corner-brackets',
        aspectClass,
        className
      )}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60 pointer-events-none" />

      {/* Subtle Glow Spheres */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-electric-blue/10 blur-2xl pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-500" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-cursed-purple/15 blur-2xl pointer-events-none group-hover:bg-cursed-purple/30 transition-all duration-500" />

      {/* Futuristic Target Reticle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full border border-electric-blue/20 border-dashed animate-[spin_24s_linear_infinite]" />
        <div className="absolute w-12 h-12 rounded-full border border-cursed-purple/30" />
      </div>

      {/* Center Camera & Callout Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-3 flex items-center justify-center w-14 h-14 rounded-2xl bg-void-800/80 border border-electric-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:scale-105 group-hover:border-electric-blue transition-transform">
          <Camera className="w-6 h-6 text-electric-blue" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cursed-magenta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cursed-magenta"></span>
          </span>
        </div>

        {showOverlayPrompt && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-void-950/80 border border-cursed-purple/40 backdrop-blur-sm text-[11px] font-mono font-bold tracking-wider text-electric-cyan shadow-sm mb-2">
            <Sparkles className="w-3 h-3 text-cursed-magenta" />
            REAL CAMPUS PHOTO
          </div>
        )}

        <p className="text-xs text-slate-400 font-medium max-w-[260px] line-clamp-1">
          {locationName}
        </p>

        <span className="mt-1 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          Awaiting CU Ground Survey Photo
        </span>
      </div>

      {/* Top Left Tag */}
      {category && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void-950/80 border border-white/10 backdrop-blur-md text-[10px] font-mono uppercase text-slate-300">
          {category}
        </div>
      )}

      {/* Bottom Coordinates & Tech stamp */}
      <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1 text-[9px] font-mono text-slate-500 pointer-events-none">
        <MapPin className="w-3 h-3 text-electric-blue/70" />
        <span>CU-CHANDIGARH // SURVEY NODE</span>
      </div>
    </div>
  );
}
