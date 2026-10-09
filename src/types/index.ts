export type Province =
  | 'Koshi'
  | 'Madhesh'
  | 'Bagmati'
  | 'Gandaki'
  | 'Lumbini'
  | 'Karnali'
  | 'Sudurpashchim';

export type HospitalCategory =
  | 'central'
  | 'disease_specific'
  | 'teaching'
  | 'ayurveda'
  | 'provincial_district'
  | 'local_nsi'
  | 'private';

export interface BedAvailability {
  general: 'Available' | 'High Occupancy' | 'Limited' | 'Full';
  icu: 'Available' | 'Limited' | 'Full';
  emergency: 'Available' | 'Limited' | 'Crowded';
}

export interface Hospital {
  id: string;
  nameEn: string;
  nameNe: string;
  category: HospitalCategory;
  categoryLabelEn: string;
  categoryLabelNe: string;
  province: Province;
  provinceLabelEn: string;
  provinceLabelNe: string;
  district: string;
  districtNe: string;
  city: string;
  cityNe: string;
  addressEn: string;
  addressNe: string;
  phone: string;
  emergencyPhone: string;
  website?: string;
  mapQuery: string;
  opdHoursEn: string;
  opdHoursNe: string;
  saturdayOpdOpen: boolean;
  emergency24x7: boolean;
  bipannaFundAccepted: boolean;
  totalBeds: number;
  icuBeds: number;
  bedStatus: BedAvailability;
  specialtiesEn: string[];
  specialtiesNe: string[];
  bloodBank: boolean;
  hemodialysis: boolean;
  pharmacy24x7: boolean;
  ambulanceContact: string;
  establishedYear: number;
  featuredNoticeEn?: string;
  featuredNoticeNe?: string;
  descriptionEn: string;
  descriptionNe: string;
}

export interface Doctor {
  id: string;
  nameEn: string;
  nameNe: string;
  titleEn: string;
  titleNe: string;
  specialty: string;
  specialtyEn: string;
  specialtyNe: string;
  hospitalEn: string;
  hospitalNe: string;
  qualification: string;
  experienceYears: number;
  opdScheduleEn: string;
  opdScheduleNe: string;
  nmcNumber: string;
  bioEn: string;
  bioNe: string;
}

export interface BipannaDisease {
  id: string;
  nameEn: string;
  nameNe: string;
  maxReliefNpr: number;
  maxReliefLabelEn: string;
  maxReliefLabelNe: string;
  descriptionEn: string;
  descriptionNe: string;
  specificBenefitsEn: string[];
  specificBenefitsNe: string[];
  recommendedHospitals: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: string;
}
