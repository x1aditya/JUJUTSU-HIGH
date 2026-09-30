'use client';

import React from 'react';

export function EnergyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle moving Cursed Purple Void Orb */}
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full bg-cursed-purple/10 blur-[140px] animate-cursed-orb-purple" />

      {/* 2. Slow pulsating Electric Cyan Energy Orb */}
      <div className="absolute top-1/3 -right-28 w-[500px] h-[500px] rounded-full bg-electric-blue/10 blur-[130px] animate-cursed-orb-cyan" />

      {/* 3. Deep center atmospheric cursed spark */}
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full bg-energy-crimson/5 blur-[120px]" />
    </div>
  );
}
