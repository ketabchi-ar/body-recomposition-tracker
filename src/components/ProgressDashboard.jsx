import React from 'react';
import { 
  Activity, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  Flame, 
  TrendingUp, 
  Award, 
  Download, 
  Bot,
  Cloud,
  Sparkles
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';
import { RecompCharts } from './RecompCharts';

export const ProgressDashboard = () => {
  const { 
    workoutLogs = {}, 
    mealLogs = {}, 
    waterLogs = {}, 
    profile = {}, 
    exportFullBackup, 
    setAiCoachModal, 
    setIsGDriveModalOpen 
  } = useTracker();

  const totalDaysTracked = Object.keys(workoutLogs || {}).length || 1;
  
  // Total sets completed overall (safe guards)
  let totalSetsCompleted = 0;
  Object.values(workoutLogs || {}).forEach(dayObj => {
    if (dayObj && typeof dayObj === 'object') {
      Object.values(dayObj).forEach(setObj => {
        if (setObj && typeof setObj === 'object' && setObj.done) totalSetsCompleted++;
      });
    }
  });

  // Total meals consumed overall (safe guards)
  let totalMealsConsumed = 0;
  Object.values(mealLogs || {}).forEach(dayObj => {
    if (dayObj && typeof dayObj === 'object') {
      Object.values(dayObj).forEach(isMealDone => {
        if (isMealDone) totalMealsConsumed++;
      });
    }
  });

  // Total water logged in liters
  let totalWaterLiters = 0;
  Object.values(waterLogs || {}).forEach(amount => {
    totalWaterLiters += (Number(amount) || 0) / 1000;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <Activity className="w-4 h-4" />
            <span>داشبورد وضعیت، آمار و پیشرفت برنامه</span>
          </div>
          <h2 className="text-xl font-black text-white">
            گزارش پایبندی به رژیم، مکمل‌ها و تمرینات ({profile.name || 'ورزشکار'})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            هدف: {profile.goal}
          </p>
        </div>

        <button
          onClick={() => setAiCoachModal({ isOpen: true, initialTab: 'daily' })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 hover:scale-105 self-start md:self-center"
        >
          <Bot className="w-4 h-4" />
          <span>تحلیل پیشرفته با هوش مصنوعی</span>
        </button>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">ست‌های ثبت‌شده</div>
            <div className="text-lg sm:text-xl font-black text-white">{toPersianDigits(totalSetsCompleted)} ست</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">وعده‌های رعایت‌شده</div>
            <div className="text-lg sm:text-xl font-black text-white">{toPersianDigits(totalMealsConsumed)} وعده</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">کل آب مصرفی</div>
            <div className="text-lg sm:text-xl font-black text-white">{toPersianDigits(totalWaterLiters.toFixed(1))} لیتر</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">روزهای ثبت لاگ</div>
            <div className="text-lg sm:text-xl font-black text-white">{toPersianDigits(totalDaysTracked)} روز</div>
          </div>
        </div>
      </div>

      {/* Recomposition Progress & Adherence Charts */}
      <RecompCharts />

      {/* Target Metrics vs Current Status */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>مشخصات و اهداف پروفایل:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">وزن فعلی</div>
            <div className="text-base font-black text-white mt-1">{profile.weight}</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">قد: {profile.height}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">درصد چربی بدنی</div>
            <div className="text-base font-black text-rose-400 mt-1">{profile.fatPercentage}</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">توده عضلانی: {profile.muscleMass}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">هدف کالری و پروتئین روزانه</div>
            <div className="text-base font-black text-cyan-400 mt-1">{profile.dailyTargetCalories} kcal</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">پروتئین هدف: {profile.dailyTargetProtein}g</div>
          </div>
        </div>
      </div>

      {/* Cloud & Local Backup Row */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">پشتیبان‌گیری از داده‌ها و همگام‌سازی</h3>
          <p className="text-xs text-slate-400">
            داده‌ها در حافظه مرورگر ذخیره هستند. می‌توانید فایل JSON دانلود کرده یا با Google Drive همگام نمایید.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsGDriveModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-bold transition"
          >
            <Cloud className="w-4 h-4" />
            <span>اتصال به Google Drive</span>
          </button>

          <button
            onClick={exportFullBackup}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>دانلود فایل JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
