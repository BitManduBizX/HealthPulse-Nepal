import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { HeroStatusChecker } from './components/HeroStatusChecker';
import { HospitalDirectory } from './components/HospitalDirectory';
import { HospitalModal } from './components/HospitalModal';
import { BipannaKoshPortal } from './components/BipannaKoshPortal';
import { KnowledgeCenter } from './components/KnowledgeCenter';
import { AiAssistant } from './components/AiAssistant';
import { Footer } from './components/Footer';
import { HOSPITALS_DATA } from './data/hospitalsData';
import { Hospital, Province } from './types';
import { Language } from './translations';
import { getNepalTime, NepalTimeState } from './utils/nepalTime';

export default function App() {
  // Language State
  const [language, setLanguage] = React.useState<Language>('en');

  // Time & Simulator State
  const [simulatorMode, setSimulatorMode] = React.useState<string>('real');
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedProvince, setSelectedProvince] = React.useState<Province | 'all'>('all');

  // Modal State
  const [activeHospital, setActiveHospital] = React.useState<Hospital | null>(null);

  // AI Assistant Drawer State
  const [aiAssistantOpen, setAiAssistantOpen] = React.useState<boolean>(false);
  const [keySettingsOpen, setKeySettingsOpen] = React.useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = React.useState<string>(() => {
    return (
      localStorage.getItem('healthpulse_custom_gemini_key') ||
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      ''
    );
  });

  // Clock tick every minute when in real mode
  React.useEffect(() => {
    if (simulatorMode === 'real') {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [simulatorMode]);

  // Handle Simulator date calculation
  const effectiveNepalTime: NepalTimeState = React.useMemo(() => {
    if (simulatorMode === 'real') {
      return getNepalTime(currentTime);
    }

    // Fixed test dates for simulations
    // 2026-10-08 is a Thursday (Weekday)
    // 2026-10-10 is a Saturday (Weekly Holiday)
    if (simulatorMode === 'weekday_open') {
      // 11:30 AM on Thursday
      const testDate = new Date('2026-10-08T11:30:00+05:45');
      return getNepalTime(testDate);
    }
    if (simulatorMode === 'weekday_closing') {
      // 2:30 PM on Thursday
      const testDate = new Date('2026-10-08T14:30:00+05:45');
      return getNepalTime(testDate);
    }
    if (simulatorMode === 'weekday_night') {
      // 8:30 PM on Thursday
      const testDate = new Date('2026-10-08T20:30:00+05:45');
      return getNepalTime(testDate);
    }
    if (simulatorMode === 'saturday') {
      // 11:00 AM on Saturday
      const testDate = new Date('2026-10-10T11:00:00+05:45');
      return getNepalTime(testDate);
    }
    if (simulatorMode === 'dashain') {
      // Dashain festival test date
      const testDate = new Date('2026-10-12T10:00:00+05:45');
      const timeState = getNepalTime(testDate);
      timeState.currentFestival = {
        nameEn: 'Maha Nawami / Dashain Festival (बडा दशैं)',
        nameNe: 'बडा दशैं / महानवमी राष्ट्रिय विदा',
        isHoliday: true,
      };
      return timeState;
    }

    return getNepalTime();
  }, [simulatorMode, currentTime]);

  const handleSaveCustomApiKey = (key: string) => {
    setCustomApiKey(key);
    if (key) {
      localStorage.setItem('healthpulse_custom_gemini_key', key);
    } else {
      localStorage.removeItem('healthpulse_custom_gemini_key');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {/* Navigation Header */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          nepalTime={effectiveNepalTime}
          onOpenAi={() => setAiAssistantOpen(true)}
          onOpenKeySettings={() => setKeySettingsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Module 1: Hero Section & Real-Time Status Checker */}
          <HeroStatusChecker
            language={language}
            nepalTime={effectiveNepalTime}
            hospitals={HOSPITALS_DATA}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            simulatorMode={simulatorMode}
            onSimulatorChange={setSimulatorMode}
            onQuickSelectHospital={(hosp) => setActiveHospital(hosp)}
          />

          {/* Module 2: Comprehensive Hospital Directory & Classification */}
          <HospitalDirectory
            language={language}
            nepalTime={effectiveNepalTime}
            hospitals={HOSPITALS_DATA}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectHospital={(hosp) => setActiveHospital(hosp)}
          />

          {/* Module 3: Bipanna Nagarik Upachar Kosh Portal */}
          <BipannaKoshPortal
            language={language}
            hospitals={HOSPITALS_DATA}
            onSelectHospital={(hosp) => setActiveHospital(hosp)}
          />

          {/* Module 4: Top Doctors & Hospital Management Knowledge Center */}
          <KnowledgeCenter language={language} />
        </main>

        {/* Hospital Detail Modal */}
        <HospitalModal
          hospital={activeHospital}
          onClose={() => setActiveHospital(null)}
          language={language}
          nepalTime={effectiveNepalTime}
        />

        {/* Module 5: Integrated Gemini AI Health Assistant & FAB */}
        <AiAssistant
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(!aiAssistantOpen)}
          language={language}
          customApiKey={customApiKey}
          onSaveCustomApiKey={handleSaveCustomApiKey}
          keySettingsOpen={keySettingsOpen}
          onCloseKeySettings={() => setKeySettingsOpen(false)}
        />

        {/* Footer */}
        <Footer language={language} />
      </div>
    </ErrorBoundary>
  );
}
