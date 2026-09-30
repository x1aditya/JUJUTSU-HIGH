'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  size?: 'default' | 'large';
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search locations, offices, services, laboratories...',
  className,
  size = 'default',
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener: Command/Ctrl + K or "/" focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const isLarge = size === 'large';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className={cn('relative w-full group', className)}
    >
      {/* Outer Glow Halo on Focus */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-electric-blue via-cursed-purple to-neon-cyan opacity-25 blur-sm transition-all duration-300 group-focus-within:opacity-75 group-hover:opacity-40" />

      <div
        className={cn(
          'relative flex items-center w-full rounded-2xl bg-void-850/90 border border-white/10 backdrop-blur-xl transition-all duration-300',
          'group-focus-within:border-electric-blue/60 group-focus-within:bg-void-800',
          isLarge ? 'h-14 sm:h-16 px-5' : 'h-12 px-4'
        )}
      >
        <Search
          className={cn(
            'text-slate-400 group-focus-within:text-electric-blue transition-colors shrink-0 mr-3',
            isLarge ? 'w-6 h-6' : 'w-5 h-5'
          )}
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'w-full bg-transparent text-white placeholder-slate-500 font-medium focus:outline-none tracking-wide',
            isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
          )}
        />

        {value.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-2"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 ml-2 px-2.5 py-1 rounded-md bg-void-950/80 border border-white/10 text-[11px] font-mono text-slate-400">
            <Sparkles className="w-3 h-3 text-cursed-magenta" />
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-void-800 border border-white/15 text-slate-200 font-bold">
              ⌘K
            </kbd>
          </div>
        )}
      </div>
    </form>
  );
}
