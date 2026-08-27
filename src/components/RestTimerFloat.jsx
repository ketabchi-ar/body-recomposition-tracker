import React from 'react';
import { Timer, RefreshCw, X } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';

export const RestTimerFloat = () => {
  const { restTimer, startRestTimer, stopRestTimer } = useTracker();

  // If not running and timeLeft is at initial duration or 0, do not display
  if (!restTimer.isRunning) {
    return null;
  }

  const minutes = Math.floor(restTimer.timeLeft / 60);
  const seconds = restTimer.timeLeft % 60;
  const progress = ((restTimer.duration - restTimer.timeLeft) / restTimer.duration) * 100;

  return (
    <aside aria-label="تایمر استراحت" className="fixed bottom-5 left-5 z-40 max-w-sm w-[calc(100%-2.5rem)] sm:w-80 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl shadow-2xl p-3.5 text-white animate-slideUp">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Timer className={`w-4 h-4 ${restTimer.isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">
              {restTimer.exerciseName || 'تایمر استراحت بین ست‌ها'}
            </h4>
            <p className="text-[10px] text-slate-400">
              {restTimer.isRunning ? 'در حال استراحت و ریکاوری...' : 'استراحت پایان یافت'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => startRestTimer(restTimer.duration, restTimer.exerciseName)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition text-xs"
            title="شروع مجدد تایمر"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={stopRestTimer}
            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
            title="بستن تایمر"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="font-mono text-base font-black text-emerald-400 tracking-wider">
          {toPersianDigits(String(minutes).padStart(2, '0'))}:{toPersianDigits(String(seconds).padStart(2, '0'))}
        </span>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 text-xs">
        <span className="text-[10px] text-slate-400">تنظیم سریع:</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => startRestTimer(60, restTimer.exerciseName)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${restTimer.duration === 60 ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            ۶۰ ثانیه
          </button>
          <button
            onClick={() => startRestTimer(90, restTimer.exerciseName)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${restTimer.duration === 90 ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            ۹۰ ثانیه
          </button>
          <button
            onClick={() => startRestTimer(120, restTimer.exerciseName)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${restTimer.duration === 120 ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            ۲ دقیقه
          </button>
        </div>
      </div>
    </aside>
  );
};
