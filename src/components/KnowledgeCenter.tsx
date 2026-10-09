import React from 'react';
import {
  UserCheck,
  Stethoscope,
  GraduationCap,
  Scale,
  Briefcase,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { TOP_DOCTORS_DATA } from '../data/doctorsData';
import {
  HOSPITAL_HIERARCHY,
  REGULATORY_FRAMEWORKS,
  EDUCATION_CAREER_INSIGHTS,
} from '../data/managementData';

interface KnowledgeCenterProps {
  language: Language;
}

export const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<string>('all');

  const specialtiesList = [
    { id: 'all', en: 'All Specialists', ne: 'सबै विशेषज्ञहरू' },
    { id: 'Cardiology', en: 'Cardiology (मुटुरोग)', ne: 'मुटुरोग' },
    { id: 'Neurology', en: 'Neurology (न्युरोलोजी)', ne: 'न्युरोलोजी' },
    { id: 'Oncology', en: 'Oncology (क्यान्सर)', ne: 'क्यान्सर रोग' },
    { id: 'Nephrology', en: 'Nephrology (मिर्गौला)', ne: 'मिर्गौला रोग' },
    { id: 'Orthopedics', en: 'Orthopedics (हाडजोर्नी)', ne: 'हाडजोर्नी' },
    { id: 'Pediatrics', en: 'Pediatrics (बालरोग)', ne: 'बालरोग' },
  ];

  const filteredDoctors = React.useMemo(() => {
    if (selectedSpecialty === 'all') return TOP_DOCTORS_DATA;
    return TOP_DOCTORS_DATA.filter((doc) => doc.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  return (
    <div className="space-y-16">
      {/* MODULE 4A: TOP DOCTORS DIRECTORY */}
      <section id="doctors" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span>{language === 'ne' ? 'वरिष्ठ चिकित्सक निर्देशिका' : 'Distinguished Physicians'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.doctorsTitle}
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {t.doctorsSubtitle}
            </p>
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {specialtiesList.map((sp) => {
              const isSelected = selectedSpecialty === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecialty(sp.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {language === 'ne' ? sp.ne : sp.en}
                </button>
              );
            })}
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                      {doc.specialty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      NMC #{doc.nmcNumber}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {language === 'ne' ? doc.nameNe : doc.nameEn}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                      {language === 'ne' ? doc.titleNe : doc.titleEn}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="font-semibold text-slate-800 line-clamp-1">
                      {language === 'ne' ? doc.hospitalNe : doc.hospitalEn}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {doc.qualification} • {doc.experienceYears}+ Yrs Exp
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    {language === 'ne' ? doc.bioNe : doc.bioEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-700">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    {language === 'ne' ? 'ओपीडी समय तालिका:' : 'Consultation Timings:'}
                  </span>
                  <span className="text-slate-600">
                    {language === 'ne' ? doc.opdScheduleNe : doc.opdScheduleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 4B: HOSPITAL MANAGEMENT & GOVERNANCE KNOWLEDGE HUB */}
      <section id="management" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span>{language === 'ne' ? 'अस्पताल व्यवस्थापन तथा नियमन ढाँचा' : 'Governance & Hospital Management'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.managementTitle}
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {t.managementSubtitle}
            </p>
          </div>

          {/* Hierarchy Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-600" />
              <span>
                {language === 'ne'
                  ? 'नेपालमा अस्पताल प्रशासनिक तह तथा जिम्मेवारी (Hospital Hierarchy)'
                  : 'Hospital Leadership Hierarchy in Nepal'}
              </span>
            </h3>

            <div className="space-y-3">
              {HOSPITAL_HIERARCHY.map((node) => (
                <div
                  key={node.level}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      L{node.level}
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {language === 'ne' ? node.roleNe : node.roleEn}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {language === 'ne' ? node.responsibilitiesNe : node.responsibilitiesEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Regulatory Standards & Frameworks */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>
                {language === 'ne'
                  ? 'प्रमुख नियमनकारी निकायहरू तथा सरकारी मापदण्ड'
                  : 'Key Standards & Regulatory Frameworks'}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGULATORY_FRAMEWORKS.map((reg) => (
                <div
                  key={reg.abbr}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <span className="text-xs font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {reg.abbr}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {language === 'ne' ? reg.nameNe : reg.nameEn}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {language === 'ne' ? reg.roleNe : reg.roleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Career Insights (MHM/BHM, Salary Benchmarks) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {EDUCATION_CAREER_INSIGHTS.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-linear-to-br from-slate-50 to-indigo-50/40 border border-slate-200 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-base font-extrabold text-slate-900">
                    {language === 'ne' ? edu.titleNe : edu.titleEn}
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {(language === 'ne' ? edu.pointsNe : edu.pointsEn).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
