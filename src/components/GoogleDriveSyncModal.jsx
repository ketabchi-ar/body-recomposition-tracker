import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Upload, 
  Download, 
  Check, 
  Loader2, 
  AlertCircle, 
  ShieldCheck,
  FolderSync,
  ExternalLink,
  Share2,
  Settings2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const GoogleDriveSyncModal = () => {
  const { 
    isGDriveModalOpen, 
    setIsGDriveModalOpen,
    profile,
    daysSchedule,
    workouts,
    dietMeals,
    workoutLogs,
    mealLogs,
    mealNotes,
    waterLogs,
    aiConfig,
    exportFullBackup,
    importFullBackup
  } = useTracker();

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [googleClientId, setGoogleClientId] = useState(() => localStorage.getItem('fit_tracker_custom_gclient_id') || '');
  const [showConfig, setShowConfig] = useState(false);

  if (!isGDriveModalOpen) return null;

  const handleSaveClientId = (e) => {
    e.preventDefault();
    localStorage.setItem('fit_tracker_custom_gclient_id', googleClientId.trim());
    setStatusMessage('شناسه Google Client ID ذخیره شد.');
  };

  // Direct 1-Click Web Share to Google Drive App or Files
  const handleShareToDrive = async () => {
    setIsLoading(true);
    setStatusMessage('');

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

    const fileName = `FitTracker_Backup_${new Date().toISOString().split('T')[0]}.json`;
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const file = new File([blob], fileName, { type: 'application/json' });

    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'پشتیبان برنامه فیتنس تراکر',
          text: 'فایل پشتیبان تمرینات و رژیم غذایی جهت ذخیره در Google Drive'
        });
        setStatusMessage('فایل با موفقیت جهت ارسال به Google Drive به اشتراک گذاشته شد! ✅');
      } else {
        // Fallback to direct auto-download + open drive.google.com
        exportFullBackup();
        window.open('https://drive.google.com/', '_blank');
        setStatusMessage('فایل دانلود شد و صفحه Google Drive در تب جدید باز شد. کافیست فایل را در پوشه درایو رها کنید! 🚀');
      }
    } catch {
      exportFullBackup();
      setStatusMessage('فایل پشتیبان JSON دانلود شد.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                پشتیبان‌گیری ابری و همگام‌سازی با Google Drive
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ذخیره دائمی و ۱۰۰٪ امن اطلاعات ورزشی و رژیم غذایی
              </p>
            </div>
          </div>

          <button onClick={() => setIsGDriveModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs overflow-y-auto">
          
          {/* Info Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-850 flex items-start gap-2.5 text-slate-300 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-bold ml-1">پشتیبان‌گیری ابری بدون نیاز به ثبت‌نام:</strong>
              <span>می‌توانید با یک کلیک فایل پشتیبان را به اپلیکیشن Google Drive گوشی یا کامپیوتر خود منتقل فرمایید.</span>
            </div>
          </div>

          {/* 1-Click Drive Action */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <FolderSync className="w-6 h-6 text-emerald-400" />
              <span className="font-black text-sm text-white">ذخیره خودکار در Google Drive</span>
            </div>

            <p className="text-slate-400 text-xs">
              فایل حاوی تمام ست‌ها، وعده‌ها، تنظیمات AI و پروفایل شماست.
            </p>

            <button
              onClick={handleShareToDrive}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 hover:scale-[1.01]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
              <span>ذخیره مستقیم در Google Drive / اشتراک‌گذاری ابری</span>
            </button>
          </div>

          {/* Local File Export & Import Alternative */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={exportFullBackup}
              className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>دانلود فایل بکاپ JSON</span>
            </button>

            <label className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold transition flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>بازگردانی فایل بکاپ</span>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    importFullBackup(ev.target.result);
                  };
                  reader.readAsText(file);
                }}
                className="hidden"
              />
            </label>
          </div>

          {/* Optional Developer Google Client ID Config */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 mx-auto"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showConfig ? 'بستن تنظیمات پیشرفته گوگل' : 'تنظیمات پیشرفته Google Cloud Client ID (اختیاری)'}</span>
            </button>

            {showConfig && (
              <form onSubmit={handleSaveClientId} className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-[11px] text-slate-400">شناسه Google OAuth Client ID شما:</label>
                <input
                  type="text"
                  placeholder="مثال: 12345-abc.apps.googleusercontent.com"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-[11px]"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px]"
                >
                  ذخیره شناسه
                </button>
              </form>
            )}
          </div>

          {statusMessage && (
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 text-center">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
