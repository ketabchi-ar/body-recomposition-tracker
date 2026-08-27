import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  UploadCloud, 
  DownloadCloud, 
  Check, 
  AlertCircle, 
  Key, 
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { googleDrive } from '../utils/googleDrive';

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
    activeDateKey, 
    importFullBackup 
  } = useTracker();

  const [clientId, setClientId] = useState(googleDrive.getClientId());
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  if (!isGDriveModalOpen) return null;

  const handleSaveClientId = (e) => {
    e.preventDefault();
    googleDrive.setClientId(clientId.trim());
    setStatusMsg({ type: 'success', text: 'Client ID با موفقیت ذخیره شد.' });
  };

  const handleUploadToDrive = () => {
    if (!clientId.trim()) {
      setStatusMsg({ type: 'error', text: 'لطفاً ابتدا Client ID گوگل خود را وارد کنید.' });
      return;
    }

    setIsLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      googleDrive.requestAccessToken(async (token) => {
        try {
          const payload = {
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
          await googleDrive.uploadBackup(token, payload);
          setStatusMsg({ type: 'success', text: 'فایل پشتیبان با موفقیت در گوگل درایو شما ذخیره شد! ☁️' });
        } catch (err) {
          setStatusMsg({ type: 'error', text: err.message || 'خطا در آپلود به گوگل درایو' });
        } finally {
          setIsLoading(false);
        }
      });
    } catch (e) {
      setStatusMsg({ type: 'error', text: e.message || 'خطا در احراز هویت گوگل' });
      setIsLoading(false);
    }
  };

  const handleDownloadFromDrive = () => {
    if (!clientId.trim()) {
      setStatusMsg({ type: 'error', text: 'لطفاً ابتدا Client ID گوگل خود را وارد کنید.' });
      return;
    }

    setIsLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      googleDrive.requestAccessToken(async (token) => {
        try {
          const backupData = await googleDrive.downloadBackup(token);
          const success = importFullBackup(JSON.stringify(backupData));
          if (success) {
            setStatusMsg({ type: 'success', text: 'اطلاعات با موفقیت از گوگل درایو بازگردانی شد! 🎉' });
          }
        } catch (err) {
          setStatusMsg({ type: 'error', text: err.message || 'خطا در دانلود از گوگل درایو' });
        } finally {
          setIsLoading(false);
        }
      });
    } catch (e) {
      setStatusMsg({ type: 'error', text: e.message || 'خطا در احراز هویت گوگل' });
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                همگام‌سازی با Google Drive
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ذخیره و بازگردانی ابری اطلاعات و سوابق تمرین
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGDriveModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Client ID Setup Form */}
          <form onSubmit={handleSaveClientId} className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <label className="block font-bold text-slate-200">
              Google OAuth 2.0 Client ID (اختیاری):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="apps.googleusercontent.com..."
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition flex-shrink-0"
              >
                ذخیره
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              از Google Cloud Console بخش Credentials شناسه OAuth Client ID برای Web Application ایجاد کنید.
            </p>
          </form>

          {/* Sync Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleUploadToDrive}
              disabled={isLoading}
              className="p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 via-slate-850 to-slate-900 border border-sky-500/40 hover:border-sky-400 text-right space-y-2 transition shadow-md disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">پشتیبان‌گیری ابری</span>
                <UploadCloud className="w-5 h-5 text-sky-400" />
              </div>
              <p className="text-[11px] text-slate-300">
                آپلود تمام ست‌ها، وعده‌ها و برنامه به گوگل درایو
              </p>
            </button>

            <button
              onClick={handleDownloadFromDrive}
              disabled={isLoading}
              className="p-4 rounded-2xl bg-slate-850 border border-slate-700 hover:border-slate-500 text-right space-y-2 transition shadow-md disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">بازیابی از درایو</span>
                <DownloadCloud className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-300">
                دانلود و بازگردانی آخرین بکاپ ذخیره‌شده
              </p>
            </button>
          </div>

          {/* Status Message */}
          {statusMsg.text && (
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}>
              {statusMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sky-400 p-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>در حال ارتباط با Google Drive...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
