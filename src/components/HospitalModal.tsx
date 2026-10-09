import React from 'react';
import {
  X,
  Phone,
  MapPin,
  ExternalLink,
  Clock,
  ShieldAlert,
  HeartHandshake,
  Droplet,
  Activity,
  Bed,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { Hospital } from '../types';
import { NepalTimeState, evaluateHospitalOperatingStatus } from '../utils/nepalTime';

interface HospitalModalProps {
  hospital: Hospital | null;
  onClose: () => void;
  language: Language;
  nepalTime: NepalTimeState;
}

export const HospitalModal: React.FC<HospitalModalProps> = ({
  hospital,
  onClose,
  language,
  nepalTime,
}) => {
  if (!hospital) return null;

  const t = TRANSLATIONS[language];
  const status = evaluateHospitalOperatingStatus(hospital, nepalTime);

  // Status color styles
  const statusColors = {
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    amber: 'bg-amber-100 text-amber-800 border-amber-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
  }[status.badgeColor];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hospital.mapQuery
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Section */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md">
              {language === 'ne' ? hospital.categoryLabelNe : hospital.categoryLabelEn}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
              {language === 'ne' ? hospital.provinceLabelNe : hospital.provinceLabelEn}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${statusColors}`}
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {language === 'ne' ? status.badgeLabelNe : status.badgeLabelEn}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            {language === 'ne' ? hospital.nameNe : hospital.nameEn}
          </h2>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            {language === 'ne' ? hospital.addressNe : hospital.addressEn}
          </p>
        </div>

        {/* Operating Status Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-4 h-4 text-blue-600" />
              {t.opdHours}:
            </span>
            <span className="text-emerald-700">
              {language === 'ne' ? status.opdStatusNe : status.opdStatusEn}
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {language === 'ne' ? hospital.opdHoursNe : hospital.opdHoursEn}
          </div>
          <p className="text-xs text-slate-600">
            {language === 'ne' ? status.detailNoteNe : status.detailNoteEn}
          </p>
        </div>

        {/* Action Buttons: Phone & Directions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all active:scale-98"
          >
            <Phone className="w-4 h-4" />
            <span>{t.callNow}: {hospital.phone}</span>
          </a>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-colors"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{t.getDirections} (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Bed & Facility Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Bed className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <div className="text-xl font-extrabold text-slate-900">{hospital.totalBeds}</div>
            <div className="text-[11px] font-semibold text-slate-500">{t.totalBeds}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Activity className="w-4 h-4 text-red-600 mx-auto mb-1" />
            <div className="text-xl font-extrabold text-slate-900">{hospital.icuBeds}</div>
            <div className="text-[11px] font-semibold text-slate-500">{t.icuBeds}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Droplet className="w-4 h-4 text-rose-600 mx-auto mb-1" />
            <div className="text-sm font-bold text-slate-900">
              {hospital.bloodBank ? (language === 'ne' ? 'उपलब्ध' : 'Available') : (language === 'ne' ? 'छैन' : 'No')}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Blood Bank</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <HeartHandshake className="w-4 h-4 text-teal-600 mx-auto mb-1" />
            <div className="text-sm font-bold text-slate-900">
              {hospital.bipannaFundAccepted ? (language === 'ne' ? 'स्वीकृत' : 'Empanelled') : (language === 'ne' ? 'छैन' : 'No')}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Bipanna Kosh</div>
          </div>
        </div>

        {/* Emergency Hotlines */}
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <div>
              <span className="font-bold text-red-900 block">
                {language === 'ne' ? 'आकस्मिक हटलाइन (Emergency Helpline)' : 'Emergency & Trauma Desk:'}
              </span>
              <span className="text-red-700 font-semibold">{hospital.emergencyPhone}</span>
            </div>
          </div>
          <a
            href={`tel:${hospital.emergencyPhone.replace(/[^0-9+]/g, '')}`}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
          >
            {language === 'ne' ? 'तत्काल फोन गर्नुहोस्' : 'Dial Emergency'}
          </a>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-800">
            {language === 'ne' ? 'अस्पताल परिचय' : 'About the Hospital'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'ne' ? hospital.descriptionNe : hospital.descriptionEn}
          </p>
        </div>

        {/* Key Specialties / Departments */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-800">
            {language === 'ne' ? 'प्रमुख विशेषज्ञता तथा विभागहरू' : 'Key Medical Specialties & Departments'}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {(language === 'ne' ? hospital.specialtiesNe : hospital.specialtiesEn).map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Official Website link if available */}
        {hospital.website && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {language === 'ne' ? 'स्थापना वर्ष:' : 'Established:'} {hospital.establishedYear} AD
            </span>
            <a
              href={hospital.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline font-bold"
            >
              <span>{language === 'ne' ? 'आधिकारिक वेबसाइट' : 'Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
