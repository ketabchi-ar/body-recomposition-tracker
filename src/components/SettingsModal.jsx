import React, { useState, useRef } from 'react';
import { 
  X, 
  Settings, 
  User, 
  Key, 
  Cloud, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const SettingsModal = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    profile, 
    setProfile, 
    geminiApiKey, 
    setGeminiApiKey, 
    exportFullBackup, 
    importFullBackup, 
    loadDefaultPreset, 
    setIsGDriveModalOpen,
    setIsOnboardingOpen 
  } = useTracker();

  const fileInputRef = useRef(null);
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey);
  const [savedMsg, setSavedMsg] = useState('');

  if (!isSettingsOpen) return null;

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput.trim());
    setSavedMsg('کلید API ذخیره شد!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleFileUpload = (e) => {
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
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-800 text-emerald-400 border border-slate-700">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">تنظیمات و پشتیبان‌گیری</h3>
              <p className="text-xs text-slate-400">مدیریت پروفایل، هوش مصنوعی، گوگل درایو و داده‌ها</p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Section 1: Profile */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>پروفایل و شاخص‌های بدنی ({profile.name})</span>
              </h4>
              <p className="text-slate-400">قد: {profile.height} | وزن: {profile.weight} | هدف: {profile.goal}</p>
            </div>

            <button
              onClick={() => {
                setIsSettingsOpen(false);
                setIsOnboardingOpen(true);
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold transition flex-shrink-0"
            >
              ویرایش پروفایل
            </button>
          </div>

          {/* Section 2: Gemini API Key */}
          <form onSubmit={handleSaveApiKey} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>کلید Google Gemini API:</span>
              </h4>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>دریافت کلید رایگان</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition"
              >
                ذخیره
              </button>
            </div>
            {savedMsg && <span className="text-emerald-400 text-[10px] block">{savedMsg}</span>}
          </form>

          {/* Section 3: Backup & Restore */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Cloud className="w-4 h-4 text-sky-400" />
              <span>پشتیبان‌گیری، بازیابی و همگام‌سازی ابری:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={exportFullBackup}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold transition"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>دانلود فایل بکاپ JSON</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold transition"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>بازگردانی از فایل JSON</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
            </div>

            <button
              onClick={() => {
                setIsSettingsOpen(false);
                setIsGDriveModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold transition"
            >
              <Cloud className="w-4 h-4" />
              <span>اتصال و همگام‌سازی با Google Drive</span>
            </button>
          </div>

          {/* Section 4: Preset Reset */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-300">بازنشانی به برنامه استاندارد</h4>
              <p className="text-[11px] text-slate-500">بارگذاری مجدد تنظیمات پیش‌فرض برنامه (اردالان کتابچی)</p>
            </div>

            <button
              onClick={() => {
                if (window.confirm("آیا مایلید برنامه به تنظیمات پیش‌فرض بازگردد؟")) {
                  loadDefaultPreset();
                  setIsSettingsOpen(false);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-850 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/60 font-bold transition flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ریست به پیش‌فرض</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
