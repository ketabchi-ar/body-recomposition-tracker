import React from 'react';
import { 
  Activity, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Download, 
  Upload,
  RotateCcw
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { userProfile, daysSchedule, workoutsData, dietMealsData } from '../data/planData';

export const ProgressDashboard = () => {
  const { workoutLogs, mealLogs, waterLogs, activeDateKey } = useTracker();

  // Calculate stats
  const totalDaysTracked = Object.keys(workoutLogs).length || 1;
  
  // Total sets completed overall
  let totalSetsCompleted = 0;
  Object.values(workoutLogs).forEach(dayObj => {
    Object.values(dayObj).forEach(setObj => {
      if (setObj?.done) totalSetsCompleted++;
    });
  });

  // Total meals consumed overall
  let totalMealsConsumed = 0;
  Object.values(mealLogs).forEach(dayObj => {
    Object.values(dayObj).forEach(isMealDone => {
      if (isMealDone) totalMealsConsumed++;
    });
  });

  // Total water logged in liters
  let totalWaterLiters = 0;
  Object.values(waterLogs).forEach(amount => {
    totalWaterLiters += (amount || 0) / 1000;
  });

  // Today specific completion
  const todayWorkoutCount = Object.values(workoutLogs[activeDateKey] || {}).filter(i => i?.done).length;
  const todayMealCount = Object.values(mealLogs[activeDateKey] || {}).filter(Boolean).length;
  const todayWater = waterLogs[activeDateKey] || 0;

  // Export JSON backup
  const handleExportData = () => {
    const data = {
      userProfile,
      workoutLogs,
      mealLogs,
      waterLogs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ardalan-fitness-backup-${activeDateKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
          <Activity className="w-4 h-4" />
          <span>داشبورد وضعیت، آمار و پیشرفت برنامه بازسازی بدنی</span>
        </div>
        <h2 className="text-xl font-black text-white">
          گزارش پایبندی به رژیم، مکمل‌ها و تمرینات
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          هدف استراتژیک: کاهش ۱۱ کیلوگرم چربی + افزایش توده عضلانی با تمرینات بدون فشار دیسک کمر
        </p>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">ست‌های ثبت‌شده</div>
            <div className="text-lg sm:text-xl font-black text-white">{totalSetsCompleted} ست</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">وعده‌های رعایت‌شده</div>
            <div className="text-lg sm:text-xl font-black text-white">{totalMealsConsumed} وعده</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">کل آب مصرفی</div>
            <div className="text-lg sm:text-xl font-black text-white">{totalWaterLiters.toFixed(1)} لیتر</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">روزهای ثبت لاگ</div>
            <div className="text-lg sm:text-xl font-black text-white">{totalDaysTracked} روز</div>
          </div>
        </div>
      </div>

      {/* Target Metrics vs Current Status */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>مقایسه شاخص‌های هدف و مبنا (InBody Baseline vs Target):</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">وزن فعلی / هدف کاهش چربی</div>
            <div className="text-base font-black text-white mt-1">۷۱.۸ kg</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">🎯 هدف: -۱۱ kg چربی خالص</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">درصد چربی بدنی</div>
            <div className="text-base font-black text-rose-400 mt-1">۳۰.۴٪</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">🎯 هدف: زیر ۱۸٪ با رژیم پروتئین بالا</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400">توده عضلانی اسکلتی</div>
            <div className="text-base font-black text-cyan-400 mt-1">۲۷.۳ kg</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">🎯 هدف: افزایش با ۳ جلسه فول‌بادی</div>
          </div>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">پشتیبان‌گیری از داده‌ها (Backup & LocalStorage)</h3>
          <p className="text-xs text-slate-400">
            تمام تیک‌ها و سوابق وزنه‌ها به صورت خودکار در مرورگر شما ذخیره می‌شوند. می‌توانید فایل پشتیبان دانلود کنید.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>دانلود فایل پشتیبان JSON</span>
        </button>
      </div>
    </div>
  );
};
