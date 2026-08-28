import React, { useRef, useEffect } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Dumbbell, 
  Flame, 
  Award, 
  Calendar, 
  Droplet,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { getPersianDateFormatted, toPersianDigits } from '../utils/jalali';

export const WorkoutSummaryCardModal = ({ isOpen, onClose }) => {
  const { 
    profile, 
    selectedDayId, 
    daysSchedule, 
    workouts, 
    workoutLogs, 
    activeDateKey,
    mealLogs,
    waterLogs
  } = useTracker();

  const canvasRef = useRef(null);

  const currentDay = daysSchedule.find(d => d.id === selectedDayId) || daysSchedule[0];
  const workout = workouts[currentDay?.workoutId];

  // Calculate statistics
  let totalSets = 0;
  let completedSets = 0;
  let totalVolumeKg = 0;
  let totalCalories = 0;

  if (workout && workout.exercises) {
    workout.exercises.forEach(ex => {
      totalCalories += ex.calories || 0;
      for (let i = 0; i < (ex.setsCount || 3); i++) {
        totalSets++;
        const log = workoutLogs[activeDateKey]?.[`${ex.id}_${i}`];
        if (log?.done) {
          completedSets++;
          const weight = parseFloat(log.weight) || 0;
          const reps = parseFloat(log.reps) || 10;
          totalVolumeKg += weight * reps;
        }
      }
    });
  }

  const completionRate = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 100;
  const todayWater = waterLogs[activeDateKey] || 0;
  const completedMeals = Object.values(mealLogs[activeDateKey] || {}).filter(Boolean).length;

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions (1080 x 1920 - 9:16 Instagram Story Ratio)
    canvas.width = 1080;
    canvas.height = 1920;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGrad.addColorStop(0, '#020617');
    bgGrad.addColorStop(0.5, '#091124');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Glow Circles
    const drawGlow = (x, y, radius, color) => {
      const g = ctx.createRadialGradient(x, y, 10, x, y, radius);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    drawGlow(200, 300, 350, 'rgba(16, 185, 129, 0.18)');
    drawGlow(900, 1400, 400, 'rgba(6, 182, 212, 0.15)');

    // 2. Outer Border Frame
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 960, 1800);

    // 3. Header Title & Brand
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 36px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FIT TRACKER PRO • گزارش تمرین روزانه', 540, 160);

    // 4. Date & Athlete Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px Vazirmatn, sans-serif';
    ctx.fillText(profile.name || 'ورزشکار پلتفرم', 540, 260);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '40px Vazirmatn, sans-serif';
    ctx.fillText(getPersianDateFormatted(), 540, 330);

    // 5. Workout Session Big Badge
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(120, 390, 840, 200);
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
    ctx.lineWidth = 3;
    ctx.strokeRect(120, 390, 840, 200);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 36px Vazirmatn, sans-serif';
    ctx.fillText(currentDay.dayName + ' • ' + (currentDay.category || 'تمرین'), 540, 460);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Vazirmatn, sans-serif';
    ctx.fillText(currentDay.title, 540, 540);

    // 6. Big Circular Progress or Metric Box
    const drawStatBox = (x, y, w, h, title, val, unit, color) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '32px Vazirmatn, sans-serif';
      ctx.fillText(title, x + w / 2, y + 60);

      ctx.fillStyle = color;
      ctx.font = '900 64px Vazirmatn, sans-serif';
      ctx.fillText(val, x + w / 2, y + 140);

      ctx.fillStyle = '#64748b';
      ctx.font = '28px Vazirmatn, sans-serif';
      ctx.fillText(unit, x + w / 2, y + 190);
    };

    // Row 1 Stats
    drawStatBox(120, 630, 395, 220, 'ست‌های تکمیل‌شده', `${toPersianDigits(completedSets)} / ${toPersianDigits(totalSets)}`, 'ست ثبت‌شده', '#10b981');
    drawStatBox(565, 630, 395, 220, 'درصد پایبندی جلسه', `${toPersianDigits(completionRate)}٪`, 'پایبندی ۱۰۰٪', '#38bdf8');

    // Row 2 Stats
    drawStatBox(120, 890, 395, 220, 'حجم کل جابه‌جاشده', `${toPersianDigits(Math.round(totalVolumeKg))}`, 'کیلوگرم تناژ تمرین', '#f59e0b');
    drawStatBox(565, 890, 395, 220, 'سوخت کالری تمرین', `${toPersianDigits(totalCalories)}`, 'کیلوکالری مصرفی', '#f43f5e');

    // Row 3 Stats (Nutrition & Water)
    drawStatBox(120, 1150, 395, 220, 'وعده‌های رعایت‌شده', `${toPersianDigits(completedMeals)}`, 'وعده و مکمل سالم', '#a855f7');
    drawStatBox(565, 1150, 395, 220, 'هیدراتاسیون آب', `${toPersianDigits((todayWater / 1000).toFixed(1))}`, 'لیتر آب مصرفی', '#06b6d4');

    // 7. Motivational Quote Box
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(120, 1420, 840, 160);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.strokeRect(120, 1420, 840, 160);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'italic bold 36px Vazirmatn, sans-serif';
    ctx.fillText('«نظم و استمرار روزانه، کلید طلایی بازسازی ترکیب بدنی است.»', 540, 1515);

    // 8. Footer App Branding & QR Note
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 30px Vazirmatn, sans-serif';
    ctx.fillText('ketabchi-ar.github.io/body-recomposition-tracker', 540, 1680);
    ctx.fillText('پلتفرم هوشمند بازسازی ترکیب بدنی و محافظت ستون فقرات', 540, 1730);

  }, [isOpen, selectedDayId, completedSets, totalSets, totalVolumeKg, totalCalories, completedMeals, todayWater]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `FitTracker_Story_${activeDateKey}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `FitTracker_Story_${activeDateKey}.png`, { type: 'image/png' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'گزارش تمرین امروز من',
            text: `گزارش تمرین ${currentDay.title} در پلتفرم فیت‌تراکر 💪🔥`
          });
        } else {
          handleDownload();
        }
      } catch {
        handleDownload();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                کارت گرافیکی گزارش تمرین (استوری و مربی)
              </h3>
              <p className="text-[11px] text-slate-400">
                فرمت استاندارد ۹:۱۶ اینستاگرام و استاتوس پیام‌رسان‌ها
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Canvas */}
        <div className="p-4 overflow-y-auto flex flex-col items-center gap-4">
          <div className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950 aspect-[9/16]">
            <canvas ref={canvasRef} className="w-full h-full object-contain" />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleDownload}
              className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>دانلود عکس (PNG)</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>اشتراک‌گذاری مستقیم</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
