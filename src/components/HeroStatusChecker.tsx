import React from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  SlidersHorizontal,
  Building2,
  HeartPulse,
  Flame,
  CalendarCheck2,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { Province, Hospital } from '../types';
import { NepalTimeState, evaluateHospitalOperatingStatus } from '../utils/nepalTime';

interface HeroStatusCheckerProps {
  language: Language;
  nepalTime: NepalTimeState;
  hospitals: Hospital[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProvince: Province | 'all';
  onProvinceChange: (province: Province | 'all') => void;
  simulatorMode: string;
  onSimulatorChange: (mode: string) => void;
  onQuickSelectHospital: (hospital: Hospital) => void;
}

const PROVINCES_LIST: { id: Province | 'all'; en: string; ne: string }[] = [
  { id: 'all', en: 'All 7 Provinces', ne: 'सबै ७ प्रदेश' },
  { id: 'Bagmati', en: 'Bagmati (Kathmandu)', ne: 'बागमती (काठमाडौं)' },
  { id: 'Koshi', en: 'Koshi (Biratnagar/Dharan)', ne: 'कोशी (विराटनगर/धरान)' },
  { id: 'Madhesh', en: 'Madhesh (Janakpur/Birgunj)', ne: 'मधेश (जनकपुर/वीरगन्ज)' },
  { id: 'Gandaki', en: 'Gandaki (Pokhara)', ne: 'गण्डकी (पोखरा)' },
  { id: 'Lumbini', en: 'Lumbini (Butwal/Nepalgunj)', ne: 'लुम्बिनी (बुटवल/नेपालगन्ज)' },
  { id: 'Karnali', en: 'Karnali (Surkhet/Jumla)', ne: 'कर्णाली (सुर्खेत/जुम्ला)' },
  { id: 'Sudurpashchim', en: 'Sudurpashchim (Dhangadhi)', ne: 'सुदूरपश्चिम (धनगढी)' },
];

export const HeroStatusChecker: React.FC<HeroStatusCheckerProps> = ({
  language,
  nepalTime,
  hospitals,
  searchQuery,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  simulatorMode,
  onSimulatorChange,
  onQuickSelectHospital,
}) => {
  const t = TRANSLATIONS[language];

  // Calculate live statistics
  const statusStats = React.useMemo(() => {
    let openCount = 0;
    let emergencyCount = 0;
    let bipannaCount = 0;

    hospitals.forEach((h) => {
      const status = evaluateHospitalOperatingStatus(h, nepalTime);
      if (status.status === 'open_opd' || status.status === 'closing_soon') {
        openCount++;
      }
      if (h.emergency24x7) emergencyCount++;
      if (h.bipannaFundAccepted) bipannaCount++;
    });

    return {
      total: hospitals.length,
      openCount,
      emergencyCount,
      bipannaCount,
    };
  }, [hospitals, nepalTime]);

  return (
    <section id="hero" className="relative pt-8 pb-12 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/60">
      {/* Background Subtle Tech/Medical Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-400/10 via-teal-300/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Festival / Holiday Banner if active */}
        {nepalTime.currentFestival && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-900">
                  {language === 'ne' ? nepalTime.currentFestival.nameNe : nepalTime.currentFestival.nameEn}
                </h4>
                <p className="text-xs text-amber-800">
                  {language === 'ne'
                    ? 'चाडपर्व बिदाको समयमा सरकारी अस्पतालहरूको ओपीडी बन्द रहन सक्छ, तर आकस्मिक (Emergency) र ट्रमा २४सै घण्टा खुला रहन्छन्।'
                    : 'Government hospital OPD clinics observe festival holiday schedules. Emergency and Intensive Care units remain 24/7 fully active.'}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              {language === 'ne' ? 'आकस्मिक २४/७ खुला' : '24/7 Emergency Ready'}
            </span>
          </div>
        )}

        {/* Saturday Banner if Saturday and not festival */}
        {nepalTime.isSaturday && !nepalTime.currentFestival && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
                <CalendarCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-900">
                  {language === 'ne' ? 'शनिवार साप्ताहिक बिदा सूचना' : 'Saturday Weekly Holiday Advisory'}
                </h4>
                <p className="text-xs text-amber-800">
                  {language === 'ne'
                    ? 'सरकारी अस्पतालका नियमित ओपीडी बन्द छन्। वीर, गंगालाल, कान्ति, पाटन र ट्रमा सेन्टरका आकस्मिक सेवाहरू २४सै घण्टा सञ्चालित छन्।'
                    : 'Government hospital routine OPDs are closed on Saturdays. Emergency triage, Trauma, and ICU operate 24/7 uninterrupted.'}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              {language === 'ne' ? 'इमर्जेन्सी २४सै घण्टा खुला' : 'Emergency 24/7 Active'}
            </span>
          </div>
        )}

        {/* Main Hero Header Title */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold tracking-wide border border-blue-200">
            <HeartPulse className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>{language === 'ne' ? 'नेपालको राष्ट्रिय अस्पताल सञ्चालन ट्रयाकर' : "Nepal's Real-Time Hospital Status Tracker"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {language === 'ne' ? (
              <>
                के तपाईँको अस्पताल <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">आज खुला छ?</span>
              </>
            ) : (
              <>
                Is Your Hospital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">Open Today?</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.heroDescription}
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-blue-900/5 border-2 border-blue-500/30 hover:border-blue-500 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all p-2">
            <div className="pl-3 pr-2 text-blue-600">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-hidden py-2"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-3 py-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Province Filter Pills */}
        <div className="mt-5 flex items-center justify-center gap-1.5 flex-wrap max-w-4xl mx-auto">
          {PROVINCES_LIST.map((prov) => {
            const isSelected = selectedProvince === prov.id;
            return (
              <button
                key={prov.id}
                onClick={() => onProvinceChange(prov.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-xs shadow-blue-600/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {language === 'ne' ? prov.ne : prov.en}
              </button>
            );
          })}
        </div>

        {/* Real-time Status Counters Grid */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{statusStats.total}</div>
              <div className="text-xs font-semibold text-slate-500">
                {language === 'ne' ? 'कुल अस्पतालहरू' : 'Tracked Hospitals'}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">{statusStats.openCount}</div>
              <div className="text-xs font-semibold text-slate-500">
                {language === 'ne' ? 'हाल ओपीडी खुला' : 'OPD Open Now'}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="p-3 bg-red-50 text-red-700 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-red-600">{statusStats.emergencyCount}</div>
              <div className="text-xs font-semibold text-slate-500">
                {language === 'ne' ? '२४/७ आकस्मिक केन्द्र' : '24/7 Emergency'}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5">
            <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-teal-700">{statusStats.bipannaCount}</div>
              <div className="text-xs font-semibold text-slate-500">
                {language === 'ne' ? 'विपन्न कोष स्वीकृत' : 'Bipanna Fund Hubs'}
              </div>
            </div>
          </div>
        </div>

        {/* Time Simulator Bar (Allows instant testing of all schedule permutations!) */}
        <div className="mt-8 p-3.5 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>{t.simulateTitle}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'real', label: t.simReal },
              { id: 'weekday_open', label: t.simWeekdayDay },
              { id: 'weekday_closing', label: t.simWeekdayClosing },
              { id: 'weekday_night', label: t.simWeekdayNight },
              { id: 'saturday', label: t.simSaturday },
              { id: 'dashain', label: t.simDashain },
            ].map((sim) => (
              <button
                key={sim.id}
                onClick={() => onSimulatorChange(sim.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  simulatorMode === sim.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sim.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
