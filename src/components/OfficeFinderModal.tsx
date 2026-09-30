'use client';

import React, { useState, useEffect } from 'react';
import { OfficeItem } from '@/data/types';
import { soundFx } from '@/lib/sound';
import { 
  X, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface OfficeFinderModalProps {
  offices: OfficeItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectOffice: (office: OfficeItem) => void;
}

const SCENARIOS = [
  {
    id: 'fees',
    label: 'Fee payment error, receipt missing, or scholarship installment',
    officeId: 'accounts-office',
    reason: 'Central Accounts directly resolves banking challans, payment gateway timeouts, and scholarship ledger postings.',
  },
  {
    id: 'erp',
    label: 'CUIMS login locked, password reset, or missing timetable',
    officeId: 'erp-support-desk',
    reason: 'Digital IT Support handles student portal LDAP credentials, Wi-Fi keys, and elective timetable sync.',
  },
  {
    id: 'bonafide',
    label: 'Need Bonafide Certificate for bank loan or visa documents',
    officeId: 'registrar-office',
    reason: 'Registrar records maintains official university seals, academic bonafides, and mark transcripts.',
  },
  {
    id: 'lost-id',
    label: 'Lost student RFID ID card, lost belongings, or parking pass',
    officeId: 'proctor-office',
    reason: 'The Proctor Office logs lost property reports and grants mandatory security replacement clearance.',
  },
  {
    id: 'mental-health',
    label: 'Feeling stressed, homesick, anxious, or roommate issues',
    officeId: 'student-care-center',
    reason: 'DSW Student Care offers 100% confidential professional counseling and freshman adjustment support.',
  },
];

export function OfficeFinderModal({
  offices,
  isOpen,
  onClose,
  onSelectOffice,
}: OfficeFinderModalProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);

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

  if (!isOpen) return null;

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const matchedOffice = offices.find((o) => o.id === currentScenario.officeId) || offices[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-2xl backdrop-blur-2xl z-10 animate-modal-enter flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-void-850">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-electric-cyan" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Find My Office
            </h3>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Simple Flow */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Choose problem */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
              1. Choose Your Challenge
            </label>
            <div className="space-y-1.5">
              {SCENARIOS.map((item) => {
                const isSelected = item.id === selectedScenarioId;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedScenarioId(item.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-electric-blue/50 bg-electric-dark/20 text-white font-medium shadow-sm'
                        : 'border-white/5 bg-void-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="line-clamp-1">{item.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ml-2 ${isSelected ? 'text-electric-blue' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3: Recommended office + Reason + Location */}
          {matchedOffice && (
            <div className="p-4 rounded-xl border border-electric-blue/30 bg-void-850 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-electric-cyan uppercase font-bold tracking-wider block mb-1">
                  2. Recommended Office
                </span>
                <h4 className="text-lg font-bold text-white">
                  {matchedOffice.name}
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  3. Reason & Coordinates
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentScenario.reason}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-electric-blue">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{matchedOffice.location}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onSelectOffice(matchedOffice);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-blue text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>Open Office Panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
