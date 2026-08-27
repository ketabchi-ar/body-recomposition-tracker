import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Wand2, 
  Dumbbell, 
  Utensils, 
  Check, 
  Loader2, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { generateAIPlanWithAI } from '../utils/aiService';
import { exercisesBank } from '../data/exercisesBank';
import { parsePersianDigits, toPersianDigits } from '../utils/jalali';

export const AIPlanGeneratorModal = ({ isOpen, onClose }) => {
  const { 
    profile, 
    setProfile, 
    setDaysSchedule, 
    setWorkouts, 
    setDietMeals, 
    aiConfig 
  } = useTracker();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    gender: 'مرد',
    age: parsePersianDigits(profile.age?.replace(' سال', '')) || '30',
    height: parsePersianDigits(profile.height?.replace(' سانتی‌متر', '')) || '175',
    weight: parsePersianDigits(profile.weight?.replace(' کیلوگرم', '')) || '75',
    fatPercentage: parsePersianDigits(profile.fatPercentage?.replace('٪', '')) || '',
    goal: profile.goal || 'کاهش چربی و افزایش توده عضلانی (Body Recomposition)',
    daysPerWeek: 4,
    equipment: 'باشگاه با تجهیزات کامل',
    deskHours: profile.deskHours || 8
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Local Rule-Based Plan Generator (Fast & Offline)
  const generateLocalAlgorithmPlan = () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const weightNum = parseFloat(parsePersianDigits(formData.weight)) || 75;
      const heightNum = parseFloat(parsePersianDigits(formData.height)) || 175;
      const ageNum = parseInt(parsePersianDigits(formData.age)) || 30;

      // Mifflin-St Jeor Formula
      let bmr = Math.round(10 * weightNum + 6.25 * heightNum - 5 * ageNum + (formData.gender === 'مرد' ? 5 : -161));
      let targetCalories = Math.round(bmr * 1.4);
      let targetProtein = Math.round(weightNum * 2.2);

      if (formData.goal.includes('کاهش')) {
        targetCalories -= 400;
      } else if (formData.goal.includes('حجم')) {
        targetCalories += 350;
        targetProtein = Math.round(weightNum * 2.0);
      }

      // Generate 7 Days
      const days = [
        {
          id: 'saturday',
          dayIndex: 6,
          dayName: 'شنبه',
          title: 'کاردیو و چربی‌سوزی زون ۲',
          type: 'cardio',
          category: 'هوازی و استقامت',
          wakeUpTime: '۰۶:۰۰',
          startTime: '۰۶:۴۵',
          duration: '۳۰ دقیقه',
          target: 'ضربان قلب زون ۲ جهت ارتقای میتوکندری و چربی‌سوزی',
          workoutId: 'plan_day_sat'
        },
        {
          id: 'sunday',
          dayIndex: 0,
          dayName: 'یکشنبه',
          title: 'تمرین قدرتی - جلسه اول (Upper Body / Push & Pull)',
          type: 'strength',
          category: 'بالاتنه قدرتی',
          wakeUpTime: '۰۶:۳۰',
          startTime: '۱۷:۳۰',
          duration: '۵۰ دقیقه',
          target: 'تمرکز روی الگوی پرس سینه، زیربغل لت و سرشانه',
          workoutId: 'plan_day_sun'
        },
        {
          id: 'monday',
          dayIndex: 1,
          dayName: 'دوشنبه',
          title: 'تمرین قدرتی - جلسه دوم (Lower Body & Core)',
          type: 'strength',
          category: 'پایین‌تنه و شکم',
          wakeUpTime: '۰۶:۳۰',
          startTime: '۱۷:۳۰',
          duration: '۵۰ دقیقه',
          target: 'تمرکز روی گابلت اسکوات، ددلیفت RDL و ثبات ستون فقرات',
          workoutId: 'plan_day_mon'
        },
        {
          id: 'tuesday',
          dayIndex: 2,
          dayName: 'سه‌شنبه',
          title: 'استراحت فعال و کشش ارگونومی',
          type: 'recovery',
          category: 'ریکاوری و مفاصل',
          wakeUpTime: '۰۷:۰۰',
          startTime: 'عصر',
          duration: '۳۰ دقیقه',
          target: 'کشش فلکسورهای ران، پیاده‌روی سبک و رهاسازی عضلات',
          workoutId: 'plan_day_tue'
        },
        {
          id: 'wednesday',
          dayIndex: 3,
          dayName: 'چهارشنبه',
          title: 'تمرین قدرتی - جلسه سوم (Full Body Hypertrophy)',
          type: 'strength',
          category: 'فول بادی هایپرتروفی',
          wakeUpTime: '۰۶:۳۰',
          startTime: '۱۷:۳۰',
          duration: '۵۰ دقیقه',
          target: 'پرس بالاسینه، زیربغل قایقی، جلو و پشت بازو',
          workoutId: 'plan_day_wed'
        },
        {
          id: 'thursday',
          dayIndex: 4,
          dayName: 'پنج‌شنبه',
          title: 'کاردیو و تمرین ترکیبی کور',
          type: 'cardio',
          category: 'هوازی و ثبات کور',
          wakeUpTime: '۰۶:۳۰',
          startTime: '۱۷:۳۰',
          duration: '۴۰ دقیقه',
          target: 'پالوف پرس، ددباگ و تمرین اینتروال هوازی',
          workoutId: 'plan_day_thu'
        },
        {
          id: 'friday',
          dayIndex: 5,
          dayName: 'جمعه',
          title: 'شنا و ریکاوری کامل در آب',
          type: 'recovery',
          category: 'ریکاوری در آب',
          wakeUpTime: 'دلخواه',
          startTime: 'صبح یا عصر',
          duration: '۴۵ دقیقه',
          target: 'آب‌درمانی و تخلیه اسید لاکتیک',
          workoutId: 'plan_day_fri'
        }
      ];

      // Workouts map
      const generatedWorkouts = {
        plan_day_sat: {
          id: 'plan_day_sat',
          title: 'کاردیو زون ۲ و چربی‌سوزی',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_cardio_zone2_run') || exercisesBank[0]
          ]
        },
        plan_day_sun: {
          id: 'plan_day_sun',
          title: 'بالاتنه قدرتی و هایپرتروفی',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_chest_db_bench') || exercisesBank[0],
            exercisesBank.find(e => e.id === 'ex_back_lat_pulldown') || exercisesBank[1],
            exercisesBank.find(e => e.id === 'ex_sh_seated_db_press') || exercisesBank[2],
            exercisesBank.find(e => e.id === 'ex_arm_supinating_curl') || exercisesBank[3],
            exercisesBank.find(e => e.id === 'ex_arm_tricep_rope') || exercisesBank[4]
          ]
        },
        plan_day_mon: {
          id: 'plan_day_mon',
          title: 'پایین‌تنه و کور ایمن',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_leg_goblet_squat') || exercisesBank[0],
            exercisesBank.find(e => e.id === 'ex_leg_rdl') || exercisesBank[1],
            exercisesBank.find(e => e.id === 'ex_leg_extension') || exercisesBank[2],
            exercisesBank.find(e => e.id === 'ex_core_pallof_press') || exercisesBank[3],
            exercisesBank.find(e => e.id === 'ex_core_bird_dog') || exercisesBank[4]
          ]
        },
        plan_day_tue: {
          id: 'plan_day_tue',
          title: 'ریکاوری و حرکات اصلاحی',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_core_deadbug') || exercisesBank[0]
          ]
        },
        plan_day_wed: {
          id: 'plan_day_wed',
          title: 'فول بادی هایپرتروفی و عضلات کمکی',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_chest_inc_db') || exercisesBank[0],
            exercisesBank.find(e => e.id === 'ex_back_seated_cable_row') || exercisesBank[1],
            exercisesBank.find(e => e.id === 'ex_sh_lateral_raise') || exercisesBank[2],
            exercisesBank.find(e => e.id === 'ex_arm_preacher_curl') || exercisesBank[3],
            exercisesBank.find(e => e.id === 'ex_core_rkc_plank') || exercisesBank[4]
          ]
        },
        plan_day_thu: {
          id: 'plan_day_thu',
          title: 'کاردیو و عضلات شکم',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_cardio_cycling') || exercisesBank[0],
            exercisesBank.find(e => e.id === 'ex_core_cable_woodchopper') || exercisesBank[1]
          ]
        },
        plan_day_fri: {
          id: 'plan_day_fri',
          title: 'شناوری و استراحت فعال',
          exercises: [
            exercisesBank.find(e => e.id === 'ex_cardio_swim') || exercisesBank[0]
          ]
        }
      };

      // Diet Meals
      const generatedMeals = [
        {
          id: 'm_breakfast',
          time: '۰۷:۰۰ - ۰۷:۳۰',
          title: 'صبحانه کامل و پروتئینی',
          subtitle: 'تخم‌مرغ + نان سنگک + چای سبز',
          items: ['۳ عدد تخم‌مرغ کامل', '۱ کف دست نان سنگک (۳۰g)', '۱ پیاله عدسی پخته', '۱ لیوان چای سبز'],
          calories: 420,
          protein: 30,
          icon: 'Egg',
          category: 'وعده اصلی'
        },
        {
          id: 'm_snack1',
          time: '۱۰:۳۰',
          title: 'میان‌وعده صبح و میوه',
          subtitle: 'میوه تازه + مغزها',
          items: ['۱ عدد سیب متوسط', '۳۰ گرم گردو یا بادام خام', '۱ لیوان بزرگ آب'],
          calories: 200,
          protein: 4,
          icon: 'Apple',
          category: 'میان‌وعده'
        },
        {
          id: 'm_lunch',
          time: '۱۳:۳۰',
          title: 'ناهار پروتئینی و کربوهیدرات کمپلکس',
          subtitle: 'فیله مرغ/گوشت + برنج کته + سالاد',
          items: ['۱۸۰ گرم فیله مرغ یا راسته گوساله پخته', '۸ قاشق برنج کته', '۱ پیاله ماست یونانی', '۱ ظرف سالاد با روغن زیتون'],
          calories: 620,
          protein: 55,
          icon: 'Utensils',
          category: 'وعده اصلی'
        },
        {
          id: 'm_preworkout',
          time: '۱۶:۳۰',
          title: 'پیش از تمرین',
          subtitle: 'انرژی و تمرکز',
          items: ['۱ فنجان قهوه اسپرسو یا قرص کافئین', '۱ عدد موز متوسط', '۴ عدد قرص BCAA'],
          calories: 120,
          protein: 5,
          icon: 'Zap',
          category: 'مکمل'
        },
        {
          id: 'm_postworkout',
          time: '۱۸:۴۵',
          title: 'بلافاصله بعد از تمرین',
          subtitle: 'پروتئین وی و ریکاوری سریع',
          items: ['۱ پیمانه پودر پروتئین وی (۳۰g)', '۵ گرم گلوتامین', '۱ عدد سیب‌زمینی آبپز'],
          calories: 240,
          protein: 26,
          icon: 'Activity',
          category: 'ریکاوری'
        },
        {
          id: 'm_dinner',
          time: '۲۱:۰۰',
          title: 'شام سبک و غنی',
          subtitle: 'ماهی/مرغ + سبزیجات بخارپز',
          items: ['۱۵۰ گرم ماهی قزل‌آلا یا فیله مرغ', '۱ ظرف سالاد اسفناج و خیار', '۱ قاشق چایخوری روغن زیتون'],
          calories: 300,
          protein: 38,
          icon: 'Moon',
          category: 'وعده اصلی'
        },
        {
          id: 'm_bedtime',
          time: '۲۲:۱۵',
          title: 'قبل از خواب',
          subtitle: 'کلسیم و کیفیت خواب',
          items: ['۱ لیوان شیر کم‌چرب ولرم', '۱ عدد قرص کلسیم-منیزیم'],
          calories: 90,
          protein: 7,
          icon: 'Bed',
          category: 'مکمل خواب'
        }
      ];

      // Update State
      setProfile({
        name: formData.name || 'ورزشکار',
        age: `${formData.age} سال`,
        height: `${formData.height} سانتی‌متر`,
        weight: `${formData.weight} کیلوگرم`,
        fatPercentage: formData.fatPercentage ? `${formData.fatPercentage}٪` : 'نامشخص',
        muscleMass: 'متناسب',
        bmr: `${bmr} کیلوکالری`,
        dailyTargetCalories: String(targetCalories),
        dailyTargetProtein: String(targetProtein),
        waterTargetLiters: 2.5,
        deskHours: parseInt(formData.deskHours) || 8,
        goal: formData.goal
      });

      setDaysSchedule(days);
      setWorkouts(generatedWorkouts);
      setDietMeals(generatedMeals);

      setIsLoading(false);
      onClose();
      alert('برنامه تخصصی جدید شما بر اساس الگوریتم‌های ورزشی با موفقیت ساخته و اعمال شد! 🎉');
    } catch (e) {
      setErrorMsg(e.message || 'خطا در ساخت برنامه');
      setIsLoading(false);
    }
  };

  // Cloud AI Plan Generation with Active Provider (Gemini, OpenRouter, etc.)
  const handleGenerateWithCloudAI = async () => {
    if (!aiConfig.apiKey) {
      setErrorMsg('برای ساخت برنامه با هوش مصنوعی ابری، لطفاً ابتدا کلید API خود را در بخش تنظیمات وارد نمایید.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const generated = await generateAIPlanWithAI(formData, aiConfig);
      if (generated.profile) {
        setProfile(prev => ({ ...prev, ...generated.profile, name: formData.name || prev.name }));
      }
      if (generated.daysSchedule) setDaysSchedule(generated.daysSchedule);
      if (generated.workouts) setWorkouts(generated.workouts);
      if (generated.dietMeals) setDietMeals(generated.dietMeals);

      setIsLoading(false);
      onClose();
      alert('برنامه اختصاصی شما توسط هوش مصنوعی با موفقیت ساخته شد! 🤖✨');
    } catch (err) {
      setErrorMsg(err.message || 'خطا در ارتباط با هوش مصنوعی ابری');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                برنامه‌ساز هوشمند ورزشی و تغذیه (AI Plan Wizard)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تولید خودکار برنامه ۷ روزه تمرین و رژیم غذایی بر اساس مشخصات شما
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                placeholder="مثال: علی رضایی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">جنسیت:</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              >
                <option value="مرد">آقا (مرد)</option>
                <option value="زن">خانم (زن)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">سن (سال):</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parsePersianDigits(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">قد (سانتی‌متر):</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parsePersianDigits(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">وزن (کیلوگرم):</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parsePersianDigits(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">تعداد روز تمرین در هفته:</label>
              <select
                value={formData.daysPerWeek}
                onChange={(e) => setFormData({ ...formData, daysPerWeek: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              >
                <option value={3}>۳ روز در هفته</option>
                <option value={4}>۴ روز در هفته (پیشنهادی)</option>
                <option value={5}>۵ روز در هفته</option>
                <option value={6}>۶ روز در هفته</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">هدف اصلی شما:</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
            >
              <option value="کاهش چربی و افزایش توده عضلانی (Body Recomposition)">
                بازسازی ترکیب بدنی (چربی‌سوزی همزمان با عضله‌سازی)
              </option>
              <option value="چربی‌سوزی و کاهش وزن سریع">چربی‌سوزی و لاغری</option>
              <option value="افزایش حجم عضلانی خالص (Hypertrophy)">افزایش حجم عضلانی (Hypertrophy)</option>
              <option value="سلامت مفاصل، اصلاح راستا و تناسب اندام عمومی">سلامت عمومی و مفاصل</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">تجهیزات و محیط تمرین:</label>
            <select
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
            >
              <option value="باشگاه با تجهیزات کامل">باشگاه بدنسازی با تجهیزات کامل</option>
              <option value="دمبل و کش در خانه">تمرین در خانه با دمبل و کش</option>
              <option value="وزن بدن بدون تجهیزات (Calisthenics)">وزن بدن بدون وسیله</option>
            </select>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Fast Algorithm Plan */}
              <button
                type="button"
                onClick={generateLocalAlgorithmPlan}
                disabled={isLoading}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 font-bold transition flex items-center justify-between shadow-md disabled:opacity-50"
              >
                <div className="text-right">
                  <div className="text-xs font-black">ساخت فوری با الگوریتم علمی</div>
                  <div className="text-[10px] text-slate-400">آفلاین و بدون نیاز به کلید API</div>
                </div>
                <Zap className="w-5 h-5 text-amber-400" />
              </button>

              {/* Option 2: Cloud AI Generation */}
              <button
                type="button"
                onClick={handleGenerateWithCloudAI}
                disabled={isLoading}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black transition flex items-center justify-between shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                <div className="text-right">
                  <div className="text-xs font-black">ساخت با هوش مصنوعی (AI)</div>
                  <div className="text-[10px] text-slate-900 font-medium">شخصی‌سازی شده با مدل هوش مصنوعی</div>
                </div>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bot className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
