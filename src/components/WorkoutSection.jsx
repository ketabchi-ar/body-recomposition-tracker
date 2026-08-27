import React from 'react';
import { Dumbbell, CheckCheck, Timer, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { DaySelector } from './DaySelector';
import { DayScheduleBanner } from './DayScheduleBanner';
import { ExerciseCard } from './ExerciseCard';

export const WorkoutSection = () => {
  const { 
    selectedDayId, 
    daysSchedule, 
    workouts, 
    workoutLogs, 
    activeDateKey, 
    toggleSetComplete, 
    startRestTimer,
    openFocusMode 
  } = useTracker();

  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  // Calculate total sets & done sets
  let totalSets = 0;
  let completedSets = 0;

  if (workout && workout.exercises) {
    workout.exercises.forEach(ex => {
      for (let i = 0; i < ex.setsCount; i++) {
        totalSets++;
        if (workoutLogs[activeDateKey]?.[`${ex.id}_${i}`]?.done) {
          completedSets++;
        }
      }
    });
  }

  const completionPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const markAllSetsDone = () => {
    if (!workout?.exercises) return;
    workout.exercises.forEach(ex => {
      for (let i = 0; i < ex.setsCount; i++) {
        const isDone = workoutLogs[activeDateKey]?.[`${ex.id}_${i}`]?.done;
        if (!isDone) {
          toggleSetComplete(
            ex.id, 
            i, 
            ex.suggestedReps ? ex.suggestedReps[i] : '', 
            '', 
            ex.defaultSeconds || ''
          );
        }
      }
    });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Day Selector */}
      <DaySelector />

      {/* Selected Day Banner */}
      <DayScheduleBanner />

      {/* Workout Progress Bar & Actions */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>پیشرفت تمرین امروز:</span>
            </span>
            <span className="text-emerald-400 font-mono text-sm">
              {completedSets} از {totalSets} ست ({completionPercentage}٪)
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
          <button
            onClick={() => openFocusMode(selectedDayId)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/20 hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>شروع تمرین با حالت تمرکز</span>
          </button>

          <button
            onClick={() => startRestTimer(90, 'استراحت بین تمرینات')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-emerald-400 border border-slate-700 text-xs font-medium transition"
          >
            <Timer className="w-4 h-4 text-emerald-400" />
            <span>تایمر استراحت (۹۰s)</span>
          </button>

          {totalSets > 0 && completedSets < totalSets && (
            <button
              onClick={markAllSetsDone}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-xs font-bold transition"
            >
              <CheckCheck className="w-4 h-4" />
              <span>ثبت همه ست‌ها</span>
            </button>
          )}
        </div>
      </div>

      {/* Exercises List */}
      {workout && workout.exercises && workout.exercises.length > 0 ? (
        <div className="space-y-4">
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          <AlertCircle className="w-8 h-8 mx-auto text-slate-500 mb-2" />
          <p>تمرینی برای این روز تعریف نشده است.</p>
        </div>
      )}
    </div>
  );
};
