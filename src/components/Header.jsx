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
  Sparkles,
  Bot,
  Settings,
  Zap,
  Wrench
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { getPersianDateFormatted } from '../utils/jalali';

export const Header = () => {
  const { 
    activeTab, 
    setActiveTab, 
    resetTodayLogs, 
    workoutLogs, 
    mealLogs, 
    waterLogs, 
    activeDateKey,
    profile,
    openFocusMode,
    setAiCoachModal,
    setIsSettingsOpen,
    setIsOnboardingOpen
  } = useTracker();

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Compute daily progress
  const todayWorkoutCount = Object.values(workoutLogs[activeDateKey] || {}).filter(item => item?.done).length;
  const todayMealCount = Object.values(mealLogs[activeDateKey] || {}).filter(Boolean).length;
  const todayWater = waterLogs[activeDateKey] || 0;

  const navItems = [
    { id: 'workout', label: 'برنامه تمرینات', icon: Dumbbell, badge: todayWorkoutCount > 0 ? `${toPersianDigits(todayWorkoutCount)} ست` : null },
    { id: 'diet', label: 'رژیم و مکمل‌ها', icon: Utensils, badge: todayMealCount > 0 ? `${toPersianDigits(todayMealCount)}` : null },
    { id: 'schedule', label: 'ساختار هفتگی', icon: CalendarDays },
    { id: 'builder', label: 'بانک حرکات و غذاها', icon: Wrench },
    { id: 'ergo', label: 'ارگونومی ۳۰/۲', icon: HeartPulse },
    { id: 'stats', label: 'داشبورد پیشرفت', icon: Activity },
  ];

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800/60">
          
          {/* Logo & User Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                    پلتفرم هوشمند تناسب اندام
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950">
                    V5.0 PRO
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>پروفایل:</span>
                  <span className="font-semibold text-slate-200">{profile.name || 'ورزشکار'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={() => setIsHealthSyncOpen(true)}
                className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20"
                title="هاب همگام‌سازی سلامت"
              >
                <HeartPulse className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAiCoachModal({ isOpen: true, initialTab: 'daily' })}
                className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                title="مربی هوش مصنوعی"
              >
                <Bot className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
                title="تنظیمات"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Persian Date, Focus Mode, Health Hub, AI Coach & Settings */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 flex-wrap">
            {/* Persian Date Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-bold">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />
              <span>{getPersianDateFormatted()}</span>
            </div>

            {/* Health Hub Button */}
            <button
              onClick={() => setIsHealthSyncOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-bold transition"
              title="همگام‌سازی با Google Fit، Samsung Health و Strava"
            >
              <HeartPulse className="w-3.5 h-3.5 text-sky-400" />
              <span>هاب سلامت</span>
            </button>

            {/* Focus Mode Button */}
            <button
              onClick={() => openFocusMode()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/15 hover:scale-105"
              title="ورود به حالت تمرکز تمرین در باشگاه"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>حالت تمرکز باشگاه</span>
            </button>

            {/* AI Coach Button */}
            <button
              onClick={() => setAiCoachModal({ isOpen: true, initialTab: 'daily' })}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black transition shadow-lg shadow-emerald-500/15 hover:scale-105"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>مربی هوش مصنوعی</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold transition"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>تنظیمات</span>
            </button>

            {/* Reset Today */}
            <button
              onClick={resetTodayLogs}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/60 text-xs transition"
              title="ریست تیک‌های امروز"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

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
