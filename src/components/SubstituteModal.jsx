import React, { useState } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  Bot, 
  Sparkles, 
  Check, 
  Flame, 
  Dumbbell, 
  Utensils, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { generateAISubstituteAdvice } from '../utils/aiService';
import { toPersianDigits } from '../utils/jalali';

export const SubstituteModal = () => {
  const { 
    substituteModal, 
    closeSubstituteModal, 
    replaceExerciseInWorkout, 
    aiConfig,
    dietMeals,
    updateMeal 
  } = useTracker();

  const [aiAdvice, setAiAdvice] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userNote, setUserNote] = useState('');

  if (!substituteModal.isOpen || !substituteModal.item) return null;

  const isExercise = substituteModal.type === 'exercise';
  const itemName = isExercise 
    ? substituteModal.item.nameFa 
    : (substituteModal.item.title || substituteModal.item.nameFa);

  const handleFetchAiSubstitute = async () => {
    if (!aiConfig.apiKey) {
      alert("برای دریافت پیشنهاد تخصصی از هوش مصنوعی، ابتدا کلید API خود را در بخش تنظیمات وارد نمایید.");
      return;
    }
    setIsAiLoading(true);
    setAiAdvice('');

    try {
      const advice = await generateAISubstituteAdvice(
        aiConfig, 
        itemName, 
        substituteModal.type, 
        userNote
      );
      setAiAdvice(advice);
    } catch (err) {
      alert(err.message || 'خطا در ارتباط با هوش مصنوعی');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleReplaceFoodInMeal = (subFood) => {
    const meal = substituteModal.item;
    if (!meal || !meal.id) return;

    // Replace or add item to meal
    const newItems = [...(meal.items || [])];
    const subText = `${subFood.nameFa} (${toPersianDigits(subFood.servingSize)} ${subFood.unit})`;
    newItems[0] = subText;

    updateMeal(meal.id, 'subtitle', subFood.nameFa);
    updateMeal(meal.id, 'items', newItems);
    updateMeal(meal.id, 'calories', subFood.calories || meal.calories);
    updateMeal(meal.id, 'protein', subFood.protein || meal.protein);

    closeSubstituteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                پیشنهاد جایگزین‌های علمی برای: <span className="text-cyan-400">{itemName}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isExercise ? 'جایگزینی حرکات با اثر بیومکانیکی مشابه' : 'جایگزینی مواد غذایی هم‌ارز با ماکروهای یکسان'}
              </p>
            </div>
          </div>

          <button
            onClick={closeSubstituteModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          
          {/* Section 1: Quick Rule-Based Database Substitutes */}
          <div>
            <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>جایگزین‌های سریع پیشنهادی از بانک داده:</span>
            </h4>

            {substituteModal.substitutes && substituteModal.substitutes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {substituteModal.substitutes.map((sub, idx) => (
                  <div
                    key={sub.id || idx}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <h5 className="font-bold text-white text-sm">{sub.nameFa}</h5>
                      <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{sub.nameEn}</span>
                      {sub.biomechanics && (
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{sub.biomechanics}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                      <div className="text-[10px] text-slate-400">
                        {isExercise ? (
                          <span>{sub.targetMuscle}</span>
                        ) : (
                          <span>{toPersianDigits(sub.calories)} kcal | {toPersianDigits(sub.protein)}g پروتئین</span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (isExercise) {
                            replaceExerciseInWorkout(substituteModal.item.id, sub);
                          } else {
                            handleReplaceFoodInMeal(sub);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold transition shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>انتخاب و جایگزینی</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">جایگزین مستقیمی در بانک داده یافت نشد.</p>
            )}
          </div>

          {/* Section 2: AI Deep Analysis Substitute */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>مشاوره و تحلیل هوش مصنوعی (AI Advice):</span>
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="علت جایگزینی (مثال: درد زانو، نبود هالتر، گیاه‌خواری...)"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleFetchAiSubstitute}
                disabled={isAiLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition disabled:opacity-50 flex-shrink-0"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                <span>پرسش از AI</span>
              </button>
            </div>

            {aiAdvice && (
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-200 leading-relaxed whitespace-pre-line animate-fadeIn">
                {aiAdvice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
