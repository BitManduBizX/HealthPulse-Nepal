export type Language = 'en' | 'ne';

export const TRANSLATIONS = {
  en: {
    // Brand
    brandName: 'HealthPulse Nepal',
    brandSubtitle: 'Official Health & Hospital Intelligence',
    tagline: 'Is Your Hospital Open Today? Real-time Healthcare, Simplified for Nepal.',
    heroDescription: 'Verify live hospital operating statuses, search 35+ central & provincial healthcare facilities, check Bipanna Nagarik Upachar Kosh relief funds, and consult our AI health assistant.',
    
    // Navigation
    navLiveStatus: 'Is Hospital Open?',
    navDirectory: 'Hospital Directory',
    navBipanna: 'Bipanna Nagarik Fund',
    navDoctors: 'Top Doctors',
    navManagement: 'Hospital Management',
    navAiAssistant: 'HealthPulse AI',
    emergencyCall102: 'Ambulance 102',
    policeCall100: 'Police 100',
    hotline1155: 'Health Line 1155',

    // Time & Simulator
    liveTimeBadge: 'Nepal Standard Time (NPT, UTC+5:45)',
    simulateTitle: 'Time Simulator / Test Mode:',
    simReal: 'Real Nepal Time',
    simWeekdayDay: 'Weekday (OPD Open - 11:30 AM)',
    simWeekdayClosing: 'Weekday Closing Soon (2:30 PM)',
    simWeekdayNight: 'Night / Closed (8:30 PM)',
    simSaturday: 'Saturday (Weekly Holiday)',
    simDashain: 'Festival / Dashain Holiday',

    // Status Badges
    statusOpen: 'Open Today',
    statusClosingSoon: 'Closing Soon',
    statusClosed: 'OPD Closed',
    statusHoliday: 'Holiday Schedule',
    emergencyOnly: 'Emergency 24/7 Active',

    // Search & Filters
    searchPlaceholder: 'Search hospitals by name, city, specialty (e.g. Bir, Gangalal, Teku, Cancer, Heart)...',
    allProvinces: 'All Provinces',
    allCategories: 'All Categories',
    filterBipannaOnly: 'Bipanna Nagarik Accepted Only',
    filterIcuOnly: 'ICU Available',
    filterBloodBank: '24/7 Blood Bank',
    resetFilters: 'Reset Filters',
    showingHospitals: 'Showing',
    hospitalsCountSuffix: 'hospitals in Nepal',

    // Category Tabs
    tabAll: 'All Hospitals',
    tabCentral: 'Central Government',
    tabDiseaseSpecific: 'Disease-Specific',
    tabTeaching: 'Teaching Hospitals',
    tabAyurveda: 'Ayurvedic & Alternative',
    tabProvincial: 'Provincial & District',
    tabLocalNsi: 'Local & NSI Supported',
    tabPrivate: 'Major Private',

    // Hospital Card Details
    opdHours: 'OPD Hours',
    emergencyBadge: '24/7 Emergency',
    bipannaBadge: 'Bipanna Fund Accepted',
    totalBeds: 'Total Beds',
    icuBeds: 'ICU Beds',
    viewDetails: 'View Full Profile & Services',
    callNow: 'Call Hospital',
    getDirections: 'Get Directions',
    bedStatusGeneral: 'General Beds',
    bedStatusIcu: 'ICU Beds',

    // Bipanna Portal
    bipannaTitle: 'Bipanna Nagarik Upachar Kosh (विपन्न नागरिक उपचार कोष)',
    bipannaSubtitle: 'Government financial assistance for 8 critical illnesses (up to NPR 1,00,000 to NPR 4,00,000 and 100% free lifelong dialysis).',
    bipannaCalcTitle: 'Eligibility & Fund Calculator',
    selectDisease: 'Select Disease Condition',
    patientAge: 'Patient Age',
    hasWardSifaris: 'Do you have local ward recommendation (वडा सिफारिस)?',
    calculateRelief: 'Check Eligibility & Entitlement',
    requiredChecklist: 'Document Verification Checklist',
    generateSifarisForm: 'Interactive Recommendation Letter Generator (वडा सिफारिस फारम)',
    printForm: 'Print / Save Recommendation Form',
    dohsNotice: 'Administered under Government of Nepal, Ministry of Health and Population (MoHP), Curative Service Division.',

    // Doctors & Management
    doctorsTitle: 'Distinguished Physicians & Medical Specialists of Nepal',
    doctorsSubtitle: 'Verified directory of renowned doctors across cardiology, neurology, oncology, pediatrics, and nephrology.',
    managementTitle: 'Nepal Hospital Management & Governance Knowledge Hub',
    managementSubtitle: 'Leadership hierarchy, regulatory mandates (MoHP/DoHS/NHRC/NMC), and professional career pathways.',

    // AI Assistant
    aiAssistantTitle: 'HealthPulse AI Health Assistant',
    aiAssistantSubtitle: 'Interactive bilingual healthcare guide for triage, first-aid, departments, and hospital navigation.',
    aiDisclaimerNotice: 'Notice: HealthPulse AI provides general healthcare information for Nepal and does NOT substitute clinical diagnosis. In life-threatening emergencies, immediately call Nepal Ambulance at 102 or Police at 100.',
    aiConsentAgree: 'I Understand & Agree',
    aiConsentPrompt: 'Please confirm your consent to receive non-clinical informational guidance before proceeding.',
    askAiPlaceholder: 'Ask in English or नेपाली (e.g. Where is rabies vaccine available? How to apply for Bipanna fund?)...',
    send: 'Send',
    customApiKeyBtn: 'API Key Settings',
    customApiKeyTitle: 'Configure Gemini API Key',
    customApiKeyDesc: 'By default, queries run securely through our server. You may optionally provide your own personal Gemini API Key from Google AI Studio.',
    saveKey: 'Save Key',
    clearKey: 'Use Server Default',

    // Footer
    footerDisclaimer: 'Disclaimer: Information displayed is aggregated from official Ministry of Health and Population (MoHP), Department of Health Services (DoHS), and certified public hospital charters. Not a replacement for emergency dispatch.',
    quickEmergency: 'National Emergency Contacts',
  },

  ne: {
    // Brand
    brandName: 'स्वास्थ्यसेवा नेपाल (HealthPulse)',
    brandSubtitle: 'आधिकारिक अस्पताल तथा स्वास्थ्य सेवा पोर्टल',
    tagline: 'के तपाईँको अस्पताल आज खुला छ? नेपालका लागि सहज र वास्तविक समयको स्वास्थ्य जानकारी।',
    heroDescription: 'अस्पतालको ओपीडी सञ्चालन स्थिति हेर्नुहोस्, ३५+ केन्द्रीय तथा प्रादेशिक अस्पतालहरू खोज्नुहोस्, विपन्न नागरिक उपचार कोषको सहुलियत गणना गर्नुहोस् र स्वास्थ्य एआईसँग परामर्श लिनुहोस्।',

    // Navigation
    navLiveStatus: 'अस्पताल खुल्ने स्थिति',
    navDirectory: 'अस्पताल निर्देशिका',
    navBipanna: 'विपन्न नागरिक कोष',
    navDoctors: 'वरिष्ठ चिकित्सकहरू',
    navManagement: 'अस्पताल व्यवस्थापन',
    navAiAssistant: 'हेल्थपल्स एआई',
    emergencyCall102: 'एम्बुलेन्स १०२',
    policeCall100: 'प्रहरी १००',
    hotline1155: 'स्वास्थ्य हटलाइन ११५५',

    // Time & Simulator
    liveTimeBadge: 'नेपाल मानक समय (NPT, UTC+५:४५)',
    simulateTitle: 'समय परीक्षण मोड (सिमुलेटर):',
    simReal: 'वास्तविक नेपाल समय',
    simWeekdayDay: 'साताको दिन (ओपीडी खुला - बिहान ११:३०)',
    simWeekdayClosing: 'ओपीडी अन्तिम समय (दिउँसो २:३०)',
    simWeekdayNight: 'रात्रिकालीन समय (राति ८:३०)',
    simSaturday: 'शनिवार (साप्ताहिक बिदा)',
    simDashain: 'चाडपर्व / दशैं बिदा',

    // Status Badges
    statusOpen: 'आज खुला छ',
    statusClosingSoon: 'चाँडै बन्द हुँदै',
    statusClosed: 'ओपीडी बन्द',
    statusHoliday: 'सार्वजनिक बिदा',
    emergencyOnly: 'आकस्मिक २४/७ सेवा खुला',

    // Search & Filters
    searchPlaceholder: 'अस्पतालको नाम, सहर, रोग वा सेवा खोज्नुहोस् (जस्तै: वीर, गंगालाल, टेकु, क्यान्सर, मुटु)...',
    allProvinces: 'सबै प्रदेशहरू',
    allCategories: 'सबै वर्गहरू',
    filterBipannaOnly: 'विपन्न नागरिक कोष उपलब्ध मात्र',
    filterIcuOnly: 'आईसीयू उपलब्ध',
    filterBloodBank: '२४/७ ब्लड बैंक',
    resetFilters: 'फिल्टर रिसेट गर्नुहोस्',
    showingHospitals: 'नतिजा',
    hospitalsCountSuffix: 'नेपालका अस्पतालहरू',

    // Category Tabs
    tabAll: 'सबै अस्पतालहरू',
    tabCentral: 'केन्द्रीय सरकारी',
    tabDiseaseSpecific: 'रोग विशिष्टीकृत',
    tabTeaching: 'शिक्षण अस्पतालहरू',
    tabAyurveda: 'आयुर्वेद तथा वैकल्पिक',
    tabProvincial: 'प्रादेशिक तथा जिल्ला',
    tabLocalNsi: 'स्थानीय र एनएसआई सहयोग',
    tabPrivate: 'प्रमुख निजी अस्पताल',

    // Hospital Card Details
    opdHours: 'ओपीडी समय',
    emergencyBadge: '२४/७ आकस्मिक सेवा',
    bipannaBadge: 'विपन्न कोष स्वीकृत',
    totalBeds: 'कुल शैय्या',
    icuBeds: 'आईसीयू शैय्या',
    viewDetails: 'विस्तृत विवरण र सेवाहरू',
    callNow: 'फोन गर्नुहोस्',
    getDirections: 'नक्सा / दिशा हेर्नुहोस्',
    bedStatusGeneral: 'साधारण बेड',
    bedStatusIcu: 'आईसीयू बेड',

    // Bipanna Portal
    bipannaTitle: 'विपन्न नागरिक उपचार कोष (Bipanna Nagarik Upachar Kosh)',
    bipannaSubtitle: '८ कडा रोगहरूका लागि नेपाल सरकारको आर्थिक राहत (रु. १ लाख देखि रु. ४ लाखसम्म तथा जीवनभर निःशुल्क डायलायसिस)।',
    bipannaCalcTitle: 'योग्यता तथा आर्थिक राहत क्याल्कुलेटर',
    selectDisease: 'रोगको किसिम छान्नुहोस्',
    patientAge: 'बिरामीको उमेर',
    hasWardSifaris: 'के तपाईंसँग स्थानीय वडा सिफारिस छ?',
    calculateRelief: 'योग्यता र सुविधा जाँच गर्नुहोस्',
    requiredChecklist: 'आवश्यक कागजातहरूको सूची',
    generateSifarisForm: 'वडा सिफारिस निवेदन तथा फारम तयार गर्नुहोस्',
    printForm: 'फारम छाप्नुहोस् / सेभ गर्नुहोस्',
    dohsNotice: 'स्वास्थ्य तथा जनसंख्या मन्त्रालय, स्वास्थ्य सेवा विभाग, उपचारात्मक सेवा महाशाखाद्वारा सञ्चालित।',

    // Doctors & Management
    doctorsTitle: 'नेपालका ख्यातिप्राप्त विशेषज्ञ चिकित्सकहरू',
    doctorsSubtitle: 'मुटुरोग, न्युरोलोजी, क्यान्सर, बालरोग र मिर्गौला रोगका वरिष्ठ चिकित्सकहरूको ओपीडी तालिका र परिचय।',
    managementTitle: 'नेपाल अस्पताल व्यवस्थापन तथा नियमन ज्ञान केन्द्र',
    managementSubtitle: 'अस्पताल सञ्चालन संरचना, नियमनकारी निकायहरू (मन्त्रालय/काउन्सिल) र शैक्षिक वृत्तिविकास (MHM/BHM)।',

    // AI Assistant
    aiAssistantTitle: 'स्वास्थ्यसेवा एआई (HealthPulse AI)',
    aiAssistantSubtitle: 'प्राथमिक उपचार, अस्पताल सिफारिस, ओपीडी समय र स्वास्थ्य सेवा सहजीकरणका लागि डिजिटल सहायक।',
    aiDisclaimerNotice: 'सावधानी: यो एआई केवल सामान्य जानकारीका लागि हो र यसले चिकित्सकीय निदानको विकल्प दिँदैन। आपतकालीन अवस्थामा तुरुन्त १०२ एम्बुलेन्स वा १०० प्रहरीमा सम्पर्क गर्नुहोस्।',
    aiConsentAgree: 'म सहमत छु',
    aiConsentPrompt: 'कृपया अगाडि बढ्नुअघि यो जानकारी चिकित्सकीय सल्लाह होइन भनी स्वीकार गर्नुहोस्।',
    askAiPlaceholder: 'नेपाली वा अंग्रेजीमा सोध्नुहोस् (जस्तै: रेबिज खोप कहाँ पाइन्छ? विपन्न कोष कसरी लिने?)...',
    send: 'पठाउनुहोस्',
    customApiKeyBtn: 'एपीआई की सेटिङ',
    customApiKeyTitle: 'जेमिनी एपीआई की (Gemini API Key) कन्फिगर गर्नुहोस्',
    customApiKeyDesc: 'सामान्यतया प्रश्नहरू सर्भरमार्फत चल्छन्। यदि चाहनुहुन्छ भने आफ्नै व्यक्तिगत गुगल एआई स्टुडियो की पनि राख्न सक्नुहुन्छ।',
    saveKey: 'सुरक्षित गर्नुहोस्',
    clearKey: 'डिफल्ट प्रयोग गर्नुहोस्',

    // Footer
    footerDisclaimer: 'अस्वीकरण: यहाँ प्रस्तुत जानकारी स्वास्थ्य तथा जनसंख्या मन्त्रालय, स्वास्थ्य सेवा विभाग तथा आधिकारिक अस्पताल स्रोतबाट संकलन गरिएको हो। गम्भीर बिरामीका लागि तुरुन्त १०२ मा फोन गर्नुहोस्।',
    quickEmergency: 'राष्ट्रिय आपतकालीन सम्पर्क नम्बरहरू',
  },
};
