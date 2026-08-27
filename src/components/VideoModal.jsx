import React from 'react';
import { X, ExternalLink, Play, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const VideoModal = () => {
  const { videoModal, closeVideoModal } = useTracker();

  if (!videoModal.isOpen) return null;

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoModal.youtubeId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoModal.youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={closeVideoModal}></div>

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight">
                {videoModal.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                {videoModal.nameEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-medium transition border border-red-500/30"
              title="باز کردن در برنامه یا تب جدید یوتیوب"
            >
              <span>باز در یوتیوب</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={closeVideoModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex-shrink-0">
          <iframe
            src={embedUrl}
            title={videoModal.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer / Biomechanics Note */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-slate-950/60">
          {videoModal.biomechanics && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
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
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                کالری‌سوزی تقریبی: {videoModal.calories} kcal
              </span>
            )}
            {videoModal.protein > 0 && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                پروتئین مورد نیاز ریکاوری: {videoModal.protein} g
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
