import React, { useState } from 'react';
import { User, Sparkles, Layers, CheckCircle2, RotateCw } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';

export const VisualBodyMap = ({ selectedMuscle, onSelectMuscle }) => {
  const { profile } = useTracker();
  const [view, setView] = useState('front'); // 'front' | 'back'
  const isFemale = profile.gender === 'female' || profile.gender === 'خانم';

  const muscleList = [
    { id: 'all', name: 'کل بدن (نمایش همه)' },
    { id: 'chest', name: 'سینه (Chest)', view: 'front' },
    { id: 'shoulders', name: 'سرشانه و دلتوئید (Shoulders)', view: 'both' },
    { id: 'back', name: 'زیربغل و عضلات پشت (Back & Lats)', view: 'back' },
    { id: 'arms', name: 'جلو بازو و پشت بازو (Arms)', view: 'both' },
    { id: 'core', name: 'شکم، پهلو و ستون فقرات (Core)', view: 'front' },
    { id: 'legs', name: 'چهارسر، باسن و همسترینگ (Legs & Glutes)', view: 'both' },
    { id: 'cardio', name: 'هوازی و کالیستنیکس (Cardio & Bodyweight)', view: 'both' }
  ];

  const getMuscleColor = (muscleId) => {
    if (selectedMuscle === 'all') return 'fill-slate-800/80 stroke-slate-700 hover:fill-emerald-500/50 hover:stroke-emerald-400';
    if (selectedMuscle === muscleId) return 'fill-emerald-500/85 stroke-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]';
    return 'fill-slate-850/90 stroke-slate-700/80 opacity-60 hover:opacity-100 hover:fill-emerald-500/40 hover:stroke-emerald-400';
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-white">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-black">
            نقشه تعاملی آناتومی بدن (MuscleWiki Visual Map)
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {isFemale ? 'آناتومی بانوان' : 'آناتومی آقایان'}
          </span>
        </div>

        {/* View Switcher: Front / Back */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setView('front')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              view === 'front' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            نمای جلو (Front)
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              view === 'back' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            نمای پشت (Back)
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-6 py-2">
        
        {/* SVG Interactive MuscleWiki Body Silhouette */}
        <div className="relative w-64 sm:w-72 h-[340px] flex items-center justify-center bg-slate-950/70 rounded-3xl border border-slate-800 p-2 shadow-inner">
          <svg viewBox="0 0 200 320" className="w-full h-full cursor-pointer transition-all duration-300 filter">
            
            {/* Head & Neck */}
            <circle cx="100" cy="25" r="16" className="fill-slate-800 stroke-slate-700" strokeWidth="1.5" />
            <path d="M92 40 L108 40 L112 52 L88 52 Z" className="fill-slate-800 stroke-slate-700" strokeWidth="1.5" />

            {/* FRONT VIEW */}
            {view === 'front' && (
              <g className="transition-all duration-300">
                {/* Shoulders / Deltoids */}
                <path
                  d="M62 55 Q72 50 85 52 L82 72 Q64 74 60 62 Z"
                  onClick={() => onSelectMuscle('shoulders')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('shoulders')}`}
                  strokeWidth="1.5"
                >
                  <title>سرشانه چپ (Left Deltoid)</title>
                </path>
                <path
                  d="M138 55 Q128 50 115 52 L118 72 Q136 74 140 62 Z"
                  onClick={() => onSelectMuscle('shoulders')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('shoulders')}`}
                  strokeWidth="1.5"
                >
                  <title>سرشانه راست (Right Deltoid)</title>
                </path>

                {/* Chest (Pectoralis) */}
                <path
                  d={isFemale 
                    ? "M84 54 Q100 56 116 54 Q122 75 116 88 Q100 92 84 88 Q78 75 84 54 Z"
                    : "M84 54 Q100 56 116 54 L120 78 Q100 86 80 78 Z"}
                  onClick={() => onSelectMuscle('chest')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('chest')}`}
                  strokeWidth="1.5"
                >
                  <title>عضلات سینه (Chest / Pectorals)</title>
                </path>

                {/* Biceps & Arms */}
                <path
                  d="M58 66 L78 74 L72 108 L52 98 Z"
                  onClick={() => onSelectMuscle('arms')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`}
                  strokeWidth="1.5"
                >
                  <title>جلو بازو چپ (Left Bicep)</title>
                </path>
                <path
                  d="M142 66 L122 74 L128 108 L148 98 Z"
                  onClick={() => onSelectMuscle('arms')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`}
                  strokeWidth="1.5"
                >
                  <title>جلو بازو راست (Right Bicep)</title>
                </path>

                {/* Forearms */}
                <path d="M50 102 L70 112 L64 145 L46 138 Z" onClick={() => onSelectMuscle('arms')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`} strokeWidth="1.5" />
                <path d="M150 102 L130 112 L136 145 L154 138 Z" onClick={() => onSelectMuscle('arms')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`} strokeWidth="1.5" />

                {/* Core / Abdominals & Obliques */}
                <path
                  d={isFemale 
                    ? "M84 90 Q100 93 116 90 Q112 118 118 140 Q100 144 82 140 Q88 118 84 90 Z"
                    : "M82 82 Q100 85 118 82 L114 138 Q100 144 86 138 Z"}
                  onClick={() => onSelectMuscle('core')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('core')}`}
                  strokeWidth="1.5"
                >
                  <title>عضلات شکم و پهلو (Abdominals & Core)</title>
                </path>

                {/* Quads / Front Thighs */}
                <path
                  d={isFemale
                    ? "M76 145 Q88 148 98 148 L96 220 Q70 216 68 152 Z"
                    : "M78 142 Q88 146 98 146 L95 220 Q75 218 72 148 Z"}
                  onClick={() => onSelectMuscle('legs')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`}
                  strokeWidth="1.5"
                >
                  <title>چهارسر ران چپ (Left Quadriceps)</title>
                </path>
                <path
                  d={isFemale
                    ? "M124 145 Q112 148 102 148 L104 220 Q130 216 132 152 Z"
                    : "M122 142 Q112 146 102 146 L105 220 Q125 218 128 148 Z"}
                  onClick={() => onSelectMuscle('legs')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`}
                  strokeWidth="1.5"
                >
                  <title>چهارسر ران راست (Right Quadriceps)</title>
                </path>

                {/* Calves (Front Tibialis) */}
                <path d="M72 228 L92 230 L88 290 L74 286 Z" onClick={() => onSelectMuscle('legs')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`} strokeWidth="1.5" />
                <path d="M128 228 L108 230 L112 290 L126 286 Z" onClick={() => onSelectMuscle('legs')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`} strokeWidth="1.5" />
              </g>
            )}

            {/* BACK VIEW */}
            {view === 'back' && (
              <g className="transition-all duration-300">
                {/* Upper Traps & Back Lats */}
                <path
                  d="M80 50 Q100 58 120 50 L128 88 Q100 94 72 88 Z"
                  onClick={() => onSelectMuscle('back')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('back')}`}
                  strokeWidth="1.5"
                >
                  <title>عضلات پشت و کول (Traps & Upper Back)</title>
                </path>

                {/* Lats (Latissimus Dorsi) */}
                <path
                  d="M72 88 Q100 94 128 88 L120 135 Q100 142 80 135 Z"
                  onClick={() => onSelectMuscle('back')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('back')}`}
                  strokeWidth="1.5"
                >
                  <title>زیربغل و پشتی بزرگ (Lats / Latissimus)</title>
                </path>

                {/* Triceps (Back Arms) */}
                <path d="M58 64 L76 72 L70 108 L52 98 Z" onClick={() => onSelectMuscle('arms')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`} strokeWidth="1.5" />
                <path d="M142 64 L124 72 L130 108 L148 98 Z" onClick={() => onSelectMuscle('arms')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('arms')}`} strokeWidth="1.5" />

                {/* Glutes (سرینی و باسن) */}
                <path
                  d={isFemale
                    ? "M72 138 Q100 144 128 138 Q136 172 100 176 Q64 172 72 138 Z"
                    : "M76 136 Q100 140 124 136 Q130 166 100 170 Q70 166 76 136 Z"}
                  onClick={() => onSelectMuscle('legs')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`}
                  strokeWidth="1.5"
                >
                  <title>عضلات سرینی و باسن (Gluteus Maximus)</title>
                </path>

                {/* Hamstrings (پشت پا) */}
                <path
                  d="M74 178 Q88 180 98 180 L94 228 Q74 226 72 180 Z"
                  onClick={() => onSelectMuscle('legs')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`}
                  strokeWidth="1.5"
                >
                  <title>همسترینگ چپ (Left Hamstrings)</title>
                </path>
                <path
                  d="M126 178 Q112 180 102 180 L106 228 Q126 226 128 180 Z"
                  onClick={() => onSelectMuscle('legs')}
                  className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`}
                  strokeWidth="1.5"
                >
                  <title>همسترینگ راست (Right Hamstrings)</title>
                </path>

                {/* Calves Back (Gastrocnemius) */}
                <path d="M70 234 Q88 236 94 236 L90 292 L72 288 Z" onClick={() => onSelectMuscle('legs')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`} strokeWidth="1.5" />
                <path d="M130 234 Q112 236 106 236 L110 292 L128 288 Z" onClick={() => onSelectMuscle('legs')} className={`transition-colors duration-200 cursor-pointer ${getMuscleColor('legs')}`} strokeWidth="1.5" />
              </g>
            )}
          </svg>
        </div>

        {/* Muscle Selector Chips List */}
        <div className="flex-1 space-y-2 max-w-md">
          <span className="text-xs text-slate-400 font-bold block mb-1">
            انتخاب سریع عضله برای فیلتر حرکات:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {muscleList.map((m) => {
              const isSelected = selectedMuscle === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMuscle(m.id)}
                  className={`p-2.5 rounded-2xl border text-right text-xs font-bold transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{m.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
