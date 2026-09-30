'use client';

import React, { useState, useEffect } from 'react';
import { soundFx } from '@/lib/sound';
import { prefersReducedMotion } from '@/lib/animations';

export function CinematicIntro() {
  const [phase, setPhase] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const hasSeen = localStorage.getItem('cu-survival-intro-seen');
    if (!hasSeen) {
      setVisible(true);

      // Frame 1: Black screen, cyan text "CURSED ENERGY DETECTED"
      const t1 = setTimeout(() => {
        setPhase(1);
        soundFx.playPulse();
      }, 150);

      // Frame 2: Thin cyan/purple energy line spreads horizontally
      const t2 = setTimeout(() => {
        setPhase(2);
      }, 700);

      // Frame 3: "CU STUDENT SURVIVAL" + "THE SORCERER'S GUIDE"
      const t3 = setTimeout(() => {
        setPhase(3);
      }, 1300);

      // Frame 4: Domain pulse / flash
      const t4 = setTimeout(() => {
        setPhase(4);
        soundFx.playModalOpen();
      }, 1850);

      // Complete & reveal website (~2.3s)
      const t5 = setTimeout(() => {
        handleComplete();
      }, 2350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('cu-survival-intro-seen', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cursed Energy Domain Initialization"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-opacity duration-500 select-none overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Frame 4 Domain Flash */}
      {phase === 4 && <div className="absolute inset-0 animate-domain-flash pointer-events-none" />}

      {/* Centered Cinematic Sequence */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto flex flex-col items-center justify-center min-h-[160px]">
        {/* FRAME 1: Tiny Cyan Text */}
        {phase >= 1 && phase < 3 && (
          <div className="animate-fade-in space-y-2">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-rose-500 font-bold block animate-pulse">
              [ 呪力検知 // THREAT SCAN ]
            </span>
            <h2 className="text-lg sm:text-2xl font-mono tracking-[0.25em] text-electric-cyan font-light uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]">
              CURSED ENERGY DETECTED
            </h2>
          </div>
        )}

        {/* FRAME 2: Thin Horizontal Energy Line spreading */}
        {phase >= 2 && (
          <div className="w-64 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-transparent my-4 shadow-[0_0_15px_#00f0ff] animate-intro-line" />
        )}

        {/* FRAME 3: System Title */}
        {phase >= 3 && (
          <div className="animate-fade-in space-y-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 block">
              CHANDIGARH UNIVERSITY
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              CU STUDENT SURVIVAL
            </h1>
            <p className="text-sm sm:text-base font-mono tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-cursed-purple uppercase font-bold drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
              THE SORCERER'S GUIDE
            </p>
          </div>
        )}
      </div>

      {/* Skip Button in Bottom Right Corner */}
      <button
        onClick={handleComplete}
        className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full border border-white/20 bg-void-900/80 text-[10px] font-mono tracking-widest text-slate-400 hover:text-white hover:border-electric-blue transition-all backdrop-blur-md"
      >
        SKIP [ESC]
      </button>
    </div>
  );
}
