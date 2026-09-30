'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FACILITIES, 
  FACILITY_PHOTOS, 
  TIME_SLOTS, 
  DEFAULT_TAKEN_SLOTS, 
  INITIAL_POSTS 
} from '@/data/manual/sportsData';
import { Facility, TeammatePost } from '@/data/manual/types';
import { soundFx } from '@/lib/sound';
import { Trophy, Clock, Users, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SportsArena() {
  // Facility Booking State
  const [activeFacility, setActiveFacility] = useState<Facility>('Gym');
  const [chosenSlot, setChosenSlot] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingMessage, setBookingMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Teammate Matchmaker State
  const [posts, setPosts] = useState<TeammatePost[]>(INITIAL_POSTS);
  const [postText, setPostText] = useState('');
  const [postTime, setPostTime] = useState('');

  // Facility Switch Handler
  const handleFacilityChange = (f: Facility) => {
    soundFx.playClick();
    setActiveFacility(f);
    setChosenSlot('');
    setBookingMessage(null);
  };

  // Slot Select Handler
  const handleSlotSelect = (slot: string) => {
    soundFx.playClick();
    setChosenSlot(slot);
    setBookingMessage(null);
  };

  // Booking Submit Handler
  const handleBookSlot = () => {
    if (!chosenSlot) {
      soundFx.playClick();
      setBookingMessage({ text: 'Pick a time slot first.', isError: true });
      return;
    }

    soundFx.playSpiritChime();
    const bookedKey = activeFacility + chosenSlot;
    setBookedSlots((prev) => [...prev, bookedKey]);
    const bookedTime = chosenSlot;
    setChosenSlot('');
    setBookingMessage({
      text: `Booked ${activeFacility} at ${bookedTime}. Show your Student UID at the facility gate.`,
      isError: false,
    });
  };

  // Teammate Request Submit Handler
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = postText.trim();
    const trimmedTime = postTime.trim();

    if (!trimmedText || !trimmedTime) {
      return;
    }

    soundFx.playClick();
    const newPost: TeammatePost = {
      id: `post-${Date.now()}`,
      text: trimmedText,
      time: trimmedTime,
      by: 'You',
      createdAt: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setPostText('');
    setPostTime('');
  };

  const facilityPhoto = FACILITY_PHOTOS[activeFacility];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1.5">
          <Trophy className="w-4 h-4 text-electric-cyan" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            ATHLETICS & MATCHMAKING // ARENA
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Sports <span className="text-gradient-cyan">arena</span>
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Reserve official training grounds, courts, or recruit squad teammates for scrimmage.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ==================================================
            COLUMN 1: BOOK A SLOT
            ================================================== */}
        <div className="rounded-3xl border border-white/10 bg-void-900/70 backdrop-blur-xl p-6 shadow-glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-electric-cyan" />
                <span>Book a slot</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                UID VERIFIED ONLY
              </span>
            </div>

            {/* Facility Toggle Buttons */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {FACILITIES.map((f) => {
                const isActive = f === activeFacility;
                return (
                  <button
                    key={f}
                    onClick={() => handleFacilityChange(f)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all',
                      isActive
                        ? 'bg-cursed-purple text-white font-bold border border-cursed-magenta/50 shadow-[0_0_15px_rgba(157,78,221,0.4)]'
                        : 'bg-void-950/60 border border-white/10 text-slate-400 hover:text-white'
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Facility Photo Preview (if any) */}
            {facilityPhoto && (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-void-950">
                <Image
                  src={facilityPhoto}
                  alt={activeFacility}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white/90">
                  {activeFacility} // University Athletics Axis
                </div>
              </div>
            )}

            {/* Time Slot Matrix */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isTaken =
                    DEFAULT_TAKEN_SLOTS[activeFacility]?.includes(slot) ||
                    bookedSlots.includes(activeFacility + slot);
                  const isChosen = chosenSlot === slot;

                  return (
                    <button
                      key={slot}
                      disabled={isTaken}
                      onClick={() => handleSlotSelect(slot)}
                      className={cn(
                        'py-2 px-3 rounded-xl font-mono text-xs text-center border transition-all',
                        isTaken
                          ? 'opacity-30 border-white/5 bg-void-950 text-slate-500 line-through cursor-not-allowed'
                          : isChosen
                          ? 'bg-cursed-purple border-cursed-magenta text-white font-bold shadow-[0_0_12px_rgba(157,78,221,0.5)]'
                          : 'bg-void-950/70 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Booking Message Feedback */}
            {bookingMessage && (
              <div
                className={cn(
                  'flex items-start gap-2 p-3 rounded-xl font-mono text-xs mb-4',
                  bookingMessage.isError
                    ? 'bg-rose-500/10 border border-rose-500/25 text-rose-400'
                    : 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
                )}
              >
                {bookingMessage.isError ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                )}
                <span>{bookingMessage.text}</span>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleBookSlot}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cursed-purple to-electric-blue text-void-950 font-bold font-mono text-xs uppercase tracking-wider hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          >
            Confirm Booking
          </button>
        </div>

        {/* ==================================================
            COLUMN 2: FIND TEAMMATES
            ================================================== */}
        <div className="rounded-3xl border border-white/10 bg-void-900/70 backdrop-blur-xl p-6 shadow-glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-electric-cyan" />
                <span>Find teammates</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                COMMUNITY BOARD
              </span>
            </div>

            {/* Post Feed */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1 no-scrollbar mb-5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-2xl border border-white/10 bg-void-950/60 backdrop-blur-sm flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {post.text}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {post.time} • <span className="text-electric-cyan font-semibold">{post.by}</span>
                    </p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-400 uppercase">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* New Post Form */}
          <form onSubmit={handleAddPost} className="space-y-2.5 pt-3 border-t border-white/5">
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Need 2 players for badminton"
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-void-950/80 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-electric-cyan/60 transition-colors"
            />
            <input
              type="text"
              value={postTime}
              onChange={(e) => setPostTime(e.target.value)}
              placeholder="When? e.g. Sun, 6 PM"
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-void-950/80 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-electric-cyan/60 transition-colors"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-void-850 hover:bg-void-800 border border-white/15 text-white font-bold font-mono text-xs uppercase tracking-wider hover:border-white/30 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Post Request</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
