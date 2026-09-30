'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '@/lib/sound';
import { cn } from '@/lib/utils';

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(soundFx.isEnabled());
    const handleUpdate = () => {
      setActive(soundFx.isEnabled());
    };
    window.addEventListener('cu_sound_changed', handleUpdate);
    return () => window.removeEventListener('cu_sound_changed', handleUpdate);
  }, []);

  const handleToggle = () => {
    const newState = soundFx.toggle();
    setActive(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-all',
        active
          ? 'border-electric-blue/50 bg-electric-dark/20 text-electric-blue shadow-[0_0_12px_rgba(0,240,255,0.25)]'
          : 'border-white/5 bg-void-850 text-slate-500 hover:text-slate-300 hover:border-white/10',
        className
      )}
      title={active ? 'Sound FX: ON' : 'Sound FX: OFF'}
      aria-label="Toggle Sound Effects"
    >
      {active ? <Volume2 className="w-3.5 h-3.5 text-electric-blue" /> : <VolumeX className="w-3.5 h-3.5" />}
      <span className="text-[10px] uppercase font-bold tracking-wider">{active ? 'SOUND ON' : 'SOUND'}</span>
    </button>
  );
}
