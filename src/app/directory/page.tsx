'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LOCATIONS_DATA, hasRealImage } from '@/data/locations';
import { LocationItem, LocationCategory } from '@/data/types';
import { LocationCard } from '@/components/LocationCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { LocationDetailModal } from '@/components/LocationDetailModal';
import { MapModal } from '@/components/MapModal';
import { soundFx } from '@/lib/sound';

const CATEGORIES: (LocationCategory | 'All')[] = [
  'All',
  'Academic',
  'Administration',
  'Student Essentials',
];

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as LocationCategory | 'All' | null;
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'All'>(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [activeMapLocation, setActiveMapLocation] = useState<LocationItem | null>(null);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialCategory, initialQuery]);

  const filteredLocations = useMemo(() => {
    return LOCATIONS_DATA.filter((item) => {
      // ONLY DISPLAY A LOCATION CARD IF THAT LOCATION HAS A REAL CAMPUS IMAGE
      if (!hasRealImage(item.image)) {
        return false;
      }

      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesPurpose = item.purpose.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesPurpose && !matchesSub && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (cat: LocationCategory | 'All') => {
    soundFx.playClick();
    setSelectedCategory(cat);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Cinematic Minimal Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-electric-cyan font-semibold block mb-2">
          CAMPUS DIRECTORY // PAIR A
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Where do you need to go?
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Discover essential lecture complexes, offices, and student hubs.
        </p>
      </div>

      {/* Large Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search campus destinations..."
        />
      </div>

      {/* 4 Clean Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                isSelected
                  ? 'bg-white text-void-950 font-bold shadow-sm'
                  : 'bg-void-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dynamic Count Indicator */}
      <div className="flex items-center justify-between mb-4 px-1 text-xs font-mono text-slate-400">
        <span>
          SHOWING {filteredLocations.length} CAMPUS {filteredLocations.length === 1 ? 'LOCATION' : 'LOCATIONS'}
        </span>
        {selectedCategory !== 'All' && (
          <span className="text-[11px] text-electric-cyan">
            SECTOR: {selectedCategory.toUpperCase()}
          </span>
        )}
      </div>

      {/* 3-Column Clean Card Grid */}
      {filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location, idx) => (
            <div key={location.id} className={`stagger-card-${(idx % 8) + 1}`}>
              <LocationCard
                location={location}
                onOpenDetails={(loc) => setSelectedLocation(loc)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Destination Not Found"
          message={`No locations match "${searchQuery}". Reset filters to browse all campus points.`}
          onReset={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
          resetText="Reset Search"
        />
      )}

      {/* Single Clean Evaluation 1 Notice at Bottom */}
      <div className="mt-16 text-center text-[11px] font-mono text-slate-400">
        Evaluation 1 prototype — campus data will be verified during field investigation.
      </div>

      {/* Location Detail Modal */}
      <LocationDetailModal
        location={selectedLocation}
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        onOpenMap={(loc) => {
          setSelectedLocation(null);
          setActiveMapLocation(loc);
        }}
      />

      {/* Campus Map Blueprint Modal */}
      <MapModal
        location={activeMapLocation}
        isOpen={!!activeMapLocation}
        onClose={() => setActiveMapLocation(null)}
      />
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-xs font-mono text-slate-500">
        LOADING SPATIAL COORDINATES...
      </div>
    }>
      <DirectoryContent />
    </Suspense>
  );
}
