import React, { useState } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  CalendarDays, 
  Activity, 
  RotateCcw, 
  HeartPulse, 
  UserCheck, 
  ChevronDown, 
  Flame, 
  Droplet,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { userProfile } from '../data/planData';

export const Header = () => {
  const { 
    activeTab, 
    setActiveTab, 
    resetTodayLogs, 
    workoutLogs, 
    mealLogs, 
    waterLogs, 
    activeDateKey 
  } = useTracker();

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Compute daily progress percentage
  const todayWorkoutCount = Object.values(workoutLogs[activeDateKey] || {}).filter(item => item?.done).length;
  const todayMealCount = Object.values(mealLogs[activeDateKey] || {}).filter(Boolean).length;
  const todayWater = waterLogs[activeDateKey] || 0;
  const waterProgress = Math.min(100, Math.round((todayWater / 2500) * 100));

  const navItems = [
    { id: 'workout', label: 'برنامه تمرینات', icon: Dumbbell, badge: todayWorkoutCount > 0 ? `${todayWorkoutCount} ست` : null },
    { id: 'diet', label: 'رژیم و مکمل‌ها', icon: Utensils, badge: todayMealCount > 0 ? `${todayMealCount}/۸` : null },
    { id: 'schedule', label: 'ساختار هفتگی', icon: CalendarDays },
    { id: 'ergo', label: 'ارگونومی ۳۰/۲', icon: HeartPulse },
    { id: 'stats', label: 'داشبورد پیشرفت', icon: Activity },
  ];

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand + User Info + Quick Actions */}
        <div className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800/60">
          
          {/* Logo & User Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                    ترکر تناسب اندام و بازسازی بدنی
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>برنامه تخصصی:</span>
                  <span className="font-semibold text-slate-200">{userProfile.name}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowProfileDetails(!showProfileDetails)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1"
            >
              <Info className="w-4 h-4 text-emerald-400" />
              <span>مشخصات</span>
            </button>
          </div>

          {/* User Metrics Pill & Action Buttons */}
          <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
            {/* Desktop Metrics preview */}
            <button
              onClick={() => setShowProfileDetails(!showProfileDetails)}
              className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-300 transition"
              title="مشاهده جزئیات شاخص‌های بدنی و اهداف"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <UserCheck className="w-4 h-4" />
                <span>وزن: {userProfile.weight}</span>
              </div>
              <span className="text-slate-600">|</span>
              <span>چربی: {userProfile.fatPercentage}</span>
              <span className="text-slate-600">|</span>
              <span>عضله: {userProfile.muscleMass}</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400 font-medium">هدف: ۲۲۰۰ kcal</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showProfileDetails ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Reset & Date */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800" dir="ltr">
                {activeDateKey}
              </span>
              <button
                onClick={resetTodayLogs}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/30 text-xs transition"
                title="پاکسازی تیک‌های امروز برای شروع دوباره"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ریست امروز</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Profile Info Card */}
        {showProfileDetails && (
          <div className="py-3 px-4 my-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-emerald-500/30 animate-fadeIn text-xs">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                شاخص‌های ترکیب بدنی و اهداف استراتژیک (InBody Profile)
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Body Recomposition
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 text-center">
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">قد و وزن فعلی</div>
                <div className="font-bold text-white mt-0.5">{userProfile.height} / {userProfile.weight}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">درصد چربی بدنی</div>
                <div className="font-bold text-rose-400 mt-0.5">{userProfile.fatPercentage}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">توده عضلانی اسکلتی</div>
                <div className="font-bold text-emerald-400 mt-0.5">{userProfile.muscleMass}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">متابولیسم پایه (BMR)</div>
                <div className="font-bold text-cyan-400 mt-0.5">{userProfile.bmr}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">هدف پروتئین روزانه</div>
                <div className="font-bold text-amber-400 mt-0.5">{userProfile.dailyTargetProtein} گرم</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">مصرف آب روزانه</div>
                <div className="font-bold text-sky-400 mt-0.5">{userProfile.waterTargetLiters} لیتر</div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-slate-300 text-[11px]">
              <span className="text-emerald-300 font-medium">🎯 {userProfile.goal}</span>
              <span className="text-slate-400">ساعت کار پشت میز: ۱۰ ساعت</span>
            </div>
          </div>
        )}

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex items-center gap-1.5 sm:gap-2 py-2.5 overflow-x-auto no-scrollbar" aria-label="بخش‌های اصلی">
          {navItems.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
