import React from 'react';
import { 
  Play, 
  Check, 
  Timer, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  ArrowRightLeft,
  Copy,
  Dumbbell,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits, parsePersianDigits } from '../utils/jalali';

export const ExerciseCard = ({ exercise, index, dayId }) => {
  const { 
    workoutLogs, 
    toggleSetComplete, 
    updateSetValues, 
    copyFromPreviousSet, 
    removeExerciseFromDay,
    updateExerciseSetsCount,
    openVideoModal, 
    openSubstituteModal, 
    startRestTimer, 
    activeDateKey 
  } = useTracker();

  const dayLogs = workoutLogs[activeDateKey] || {};

  let completedCount = 0;
  for (let i = 0; i < exercise.setsCount; i++) {
    if (dayLogs[`${exercise.id}_${i}`]?.done) {
      completedCount++;
    }
  }
  const isFullyDone = completedCount === exercise.setsCount;
  const isTimeBased = exercise.metricType === 'time_seconds';

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      isFullyDone 
        ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700/80 shadow-md'
    }`}>
      {/* Top Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-850 bg-slate-900/40">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          
          {/* Number + Exercise Title */}
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5 ${
              isFullyDone
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {isFullyDone ? <Check className="w-5 h-5 stroke-[3]" /> : toPersianDigits(index + 1)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {exercise.nameFa}
                </h3>
                {exercise.targetMuscle && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {exercise.targetMuscle}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                {exercise.nameEn}
              </p>
            </div>
          </div>

          {/* Action Buttons: Substitute, Video & Delete */}
          <div className="flex items-center gap-2 self-end sm:self-start flex-wrap">
            <button
              onClick={() => openSubstituteModal(exercise, 'exercise')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition"
              title="پیشنهاد حرکات جایگزین هوشمند"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>جایگزین</span>
            </button>

            {exercise.youtubeId && (
              <button
                onClick={() => openVideoModal(exercise)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-bold transition group"
                title="مشاهده ویدیوی آموزشی نحوه اجرای صحیح حرکت"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>آموزش ویدیو</span>
              </button>
            )}

            {dayId && (
              <button
                onClick={() => removeExerciseFromDay(dayId, exercise.id)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition"
                title="حذف حرکت از این روز"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Badges & Set Adjuster */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mt-3 pt-2.5 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>{isTimeBased ? `زمان: ${exercise.setsReps}` : `ست و تکرار: ${toPersianDigits(exercise.setsCount || 3)} ست`}</span>
            </span>

            {exercise.calories > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 text-amber-300 border border-slate-700/60">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{toPersianDigits(exercise.calories)} kcal مصرفی</span>
              </span>
            )}

            {exercise.proteinRequired > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700/60">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{toPersianDigits(exercise.proteinRequired)}g پروتئین</span>
              </span>
            )}
          </div>

          {/* Add / Remove Set Count Controls */}
          {dayId && (
            <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">تعداد ست:</span>
              <button
                onClick={() => updateExerciseSetsCount(dayId, exercise.id, -1)}
                disabled={(exercise.setsCount || 3) <= 1}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-white px-1">{toPersianDigits(exercise.setsCount || 3)}</span>
              <button
                onClick={() => updateExerciseSetsCount(dayId, exercise.id, 1)}
                disabled={(exercise.setsCount || 3) >= 8}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Biomechanics Injury Prevention Guide */}
        {exercise.biomechanics && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-semibold ml-1">نکته بیومکانیک (سلامت دیسک و مفاصل):</strong>
              <span>{exercise.biomechanics}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sets Tracker Interactive Grid */}
      <div className="p-4 sm:p-5 bg-slate-950/40 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
          <span className="font-semibold text-slate-300">ثبت ست‌ها و تکرارها:</span>
          <span>{toPersianDigits(completedCount)} از {toPersianDigits(exercise.setsCount || 3)} ست تکمیل شده</span>
        </div>

        <div className="space-y-2">
          {Array.from({ length: exercise.setsCount || 3 }).map((_, setIdx) => {
            const setKey = `${exercise.id}_${setIdx}`;
            const setData = dayLogs[setKey] || { done: false, weight: '', reps: '', seconds: '' };
            const isDone = setData.done;
            const suggestedRep = exercise.suggestedReps ? exercise.suggestedReps[setIdx] : '';

            return (
              <div
                key={setIdx}
                className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300'
                }`}
              >
                {/* Set index label */}
                <div className="flex items-center gap-2 min-w-[75px]">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    ست {toPersianDigits(setIdx + 1)}
                  </span>
                  {suggestedRep && (
                    <span className="text-[11px] text-slate-400">
                      ({toPersianDigits(suggestedRep)} تکرار)
                    </span>
                  )}
                </div>

                {/* Inputs: Weight & Reps OR Seconds */}
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                  {isTimeBased ? (
                    <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex-1">
                      <input
                        type="text"
                        placeholder="مدت زمان"
                        value={toPersianDigits(setData.seconds || '')}
                        onChange={(e) => updateSetValues(exercise.id, setIdx, 'seconds', e.target.value)}
                        className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none text-center"
                      />
                      <span className="text-[10px] text-slate-400">ثانیه</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 flex-1">
                        <input
                          type="text"
                          placeholder="وزنه"
                          value={toPersianDigits(setData.weight || '')}
                          onChange={(e) => updateSetValues(exercise.id, setIdx, 'weight', e.target.value)}
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none text-center"
                        />
                        <span className="text-[10px] text-slate-400">kg</span>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 flex-1">
                        <input
                          type="text"
                          placeholder="تکرار"
                          value={toPersianDigits(setData.reps || '')}
                          onChange={(e) => updateSetValues(exercise.id, setIdx, 'reps', e.target.value)}
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none text-center"
                        />
                        <span className="text-[10px] text-slate-400">تکرار</span>
                      </div>
                    </>
                  )}

                  {/* Copy from previous set button */}
                  {setIdx > 0 && (
                    <button
                      onClick={() => copyFromPreviousSet(exercise.id, setIdx)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-emerald-400 border border-slate-700 transition"
                      title="کپی از ست قبلی"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Actions: Rest Timer Trigger + Complete Checkbox */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startRestTimer(60, `${exercise.nameFa} - ست ${setIdx + 1}`)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-emerald-400 border border-slate-700 text-xs font-medium transition"
                    title="شروع تایمر استراحت ۶۰ ثانیه‌ای"
                  >
                    <Timer className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">استراحت</span>
                  </button>

                  <button
                    onClick={() => toggleSetComplete(
                      exercise.id, 
                      setIdx, 
                      setData.reps || suggestedRep, 
                      setData.weight,
                      setData.seconds
                    )}
                    className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-md shadow-emerald-500/25'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isDone ? 'stroke-[3]' : 'opacity-40'}`} />
                    <span>{isDone ? 'انجام شد' : 'ثبت ست'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
