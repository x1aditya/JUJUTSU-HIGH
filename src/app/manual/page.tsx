'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ManualLayout } from '@/components/manual/ManualLayout';
import { ManualTab } from '@/data/manual/types';

function ManualContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ManualTab | null;
  const validTabs: ManualTab[] = ['quiz', 'clubs', 'events', 'sports', 'tips', 'campus'];

  const initialTab: ManualTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'quiz';

  return <ManualLayout initialTab={initialTab} />;
}

export default function ManualPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
            <span>INITIALIZING TRAINING MANUAL DOMAIN...</span>
          </div>
        </div>
      }
    >
      <ManualContent />
    </Suspense>
  );
}
