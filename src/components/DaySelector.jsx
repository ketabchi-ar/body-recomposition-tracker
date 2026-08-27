import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useTracker, getTodayScheduleId } from '../context/TrackerContext';

export const DaySelector = () => {
  const { selectedDayId, setSelectedDayId, daysSchedule, workouts, workoutLogs, activeDateKey } = useTracker();
  const todayId = getTodayScheduleId();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-200">
            انتخاب روز هفته و جلسه تمرینی:
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          امروز: <span className="text-emerald-400 font-bold">{daysSchedule.find(d => d.id === todayId)?.dayName}</span>
        </span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {daysSchedule.map((day) => {
          const isSelected = selectedDayId === day.id;
          const isRealToday = todayId === day.id;
          const workout = workouts[day.workoutId];

          // Check how many sets completed for this day
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
          const isFullyDone = totalSets > 0 && completedSets === totalSets;

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`relative p-3 rounded-2xl text-right transition-all flex flex-col justify-between overflow-hidden border ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-850 to-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top status badges */}
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`text-xs font-black ${isSelected ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {day.dayName}
                </span>

                <div className="flex items-center gap-1">
                  {isRealToday && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">
                      امروز
                    </span>
                  )}
                  {isFullyDone && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />
                  )}
                </div>
              </div>

              {/* Day title & Tag */}
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-slate-300 line-clamp-1">
                  {day.title}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{day.startTime}</span>
                </div>
              </div>

              {/* Progress bar at bottom of card */}
              {totalSets > 0 && (
                <div className="mt-2 pt-1 border-t border-slate-800/80 w-full">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                    <span>پیشرفت</span>
                    <span className="font-mono">{completedSets}/{totalSets}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(completedSets / totalSets) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
