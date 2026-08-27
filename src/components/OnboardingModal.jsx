import React, { useState } from 'react';
import { 
  Sparkles, 
  Dumbbell, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Flame, 
  ShieldCheck, 
  Zap,
  Wand2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { parsePersianDigits } from '../utils/jalali';

export const OnboardingModal = () => {
  const { 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    setProfile, 
    setHasCompletedOnboarding, 
    loadDefaultPreset,
    setIsAIPlanGenOpen 
  } = useTracker();

  const [wizardStep, setWizardStep] = useState(1); // 1: Choose mode, 2: Custom Profile form
  const [customStats, setCustomStats] = useState({
    name: '',
    age: '۳۰',
    height: '۱۷۵',
    weight: '۷۵',
    fatPercentage: '',
    muscleMass: '',
    goal: 'کاهش چربی و افزایش توده عضلانی (Body Recomposition)',
    deskHours: 8
  });

  if (!isOnboardingOpen) return null;

  const handleSaveCustomProfile = (e) => {
    e.preventDefault();
    
    const weightNum = parseFloat(parsePersianDigits(customStats.weight)) || 75;
    const heightNum = parseFloat(parsePersianDigits(customStats.height)) || 175;
    const ageNum = parseInt(parsePersianDigits(customStats.age)) || 30;

    // Standard Mifflin-St Jeor calculation
    const calculatedBmr = Math.round(10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5);
    const targetCalories = Math.round(calculatedBmr * 1.35);
    const targetProtein = Math.round(weightNum * 2.2);

    setProfile({
      name: customStats.name || 'ورزشکار',
      age: `${customStats.age} سال`,
      height: `${customStats.height} سانتی‌متر`,
      weight: `${customStats.weight} کیلوگرم`,
      fatPercentage: customStats.fatPercentage ? `${customStats.fatPercentage}٪` : 'نامشخص',
      muscleMass: customStats.muscleMass ? `${customStats.muscleMass} کیلوگرم` : 'متناسب',
      bmr: `${calculatedBmr} کیلوکالری`,
      dailyTargetCalories: String(targetCalories),
      dailyTargetProtein: String(targetProtein),
      waterTargetLiters: 2.5,
      deskHours: customStats.deskHours,
      goal: customStats.goal
    });

    setHasCompletedOnboarding(true);
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Gradient Banner */}
        <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 text-center relative flex-shrink-0">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-emerald-400" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            به پلتفرم هوشمند تناسب اندام خوش آمدید
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-md mx-auto">
            ردیاب هوشمند تمرینات قدرتی، ارگونومی ۳۰/۲، برنامه غذایی دقیق و تحلیلگر هوش مصنوعی
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {wizardStep === 1 ? (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 text-center mb-4">
                نحوه شروع کار با برنامه را انتخاب کنید:
              </p>

              {/* Option 1: AI Plan Generator */}
              <button
                onClick={() => {
                  setIsOnboardingOpen(false);
                  setIsAIPlanGenOpen(true);
                }}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-right transition hover:scale-[1.01] shadow-lg shadow-emerald-500/20 flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm">ساخت برنامه اختصاصی با هوش مصنوعی (AI)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-950 text-emerald-400">
                      پیشنهادی
                    </span>
                  </div>
                  <p className="text-xs text-slate-900 font-medium">
                    تولید خودکار برنامه ۷ روزه تمرین و رژیم بر اساس قد، وزن، سن و هدف شما
                  </p>
                </div>
                <Wand2 className="w-6 h-6 text-slate-950 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              </button>

              {/* Option 2: Default Template Plan */}
              <button
                onClick={loadDefaultPreset}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-right transition hover:bg-slate-850 flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">بارگذاری الگوی استاندارد بازسازی بدنی</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    ۳ جلسه تمرین فول‌بادی، ۳ جلسه کاردیو و شنا، رژیم ۲۲۰۰ کالری
                  </p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              </button>

              {/* Option 3: Custom Profile Form */}
              <button
                onClick={() => setWizardStep(2)}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-right transition flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white">ثبت دستی مشخصات و ساخت پروفایل</span>
                  <p className="text-xs text-slate-400">
                    ورود قد، وزن، سن، درصد چربی و محاسبه BMR اختصاصی
                  </p>
                </div>
                <ArrowLeft className="w-5 h-5 text-slate-400 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveCustomProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    placeholder="مثال: علی رضایی"
                    value={customStats.name}
                    onChange={(e) => setCustomStats({ ...customStats, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">سن (سال):</label>
                  <input
                    type="text"
                    value={customStats.age}
                    onChange={(e) => setCustomStats({ ...customStats, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">قد (سانتی‌متر):</label>
                  <input
                    type="text"
                    value={customStats.height}
                    onChange={(e) => setCustomStats({ ...customStats, height: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">وزن فعلی (کیلوگرم):</label>
                  <input
                    type="text"
                    value={customStats.weight}
                    onChange={(e) => setCustomStats({ ...customStats, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">درصد چربی بدنی (اختیاری):</label>
                  <input
                    type="text"
                    placeholder="مثال: ۲۰"
                    value={customStats.fatPercentage}
                    onChange={(e) => setCustomStats({ ...customStats, fatPercentage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ساعت کار روزانه پشت میز:</label>
                  <input
                    type="number"
                    value={customStats.deskHours}
                    onChange={(e) => setCustomStats({ ...customStats, deskHours: parseInt(e.target.value) || 8 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-center font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">هدف اصلی شما:</label>
                <select
                  value={customStats.goal}
                  onChange={(e) => setCustomStats({ ...customStats, goal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="کاهش چربی و افزایش توده عضلانی (Body Recomposition)">
                    بازسازی ترکیب بدنی (کاهش چربی همزمان با عضله‌سازی)
                  </option>
                  <option value="کاهش وزن و چربی‌سوزی سریع">کاهش وزن و چربی‌سوزی سریع</option>
                  <option value="افزایش حجم عضلانی خالص (Hypertrophy)">افزایش حجم عضلانی خالص (Hypertrophy)</option>
                  <option value="سلامت مفاصل و تناسب اندام عمومی">سلامت عمومی و مفاصل</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  بازگشت
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition shadow-lg shadow-emerald-500/20"
                >
                  محاسبه اهداف و ورود به پلتفرم
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
