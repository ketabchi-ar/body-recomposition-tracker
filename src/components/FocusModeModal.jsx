import React from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Timer, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Copy, 
  Dumbbell, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Minimize2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const FocusModeModal = () => {
  const { 
    focusMode, 
    setFocusMode, 
    closeFocusMode, 
    daysSchedule, 
    workouts, 
    workoutLogs, 
    toggleSetComplete, 
    updateSetValues, 
    copyFromPreviousSet, 
    openVideoModal, 
    activeDateKey 
  } = useTracker();

  if (!focusMode.isOpen) return null;

  const currentDay = daysSchedule.find(d => d.id === focusMode.currentDayId) || daysSchedule[0];
  const currentWorkout = workouts[currentDay.workoutId];
  const exercises = currentWorkout?.exercises || [];
  const currentIndex = Math.min(focusMode.exerciseIndex, exercises.length - 1);
  const currentExercise = exercises[currentIndex];

  // Stopwatch formatting
  const totalSecs = focusMode.sessionElapsedSeconds;
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  const formattedTime = `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const dayLogs = workoutLogs[activeDateKey] || {};

  // Total completed sets across entire workout
  let totalSets = 0;
  let completedSets = 0;
  exercises.forEach(ex => {
    for (let i = 0; i < ex.setsCount; i++) {
      totalSets++;
      if (dayLogs[`${ex.id}_${i}`]?.done) completedSets++;
    }
  });
  const overallPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const toggleSessionTimer = () => {
    setFocusMode(prev => ({
      ...prev,
      isSessionRunning: !prev.isSessionRunning
    }));
  };

  const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setFocusMode(prev => ({ ...prev, exerciseIndex: prev.exerciseIndex + 1 }));
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setFocusMode(prev => ({ ...prev, exerciseIndex: prev.exerciseIndex - 1 }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col animate-fadeIn overflow-hidden">
      {/* Top Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500 text-slate-950">
                حالت تمرکز باشگاه
              </span>
              <span className="text-xs text-slate-400">{currentDay.dayName}</span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white mt-0.5">
              {currentWorkout?.title || currentDay.title}
            </h2>
          </div>
        </div>

        {/* Stopwatch & Close */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <button
              onClick={toggleSessionTimer}
              className="p-1 rounded-lg text-emerald-400 hover:text-emerald-300 transition"
              title={focusMode.isSessionRunning ? 'توقف موقت تایمر' : 'شروع تایمر'}
            >
              {focusMode.isSessionRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="font-mono text-sm sm:text-base font-black text-emerald-400 tracking-wider">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={closeFocusMode}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition"
            title="خروج از حالت تمرکز"
          >
            <Minimize2 className="w-4 h-4" />
            <span className="hidden sm:inline">خروج از تمرکز</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="w-full bg-slate-900 px-4 sm:px-6 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>پیشرفت کل تمرین:</span>
          <span className="font-mono text-emerald-400 font-bold">{completedSets}/{totalSets} ست ({overallPercent}٪)</span>
        </div>
        <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Main Exercise View Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-4">
        {currentExercise ? (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl">
            
            {/* Exercise Header & Stepper */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-800 text-emerald-400 border border-slate-700">
                    حرکت {currentIndex + 1} از {exercises.length}
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentExercise.targetMuscle}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentExercise.nameFa}
                </h3>
                <p className="text-xs text-slate-400 font-mono" dir="ltr">
                  {currentExercise.nameEn}
                </p>
              </div>

              <button
                onClick={() => openVideoModal(currentExercise)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold transition self-start sm:self-center"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>مشاهده آموزش ویدیو</span>
              </button>
            </div>

            {/* Biomechanics Tip */}
            {currentExercise.biomechanics && (
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-400 font-bold ml-1">نکته فرم صحیح و سلامت دیسک کمر:</strong>
                  <span>{currentExercise.biomechanics}</span>
                </div>
              </div>
            )}

            {/* Sets Checklist with Copy from Prev Set */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>ثبت ست‌های این حرکت ({currentExercise.setsReps}):</span>
                <span className="text-slate-400 text-[11px]">با تیک زدن هر ست، تایمر استراحت فعال می‌شود</span>
              </h4>

              <div className="space-y-2.5">
                {Array.from({ length: currentExercise.setsCount }).map((_, setIdx) => {
                  const setKey = `${currentExercise.id}_${setIdx}`;
                  const setData = dayLogs[setKey] || { done: false, weight: '', reps: '', seconds: '' };
                  const isDone = setData.done;
                  const suggestedRep = currentExercise.suggestedReps ? currentExercise.suggestedReps[setIdx] : '';
                  const isTimeBased = currentExercise.metricType === 'time_seconds';

                  return (
                    <div
                      key={setIdx}
                      className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-emerald-950/25 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                          : 'bg-slate-950/70 border-slate-800'
                      }`}
                    >
                      {/* Set Number */}
                      <div className="flex items-center gap-2 min-w-[90px]">
                        <span className={`text-xs sm:text-sm font-black px-2.5 py-1 rounded-xl ${
                          isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          ست {setIdx + 1}
                        </span>
                        {suggestedRep && (
                          <span className="text-xs text-slate-400 font-mono">
                            ({suggestedRep} تکرار)
                          </span>
                        )}
                      </div>

                      {/* Inputs & Copy from Prev */}
                      <div className="flex items-center gap-2 flex-1 max-w-sm">
                        {isTimeBased ? (
                          <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex-1">
                            <input
                              type="number"
                              placeholder="مدت زمان (ثانیه)"
                              value={setData.seconds || ''}
                              onChange={(e) => updateSetValues(currentExercise.id, setIdx, 'seconds', e.target.value)}
                              className="w-full bg-transparent text-xs text-white text-center font-mono focus:outline-none"
                            />
                            <span className="text-[10px] text-slate-400">ثانیه</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 flex-1">
                              <input
                                type="text"
                                placeholder="وزنه"
                                value={setData.weight || ''}
                                onChange={(e) => updateSetValues(currentExercise.id, setIdx, 'weight', e.target.value)}
                                className="w-full bg-transparent text-xs text-white text-center font-mono focus:outline-none"
                              />
                              <span className="text-[10px] text-slate-400">kg</span>
                            </div>

                            <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 flex-1">
                              <input
                                type="text"
                                placeholder="تکرار"
                                value={setData.reps || ''}
                                onChange={(e) => updateSetValues(currentExercise.id, setIdx, 'reps', e.target.value)}
                                className="w-full bg-transparent text-xs text-white text-center font-mono focus:outline-none"
                              />
                              <span className="text-[10px] text-slate-400">تکرار</span>
                            </div>
                          </>
                        )}

                        {/* Copy from previous set button */}
                        {setIdx > 0 && (
                          <button
                            onClick={() => copyFromPreviousSet(currentExercise.id, setIdx)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700 transition"
                            title="کپی وزنه‌ها و تکرارها از ست قبلی"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Complete Checkbox */}
                      <button
                        onClick={() => toggleSetComplete(
                          currentExercise.id, 
                          setIdx, 
                          setData.reps || suggestedRep, 
                          setData.weight,
                          setData.seconds
                        )}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isDone ? 'stroke-[3]' : 'opacity-30'}`} />
                        <span>{isDone ? 'ست ثبت شد' : 'ثبت ست'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={prevExercise}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>حرکت قبلی</span>
              </button>

              <button
                onClick={nextExercise}
                disabled={currentIndex === exercises.length - 1}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold transition ${
                  currentIndex === exercises.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <span>حرکت بعدی</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">حرکتی یافت نشد.</div>
        )}
      </div>
    </div>
  );
};
