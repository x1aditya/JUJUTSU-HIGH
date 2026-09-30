'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Compass, 
  Menu, 
  X, 
  Search, 
  Volume2, 
  VolumeX, 
  ArrowUpRight,
  ChevronDown,
  Building2,
  Sparkles,
  Users,
  Calendar,
  Trophy,
  MessageSquareQuote,
  Camera,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import { TabTransitionType } from './TabTransition';
import { prefersReducedMotion } from '@/lib/animations';

const TAB_MAP: Record<string, TabTransitionType> = {
  '/': 'home',
  '/directory': 'directory',
  '/offices': 'offices',
  '/manual': 'manual',
  '/food': 'food',
  '/faq': 'faq',
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [guideDropdownOpen, setGuideDropdownOpen] = useState(false);
  const [manualDropdownOpen, setManualDropdownOpen] = useState(false);

  useEffect(() => {
    setSoundActive(soundFx.isEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleSoundChange = () => {
      setSoundActive(soundFx.isEnabled());
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cu_sound_changed', handleSoundChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cu_sound_changed', handleSoundChange);
    };
  }, []);

  const toggleSound = () => {
    const state = soundFx.toggle();
    setSoundActive(state);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);
    setManualDropdownOpen(false);
  }, [pathname]);

  const handleTabClick = (e: React.MouseEvent, href: string) => {
    // If clicking current page without params change, soft click only
    if (pathname === href) {
      soundFx.playClick();
      return;
    }

    // Determine target base tab
    const baseHref = href.split('?')[0];
    const tabType = TAB_MAP[baseHref] || 'manual';

    if (!tabType || isNavigating) {
      soundFx.playClick();
      return;
    }

    // Prevent immediate replacement
    e.preventDefault();

    // Respect reduced motion: subtle 260ms fade transition
    if (prefersReducedMotion()) {
      soundFx.playClick();
      window.dispatchEvent(
        new CustomEvent('cu_tab_transition', {
          detail: { type: tabType, active: true },
        })
      );
      setTimeout(() => {
        router.push(href);
      }, 100);
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('cu_tab_transition', {
            detail: { type: tabType, active: false },
          })
        );
        setIsNavigating(false);
      }, 260);
      return;
    }

    setIsNavigating(true);

    // Play tab-specific supernatural sound effect
    switch (tabType) {
      case 'home':
        soundFx.playDeepPulse();
        break;
      case 'directory':
        soundFx.playEnergySlash();
        break;
      case 'offices':
        soundFx.playCursedPulse();
        break;
      case 'manual':
        soundFx.playCursedPulse();
        break;
      case 'food':
        soundFx.playEmberWhoosh();
        break;
      case 'faq':
        soundFx.playSpiritChime();
        break;
    }

    // Trigger supernatural tab transition & cursor energy color
    window.dispatchEvent(
      new CustomEvent('cu_tab_transition', {
        detail: { type: tabType, active: true },
      })
    );

    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);
    setManualDropdownOpen(false);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const navDelay = isMobile ? 420 : 540;
    const totalDuration = isMobile ? 900 : 1200;

    // Route new page underneath before animation ends
    setTimeout(() => {
      router.push(href);
    }, navDelay);

    // Page Reveal complete
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('cu_tab_transition', {
          detail: { type: tabType, active: false },
        })
      );
      setIsNavigating(false);
    }, totalDuration);
  };

  const isGuideActive = pathname === '/directory' || pathname === '/offices';
  const isManualActive = pathname === '/manual';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-void-950/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleTabClick(e, '/')}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-void-850 border border-white/10 group-hover:border-electric-blue/50 transition-colors">
              <Compass className="w-4 h-4 text-electric-blue group-hover:rotate-45 transition-transform duration-300" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-white group-hover:text-electric-cyan transition-colors">
                  CU SURVIVAL
                </span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-slate-400">
                  DUAL DOMAIN
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                THE SORCERER'S GUIDE & MANUAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-void-900/80 border border-white/5 backdrop-blur-md">
            {/* 1. HOME */}
            <Link
              href="/"
              onClick={(e) => handleTabClick(e, '/')}
              className={cn(
                'relative px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all group',
                pathname === '/'
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span>Home</span>
              <span
                className={cn(
                  'absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-electric-blue to-cursed-purple transition-all duration-300 pointer-events-none',
                  pathname === '/' ? 'opacity-90 shadow-[0_0_8px_#00f0ff]' : 'opacity-0 group-hover:opacity-75'
                )}
              />
            </Link>

            {/* 2. GUIDE (Dropdown: Directory & Offices) */}
            <div
              className="relative"
              onMouseEnter={() => setGuideDropdownOpen(true)}
              onMouseLeave={() => setGuideDropdownOpen(false)}
            >
              <button
                onClick={(e) => handleTabClick(e, '/directory')}
                className={cn(
                  'relative flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all group',
                  isGuideActive
                    ? 'bg-white/10 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <span>Guide</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-transform" />
                <span
                  className={cn(
                    'absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-electric-blue to-cursed-purple transition-all duration-300 pointer-events-none',
                    isGuideActive ? 'opacity-90 shadow-[0_0_8px_#00f0ff]' : 'opacity-0 group-hover:opacity-75'
                  )}
                />
              </button>

              {/* Guide Dropdown Panel */}
              {guideDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48 z-50 animate-fade-in">
                  <div className="rounded-2xl border border-white/10 bg-void-950/95 backdrop-blur-xl p-2 shadow-glass-panel space-y-1">
                    <Link
                      href="/directory"
                      onClick={(e) => handleTabClick(e, '/directory')}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-electric-cyan" />
                      <div>
                        <div className="font-semibold">Directory</div>
                        <div className="text-[10px] text-slate-500 font-mono">19 Campus Hubs</div>
                      </div>
                    </Link>
                    <Link
                      href="/offices"
                      onClick={(e) => handleTabClick(e, '/offices')}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5 text-cursed-purple" />
                      <div>
                        <div className="font-semibold">Offices</div>
                        <div className="text-[10px] text-slate-500 font-mono">Admin & Services</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. STUDENT LIFE // THE TRAINING MANUAL (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setManualDropdownOpen(true)}
              onMouseLeave={() => setManualDropdownOpen(false)}
            >
              <button
                onClick={(e) => handleTabClick(e, '/manual')}
                className={cn(
                  'relative flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all group',
                  isManualActive
                    ? 'bg-gradient-to-r from-cursed-purple/30 to-electric-blue/30 text-white font-semibold border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <span className="font-serif-jp text-cursed-magenta text-[11px] mr-0.5">呪</span>
                <span>Student Life</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-transform" />
                <span
                  className={cn(
                    'absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-electric-blue to-cursed-purple transition-all duration-300 pointer-events-none',
                    isManualActive ? 'opacity-90 shadow-[0_0_8px_#00f0ff]' : 'opacity-0 group-hover:opacity-75'
                  )}
                />
              </button>

              {/* Student Life Dropdown Panel */}
              {manualDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-fade-in">
                  <div className="rounded-2xl border border-white/10 bg-void-950/95 backdrop-blur-xl p-2 shadow-glass-panel space-y-1">
                    <Link
                      href="/manual"
                      onClick={(e) => handleTabClick(e, '/manual')}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white hover:bg-white/5 transition-colors border-b border-white/5 mb-1"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-electric-cyan" />
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <span>Training Manual</span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cursed-purple/30 text-cursed-magenta">ALL</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">Overview & Hub</div>
                      </div>
                    </Link>

                    <Link
                      href="/manual?tab=quiz"
                      onClick={(e) => handleTabClick(e, '/manual?tab=quiz')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Club Quiz</span>
                    </Link>

                    <Link
                      href="/manual?tab=clubs"
                      onClick={(e) => handleTabClick(e, '/manual?tab=clubs')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-pink-400" />
                      <span>Clubs Directory</span>
                    </Link>

                    <Link
                      href="/manual?tab=events"
                      onClick={(e) => handleTabClick(e, '/manual?tab=events')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
                      <span>Campus Events</span>
                    </Link>

                    <Link
                      href="/manual?tab=sports"
                      onClick={(e) => handleTabClick(e, '/manual?tab=sports')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sports Arena</span>
                    </Link>

                    <Link
                      href="/manual?tab=tips"
                      onClick={(e) => handleTabClick(e, '/manual?tab=tips')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 text-purple-300" />
                      <span>Senior Tips</span>
                    </Link>

                    <Link
                      href="/manual?tab=campus"
                      onClick={(e) => handleTabClick(e, '/manual?tab=campus')}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Seen on Campus</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. FOOD */}
            <Link
              href="/food"
              onClick={(e) => handleTabClick(e, '/food')}
              className={cn(
                'relative px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all group',
                pathname === '/food'
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span>Food</span>
              <span
                className={cn(
                  'absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-electric-blue to-cursed-purple transition-all duration-300 pointer-events-none',
                  pathname === '/food' ? 'opacity-90 shadow-[0_0_8px_#00f0ff]' : 'opacity-0 group-hover:opacity-75'
                )}
              />
            </Link>

            {/* 5. FAQ */}
            <Link
              href="/faq"
              onClick={(e) => handleTabClick(e, '/faq')}
              className={cn(
                'relative px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all group',
                pathname === '/faq'
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span>FAQ</span>
              <span
                className={cn(
                  'absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-electric-blue to-cursed-purple transition-all duration-300 pointer-events-none',
                  pathname === '/faq' ? 'opacity-90 shadow-[0_0_8px_#00f0ff]' : 'opacity-0 group-hover:opacity-75'
                )}
              />
            </Link>
          </nav>

          {/* Right Action Icons (Sound Toggle + Quick Search / Explore) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-all',
                soundActive
                  ? 'border-electric-blue/50 bg-electric-dark/20 text-electric-blue shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                  : 'border-white/5 bg-void-850 text-slate-500 hover:text-slate-300'
              )}
              title={soundActive ? 'Sound FX Enabled' : 'Sound FX Disabled'}
              aria-label="Toggle Sound Effects"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-electric-blue" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[10px] uppercase font-bold tracking-wider">{soundActive ? 'SOUND ON' : 'SOUND'}</span>
            </button>

            <Link
              href="/directory"
              onClick={(e) => handleTabClick(e, '/directory')}
              className="p-2 rounded-lg border border-white/5 bg-void-850 text-slate-400 hover:text-white hover:border-white/10 transition-colors"
              title="Search Directory"
            >
              <Search className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/manual"
              onClick={(e) => handleTabClick(e, '/manual')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cursed-purple to-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span className="font-serif-jp text-xs">呪</span>
              <span>Manual</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu & Sound Trigger */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg border border-white/5 bg-void-850 text-slate-400"
              aria-label="Toggle Sound"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-electric-blue" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/5 bg-void-850 text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[57px] bg-void-950/95 border-b border-white/10 p-5 backdrop-blur-xl max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* 1. Home */}
            <Link
              href="/"
              onClick={(e) => handleTabClick(e, '/')}
              className={cn(
                'px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between',
                pathname === '/'
                  ? 'bg-electric-blue text-void-950 font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              )}
            >
              <span>Home</span>
              <span className="text-xs font-mono opacity-50">→</span>
            </Link>

            {/* 2. Guide Section */}
            <div className="pt-2 border-t border-white/5">
              <span className="px-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                CAMPUS GUIDE // MODULE A
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/directory"
                  onClick={(e) => handleTabClick(e, '/directory')}
                  className={cn(
                    'px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5',
                    pathname === '/directory' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:bg-white/5'
                  )}
                >
                  <Compass className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Directory</span>
                </Link>
                <Link
                  href="/offices"
                  onClick={(e) => handleTabClick(e, '/offices')}
                  className={cn(
                    'px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5',
                    pathname === '/offices' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:bg-white/5'
                  )}
                >
                  <Building2 className="w-3.5 h-3.5 text-cursed-purple" />
                  <span>Offices</span>
                </Link>
              </div>
            </div>

            {/* 3. Student Life // Training Manual */}
            <div className="pt-2 border-t border-white/5">
              <span className="px-4 text-[10px] font-mono uppercase tracking-widest text-cursed-magenta block mb-1">
                STUDENT LIFE // THE TRAINING MANUAL
              </span>
              <div className="flex flex-col gap-1">
                <Link
                  href="/manual"
                  onClick={(e) => handleTabClick(e, '/manual')}
                  className={cn(
                    'px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between',
                    pathname === '/manual' ? 'bg-cursed-purple text-white' : 'text-white hover:bg-white/5'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-electric-cyan" />
                    <span>Enter Manual (Hub)</span>
                  </span>
                  <span className="font-serif-jp text-xs opacity-60">呪</span>
                </Link>

                <div className="grid grid-cols-2 gap-1.5 pl-2 pt-1">
                  <Link
                    href="/manual?tab=quiz"
                    onClick={(e) => handleTabClick(e, '/manual?tab=quiz')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Quiz</span>
                  </Link>
                  <Link
                    href="/manual?tab=clubs"
                    onClick={(e) => handleTabClick(e, '/manual?tab=clubs')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <Users className="w-3 h-3 text-pink-400" />
                    <span>Clubs</span>
                  </Link>
                  <Link
                    href="/manual?tab=events"
                    onClick={(e) => handleTabClick(e, '/manual?tab=events')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <Calendar className="w-3 h-3 text-electric-cyan" />
                    <span>Events</span>
                  </Link>
                  <Link
                    href="/manual?tab=sports"
                    onClick={(e) => handleTabClick(e, '/manual?tab=sports')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <Trophy className="w-3 h-3 text-emerald-400" />
                    <span>Sports</span>
                  </Link>
                  <Link
                    href="/manual?tab=tips"
                    onClick={(e) => handleTabClick(e, '/manual?tab=tips')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <MessageSquareQuote className="w-3 h-3 text-purple-300" />
                    <span>Tips</span>
                  </Link>
                  <Link
                    href="/manual?tab=campus"
                    onClick={(e) => handleTabClick(e, '/manual?tab=campus')}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
                  >
                    <Camera className="w-3 h-3 text-amber-400" />
                    <span>Campus</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Food & FAQ */}
            <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
              <Link
                href="/food"
                onClick={(e) => handleTabClick(e, '/food')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between',
                  pathname === '/food'
                    ? 'bg-electric-blue text-void-950 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                )}
              >
                <span>Food & Canteens</span>
                <span className="text-xs font-mono opacity-50">→</span>
              </Link>
              <Link
                href="/faq"
                onClick={(e) => handleTabClick(e, '/faq')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between',
                  pathname === '/faq'
                    ? 'bg-electric-blue text-void-950 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                )}
              >
                <span>Survival FAQ</span>
                <span className="text-xs font-mono opacity-50">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
            <span>MISSION 02 • DUAL DOMAIN</span>
            <span className="text-electric-cyan font-bold">CU SURVIVAL</span>
          </div>
        </div>
      )}
    </header>
  );
}
