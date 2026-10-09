import React from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  FileText,
  Printer,
  HelpCircle,
  Building,
  Phone,
  AlertCircle,
  ExternalLink,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { BIPANNA_DISEASES, BIPANNA_CHECKLIST, OFFICIAL_DOHS_CONTACTS } from '../data/bipannaData';
import { Hospital } from '../types';

interface BipannaKoshPortalProps {
  language: Language;
  hospitals: Hospital[];
  onSelectHospital: (hospital: Hospital) => void;
}

export const BipannaKoshPortal: React.FC<BipannaKoshPortalProps> = ({
  language,
  hospitals,
  onSelectHospital,
}) => {
  const t = TRANSLATIONS[language];

  // State for Calculator
  const [selectedDiseaseId, setSelectedDiseaseId] = React.useState<string>(BIPANNA_DISEASES[0].id);
  const [patientAge, setPatientAge] = React.useState<number>(45);
  const [hasWardCert, setHasWardCert] = React.useState<boolean>(true);

  // State for Interactive Sifaris Form Generator
  const [formPatientName, setFormPatientName] = React.useState<string>('राम बहादुर श्रेष्ठ');
  const [formAge, setFormAge] = React.useState<string>('५२');
  const [formGender, setFormGender] = React.useState<string>('पुरुष');
  const [formDistrict, setFormDistrict] = React.useState<string>('दोलखा');
  const [formMunicipality, setFormMunicipality] = React.useState<string>('भीमेश्वर नगरपालिका');
  const [formWard, setFormWard] = React.useState<string>('३');
  const [formHospitalChoice, setFormHospitalChoice] = React.useState<string>('सहिद गंगालाल राष्ट्रिय हृदय केन्द्र');

  const selectedDisease = BIPANNA_DISEASES.find((d) => d.id === selectedDiseaseId) || BIPANNA_DISEASES[0];

  // Authorized hospitals for Bipanna Nagarik Fund
  const bipannaHospitals = React.useMemo(() => {
    return hospitals.filter((h) => h.bipannaFundAccepted);
  }, [hospitals]);

  const handlePrintForm = () => {
    window.print();
  };

  return (
    <section id="bipanna" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold">
            <HeartHandshake className="w-4 h-4 text-teal-700" />
            <span>{language === 'ne' ? 'नेपाल सरकारको सामाजिक सुरक्षा' : "Government of Nepal Healthcare Relief"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ne'
              ? 'विपन्न नागरिक उपचार कोष (Bipanna Nagarik Upachar Kosh)'
              : 'Indigent Citizens Treatment Relief Fund (Bipanna Nagarik Portal)'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {t.bipannaSubtitle}
          </p>
        </div>

        {/* 8 Critical Illnesses Accordion / Selector Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <span>{language === 'ne' ? '८ कडा रोगहरू तथा सरकारी अनुदान सीमा' : '8 Designated Critical Illnesses & Subsidies'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BIPANNA_DISEASES.map((dis) => {
              const isSelected = dis.id === selectedDiseaseId;
              return (
                <button
                  key={dis.id}
                  onClick={() => setSelectedDiseaseId(dis.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all shadow-2xs ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {language === 'ne' ? dis.nameNe : dis.nameEn}
                  </div>
                  <div className="text-[11px] font-extrabold text-teal-800 mt-1">
                    {language === 'ne' ? dis.maxReliefLabelNe : dis.maxReliefLabelEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Disease Highlight Box */}
          <div className="p-6 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200/60 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  {language === 'ne' ? 'छानिएको कडा रोग' : 'Selected Condition'}
                </span>
                <h4 className="text-xl font-extrabold text-teal-950">
                  {language === 'ne' ? selectedDisease.nameNe : selectedDisease.nameEn}
                </h4>
              </div>
              <span className="text-sm font-black px-3.5 py-1.5 rounded-xl bg-teal-700 text-white shadow-xs self-start sm:self-auto">
                {language === 'ne' ? selectedDisease.maxReliefLabelNe : selectedDisease.maxReliefLabelEn}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-teal-900 leading-relaxed font-medium">
              {language === 'ne' ? selectedDisease.descriptionNe : selectedDisease.descriptionEn}
            </p>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-teal-900 block uppercase tracking-wider">
                {language === 'ne' ? 'विशिष्ट सुविधाहरू:' : 'Key Entitlements:'}
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-teal-950 font-medium">
                {(language === 'ne' ? selectedDisease.specificBenefitsNe : selectedDisease.specificBenefitsEn).map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Two-Column Module: Required Checklist + Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Verification Checklist */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                {t.requiredChecklist}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'ne'
                ? 'विपन्न नागरिक उपचार कोषको सहुलियत पाउन बिरामीले अस्पतालमा पेस गर्नुपर्ने आवश्यक कागजातहरू:'
                : 'Mandatory documents to submit at the hospital Bipanna Nagarik service counter:'}
            </p>

            <div className="space-y-3">
              {BIPANNA_CHECKLIST.map((chk, i) => (
                <div key={chk.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">
                      {i + 1}
                    </span>
                    <span>{language === 'ne' ? chk.titleNe : chk.titleEn}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">
                    {language === 'ne' ? chk.descNe : chk.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Sifaris Form Generator */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {t.generateSifarisForm}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'ne'
                  ? 'स्थानीय वडा कार्यालयमा पेश गर्ने आधिकारिक सिफारिस पत्रको ढाँचा तयार गर्नुहोस् र छाप्नुहोस्:'
                  : 'Customize and generate the standard Ward Recommendation Template ready to print:'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ne' ? 'बिरामीको नाम' : 'Patient Name'}
                </label>
                <input
                  type="text"
                  value={formPatientName}
                  onChange={(e) => setFormPatientName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ne' ? 'उमेर र लिङ्ग' : 'Age & Gender'}
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    className="w-16 bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-center"
                  />
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-2 py-2 font-medium"
                  >
                    <option value="पुरुष">पुरुष (Male)</option>
                    <option value="महिला">महिला (Female)</option>
                    <option value="अन्य">अन्य (Other)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ne' ? 'जिल्ला' : 'District'}
                </label>
                <input
                  type="text"
                  value={formDistrict}
                  onChange={(e) => setFormDistrict(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ne' ? 'पालिका र वडा नं.' : 'Municipality & Ward'}
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formMunicipality}
                    onChange={(e) => setFormMunicipality(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                  <input
                    type="text"
                    value={formWard}
                    onChange={(e) => setFormWard(e.target.value)}
                    className="w-14 bg-white border border-slate-200 rounded-xl px-2 py-2 font-medium text-center"
                  />
                </div>
              </div>
            </div>

            {/* Generated Official Nepali Recommendation Letter Preview */}
            <div
              id="printable-sifaris-form"
              className="p-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 text-xs font-serif text-slate-800 space-y-2 leading-relaxed"
            >
              <div className="text-center font-bold pb-2 border-b border-slate-200">
                <div className="text-sm font-extrabold">श्री {formMunicipality}</div>
                <div>वडा नं. {formWard} को कार्यालय, {formDistrict}</div>
                <div className="text-[11px] underline mt-1 font-sans">
                  विषय: विपन्न नागरिक उपचार कोष सिफारिस सम्बन्धमा।
                </div>
              </div>

              <p className="text-justify font-sans text-[11px]">
                प्रस्तुत विषयमा यस <strong>{formMunicipality}</strong> वडा नं. <strong>{formWard}</strong> बस्ने{' '}
                <strong>श्री/श्रीमती {formPatientName}</strong> (उमेर: {formAge} वर्ष, लिङ्ग: {formGender}) को आर्थिक अवस्था अत्यन्त कमजोर भई विपन्न वर्गमा पर्नुभएको र उहाँलाई <strong>{selectedDisease.nameNe}</strong> भई थप उपचारको आवश्यकता परेकाले नेपाल सरकारको <em>विपन्न नागरिक उपचार कोष निर्देशिका</em> बमोजिम आवश्यक आर्थिक सहुलियत उपलब्ध गराइदिनुहुन सिफारिस गरिन्छ।
              </p>

              <div className="flex justify-between items-end pt-3 text-[10px] font-sans">
                <div>
                  मिति: २०८३/०७/२३<br />
                  संलग्न: नागरिकता प्रतिलिपि तथा रोग निदान रिपोर्ट
                </div>
                <div className="text-center">
                  ..................................<br />
                  वडा अध्यक्ष / सचिवको हस्ताक्षर
                </div>
              </div>
            </div>

            <button
              onClick={handlePrintForm}
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-98 no-print"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printForm}</span>
            </button>
          </div>
        </div>

        {/* Empanelled Hospitals Directory for Bipanna Nagarik */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span>
                {language === 'ne'
                  ? 'विपन्न नागरिक उपचार कोष स्वीकृत प्रमुख सरकारी अस्पतालहरू'
                  : 'Authorized Hospitals Processing Bipanna Nagarik Fund'}
              </span>
            </h3>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {bipannaHospitals.length} {language === 'ne' ? 'केन्द्रहरू' : 'Authorized Hubs'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bipannaHospitals.map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => onSelectHospital(hosp)}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all cursor-pointer flex items-start justify-between gap-3 group"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700">
                    {language === 'ne' ? hosp.nameNe : hosp.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{hosp.city}, {hosp.province}</p>
                  <div className="mt-2 text-[11px] font-bold text-teal-800">
                    {language === 'ne' ? 'निःशुल्क/सहुलियत सेवा उपलब्ध' : 'Direct Credit Processing Available'}
                  </div>
                </div>
                <span className="text-teal-600 font-bold text-sm">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department of Health Services Contact Card */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 text-blue-950 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-extrabold text-sm">{OFFICIAL_DOHS_CONTACTS.department}</div>
            <div className="text-xs font-medium text-blue-800">
              {language === 'ne' ? OFFICIAL_DOHS_CONTACTS.sectionNe : OFFICIAL_DOHS_CONTACTS.section} — {OFFICIAL_DOHS_CONTACTS.location}
            </div>
            <div className="text-xs text-blue-700">
              {language === 'ne' ? 'फोन:' : 'Phones:'} {OFFICIAL_DOHS_CONTACTS.phones.join(', ')} | {language === 'ne' ? 'राष्ट्रिय स्वास्थ्य हटलाइन:' : 'National Helpline:'} 1155
            </div>
          </div>
          <a
            href={OFFICIAL_DOHS_CONTACTS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{language === 'ne' ? 'आधिकारिक DoHS वेबसाइट' : 'Visit DoHS Official Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
