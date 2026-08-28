import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  Dumbbell, 
  Flame, 
  Award, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Trash2,
  TrendingUp,
  Activity,
  Droplet
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { getPersianDateFormatted, toPersianDigits } from '../utils/jalali';

export const WorkoutHistorySection = () => {
  const { 
    workoutLogs = {}, 
    mealLogs = {}, 
    waterLogs = {}, 
    workouts = {}, 
    daysSchedule = [], 
    profile = {},
    setWorkoutLogs
  } = useTracker();

  const [expandedDate, setExpandedDate] = useState(null);

  // Extract all logged dates and sort descending
  const dates = Object.keys(workoutLogs || {}).sort().reverse();

  // Calculate Personal Records (PR) across all history
  const personalRecords = {};
  Object.values(workoutLogs || {}).forEach(dayObj => {
    if (dayObj && typeof dayObj === 'object') {
      Object.entries(dayObj).forEach(([setKey, setObj]) => {
        if (setObj?.done && setObj?.weight) {
          const exId = setKey.split('_')[0];
          const weightNum = parseFloat(setObj.weight) || 0;
          if (!personalRecords[exId] || weightNum > personalRecords[exId].maxWeight) {
            personalRecords[exId] = {
              maxWeight: weightNum,
              reps: setObj.reps || 10
            };
          }
        }
      });
    }
  });

  const handleDeleteHistoryDate = (dateKey) => {
    if (!window.confirm(`آیا از پاک کردن سابقه تمرینی تاریخ ${dateKey} اطمینان دارید؟`)) return;
    const nextLogs = { ...workoutLogs };
    delete nextLogs[dateKey];
    setWorkoutLogs(nextLogs);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <History className="w-4 h-4" />
            <span>آرشیو جلسات تمرینی و تاریخچه عملکرد</span>
          </div>
          <h2 className="text-xl font-black text-white">
            سابقه تمرینات گذشته و رکوردهای شخصی ({profile.name || 'ورزشکار'})
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            مشاهده تمام ست‌ها، وزنه‌های جابه‌جاشده و ثبت رکوردهای جدید (PR)
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800 self-start md:self-center">
          <Award className="w-6 h-6 text-amber-400" />
          <div className="text-right">
            <div className="text-[10px] text-slate-400">تعداد جلسات ثبت‌شده</div>
            <div className="text-base font-black text-white">{toPersianDigits(dates.length)} جلسه</div>
          </div>
        </div>
      </div>

      {/* PR / Personal Records Showcase */}
      {Object.keys(personalRecords).length > 0 && (
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>رکوردهای بیشینه ثبت‌شده شما (Personal Records):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.entries(personalRecords).slice(0, 4).map(([exId, pr], i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 truncate">حرکت #{i + 1}</div>
                <div className="text-base font-black text-amber-400 mt-0.5 font-mono">
                  {toPersianDigits(pr.maxWeight)} kg
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{toPersianDigits(pr.reps)} تکرار موفق</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>لیست جلسات گذشته به تفکیک تاریخ:</span>
        </h3>

        {dates.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 space-y-2">
            <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="font-bold text-white text-sm">هنوز هیچ جلسه تمرینی ثبت نشده است.</p>
            <p className="text-xs">با تیک زدن ست‌های تمرین روزانه، سوابق شما به صورت خودکار در این بخش ذخیره می‌شوند.</p>
          </div>
        ) : (
          dates.map((dateKey) => {
            const dayLogs = workoutLogs[dateKey] || {};
            const completedSets = Object.values(dayLogs).filter(s => s?.done);
            const isExpanded = expandedDate === dateKey;

            // Calculate Volume for this day
            let dayVolume = 0;
            completedSets.forEach(s => {
              const w = parseFloat(s.weight) || 0;
              const r = parseFloat(s.reps) || 10;
              dayVolume += w * r;
            });

            const dayMealsCount = Object.values(mealLogs[dateKey] || {}).filter(Boolean).length;
            const dayWaterLiters = ((waterLogs[dateKey] || 0) / 1000).toFixed(1);

            return (
              <div
                key={dateKey}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all shadow-md"
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => setExpandedDate(isExpanded ? null : dateKey)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/60 transition select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm sm:text-base font-mono">
                          {toPersianDigits(dateKey)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {toPersianDigits(completedSets.length)} ست موفق
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>تناژ کل: <strong className="text-amber-300 font-mono">{toPersianDigits(Math.round(dayVolume))} kg</strong></span>
                        <span>وعده‌ها: <strong className="text-cyan-300 font-mono">{toPersianDigits(dayMealsCount)}</strong></span>
                        <span>آب: <strong className="text-sky-300 font-mono">{toPersianDigits(dayWaterLiters)}L</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistoryDate(dateKey);
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                      title="حذف سابقه این روز"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/60 space-y-3 animate-fadeIn">
                    <span className="text-xs text-slate-400 font-bold block pt-3">
                      جزئیات ست‌های اجراشده در این جلسه:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(dayLogs).map(([setKey, setObj], idx) => {
                        if (!setObj?.done) return null;
                        const [exId, setNum] = setKey.split('_');

                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="font-bold text-white">ست {toPersianDigits(parseInt(setNum) + 1)}</span>
                            </div>

                            <div className="flex items-center gap-2 font-mono text-slate-300">
                              {setObj.weight && <span className="text-amber-300">{toPersianDigits(setObj.weight)}kg</span>}
                              {setObj.reps && <span className="text-cyan-300">× {toPersianDigits(setObj.reps)} تکرار</span>}
                              {setObj.seconds && <span className="text-emerald-300">{toPersianDigits(setObj.seconds)} ثانیه</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
