import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Timer, 
  Sparkles, 
  Share2, 
  Flame,
  Dumbbell
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';

export const StickySessionBar = ({ onOpenStoryCard }) => {
  const { 
    activeTab, 
    selectedDayId, 
    daysSchedule, 
    workouts, 
    workoutLogs, 
    activeDateKey, 
    openFocusMode,
    restTimer,
    startRestTimer
  } = useTracker();

  if (activeTab !== 'workout') return null;

  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  let totalSets = 0;
  let completedSets = 0;

  if (workout && workout.exercises) {
    workout.exercises.forEach(ex => {
      for (let i = 0; i < (ex.setsCount || 3); i++) {
        totalSets++;
        if (workoutLogs[activeDateKey]?.[`${ex.id}_${i}`]?.done) {
          completedSets++;
        }
      }
    });
  }

  if (totalSets === 0) return null;
  const pct = Math.round((completedSets / totalSets) * 100);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/80 p-3 px-4 sm:px-8 shadow-2xl transition-transform animate-slideUp">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Progress & Stats */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-white flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-emerald-400" />
              <span>پیشرفت تمرین امروز:</span>
              <span className="text-emerald-400 font-mono">
                {toPersianDigits(completedSets)} از {toPersianDigits(totalSets)} ست ({toPersianDigits(pct)}٪)
              </span>
            </span>

            {completedSets === totalSets && totalSets > 0 && (
              <span className="text-[11px] text-emerald-400 font-black flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>جلسه کامل شد! 🔥</span>
              </span>
            )}
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              style={{ width: `${pct}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 rounded-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quick Rest Timer Toggle */}
          <button
            onClick={() => startRestTimer(60, 'استراحت سریع')}
            className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
            title="استراحت ۶۰ ثانیه‌ای"
          >
            <Timer className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">تایمر ۶۰s</span>
          </button>

          {/* Story Card Share */}
          <button
            onClick={onOpenStoryCard}
            className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition"
            title="تولید کارت استوری اینستاگرام و مربی"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">کارت استوری</span>
          </button>

          {/* Focus Mode Launch */}
          <button
            onClick={() => openFocusMode(selectedDayId)}
            className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 hover:scale-105 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>حالت تمرین زنده</span>
          </button>
        </div>
      </div>
    </div>
  );
};
