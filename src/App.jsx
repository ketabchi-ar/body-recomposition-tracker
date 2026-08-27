import React from 'react';
import { TrackerProvider, useTracker } from './context/TrackerContext';
import { Header } from './components/Header';
import { WorkoutSection } from './components/WorkoutSection';
import { DietSection } from './components/DietSection';
import { WeeklyScheduleSection } from './components/WeeklyScheduleSection';
import { ProgramBuilder } from './components/ProgramBuilder';
import { ErgonomicsSection } from './components/ErgonomicsSection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { VideoModal } from './components/VideoModal';
import { SubstituteModal } from './components/SubstituteModal';
import { AICoachModal } from './components/AICoachModal';
import { FocusModeModal } from './components/FocusModeModal';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { SettingsModal } from './components/SettingsModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AIPlanGeneratorModal } from './components/AIPlanGeneratorModal';
import { RestTimerFloat } from './components/RestTimerFloat';

const MainContent = () => {
  const { activeTab } = useTracker();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {activeTab === 'workout' && <WorkoutSection />}
      {activeTab === 'diet' && <DietSection />}
      {activeTab === 'schedule' && <WeeklyScheduleSection />}
      {activeTab === 'builder' && <ProgramBuilder />}
      {activeTab === 'ergo' && <ErgonomicsSection />}
      {activeTab === 'stats' && <ProgressDashboard />}
    </main>
  );
};

export function App() {
  const { isAIPlanGenOpen, setIsAIPlanGenOpen } = useTracker ? {} : {};

  return (
    <TrackerProvider>
      <AppContent />
    </TrackerProvider>
  );
}

const AppContent = () => {
  const { isAIPlanGenOpen, setIsAIPlanGenOpen } = useTracker();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col" dir="rtl">
      <Header />
      <div className="flex-1">
        <MainContent />
      </div>
      
      {/* Modals & Overlays */}
      <VideoModal />
      <SubstituteModal />
      <AICoachModal />
      <FocusModeModal />
      <GoogleDriveSyncModal />
      <SettingsModal />
      <OnboardingModal />
      <AIPlanGeneratorModal isOpen={isAIPlanGenOpen} onClose={() => setIsAIPlanGenOpen(false)} />
      <RestTimerFloat />
    </div>
  );
};

export default App;
