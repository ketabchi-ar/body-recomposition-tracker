import React, { useState } from 'react';
import { Dumbbell, CheckCheck, Timer, Sparkles, AlertCircle, Zap, Plus, Search, X } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { DaySelector } from './DaySelector';
import { DayScheduleBanner } from './DayScheduleBanner';
import { ExerciseCard } from './ExerciseCard';
import { exercisesBank, muscleGroups } from '../data/exercisesBank';
import { toPersianDigits } from '../utils/jalali';

export const WorkoutSection = () => {
  const { 
    selectedDayId, 
    daysSchedule, 
    workouts, 
    workoutLogs, 
    activeDateKey, 
    toggleSetComplete, 
    startRestTimer,
    openFocusMode,
    addExerciseToDay,
    setIsAIPlanGenOpen 
  } = useTracker();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');

  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  // Calculate total sets & done sets
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

  const completionPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const markAllSetsDone = () => {
    if (!workout?.exercises) return;
    workout.exercises.forEach(ex => {
      for (let i = 0; i < (ex.setsCount || 3); i++) {
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

  const filteredExercises = exercisesBank.filter(ex => {
    const matchesSearch = ex.nameFa.includes(searchQuery) || ex.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || ex.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

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
              {toPersianDigits(completedSets)} از {toPersianDigits(totalSets)} ست ({toPersianDigits(completionPercentage)}٪)
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
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>افزودن حرکت جدید</span>
          </button>

          <button
            onClick={() => openFocusMode(selectedDayId)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/20 hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>حالت تمرکز باشگاه</span>
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
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} dayId={selectedDayId} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
          <AlertCircle className="w-8 h-8 mx-auto text-slate-500" />
          <p>تمرینی برای این روز تعریف نشده است.</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              افزودن حرکت از بانک حرکات
            </button>
            <button
              onClick={() => setIsAIPlanGenOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
            >
              ساخت خودکار برنامه با هوش مصنوعی
            </button>
          </div>
        </div>
      )}

      {/* Add Exercise Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col">
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  افزودن حرکت به برنامه {currentDay.dayName} ({currentDay.title})
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row gap-2.5 flex-shrink-0 text-xs">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="جستجوی نام حرکت..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white placeholder-slate-500"
                />
              </div>

              <select
                value={selectedMuscle}
                onChange={(e) => setSelectedMuscle(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white"
              >
                <option value="all">همه عضلات</option>
                {muscleGroups.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Exercise List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2.5 text-xs">
              {filteredExercises.map(ex => (
                <div
                  key={ex.id}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between gap-3 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{ex.nameFa}</span>
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                        {ex.targetMuscle}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5 block" dir="ltr">{ex.nameEn}</span>
                  </div>

                  <button
                    onClick={() => {
                      addExerciseToDay(selectedDayId, ex);
                      setIsAddModalOpen(false);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
