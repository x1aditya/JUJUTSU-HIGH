import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  actionText,
  actionHref,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'relative mb-8 flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cursed-purple/40 bg-cursed-purple/10 text-[11px] font-mono font-semibold tracking-widest text-cursed-magenta uppercase mb-3 shadow-[0_0_15px_rgba(157,78,221,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cursed-magenta animate-ping" />
          {badge}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {title}{' '}
            {highlight && (
              <span className="text-gradient-cyan drop-shadow-sm">{highlight}</span>
            )}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-electric-blue hover:text-white transition-colors duration-200 self-start sm:self-end shrink-0"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
