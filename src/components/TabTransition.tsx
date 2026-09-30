'use client';

import React, { useState, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

export type TabTransitionType = 'home' | 'directory' | 'offices' | 'food' | 'faq' | 'manual';

interface TabTransitionProps {
  type?: TabTransitionType | null;
  active?: boolean;
  onComplete?: () => void;
}

export function TabTransition({
  type: propType,
  active: propActive,
  onComplete,
}: TabTransitionProps) {
  const [internalActive, setInternalActive] = useState(false);
  const [currentType, setCurrentType] = useState<TabTransitionType>('home');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    // Listen to global tab transition events dispatched from Navbar
    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<{ type: TabTransitionType; active: boolean }>;
      if (!custom.detail) return;
      if (custom.detail.active) {
        setCurrentType(custom.detail.type);
        setInternalActive(true);
      } else {
        setInternalActive(false);
      }
    };

    window.addEventListener('cu_tab_transition', handleEvent);
    return () => window.removeEventListener('cu_tab_transition', handleEvent);
  }, []);

  // Sync if controlled by props
  const isActive = propActive !== undefined ? propActive : internalActive;
  const activeType = propType || currentType;

  useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  // 1. Accessibility: reduced motion fallback (simple 250ms fade)
  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
        <div className="px-4 py-2 rounded-full border border-white/20 bg-void-950/90 text-xs font-mono font-bold tracking-widest uppercase text-white shadow-lg">
          {activeType === 'home' && 'DOMAIN INITIALIZED'}
          {activeType === 'directory' && 'DOMAIN SHIFT // CAMPUS'}
          {activeType === 'offices' && 'GUIDANCE PROTOCOL'}
          {activeType === 'food' && 'RECHARGE DOMAIN'}
          {activeType === 'faq' && 'SURVIVAL KNOWLEDGE'}
          {activeType === 'manual' && 'THE TRAINING MANUAL'}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center">
      {/* Global Background Darkening */}
      <div className="absolute inset-0 bg-void-950 animate-transition-backdrop" />

      {/* ==================================================
          EFFECT 1: HOME — DARK ENERGY PULSE -> EXPAND -> COLLAPSE
          ================================================== */}
      {activeType === 'home' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Expanding & Collapsing Deep Purple Ring */}
          <div
            className="w-[110vw] h-[110vw] max-w-[850px] max-h-[850px] rounded-full animate-home-pulse-ring pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(157,78,221,0.4) 0%, rgba(30,10,60,0.5) 45%, rgba(5,6,8,0.9) 75%, transparent 100%)',
              boxShadow: '0 0 90px rgba(157,78,221,0.45)',
            }}
          />

          {/* Concentric Cyan Energy Rings */}
          <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full border border-electric-cyan/40 animate-home-pulse-ring pointer-events-none" />
          <div className="absolute w-44 h-44 sm:w-64 sm:h-64 rounded-full border border-cursed-purple/50 animate-home-pulse-ring pointer-events-none" style={{ animationDelay: '0.1s' }} />

          {/* Radiating Cyan Crosshair Lines */}
          <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-electric-cyan to-transparent animate-pulse-lines pointer-events-none" />
          <div className="absolute inset-y-0 w-[1.5px] bg-gradient-to-b from-transparent via-electric-cyan to-transparent animate-pulse-lines pointer-events-none" />

          {/* Cyan Energy Particles collapsing toward center */}
          {[
            { top: '30%', left: '35%', delay: '0.1s' },
            { top: '32%', right: '35%', delay: '0.18s' },
            { bottom: '32%', left: '38%', delay: '0.25s' },
            { bottom: '30%', right: '38%', delay: '0.14s' },
            { top: '25%', left: '50%', delay: '0.22s', extra: 'hidden sm:block' },
            { bottom: '25%', left: '50%', delay: '0.16s', extra: 'hidden sm:block' },
          ].map((pt, idx) => (
            <div
              key={idx}
              className={cn(
                'absolute w-2 h-2 rounded-full bg-electric-cyan shadow-[0_0_12px_#00f0ff] animate-home-particles pointer-events-none',
                pt.extra
              )}
              style={{
                top: pt.top,
                bottom: pt.bottom,
                left: pt.left,
                right: pt.right,
                animationDelay: pt.delay,
              }}
            />
          ))}

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-5 py-2.5 rounded-full border border-electric-cyan/40 bg-void-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.45)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-electric-cyan">
              DOMAIN INITIALIZED
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          EFFECT 2: DIRECTORY — FAST SUPERNATURAL ENERGY SLASH
          ================================================== */}
      {activeType === 'directory' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle Screen Blur */}
          <div className="absolute inset-0 backdrop-blur-[3px] bg-black/40 transition-opacity duration-300" />

          {/* Primary Cyan Energy Slash across diagonal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[190vw] h-[3.5px] bg-gradient-to-r from-transparent via-electric-cyan to-transparent shadow-[0_0_35px_#00f0ff,0_0_15px_#ffffff] animate-dir-slash-1" />
            <div className="absolute w-[190vw] h-[1px] bg-white shadow-[0_0_20px_#ffffff] animate-dir-slash-1" />
          </div>

          {/* Secondary Purple Energy Slash (~100ms offset) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[190vw] h-[3px] bg-gradient-to-r from-transparent via-cursed-purple to-cursed-magenta shadow-[0_0_30px_#9d4edd] animate-dir-slash-2" />
          </div>

          {/* Small Glowing Particles Gathering & Scattering */}
          {[
            { top: '32%', left: '28%', delay: '0.15s', color: '#00f0ff', dx: '40px', dy: '-50px', dx2: '90px', dy2: '-90px' },
            { top: '40%', left: '38%', delay: '0.2s', color: '#c77dff', dx: '-30px', dy: '-40px', dx2: '-70px', dy2: '-80px' },
            { top: '46%', left: '48%', delay: '0.25s', color: '#00f0ff', dx: '50px', dy: '30px', dx2: '100px', dy2: '60px' },
            { top: '54%', left: '58%', delay: '0.3s', color: '#9d4edd', dx: '-40px', dy: '45px', dx2: '-80px', dy2: '90px', extra: 'hidden sm:block' },
            { top: '62%', left: '68%', delay: '0.35s', color: '#00f0ff', dx: '45px', dy: '-35px', dx2: '85px', dy2: '-75px', extra: 'hidden sm:block' },
            { top: '38%', left: '60%', delay: '0.28s', color: '#c77dff', dx: '-50px', dy: '-30px', dx2: '-95px', dy2: '-65px' },
          ].map((spark, idx) => (
            <div
              key={idx}
              className={cn('absolute w-2 h-2 rounded-full animate-dir-scatter pointer-events-none', spark.extra)}
              style={{
                top: spark.top,
                left: spark.left,
                backgroundColor: spark.color,
                boxShadow: `0 0 14px ${spark.color}`,
                animationDelay: spark.delay,
                ['--dir-x' as string]: spark.dx,
                ['--dir-y' as string]: spark.dy,
                ['--dir-x2' as string]: spark.dx2,
                ['--dir-y2' as string]: spark.dy2,
              }}
            />
          ))}

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-5 py-2.5 rounded-full border border-electric-cyan/40 bg-void-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.45)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-electric-cyan">
              DOMAIN SHIFT // CAMPUS
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          EFFECT 3: OFFICES — EVOLVING PURPLE CURSED FLAME
          ================================================== */}
      {activeType === 'offices' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Ambient Violet Flash across screen */}
          <div className="absolute inset-0 bg-cursed-purple/20 animate-offices-flash pointer-events-none" />

          {/* Left Screen Border Supernatural Flame */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 animate-offices-flame pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at left, rgba(157,78,221,0.75) 0%, rgba(199,125,255,0.35) 45%, transparent 80%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Right Screen Border Supernatural Flame */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 animate-offices-flame pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at right, rgba(157,78,221,0.75) 0%, rgba(199,125,255,0.35) 45%, transparent 80%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Evolving Purple Flame Particles rising and dissolving */}
          {[
            { left: '6%', bottom: '15%', delay: '0.06s', size: '10px' },
            { left: '12%', bottom: '28%', delay: '0.14s', size: '7px' },
            { left: '18%', bottom: '42%', delay: '0.24s', size: '9px', extra: 'hidden sm:block' },
            { right: '6%', bottom: '18%', delay: '0.08s', size: '10px' },
            { right: '14%', bottom: '32%', delay: '0.18s', size: '7px' },
            { right: '20%', bottom: '45%', delay: '0.28s', size: '9px', extra: 'hidden sm:block' },
            { left: '26%', bottom: '12%', delay: '0.32s', size: '6px', extra: 'hidden sm:block' },
            { right: '26%', bottom: '15%', delay: '0.22s', size: '6px' },
          ].map((pt, idx) => (
            <div
              key={idx}
              className={cn('absolute rounded-full animate-offices-flame pointer-events-none', pt.extra)}
              style={{
                left: pt.left,
                right: pt.right,
                bottom: pt.bottom,
                width: pt.size,
                height: pt.size,
                backgroundColor: '#c77dff',
                boxShadow: '0 0 16px #9d4edd, 0 0 28px #c77dff',
                animationDelay: pt.delay,
              }}
            />
          ))}

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-5 py-2.5 rounded-full border border-cursed-purple/50 bg-void-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(157,78,221,0.5)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-cursed-magenta">
              GUIDANCE PROTOCOL
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          EFFECT 4: FOOD — CINEMATIC EMBER & FIRE WAVE BURST
          ================================================== */}
      {activeType === 'food' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Warm Amber Energy Wave building from bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-amber-500/25 via-energy-amber/10 to-transparent animate-food-wave pointer-events-none"
            style={{ filter: 'blur(12px)' }}
          />

          {/* Horizontal Golden Flash Line */}
          <div className="absolute inset-x-0 bottom-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_25px_#f59e0b] animate-food-wave pointer-events-none" />

          {/* Stylized Glowing Embers (Orange, Gold, Warm Red) rising & scattering */}
          {[
            { left: '6%', bottom: '5%', delay: '0.04s', color: '#ff7b00', size: '9px' },
            { left: '12%', bottom: '8%', delay: '0.12s', color: '#ffd166', size: '7px' },
            { left: '18%', bottom: '3%', delay: '0.2s', color: '#f59e0b', size: '10px', extra: 'hidden sm:block' },
            { left: '26%', bottom: '10%', delay: '0.28s', color: '#ff5400', size: '6px' },
            { right: '6%', bottom: '6%', delay: '0.06s', color: '#ff7b00', size: '9px' },
            { right: '14%', bottom: '9%', delay: '0.16s', color: '#ffd166', size: '7px' },
            { right: '20%', bottom: '4%', delay: '0.24s', color: '#f59e0b', size: '10px', extra: 'hidden sm:block' },
            { right: '28%', bottom: '11%', delay: '0.32s', color: '#ff5400', size: '6px' },
            { left: '38%', bottom: '4%', delay: '0.18s', color: '#ffd166', size: '5px', extra: 'hidden sm:block' },
            { right: '38%', bottom: '5%', delay: '0.26s', color: '#ff7b00', size: '5px', extra: 'hidden sm:block' },
          ].map((ember, idx) => (
            <div
              key={idx}
              className={cn('absolute rounded-full animate-food-ember pointer-events-none', ember.extra)}
              style={{
                left: ember.left,
                right: ember.right,
                bottom: ember.bottom,
                width: ember.size,
                height: ember.size,
                backgroundColor: ember.color,
                boxShadow: `0 0 16px ${ember.color}, 0 0 28px #ff7b00`,
                animationDelay: ember.delay,
              }}
            />
          ))}

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-5 py-2.5 rounded-full border border-amber-400/50 bg-void-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-amber-400">
              RECHARGE DOMAIN
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          EFFECT 5: FAQ — DEEP BLUE SPIRIT MIST
          ================================================== */}
      {activeType === 'faq' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle Blur Wash */}
          <div className="absolute inset-0 backdrop-blur-[3px] bg-black/45 transition-opacity duration-300" />

          {/* Expanding Spirit Mist Obscuring & Clearing Center */}
          <div
            className="absolute inset-x-0 top-1/4 h-56 animate-faq-mist pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,240,255,0.28) 0%, rgba(58,134,255,0.18) 50%, transparent 80%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-1/4 h-56 animate-faq-mist pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(58,134,255,0.25) 0%, rgba(0,240,255,0.15) 50%, transparent 80%)',
              filter: 'blur(20px)',
              animationDelay: '0.12s',
            }}
          />

          {/* Luminous Blue Particles / Spirit Wisps Drifting Horizontally */}
          {[
            { top: '28%', left: '15%', delay: '0.04s', size: '8px' },
            { top: '38%', left: '55%', delay: '0.12s', size: '6px' },
            { top: '48%', left: '25%', delay: '0.2s', size: '9px', extra: 'hidden sm:block' },
            { top: '58%', left: '70%', delay: '0.1s', size: '7px' },
            { top: '68%', left: '35%', delay: '0.24s', size: '6px', extra: 'hidden sm:block' },
            { top: '34%', left: '80%', delay: '0.16s', size: '8px' },
            { top: '62%', left: '18%', delay: '0.28s', size: '5px', extra: 'hidden sm:block' },
          ].map((pt, idx) => (
            <div
              key={idx}
              className={cn('absolute rounded-full animate-faq-wisp pointer-events-none', pt.extra)}
              style={{
                top: pt.top,
                left: pt.left,
                width: pt.size,
                height: pt.size,
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 16px #00f0ff, 0 0 24px #3a86ff',
                animationDelay: pt.delay,
              }}
            />
          ))}

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-5 py-2.5 rounded-full border border-electric-blue/40 bg-void-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.45)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-electric-cyan">
              SURVIVAL KNOWLEDGE
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          EFFECT 6: MANUAL — CURSED TECHNIQUE AWAKENING RING
          ================================================== */}
      {activeType === 'manual' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Deep Cursed Void Overlay */}
          <div className="absolute inset-0 backdrop-blur-[3px] bg-black/45 transition-opacity duration-300" />

          {/* Large Concentric Purple/Violet Rings */}
          <div
            className="w-[100vw] h-[100vw] max-w-[700px] max-h-[700px] rounded-full animate-home-pulse-ring pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(76,29,149,0.3) 50%, transparent 75%)',
              boxShadow: '0 0 100px rgba(139,92,246,0.5)',
            }}
          />
          <div className="absolute w-64 h-64 sm:w-[380px] sm:h-[380px] rounded-full border border-cursed-magenta/50 animate-home-pulse-ring pointer-events-none" />

          {/* Central Watermark Kanji */}
          <span className="absolute font-serif-jp text-9xl sm:text-[140px] font-black text-cursed-purple opacity-20 select-none animate-pulse pointer-events-none">
            呪
          </span>

          {/* Atmospheric Text Badge */}
          <div className="relative z-10 px-6 py-2.5 rounded-full border border-cursed-magenta/50 bg-void-950/95 backdrop-blur-md shadow-[0_0_35px_rgba(157,78,221,0.5)] animate-badge-reveal">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-white flex items-center gap-2">
              <span className="text-cursed-magenta">呪</span>
              <span>THE TRAINING MANUAL // TECHNIQUE AWAKENING</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

