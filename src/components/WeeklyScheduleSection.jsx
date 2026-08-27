import React from 'react';
import { CalendarDays, ArrowRight, Sunrise, Clock, Target } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const WeeklyScheduleSection = () => {
  const { setSelectedDayId, setActiveTab, daysSchedule, workouts } = useTracker();

  const handleSelectDay = (dayId) => {
    setSelectedDayId(dayId);
    setActiveTab('workout');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Intro */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
          <CalendarDays className="w-4 h-4" />
          <span>بخش ۱: جدول ساختار و چیدمان هفتگی فعالیت‌ها</span>
        </div>
        <h2 className="text-xl font-black text-white">
          ساختار هوشمند هفتگی هماهنگ با ساعت بیولوژیک و کار
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          برنامه به‌گونه‌ای تنظیم شده که روزهای کاردیو سنگین با روزهای وزنه عصرگاهی تداخل نداشته باشند و ریکاوری بافت عضلانی در بالاترین سطح انجام گیرد.
        </p>
      </div>

      {/* Days Table / Cards */}
      <div className="space-y-3.5">
        {daysSchedule.map((day) => {
          const workout = workouts[day.workoutId];

          return (
            <div
              key={day.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Day Info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-500 text-slate-950">
                    {day.dayName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {day.tag || day.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {day.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  {day.title}
                </h3>

                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>هدف جلسه: {day.target}</span>
                </p>
              </div>

              {/* Meta: Times and Action */}
              <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                    <span>بیداری: <strong className="text-white">{day.wakeUpTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>تمرین: <strong className="text-white">{day.startTime}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectDay(day.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 text-xs font-bold transition shadow-sm"
                >
                  <span>مشاهده حرکات و ثبت ست‌ها</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
