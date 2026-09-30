'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getDomainShiftTitle, prefersReducedMotion } from '@/lib/animations';
import { soundFx } from '@/lib/sound';

export function DomainTransition() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Only trigger on route changes, not initial mount
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      if (prefersReducedMotion()) {
        return;
      }

      const domainTitle = getDomainShiftTitle(pathname);
      setLabel(domainTitle);
      setActive(true);
      soundFx.playWhoosh();

      // Duration: 550ms total
      const timer = setTimeout(() => {
        setActive(false);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center">
      {/* Subtle Screen Dim */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300" />

      {/* Energy Slash Streak */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[140vw] h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-cursed-purple shadow-[0_0_20px_#00f0ff] animate-domain-slash" />
      </div>

      {/* Atmospheric Domain Shift Badge */}
      <div className="relative z-10 px-4 py-2 rounded-full border border-electric-blue/40 bg-void-950/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.35)] animate-fade-in">
        <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-electric-cyan">
          {label}
        </span>
      </div>
    </div>
  );
}
