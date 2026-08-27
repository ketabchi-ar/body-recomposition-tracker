import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Dumbbell, 
  Flame, 
  ArrowLeft, 
  Check, 
  X, 
  HeartHandshake,
  Zap,
  Target
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const OnboardingModal = () => {
  const { 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    profile, 
    setProfile, 
    setHasCompletedOnboarding, 
    loadDefaultPreset 
  } = useTracker();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    age: profile.age?.replace(' سال', '') || '30',
    height: profile.height?.replace(' سانتی‌متر', '') || '175',
    weight: profile.weight?.replace(' کیلوگرم', '') || '75',
    fatPercentage: profile.fatPercentage?.replace('٪', '') || '',
    muscleMass: profile.muscleMass?.replace(' کیلوگرم', '') || '',
    deskHours: profile.deskHours || 8,
    goal: profile.goal || 'کاهش چربی و افزایش توده عضلانی (Body Recomposition)'
  });

  const [mode, setMode] = useState('choose'); // 'choose' | 'custom_form'

  if (!isOnboardingOpen) return null;

  const handleSaveCustomProfile = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(formData.weight) || 75;
    const heightNum = parseFloat(formData.height) || 175;
    const ageNum = parseInt(formData.age) || 30;

    // Estimate BMR (Mifflin-St Jeor formula for men)
    const bmrCalc = Math.round(10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5);
    const targetCaloriesCalc = String(Math.round(bmrCalc * 1.4));
    const targetProteinCalc = String(Math.round(weightNum * 2.2));

    const updated = {
      name: formData.name.trim() || 'ورزشکار',
      age: `${formData.age || '30'} سال`,
      height: `${formData.height || '175'} سانتی‌متر`,
      weight: `${formData.weight || '75'} کیلوگرم`,
      fatPercentage: formData.fatPercentage ? `${formData.fatPercentage}٪` : 'نامشخص',
      muscleMass: formData.muscleMass ? `${formData.muscleMass} کیلوگرم` : 'نامشخص',
      bmr: `${bmrCalc} کیلوکالری`,
      dailyTargetCalories: targetCaloriesCalc,
      dailyTargetProtein: targetProteinCalc,
      waterTargetLiters: 2.5,
      deskHours: parseInt(formData.deskHours) || 8,
      goal: formData.goal
    };

    setProfile(updated);
    setHasCompletedOnboarding(true);
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                خوش آمدید! راه‌اندازی پروفایل ورزشی
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                پلتفرم هوشمند پایش تمرینات، تغذیه و سلامت ارگونومی
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'choose' ? (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center max-w-lg mx-auto">
                می‌توانید برنامه کامل و استاندارد پیش‌فرض (Body Recomposition) را بلافاصله اجرا کنید، یا مشخصات و اهداف شخصی خود را وارد نمایید.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Option 1: Default Preset */}
                <button
                  onClick={loadDefaultPreset}
                  className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-850 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all text-right group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                        آماده و کامل
                      </div>
                      <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                      برنامه پیش‌فرض (اردالان کتابچی)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      شامل ۳ جلسه فول‌بادی، کاردیو، دویدن زون ۲، رژیم ۸ وعده‌ای (۲۲۰۰ kcal / ۱۹۲g پروتئین) و نکات ضد آسیب دیسک کمر.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold pt-2 border-t border-slate-800">
                    <span>شروع با این برنامه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </button>

                {/* Option 2: Custom Profile */}
                <button
                  onClick={() => setMode('custom_form')}
                  className="p-5 rounded-2xl bg-slate-850/70 border border-slate-700 hover:border-slate-500 transition-all text-right group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-xs">
                        شخصی‌سازی
                      </div>
                      <User className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                      ثبت مشخصات و اهداف خودم
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      وارد کردن قد، وزن، سن، درصد چربی و محاسبه اختصاصی BMR و کالری هدف روزانه برای شما.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-cyan-400 font-bold pt-2 border-t border-slate-800">
                    <span>ورود اطلاعات</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveCustomProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    نام و نام خانوادگی (اختیاری):
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: علی رضایی"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    سن (سال):
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    قد (سانتی‌متر):
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    وزن فعلی (کیلوگرم):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    درصد چربی بدن (اختیاری):
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: ۲۵"
                    value={formData.fatPercentage}
                    onChange={(e) => setFormData({ ...formData, fatPercentage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ساعت کار پشت میز روزانه:
                  </label>
                  <input
                    type="number"
                    value={formData.deskHours}
                    onChange={(e) => setFormData({ ...formData, deskHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  هدف استراتژیک شما:
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="کاهش چربی و افزایش توده عضلانی (Body Recomposition)">
                    کاهش چربی و افزایش توده عضلانی (Body Recomposition)
                  </option>
                  <option value="چربی‌سوزی و کاهش وزن سریع">چربی‌سوزی و کاهش وزن سریع</option>
                  <option value="افزایش حجم عضلانی خالص (Hypertrophy)">افزایش حجم عضلانی خالص (Hypertrophy)</option>
                  <option value="سلامت مفاصل، اصلاح راستا و تناسب اندام عمومی">سلامت مفاصل، اصلاح راستا و تناسب اندام عمومی</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setMode('choose')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition"
                >
                  بازگشت
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>ذخیره و ورود به برنامه</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
