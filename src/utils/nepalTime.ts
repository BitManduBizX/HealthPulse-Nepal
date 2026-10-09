import { Hospital } from '../types';

export interface NepalTimeState {
  date: Date;
  nepalTimeStr: string;
  nepalDateStr: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  dayNameEn: string;
  dayNameNe: string;
  isSaturday: boolean;
  bsYear: number;
  bsMonth: string;
  bsDay: number;
  currentFestival: { nameEn: string; nameNe: string; isHoliday: boolean } | null;
}

const NEPALI_DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NEPALI_DAYS_NE = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];

// Helper to convert English date to approximate Nepal Bikram Sambat (BS) date
export function getApproximateBsDate(date: Date) {
  // Approximate conversion: BS is roughly 56 years, 8 months ahead of Gregorian
  const gregorianYear = date.getUTCFullYear();
  const gregorianMonth = date.getUTCMonth(); // 0-11
  const gregorianDay = date.getUTCDate();

  // For mid-April onwards (approx Baishakh 1)
  let bsYear = gregorianYear + 56;
  if (gregorianMonth > 3 || (gregorianMonth === 3 && gregorianDay >= 14)) {
    bsYear += 1;
  }

  const bsMonths = [
    { en: 'Baishakh', ne: 'वैशाख' },
    { en: 'Jestha', ne: 'जेठ' },
    { en: 'Ashadh', ne: 'असार' },
    { en: 'Shrawan', ne: 'श्रावण' },
    { en: 'Bhadra', ne: 'भाद्र' },
    { en: 'Ashwin', ne: 'असोज' },
    { en: 'Kartik', ne: 'कार्तिक' },
    { en: 'Mangsir', ne: 'मंसिर' },
    { en: 'Poush', ne: 'पुस' },
    { en: 'Magh', ne: 'माघ' },
    { en: 'Falgun', ne: 'फागुन' },
    { en: 'Chaitra', ne: 'चैत' },
  ];

  // Rough month mapping
  const monthIdx = (gregorianMonth + 8) % 12;
  const bsMonth = bsMonths[monthIdx];
  const bsDay = Math.min(30, Math.max(1, ((gregorianDay + 15) % 30) + 1));

  return {
    bsYear,
    bsMonthEn: bsMonth.en,
    bsMonthNe: bsMonth.ne,
    bsDay,
  };
}

export function getNepalTime(customOverrideDate?: Date): NepalTimeState {
  const now = customOverrideDate || new Date();

  // Compute Nepal UTC+5:45
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalOffsetMs = (5 * 60 + 45) * 60 * 1000;
  const nepalDate = new Date(utc + nepalOffsetMs);

  const dayOfWeek = nepalDate.getDay();
  const isSaturday = dayOfWeek === 6;

  const hours = nepalDate.getHours();
  const minutes = nepalDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const nepalTimeStr = `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm} (NPT)`;

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const nepalDateStr = nepalDate.toLocaleDateString('en-US', options);

  const bs = getApproximateBsDate(nepalDate);

  // Festival & Holiday detection for Nepal
  let currentFestival: { nameEn: string; nameNe: string; isHoliday: boolean } | null = null;

  // Let's check October/Ashwin-Kartik Dashain & Tihar season
  const month = nepalDate.getMonth(); // 9 = October
  if (month === 9) {
    if (nepalDate.getDate() >= 8 && nepalDate.getDate() <= 15) {
      currentFestival = {
        nameEn: 'Dashain Festival Period (विजया दशमी पर्व)',
        nameNe: 'बडा दशैं पर्व विदा अवधि',
        isHoliday: true,
      };
    }
  }

  return {
    date: nepalDate,
    nepalTimeStr,
    nepalDateStr,
    dayOfWeek,
    dayNameEn: NEPALI_DAYS_EN[dayOfWeek],
    dayNameNe: NEPALI_DAYS_NE[dayOfWeek],
    isSaturday,
    bsYear: bs.bsYear,
    bsMonth: bs.bsMonthEn,
    bsDay: bs.bsDay,
    currentFestival,
  };
}

export type HospitalStatusType =
  | 'open_opd'
  | 'closing_soon'
  | 'saturday_holiday'
  | 'festival_closed'
  | 'closed_hours';

export interface HospitalStatusResult {
  status: HospitalStatusType;
  badgeLabelEn: string;
  badgeLabelNe: string;
  badgeColor: 'green' | 'red' | 'amber' | 'blue';
  emergencyStatusEn: string;
  emergencyStatusNe: string;
  opdStatusEn: string;
  opdStatusNe: string;
  detailNoteEn: string;
  detailNoteNe: string;
}

export function evaluateHospitalOperatingStatus(
  hospital: Hospital,
  nepalTime: NepalTimeState
): HospitalStatusResult {
  const hour = nepalTime.date.getHours();
  const minute = nepalTime.date.getMinutes();
  const currentMinutesFromMidnight = hour * 60 + minute;

  // Standard Government OPD hours: 9:00 AM (540m) to 3:00 PM (900m) or 5:00 PM (1020m)
  // Private OPD hours: 8:00 AM (480m) to 7:00 PM (1140m)
  const isPrivate = hospital.category === 'private';
  const opdStartMinutes = isPrivate ? 8 * 60 : 9 * 60;
  const opdEndMinutes = isPrivate ? 19 * 60 : 15 * 60;

  // Check Saturday Holiday
  if (nepalTime.isSaturday) {
    if (hospital.saturdayOpdOpen) {
      // Private hospital with Saturday OPD
      if (currentMinutesFromMidnight >= opdStartMinutes && currentMinutesFromMidnight < opdEndMinutes) {
        return {
          status: 'open_opd',
          badgeLabelEn: 'Open Today (Weekend OPD Active)',
          badgeLabelNe: 'आज खुला छ (सप्ताहन्त ओपीडी सञ्चालित)',
          badgeColor: 'green',
          emergencyStatusEn: '24/7 Emergency Active',
          emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा',
          opdStatusEn: 'Private Weekend OPD Open',
          opdStatusNe: 'निजी शनिवार ओपीडी सञ्चालित',
          detailNoteEn: 'Weekend outpatient consultations and 24/7 trauma care active.',
          detailNoteNe: 'शनिवार पनि ओपीडी परामर्श तथा चौबीसै घण्टा आकस्मिक सेवा उपलब्ध।',
        };
      }
    }

    // Government / Standard Saturday
    return {
      status: 'saturday_holiday',
      badgeLabelEn: 'Saturday Holiday (Emergency 24/7 Only)',
      badgeLabelNe: 'शनिवार सार्वजनिक बिदा (आकस्मिक २४/७ खुला)',
      badgeColor: 'amber',
      emergencyStatusEn: '24/7 Emergency Active',
      emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा खुला',
      opdStatusEn: 'OPD Closed on Saturdays',
      opdStatusNe: 'शनिबार ओपीडी सेवा बन्द',
      detailNoteEn: 'Government OPD closed for weekly holiday. Emergency, ICU, and Trauma rooms operate 24/7 without interruption.',
      detailNoteNe: 'सरकारी अस्पतालको ओपीडी नियमित बिदाका कारण बन्द छ। आकस्मिक, सघन उपचार (ICU) र ट्रमा २४सै घण्टा खुला छ।',
    };
  }

  // Check Festival Holiday
  if (nepalTime.currentFestival && nepalTime.currentFestival.isHoliday && !isPrivate) {
    return {
      status: 'festival_closed',
      badgeLabelEn: 'Festival Schedule (Emergency 24/7)',
      badgeLabelNe: 'पर्व तालिका (आकस्मिक २४/७ खुला)',
      badgeColor: 'amber',
      emergencyStatusEn: '24/7 Emergency Active',
      emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा खुला',
      opdStatusEn: 'OPD Closed for Festival',
      opdStatusNe: 'चाडपर्व बिदाका कारण ओपीडी बन्द',
      detailNoteEn: `Reduced OPD operations for ${nepalTime.currentFestival.nameEn}. 24/7 Emergency teams active.`,
      detailNoteNe: `${nepalTime.currentFestival.nameNe} परेकाले नियमित ओपीडी बन्द, तर आकस्मिक कक्ष २४सै घण्टा सक्रिय छ।`,
    };
  }

  // Check OPD Hours
  if (currentMinutesFromMidnight >= opdStartMinutes && currentMinutesFromMidnight < opdEndMinutes) {
    // If within 45 minutes of closing
    if (opdEndMinutes - currentMinutesFromMidnight <= 45) {
      return {
        status: 'closing_soon',
        badgeLabelEn: 'Closing Soon (OPD Ticket Ending)',
        badgeLabelNe: 'चाँडै बन्द हुँदै (टिकट काउन्टर अन्तिम समय)',
        badgeColor: 'amber',
        emergencyStatusEn: '24/7 Emergency Active',
        emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा',
        opdStatusEn: 'OPD Closing in <45 mins',
        opdStatusNe: 'ओपीडी ४५ मिनेटभित्र बन्द हुने',
        detailNoteEn: 'OPD ticket counters are closing shortly. Emergency triage open 24/7.',
        detailNoteNe: 'ओपीडीको टिकट काउन्टर केही बेरमा बन्द हुँदैछ। आकस्मिक सेवा भने २४सै घण्टा खुला छ।',
      };
    }

    return {
      status: 'open_opd',
      badgeLabelEn: 'Open Today (OPD Active Now)',
      badgeLabelNe: 'आज खुला छ (ओपीडी सेवा सञ्चालित)',
      badgeColor: 'green',
      emergencyStatusEn: '24/7 Emergency Active',
      emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा',
      opdStatusEn: 'Active OPD Consultations',
      opdStatusNe: 'ओपीडी तथा प्रयोगशाला खुला',
      detailNoteEn: 'Doctors and clinics are actively seeing patients. Ticket counter open.',
      detailNoteNe: 'चिकित्सकहरू तथा ओपीडी क्लिनिकहरू बिरामी जाँचमा सक्रिय छन्।',
    };
  }

  // Outside OPD hours
  return {
    status: 'closed_hours',
    badgeLabelEn: 'OPD Closed for the Day (Emergency 24/7)',
    badgeLabelNe: 'आजको ओपीडी बन्द (आकस्मिक २४/७ खुला)',
    badgeColor: 'red',
    emergencyStatusEn: '24/7 Emergency Active',
    emergencyStatusNe: '२४सै घण्टा आकस्मिक सेवा खुला',
    opdStatusEn: 'OPD Closed (Resumes 9:00 AM)',
    opdStatusNe: 'ओपीडी बन्द (भोलि बिहान ९:०० बजे खुल्ने)',
    detailNoteEn: 'Daily OPD hours concluded. Emergency, Trauma triage, and Inpatient wards are fully active.',
    detailNoteNe: 'आजको ओपीडी समय सकिएको छ। आकस्मिक कक्ष, ल्याब तथा भर्ना भएका बिरामीको सेवा २४सै घण्टा चालू छ।',
  };
}
