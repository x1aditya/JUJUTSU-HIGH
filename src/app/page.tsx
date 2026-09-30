'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Compass, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  UtensilsCrossed, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { CampusImagePlaceholder } from '@/components/CampusImagePlaceholder';
import { soundFx } from '@/lib/sound';

const FEATURED_LANDMARKS = [
  {
    id: 'main-entrance-gate',
    name: 'Main Entrance Gate',
    category: 'Gateway Axis',
    image: '/images/campus/main_entrance_gate .jpg',
    href: '/location/main-entrance-gate',
  },
  {
    id: 'central-library',
    name: 'Central Library',
    category: 'Block A-3',
    image: '/images/campus/20260930_132618.jpg',
    href: '/location/central-library',
  },
  {
    id: 'aircraft-aviation-lab',
    name: 'Aircraft Propulsion Lab',
    category: 'Engineering Hangar',
    image: '/images/campus/20260930_131645.jpg',
    href: '/location/aircraft-aviation-lab',
  },
  {
    id: 'dsaa-student-affairs',
    name: 'DSA&A Administration',
    category: 'Admin Colonnade',
    image: '/images/campus/20260930_132135.jpg',
    href: '/location/dsaa-student-affairs',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (searchQuery.trim().length > 0) {
      router.push(`/directory?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/directory');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ==================================================
          CINEMATIC HERO SECTION
          ================================================== */}
      <section className="text-center max-w-3xl mx-auto my-auto pt-4 sm:pt-6 pb-8">
        {/* Atmospheric Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-void-900/60 backdrop-blur-md text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
          <span>CU STUDENT SURVIVAL • DUAL DOMAIN SYSTEM</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
          New to CU? <br />
          <span className="text-gradient-cyan">Find your way.</span>
        </h1>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearchSubmit}
            size="large"
            placeholder="Where do you need to go?"
          />
        </div>

        {/* ==================================================
            DUAL-DOMAIN MAJOR ENTRY POINTS
            ================================================== */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {/* 1. WHERE DO I GO? — The Sorcerer's Guide */}
          <div className="rounded-2xl border border-electric-cyan/30 bg-void-900/80 backdrop-blur-md p-5 flex flex-col justify-between hover:border-electric-cyan/60 transition-all group shadow-glass-panel">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-electric-cyan font-bold">
                  MODULE A // SPATIAL
                </span>
                <Compass className="w-4 h-4 text-electric-cyan" />
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-electric-cyan transition-colors">
                WHERE DO I GO?
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                The Sorcerer&apos;s Guide
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Navigate campus blocks, administrative desks, lecture halls, and canteens.
              </p>
            </div>
            <Link
              href="/directory"
              onClick={() => soundFx.playClick()}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <span>EXPLORE CAMPUS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. WHAT CAN I DO? — The Training Manual */}
          <div className="rounded-2xl border border-cursed-purple/40 bg-void-900/80 backdrop-blur-md p-5 flex flex-col justify-between hover:border-cursed-magenta/60 transition-all group shadow-glass-panel">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-cursed-magenta font-bold flex items-center gap-1">
                  <span className="font-serif-jp">呪</span>
                  <span>MODULE B // ACTIVITIES</span>
                </span>
                <Sparkles className="w-4 h-4 text-cursed-magenta" />
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-cursed-magenta transition-colors">
                WHAT CAN I DO?
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                The Training Manual
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Club affinity quiz, upcoming events, sports slot booking, and senior tips.
              </p>
            </div>
            <Link
              href="/manual"
              onClick={() => soundFx.playClick()}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cursed-purple to-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-[0_0_15px_rgba(157,78,221,0.3)]"
            >
              <span>ENTER TRAINING MANUAL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================
          REAL CAMPUS PHOTO HIGHLIGHTS
          ================================================== */}
      <section className="pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
              VERIFIED CAMPUS HUBS // REAL PHOTOGRAPHIC SURVEY
            </h2>
          </div>
          <Link
            href="/directory"
            onClick={() => soundFx.playClick()}
            className="text-[11px] font-mono text-electric-blue hover:text-white flex items-center gap-1 transition-colors"
          >
            ALL 19 SITES <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_LANDMARKS.map((landmark) => (
            <Link
              key={landmark.id}
              href={landmark.href}
              onClick={() => soundFx.playClick()}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-void-900/60 backdrop-blur-md hover:border-electric-blue/40 hover:-translate-y-1 transition-all corner-brackets-subtle flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-void-950">
                <CampusImagePlaceholder
                  imageSrc={landmark.image}
                  locationName={landmark.name}
                  category={landmark.category}
                  aspectRatio="video"
                  showOverlayPrompt={false}
                />
              </div>
              <div className="p-3.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  {landmark.category}
                </span>
                <h3 className="text-xs font-bold text-white group-hover:text-electric-cyan transition-colors truncate">
                  {landmark.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================
          4 QUICK-ACCESS CARDS
          ================================================== */}
      <section className="pt-2 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. ACADEMIC */}
          <Link
            href="/directory?category=Academic"
            onClick={() => soundFx.playClick()}
            className="stagger-card-1 group p-5 rounded-2xl border border-white/5 bg-void-900/50 backdrop-blur-md hover:border-electric-blue/40 hover:-translate-y-1 transition-all corner-brackets-subtle flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-void-800 border border-white/5 flex items-center justify-center mb-3 group-hover:border-electric-blue/40 transition-colors">
                <GraduationCap className="w-5 h-5 text-electric-cyan" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-electric-cyan transition-colors">
                ACADEMIC
              </h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                Lecture theatres, labs & departments.
              </p>
            </div>
            <span className="mt-4 text-[10px] font-mono text-slate-500 group-hover:text-electric-blue flex items-center gap-1">
              ENTER SECTOR <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* 2. OFFICES */}
          <Link
            href="/offices"
            onClick={() => soundFx.playClick()}
            className="stagger-card-2 group p-5 rounded-2xl border border-white/5 bg-void-900/50 backdrop-blur-md hover:border-cursed-purple/40 hover:-translate-y-1 transition-all corner-brackets-subtle flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-void-800 border border-white/5 flex items-center justify-center mb-3 group-hover:border-cursed-purple/40 transition-colors">
                <Building2 className="w-5 h-5 text-cursed-magenta" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cursed-magenta transition-colors">
                OFFICES
              </h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                Fee, registrar, ERP & student care desks.
              </p>
            </div>
            <span className="mt-4 text-[10px] font-mono text-slate-500 group-hover:text-cursed-magenta flex items-center gap-1">
              RESOLVE ISSUES <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* 3. FOOD */}
          <Link
            href="/food"
            onClick={() => soundFx.playClick()}
            className="stagger-card-3 group p-5 rounded-2xl border border-white/5 bg-void-900/50 backdrop-blur-md hover:border-amber-400/40 hover:-translate-y-1 transition-all corner-brackets-subtle flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-void-800 border border-white/5 flex items-center justify-center mb-3 group-hover:border-amber-400/40 transition-colors">
                <UtensilsCrossed className="w-5 h-5 text-energy-amber" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-energy-amber transition-colors">
                FOOD
              </h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                Food court, hostel mess & late-night spots.
              </p>
            </div>
            <span className="mt-4 text-[10px] font-mono text-slate-500 group-hover:text-energy-amber flex items-center gap-1">
              CAMPUS RECHARGE <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* 4. STUDENT ESSENTIALS */}
          <Link
            href="/directory?category=Student Essentials"
            onClick={() => soundFx.playClick()}
            className="stagger-card-4 group p-5 rounded-2xl border border-white/5 bg-void-900/50 backdrop-blur-md hover:border-electric-blue/40 hover:-translate-y-1 transition-all corner-brackets-subtle flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-void-800 border border-white/5 flex items-center justify-center mb-3 group-hover:border-electric-blue/40 transition-colors">
                <HeartHandshake className="w-5 h-5 text-electric-blue" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-electric-blue transition-colors">
                ESSENTIALS
              </h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                Central library, hostel offices & medical.
              </p>
            </div>
            <span className="mt-4 text-[10px] font-mono text-slate-500 group-hover:text-electric-blue flex items-center gap-1">
              VITAL HUBS <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Single clean prototype footnote */}
      <div className="text-center text-[11px] font-mono text-slate-400 pt-6">
        Evaluation 1 prototype — verified with real ground campus photographs.
      </div>
    </div>
  );
}
