import React from 'react';
import { TrackerProvider, useTracker } from './context/TrackerContext';
import { Header } from './components/Header';
import { WorkoutSection } from './components/WorkoutSection';
import { DietSection } from './components/DietSection';
import { WeeklyScheduleSection } from './components/WeeklyScheduleSection';
import { ErgonomicsSection } from './components/ErgonomicsSection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { VideoModal } from './components/VideoModal';
import { RestTimerFloat } from './components/RestTimerFloat';

const MainContent = () => {
  const { activeTab } = useTracker();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {activeTab === 'workout' && <WorkoutSection />}
      {activeTab === 'diet' && <DietSection />}
      {activeTab === 'schedule' && <WeeklyScheduleSection />}
      {activeTab === 'ergo' && <ErgonomicsSection />}
      {activeTab === 'stats' && <ProgressDashboard />}
    </main>
  );
};

export function App() {
  return (
    <TrackerProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col" dir="rtl">
        <Header />
        <div className="flex-1">
          <MainContent />
        </div>
        <VideoModal />
        <RestTimerFloat />
      </div>
    </TrackerProvider>
  );
}

export default App;
