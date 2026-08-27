import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { daysSchedule as initialDays, workoutsData as initialWorkouts, dietMealsData as initialMeals, userProfile as defaultProfile } from '../data/planData';
import { exercisesBank } from '../data/exercisesBank';
import { foodsBank } from '../data/foodsBank';
import { getLocalExerciseSubstitutes, getLocalFoodSubstitutes } from '../utils/aiService';
import { googleDrive } from '../utils/googleDrive';

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

  // Workout Logs: { [dateKey]: { [exerciseId_setIdx]: { done: boolean, weight: string, reps: string, seconds: string } } }
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_workout_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Meal Logs: { [dateKey]: { [mealId]: boolean } }
  const [mealLogs, setMealLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_meal_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Meal Notes/Deviations: { [dateKey]: { [mealId]: string } }
  const [mealNotes, setMealNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_meal_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Water Logs (ml): { [dateKey]: number }
  const [waterLogs, setWaterLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_water_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Gemini API Key
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('fit_tracker_gemini_api_key') || '';
  });

  // Modals
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    title: '',
    nameEn: '',
    youtubeId: '',
    biomechanics: '',
    calories: 0,
    protein: 0
  });

  const [substituteModal, setSubstituteModal] = useState({
    isOpen: false,
    type: 'exercise', // 'exercise' | 'food'
    item: null,
    substitutes: []
  });

  const [aiCoachModal, setAiCoachModal] = useState({
    isOpen: false,
    initialTab: 'daily' // 'daily' | 'weekly' | 'chat'
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGDriveModalOpen, setIsGDriveModalOpen] = useState(false);

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

  // Active Main Tab: 'workout' | 'diet' | 'schedule' | 'builder' | 'ergo' | 'stats'
  const [activeTab, setActiveTab] = useState('workout');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('fit_tracker_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_onboarding_done', String(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_custom_days', JSON.stringify(daysSchedule));
  }, [daysSchedule]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_custom_workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_custom_meals', JSON.stringify(dietMeals));
  }, [dietMeals]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_workout_logs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_meal_logs', JSON.stringify(mealLogs));
  }, [mealLogs]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_meal_notes', JSON.stringify(mealNotes));
  }, [mealNotes]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_water_logs', JSON.stringify(waterLogs));
  }, [waterLogs]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_gemini_api_key', geminiApiKey);
  }, [geminiApiKey]);

  // First-time onboarding trigger
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, [hasCompletedOnboarding]);

  // Rest Timer Interval with auto-dismiss
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
      sounds.playTimerAlert();
      // Auto dismiss after 2 seconds
      setTimeout(() => {
        setRestTimer(prev => ({ ...prev, isRunning: false }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [restTimer.isRunning, restTimer.timeLeft]);

  // Focus Mode Stopwatch
  useEffect(() => {
    let interval = null;
    if (focusMode.isOpen && focusMode.isSessionRunning) {
      interval = setInterval(() => {
        setFocusMode(prev => ({
          ...prev,
          sessionElapsedSeconds: prev.sessionElapsedSeconds + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [focusMode.isOpen, focusMode.isSessionRunning]);

  // Actions
  const toggleSetComplete = (exerciseId, setIndex, currentReps = '', currentWeight = '', currentSeconds = '') => {
    sounds.playBeep(700, 'sine', 0.08);
    setWorkoutLogs(prev => {
      const dayLogs = prev[activeDateKey] || {};
      const key = `${exerciseId}_${setIndex}`;
      const current = dayLogs[key] || { done: false, weight: currentWeight, reps: currentReps, seconds: currentSeconds };
      const nextDone = !current.done;

      const updated = {
        ...prev,
        [activeDateKey]: {
          ...dayLogs,
          [key]: {
            ...current,
            done: nextDone,
            weight: current.weight || currentWeight,
            reps: current.reps || currentReps,
            seconds: current.seconds || currentSeconds
          }
        }
      };

      if (nextDone) {
        checkIfAllDoneAndCelebrate(updated);
        // If in focus mode, auto trigger rest timer
        if (focusMode.isOpen) {
          startRestTimer(60, 'استراحت بین ست‌ها');
        }
      }

      return updated;
    });
  };

  const updateSetValues = (exerciseId, setIndex, field, value) => {
    setWorkoutLogs(prev => {
      const dayLogs = prev[activeDateKey] || {};
      const key = `${exerciseId}_${setIndex}`;
      const current = dayLogs[key] || { done: false, weight: '', reps: '', seconds: '' };
      return {
        ...prev,
        [activeDateKey]: {
          ...dayLogs,
          [key]: {
            ...current,
            [field]: value
          }
        }
      };
    });
  };

  // Copy values from previous set (e.g. Set 2 copies from Set 1)
  const copyFromPreviousSet = (exerciseId, setIndex) => {
    if (setIndex <= 0) return;
    const dayLogs = workoutLogs[activeDateKey] || {};
    const prevKey = `${exerciseId}_${setIndex - 1}`;
    const prevSet = dayLogs[prevKey];
    if (!prevSet) return;

    sounds.playBeep(800, 'sine', 0.05);
    setWorkoutLogs(prev => {
      const currentLogs = prev[activeDateKey] || {};
      const currentKey = `${exerciseId}_${setIndex}`;
      const current = currentLogs[currentKey] || { done: false, weight: '', reps: '', seconds: '' };
      return {
        ...prev,
        [activeDateKey]: {
          ...currentLogs,
          [currentKey]: {
            ...current,
            weight: prevSet.weight || current.weight,
            reps: prevSet.reps || current.reps,
            seconds: prevSet.seconds || current.seconds
          }
        }
      };
    });
  };

  const toggleMealComplete = (mealId) => {
    sounds.playBeep(850, 'triangle', 0.1);
    setMealLogs(prev => {
      const dayLogs = prev[activeDateKey] || {};
      const next = !dayLogs[mealId];
      const updated = {
        ...prev,
        [activeDateKey]: {
          ...dayLogs,
          [mealId]: next
        }
      };

      if (next) {
        const completedCount = Object.values(updated[activeDateKey] || {}).filter(Boolean).length;
        if (completedCount === dietMeals.length) {
          triggerCelebration("تمام وعده‌ها و مکمل‌های روزانه مصرف شدند! 🥗💪");
        }
      }
      return updated;
    });
  };

  const updateMealNote = (mealId, note) => {
    setMealNotes(prev => ({
      ...prev,
      [activeDateKey]: {
        ...(prev[activeDateKey] || {}),
        [mealId]: note
      }
    }));
  };

  const addWater = (amountMl = 250) => {
    sounds.playBeep(900, 'sine', 0.12);
    setWaterLogs(prev => {
      const current = prev[activeDateKey] || 0;
      const next = Math.min(5000, current + amountMl);
      if (current < 2500 && next >= 2500) {
        triggerCelebration("هدف ۲.۵ لیتر آب روزانه تکمیل شد 💧");
      }
      return {
        ...prev,
        [activeDateKey]: next
      };
    });
  };

  const resetWater = () => {
    setWaterLogs(prev => ({
      ...prev,
      [activeDateKey]: 0
    }));
  };

  const triggerCelebration = (msg) => {
    sounds.playCompletionChime();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const checkIfAllDoneAndCelebrate = (logs) => {
    const selectedDay = daysSchedule.find(d => d.id === selectedDayId);
    if (!selectedDay) return;
    const workout = workouts[selectedDay.workoutId];
    if (!workout || !workout.exercises) return;

    const dayLogs = logs[activeDateKey] || {};
    let totalSets = 0;
    let completedSets = 0;

    workout.exercises.forEach(ex => {
      for (let i = 0; i < ex.setsCount; i++) {
        totalSets++;
        if (dayLogs[`${ex.id}_${i}`]?.done) {
          completedSets++;
        }
      }
    });

    if (totalSets > 0 && completedSets === totalSets) {
      triggerCelebration("عالی بود! تمام ست‌های تمرین امروز با موفقیت تکمیل شد! 💪🔥");
    }
  };

  const startRestTimer = (seconds = 60, exerciseName = '') => {
    sounds.playBeep(520, 'sine', 0.1);
    setRestTimer({
      isRunning: true,
      duration: seconds,
      timeLeft: seconds,
      exerciseName: exerciseName || 'استراحت بین ست'
    });
  };

  const stopRestTimer = () => {
    setRestTimer(prev => ({ ...prev, isRunning: false }));
  };

  const openVideoModal = (exercise) => {
    setVideoModal({
      isOpen: true,
      title: exercise.nameFa,
      nameEn: exercise.nameEn,
      youtubeId: exercise.youtubeId,
      biomechanics: exercise.biomechanics,
      calories: exercise.calories || (exercise.caloriesPerSet ? exercise.caloriesPerSet * (exercise.setsCount || 3) : 0),
      protein: exercise.proteinRequired
    });
  };

  const closeVideoModal = () => {
    setVideoModal(prev => ({ ...prev, isOpen: false }));
  };

  // Open substitute finder modal
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

  // Replace exercise in current workout
  const replaceExerciseInWorkout = (targetExerciseId, newExercise) => {
    setWorkouts(prev => {
      const selectedDay = daysSchedule.find(d => d.id === selectedDayId);
      if (!selectedDay) return prev;
      const workout = prev[selectedDay.workoutId];
      if (!workout) return prev;

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
            suggestedReps: newExercise.suggestedReps || [12, 10, 8, 8],
            defaultSeconds: newExercise.defaultSeconds || 30
          };
        }
        return ex;
      });

      return {
        ...prev,
        [selectedDay.workoutId]: {
          ...workout,
          exercises: updatedExercises
        }
      };
    });
    closeSubstituteModal();
  };

  // Focus Mode Controls
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

  // Reset Today
  const resetTodayLogs = () => {
    if (window.confirm("آیا مایلید تمام تیک‌ها و یادداشت‌های روز جاری پاکسازی شوند؟")) {
      setWorkoutLogs(prev => {
        const next = { ...prev };
        delete next[activeDateKey];
        return next;
      });
      setMealLogs(prev => {
        const next = { ...prev };
        delete next[activeDateKey];
        return next;
      });
      setMealNotes(prev => {
        const next = { ...prev };
        delete next[activeDateKey];
        return next;
      });
      setWaterLogs(prev => {
        const next = { ...prev };
        delete next[activeDateKey];
        return next;
      });
    }
  };

  // Export Full JSON Backup
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
      exportedAt: new Date().toISOString(),
      version: '2.0'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fit-tracker-backup-${activeDateKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import Full JSON Backup
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
      setHasCompletedOnboarding(true);
      triggerCelebration("اطلاعات پشتیبان با موفقیت بازگردانی شد! 🎉");
      return true;
    } catch (e) {
      alert("خطا در بازگردانی فایل پشتیبان. لطفاً از صحت فایل JSON اطمینان حاصل کنید.");
      return false;
    }
  };

  // Load Preset Defaults (Ardalan Ketabchi)
  const loadDefaultPreset = () => {
    setProfile(defaultProfile);
    setDaysSchedule(initialDays);
    setWorkouts(initialWorkouts);
    setDietMeals(initialMeals);
    setHasCompletedOnboarding(true);
    setIsOnboardingOpen(false);
    triggerCelebration("برنامه پیش‌فرض بارگذاری شد! 🚀");
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
        selectedDayId,
        setSelectedDayId,
        activeDateKey,
        setActiveDateKey,
        daysSchedule,
        setDaysSchedule,
        workouts,
        setWorkouts,
        dietMeals,
        setDietMeals,
        workoutLogs,
        toggleSetComplete,
        updateSetValues,
        copyFromPreviousSet,
        mealLogs,
        toggleMealComplete,
        mealNotes,
        updateMealNote,
        waterLogs,
        addWater,
        resetWater,
        geminiApiKey,
        setGeminiApiKey,
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
        loadDefaultPreset
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
