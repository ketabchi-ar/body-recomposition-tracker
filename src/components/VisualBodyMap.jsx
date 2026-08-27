import React, { useState } from 'react';
import { User, Check, Dumbbell, Sparkles } from 'lucide-react';

export const VisualBodyMap = ({ selectedMuscle, onSelectMuscle, selectedEquipment, onSelectEquipment }) => {
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'back'
  const [gender, setGender] = useState('male'); // 'male' | 'female'

  const muscleList = [
    { id: 'chest', name: 'سینه (Chest)', view: 'front' },
    { id: 'shoulders', name: 'سرشانه و دلتوئید (Shoulders)', view: 'both' },
    { id: 'back', name: 'پشت و زیربغل (Lats & Back)', view: 'back' },
    { id: 'arms', name: 'جلو و پشت بازو (Arms)', view: 'both' },
    { id: 'core', name: 'شکم و پهلو (Abs & Core)', view: 'front' },
    { id: 'legs', name: 'چهارسر، باسن و همسترینگ (Legs & Glutes)', view: 'both' },
    { id: 'cardio', name: 'هوازی و کالیستنیکس (Cardio & Bodyweight)', view: 'both' }
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
              تفکیک گرافیکی آناتومی خانم‌ها و آقایان و فیلتر تجهیزات
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
              نمای روبرو (Front)
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
              آناتومی آقا (Male)
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                gender === 'female' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              آناتومی خانم (Female)
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-slate-400 font-bold ml-1 flex-shrink-0 flex items-center gap-1">
          <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
          <span>فیلتر تجهیزات:</span>
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
        <div className="md:col-span-6 flex flex-col items-center justify-center p-5 rounded-3xl bg-slate-950/80 border border-slate-850 relative min-h-[380px]">
          <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-500">
            {gender === 'male' ? 'آناتومی مردانه (هیکل V شکل و عضلانی)' : 'آناتومی زنانه (هیکل ساعت‌شنی و کشیده)'}
          </span>

          <svg viewBox="0 0 200 370" className="w-56 sm:w-64 h-auto drop-shadow-2xl select-none">
            {/* MALE FRONT */}
            {gender === 'male' && viewAngle === 'front' && (
              <g>
                {/* Head & Traps */}
                <circle cx="100" cy="32" r="18" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <path d="M 80 50 L 100 58 L 120 50 L 138 68 L 62 68 Z" fill="#334155" />
                
                {/* Broad Shoulders Left & Right */}
                <path
                  d="M 58 68 C 42 70, 36 88, 38 102 C 40 112, 50 114, 58 114 C 64 98, 66 84, 72 68 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه چپ (دلتوئید قدامی و جانبی)</title>
                </path>
                <path
                  d="M 142 68 C 158 70, 164 88, 162 102 C 160 112, 150 114, 142 114 C 136 98, 134 84, 128 68 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه راست (دلتوئید قدامی و جانبی)</title>
                </path>

                {/* Male Heavy Chest */}
                <path
                  d="M 72 68 C 84 66, 96 68, 100 72 C 104 68, 116 66, 128 68 C 134 94, 124 116, 100 118 C 76 116, 66 94, 72 68 Z"
                  fill={selectedMuscle === 'chest' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'chest' ? '#34d399' : '#475569'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('chest')}
                >
                  <title>عضلات سینه (Pectorals)</title>
                </path>

                {/* Male Arms (Biceps) */}
                <ellipse cx="44" cy="130" rx="12" ry="20" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />
                <ellipse cx="156" cy="130" rx="12" ry="20" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />

                {/* Forearms */}
                <path d="M 34 152 C 32 175, 36 195, 42 205 L 52 203 C 50 185, 52 165, 52 152 Z" fill="#1e293b" stroke="#334155" />
                <path d="M 166 152 C 168 175, 164 195, 158 205 L 148 203 C 150 185, 148 165, 148 152 Z" fill="#1e293b" stroke="#334155" />

                {/* Male 6-Pack Abs & Tapered Waist */}
                <path
                  d="M 76 122 C 86 120, 114 120, 124 122 C 126 155, 122 178, 100 185 C 78 178, 74 155, 76 122 Z"
                  fill={selectedMuscle === 'core' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'core' ? '#34d399' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('core')}
                >
                  <title>عضلات ۶ تکه شکم و کور</title>
                </path>

                {/* Male Massive Quads */}
                <path
                  d="M 70 190 C 60 225, 64 262, 74 275 C 86 275, 96 250, 98 194 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران چپ</title>
                </path>
                <path
                  d="M 130 190 C 140 225, 136 262, 126 275 C 114 275, 104 250, 102 194 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>چهارسر ران راست</title>
                </path>

                {/* Knees & Calves */}
                <circle cx="74" cy="282" r="6" fill="#334155" />
                <circle cx="126" cy="282" r="6" fill="#334155" />
                <path d="M 66 292 C 60 320, 64 348, 72 356 L 80 356 C 78 335, 80 310, 78 292 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
                <path d="M 134 292 C 140 320, 136 348, 128 356 L 120 356 C 122 335, 120 310, 122 292 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" onClick={() => onSelectMuscle('legs')} className="cursor-pointer" />
              </g>
            )}

            {/* FEMALE FRONT */}
            {gender === 'female' && viewAngle === 'front' && (
              <g>
                {/* Slender Head & Neck */}
                <circle cx="100" cy="32" r="15" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="95" y="47" width="10" height="15" rx="3" fill="#334155" />

                {/* Sleek Deltoids */}
                <path
                  d="M 68 62 C 54 64, 48 76, 50 88 C 52 96, 60 98, 66 98 C 70 86, 72 74, 76 62 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه خانم (دلتوئید)</title>
                </path>
                <path
                  d="M 132 62 C 146 64, 152 76, 150 88 C 148 96, 140 98, 134 98 C 130 86, 128 74, 124 62 Z"
                  fill={selectedMuscle === 'shoulders' ? '#f59e0b' : '#334155'}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => onSelectMuscle('shoulders')}
                >
                  <title>سرشانه خانم (دلتوئید)</title>
                </path>

                {/* Female Curved Chest */}
                <path
                  d="M 76 62 C 86 60, 96 62, 100 66 C 104 62, 114 60, 124 62 C 128 85, 118 105, 100 106 C 82 105, 72 85, 76 62 Z"
                  fill={selectedMuscle === 'chest' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'chest' ? '#34d399' : '#f43f5e'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('chest')}
                >
                  <title>عضلات سینه بانوان</title>
                </path>

                {/* Female Toned Arms */}
                <ellipse cx="54" cy="116" rx="8" ry="16" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />
                <ellipse cx="146" cy="116" rx="8" ry="16" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />

                {/* Hourglass Slim Waist & Flat Abs */}
                <path
                  d="M 82 108 C 88 106, 112 106, 118 108 C 114 135, 108 152, 100 156 C 92 152, 86 135, 82 108 Z"
                  fill={selectedMuscle === 'core' ? '#10b981' : '#1e293b'}
                  stroke={selectedMuscle === 'core' ? '#34d399' : '#f43f5e'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500/50"
                  onClick={() => onSelectMuscle('core')}
                >
                  <title>عضلات شکم و میان‌تنه باریک</title>
                </path>

                {/* Female Wider Curved Hips & Sculpted Legs */}
                <path
                  d="M 72 160 C 58 198, 62 245, 74 262 C 84 262, 94 235, 96 166 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>ران و لگن چپ</title>
                </path>
                <path
                  d="M 128 160 C 142 198, 138 245, 126 262 C 116 262, 106 235, 104 166 Z"
                  fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'}
                  stroke={selectedMuscle === 'legs' ? '#22d3ee' : '#475569'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-500/50"
                  onClick={() => onSelectMuscle('legs')}
                >
                  <title>ران و لگن راست</title>
                </path>

                {/* Slender Calves */}
                <ellipse cx="75" cy="300" rx="9" ry="24" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="125" cy="300" rx="9" ry="24" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
              </g>
            )}

            {/* MALE BACK */}
            {gender === 'male' && viewAngle === 'back' && (
              <g>
                {/* Traps & V-Back */}
                <path
                  d="M 80 50 L 100 62 L 120 50 L 145 74 L 100 120 L 55 74 Z"
                  fill={selectedMuscle === 'back' || selectedMuscle === 'shoulders' ? '#06b6d4' : '#334155'}
                  stroke="#475569"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>کول و عضلات ذوزنقه‌ای مردانه</title>
                </path>

                {/* Wide Lats */}
                <path
                  d="M 55 76 C 40 96, 46 142, 74 162 L 100 125 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل چپ</title>
                </path>
                <path
                  d="M 145 76 C 160 96, 154 142, 126 162 L 100 125 Z"
                  fill={selectedMuscle === 'back' ? '#10b981' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-emerald-500"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>زیربغل راست</title>
                </path>

                {/* Triceps */}
                <ellipse cx="44" cy="130" rx="12" ry="20" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />
                <ellipse cx="156" cy="130" rx="12" ry="20" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />

                {/* Male Glutes */}
                <ellipse cx="80" cy="202" rx="19" ry="20" fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" className="cursor-pointer hover:fill-amber-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="120" cy="202" rx="19" ry="20" fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" className="cursor-pointer hover:fill-amber-400" onClick={() => onSelectMuscle('legs')} />

                {/* Hamstrings & Calves */}
                <path d="M 66 226 C 62 248, 66 270, 74 278 C 84 276, 92 258, 94 226 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <path d="M 134 226 C 138 248, 134 270, 126 278 C 116 276, 108 258, 106 226 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="74" cy="318" rx="12" ry="24" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <ellipse cx="126" cy="318" rx="12" ry="24" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
              </g>
            )}

            {/* FEMALE BACK */}
            {gender === 'female' && viewAngle === 'back' && (
              <g>
                {/* Slender Upper Back */}
                <path
                  d="M 84 55 L 100 65 L 116 55 L 136 72 L 100 110 L 64 72 Z"
                  fill={selectedMuscle === 'back' || selectedMuscle === 'shoulders' ? '#06b6d4' : '#334155'}
                  stroke="#475569"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:fill-cyan-400"
                  onClick={() => onSelectMuscle('back')}
                >
                  <title>بالای پشت و کول بانوان</title>
                </path>

                {/* Toned Triceps */}
                <ellipse cx="54" cy="116" rx="8" ry="16" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />
                <ellipse cx="146" cy="116" rx="8" ry="16" fill={selectedMuscle === 'arms' ? '#6366f1' : '#334155'} className="cursor-pointer hover:fill-indigo-400" onClick={() => onSelectMuscle('arms')} />

                {/* Female Pronounced Glutes (عضلات سرینی برجسته بانوان) */}
                <ellipse cx="78" cy="190" rx="22" ry="24" fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" className="cursor-pointer hover:fill-amber-400" onClick={() => onSelectMuscle('legs')}>
                  <title>عضله باسن چپ بانوان (Glutes)</title>
                </ellipse>
                <ellipse cx="122" cy="190" rx="22" ry="24" fill={selectedMuscle === 'legs' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" className="cursor-pointer hover:fill-amber-400" onClick={() => onSelectMuscle('legs')}>
                  <title>عضله باسن راست بانوان (Glutes)</title>
                </ellipse>

                {/* Slender Hamstrings & Calves */}
                <path d="M 68 218 C 65 240, 68 260, 76 268 C 86 266, 92 248, 94 218 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
                <path d="M 132 218 C 135 240, 132 260, 124 268 C 114 266, 108 248, 106 218 Z" fill={selectedMuscle === 'legs' ? '#06b6d4' : '#1e293b'} stroke="#475569" className="cursor-pointer hover:fill-cyan-400" onClick={() => onSelectMuscle('legs')} />
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
