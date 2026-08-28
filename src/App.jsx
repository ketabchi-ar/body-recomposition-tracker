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
import { HealthSyncModal } from './components/HealthSyncModal';
import { RestTimerFloat } from './components/RestTimerFloat';
import { StickySessionBar } from './components/StickySessionBar';
import { AIFoodScannerModal } from './components/AIFoodScannerModal';
import { WorkoutSummaryCardModal } from './components/WorkoutSummaryCardModal';

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
  return (
    <TrackerProvider>
      <AppContent />
    </TrackerProvider>
  );
}

const AppContent = () => {
  const { 
    isAIPlanGenOpen, 
    setIsAIPlanGenOpen, 
    isHealthSyncOpen, 
    setIsHealthSyncOpen, 
    isFoodScannerOpen,
    setIsFoodScannerOpen,
    isStoryCardOpen,
    setIsStoryCardOpen,
    toastMessage 
  } = useTracker();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col relative pb-16" dir="rtl">
      <Header />
      <div className="flex-1">
        <MainContent />
      </div>

      {/* Sticky Mobile/Desktop Session Progress Bar */}
      <StickySessionBar onOpenStoryCard={() => setIsStoryCardOpen(true)} />

      {/* Floating Celebration Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-emerald-500/30 animate-bounce flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Modals & Overlays */}
      <VideoModal />
      <SubstituteModal />
      <AICoachModal />
      <FocusModeModal />
      <GoogleDriveSyncModal />
      <HealthSyncModal isOpen={isHealthSyncOpen} onClose={() => setIsHealthSyncOpen(false)} />
      <AIFoodScannerModal isOpen={isFoodScannerOpen} onClose={() => setIsFoodScannerOpen(false)} />
      <WorkoutSummaryCardModal isOpen={isStoryCardOpen} onClose={() => setIsStoryCardOpen(false)} />
      <SettingsModal />
      <OnboardingModal />
      <AIPlanGeneratorModal isOpen={isAIPlanGenOpen} onClose={() => setIsAIPlanGenOpen(false)} />
      <RestTimerFloat />
    </div>
  );
};

export default App;
