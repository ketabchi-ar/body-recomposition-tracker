import React, { useState } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  Calendar, 
  Search, 
  Plus, 
  Play, 
  Check, 
  Filter, 
  Sparkles,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { exercisesBank, muscleGroups } from '../data/exercisesBank';
import { foodsBank, foodCategories } from '../data/foodsBank';

export const ProgramBuilder = () => {
  const { 
    openVideoModal, 
    daysSchedule, 
    setDaysSchedule, 
    workouts, 
    setWorkouts 
  } = useTracker();

  const [activeTab, setActiveTab] = useState('exercises'); // 'exercises' | 'foods' | 'days'
  
  // Exercise Search & Filter
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');

  // Food Search & Filter
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('all');

  // Filtered exercises
  const filteredExercises = exercisesBank.filter(ex => {
    const matchesSearch = ex.nameFa.includes(exerciseSearch) || ex.nameEn.toLowerCase().includes(exerciseSearch.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || ex.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  // Filtered foods
  const filteredFoods = foodsBank.filter(f => {
    const matchesSearch = f.nameFa.includes(foodSearch);
    const matchesCat = selectedFoodCategory === 'all' || f.category === selectedFoodCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/70 p-5 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>پلتفرم برنامه‌ساز و بانک داده‌های تخصصی</span>
        </div>
        <h2 className="text-xl font-black text-white">
          بانک جامع حرکات ورزشی، تغذیه و ویرایشگر برنامه
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          جستجو و مشاهده آموزش‌های ویدیویی تمام حرکات استاندارد، ارزش غذایی اقلام و شخصی‌سازی چیدمان جلسات
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'exercises'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>بانک حرکات ورزشی ({exercisesBank.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('foods')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'foods'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>بانک مواد غذایی و مکمل‌ها ({foodsBank.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('days')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'days'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>شخصی‌سازی جلسات هفتگی</span>
        </button>
      </div>

      {/* Tab 1: Exercise Bank */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              <input
                type="text"
                placeholder="جستجوی نام فارسی یا انگلیسی حرکت..."
                value={exerciseSearch}
                onChange={(e) => setExerciseSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setSelectedMuscle('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedMuscle === 'all'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                همه عضلات
              </button>
              {muscleGroups.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMuscle(m.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedMuscle === m.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredExercises.map(ex => (
              <div
                key={ex.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-white">{ex.nameFa}</h4>
                        <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {ex.targetMuscle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">{ex.nameEn}</p>
                    </div>

                    <button
                      onClick={() => openVideoModal(ex)}
                      className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 transition flex-shrink-0"
                      title="مشاهده ویدیو در یوتیوب"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {ex.biomechanics && (
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-850 leading-relaxed">
                      💡 {ex.biomechanics}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>نوع ورودی: <strong className="text-slate-200">{ex.metricType === 'time_seconds' ? 'زمانی (ثانیه)' : 'وزنه + تکرار'}</strong></span>
                  <span className="text-emerald-400 font-bold">{ex.proteinRequired}g پروتئین ریکاوری</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Food Bank */}
      {activeTab === 'foods' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              <input
                type="text"
                placeholder="جستجوی نام ماده غذایی یا مکمل..."
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setSelectedFoodCategory('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedFoodCategory === 'all'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                همه گروه‌ها
              </button>
              {foodCategories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedFoodCategory(c.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedFoodCategory === c.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredFoods.map(food => (
              <div
                key={food.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h4 className="text-sm font-black text-white">{food.nameFa}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    واحد سروینگ: {food.servingSize} {food.unit}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-bold">
                  <span className="text-amber-300">{food.calories} kcal</span>
                  <span className="text-cyan-300">{food.protein}g پروتئین</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Custom Days */}
      {activeTab === 'days' && (
        <div className="space-y-3.5">
          {daysSchedule.map((day, idx) => (
            <div
              key={day.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-500 text-slate-950">
                  {day.dayName}
                </span>
                <span className="text-xs text-slate-400">{day.category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">عنوان برنامه روز:</label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => {
                      const next = [...daysSchedule];
                      next[idx].title = e.target.value;
                      setDaysSchedule(next);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ساعت بیداری:</label>
                  <input
                    type="text"
                    value={day.wakeUpTime}
                    onChange={(e) => {
                      const next = [...daysSchedule];
                      next[idx].wakeUpTime = e.target.value;
                      setDaysSchedule(next);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">شروع تمرین:</label>
                  <input
                    type="text"
                    value={day.startTime}
                    onChange={(e) => {
                      const next = [...daysSchedule];
                      next[idx].startTime = e.target.value;
                      setDaysSchedule(next);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
