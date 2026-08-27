import React, { useState } from 'react';
import { Sunrise, Clock, Target, AlertCircle, Sparkles, Dumbbell, Flame, Edit2, Check } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';

export const DayScheduleBanner = () => {
  const { selectedDayId, daysSchedule, workouts, updateDayTime } = useTracker();
  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  const [isEditingTimes, setIsEditingTimes] = useState(false);

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
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-4 sm:p-5 shadow-xl">
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

        {/* Times & Calorie Meta with In-Place Time Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Wake Up Time */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <Sunrise className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">ساعت بیداری</div>
              {isEditingTimes ? (
                <input
                  type="time"
                  value={currentDay.wakeUpTime}
                  onChange={(e) => updateDayTime(currentDay.id, 'wakeUpTime', e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white font-mono mt-0.5"
                />
              ) : (
                <div className="text-xs font-bold text-white font-mono mt-0.5">{toPersianDigits(currentDay.wakeUpTime)}</div>
              )}
            </div>
          </div>

          {/* Workout Start Time */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">شروع تمرین</div>
              {isEditingTimes ? (
                <input
                  type="time"
                  value={currentDay.startTime}
                  onChange={(e) => updateDayTime(currentDay.id, 'startTime', e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white font-mono mt-0.5"
                />
              ) : (
                <div className="text-xs font-bold text-white font-mono mt-0.5">{toPersianDigits(currentDay.startTime)}</div>
              )}
            </div>
          </div>

          {/* Toggle Time Edit Button */}
          <button
            onClick={() => setIsEditingTimes(!isEditingTimes)}
            className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
              isEditingTimes
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
            }`}
            title="ویرایش ساعت شروع تمرین و بیداری"
          >
            {isEditingTimes ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span className="text-[11px] hidden sm:inline">{isEditingTimes ? 'تایید ساعت' : 'تغییر ساعت'}</span>
          </button>

          {totalCalories > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
              <Flame className="w-4 h-4 text-rose-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400">سوخت تقریبی جلسه</div>
                <div className="text-xs font-bold text-rose-300 font-mono">{toPersianDigits(totalCalories)} kcal</div>
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
