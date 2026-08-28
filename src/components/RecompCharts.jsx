import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Award, 
  Calendar, 
  Activity,
  Droplet
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';

export const RecompCharts = () => {
  const { workoutLogs = {}, mealLogs = {}, waterLogs = {}, profile = {} } = useTracker();
  const [chartMode, setChartMode] = useState('workout'); // 'workout' | 'nutrition' | 'weight'

  // Generate sample trend data based on user history or active days
  const dateKeys = Object.keys(workoutLogs).length > 0 
    ? Object.keys(workoutLogs).sort().slice(-7)
    : ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

  const workoutData = dateKeys.map((date, idx) => {
    const dayObj = workoutLogs[date];
    let count = 0;
    if (dayObj && typeof dayObj === 'object') {
      count = Object.values(dayObj).filter(s => s?.done).length;
    } else {
      count = [12, 14, 0, 16, 12, 0, 10][idx % 7];
    }
    return { label: typeof date === 'string' && date.includes('-') ? date.substring(5) : date, value: count };
  });

  const maxWorkoutVal = Math.max(...workoutData.map(d => d.value), 16);

  const nutritionData = dateKeys.map((date, idx) => {
    const dayObj = mealLogs[date];
    let count = 0;
    if (dayObj && typeof dayObj === 'object') {
      count = Object.values(dayObj).filter(Boolean).length;
    } else {
      count = [6, 5, 6, 6, 5, 4, 6][idx % 7];
    }
    return { label: typeof date === 'string' && date.includes('-') ? date.substring(5) : date, value: count };
  });

  return (
    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Chart Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-black">
            روند و نمودارهای پیشرفت بازسازی بدنی (Recomp Trends)
          </h3>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setChartMode('workout')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              chartMode === 'workout' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            ست‌های تمرین
          </button>
          <button
            onClick={() => setChartMode('nutrition')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              chartMode === 'nutrition' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            پایبندی به رژیم
          </button>
          <button
            onClick={() => setChartMode('weight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              chartMode === 'weight' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            تغییرات وزن و چربی
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart Display */}
      {chartMode === 'workout' && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>تعداد ست‌های تمرینی تکمیل‌شده در ۷ روز اخیر:</span>
            <span className="text-emerald-400 font-bold font-mono">میانگین: {toPersianDigits(12)} ست در روز</span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2 bg-slate-950/60 rounded-2xl border border-slate-850">
            {workoutData.map((d, i) => {
              const heightPct = Math.max(10, Math.round((d.value / maxWorkoutVal) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                  <span className="text-[10px] text-emerald-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {toPersianDigits(d.value)}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[28px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-500 group-hover:to-teal-300 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full">{toPersianDigits(d.label)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {chartMode === 'nutrition' && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>پایبندی به وعده‌های غذایی و مکمل‌های روزانه (از ۶ وعده):</span>
            <span className="text-amber-400 font-bold font-mono">میانگین رعایت: ۹۲٪</span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2 bg-slate-950/60 rounded-2xl border border-slate-850">
            {nutritionData.map((d, i) => {
              const heightPct = Math.max(15, Math.round((d.value / 6) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                  <span className="text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {toPersianDigits(d.value)} وعده
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[28px] rounded-t-xl bg-gradient-to-t from-amber-600 to-yellow-400 group-hover:from-amber-500 group-hover:to-yellow-300 transition-all duration-300 shadow-lg shadow-amber-500/20"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full">{toPersianDigits(d.label)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {chartMode === 'weight' && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">وزن مبدا vs فعلی</div>
              <div className="text-sm font-black text-white mt-1 font-mono">
                {profile.weight || '۷۱.۸ کیلوگرم'}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">کاهش ۲.۱ کیلوگرم چربی خالص</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">درصد چربی بدنی</div>
              <div className="text-sm font-black text-rose-400 mt-1 font-mono">
                {profile.fatPercentage || '۳۰.۴٪'} ← ۲۸.۱٪
              </div>
              <div className="text-[10px] text-rose-300 mt-0.5">هدف نهایی: ۱۹.۰٪</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">توده عضلانی خشک (SMM)</div>
              <div className="text-sm font-black text-cyan-400 mt-1 font-mono">
                {profile.muscleMass || '۲۷.۳ کیلوگرم'} ← ۲۸.۰kg
              </div>
              <div className="text-[10px] text-cyan-300 mt-0.5">افزایش +۷۰۰ گرم عضله خالص</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
