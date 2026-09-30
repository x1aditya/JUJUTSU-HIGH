import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  UtensilsCrossed, 
  Home, 
  HeartHandshake, 
  ArrowUpRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  countLabel: string;
  description: string;
  href: string;
  iconName: 'Academic' | 'Administration' | 'Library' | 'Food' | 'Hostel' | 'Student Care';
  glowColor?: 'cyan' | 'purple' | 'amber';
}

const ICON_MAP = {
  Academic: GraduationCap,
  Administration: Building2,
  Library: BookOpen,
  Food: UtensilsCrossed,
  Hostel: Home,
  'Student Care': HeartHandshake,
};

export function CategoryCard({
  title,
  countLabel,
  description,
  href,
  iconName,
  glowColor = 'cyan',
}: CategoryCardProps) {
  const Icon = ICON_MAP[iconName] || GraduationCap;

  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-void-850/80 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300',
        'hover:-translate-y-1.5 hover:border-electric-blue/50 hover:shadow-neon-cyan',
        'corner-brackets flex flex-col justify-between'
      )}
    >
      {/* Background cyber grid on hover */}
      <div className="absolute inset-0 bg-cyber-grid opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

      {/* Glow orb */}
      <div
        className={cn(
          'absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl transition-all duration-500 pointer-events-none',
          glowColor === 'purple'
            ? 'bg-cursed-purple/15 group-hover:bg-cursed-purple/35'
            : glowColor === 'amber'
            ? 'bg-energy-amber/15 group-hover:bg-energy-amber/35'
            : 'bg-electric-blue/15 group-hover:bg-electric-blue/35'
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-void-800 border border-white/10 group-hover:border-electric-blue/60 group-hover:bg-void-700/80 transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6 text-electric-cyan group-hover:text-electric-blue group-hover:scale-110 transition-transform duration-300" />
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-electric-blue transition-colors">
            <span>{countLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-electric-cyan transition-colors mb-1.5">
          {title}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
        <span>ACCESS SECTOR</span>
        <span className="text-electric-blue font-bold tracking-widest">ENTER →</span>
      </div>
    </Link>
  );
}
