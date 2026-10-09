export interface HierarchyNode {
  level: number;
  roleEn: string;
  roleNe: string;
  responsibilitiesEn: string;
  responsibilitiesNe: string;
}

export const HOSPITAL_HIERARCHY: HierarchyNode[] = [
  {
    level: 1,
    roleEn: 'Hospital Management & Development Committee (HMDC / अस्पताल विकास समिति)',
    roleNe: 'अस्पताल व्यवस्थापन तथा विकास समिति',
    responsibilitiesEn: 'Chaired by government appointee or community leader. Responsible for high-level policy formulation, annual budget approval, infrastructure sanctions, and institutional oversight.',
    responsibilitiesNe: 'मन्त्रालय वा समुदायद्वारा मनोनीत अध्यक्षको नेतृत्वमा रहने समिति। नीति निर्माण, वार्षिक बजेट पारित, पूर्वाधार विस्तार र समग्र अनुगमन गर्ने सर्वोच्च निकाय।',
  },
  {
    level: 2,
    roleEn: 'Executive Director / Chief Medical Superintendent (प्रमुख मेडिकल सुपरिटेन्डेन्ट)',
    roleNe: 'कार्यकारी निर्देशक / प्रमुख मेडिकल सुपरिटेन्डेन्ट (मेसु)',
    responsibilitiesEn: 'Senior 11th/12th level doctor appointed by MoHP. Exercises full executive and clinical leadership, ensures patient care standards, emergency protocols, and statutory compliance.',
    responsibilitiesNe: 'स्वास्थ्य मन्त्रालयद्वारा नियुक्त ११औं/१२औं तहका वरिष्ठ चिकित्सक। सम्पूर्ण अस्पतालको प्रशासनिक, प्राविधिक तथा उपचार सेवाको कार्यकारी प्रमुख।',
  },
  {
    level: 3,
    roleEn: 'Hospital Administrator / Operations Manager (अस्पताल प्रशासक)',
    roleNe: 'अस्पताल प्रशासक / सञ्चालन प्रबन्धक',
    responsibilitiesEn: 'MHM/MBA graduate managing daily logistics, human resource deployment, billing, supply chain, medical equipment maintenance, public relations, and legal compliance.',
    responsibilitiesNe: 'दैनिक प्रशासनिक कार्य, कर्मचारी व्यवस्थापन, बिलिङ, औषधि तथा उपकरण आपूर्ति, सरसफाइ र सार्वजनिक सम्बन्ध व्यवस्थापन गर्ने अधिकृत।',
  },
  {
    level: 4,
    roleEn: 'Nursing Director / Matron (नर्सिङ निर्देशक / प्रमुख)',
    roleNe: 'नर्सिङ निर्देशक / मेट्रन',
    responsibilitiesEn: 'Senior nursing officer overseeing nursing cadres across ICU, wards, and OT; enforces infection control protocols, patient bedside dignity, and duty rotas.',
    responsibilitiesNe: 'सम्पूर्ण वार्ड, आईसीयू र अपरेशन थिएटरका नर्सिङ कर्मचारीहरूको परिचालन, संक्रमण नियन्त्रण तथा बिरामी स्याहारको गुणस्तर नियन्त्रक।',
  },
  {
    level: 5,
    roleEn: 'Clinical Department Heads (HODs) & Medical Records Officer',
    roleNe: 'विभागीय प्रमुख चिकित्सकहरू तथा मेडिकल रेकर्ड अधिकृत',
    responsibilitiesEn: 'Specialist physicians heading clinical departments (Surgery, Medicine, Gyne, Pediatrics) collaborating with Medical Records Section for DHIS-2 national health reporting.',
    responsibilitiesNe: 'विभिन्न रोग विभागका प्रमुख विशेषज्ञहरू तथा स्वास्थ्य सूचना प्रणाली (DHIS-2) मा राष्ट्रिय स्वास्थ्य तथ्यांक प्रविष्टि गर्ने अधिकृत।',
  },
];

export const REGULATORY_FRAMEWORKS = [
  {
    abbr: 'MoHP',
    nameEn: 'Ministry of Health and Population (स्वास्थ्य तथा जनसंख्या मन्त्रालय)',
    nameNe: 'स्वास्थ्य तथा जनसंख्या मन्त्रालय',
    roleEn: 'Apex federal ministry responsible for national health policies, budget allocation, hospital classification, and epidemic crisis coordination.',
    roleNe: 'राष्ट्रिय स्वास्थ्य नीति, बजेट विनियोजन, अस्पतालको स्तर निर्धारण तथा महामारी व्यवस्थापन गर्ने सर्वोच्च संघीय मन्त्रालय।',
  },
  {
    abbr: 'DoHS',
    nameEn: 'Department of Health Services (स्वास्थ्य सेवा विभाग)',
    nameNe: 'स्वास्थ्य सेवा विभाग',
    roleEn: 'Executing department supervising public health programs, free essential medicine procurement, vaccination supply chains, and Bipanna Nagarik Upachar Kosh.',
    roleNe: 'राष्ट्रिय स्वास्थ्य कार्यक्रम, निःशुल्क औषधि आपूर्ति, खोप व्यवस्थापन तथा विपन्न नागरिक उपचार कोष कार्यान्वयन गर्ने प्रमुख विभाग।',
  },
  {
    abbr: 'NMC',
    nameEn: 'Nepal Medical Council (नेपाल मेडिकल काउन्सिल)',
    nameNe: 'नेपाल मेडिकल काउन्सिल',
    roleEn: 'Statutory regulatory body licensing physicians, standardizing MBBS/MD/DM medical education, and investigating medical negligence or ethics complaints.',
    roleNe: 'चिकित्सकहरूको योग्यता परीक्षण, लाइसेन्स परीक्षा सञ्चालन, चिकित्सा शिक्षाको मापदण्ड र व्यावसायिक आचारसंहिता नियमन गर्ने निकाय।',
  },
  {
    abbr: 'NHRC',
    nameEn: 'Nepal Health Research Council (नेपाल स्वास्थ्य अनुसन्धान परिषद्)',
    nameNe: 'नेपाल स्वास्थ्य अनुसन्धान परिषद्',
    roleEn: 'National regulatory body granting ethical clearances for clinical trials, health research studies, and evidence-based medicine frameworks in Nepal.',
    roleNe: 'नेपालमा हुने क्लिनिकल ट्रायल, औषधि अनुसन्धान तथा स्वास्थ्य अध्ययनहरूको नैतिक स्वीकृति र मापदण्ड निर्धारण गर्ने आधिकारिक संस्था।',
  },
  {
    abbr: 'HFOSG',
    nameEn: 'Health Facility Operation Standard Guidelines 2077 (स्वास्थ्य संस्था सञ्चालन मापदण्ड निर्देशिका)',
    nameNe: 'स्वास्थ्य संस्था सञ्चालन मापदण्ड निर्देशिका २०७७',
    roleEn: 'Official government guidelines mandating minimum bed ratios, ICU ventilators, fire safety, hospital waste management, and mandatory 10% free beds for indigent patients.',
    roleNe: 'अस्पताल सञ्चालनका लागि न्यूनतम शैय्या, आईसीयू भेन्टिलेटर, फोहोरमैला व्यवस्थापन तथा १०% शैय्या गरिब बिरामीका लागि अनिवार्य निःशुल्क छुट्याउनुपर्ने सरकारी मापदण्ड।',
  },
];

export const EDUCATION_CAREER_INSIGHTS = [
  {
    titleEn: 'Academic Degrees: MHM & BHM in Nepal',
    titleNe: 'शैक्षिक उपाधि: नेपालमा एमएचएम र बीएचएम',
    pointsEn: [
      'Master of Healthcare Management (MHM): 2-year postgraduate program offered by Pokhara University, Kathmandu University (KU), and Purbanchal University.',
      'Bachelor of Healthcare Management (BHM): 4-year undergraduate degree preparing administrative executives for hospital operations.',
      'Core Curricula: Hospital Operations, Health Economics, Epidemiology, Bio-medical Waste Management, Health Informatics (DHIS-2), and Medical Ethics.',
    ],
    pointsNe: [
      'मास्टर अफ हेल्थकेयर म्यानेजमेन्ट (MHM): पोखरा विश्वविद्यालय, काठमाडौं विश्वविद्यालय र पूर्वाञ्चल विश्वविद्यालयद्वारा सञ्चालित २ वर्षे स्नातकोत्तर कार्यक्रम।',
      'ब्याचलर अफ हेल्थकेयर म्यानेजमेन्ट (BHM): अस्पताल सञ्चालनका लागि ४ वर्षे स्नातक कार्यक्रम।',
      'प्रमुख विषयहरू: अस्पताल सञ्चालन, स्वास्थ्य अर्थशास्त्र, स्वास्थ्य सूचना प्रणाली, फोहोरमैला व्यवस्थापन र मेडिकल कानुन।',
    ],
  },
  {
    titleEn: 'Career Pathways & Salary Benchmarks',
    titleNe: 'रोजगारीको अवसर र तलब संरचना',
    pointsEn: [
      'Entry Level (Hospital Administrative Officer / Quality Assistant): NPR 35,000 – NPR 50,000 / month.',
      'Mid-Level (Operations Manager / TPA & Insurance Lead / HR Head): NPR 60,000 – NPR 1,00,000 / month.',
      'Senior Level (Chief Operating Officer / Hospital Administrator): NPR 1,20,000 – NPR 2,50,000+ / month in premier private hospitals.',
      'Key Employers: Central government hospitals (Bir, Gangalal, TUTH), private hospital networks (Mediciti, Grande, Norvic), UN agencies (WHO, UNICEF), and NGOs/INGOs.',
    ],
    pointsNe: [
      'सुरुवाती तह (अस्पताल प्रशासकीय अधिकृत / गुणस्तर सहायक): मासिक रु. ३५,००० – ५०,००० सम्म।',
      'मध्यम तह (सञ्चालन प्रबन्धक / स्वास्थ्य बीमा प्रमुख): मासिक रु. ६०,००० – १,००,००० सम्म।',
      'वरिष्ठ तह (प्रमुख सञ्चालन अधिकृत / वरिष्ठ अस्पताल प्रशासक): ठूला निजी अस्पतालहरूमा मासिक रु. १,२०,००० – २,५०,०००+ सम्म।',
      'कार्यक्षेत्र: केन्द्रीय सरकारी अस्पताल, निजी अस्पताल, विश्व स्वास्थ्य संगठन (WHO), तथा अन्तर्राष्ट्रिय गैरसरकारी संस्थाहरू।',
    ],
  },
];
