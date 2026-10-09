import React from 'react';
import {
  Activity,
  PhoneCall,
  Clock,
  Sparkles,
  Globe2,
  Menu,
  X,
  ShieldAlert,
  Flame,
  Settings,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { NepalTimeState } from '../utils/nepalTime';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  nepalTime: NepalTimeState;
  onOpenAi: () => void;
  onOpenKeySettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  nepalTime,
  onOpenAi,
  onOpenKeySettings,
}) => {
  const t = TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro emergency alert bar */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-teal-800 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <Clock className="w-3.5 h-3.5" />
            <span>
              {language === 'ne' ? 'काठमाडौं समय' : 'Kathmandu'}: {nepalTime.nepalTimeStr} |{' '}
              {nepalTime.dayNameNe} / {nepalTime.dayNameEn} ({nepalTime.bsMonth} {nepalTime.bsDay}, {nepalTime.bsYear} BS)
            </span>
          </span>
          {nepalTime.currentFestival && (
            <span className="hidden md:inline-flex items-center gap-1 bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-400/40">
              <Flame className="w-3 h-3 text-amber-300" />
              {language === 'ne' ? nepalTime.currentFestival.nameNe : nepalTime.currentFestival.nameEn}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 font-medium">
          <a
            href="tel:102"
            className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded text-[11px] transition-colors font-bold shadow-xs"
            title="Nepal Ambulance Service Dispatch"
          >
            <ShieldAlert className="w-3 h-3" />
            <span>{t.emergencyCall102}</span>
          </a>
          <a
            href="tel:1155"
            className="inline-flex items-center gap-1 bg-blue-600/80 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-[11px] transition-colors"
            title="Ministry of Health Hotline"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{t.hotline1155}</span>
          </a>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Tag */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  HealthPulse
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                  नेपाल
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'ne'
                  ? 'स्वास्थ्य तथा अस्पताल सञ्चालन पोर्टल'
                  : 'Hospital Status & Health Intelligence'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {t.navLiveStatus}
            </button>
            <button
              onClick={() => scrollToSection('directory')}
              className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {t.navDirectory}
            </button>
            <button
              onClick={() => scrollToSection('bipanna')}
              className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {t.navBipanna}
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {t.navDoctors}
            </button>
            <button
              onClick={() => scrollToSection('management')}
              className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {t.navManagement}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Bilingual toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'ne' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors shadow-2xs"
              title="Toggle English / नेपाली"
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {/* API Key Modal Button */}
            <button
              onClick={onOpenKeySettings}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              title={t.customApiKeyTitle}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* AI Assistant button */}
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm shadow-blue-500/25 hover:shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.navAiAssistant}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'ne' : 'en')}
              className="px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-700"
            >
              {language === 'en' ? 'ने' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            {t.navLiveStatus}
          </button>
          <button
            onClick={() => scrollToSection('directory')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            {t.navDirectory}
          </button>
          <button
            onClick={() => scrollToSection('bipanna')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            {t.navBipanna}
          </button>
          <button
            onClick={() => scrollToSection('doctors')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            {t.navDoctors}
          </button>
          <button
            onClick={() => scrollToSection('management')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            {t.navManagement}
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKeySettings();
              }}
              className="text-xs text-slate-600 border border-slate-200 px-3 py-2 rounded-lg"
            >
              API Key
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium text-xs py-2 rounded-lg shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.navAiAssistant}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
