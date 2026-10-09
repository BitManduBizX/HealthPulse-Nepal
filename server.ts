import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HealthPulse Nepal API',
    nepalTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
    hasDefaultApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Gemini Health AI Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history = [], language = 'en', customApiKey } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Smart local fallback assistant when no API key is available
      const fallbackResponse = generateLocalAssistantResponse(message, language);
      res.json({
        reply: fallbackResponse,
        source: 'local_guidance_system',
        notice: 'Powered by HealthPulse Nepal Knowledge Base. Add a Gemini API key in Settings for AI generation.',
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are "HealthPulse AI" (स्वास्थ्यसेवा एआई), an intelligent, empathetic, and culturally knowledgeable Nepali Healthcare & Hospital Assistant.
You serve citizens, visitors, and medical staff across Nepal's 7 Provinces.

Key Knowledge & Guidelines:
1. Always prioritize patient safety. Include a polite reminder for emergencies: "For critical emergencies, immediately call Nepal Ambulance at 102 or Police at 100."
2. Language: Respond in the user's preferred language (Nepali in Devanagari script if asked in Nepali or requested, English if asked in English, or bilingual Nepali/English for clarity).
3. Nepal Hospital Timing Awareness:
   - Nepal regular working days: Sunday to Friday.
   - Government OPD hours: Usually 9:00 AM – 3:00 PM (some extended clinics till 5:00 PM).
   - Saturday is the national weekly holiday: Government hospital OPD is CLOSED; Emergency, ICU, and Trauma care are strictly 24/7.
4. Key Hospital Specializations in Nepal:
   - Trauma & Accidents: National Trauma Center (Mahakalsthan, Ktm), Bir Hospital, Patan Hospital, TUTH Emergency.
   - Heart Disease: Shahid Gangalal National Heart Center (Bansbari), Manmohan Cardiothoracic (Maharajgunj).
   - Cancer: Bhaktapur Cancer Hospital, B.P. Koirala Memorial Cancer Hospital (Bharatpur), Sushil Koirala Cancer Hospital (Banke).
   - Infectious Diseases & Rabies: Sukraraj Tropical & Infectious Disease Hospital (Teku) - primary hub for rabies vaccines, snake bites, cholera, dengue.
   - Pediatric / Child Health: Kanti Children's Hospital (Maharajgunj).
   - Maternity & Women's Health: Paropakar Maternity & Women's Hospital (Prasuti Griha, Thapathali).
   - Eye Care: Nepal Eye Hospital (Tripureshwor), Tilganga Institute of Ophthalmology (Gaushala).
   - Mental Health: Mental Hospital Lagankhel, TUTH Psychiatry.
5. Bipanna Nagarik Upachar Kosh (विपन्न नागरिक उपचार कोष):
   - Government subsidy of up to NPR 1,00,000 for 8 designated critical illnesses: Heart disease, Cancer, Kidney disease, Parkinson's, Alzheimer's, Spinal injury, Head injury, Sickle Cell Anemia.
   - Free lifelong hemodialysis for kidney failure and transplant support up to NPR 4,00,000.
   - Requires Ward Recommendation (वडा सिफारिस) and citizenship document.
6. Tone: Warm, helpful, medically structured (Step 1, Step 2, Next Steps), non-diagnostic, strictly adhering to practical Nepali healthcare logistics.`;

    const contents = [
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API request timed out')), 6000)
    );

    const response: any = await Promise.race([generatePromise, timeoutPromise]);

    const reply = response?.text || 'I could not generate a response. Please consult your nearest healthcare provider or dial 102.';

    res.json({
      reply,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    // Graceful fallback with local guidance if Gemini API encountered quota or network issues
    const { message = '', language = 'en' } = req.body;
    const fallbackResponse = generateLocalAssistantResponse(message, language);
    res.json({
      reply: fallbackResponse,
      source: 'local_guidance_fallback',
      notice: 'HealthPulse fallback response provided due to API connectivity/quota.',
      errorDetails: error?.message || 'Gemini service temporarily unreachable',
    });
  }
});

// Deterministic local healthcare guidance generator for offline/unconfigured key resilience
function generateLocalAssistantResponse(query: string, language: string = 'en'): string {
  const q = query.toLowerCase();
  const isNe = language === 'ne' || /[\u0900-\u097F]/.test(query);

  if (q.includes('rabies') || q.includes('रेबिज') || q.includes('dog bite') || q.includes('कुकुरले टोक्यो')) {
    if (isNe) {
      return `🔴 **कुकुर वा जनावरले टोकेको अवस्था (रेबिज खोप सल्लाह):**
1. **तत्काल प्राथमिक उपचार:** टोकेको घाउलाई तुरुन्तै बगिरहेको धाराको पानी र साबुनले कम्तीमा १५ मिनेटसम्म राम्ररी धुनुहोस्। घाउमा खुर्सानी वा बेसार नदल्नुहोस्।
2. **रेबिज खोप केन्द्र:**
   - **काठमाडौं उपत्यका:** शुक्रराज ट्रपिकल तथा सरुवा रोग अस्पताल (टेकु अस्पताल), फोन: ०१-५३५३३५२। यहाँ चौबीसै घण्टा खोप तथा इम्युनोग्लोबुलिन (RIG) उपलब्ध हुन्छ।
   - **उपत्यका बाहिर:** सबै प्रादेशिक तथा जिल्ला अस्पतालहरूको आकस्मिक कक्ष।
3. **समयमै खोप:** पहिलो खोप (Day 0) टोकेकै दिन वा २४ घण्टाभित्र अनिवार्य लगाउनुहोस्।
🚨 आकस्मिक अवस्थामा तुरुन्त १०२ एम्बुलेन्स सेवा सम्पर्क गर्नुहोस्।`;
    }
    return `🔴 **Dog / Animal Bite Protocol & Rabies Vaccine in Nepal:**
1. **Immediate First Aid:** Wash the bite wound immediately under running water with soap for at least 15 minutes. Do NOT apply chili, turmeric, or tight bandages.
2. **Primary Rabies Center:**
   - **Kathmandu Valley:** Sukraraj Tropical & Infectious Disease Hospital (Teku Hospital), Phone: 01-5353352. Rabies post-exposure prophylaxis (ARV) and Immunoglobulin (RIG) are available 24/7.
   - **Outside Kathmandu:** All Provincial and District Hospital Emergency Departments.
3. **Vaccination Schedule:** Administer Day 0 vaccine immediately or within 24 hours.
🚨 For emergencies or ambulance, dial 102.`;
  }

  if (q.includes('bipanna') || q.includes('विपन्न') || q.includes('kosh') || q.includes('कोष') || q.includes('उपचार कोष')) {
    if (isNe) {
      return `📋 **विपन्न नागरिक उपचार कोष (Bipanna Nagarik Upachar Kosh) प्रक्रिया:**
1. **सुविधा पाउने ८ कडा रोगहरू:** मुटुरोग, क्यान्सर, मिर्गौला रोग, पार्किन्सन्स, अल्जाइमर्स, स्पाइनल इन्जुरी, हेड इन्जुरी, र सिकलसेल एनिमिया।
2. **आर्थिक सुविधा:**
   - साधारणतया रु. १,००,०००/- सम्मको निःशुल्क उपचार/औषधि।
   - मिर्गौला रोगीका लागि निःशुल्क हेमोडायलायसिस र प्रत्यारोपणका लागि रु. ४,००,००० सम्म।
3. **आवश्यक कागजातहरू:**
   - स्थानीय वडा कार्यालयको सिफारिस पत्र (विपन्नता प्रमाणित)।
   - नेपाली नागरिकताको प्रमाणपत्रको प्रतिलिपि (नाबालक भए जन्मदर्ता)।
   - सम्बन्धित चिकित्सक/अस्पतालको रोग निदान (Diagnosis) रिपोर्ट।
   - हालसालै खिचिएको २ प्रति पासपोर्ट साइजको फोटो।
4. **प्रमुख सूचीकृत अस्पतालहरू:** वीर अस्पताल, सहिद गंगालाल राष्ट्रिय हृदय केन्द्र, भक्तपुर क्यान्सर अस्पताल, बीपी कोइराला क्यान्सर अस्पताल भरतपुर, पाटन अस्पताल।`;
    }
    return `📋 **Bipanna Nagarik Upachar Kosh (Indigent Citizens Treatment Fund):**
1. **Eligible 8 Major Illnesses:** Heart disease, Cancer, Kidney disease, Parkinson's, Alzheimer's, Spinal injury, Head injury, and Sickle Cell Anemia.
2. **Financial Relief:**
   - Up to NPR 1,00,000 in free treatment/medications.
   - Free lifelong hemodialysis for kidney patients, and up to NPR 4,00,000 subsidy for kidney transplantation.
3. **Required Documents:**
   - Ward Office Recommendation Letter (विपन्नता सिफारिस).
   - Photocopy of Nepali Citizenship Certificate (or Birth Certificate for minors).
   - Medical diagnosis report from authorized physician/hospital.
   - 2 passport-sized photographs.
4. **Key Listed Hospitals:** Bir Hospital, Shahid Gangalal National Heart Center, Bhaktapur Cancer Hospital, BPK Memorial Cancer Hospital (Bharatpur), Patan Hospital, and Provincial Referral Hospitals.`;
  }

  if (q.includes('saturday') || q.includes('शनिबार') || q.includes('open') || q.includes('खुल्छ') || q.includes('समय')) {
    if (isNe) {
      return `⏰ **नेपालमा अस्पताल सञ्चालन समय र शनिबारको व्यवस्था:**
- **साताका दिनहरू (आइतबार देखि शुक्रबार):** सरकारी अस्पतालको ओपीडी (OPD) बिहान ९:०० बजेदेखि दिउँसो ३:००/५:०० बजेसम्म नियमित सञ्चालन हुन्छ। टिकट बिहान ८:०० बजेदेखि खुल्छ।
- **शनिबार र सार्वजनिक बिदा:** सरकारी अस्पतालको ओपीडी बन्द रहन्छ।
- **आकस्मिक (Emergency) र ट्रमा सेवा:** वीर अस्पताल, गंगालाल, कान्ति, पाटन, त्रिवि शिक्षण अस्पताललगायत सबै अस्पतालहरूमा २४सै घण्टा, ३६५ दिन खुला रहन्छ।
- **निजी अस्पतालहरू:** मेडिसिटी, ग्राण्डी, नर्भिक, स्टार अस्पतालहरूमा शनिबार पनि इमर्जेन्सी तथा सीमित परामर्श सेवा उपलब्ध हुन्छ।`;
    }
    return `⏰ **Hospital Operating Hours & Saturday Policy in Nepal:**
- **Regular Weekdays (Sunday to Friday):** Government hospital OPD is open from 9:00 AM to 3:00 PM (some extended clinics till 5:00 PM). Ticket counters typically open at 8:00 AM.
- **Saturdays & Public Holidays:** Government OPDs are CLOSED.
- **Emergency & Trauma Services:** 24/7/365 active across all central, provincial, and private hospitals (Bir Hospital, Gangalal, Patan, TUTH Maharajgunj, Kanti Children's, etc.).
- **Private Hospitals:** Mediciti, Grande, Norvic, and Star run 24/7 emergency care and specialized weekend on-call consultants.`;
  }

  if (q.includes('snake') || q.includes('सर्प') || q.includes('विष')) {
    if (isNe) {
      return `🐍 **सर्पदंश (Snake Bite) प्राथमिक उपचार तथा सावधानी:**
1. **के गर्ने:**
   - बिरामीलाई शान्त राख्नुहोस्, हलचल गर्न नदिनुहोस्।
   - डसेको अंगलाई मुटुको सतहभन्दा तल राख्नुहोस्।
   - औंठी, चुरा, घडी वा कसिलो लुगा तुरुन्त फुकाल्नुहोस्।
   - तुरुन्तै नजिकको सर्पदंश उपचार केन्द्र वा प्रादेशिक अस्पताल लैजानुहोस् (जहाँ एन्टी-स्नेक भेनम उपलब्ध छ)।
2. **के नगर्ने:**
   - डसेको ठाउँमा ब्लेडले नकाट्नुहोस्।
   - मुखले रगत नचुस्नुहोस्।
   - डोरी वा रबरले बेसरी नबाँध्नुहोस् (यसले अंग कुहिन सक्छ)।
3. **उपचार केन्द्रहरू:** तराईका सबै जिल्ला अस्पतालहरू, भरतपुर अस्पताल, कोशी अस्पताल, भेरी अस्पताल र काठमाडौंमा टेकु अस्पताल।`;
    }
    return `🐍 **Snake Bite Management & Anti-Venom Protocol in Nepal:**
1. **Immediate DOs:**
   - Keep patient calm and completely still. Immobilize the bitten limb (like a fracture).
   - Keep bitten area at or below heart level.
   - Remove rings, watches, or tight clothing before swelling begins.
   - Transport immediately to the nearest designated snakebite center or provincial hospital with Anti-Snake Venom (ASV).
2. **Strict DON'Ts:**
   - Do NOT cut, suck, or burn the wound.
   - Do NOT apply tight arterial tourniquets (can cause tissue necrosis).
3. **Key Facilities:** Sukraraj Tropical (Teku, Ktm), Bharatpur Hospital, Koshi Hospital, Bheri Hospital, Lumbini Provincial Hospital, and Nepal Army snakebite units across Terai districts.`;
  }

  if (isNe) {
    return `नमस्ते! म HealthPulse AI हुँ — नेपालको डिजिटल स्वास्थ्य सहायक।

म तपाईंलाई निम्न विषयमा सहयोग गर्न सक्छु:
1. **अस्पताल विवरण:** नेपालका केन्द्रीय, प्रादेशिक र निजी अस्पतालहरूको ओपीडी समय र आकस्मिक सेवा।
2. **विपन्न नागरिक उपचार कोष:** रु. १ लाखसम्मको सहुलियत, वडा सिफारिस र प्रक्रिया।
3. **रोगअनुसार उपयुक्त अस्पताल:** मुटु, क्यान्सर, मिर्गौला, बालरोग वा हाडजोर्नीका लागि सिफारिस।
4. **प्राथमिक उपचार:** रेबिज, सर्पदंश, ज्वरो, दुर्घटना रोकथाम।

*नोट: यो प्लेटफर्म आकस्मिक सेवाको विकल्प होइन। गम्भीर बिरामीका लागि तुरुन्त १०२ मा फोन गर्नुहोस्।*
कृपया आफ्नो जिज्ञासा प्रस्ट सोध्नुहोस्!`;
  }

  return `Hello! I am HealthPulse AI — your comprehensive Nepali Healthcare Assistant.

I can assist you with:
1. **Hospital Operating Status & OPD Timings:** Check whether Bir, Gangalal, TUTH, Patan, Teku, or private hospitals are open today.
2. **Bipanna Nagarik Upachar Kosh:** Step-by-step guidance on ward recommendation forms and financial subsidies (up to NPR 100,000).
3. **Specialized Departments:** Find the right hospital for cardiology, cancer, nephrology, pediatrics, or trauma.
4. **Emergency First Aid Protocols:** Rabies dog bite, snakebite, trauma, and emergency ambulance dispatch (102).

*Note: For life-threatening emergencies, immediately call Nepal Ambulance at 102 or Police at 100.*
How can I assist you with your healthcare query today?`;
}

// Development and Production Static Serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HealthPulse Nepal server running on port ${PORT} (host: 0.0.0.0)`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
