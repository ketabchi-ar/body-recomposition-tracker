import React, { useState, useEffect } from 'react';
import { 
  X, 
  Activity, 
  Heart, 
  Flame, 
  Footprints, 
  Upload, 
  Cloud, 
  Check, 
  ExternalLink, 
  FileText, 
  Smartphone, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Key,
  HelpCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';
import { 
  fetchStravaActivities, 
  fetchGoogleFitData, 
  parseHealthFile,
  getStravaAuthUrl
} from '../utils/healthServices';

export const HealthSyncModal = ({ isOpen, onClose }) => {
  const { profile } = useTracker();

  const [syncedData, setSyncedData] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_tracker_health_sync_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [stravaToken, setStravaToken] = useState(() => localStorage.getItem('fit_tracker_strava_token') || '');
  const [googleFitToken, setGoogleFitToken] = useState(() => localStorage.getItem('fit_tracker_gfit_token') || '');
  const [stravaClientId, setStravaClientId] = useState(() => localStorage.getItem('fit_tracker_strava_client_id') || '');
  
  const [activeTab, setActiveTab] = useState('strava'); // 'strava' | 'gfit' | 'file'
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check URL hash for OAuth return (e.g. #access_token=... from Strava)
  useEffect(() => {
    if (window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const token = hashParams.get('access_token');
      if (token) {
        setStravaToken(token);
        localStorage.setItem('fit_tracker_strava_token', token);
        window.history.replaceState(null, null, window.location.pathname);
        handleSyncStrava(token);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSyncStrava = async (tokenToUse = stravaToken) => {
    if (!tokenToUse) {
      setErrorMessage('لطفاً ابتدا توکن دسترسی Strava را وارد کرده یا دکمه ورود به Strava را بزنید.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('');

    try {
      localStorage.setItem('fit_tracker_strava_token', tokenToUse.trim());
      const data = await fetchStravaActivities(tokenToUse.trim());
      setSyncedData(data);
      localStorage.setItem('fit_tracker_health_sync_data', JSON.stringify(data));
      setStatusMessage(`اطلاعات واقعی ${toPersianDigits(data.activitiesCount)} فعالیت اخیر شما از Strava با موفقیت دریافت شد!`);
    } catch (err) {
      setErrorMessage(err.message || 'خطا در ارتباط با Strava.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncGoogleFit = async () => {
    if (!googleFitToken) {
      setErrorMessage('لطفاً توکن دسترسی Google Fit (یا OAuth Token) را وارد فرمایید.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('');

    try {
      localStorage.setItem('fit_tracker_gfit_token', googleFitToken.trim());
      const data = await fetchGoogleFitData(googleFitToken.trim());
      setSyncedData(data);
      localStorage.setItem('fit_tracker_health_sync_data', JSON.stringify(data));
      setStatusMessage('اطلاعات واقعی گام‌شمار و کالری ۲۴ ساعت گذشته از Google Fit همگام شد!');
    } catch (err) {
      setErrorMessage(err.message || 'خطا در ارتباط با Google Fit REST API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setStatusMessage('');
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = parseHealthFile(content, file.name);
        setSyncedData(parsed);
        localStorage.setItem('fit_tracker_health_sync_data', JSON.stringify(parsed));
        setStatusMessage(`فایل ${file.name} با موفقیت تحلیل شد و ${toPersianDigits(parsed.steps)} گام و ${toPersianDigits(parsed.activeCalories)} کالری ثبت شد.`);
      } catch (err) {
        setErrorMessage(err.message || 'خطا در پردازش فایل.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleClearHealthData = () => {
    if (window.confirm('آیا از پاکسازی داده‌های همگام‌شده سلامت اطمینان دارید؟')) {
      setSyncedData(null);
      localStorage.removeItem('fit_tracker_health_sync_data');
      setStatusMessage('داده‌های سلامت پاکسازی شدند.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-lg shadow-sky-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                هاب همگام‌سازی سلامت واقعی (Health Sync Hub)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                اتصال مستقیم به Strava، Google Fit و پردازشگر فایل‌های Samsung/Apple Health
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Privacy Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-slate-300 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-bold ml-1">اطلاعات واقعی ۱۰۰٪ آفلاین و محلی:</strong>
              <span>هیچ عدد ساختگی نمایش داده نمی‌شود. داده‌های دریافتی از Strava یا فایل‌های اکسپورت شده فقط در مرورگر شما ذخیره و در تحلیل‌های هوش مصنوعی استفاده می‌شوند.</span>
            </div>
          </div>

          {/* Current Live Synced Card */}
          {syncedData ? (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Check className="w-4 h-4" />
                  <span>منبع داده: {syncedData.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">آخرین همگام‌سازی: {syncedData.lastSync}</span>
                  <button onClick={handleClearHealthData} className="text-rose-400 hover:text-rose-300 text-[10px] underline">
                    قطع اتصال
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <Footprints className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">گام‌های واقعی</div>
                  <div className="text-sm font-black text-white mt-0.5">{toPersianDigits(syncedData.steps)}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">کالری فعال</div>
                  <div className="text-sm font-black text-amber-300 mt-0.5">{toPersianDigits(syncedData.activeCalories)} kcal</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <Heart className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">ضربان قلب</div>
                  <div className="text-sm font-black text-rose-300 mt-0.5">
                    {syncedData.avgHeartRate > 0 ? `${toPersianDigits(syncedData.avgHeartRate)} bpm` : 'ثبت نشده'}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <Activity className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">دقایق فعالیت</div>
                  <div className="text-sm font-black text-cyan-300 mt-0.5">{toPersianDigits(syncedData.activeMinutes)} دقیقه</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-slate-400 py-6">
              هنوز هیچ داده سلامتی متصل نشده است. از گزینه‌های زیر برای اتصال واقعی استفاده کنید.
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setActiveTab('strava')}
              className={`pb-2 px-3 font-bold border-b-2 transition ${
                activeTab === 'strava' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              اتصال به Strava (دویدن و دوچرخه)
            </button>

            <button
              onClick={() => setActiveTab('gfit')}
              className={`pb-2 px-3 font-bold border-b-2 transition ${
                activeTab === 'gfit' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              اتصال به Google Fit
            </button>

            <button
              onClick={() => setActiveTab('file')}
              className={`pb-2 px-3 font-bold border-b-2 transition ${
                activeTab === 'file' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              ایمپورت فایل Samsung / Apple
            </button>
          </div>

          {/* TAB 1: STRAVA */}
          {activeTab === 'strava' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                <h4 className="font-bold text-white text-xs">اتصال به API رسمی Strava</h4>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed">
                می‌توانید توکن دسترسی شخصی Strava (Personal Access Token) خود را از پنل توسعه‌دهندگان Strava در کادر زیر وارد کنید یا مستقیماً فعالیت‌های خود را همگام نمایید:
              </p>

              <div className="space-y-2">
                <label className="block text-[11px] text-slate-300">Strava Access Token:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="مثال: e4b281f9..."
                    value={stravaToken}
                    onChange={(e) => setStravaToken(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                    dir="ltr"
                  />
                  <button
                    onClick={() => handleSyncStrava()}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black transition hover:scale-105 flex items-center gap-1.5"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    <span>دریافت اطلاعات</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <a
                  href="https://www.strava.com/settings/api"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 hover:underline flex items-center gap-1"
                >
                  <Key className="w-3 h-3" />
                  <span>دریافت توکن از Strava API Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE FIT */}
          {activeTab === 'gfit' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-sky-400" />
                <h4 className="font-bold text-white text-xs">اتصال به Google Fit REST API</h4>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed">
                توکن دسترسی OAuth 2.0 خود را جهت خواندن داده‌های گام‌شمار و کالری وارد کنید:
              </p>

              <div className="space-y-2">
                <label className="block text-[11px] text-slate-300">Google Fit OAuth Access Token:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ya29.a0AfH6S..."
                    value={googleFitToken}
                    onChange={(e) => setGoogleFitToken(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                    dir="ltr"
                  />
                  <button
                    onClick={handleSyncGoogleFit}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black transition hover:scale-105 flex items-center gap-1.5"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
                    <span>همگام‌سازی</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FILE IMPORT */}
          {activeTab === 'file' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-xs">ایمپورت مستقیم خروجی سامسونگ هلث و اپل هلث</h4>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed">
                فایل اکسپورت شده از منوی تنظیمات سامسونگ هلث (فایل‌های CSV مانند <code>com.samsung.health.step_count.csv</code>) یا فایل <code>export.xml</code> اپل هلث را انتخاب نمایید:
              </p>

              <label className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center">
                <Upload className="w-8 h-8 text-emerald-400" />
                <span className="font-bold text-white text-xs">انتخاب فایل از حافظه گوشی یا سیستم</span>
                <span className="text-[10px] text-slate-500">پشتیبانی از فرمت‌های JSON, CSV, XML, GPX</span>
                <input type="file" accept=".json,.csv,.xml,.gpx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          )}

          {/* Status / Error Alerts */}
          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
