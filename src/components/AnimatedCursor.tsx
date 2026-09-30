'use client';

import React, { useEffect, useRef, useState } from 'react';
import { isTouchDevice, prefersReducedMotion } from '@/lib/animations';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  color: string;
}

interface ClickBurst {
  x: number;
  y: number;
  id: number;
}

export function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'cta' | 'card'>('default');
  const [tabColor, setTabColor] = useState<'cyan-purple' | 'purple' | 'orange' | 'blue' | null>(null);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const custom = e as CustomEvent<{ type: string; active: boolean }>;
      if (!custom.detail) return;
      if (custom.detail.active) {
        switch (custom.detail.type) {
          case 'directory':
            setTabColor('cyan-purple');
            break;
          case 'offices':
            setTabColor('purple');
            break;
          case 'food':
            setTabColor('orange');
            break;
          case 'faq':
            setTabColor('blue');
            break;
          case 'home':
          default:
            setTabColor('cyan-purple');
            break;
        }
      } else {
        setTabColor(null);
      }
    };

    window.addEventListener('cu_tab_transition', handleTransition);
    return () => window.removeEventListener('cu_tab_transition', handleTransition);
  }, []);

  // Positions
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const magneticTarget = useRef<{ x: number; y: number } | null>(null);

  // Energy trail points
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailCounter = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch or reduced motion
    if (isTouchDevice() || prefersReducedMotion()) {
      return;
    }

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Append lightweight energy trail point (max 7 points, throttled)
      trailCounter.current += 1;
      if (trailCounter.current % 3 === 0) {
        const isCyan = trailCounter.current % 6 === 0;
        setTrail((prev) => [
          ...prev.slice(-6),
          {
            x: e.clientX,
            y: e.clientY,
            id: Date.now() + Math.random(),
            color: isCyan ? 'rgba(0, 240, 255, 0.45)' : 'rgba(157, 78, 221, 0.45)',
          },
        ]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newBurst = { x: e.clientX, y: e.clientY, id: Date.now() };
      setBursts((prev) => [...prev, newBurst]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 500);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const ctaBtn = target.closest('button, a, [role="button"]') as HTMLElement | null;
      const card = target.closest('[data-card], .corner-brackets, .corner-brackets-subtle, .cursor-pointer') as HTMLElement | null;

      if (ctaBtn) {
        const text = ctaBtn.innerText || '';
        const isMajorCTA =
          text.includes('EXPLORE') ||
          text.includes('VIEW DETAILS') ||
          text.includes('FIND') ||
          text.includes('DETAILS') ||
          ctaBtn.classList.contains('bg-electric-blue');

        if (isMajorCTA) {
          setHoverState('cta');
          // Magnetic pull towards center of the CTA
          const rect = ctaBtn.getBoundingClientRect();
          magneticTarget.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        } else {
          setHoverState('hover');
          magneticTarget.current = null;
        }
      } else if (card) {
        setHoverState('card');
        magneticTarget.current = null;
      } else {
        setHoverState('default');
        magneticTarget.current = null;
      }
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
      setHoverState('default');
      magneticTarget.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth Lerp loop for trailing ring
    const renderLoop = () => {
      const targetX = magneticTarget.current
        ? mousePos.current.x * 0.75 + magneticTarget.current.x * 0.25
        : mousePos.current.x;
      const targetY = magneticTarget.current
        ? mousePos.current.y * 0.75 + magneticTarget.current.y * 0.25
        : mousePos.current.y;

      ringPos.current.x += (targetX - ringPos.current.x) * 0.2;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.2;

      const ringEl = document.getElementById('cursed-cursor-ring');
      const dotEl = document.getElementById('cursed-cursor-dot');

      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('has-custom-cursor');
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  // Color styles based on active tab transition or hover state
  let ringColor = 'border-electric-blue/50 scale-100';
  let dotColor = 'bg-white shadow-[0_0_8px_#ffffff]';

  if (tabColor) {
    if (tabColor === 'cyan-purple') {
      ringColor = 'border-electric-cyan shadow-[0_0_20px_#00f0ff,0_0_25px_#9d4edd] scale-125';
      dotColor = 'bg-electric-cyan shadow-[0_0_12px_#00f0ff]';
    } else if (tabColor === 'purple') {
      ringColor = 'border-cursed-purple shadow-[0_0_20px_#9d4edd,0_0_25px_#c77dff] scale-125';
      dotColor = 'bg-cursed-magenta shadow-[0_0_12px_#c77dff]';
    } else if (tabColor === 'orange') {
      ringColor = 'border-amber-400 shadow-[0_0_20px_#f59e0b,0_0_25px_#ff7b00] scale-125';
      dotColor = 'bg-amber-400 shadow-[0_0_12px_#f59e0b]';
    } else if (tabColor === 'blue') {
      ringColor = 'border-electric-blue shadow-[0_0_20px_#00f0ff,0_0_25px_#3a86ff] scale-125';
      dotColor = 'bg-electric-blue shadow-[0_0_12px_#00f0ff]';
    }
  } else {
    ringColor =
      hoverState === 'cta'
        ? 'border-electric-blue shadow-[0_0_15px_rgba(0,240,255,0.7)] scale-125'
        : hoverState === 'card'
        ? 'border-cursed-purple shadow-[0_0_15px_rgba(157,78,221,0.7)] scale-110'
        : hoverState === 'hover'
        ? 'border-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-110'
        : 'border-electric-blue/50 scale-100';

    dotColor =
      hoverState === 'cta'
        ? 'bg-electric-blue shadow-[0_0_10px_#00f0ff]'
        : hoverState === 'card'
        ? 'bg-cursed-magenta shadow-[0_0_10px_#c77dff]'
        : 'bg-white shadow-[0_0_8px_#ffffff]';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Energy Trail Points */}
      {trail.map((pt, idx) => {
        const opacity = (idx + 1) / trail.length * 0.45;
        const scale = 0.4 + (idx + 1) / trail.length * 0.6;
        return (
          <div
            key={pt.id}
            className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
            style={{
              left: pt.x,
              top: pt.y,
              width: '8px',
              height: '8px',
              transform: `translate(-50%, -50%) scale(${scale})`,
              backgroundColor: pt.color,
              opacity: opacity,
              boxShadow: `0 0 10px ${pt.color}`,
            }}
          />
        );
      })}

      {/* 2. Expanding Click Energy Ring Burst */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute rounded-full border border-electric-blue animate-click-burst pointer-events-none"
          style={{
            left: burst.x,
            top: burst.y,
            width: '24px',
            height: '24px',
            boxShadow: '0 0 15px #00f0ff, inset 0 0 10px #9d4edd',
          }}
        />
      ))}

      {/* 3. Trailing Ring */}
      <div
        id="cursed-cursor-ring"
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none transition-[width,height,border-color,box-shadow,transform] duration-150 ease-out will-change-transform ${ringColor}`}
      />

      {/* 4. Sharp Center Core Dot */}
      <div
        id="cursed-cursor-dot"
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none transition-colors duration-150 will-change-transform ${dotColor}`}
      />
    </div>
  );
}
