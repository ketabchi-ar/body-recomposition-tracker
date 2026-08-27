import React from 'react';
import { 
  HeartPulse, 
  Clock, 
  Play, 
  ShieldCheck, 
  Droplet, 
  Moon, 
  RotateCcw, 
  PlayCircle, 
  PauseCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { ergonomicGuidelines } from '../data/planData';

export const ErgonomicsSection = () => {
  const { ergoTimer, setErgoTimer, openVideoModal } = useTracker();

  const toggleErgoTimer = () => {
    setErgoTimer(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetErgoTimer = () => {
    setErgoTimer({
      isRunning: false,
      phase: 'work',
      duration: 30 * 60,
      timeLeft: 30 * 60
    });
  };

  const switchErgoPhase = () => {
    if (ergoTimer.phase === 'work') {
      setErgoTimer({
        isRunning: true,
        phase: 'break',
        duration: 2 * 60,
        timeLeft: 2 * 60
      });
    } else {
      setErgoTimer({
        isRunning: true,
        phase: 'work',
        duration: 30 * 60,
        timeLeft: 30 * 60
      });
    }
  };

  const minutes = Math.floor(ergoTimer.timeLeft / 60);
  const seconds = ergoTimer.timeLeft % 60;
  const progress = ((ergoTimer.duration - ergoTimer.timeLeft) / ergoTimer.duration) * 100;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner: 30/2 Rule */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/40 p-5 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>پروتکل طلایی سلامت ستون فقرات برای ۱۰ ساعت کار پشت میز</span>
        </div>
        <h2 className="text-xl font-black text-white">
          قانون ۳۰/۲ ارگونومی و حرکات کششی اصلاحی
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {ergonomicGuidelines.description}
        </p>
      </div>

      {/* Interactive 30/2 Pomodoro-style Ergo Timer */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              ergoTimer.phase === 'work'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {ergoTimer.phase === 'work' ? 'فاز تمرکز و کار (۳۰ دقیقه)' : 'فاز ایستادن و کشش (۲ دقیقه)'}
            </span>
            <span className="text-xs text-slate-400">
              {ergoTimer.isRunning ? '⏱ تایمر فعال است' : '⏸ تایمر متوقف است'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white">
            {ergoTimer.phase === 'work'
              ? 'پشت میز کار با حفظ راستای ارگونومیک ستون فقرات'
              : 'از صندلی بلند شوید، آب بنوشید و حرکات کششی زیر را انجام دهید!'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            در پایان ۳۰ دقیقه، به صورت خودکار هشدار صوتی برای ۲ دقیقه کشش و ایستادن پخش خواهد شد.
          </p>
        </div>

        {/* Circular / Large Digital Display */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center min-w-[130px]">
              <span className="font-mono text-3xl sm:text-4xl font-black text-indigo-400 tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <div className="text-[10px] text-slate-500 mt-1">زمان باقیمانده</div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={toggleErgoTimer}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
                  ergoTimer.isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {ergoTimer.isRunning ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                <span>{ergoTimer.isRunning ? 'توقف موقت' : 'شروع تایمر'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={switchErgoPhase}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-medium border border-slate-700 transition"
                  title="تغییر بین ۳۰ دقیقه کار و ۲ دقیقه استراحت"
                >
                  تغییر فاز
                </button>
                <button
                  onClick={resetErgoTimer}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition"
                  title="ریست تایمر"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                ergoTimer.phase === 'work' ? 'bg-indigo-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Ergonomic Stretch Exercises with YouTube Videos */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>حرکات کششی اصلاحی ویژه ۲ دقیقه استراحت بین کار:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {ergonomicGuidelines.deskWorkerStretches.map((stretch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    حرکت {idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {stretch.duration}
                  </span>
                </div>

                <h4 className="text-sm font-black text-white">
                  {stretch.title}
                </h4>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
                  🎯 <strong>اثر درمانی:</strong> {stretch.benefit}
                </p>
              </div>

              <button
                onClick={() => openVideoModal({
                  nameFa: stretch.title,
                  nameEn: "Desk Worker Stretch Guide",
                  youtubeId: stretch.youtubeId,
                  biomechanics: stretch.benefit,
                  calories: 5,
                  proteinRequired: 0
                })}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>مشاهده آموزش در یوتیوب</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Important Nightly Calcium & Hydration Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-300">تنظیم کلسیم و مکمل‌ها در شب</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              قرص کلسیم را حتماً شب‌ها قبل از خواب همراه با ۱ لیوان شیر کم‌چرب میل کنید. کلسیم در شب بالاترین جذب را در بدن دارد و با تنظیم سیستم عصبی به خواب عمیق‌تر کمک می‌کند.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-sky-300">مصرف مداوم مایعات</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              در طول ۱۰ ساعت کار پشت میز، بطری آب را روی میز داشته باشید و حداقل ۲.۵ لیتر آب بنوشید تا از خشکی دیسک‌های بین مهره‌ای و افت سوخت‌وساز جلوگیری شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
