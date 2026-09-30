'use client';

import React, { useState, useMemo } from 'react';
import { FAQS_DATA } from '@/data/faqs';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { soundFx } from '@/lib/sound';

const FAQ_CHIPS = [
  'All',
  'Academics',
  'Fees',
  'Campus',
  'Food',
  'Student Services',
  'Hostel',
];

// Map chips to category keys in FAQS_DATA
const CHIP_CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  Academics: ['Academics & Labs'],
  Fees: ['Fees & Accounts'],
  Campus: ['Campus Life & Library'],
  Food: ['Hostel & Food'],
  'Student Services': ['Student Care', 'ERP & Technical'],
  Hostel: ['Hostel & Food'],
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('All');

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      // Category chip filter
      if (selectedChip !== 'All') {
        const allowed = CHIP_CATEGORY_MAP[selectedChip] || [];
        if (!allowed.includes(faq.category)) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQ = faq.question.toLowerCase().includes(q);
        const matchesA = faq.answer.toLowerCase().includes(q);
        const matchesK = faq.keywords.some((k) => k.toLowerCase().includes(q));
        if (!matchesQ && !matchesA && !matchesK) {
          return false;
        }
      }

      return true;
    });
  }, [selectedChip, searchQuery]);

  const handleChipSelect = (chip: string) => {
    soundFx.playClick();
    setSelectedChip(chip);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-electric-cyan font-semibold block mb-2">
          FRESHMAN SURVIVAL FAQ
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          What do you need help with?
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Instant answers to core freshman questions.
        </p>
      </div>

      {/* Large Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search your question (e.g. fees, library, ERP)..."
        />
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {FAQ_CHIPS.map((chip) => {
          const isSelected = selectedChip === chip;
          return (
            <button
              key={chip}
              onClick={() => handleChipSelect(chip)}
              className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all ${
                isSelected
                  ? 'bg-white text-void-950 font-bold shadow-sm'
                  : 'bg-void-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Collapsed Accordion List (Questions only until expanded) */}
      {filteredFaqs.length > 0 ? (
        <FAQAccordion items={filteredFaqs} />
      ) : (
        <EmptyState
          title="No Answers Found"
          message={`No survival questions matched "${searchQuery}". Reset your query to view common questions.`}
          onReset={() => {
            setSearchQuery('');
            setSelectedChip('All');
          }}
          resetText="View All Questions"
        />
      )}

      {/* Single Clean Footnote */}
      <div className="mt-16 text-center text-[11px] font-mono text-slate-400">
        Evaluation 1 prototype — guidelines will be verified with academic cell handbook.
      </div>
    </div>
  );
}
