'use client';

import React, { useState, useMemo } from 'react';
import { OFFICES_DATA } from '@/data/offices';
import { OfficeItem } from '@/data/types';
import { OfficeCard } from '@/components/OfficeCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { OfficeFinderModal } from '@/components/OfficeFinderModal';
import { OfficeDetailModal } from '@/components/OfficeDetailModal';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '@/lib/sound';

export default function OfficesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<OfficeItem | null>(null);

  const filteredOffices = useMemo(() => {
    if (!searchQuery.trim()) return OFFICES_DATA;
    const q = searchQuery.toLowerCase().trim();
    return OFFICES_DATA.filter((office) => {
      return (
        office.name.toLowerCase().includes(q) ||
        office.department.toLowerCase().includes(q) ||
        office.issuesHandled.some((i) => i.toLowerCase().includes(q)) ||
        office.commonTriggers.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Cinematic Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cursed-magenta font-semibold block mb-2">
          ADMINISTRATION // PAIR A
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Essential Offices
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Official campus support cells, fees, and student facilitation.
        </p>
      </div>

      {/* Visually Compact "Freshman Dilemma Solver" Banner */}
      <div className="max-w-2xl mx-auto mb-8 p-4 px-6 rounded-2xl border border-white/5 bg-void-900/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-void-800 border border-white/5 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-electric-cyan" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Not sure where to go?</h3>
            <p className="text-xs text-slate-400">Match your issue to the right office in 3 steps.</p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            setIsFinderOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-white text-void-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shrink-0"
        >
          FIND MY OFFICE
        </button>
      </div>

      {/* Large Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by issue (e.g. fees, ID card, bonafide)..."
        />
      </div>

      {/* 3-Column Clean Card Grid */}
      {filteredOffices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffices.map((office, idx) => (
            <div key={office.id} className={`stagger-card-${(idx % 8) + 1}`}>
              <OfficeCard
                office={office}
                onOpen={(item) => setSelectedOffice(item)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Offices Located"
          message={`No offices found matching "${searchQuery}". Clear your search to view all desks.`}
          onReset={() => setSearchQuery('')}
          resetText="View All Offices"
        />
      )}

      {/* Single Clean Footnote */}
      <div className="mt-16 text-center text-[11px] font-mono text-slate-400">
        Evaluation 1 prototype — campus data will be verified during field investigation.
      </div>

      {/* Office Finder Diagnostic Modal */}
      <OfficeFinderModal
        offices={OFFICES_DATA}
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onSelectOffice={(office) => {
          setIsFinderOpen(false);
          setSelectedOffice(office);
        }}
      />

      {/* Full Office Detail Modal */}
      <OfficeDetailModal
        office={selectedOffice}
        isOpen={!!selectedOffice}
        onClose={() => setSelectedOffice(null)}
      />
    </div>
  );
}
