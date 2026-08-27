import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  Check, 
  Clock, 
  Flame, 
  Droplets, 
  Pill, 
  AlertTriangle, 
  Moon, 
  Sunrise, 
  Apple, 
  Zap, 
  Activity, 
  Egg,
  CheckCheck,
  Plus,
  RotateCcw,
  MessageSquare,
  ArrowRightLeft,
  Trash2,
  X
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits, parsePersianDigits } from '../utils/jalali';

export const DietSection = () => {
  const { 
    dietMeals, 
    mealLogs, 
    toggleMealComplete, 
    mealNotes, 
    updateMealNote, 
    openSubstituteModal, 
    waterLogs, 
    addWater, 
    resetWater, 
    activeDateKey, 
    profile,
    addMeal,
    removeMeal 
  } = useTracker();

  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [newMealData, setNewMealData] = useState({
    title: '',
    subtitle: '',
    time: '۱۲:۰۰',
    items: '',
    calories: '۳۰۰',
    protein: '۲۵',
    category: 'وعده اصلی',
    icon: 'Utensils'
  });

  const dayMealLogs = mealLogs[activeDateKey] || {};
  const dayMealNotes = mealNotes[activeDateKey] || {};
  const currentWater = waterLogs[activeDateKey] || 0;

  // Calculate consumed calories & protein based on checked meals
  let consumedCalories = 0;
  let consumedProtein = 0;
  let completedMealsCount = 0;

  dietMeals.forEach(meal => {
    if (dayMealLogs[meal.id]) {
      consumedCalories += meal.calories;
      consumedProtein += meal.protein;
      completedMealsCount++;
    }
  });

  const targetCalories = parseInt(parsePersianDigits(profile.dailyTargetCalories)) || 2200;
  const targetProtein = parseInt(parsePersianDigits(profile.dailyTargetProtein)) || 192;
  const targetWater = (profile.waterTargetLiters || 2.5) * 1000; // ml

  const caloriesPercent = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((consumedProtein / targetProtein) * 100));
  const waterPercent = Math.min(100, Math.round((currentWater / targetWater) * 100));

  const markAllMealsDone = () => {
    dietMeals.forEach(meal => {
      if (!dayMealLogs[meal.id]) {
        toggleMealComplete(meal.id);
      }
    });
  };

  const handleCreateMeal = (e) => {
    e.preventDefault();
    if (!newMealData.title.trim()) return;

    addMeal({
      title: newMealData.title.trim(),
      subtitle: newMealData.subtitle.trim(),
      time: newMealData.time,
      items: newMealData.items.split('\n').filter(i => i.trim()),
      calories: parseInt(parsePersianDigits(newMealData.calories)) || 0,
      protein: parseInt(parsePersianDigits(newMealData.protein)) || 0,
      category: newMealData.category,
      icon: newMealData.icon
    });

    setIsAddMealModalOpen(false);
    setNewMealData({
      title: '',
      subtitle: '',
      time: '۱۲:۰۰',
      items: '',
      calories: '۳۰۰',
      protein: '۲۵',
      category: 'وعده اصلی',
      icon: 'Utensils'
    });
  };

  const getMealIcon = (iconName) => {
    switch (iconName) {
      case 'Sunrise': return <Sunrise className="w-5 h-5 text-amber-400" />;
      case 'Egg': return <Egg className="w-5 h-5 text-yellow-400" />;
      case 'Apple': return <Apple className="w-5 h-5 text-red-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Bed': return <Pill className="w-5 h-5 text-purple-400" />;
      default: return <Utensils className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Nutrition & Macro Overview */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {profile.goal}
              </span>
              <span className="text-xs text-slate-400">
                پروتئین هدف: {toPersianDigits(profile.dailyTargetProtein)} گرم
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              برنامه غذایی دقیق، گرمی و زمان‌بندی مکمل‌ها
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center flex-wrap">
            <button
              onClick={() => setIsAddMealModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>افزودن وعده غذایی</span>
            </button>

            {completedMealsCount < dietMeals.length && (
              <button
                onClick={markAllMealsDone}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-xs font-bold transition"
              >
                <CheckCheck className="w-4 h-4" />
                <span>تیک زدن همه وعده‌ها</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Macro Progress Cards: Calories, Protein, Water */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Calories Progress */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                کالری دریافتی
              </span>
              <span className="text-xs font-bold text-amber-300">
                {toPersianDigits(consumedCalories)} / {toPersianDigits(targetCalories)} kcal
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${caloriesPercent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400 text-left font-mono">
              {toPersianDigits(caloriesPercent)}٪ رعایت شده
            </div>
          </div>

          {/* Protein Progress */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                پروتئین خالص
              </span>
              <span className="text-xs font-bold text-cyan-300">
                {toPersianDigits(consumedProtein)} / {toPersianDigits(targetProtein)} g
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${proteinPercent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400 text-left font-mono">
              {toPersianDigits(proteinPercent)}٪ از هدف روزانه
            </div>
          </div>

          {/* Water Progress */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-400" />
                مصرف آب روزانه
              </span>
              <span className="text-xs font-bold text-sky-300">
                {toPersianDigits((currentWater / 1000).toFixed(1))} / {toPersianDigits(profile.waterTargetLiters || 2.5)} لیتر
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${waterPercent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400 text-left font-mono">
              {toPersianDigits(waterPercent)}٪ هیدراتاسیون
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Water Counter Widget */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                ردیاب نوشیدن آب در طول روز و کار پشت میز
              </h3>
              <p className="text-xs text-slate-400">
                هدف: حداقل {toPersianDigits(profile.waterTargetLiters || 2.5)} لیتر جهت جلوگیری از خشکی مفاصل و کندی چربی‌سوزی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => addWater(250)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>+۱ لیوان (۲۵۰ml)</span>
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-600/40 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>+شیکر (۵۰۰ml)</span>
            </button>
            {currentWater > 0 && (
              <button
                onClick={resetWater}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition"
                title="صفر کردن آب امروز"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-400" />
            <span>جدول وعده‌ها و زمان‌بندی مکمل‌ها ({toPersianDigits(dietMeals.length)} وعده روزانه):</span>
          </span>
          <button
            onClick={() => setIsAddMealModalOpen(true)}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>افزودن وعده</span>
          </button>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {dietMeals.map((meal) => {
            const isDone = Boolean(dayMealLogs[meal.id]);
            const noteValue = dayMealNotes[meal.id] || '';

            return (
              <div
                key={meal.id}
                className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Time, Category, Actions & Checkbox */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                        {getMealIcon(meal.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-bold text-slate-300">{meal.time}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-emerald-400 font-medium">{meal.category}</span>
                        </div>
                        <h4 className="text-base font-black text-white mt-0.5">
                          {meal.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openSubstituteModal(meal, 'food')}
                        className="p-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs transition"
                        title="جایگزین‌های این وعده"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => removeMeal(meal.id)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
                        title="حذف وعده"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleMealComplete(meal.id)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isDone ? 'stroke-[3]' : 'opacity-30'}`} />
                        <span>{isDone ? 'مصرف شد' : 'تیک مصرف'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtitle */}
                  {meal.subtitle && (
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      {meal.subtitle}
                    </p>
                  )}

                  {/* Meal Items List */}
                  {meal.items && meal.items.length > 0 && (
                    <ul className="space-y-1.5 my-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-xs text-slate-200">
                      {meal.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Meal Note / Deviation Input */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                      <MessageSquare className="w-3 h-3 text-cyan-400" />
                      <span>یادداشت / گزارش تغییرات این وعده (برای بررسی AI):</span>
                    </div>
                    <input
                      type="text"
                      placeholder="مثال: به جای برنج ۱۰۰ گرم سیب‌زمینی خوردم..."
                      value={noteValue}
                      onChange={(e) => updateMealNote(meal.id, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Bottom Macro Pills */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px]">ارزش غذایی وعده:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                      {toPersianDigits(meal.calories)} kcal
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
                      {toPersianDigits(meal.protein)}g پروتئین
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Meal Modal */}
      {isAddMealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">افزودن وعده غذایی جدید</h3>
              <button onClick={() => setIsAddMealModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeal} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">عنوان وعده:</label>
                <input
                  type="text"
                  placeholder="مثال: میان‌وعده عصر"
                  value={newMealData.title}
                  onChange={(e) => setNewMealData({ ...newMealData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">ساعت مصرف:</label>
                  <input
                    type="text"
                    value={newMealData.time}
                    onChange={(e) => setNewMealData({ ...newMealData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">دسته‌بندی:</label>
                  <select
                    value={newMealData.category}
                    onChange={(e) => setNewMealData({ ...newMealData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="وعده اصلی">وعده اصلی</option>
                    <option value="میان‌وعده">میان‌وعده</option>
                    <option value="مکمل">مکمل</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">اقلام وعده (هر قلم در یک سطر):</label>
                <textarea
                  rows="3"
                  placeholder="مثال:&#10;۱۵۰ گرم فیله مرغ&#10;۶ قاشق برنج"
                  value={newMealData.items}
                  onChange={(e) => setNewMealData({ ...newMealData, items: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">کالری تقریبی (kcal):</label>
                  <input
                    type="text"
                    value={newMealData.calories}
                    onChange={(e) => setNewMealData({ ...newMealData, calories: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">پروتئین (گرم):</label>
                  <input
                    type="text"
                    value={newMealData.protein}
                    onChange={(e) => setNewMealData({ ...newMealData, protein: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition"
              >
                ثبت وعده غذایی
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
