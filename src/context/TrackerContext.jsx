import React, { createContext, useContext, useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import { daysSchedule as initialDays, workoutsData as initialWorkouts, dietMealsData as initialMeals, userProfile as defaultProfile } from '../data/planData';
import { exercisesBank } from '../data/exercisesBank';
import { foodsBank } from '../data/foodsBank';
import { getLocalExerciseSubstitutes, getLocalFoodSubstitutes } from '../utils/aiService';
import { parsePersianDigits } from '../utils/jalali';

const TrackerContext = createContext();

export const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const getTodayScheduleId = () => {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const found = initialDays.find(d => d.dayIndex === dayIndex);
  return found ? found.id : 'sunday';
};

export const TrackerProvider = ({ children }) => {
  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_user_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('fit_tracker_onboarding_done') === 'true';
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAIPlanGenOpen, setIsAIPlanGenOpen] = useState(false);
  const [isHealthSyncOpen, setIsHealthSyncOpen] = useState(false);

  // Selected Day & Active Date
  const [selectedDayId, setSelectedDayId] = useState(getTodayScheduleId);
  const [activeDateKey, setActiveDateKey] = useState(getTodayKey);

  // Custom/Dynamic Plan Data
  const [daysSchedule, setDaysSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_custom_days');
      return saved ? JSON.parse(saved) : initialDays;
    } catch {
      return initialDays;
    }
  });

  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_custom_workouts');
      return saved ? JSON.parse(saved) : initialWorkouts;
    } catch {
      return initialWorkouts;
    }
  });

  const [dietMeals, setDietMeals] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_custom_meals');
      return saved ? JSON.parse(saved) : initialMeals;
    } catch {
      return initialMeals;
    }
  });

  // Equipment Filter State
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  // Workout Logs
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_workout_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Meal Logs
  const [mealLogs, setMealLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_meal_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Meal Notes
  const [mealNotes, setMealNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_meal_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Water Logs (ml)
  const [waterLogs, setWaterLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_water_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toast / Banner Alert
  const [toastMessage, setToastMessage] = useState('');

  // Multi-Provider AI Config State
  const [aiConfig, setAiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_ai_config');
      if (saved) return JSON.parse(saved);
      return {
        provider: 'gemini',
        apiKey: '',
        model: 'gemini-1.5-flash',
        customBaseUrl: ''
      };
    } catch {
      return {
        provider: 'gemini',
        apiKey: '',
        model: 'gemini-1.5-flash',
        customBaseUrl: ''
      };
    }
  });

  // Modals
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    title: '',
    nameEn: '',
    youtubeId: '',
    aparatId: '',
    biomechanics: '',
    calories: 0,
    protein: 0
  });

  const [substituteModal, setSubstituteModal] = useState({
    isOpen: false,
    type: 'exercise',
    item: null,
    substitutes: []
  });

  const [aiCoachModal, setAiCoachModal] = useState({
    isOpen: false,
    initialTab: 'daily'
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGDriveModalOpen, setIsGDriveModalOpen] = useState(false);
  const [isFoodScannerOpen, setIsFoodScannerOpen] = useState(false);
  const [isStoryCardOpen, setIsStoryCardOpen] = useState(false);

  // Rest Timer State
  const [restTimer, setRestTimer] = useState({
    isRunning: false,
    duration: 60,
    timeLeft: 60,
    exerciseName: ''
  });

  // Ergonomics 30/2 Timer State
  const [ergoTimer, setErgoTimer] = useState({
    isRunning: false,
    phase: 'work',
    duration: 30 * 60,
    timeLeft: 30 * 60
  });

  // Focus Mode State
  const [focusMode, setFocusMode] = useState({
    isOpen: false,
    currentDayId: getTodayScheduleId(),
    exerciseIndex: 0,
    sessionElapsedSeconds: 0,
    isSessionRunning: false
  });

  // Active Main Tab
  const [activeTab, setActiveTab] = useState('workout');

  // Request Notification permission on first user interaction
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission();
      } catch {}
    }
  }, []);

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_user_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_onboarding_done', String(hasCompletedOnboarding));
    } catch {}
  }, [hasCompletedOnboarding]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_custom_days', JSON.stringify(daysSchedule));
    } catch {}
  }, [daysSchedule]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_custom_workouts', JSON.stringify(workouts));
    } catch {}
  }, [workouts]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_custom_meals', JSON.stringify(dietMeals));
    } catch {}
  }, [dietMeals]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_workout_logs', JSON.stringify(workoutLogs));
    } catch {}
  }, [workoutLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_meal_logs', JSON.stringify(mealLogs));
    } catch {}
  }, [mealLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_meal_notes', JSON.stringify(mealNotes));
    } catch {}
  }, [mealNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_water_logs', JSON.stringify(waterLogs));
    } catch {}
  }, [waterLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('fit_tracker_ai_config', JSON.stringify(aiConfig));
    } catch {}
  }, [aiConfig]);

  // First-time onboarding trigger
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, [hasCompletedOnboarding]);

  // Rest Timer Interval
  useEffect(() => {
    let interval = null;
    if (restTimer.isRunning && restTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (restTimer.isRunning && restTimer.timeLeft <= 0) {
      try {
        sounds.playTimerAlert();
      } catch {}
      setTimeout(() => {
        setRestTimer(prev => ({ ...prev, isRunning: false }));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [restTimer.isRunning, restTimer.timeLeft]);

  // Safe Celebration (zero canvas-confetti crash)
  const triggerCelebration = (msg) => {
    try {
      sounds.playCompletionChime();
    } catch {}
    if (msg) {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 4000);
    }
  };

  const startRestTimer = (seconds = 60, exerciseName = '') => {
    try {
      sounds.playBeep(520, 'sine', 0.1);
    } catch {}

    setRestTimer({
      isRunning: true,
      duration: seconds,
      timeLeft: seconds,
      exerciseName: exerciseName || 'استراحت بین ست'
    });
  };

  const stopRestTimer = () => {
    setRestTimer(prev => ({ ...prev, isRunning: false, timeLeft: prev.duration }));
  };

  // Safe Pure State Updater for Sets
  const toggleSetComplete = (exerciseId, setIndex, currentReps = '', currentWeight = '', currentSeconds = '') => {
    try {
      sounds.playBeep(700, 'sine', 0.08);
    } catch {}

    const key = `${exerciseId}_${setIndex}`;
    const currentDayLogs = (workoutLogs && workoutLogs[activeDateKey]) ? workoutLogs[activeDateKey] : {};
    const currentSet = currentDayLogs[key] || { done: false, weight: currentWeight, reps: currentReps, seconds: currentSeconds };
    const nextDone = !currentSet.done;

    const newLogs = {
      ...workoutLogs,
      [activeDateKey]: {
        ...currentDayLogs,
        [key]: {
          ...currentSet,
          done: nextDone,
          weight: currentSet.weight || currentWeight,
          reps: currentSet.reps || currentReps,
          seconds: currentSet.seconds || currentSeconds
        }
      }
    };

    setWorkoutLogs(newLogs);

    if (nextDone) {
      setTimeout(() => {
        try {
          const selectedDay = daysSchedule.find(d => d.id === selectedDayId);
          if (selectedDay) {
            const currentWorkout = workouts[selectedDay.workoutId];
            if (currentWorkout?.exercises) {
              let total = 0;
              let done = 0;
              currentWorkout.exercises.forEach(ex => {
                for (let i = 0; i < (ex.setsCount || 3); i++) {
                  total++;
                  if (newLogs[activeDateKey]?.[`${ex.id}_${i}`]?.done) done++;
                }
              });
              if (total > 0 && done === total) {
                triggerCelebration("تمام ست‌های تمرین امروز با موفقیت تکمیل شد! 💪🔥");
              }
            }
          }
        } catch {}
      }, 50);
    }
  };

  const updateSetValues = (exerciseId, setIndex, field, value) => {
    const cleanValue = parsePersianDigits(value);
    const key = `${exerciseId}_${setIndex}`;
    const dayLogs = (workoutLogs && workoutLogs[activeDateKey]) ? workoutLogs[activeDateKey] : {};
    const current = dayLogs[key] || { done: false, weight: '', reps: '', seconds: '' };
    
    setWorkoutLogs({
      ...workoutLogs,
      [activeDateKey]: {
        ...dayLogs,
        [key]: {
          ...current,
          [field]: cleanValue
        }
      }
    });
  };

  const copyFromPreviousSet = (exerciseId, setIndex) => {
    if (setIndex <= 0) return;
    const dayLogs = (workoutLogs && workoutLogs[activeDateKey]) ? workoutLogs[activeDateKey] : {};
    const prevKey = `${exerciseId}_${setIndex - 1}`;
    const prevSet = dayLogs[prevKey];
    if (!prevSet) return;

    try {
      sounds.playBeep(800, 'sine', 0.05);
    } catch {}

    const currentKey = `${exerciseId}_${setIndex}`;
    const current = dayLogs[currentKey] || { done: false, weight: '', reps: '', seconds: '' };
    setWorkoutLogs({
      ...workoutLogs,
      [activeDateKey]: {
        ...dayLogs,
        [currentKey]: {
          ...current,
          weight: prevSet.weight || current.weight,
          reps: prevSet.reps || current.reps,
          seconds: prevSet.seconds || current.seconds
        }
      }
    });
  };

  // Safe Pure State Updater for Meals
  const toggleMealComplete = (mealId) => {
    try {
      sounds.playBeep(850, 'triangle', 0.1);
    } catch {}

    const dayLogs = (mealLogs && mealLogs[activeDateKey]) ? mealLogs[activeDateKey] : {};
    const nextDone = !dayLogs[mealId];
    const newMealLogs = {
      ...mealLogs,
      [activeDateKey]: {
        ...dayLogs,
        [mealId]: nextDone
      }
    };

    setMealLogs(newMealLogs);

    if (nextDone) {
      setTimeout(() => {
        try {
          const completedCount = Object.values(newMealLogs[activeDateKey] || {}).filter(Boolean).length;
          if (completedCount === dietMeals.length) {
            triggerCelebration("تمام وعده‌ها و مکمل‌های روزانه مصرف شدند! 🥗💪");
          }
        } catch {}
      }, 50);
    }
  };

  const updateMealNote = (mealId, note) => {
    setMealNotes({
      ...mealNotes,
      [activeDateKey]: {
        ...((mealNotes && mealNotes[activeDateKey]) || {}),
        [mealId]: note
      }
    });
  };

  const addWater = (amountMl = 250) => {
    try {
      sounds.playBeep(900, 'sine', 0.12);
    } catch {}

    const current = (waterLogs && waterLogs[activeDateKey]) ? waterLogs[activeDateKey] : 0;
    const next = Math.min(5000, current + amountMl);
    setWaterLogs({
      ...waterLogs,
      [activeDateKey]: next
    });

    if (current < 2500 && next >= 2500) {
      setTimeout(() => triggerCelebration("هدف ۲.۵ لیتر آب روزانه تکمیل شد 💧"), 50);
    }
  };

  const resetWater = () => {
    setWaterLogs({
      ...waterLogs,
      [activeDateKey]: 0
    });
  };

  // Quick In-place Day Time Editor (startTime, wakeUpTime)
  const updateDayTime = (dayId, field, value) => {
    setDaysSchedule(daysSchedule.map(d => (d.id === dayId ? { ...d, [field]: value } : d)));
  };

  // In-place Exercise Management
  const addExerciseToDay = (dayId, exercise) => {
    const targetDay = daysSchedule.find(d => d.id === dayId);
    if (!targetDay) return;
    const workoutId = targetDay.workoutId;
    const currentWorkout = workouts[workoutId] || { id: workoutId, title: targetDay.title, exercises: [] };
    const newEx = {
      ...exercise,
      id: `custom_${Date.now()}_${exercise.id || 'ex'}`,
      setsCount: exercise.defaultSets || 3,
      setsReps: exercise.setsReps || `${exercise.defaultSets || 3} × 10`,
      suggestedReps: exercise.suggestedReps || [10, 10, 10]
    };

    setWorkouts({
      ...workouts,
      [workoutId]: {
        ...currentWorkout,
        exercises: [...(currentWorkout.exercises || []), newEx]
      }
    });
    setTimeout(() => triggerCelebration('حرکت با موفقیت اضافه شد! 🏋️'), 50);
  };

  const removeExerciseFromDay = (dayId, exerciseId) => {
    if (!window.confirm('آیا از حذف این حرکت از برنامه مطمئن هستید؟')) return;
    const targetDay = daysSchedule.find(d => d.id === dayId);
    if (!targetDay) return;
    const workoutId = targetDay.workoutId;
    const currentWorkout = workouts[workoutId];
    if (!currentWorkout) return;

    setWorkouts({
      ...workouts,
      [workoutId]: {
        ...currentWorkout,
        exercises: currentWorkout.exercises.filter(e => e.id !== exerciseId)
      }
    });
  };

  const updateExerciseSetsCount = (dayId, exerciseId, delta) => {
    const targetDay = daysSchedule.find(d => d.id === dayId);
    if (!targetDay) return;
    const workoutId = targetDay.workoutId;
    const currentWorkout = workouts[workoutId];
    if (!currentWorkout) return;

    const updated = currentWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const newCount = Math.max(1, Math.min(10, (ex.setsCount || 3) + delta));
        return {
          ...ex,
          setsCount: newCount,
          setsReps: `${newCount} ست`
        };
      }
      return ex;
    });

    setWorkouts({
      ...workouts,
      [workoutId]: {
        ...currentWorkout,
        exercises: updated
      }
    });
  };

  // In-place Meal Management
  const addMeal = (newMeal) => {
    setDietMeals([...dietMeals, { ...newMeal, id: `meal_${Date.now()}` }]);
    setTimeout(() => triggerCelebration('وعده غذایی جدید اضافه شد! 🥗'), 50);
  };

  const removeMeal = (mealId) => {
    if (!window.confirm('آیا از حذف این وعده غذایی مطمئن هستید؟')) return;
    setDietMeals(dietMeals.filter(m => m.id !== mealId));
  };

  const updateMeal = (mealId, field, value) => {
    setDietMeals(dietMeals.map(m => (m.id === mealId ? { ...m, [field]: value } : m)));
  };

  const openVideoModal = (exercise) => {
    setVideoModal({
      isOpen: true,
      title: exercise.nameFa,
      nameEn: exercise.nameEn,
      youtubeId: exercise.youtubeId || '',
      aparatId: exercise.aparatId || '',
      biomechanics: exercise.biomechanics,
      calories: exercise.calories || (exercise.caloriesPerSet ? exercise.caloriesPerSet * (exercise.setsCount || 3) : 0),
      protein: exercise.proteinRequired
    });
  };

  const closeVideoModal = () => {
    setVideoModal(prev => ({ ...prev, isOpen: false }));
  };

  const openSubstituteModal = (item, type = 'exercise') => {
    let substitutes = [];
    if (type === 'exercise') {
      substitutes = getLocalExerciseSubstitutes(item);
    } else {
      substitutes = getLocalFoodSubstitutes(item.title || item.nameFa, item.subtitle || '');
    }
    setSubstituteModal({
      isOpen: true,
      type,
      item,
      substitutes
    });
  };

  const closeSubstituteModal = () => {
    setSubstituteModal(prev => ({ ...prev, isOpen: false }));
  };

  const replaceExerciseInWorkout = (targetExerciseId, newExercise) => {
    const selectedDay = daysSchedule.find(d => d.id === selectedDayId);
    if (!selectedDay) return;
    const workout = workouts[selectedDay.workoutId];
    if (!workout) return;

    const updatedExercises = workout.exercises.map(ex => {
      if (ex.id === targetExerciseId) {
        return {
          ...ex,
          id: newExercise.id,
          nameFa: newExercise.nameFa,
          nameEn: newExercise.nameEn,
          targetMuscle: newExercise.targetMuscle,
          metricType: newExercise.metricType || 'weight_reps',
          biomechanics: newExercise.biomechanics,
          youtubeId: newExercise.youtubeId,
          aparatId: newExercise.aparatId || '',
          suggestedReps: newExercise.suggestedReps || [12, 10, 8, 8],
          defaultSeconds: newExercise.defaultSeconds || 30
        };
      }
      return ex;
    });

    setWorkouts({
      ...workouts,
      [selectedDay.workoutId]: {
        ...workout,
        exercises: updatedExercises
      }
    });
    closeSubstituteModal();
  };

  const openFocusMode = (dayId = selectedDayId) => {
    setFocusMode({
      isOpen: true,
      currentDayId: dayId,
      exerciseIndex: 0,
      sessionElapsedSeconds: 0,
      isSessionRunning: true
    });
  };

  const closeFocusMode = () => {
    setFocusMode(prev => ({ ...prev, isOpen: false, isSessionRunning: false }));
  };

  const resetTodayLogs = () => {
    if (window.confirm("آیا مایلید تمام تیک‌ها و یادداشت‌های روز جاری پاکسازی شوند؟")) {
      const nextW = { ...workoutLogs };
      delete nextW[activeDateKey];
      setWorkoutLogs(nextW);

      const nextM = { ...mealLogs };
      delete nextM[activeDateKey];
      setMealLogs(nextM);

      const nextN = { ...mealNotes };
      delete nextN[activeDateKey];
      setMealNotes(nextN);

      const nextWt = { ...waterLogs };
      delete nextWt[activeDateKey];
      setWaterLogs(nextWt);
    }
  };

  const exportFullBackup = () => {
    const backupData = {
      profile,
      daysSchedule,
      workouts,
      dietMeals,
      workoutLogs,
      mealLogs,
      mealNotes,
      waterLogs,
      aiConfig,
      exportedAt: new Date().toISOString(),
      version: '7.0'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fit-tracker-backup-${activeDateKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFullBackup = (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      if (data.profile) setProfile(data.profile);
      if (data.daysSchedule) setDaysSchedule(data.daysSchedule);
      if (data.workouts) setWorkouts(data.workouts);
      if (data.dietMeals) setDietMeals(data.dietMeals);
      if (data.workoutLogs) setWorkoutLogs(data.workoutLogs);
      if (data.mealLogs) setMealLogs(data.mealLogs);
      if (data.mealNotes) setMealNotes(data.mealNotes);
      if (data.waterLogs) setWaterLogs(data.waterLogs);
      if (data.aiConfig) setAiConfig(data.aiConfig);
      setHasCompletedOnboarding(true);
      setTimeout(() => triggerCelebration("اطلاعات پشتیبان با موفقیت بازگردانی شد! 🎉"), 50);
      return true;
    } catch {
      alert("خطا در بازگردانی فایل پشتیبان. لطفاً از صحت فایل JSON اطمینان حاصل کنید.");
      return false;
    }
  };

  const loadDefaultPreset = () => {
    setProfile(defaultProfile);
    setDaysSchedule(initialDays);
    setWorkouts(initialWorkouts);
    setDietMeals(initialMeals);
    setHasCompletedOnboarding(true);
    setIsOnboardingOpen(false);
    setTimeout(() => triggerCelebration("الگوی استاندارد بارگذاری شد! 🚀"), 50);
  };

  return (
    <TrackerContext.Provider
      value={{
        profile,
        setProfile,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAIPlanGenOpen,
        setIsAIPlanGenOpen,
        isHealthSyncOpen,
        setIsHealthSyncOpen,
        selectedDayId,
        setSelectedDayId,
        activeDateKey,
        setActiveDateKey,
        daysSchedule,
        setDaysSchedule,
        updateDayTime,
        workouts,
        setWorkouts,
        dietMeals,
        setDietMeals,
        selectedEquipment,
        setSelectedEquipment,
        workoutLogs,
        toggleSetComplete,
        updateSetValues,
        copyFromPreviousSet,
        addExerciseToDay,
        removeExerciseFromDay,
        updateExerciseSetsCount,
        addMeal,
        removeMeal,
        updateMeal,
        mealLogs,
        toggleMealComplete,
        mealNotes,
        updateMealNote,
        waterLogs,
        addWater,
        resetWater,
        aiConfig,
        setAiConfig,
        videoModal,
        openVideoModal,
        closeVideoModal,
        substituteModal,
        openSubstituteModal,
        closeSubstituteModal,
        replaceExerciseInWorkout,
        aiCoachModal,
        setAiCoachModal,
        isSettingsOpen,
        setIsSettingsOpen,
        isGDriveModalOpen,
        setIsGDriveModalOpen,
        isFoodScannerOpen,
        setIsFoodScannerOpen,
        isStoryCardOpen,
        setIsStoryCardOpen,
        restTimer,
        startRestTimer,
        stopRestTimer,
        ergoTimer,
        setErgoTimer,
        focusMode,
        setFocusMode,
        openFocusMode,
        closeFocusMode,
        activeTab,
        setActiveTab,
        resetTodayLogs,
        exportFullBackup,
        importFullBackup,
        loadDefaultPreset,
        toastMessage
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};
