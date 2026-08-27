import React, { useState } from 'react';
import { User, RefreshCw, Sparkles, Check } from 'lucide-react';

export const VisualBodyMap = ({ selectedMuscle, onSelectMuscle }) => {
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'back'
  const [gender, setGender] = useState('male'); // 'male' | 'female'

  const muscleList = [
    { id: 'chest', name: 'سینه (Chest)', view: 'front', color: 'hover:fill-rose-500' },
    { id: 'shoulders', name: 'سرشانه (Shoulders)', view: 'both', color: 'hover:fill-amber-500' },
    { id: 'arms', name: 'جلو و پشت بازو (Arms)', view: 'both', color: 'hover:fill-indigo-500' },
    { id: 'core', name: 'شکم و پهلو (Core / Abs)', view: 'front', color: 'hover:fill-emerald-500' },
    { id: 'back', name: 'پشت و زیربغل (Back & Traps)', view: 'back', color: 'hover:fill-cyan-500' },
    { id: 'legs', name: 'پا و باسن (Legs & Glutes)', view: 'both', color: 'hover:fill-teal-500' },
    { id: 'cardio', name: 'کل بدن و کاردیو (Full Body / Cardio)', view: 'both', color: 'hover:fill-orange-500' }
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">فیلتر تصویری آناتومی عضلات بدن</h3>
            <p className="text-[11px] text-slate-400">برای مشاهده حرکات اختصاصی، روی عضله مورد نظر کلیک کنید</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Angle Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewAngle('front')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewAngle === 'front' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              نمای جلو (Front)
            </button>
            <button
              onClick={() => setViewAngle('back')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewAngle === 'back' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              نمای پشت (Back)
            </button>
          </div>

          {/* Gender Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setGender('male')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gender === 'male' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              آقا
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gender === 'female' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              خانم
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Anatomy Graphic & Quick Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* SVG Interactive Anatomical Body */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-slate-850 relative min-h-[340px]">
          <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-500">
            {viewAngle === 'front' ? 'آناتومی قدامی (Anterior)' : 'آناتومی خلفی (Posterior)'}
          </span>

          <svg viewBox="0 0 200 360" className="w-48 sm:w-56 h-auto drop-shadow-2xl select-none">
            {/* Head */}
            <circle cx="100" cy="35" r="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Neck */}
            <rect x="92" y="55" width="16" height="15" rx="4" fill="#334155" />

            {/* FRONT VIEW ANATOMY */}
            {viewAngle === 'front' && (
              <g>
                {/* Shoulders Left & Right */}
                <path
                  d="M 65 72 C 55 75, 48 85, 48 98 C 48 105, 54 110, 60 110 C 65 95, 70 82, 75 72 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه چپ</title>
                </path>
                <path
                  d="M 135 72 C 145 75, 152 85, 152 98 C 152 105, 146 110, 140 110 C 135 95, 130 82, 125 72 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه راست</title>
                </path>

                {/* Chest (سینه) */}
                <path
                  d="M 75 72 C 85 70, 95 72, 100 75 C 105 72, 115 70, 125 72 C 128 92, 120 112, 100 115 C 80 112, 72 92, 75 72 Z"
                  fill={selectedMuscle === 'chest' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'chest' ? '#34d399' : '#475569'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('chest')}
                >
                  <title>عضلات سینه (Chest)</title>
                </path>

                {/* Biceps Left & Right (جلو بازو) */}
                <ellipse
                  cx="50"
                  cy="125"
                  rx="9"
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />
                <ellipse
                  cx="150"
                  cy="125"
                  rx="9"
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />

                {/* Forearms */}
                <path d="M 43 145 C 41 165, 45 185, 48 195 L 56 193 C 54 180, 56 160, 56 145 Z" fill="#1e293b" stroke="#334155" />
                <path d="M 157 145 C 159 165, 155 185, 152 195 L 144 193 C 146 180, 144 160, 144 145 Z" fill="#1e293b" stroke="#334155" />

                {/* Abs / Core (شکم و پهلو) */}
                <path
                  d="M 80 118 C 90 116, 110 116, 120 118 C 122 145, 118 165, 100 172 C 82 165, 78 145, 80 118 Z"
                  fill={selectedMuscle === 'core' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'core' ? '#34d399' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('core')}
                >
                  <title>شکم و ثبات کور (Abs / Core)</title>
                </path>

                {/* Quads Left & Right (چهارسر ران) */}
                <path
                  d="M 72 178 C 65 210, 68 245, 75 260 C 85 260, 95 240, 96 182 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران چپ</title>
                </path>
                <path
                  d="M 128 178 C 135 210, 132 245, 125 260 C 115 260, 105 240, 104 182 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران راست</title>
                </path>

                {/* Knees & Calves */}
                <circle cx="75" cy="268" r="7" fill="#334155" />
                <circle cx="125" cy="268" r="7" fill="#334155" />
                <path d="M 70 278 C 66 305, 68 335, 74 345 L 82 345 C 80 325, 82 300, 80 278 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
                <path d="M 130 278 C 134 305, 132 335, 126 345 L 118 345 C 120 325, 118 300, 120 278 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
              </g>
            )}

            {/* BACK VIEW ANATOMY */}
            {viewAngle === 'back' && (
              <g>
                {/* Traps & Upper Back (کول و بالای پشت) */}
                <path
                  d="M 85 58 L 100 68 L 115 58 L 135 75 L 100 115 L 65 75 Z"
                  fill={selectedMuscle === 'back' || selectedMuscle === 'shoulders' ? '#06b6d4' : '#334155'}
                  stroke="#475569"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>عضلات کول و ذوزنقه‌ای (Traps)</title>
                </path>

                {/* Lats Left & Right (زیربغل) */}
                <path
                  d="M 65 78 C 55 95, 58 135, 78 155 L 100 120 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل چپ (Latissimus Dorsi)</title>
                </path>
                <path
                  d="M 135 78 C 145 95, 142 135, 122 155 L 100 120 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل راست</title>
                </path>

                {/* Triceps Left & Right (پشت بازو) */}
                <ellipse
                  cx="50"
                  cy="125"
                  rx="9"
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />
                <ellipse
                  cx="150"
                  cy="125"
                  rx="9"
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />

                {/* Lower Back (کمر) */}
                <path d="M 80 152 L 120 152 L 115 175 L 85 175 Z" fill="#1e293b" stroke="#475569" />

                {/* Glutes (عضلات باسن) */}
                <ellipse
                  cx="83"
                  cy="195"
                  rx="18"
                  ry="18"
                  fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-amber-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>عضله باسن چپ (Gluteus)</title>
                </ellipse>
                <ellipse
                  cx="117"
                  cy="195"
                  rx="18"
                  ry="18"
                  fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-amber-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>عضله باسن راست (Gluteus)</title>
                </ellipse>

                {/* Hamstrings (پشت ران) */}
                <path
                  d="M 68 215 C 65 235, 68 255, 75 262 C 85 260, 92 245, 94 215 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke="#475569"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>همسترینگ چپ (پشت ران)</title>
                </path>
                <path
                  d="M 132 215 C 135 235, 132 255, 125 262 C 115 260, 108 245, 106 215 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke="#475569"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>همسترینگ راست (پشت ران)</title>
                </path>

                {/* Calves (ساق پا) */}
                <ellipse cx="75" cy="305" rx="10" ry="22" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="125" cy="305" rx="10" ry="22" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
              </g>
            )}
          </svg>
        </div>

        {/* Quick Muscle Selector Pills */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">گروه‌های عضلانی هدف:</span>
            <button
              onClick={() => onSelectMuscle('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedMuscle === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              نمایش همه عضلات
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {muscleList.map(m => {
              const isSelected = selectedMuscle === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMuscle(m.id)}
                  className={`p-2.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-white font-bold shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{m.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
