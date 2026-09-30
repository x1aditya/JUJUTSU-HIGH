'use client';

import React, { useState } from 'react';
import { QUIZ_QUESTIONS, CATEGORY_KANJI, CATEGORY_INFO } from '@/data/manual/quizData';
import { CLUBS } from '@/data/manual/clubsData';
import { ClubCategory } from '@/data/manual/types';
import { ClubCard } from './ClubCard';
import { soundFx } from '@/lib/sound';
import { Sparkles, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ManualQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Partial<Record<ClubCategory, number>>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[step];
  const progressPercent = ((step) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (category: ClubCategory) => {
    soundFx.playClick();
    const newScores = {
      ...scores,
      [category]: (scores[category] || 0) + 1,
    };
    setScores(newScores);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      soundFx.playSpiritChime();
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setStep(0);
    setScores({});
    setIsCompleted(false);
  };

  // Determine highest scoring category
  const bestCategory: ClubCategory = (
    Object.keys(scores).length > 0
      ? (Object.keys(scores) as ClubCategory[]).sort(
          (a, b) => (scores[b] || 0) - (scores[a] || 0)
        )[0]
      : 'Technical'
  );

  const matchedClubs = CLUBS.filter((c) => c.cat === bestCategory);
  const categoryInfo = CATEGORY_INFO[bestCategory];
  const kanjiSeal = CATEGORY_KANJI[bestCategory];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-electric-cyan" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            TECHNIQUE AFFINITY TEST // 4 QUESTIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          What can <span className="text-gradient-cyan">I do</span> here?
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Answer 4 quick scenarios and our cursed sorting algorithm will match you to clubs on campus.
        </p>
      </div>

      {!isCompleted ? (
        /* ==================================================
           ACTIVE QUIZ BOX
           ================================================== */
        <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-void-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-glass-panel">
          {/* Progress Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-electric-cyan">QUESTION {step + 1} OF {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(progressPercent)}% COMPLETE</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-void-950 border border-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cursed-purple to-electric-cyan transition-all duration-500 ease-out shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
            {currentQuestion.q}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.a.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.category)}
                className="w-full text-left p-4 rounded-2xl border border-white/10 bg-void-850/60 hover:bg-void-800 hover:border-cursed-purple/70 transition-all flex items-center justify-between group hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-white/10 bg-void-900 flex items-center justify-center font-mono text-[11px] text-slate-400 group-hover:border-electric-cyan group-hover:text-electric-cyan transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {option.text}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-electric-cyan group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ==================================================
           RESULT VIEW
           ================================================== */
        <div className="space-y-8 animate-page-enter">
          {/* Result Banner */}
          <div className="rounded-3xl border border-cursed-purple/40 bg-gradient-to-br from-void-900/90 via-void-850/80 to-void-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-glass-panel relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: categoryInfo.glowColor }}
            />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              {/* Glowing Kanji Seal */}
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex-shrink-0 flex items-center justify-center text-white font-serif-jp text-6xl sm:text-7xl font-black seal-glow border border-white/20 select-none"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #a78bfa, #4c1d95 70%)',
                }}
              >
                {kanjiSeal}
              </div>

              {/* Result Details */}
              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-void-950/60 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  <Award className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>CURSED AFFINITY PROTOCOL COMPLETE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  <span className="text-gradient-cyan">{bestCategory}</span> Path
                </h3>

                <p className="mt-1 font-mono text-xs text-electric-cyan uppercase tracking-wider">
                  {categoryInfo.pathTitle}
                </p>

                <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
                  {categoryInfo.description}
                </p>

                {/* Retake Button */}
                <div className="mt-5">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all hover:scale-[1.02]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RETAKE TEST</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Clubs Heading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Recommended Clubs for your Domain</span>
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({matchedClubs.length} matches)
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedClubs.map((club) => (
                <ClubCard key={club.name} club={club} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
