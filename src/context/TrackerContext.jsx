import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { daysSchedule, workoutsData, dietMealsData } from '../data/planData';

const TrackerContext = createContext();

// Helper to get formatted Date string YYYY-MM-DD
export const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Helper to get today's day schedule ID
export const getTodayScheduleId = () => {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const found = daysSchedule.find(d => d.dayIndex === dayIndex);
  return found ? found.id : 'sunday';
};

export const TrackerProvider = ({ children }) => {
  const [selectedDayId, setSelectedDayId] = useState(getTodayScheduleId);
  const [activeDateKey, setActiveDateKey] = useState(getTodayKey);

  // Completed sets: { [dateKey]: { [setKey]: { done: boolean, weight: number|string, reps: number|string } } }
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_workout_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Completed meals: { [dateKey]: { [mealId]: boolean } }
  const [mealLogs, setMealLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_meal_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Water intake in ml: { [dateKey]: number }
  const [waterLogs, setWaterLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_water_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active YouTube video modal
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    title: '',
    nameEn: '',
    youtubeId: '',
    biomechanics: '',
    calories: 0,
    protein: 0
  });

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
    phase: 'work', // 'work' (30min) or 'break' (2min)
    duration: 30 * 60,
    timeLeft: 30 * 60
  });

  // Active Tab in UI: 'schedule' | 'workout' | 'diet' | 'stats' | 'ergo'
  const [activeTab, setActiveTab] = useState('workout');

  // Persistence
  useEffect(() => {
    localStorage.setItem('fit_tracker_workout_logs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_meal_logs', JSON.stringify(mealLogs));
  }, [mealLogs]);

  useEffect(() => {
    localStorage.setItem('fit_tracker_water_logs', JSON.stringify(waterLogs));
  }, [waterLogs]);

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
      sounds.playTimerAlert();
      setRestTimer(prev => ({ ...prev, isRunning: false }));
    }
    return () => clearInterval(interval);
  }, [restTimer.isRunning, restTimer.timeLeft]);

  // Ergonomics Timer Interval
  useEffect(() => {
    let interval = null;
    if (ergoTimer.isRunning && ergoTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setErgoTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (ergoTimer.isRunning && ergoTimer.timeLeft <= 0) {
      sounds.playCompletionChime();
      if (ergoTimer.phase === 'work') {
        // Switch to break 2 min
        setErgoTimer({
          isRunning: true,
          phase: 'break',
          duration: 2 * 60,
          timeLeft: 2 * 60
        });
      } else {
        // Switch back to work 30 min
        setErgoTimer({
          isRunning: true,
          phase: 'work',
          duration: 30 * 60,
          timeLeft: 30 * 60
        });
      }
    }
    return () => clearInterval(interval);
  }, [ergoTimer.isRunning, ergoTimer.timeLeft, ergoTimer.phase]);

  // Actions
  const toggleSetComplete = (exerciseId, setIndex, currentReps = '', currentWeight = '') => {
    sounds.playBeep(700, 'sine', 0.08);
    setWorkoutLogs(prev => {
      const dayLogs = prev[activeDateKey] || {};
      const key = `${exerciseId}_${setIndex}`;
      const current = dayLogs[key] || { done: false, weight: currentWeight, reps: currentReps };
      const nextDone = !current.done;

      const updated = {
        ...prev,
        [activeDateKey]: {
          ...dayLogs,
          [key]: {
            ...current,
            done: nextDone,
            weight: current.weight || currentWeight,
            reps: current.reps || currentReps
          }
        }
      };

      if (nextDone) {
        // trigger gentle confetti if last set
        checkIfAllDoneAndCelebrate(updated);
      }

      return updated;
    });
  };

  const updateSetValues = (exerciseId, setIndex, field, value) => {
    setWorkoutLogs(prev => {
      const dayLogs = prev[activeDateKey] || {};
      const key = `${exerciseId}_${setIndex}`;
      const current = dayLogs[key] || { done: false, weight: '', reps: '' };
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
        // check total meals completed
        const completedCount = Object.values(updated[activeDateKey] || {}).filter(Boolean).length;
        if (completedCount === dietMealsData.length) {
          triggerCelebration("تکمیل تمام وعده‌ها و مکمل‌های روزانه! پروتئین و تغذیه کامل شد 🚀");
        }
      }
      return updated;
    });
  };

  const addWater = (amountMl = 250) => {
    sounds.playBeep(900, 'sine', 0.12);
    setWaterLogs(prev => {
      const current = prev[activeDateKey] || 0;
      const next = Math.min(5000, current + amountMl);
      if (current < 2500 && next >= 2500) {
        triggerCelebration("تبریک! هدف مصرف ۲.۵ لیتر آب روزانه تکمیل شد 💧");
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
    const workout = workoutsData[selectedDay.workoutId];
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
      calories: exercise.calories,
      protein: exercise.proteinRequired
    });
  };

  const closeVideoModal = () => {
    setVideoModal(prev => ({ ...prev, isOpen: false }));
  };

  const resetTodayLogs = () => {
    if (window.confirm("آیا مایلید تمام تیک‌ها و لاگ‌های روز جاری پاکسازی شوند؟")) {
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
      setWaterLogs(prev => {
        const next = { ...prev };
        delete next[activeDateKey];
        return next;
      });
    }
  };

  return (
    <TrackerContext.Provider
      value={{
        selectedDayId,
        setSelectedDayId,
        activeDateKey,
        setActiveDateKey,
        workoutLogs,
        toggleSetComplete,
        updateSetValues,
        mealLogs,
        toggleMealComplete,
        waterLogs,
        addWater,
        resetWater,
        videoModal,
        openVideoModal,
        closeVideoModal,
        restTimer,
        startRestTimer,
        stopRestTimer,
        ergoTimer,
        setErgoTimer,
        activeTab,
        setActiveTab,
        resetTodayLogs
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
