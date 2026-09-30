import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Clock, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  type?: 'status' | 'verification';
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, type = 'status', size = 'md', className }: StatusBadgeProps) {
  if (type === 'verification') {
    const isVerified = status === 'true' || status === 'verified';
    if (isVerified) {
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium tracking-wide uppercase',
            'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
            size === 'sm' ? 'text-[10px]' : 'text-xs',
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Verified on Campus
        </span>
      );
    }
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium tracking-wide uppercase',
          'border-amber-500/30 bg-amber-950/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
          size === 'sm' ? 'text-[10px]' : 'text-xs',
          className
        )}
      >
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        Pending Field Evidence
      </span>
    );
  }

  // General Status (Open, Closed, Limited Access, etc.)
  const normalized = status.toLowerCase();
  let badgeStyle = 'border-slate-700 bg-slate-900/60 text-slate-300';
  let Icon = Clock;

  if (normalized.includes('open')) {
    badgeStyle = 'border-electric-blue/40 bg-electric-dark/30 text-electric-blue shadow-[0_0_12px_rgba(0,240,255,0.2)]';
    Icon = CheckCircle2;
  } else if (normalized.includes('closing') || normalized.includes('limited')) {
    badgeStyle = 'border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
    Icon = Clock;
  } else if (normalized.includes('closed') || normalized.includes('restricted')) {
    badgeStyle = 'border-rose-500/40 bg-rose-950/40 text-rose-300';
    Icon = ShieldAlert;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold tracking-wider text-[11px] uppercase',
        badgeStyle,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping opacity-75" />
      {status}
    </span>
  );
}
