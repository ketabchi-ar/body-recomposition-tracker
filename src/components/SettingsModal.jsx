import React, { useState } from 'react';
import { 
  X, 
  User, 
  Key, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Cloud, 
  Bot, 
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { AI_PROVIDERS, testAIConnection } from '../utils/aiService';
import { parsePersianDigits } from '../utils/jalali';

export const SettingsModal = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    profile, 
    setProfile, 
    aiConfig, 
    setAiConfig, 
    exportFullBackup, 
    importFullBackup, 
    loadDefaultPreset,
    setIsGDriveModalOpen 
  } = useTracker();

  const [formData, setFormData] = useState({ ...profile });
  const [localAiConfig, setLocalAiConfig] = useState({ ...aiConfig });
  const [testResult, setTestResult] = useState({ success: false, msg: '' });
  const [isTesting, setIsTesting] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({
      ...formData,
      age: parsePersianDigits(formData.age),
      height: parsePersianDigits(formData.height),
      weight: parsePersianDigits(formData.weight),
      fatPercentage: parsePersianDigits(formData.fatPercentage),
      dailyTargetCalories: parsePersianDigits(formData.dailyTargetCalories),
      dailyTargetProtein: parsePersianDigits(formData.dailyTargetProtein)
    });
    setAiConfig(localAiConfig);
    setIsSettingsOpen(false);
  };

  const handleTestKey = async () => {
    if (!localAiConfig.apiKey) {
      setTestResult({ success: false, msg: 'لطفاً کلید API را وارد کنید.' });
      return;
    }
    setIsTesting(true);
    setTestResult({ success: false, msg: '' });
    try {
      const res = await testAIConnection(
        localAiConfig.provider, 
        localAiConfig.apiKey, 
        localAiConfig.model, 
        localAiConfig.customBaseUrl
      );
      setTestResult({ success: true, msg: `اتصال با موفقیت برقرار شد! پاسخ: ${res}` });
    } catch (err) {
      setTestResult({ success: false, msg: `خطا در اتصال: ${err.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        importFullBackup(content);
        setIsSettingsOpen(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-base text-white">تنظیمات پروفایل و هوش مصنوعی</h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Profile Details */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-200">اطلاعات ورزشکار:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">هدف ورزشی:</label>
                <input
                  type="text"
                  value={formData.goal || ''}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">وزن (کیلوگرم):</label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-center font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">قد (سانتی‌متر):</label>
                <input
                  type="text"
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-center font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">کالری هدف روزانه (kcal):</label>
                <input
                  type="text"
                  value={formData.dailyTargetCalories || ''}
                  onChange={(e) => setFormData({ ...formData, dailyTargetCalories: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-center font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">پروتئین هدف روزانه (گرم):</label>
                <input
                  type="text"
                  value={formData.dailyTargetProtein || ''}
                  onChange={(e) => setFormData({ ...formData, dailyTargetProtein: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white text-center font-mono"
                />
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-200 flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>پیکربندی هوش مصنوعی (AI Multi-Provider):</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AI_PROVIDERS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setLocalAiConfig({ ...localAiConfig, provider: p.id, model: p.defaultModel })}
                  className={`p-2 rounded-xl border text-right transition ${
                    localAiConfig.provider === p.id
                      ? 'bg-emerald-950/50 border-emerald-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-slate-400 mb-1">کلید API:</label>
              <input
                type="password"
                placeholder="کلید API خود را وارد کنید..."
                value={localAiConfig.apiKey || ''}
                onChange={(e) => setLocalAiConfig({ ...localAiConfig, apiKey: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white font-mono text-[11px]"
              />
            </div>

            {testResult.msg && (
              <div className={`p-2.5 rounded-xl border ${
                testResult.success ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}>
                {testResult.msg}
              </div>
            )}

            <button
              type="button"
              onClick={handleTestKey}
              disabled={isTesting || !localAiConfig.apiKey}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>تست اتصال کلید API</span>
            </button>
          </div>

          {/* Backup & Restore Buttons */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-slate-200">مدیریت فایل‌های پشتیبان:</h4>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={exportFullBackup}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>دانلود فایل پشتیبان (JSON)</span>
              </button>

              <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold cursor-pointer">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>بازگردانی از فایل JSON</span>
                <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(false);
                  setIsGDriveModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold"
              >
                <Cloud className="w-4 h-4" />
                <span>Google Drive</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("آیا مایلید همه چیز به الگوی مرجع پیش‌فرض (اردالان کتابچی) برگردد؟")) {
                  loadDefaultPreset();
                  setIsSettingsOpen(false);
                }
              }}
              className="text-slate-500 hover:text-rose-400 text-xs transition"
            >
              بارگذاری الگوی مرجع پیش‌فرض
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
