import React from 'react';
import {
  Activity,
  PhoneCall,
  ShieldAlert,
  Heart,
  Globe2,
  ExternalLink,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Emergency Hotlines Bar */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-white font-extrabold text-base flex items-center justify-center md:justify-start gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span>{t.quickEmergency}</span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'ne'
                ? 'नेपालभर चौबीसै घण्टा निःशुल्क सेवा उपलब्ध आपतकालीन नम्बरहरू:'
                : 'Free national emergency toll-free dispatch numbers across Nepal (24/7):'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:102"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <span>१०२ (102)</span>
              <span className="text-[11px] font-normal opacity-90">• Ambulance</span>
            </a>
            <a
              href="tel:100"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <span>१०० (100)</span>
              <span className="text-[11px] font-normal opacity-90">• Police</span>
            </a>
            <a
              href="tel:101"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <span>१०१ (101)</span>
              <span className="text-[11px] font-normal opacity-90">• Fire Service</span>
            </a>
            <a
              href="tel:1155"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600/90 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <span>११५५ (1155)</span>
              <span className="text-[11px] font-normal opacity-90">• MoHP Health Line</span>
            </a>
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">
                HealthPulse Nepal
              </span>
              <span className="text-[10px] bg-teal-900 text-teal-300 px-2 py-0.5 rounded font-bold">
                स्वास्थ्यसेवा नेपाल
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-normal max-w-md">
              {language === 'ne'
                ? 'नेपालका नागरिक, पर्यटक तथा स्वास्थ्यकर्मीहरूका लागि वास्तविक समयमा अस्पताल सञ्चालन स्थिति, ओपीडी विवरण, विपन्न नागरिक उपचार कोष र स्वास्थ्य जानकारी प्रदान गर्ने एकीकृत प्लेटफर्म।'
                : 'A dedicated healthcare intelligence portal simplifying hospital operating hours, Bipanna Nagarik Upachar Kosh relief, and specialist directories across all 7 provinces of Nepal.'}
            </p>
          </div>

          {/* Official Resources */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ne' ? 'आधिकारिक स्रोतहरू' : 'Official Resources'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://mohp.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>MoHP Nepal (स्वास्थ्य मन्त्रालय)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dohs.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>DoHS (स्वास्थ्य सेवा विभाग)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nmc.org.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Nepal Medical Council (NMC)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nhrc.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>NHRC Health Research Council</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Portal Navigation */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ne' ? 'छिटो पहुँच' : 'Quick Access'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors">
                  {t.navLiveStatus}
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-blue-400 transition-colors">
                  {t.navDirectory}
                </a>
              </li>
              <li>
                <a href="#bipanna" className="hover:text-blue-400 transition-colors">
                  {t.navBipanna}
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-blue-400 transition-colors">
                  {t.navDoctors}
                </a>
              </li>
              <li>
                <a href="#management" className="hover:text-blue-400 transition-colors">
                  {t.navManagement}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl leading-relaxed">
            {t.footerDisclaimer}
          </p>
          <div className="shrink-0 text-slate-400 font-medium">
            © 2026 HealthPulse Nepal. Built for public good.
          </div>
        </div>
      </div>
    </footer>
  );
};
