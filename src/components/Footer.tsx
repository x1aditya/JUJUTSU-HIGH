import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-void-950 py-10 text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="text-sm font-black text-slate-200 tracking-wide">
            CU STUDENT SURVIVAL
          </div>
          <div className="text-xs font-mono text-slate-400">
            The Sorcerer&apos;s Guide &amp; Training Manual
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
          <Link href="/directory" className="hover:text-white transition-colors">
            Campus Directory
          </Link>
          <span className="text-slate-700">•</span>
          <Link href="/offices" className="hover:text-white transition-colors">
            Offices
          </Link>
          <span className="text-slate-700">•</span>
          <Link href="/manual" className="text-electric-cyan hover:text-white transition-colors flex items-center gap-1 font-semibold">
            <span className="font-serif-jp text-cursed-magenta text-xs">呪</span>
            <span>Training Manual</span>
          </Link>
          <span className="text-slate-700">•</span>
          <Link href="/food" className="hover:text-white transition-colors">
            Food
          </Link>
          <span className="text-slate-700">•</span>
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Mission 02 • Dual Domain */}
        <div className="text-xs font-mono text-slate-400 text-center sm:text-right">
          Mission 02 • Pair A &amp; B
          <span className="block text-[10px] text-slate-500">Evaluation 1 Prototype</span>
        </div>
      </div>
    </footer>
  );
}
