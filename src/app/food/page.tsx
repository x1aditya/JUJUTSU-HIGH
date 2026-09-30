'use client';

import React, { useState, useMemo } from 'react';
import { FOOD_DATA } from '@/data/food';
import { FoodItem, FoodType } from '@/data/types';
import { FoodCard } from '@/components/FoodCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { TodayMenuModal } from '@/components/TodayMenuModal';
import { soundFx } from '@/lib/sound';

const FOOD_TYPES: (FoodType | 'All')[] = [
  'All',
  'Cafeteria',
  'Mess',
  'Tuck Shop',
];

export default function FoodPage() {
  const [selectedType, setSelectedType] = useState<FoodType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuFood, setActiveMenuFood] = useState<FoodItem | null>(null);

  const filteredFood = useMemo(() => {
    return FOOD_DATA.filter((item) => {
      if (selectedType !== 'All' && item.type !== selectedType) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesMenu = item.menuPreview.some((m) => m.toLowerCase().includes(q));
        if (!matchesName && !matchesLoc && !matchesMenu) {
          return false;
        }
      }
      return true;
    });
  }, [selectedType, searchQuery]);

  const handleTypeSelect = (type: FoodType | 'All') => {
    soundFx.playClick();
    setSelectedType(type);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Cinematic Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
          CAMPUS RECHARGE // PAIR A
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Food & Cafeteria
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Campus food court, student mess halls, and quick snacks.
        </p>
      </div>

      {/* Large Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search dining, dishes, or tuck shops..."
        />
      </div>

      {/* 4 Clean Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {FOOD_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                isSelected
                  ? 'bg-amber-400 text-void-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-void-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {type === 'Mess' ? 'Mess Halls' : type === 'Tuck Shop' ? 'Tuck Shops' : type}
            </button>
          );
        })}
      </div>

      {/* 3-Column Clean Card Grid */}
      {filteredFood.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFood.map((food, idx) => (
            <div key={food.id} className={`stagger-card-${(idx % 8) + 1}`}>
              <FoodCard
                food={food}
                onOpenMenu={(item) => setActiveMenuFood(item)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Outlets Located"
          message={`No dining spots match "${searchQuery}". Reset filters to browse all options.`}
          onReset={() => {
            setSelectedType('All');
            setSearchQuery('');
          }}
          resetText="View All Dining"
        />
      )}

      {/* Single Clean Footnote */}
      <div className="mt-16 text-center text-[11px] font-mono text-slate-400">
        Evaluation 1 prototype — sample dining items will be verified with active campus menus.
      </div>

      {/* Today's Menu Modal */}
      <TodayMenuModal
        food={activeMenuFood}
        isOpen={!!activeMenuFood}
        onClose={() => setActiveMenuFood(null)}
      />
    </div>
  );
}
