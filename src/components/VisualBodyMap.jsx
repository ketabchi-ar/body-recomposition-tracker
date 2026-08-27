import React, { useState } from 'react';
import { User, Check, Dumbbell, Sparkles } from 'lucide-react';

export const VisualBodyMap = ({ selectedMuscle, onSelectMuscle, selectedEquipment, onSelectEquipment }) => {
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'back'
  const [gender, setGender] = useState('male'); // 'male' | 'female'

  const muscleList = [
    { id: 'chest', name: 'سینه (Chest)', view: 'front' },
    { id: 'shoulders', name: 'سرشانه و دلتوئید (Shoulders)', view: 'both' },
    { id: 'back', name: 'پشت و زیربغل (Lats & Back)', view: 'back' },
    { id: 'arms', name: 'جلو و پشت بازو (Arms / Biceps & Triceps)', view: 'both' },
    { id: 'core', name: 'شکم و پهلو (Abs & Obliques)', view: 'front' },
    { id: 'legs', name: 'پا، باسن و همسترینگ (Legs & Glutes)', view: 'both' },
    { id: 'cardio', name: 'کاردیو و هوازی (Cardio & Aerobics)', view: 'both' }
  ];

  const equipmentList = [
    { id: 'all', name: 'همه تجهیزات' },
    { id: 'dumbbell', name: 'دمبل (Dumbbell)' },
    { id: 'barbell', name: 'هالتر (Barbell)' },
    { id: 'cable', name: 'سیم‌کش (Cable)' },
    { id: 'machine', name: 'دستگاه (Machine)' },
    { id: 'bodyweight', name: 'وزن بدن / کالیستنیکس' },
    { id: 'band', name: 'کش تمرینی (Bands)' },
    { id: 'home', name: 'تمرین در خانه' }
  ];

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">
              نقشه آناتومی عضلات بدن (MuscleWiki Visual Map)
            </h3>
            <p className="text-[11px] text-slate-400">
              روی هر عضله کلیک کنید تا تمرینات اختصاصی آن ناحیه فیلتر شود
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Angle Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewAngle('front')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewAngle === 'front' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              نمای جلو (Front)
            </button>
            <button
              onClick={() => setViewAngle('back')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
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
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                gender === 'male' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              مدل آقا (Male)
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                gender === 'female' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              مدل خانم (Female)
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-slate-400 font-bold ml-1 flex-shrink-0 flex items-center gap-1">
          <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
          <span>تجهیزات:</span>
        </span>
        {equipmentList.map(eq => (
          <button
            key={eq.id}
            onClick={() => onSelectEquipment && onSelectEquipment(eq.id)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              selectedEquipment === eq.id
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {eq.name}
          </button>
        ))}
      </div>

      {/* Main Anatomy Viewer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-2">
        
        {/* SVG Interactive Anatomical Body */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-5 rounded-3xl bg-slate-950/80 border border-slate-850 relative min-h-[360px]">
          <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-500">
            {gender === 'male' ? 'آناتومی مردانه' : 'آناتومی زنانه'} • {viewAngle === 'front' ? 'روبرو' : 'پشت'}
          </span>

          <svg viewBox="0 0 200 360" className="w-52 sm:w-60 h-auto drop-shadow-2xl select-none">
            {/* Head & Neck */}
            <circle cx="100" cy="35" r={gender === 'male' ? '18' : '16'} fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="93" y="52" width="14" height="15" rx="3" fill="#334155" />

            {/* FRONT VIEW */}
            {viewAngle === 'front' && (
              <g>
                {/* Trapezius */}
                <path d="M 85 55 L 100 62 L 115 55 L 125 68 L 75 68 Z" fill="#334155" />

                {/* Shoulders Left & Right */}
                <path
                  d={gender === 'male' 
                    ? "M 62 70 C 50 72, 44 85, 44 98 C 44 108, 52 110, 60 110 C 66 95, 68 82, 74 70 Z"
                    : "M 66 70 C 56 72, 50 82, 50 94 C 50 102, 56 106, 62 106 C 68 94, 70 82, 75 70 Z"}
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>عضله دلتوئید قدامی و جانبی چپ</title>
                </path>
                <path
                  d={gender === 'male'
                    ? "M 138 70 C 150 72, 156 85, 156 98 C 156 108, 148 110, 140 110 C 134 95, 132 82, 126 70 Z"
                    : "M 134 70 C 144 72, 150 82, 150 94 C 150 102, 144 106, 138 106 C 132 94, 130 82, 125 70 Z"}
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>عضله دلتوئید قدامی و جانبی راست</title>
                </path>

                {/* Chest (سینه) */}
                <path
                  d={gender === 'male'
                    ? "M 74 70 C 85 68, 95 70, 100 74 C 105 70, 115 68, 126 70 C 130 92, 122 112, 100 115 C 78 112, 70 92, 74 70 Z"
                    : "M 75 70 C 85 68, 95 70, 100 74 C 105 70, 115 68, 125 70 C 128 92, 120 110, 100 112 C 80 110, 72 92, 75 70 Z"}
                  fill={selectedMuscle === 'chest' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'chest' ? '#34d399' : '#475569'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('chest')}
                >
                  <title>عضلات سینه (Pectorals)</title>
                </path>

                {/* Biceps Left & Right */}
                <ellipse
                  cx={gender === 'male' ? "48" : "52"}
                  cy="125"
                  rx={gender === 'male' ? "10" : "8"}
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />
                <ellipse
                  cx={gender === 'male' ? "152" : "148"}
                  cy="125"
                  rx={gender === 'male' ? "10" : "8"}
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />

                {/* Forearms */}
                <path d="M 40 145 C 38 165, 42 185, 45 195 L 54 193 C 52 180, 54 160, 54 145 Z" fill="#1e293b" stroke="#334155" />
                <path d="M 160 145 C 162 165, 158 185, 155 195 L 146 193 C 148 180, 146 160, 146 145 Z" fill="#1e293b" stroke="#334155" />

                {/* Abs / Core (شکم و مایل شکمی) */}
                <path
                  d={gender === 'male'
                    ? "M 78 118 C 88 116, 112 116, 122 118 C 124 145, 120 165, 100 172 C 80 165, 76 145, 78 118 Z"
                    : "M 80 115 C 88 114, 112 114, 120 115 C 120 138, 116 155, 100 162 C 84 155, 80 138, 80 115 Z"}
                  fill={selectedMuscle === 'core' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'core' ? '#34d399' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('core')}
                >
                  <title>شکم و ثبات کور (Rectus Abdominis)</title>
                </path>

                {/* Quads Left & Right (چهارسر ران) */}
                <path
                  d={gender === 'male'
                    ? "M 72 178 C 65 210, 68 245, 75 260 C 85 260, 95 240, 96 182 Z"
                    : "M 70 168 C 62 205, 66 242, 74 258 C 84 258, 95 238, 96 172 Z"}
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران چپ (Quadriceps)</title>
                </path>
                <path
                  d={gender === 'male'
                    ? "M 128 178 C 135 210, 132 245, 125 260 C 115 260, 105 240, 104 182 Z"
                    : "M 130 168 C 138 205, 134 242, 126 258 C 116 258, 105 238, 104 172 Z"}
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران راست (Quadriceps)</title>
                </path>

                {/* Knees & Calves */}
                <circle cx="75" cy="268" r="6" fill="#334155" />
                <circle cx="125" cy="268" r="6" fill="#334155" />
                <path d="M 68 278 C 64 305, 66 335, 72 345 L 80 345 C 78 325, 80 300, 78 278 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
                <path d="M 132 278 C 136 305, 134 335, 128 345 L 120 345 C 122 325, 120 300, 122 278 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
              </g>
            )}

            {/* BACK VIEW */}
            {viewAngle === 'back' && (
              <g>
                {/* Traps & Upper Back (ذوزنقه‌ای و بالای پشت) */}
                <path
                  d="M 85 55 L 100 65 L 115 55 L 138 75 L 100 118 L 62 75 Z"
                  fill={selectedMuscle === 'back' || selectedMuscle === 'shoulders' ? '#06b6d4' : '#334155'}
                  stroke="#475569"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>عضلات کول و ذوزنقه‌ای (Trapezius)</title>
                </path>

                {/* Lats Left & Right (زیربغل) */}
                <path
                  d="M 62 78 C 50 95, 54 135, 78 155 L 100 120 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل چپ (Latissimus Dorsi)</title>
                </path>
                <path
                  d="M 138 78 C 150 95, 146 135, 122 155 L 100 120 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل راست (Latissimus Dorsi)</title>
                </path>

                {/* Triceps Left & Right (پشت بازو) */}
                <ellipse
                  cx={gender === 'male' ? "48" : "52"}
                  cy="125"
                  rx={gender === 'male' ? "10" : "8"}
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />
                <ellipse
                  cx={gender === 'male' ? "152" : "148"}
                  cy="125"
                  rx={gender === 'male' ? "10" : "8"}
                  ry="18"
                  fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'}
                  className="cursor-pointer transition-all hover:fill-indigo-400"
                  onClick={() => onSelectMuscle('arms')}
                />

                {/* Lower Back */}
                <path d="M 80 152 L 120 152 L 115 175 L 85 175 Z" fill="#1e293b" stroke="#475569" />

                {/* Glutes (عضلات باسن) */}
                <ellipse
                  cx={gender === 'male' ? "83" : "80"}
                  cy={gender === 'male' ? "195" : "190"}
                  rx={gender === 'male' ? "18" : "22"}
                  ry={gender === 'male' ? "18" : "22"}
                  fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-amber-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>عضله باسن چپ (Gluteus Maximus)</title>
                </ellipse>
                <ellipse
                  cx={gender === 'male' ? "117" : "120"}
                  cy={gender === 'male' ? "195" : "190"}
                  rx={gender === 'male' ? "18" : "22"}
                  ry={gender === 'male' ? "18" : "22"}
                  fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-amber-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>عضله باسن راست (Gluteus Maximus)</title>
                </ellipse>

                {/* Hamstrings (پشت ران) */}
                <path
                  d="M 68 215 C 65 235, 68 255, 75 262 C 85 260, 92 245, 94 215 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke="#475569"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>همسترینگ چپ (Hamstrings)</title>
                </path>
                <path
                  d="M 132 215 C 135 235, 132 255, 125 262 C 115 260, 108 245, 106 215 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke="#475569"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>همسترینگ راست (Hamstrings)</title>
                </path>

                {/* Calves (ساق پا) */}
                <ellipse cx="75" cy="305" rx="11" ry="22" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="125" cy="305" rx="11" ry="22" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
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
                  className={`p-3 rounded-2xl border text-right transition flex items-center justify-between ${
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
