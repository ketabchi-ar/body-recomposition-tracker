import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRightLeft, 
  Check, 
  Dumbbell, 
  Utensils, 
  Play, 
  Bot, 
  Loader2 
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { generateAISubstituteAdvice } from '../utils/aiService';

export const SubstituteModal = () => {
  const { 
    substituteModal, 
    closeSubstituteModal, 
    replaceExerciseInWorkout, 
    openVideoModal, 
    geminiApiKey 
  } = useTracker();

  const [aiCustomAdvice, setAiCustomAdvice] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userReason, setUserReason] = useState('');

  if (!substituteModal.isOpen || !substituteModal.item) return null;

  const isExercise = substituteModal.type === 'exercise';
  const item = substituteModal.item;

  const handleAskAI = async () => {
    if (!geminiApiKey) {
      alert("لطفاً ابتدا کلید Gemini API خود را در بخش تنظیمات وارد نمایید.");
      return;
    }
    setIsAiLoading(true);
    setAiCustomAdvice('');
    try {
      const advice = await generateAISubstituteAdvice(
        geminiApiKey,
        isExercise ? (item.nameFa || item.nameEn) : item.title,
        isExercise ? 'exercise' : 'food',
        userReason
      );
      setAiCustomAdvice(advice);
    } catch (err) {
      alert(err.message || 'خطا در دریافت پیشنهاد هوش مصنوعی');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                پیشنهاد جایگزین‌های هوشمند برای: {isExercise ? item.nameFa : item.title}
              </h3>
              <p className="text-xs text-slate-400">
                {isExercise ? 'انتخاب از بانک حرکات استاندارد با اثر عضلانی مشابه' : 'جایگزین‌های پروتئینی و کربوهیدراتی هم‌ارز'}
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Instant Rule-Based Alternatives from Database */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>جایگزین‌های پیشنهادی از بانک اطلاعاتی:</span>
            </h4>

            {substituteModal.substitutes && substituteModal.substitutes.length > 0 ? (
              <div className="space-y-2.5">
                {substituteModal.substitutes.map((sub, idx) => (
                  <div
                    key={sub.id || idx}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{sub.nameFa}</span>
                        {sub.targetMuscle && (
                          <span className="text-[10px] text-slate-400 font-medium bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {sub.targetMuscle}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">
                        {isExercise ? sub.biomechanics : `${sub.calories} kcal | ${sub.protein}g پروتئین`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {isExercise && sub.youtubeId && (
                        <button
                          onClick={() => openVideoModal(sub)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition"
                          title="مشاهده ویدیو"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}

                      {isExercise && (
                        <button
                          onClick={() => replaceExerciseInWorkout(item.id, sub)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>جایگزین کن</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 p-3 bg-slate-950 rounded-xl">جایگزینی در دیتابیس یافت نشد.</p>
            )}
          </div>

          {/* AI Custom Replacement Generator */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>تحلیل و پیشنهاد اختصاصی با هوش مصنوعی (Gemini AI):</span>
              </h4>
              {!geminiApiKey && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  نیازمند کلید API
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="علت جایگزینی (مثال: درد زانو، نبود دمبل سنگین، حساسیت غذایی...)"
                value={userReason}
                onChange={(e) => setUserReason(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleAskAI}
                disabled={isAiLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold transition shadow-md disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>تحلیل AI</span>
              </button>
            </div>

            {aiCustomAdvice && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-200 leading-relaxed whitespace-pre-line animate-fadeIn">
                {aiCustomAdvice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
