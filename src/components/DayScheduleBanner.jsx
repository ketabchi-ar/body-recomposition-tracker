import React from 'react';
import { Sunrise, Clock, Target, AlertCircle, Sparkles, Dumbbell, Flame } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const DayScheduleBanner = () => {
  const { selectedDayId, daysSchedule, workouts } = useTracker();
  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  // Calculate total calories & protein needed for this workout
  let totalCalories = 0;
  let totalProtein = 0;
  if (workout && workout.exercises) {
    workout.exercises.forEach(e => {
      totalCalories += e.calories || (e.caloriesPerSet ? e.caloriesPerSet * (e.setsCount || 3) : 0);
      totalProtein += e.proteinRequired || 0;
    });
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Day Title & Category */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {currentDay.dayName}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {currentDay.category}
            </span>
            {currentDay.type === 'strength' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                وزنه و هایپرتروفی
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <span>{currentDay.title}</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{currentDay.target}</span>
          </p>
        </div>

        {/* Times & Calorie Meta */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <Sunrise className="w-4 h-4 text-amber-400" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">ساعت بیداری</div>
              <div className="text-xs font-bold text-white">{currentDay.wakeUpTime}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">شروع تمرین</div>
              <div className="text-xs font-bold text-white">{currentDay.startTime}</div>
            </div>
          </div>

          {totalCalories > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
              <Flame className="w-4 h-4 text-rose-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400">سوخت تقریبی جلسه</div>
                <div className="text-xs font-bold text-rose-300">{totalCalories} kcal</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Morning Cardio Specific Note */}
      {currentDay.morningCardioNote && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 ml-1">تذکر مهم تغذیه صبح تمرین:</span>
            <span>{currentDay.morningCardioNote}</span>
          </div>
        </div>
      )}
    </div>
  );
};
