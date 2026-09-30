'use client';

import React, { useEffect } from 'react';
import { OfficeItem } from '@/data/types';
import { CampusImagePlaceholder } from './CampusImagePlaceholder';
import { soundFx } from '@/lib/sound';
import { 
  X, 
  MapPin, 
  Clock, 
  Mail, 
  Users, 
  CheckCircle2, 
  Building2,
  Sparkles
} from 'lucide-react';

interface OfficeDetailModalProps {
  office: OfficeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OfficeDetailModal({ office, isOpen, onClose }: OfficeDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      soundFx.playModalOpen();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !office) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-2xl backdrop-blur-2xl z-10 animate-modal-enter flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-void-850">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cursed-magenta" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {office.department}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Office Photo Visual */}
          <div className="overflow-hidden rounded-xl border border-white/5">
            <CampusImagePlaceholder
              imageSrc={office.image || '/images/placeholder.jpg'}
              locationName={office.name}
              category={office.department.split('&')[0].trim()}
              aspectRatio="video"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {office.name}
            </h2>
            <p className="mt-1 text-slate-400 font-mono text-[11px]">
              {office.department}
            </p>
          </div>

          {/* Who Should Visit */}
          <div className="p-3.5 rounded-xl bg-void-850 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-electric-blue" />
              Who Should Visit
            </span>
            <p className="text-slate-200 leading-relaxed font-normal">
              {office.whoShouldVisit}
            </p>
          </div>

          {/* Issues Handled */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Issues Handled:
            </span>
            <ul className="space-y-1.5">
              {office.issuesHandled.map((issue, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-void-850/60 border border-white/5 text-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0 mt-1.5" />
                  <span className="leading-snug">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-void-850 border border-white/5 space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-electric-blue" /> Location
              </span>
              <p className="text-slate-200 font-mono text-[11px] truncate">
                {office.location}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-void-850 border border-white/5 space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-cursed-magenta" /> Hours
              </span>
              <p className="text-slate-200 text-[11px] truncate">
                {office.workingHours}
              </p>
            </div>
          </div>

          <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Contact: {office.contact}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-void-850 border-t border-white/5 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-white text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
