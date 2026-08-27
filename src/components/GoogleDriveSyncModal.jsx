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
  LogOut
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
    aiConfig,
    exportFullBackup,
    importFullBackup
  } = useTracker();

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(() => Boolean(localStorage.getItem('fit_tracker_gdrive_token')));

  if (!isGDriveModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setStatusMessage('');
    try {
      await googleDrive.signIn();
      setIsSignedIn(true);
      setStatusMessage('ورود با حساب گوگل موفقیت‌آمیز بود! اکنون می‌توانید بکاپ‌ها را مستقیماً در Google Drive ذخیره فرمایید.');
    } catch (err) {
      setStatusMessage(`ورود به حساب گوگل انجام نشد (${err.message}). می‌توانید از دانلود و بازیابی مستقیم فایل استفاده فرمایید.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncToDrive = async () => {
    setIsLoading(true);
    setStatusMessage('');

    const payload = {
      profile,
      daysSchedule,
      workouts,
      dietMeals,
      workoutLogs,
      mealLogs,
      mealNotes,
      waterLogs,
      aiConfig,
      backupDate: new Date().toISOString()
    };

    try {
      const res = await googleDrive.uploadBackup(payload);
      setStatusMessage(`فایل پشتیبان با موفقیت در گوگل درایو ذخیره شد (${res.fileName}) ✅`);
    } catch (err) {
      setStatusMessage(`خطا در همگام‌سازی ابری: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    googleDrive.signOut();
    setIsSignedIn(false);
    setStatusMessage('از حساب کاربری گوگل خارج شدید.');
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
                پشتیبان‌گیری ابری و همگام‌سازی با گوگل درایو
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ورود مستقیم با یک کلیک و ذخیره ایمن برنامه در پوشه FitTracker گوگل
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
              <strong className="text-emerald-400 font-bold ml-1">حفظ دائمی داده‌های ورزشی:</strong>
              <span>با اتصال حساب گوگل یا دریافت فایل پشتیبان، هیچ‌گاه تمرینات، تیک‌های روزانه و رژیم غذایی شما حتی با پاک کردن حافظه مرورگر از بین نخواهد رفت.</span>
            </div>
          </div>

          {/* Google Sign-in Action Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <FolderSync className="w-6 h-6 text-emerald-400" />
              <span className="font-black text-sm text-white">همگام‌سازی خودکار با Google Drive</span>
            </div>

            {isSignedIn ? (
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                  حساب کاربری گوگل متصل است ✅
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleSyncToDrive}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition shadow-lg shadow-emerald-500/20"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>همگام‌سازی فوری و ایجاد فایل بکاپ در درایو</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
                    title="خروج از حساب گوگل"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black transition shadow-lg hover:scale-[1.01]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span>ورود با حساب گوگل (Sign in with Google)</span>
              </button>
            )}
          </div>

          {/* Local File Export & Import Alternative */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
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
