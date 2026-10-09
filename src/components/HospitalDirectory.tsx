import React from 'react';
import {
  Building2,
  Phone,
  MapPin,
  ExternalLink,
  Clock,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2,
  SlidersHorizontal,
  Bed,
  Droplet,
  Info,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { Hospital, HospitalCategory, Province } from '../types';
import { NepalTimeState, evaluateHospitalOperatingStatus } from '../utils/nepalTime';

interface HospitalDirectoryProps {
  language: Language;
  nepalTime: NepalTimeState;
  hospitals: Hospital[];
  selectedProvince: Province | 'all';
  onProvinceChange: (province: Province | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectHospital: (hospital: Hospital) => void;
}

export const HospitalDirectory: React.FC<HospitalDirectoryProps> = ({
  language,
  nepalTime,
  hospitals,
  selectedProvince,
  onProvinceChange,
  searchQuery,
  onSearchChange,
  onSelectHospital,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = React.useState<HospitalCategory | 'all'>('all');
  const [bipannaOnly, setBipannaOnly] = React.useState(false);
  const [icuOnly, setIcuOnly] = React.useState(false);
  const [bloodBankOnly, setBloodBankOnly] = React.useState(false);

  // Category Tab options
  const categoryTabs: { id: HospitalCategory | 'all'; labelEn: string; labelNe: string }[] = [
    { id: 'all', labelEn: t.tabAll, labelNe: t.tabAll },
    { id: 'central', labelEn: t.tabCentral, labelNe: t.tabCentral },
    { id: 'disease_specific', labelEn: t.tabDiseaseSpecific, labelNe: t.tabDiseaseSpecific },
    { id: 'teaching', labelEn: t.tabTeaching, labelNe: t.tabTeaching },
    { id: 'ayurveda', labelEn: t.tabAyurveda, labelNe: t.tabAyurveda },
    { id: 'provincial_district', labelEn: t.tabProvincial, labelNe: t.tabProvincial },
    { id: 'local_nsi', labelEn: t.tabLocalNsi, labelNe: t.tabLocalNsi },
    { id: 'private', labelEn: t.tabPrivate, labelNe: t.tabPrivate },
  ];

  // Filter hospitals
  const filteredHospitals = React.useMemo(() => {
    return hospitals.filter((h) => {
      // Category filter
      if (selectedCategory !== 'all' && h.category !== selectedCategory) return false;

      // Province filter
      if (selectedProvince !== 'all' && h.province !== selectedProvince) return false;

      // Toggle filters
      if (bipannaOnly && !h.bipannaFundAccepted) return false;
      if (icuOnly && h.icuBeds <= 0) return false;
      if (bloodBankOnly && !h.bloodBank) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName =
          h.nameEn.toLowerCase().includes(q) || h.nameNe.toLowerCase().includes(q);
        const matchesCity =
          h.city.toLowerCase().includes(q) ||
          h.district.toLowerCase().includes(q) ||
          h.districtNe.toLowerCase().includes(q);
        const matchesSpecialty =
          h.specialtiesEn.some((s) => s.toLowerCase().includes(q)) ||
          h.specialtiesNe.some((s) => s.toLowerCase().includes(q));

        if (!matchesName && !matchesCity && !matchesSpecialty) return false;
      }

      return true;
    });
  }, [
    hospitals,
    selectedCategory,
    selectedProvince,
    bipannaOnly,
    icuOnly,
    bloodBankOnly,
    searchQuery,
  ]);

  return (
    <section id="directory" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === 'ne' ? 'प्रमाणित अस्पताल निर्देशिका' : 'Verified Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ne'
                ? 'नेपालका अस्पतालहरूको आधिकारिक सूची तथा सञ्चालन अवस्था'
                : 'Hospital Classification & Real-Time Operating Directory'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === 'ne'
                ? 'केन्द्रीय, रोग विशिष्टीकृत, शिक्षण, आयुर्वेद, प्रादेशिक र निजी अस्पतालहरूको विस्तृत विवरण'
                : 'Central, disease-specific, teaching, ayurvedic, provincial, local, and major private facilities.'}
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
            {t.showingHospitals} <span className="text-blue-700 font-extrabold">{filteredHospitals.length}</span> / {hospitals.length} {t.hospitalsCountSuffix}
          </div>
        </div>

        {/* Category Classification Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {language === 'ne' ? tab.labelNe : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Secondary Quick Filter Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {language === 'ne' ? 'सुविधा फिल्टर:' : 'Quick Filters:'}
            </span>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-blue-700">
              <input
                type="checkbox"
                checked={bipannaOnly}
                onChange={(e) => setBipannaOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{t.filterBipannaOnly}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-blue-700">
              <input
                type="checkbox"
                checked={icuOnly}
                onChange={(e) => setIcuOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{t.filterIcuOnly}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-blue-700">
              <input
                type="checkbox"
                checked={bloodBankOnly}
                onChange={(e) => setBloodBankOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{t.filterBloodBank}</span>
            </label>
          </div>

          {(bipannaOnly || icuOnly || bloodBankOnly || selectedCategory !== 'all' || selectedProvince !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setBipannaOnly(false);
                setIcuOnly(false);
                setBloodBankOnly(false);
                setSelectedCategory('all');
                onProvinceChange('all');
                onSearchChange('');
              }}
              className="text-xs text-red-600 hover:text-red-700 font-bold"
            >
              {t.resetFilters}
            </button>
          )}
        </div>

        {/* Hospitals Cards Grid */}
        {filteredHospitals.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'ne' ? 'कुनै अस्पताल फेला परेन' : 'No matching hospitals found'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ne'
                ? 'कृपया खोज शब्द वा फिल्टर परिवर्तन गरी पुनः प्रयास गर्नुहोस्।'
                : 'Try clearing some filters or searching with a different hospital name.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => {
              const status = evaluateHospitalOperatingStatus(hospital, nepalTime);

              // Status badges colors
              const badgeTheme = {
                green: {
                  bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
                  dot: 'bg-emerald-500',
                },
                amber: {
                  bg: 'bg-amber-50 text-amber-900 border-amber-300',
                  dot: 'bg-amber-500',
                },
                red: {
                  bg: 'bg-red-50 text-red-900 border-red-300',
                  dot: 'bg-red-500',
                },
                blue: {
                  bg: 'bg-blue-50 text-blue-900 border-blue-300',
                  dot: 'bg-blue-500',
                },
              }[status.badgeColor];

              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hospital.mapQuery
              )}`;

              return (
                <div
                  key={hospital.id}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {language === 'ne' ? hospital.categoryLabelNe : hospital.categoryLabelEn}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md">
                        {language === 'ne' ? hospital.provinceLabelNe : hospital.province}
                      </span>
                    </div>

                    {/* Hospital Name & Location */}
                    <div>
                      <h3
                        onClick={() => onSelectHospital(hospital)}
                        className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 cursor-pointer transition-colors leading-snug line-clamp-2"
                      >
                        {language === 'ne' ? hospital.nameNe : hospital.nameEn}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>
                          {language === 'ne' ? hospital.addressNe : hospital.addressEn}
                        </span>
                      </p>
                    </div>

                    {/* Live Operating Status Badge */}
                    <div
                      className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${badgeTheme.bg}`}
                    >
                      <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${badgeTheme.dot}`}></span>
                      <div>
                        <div className="font-bold text-slate-900">
                          {language === 'ne' ? status.badgeLabelNe : status.badgeLabelEn}
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5 font-medium">
                          {language === 'ne' ? status.detailNoteNe : status.detailNoteEn}
                        </div>
                      </div>
                    </div>

                    {/* Features & Capacity Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs py-1">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px] font-bold">BEDS</span>
                        <span className="font-extrabold text-slate-800">{hospital.totalBeds}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px] font-bold">ICU</span>
                        <span className="font-extrabold text-slate-800">{hospital.icuBeds}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px] font-bold">EMERGENCY</span>
                        <span className="font-extrabold text-red-600">24/7</span>
                      </div>
                    </div>

                    {/* Bipanna Nagarik Fund Pill */}
                    {hospital.bipannaFundAccepted && (
                      <div className="flex items-center gap-1.5 text-xs text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1.5 rounded-xl font-bold">
                        <HeartHandshake className="w-4 h-4 text-teal-600" />
                        <span>
                          {language === 'ne'
                            ? 'विपन्न नागरिक उपचार कोष स्वीकृत'
                            : 'Bipanna Nagarik Fund Accepted'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                      title={hospital.phone}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.callNow}</span>
                    </a>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                      title="Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-red-500" />
                    </a>

                    <button
                      onClick={() => onSelectHospital(hospital)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 hover:text-blue-700 font-bold text-xs transition-colors text-center"
                    >
                      {language === 'ne' ? 'विवरण' : 'Details'} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
