'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/data/types';
import { ChevronDown, ArrowRight, MapPin, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import Link from 'next/link';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    soundFx.playClick();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border transition-all duration-200 overflow-hidden',
              isOpen
                ? 'border-white/20 bg-void-900 shadow-md'
                : 'border-white/5 bg-void-900/50 hover:border-white/10 hover:bg-void-900/80'
            )}
          >
            {/* Header: Question ONLY */}
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none transition-colors"
            >
              <span className="text-sm sm:text-base font-semibold text-white pr-4">
                {item.question}
              </span>

              <div
                className={cn(
                  'flex items-center justify-center w-7 h-7 rounded-full border border-white/5 text-slate-400 shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180 text-electric-blue border-electric-blue/40 bg-electric-dark/20'
                )}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Answer (revealed on click) */}
            {isOpen && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                <p>{item.answer}</p>

                {(item.recommendedLocationId || item.recommendedOfficeId) && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {item.recommendedLocationId && (
                      <Link
                        href={`/location/${item.recommendedLocationId}`}
                        onClick={() => soundFx.playClick()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-dark/20 border border-electric-blue/30 text-electric-blue text-xs font-medium hover:bg-electric-blue hover:text-void-950 transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>View Location</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}

                    {item.recommendedOfficeId && (
                      <Link
                        href="/offices"
                        onClick={() => soundFx.playClick()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-800 border border-white/10 text-slate-300 text-xs font-medium hover:text-white hover:border-white/20 transition-all"
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Check Office</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
