import React, { useState } from 'react';
import { X, ExternalLink, Play, Flame, ShieldAlert, Sparkles, AlertCircle, Video } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { toPersianDigits } from '../utils/jalali';

export const VideoModal = () => {
  const { videoModal, closeVideoModal } = useTracker();
  const [activePlatform, setActivePlatform] = useState('youtube'); // 'youtube' | 'aparat'

  if (!videoModal.isOpen) return null;

  const hasAparat = Boolean(videoModal.aparatId);
  const hasYoutube = Boolean(videoModal.youtubeId);

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoModal.youtubeId}`;
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoModal.youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  const aparatWatchUrl = `https://www.aparat.com/v/${videoModal.aparatId}`;
  const aparatEmbedUrl = `https://www.aparat.com/video/video/embed/videohash/${videoModal.aparatId}/vt/frame`;

  const isAparatActive = (activePlatform === 'aparat' && hasAparat) || (!hasYoutube && hasAparat);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={closeVideoModal}></div>

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                {videoModal.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                {videoModal.nameEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Platform Switcher Tabs */}
            {hasYoutube && hasAparat && (
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActivePlatform('youtube')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    !isAparatActive ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  یوتیوب
                </button>
                <button
                  onClick={() => setActivePlatform('aparat')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    isAparatActive ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  آپارات
                </button>
              </div>
            )}

            {/* Direct Link Button */}
            <a
              href={isAparatActive ? aparatWatchUrl : youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition border border-slate-700"
            >
              <span>{isAparatActive ? 'باز در آپارات' : 'باز در یوتیوب'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={closeVideoModal}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex-shrink-0 flex items-center justify-center">
          {isAparatActive ? (
            <iframe
              src={aparatEmbedUrl}
              title={videoModal.title}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <iframe
              src={youtubeEmbedUrl}
              title={videoModal.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>

        {/* Fallback note */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>در صورت محدودیت سرعت یا ربات‌چک گوگل، ویدیو را در آپارات یا اپ یوتیوب باز کنید:</span>
          </div>
          <div className="flex items-center gap-2">
            {hasAparat && (
              <a
                href={aparatWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 font-bold underline flex items-center gap-1"
              >
                <span>آپارات</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {hasYoutube && (
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-bold underline flex items-center gap-1"
              >
                <span>اپلیکیشن یوتیوب</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Biomechanics Injury Prevention Guide */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-slate-950/60">
          {videoModal.biomechanics && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>نکات بیومکانیکی بهینه‌سازی و محافظت دیسک کمر:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {videoModal.biomechanics}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {videoModal.calories > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                کالری‌سوزی تقریبی: {toPersianDigits(videoModal.calories)} kcal
              </span>
            )}
            {videoModal.protein > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                پروتئین مورد نیاز ریکاوری: {toPersianDigits(videoModal.protein)} گرم
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
