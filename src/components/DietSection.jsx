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
  X,
  Search,
  Camera
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { foodsBank } from '../data/foodsBank';
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
    removeMeal,
    setIsFoodScannerOpen
  } = useTracker();

  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  
  // New Meal Builder State with Live Search & Calculator
  const [mealTitle, setMealTitle] = useState('');
  const [mealTime, setMealTime] = useState('13:30');
  const [mealCategory, setMealCategory] = useState('وعده اصلی');
  const [selectedItems, setSelectedItems] = useState([]); // [{ food, amount }]
  const [foodSearchQuery, setFoodSearchQuery] = useState('');

  const dayMealLogs = mealLogs[activeDateKey] || {};
  const dayMealNotes = mealNotes[activeDateKey] || {};
  const currentWater = waterLogs[activeDateKey] || 0;

  // Calculate consumed calories & protein based on checked meals
  let consumedCalories = 0;
  let consumedProtein = 0;
  let completedMealsCount = 0;

  dietMeals.forEach(meal => {
    if (dayMealLogs[meal.id]) {
      consumedCalories += meal.calories || 0;
      consumedProtein += meal.protein || 0;
      completedMealsCount++;
    }
  });

  const targetCalories = parseInt(parsePersianDigits(profile.dailyTargetCalories)) || 2200;
  const targetProtein = parseInt(parsePersianDigits(profile.dailyTargetProtein)) || 165;
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

  // Live Food Search Results
  const searchResults = foodSearchQuery.trim()
    ? foodsBank.filter(f => f.nameFa.includes(foodSearchQuery.trim())).slice(0, 6)
    : [];

  const handleAddItemToMeal = (food) => {
    setSelectedItems(prev => [...prev, { food, amount: food.servingSize || 100 }]);
    setFoodSearchQuery('');
  };

  const handleUpdateItemAmount = (index, amount) => {
    const clean = parseFloat(parsePersianDigits(amount)) || 0;
    setSelectedItems(prev => {
      const next = [...prev];
      next[index].amount = clean;
      return next;
    });
  };

  const handleRemoveItemFromMeal = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate total calories & protein of custom meal being built
  let totalMealCalories = 0;
  let totalMealProtein = 0;
  selectedItems.forEach(({ food, amount }) => {
    const ratio = (amount || 0) / (food.servingSize || 100);
    totalMealCalories += Math.round((food.calories || 0) * ratio);
    totalMealProtein += Math.round((food.protein || 0) * ratio);
  });

  const handleCreateMealSubmit = (e) => {
    e.preventDefault();
    if (!mealTitle.trim() || selectedItems.length === 0) {
      alert("لطفاً عنوان وعده و حداقل یک قلم خوراکی از بانک غذاها اضافه فرمایید.");
      return;
    }

    const itemsText = selectedItems.map(
      ({ food, amount }) => `${toPersianDigits(amount)} ${food.unit} ${food.nameFa}`
    );

    addMeal({
      title: mealTitle.trim(),
      subtitle: selectedItems[0]?.food?.nameFa || '',
      time: mealTime,
      items: itemsText,
      calories: totalMealCalories,
      protein: totalMealProtein,
      category: mealCategory,
      icon: mealCategory === 'مکمل' ? 'Zap' : 'Utensils'
    });

    setIsAddMealModalOpen(false);
    setMealTitle('');
    setSelectedItems([]);
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
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 sm:p-6 shadow-xl">
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
              onClick={() => setIsFoodScannerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 hover:scale-105"
            >
              <Camera className="w-4 h-4" />
              <span>اسکنر هوشمند غذا (عکس و سنتی)</span>
            </button>

            <button
              onClick={() => setIsAddMealModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs transition hover:scale-105"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>افزودن وعده با جستجو</span>
            </button>

            {completedMealsCount < dietMeals.length && (
              <button
                onClick={markAllMealsDone}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-xs font-bold transition"
              >
                <CheckCheck className="w-4 h-4" />
                <span>تیک همه</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Macro Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Calories Progress */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                کالری دریافتی
              </span>
              <span className="text-xs font-bold text-amber-300 font-mono">
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
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                پروتئین خالص
              </span>
              <span className="text-xs font-bold text-cyan-300 font-mono">
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
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-400" />
                مصرف آب روزانه
              </span>
              <span className="text-xs font-bold text-sky-300 font-mono">
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

      {/* Water Counter Widget */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                ردیاب نوشیدن آب در طول روز
              </h3>
              <p className="text-xs text-slate-400">
                هدف: حداقل {toPersianDigits(profile.waterTargetLiters || 2.5)} لیتر جهت هیدراتاسیون عضلات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => addWater(250)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>+۱ لیوان ({toPersianDigits(250)}ml)</span>
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-600/40 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>+شیکر ({toPersianDigits(500)}ml)</span>
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
                  {/* Top Bar */}
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
                        title="جایگزینی هوشمند این وعده"
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

                  {/* Meal Note Input */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                      <MessageSquare className="w-3 h-3 text-cyan-400" />
                      <span>یادداشت یا تغییرات این وعده:</span>
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

                {/* Macro Pills */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px]">ارزش غذایی محاسبه‌شده:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20 font-mono">
                      {toPersianDigits(meal.calories)} kcal
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20 font-mono">
                      {toPersianDigits(meal.protein)}g پروتئین
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Food Bank Live-Search Meal Builder Modal */}
      {isAddMealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">سازنده هوشمند وعده غذایی با بانک داده‌ها</h3>
              </div>
              <button onClick={() => setIsAddMealModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateMealSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان وعده:</label>
                <input
                  type="text"
                  placeholder="مثال: ناهار روزهای تمرین"
                  value={mealTitle}
                  onChange={(e) => setMealTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">ساعت مصرف (Time Picker):</label>
                  <input
                    type="time"
                    value={mealTime}
                    onChange={(e) => setMealTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">دسته‌بندی:</label>
                  <select
                    value={mealCategory}
                    onChange={(e) => setMealCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="وعده اصلی">وعده اصلی</option>
                    <option value="میان‌وعده">میان‌وعده</option>
                    <option value="مکمل">مکمل و ریکاوری</option>
                  </select>
                </div>
              </div>

              {/* Food Bank Live Search */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <label className="block text-slate-200 font-bold">
                  جستجو و انتخاب خوراکی‌ها از بانک داده:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="تایپ نام غذا (مثال: فیله مرغ، برنج، تخم مرغ، جو دوسر...)"
                    value={foodSearchQuery}
                    onChange={(e) => setFoodSearchQuery(e.target.value)}
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500"
                  />
                </div>

                {/* Live Search Popup Items */}
                {searchResults.length > 0 && (
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-750 space-y-1 max-h-48 overflow-y-auto">
                    {searchResults.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleAddItemToMeal(f)}
                        className="w-full p-2 rounded-lg bg-slate-950 hover:bg-emerald-950/40 text-right flex items-center justify-between text-xs transition border border-transparent hover:border-emerald-500/30"
                      >
                        <div>
                          <span className="font-bold text-white">{f.nameFa}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            هر {toPersianDigits(f.servingSize)} {f.unit}: {toPersianDigits(f.calories)} kcal | {toPersianDigits(f.protein)}g پروتئین
                          </span>
                        </div>
                        <Plus className="w-4 h-4 text-emerald-400" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Food Items List with Gram Adjuster */}
                {selectedItems.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-slate-400 text-[11px] block">اقلام انتخاب‌شده برای این وعده:</span>
                    {selectedItems.map(({ food, amount }, idx) => {
                      const ratio = (amount || 0) / (food.servingSize || 100);
                      const cal = Math.round((food.calories || 0) * ratio);
                      const prot = Math.round((food.protein || 0) * ratio);

                      return (
                        <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="flex-1">
                            <span className="font-bold text-white text-xs">{food.nameFa}</span>
                            <div className="text-[10px] text-emerald-400 font-mono">
                              {toPersianDigits(cal)} kcal | {toPersianDigits(prot)}g پروتئین
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={toPersianDigits(amount)}
                              onChange={(e) => handleUpdateItemAmount(idx, e.target.value)}
                              className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white text-center font-mono text-xs"
                            />
                            <span className="text-[10px] text-slate-400">{food.unit}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItemFromMeal(idx)}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-[11px] text-center py-2">
                    هنوز غذایی اضافه نشده است. با جستجو در کادر بالا غذاها را انتخاب کنید.
                  </p>
                )}
              </div>

              {/* Total Calculated Macros Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <span className="font-bold text-white text-xs">مجموع ارزش غذایی کل وعده:</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-amber-300 font-mono text-xs">{toPersianDigits(totalMealCalories)} kcal</span>
                  <span className="font-bold text-cyan-300 font-mono text-xs">{toPersianDigits(totalMealProtein)}g پروتئین</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={selectedItems.length === 0}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition disabled:opacity-40"
              >
                ثبت نهایی وعده غذایی در برنامه
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
