export type AgeGroup = '0-3' | '3-6' | '6-10' | '10-14+';

export type TargetAudience = 'all' | 'bimbi' | 'mamme' | 'papa' | 'famiglia';

export interface AgeBracketInfo {
  id: AgeGroup;
  title: string;
  sub: string;
  range: [number, number];
  icon: string;
  badgeColor: string;
  description: string;
}

export type CategoryId = 
  | 'concerti'
  | 'yoga'
  | 'gokart'
  | 'mare'
  | 'piscina' 
  | 'sport' 
  | 'benessere'
  | 'lingue' 
  | 'musica'
  | 'circoli'
  | 'cinema'
  | 'parchi'
  | 'trasporti'
  | 'ristoranti'
  | 'indoor'
  | 'laboratori'
  | 'cultura'
  | 'feste';

export type CourseType = 'single' | 'ticket' | 'monthly' | 'trial' | 'package';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  color: string;
  bgGradient: string;
  count: number;
  description: string;
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
  experience: string;
  certifications: string[];
}

export interface Review {
  id: string;
  parentName: string;
  childAge?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ActivitySlot {
  id: string;
  dayOfWeek: string; // e.g. 'Sabato 15 Maggio'
  time: string; // e.g. '17:00 - 18:30'
  availableSeats: number;
  startDate: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string; // 'Palermo'
  zone: string; // e.g. 'Politeama', 'Mondello', 'Favorita', 'Centro'
  latitude: number;
  longitude: number;
  image: string;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  facilities: string[];
  description: string;
}

export interface OrganizerProfile {
  id: string;
  name: string;
  category: string;
  logo: string;
  coverImage: string;
  description: string;
  address: string;
  city: string;
  zone: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  isPartner: boolean;
  verified: boolean;
  rating: number;
  reviewCount: number;
  badges: string[];
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  categoryId: CategoryId;
  categoryName?: string;
  targetAudience: TargetAudience; // 'bimbi' | 'mamme' | 'papa' | 'famiglia'
  targetAudienceLabel: string; // e.g. "Per Bimbi 👶", "Per Mamme 🧘‍♀️", "Per Papà 👨‍👦", "Famiglia 👨‍👩‍👧‍👦"
  venueId: string;
  venueName: string;
  address: string;
  city: string; // Palermo
  zone: string;
  distanceKm: number;
  ageMin: number;
  ageMax: number;
  rating: number;
  reviewCount: number;
  attendeesCount: number; // e.g. 320 for Lucilla
  price: number;
  originalPrice?: number;
  priceUnit: string; // e.g., 'a persona', 'a coppia papà-figlio', 'famiglia'
  courseType: CourseType;
  image: string;
  videoTeaserUrl?: string;
  gallery: string[];
  badges: string[]; // e.g., ['Lezione Prova Gratis', 'Lucilla Live', 'Ombrellone Incluso']
  featured?: boolean;
  popular?: boolean;
  isTrialFree?: boolean;
  description: string;
  whatToBring: string[];
  requirements: string[];
  slots: ActivitySlot[];
  instructors?: Instructor[];
  organizerId?: string;
  organizer: {
    name: string;
    avatar: string;
    role: string;
    phone?: string;
  };
  reviews?: Review[];
  latitude: number;
  longitude: number;
}

export interface FamilyMemberProfile {
  id: string;
  name: string;
  role: 'bimbo' | 'mamma' | 'papa';
  birthDate?: string;
  age?: number;
  avatar: string;
  color: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  activityId: string;
  activityTitle: string;
  activityImage: string;
  venueName: string;
  venueAddress: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  slot: ActivitySlot;
  dateSelected: string;
  ticketsCount: number;
  totalPaid: number;
  discountApplied: number;
  paymentMethod: string;
  status: 'confermato' | 'in_attesa' | 'completato' | 'annullato';
  createdAt: string;
  expiresAt?: string; // ISO string for 24h expiration calculation
  qrCodeValue: string;
  notes?: string;
  venuePhone: string;
}

export interface InternalRequest {
  id: string;
  requestCode: string;
  activityId: string;
  activityTitle: string;
  venueName: string;
  organizerName?: string;
  requestedDate: string;
  requestedTimeSlot: string;
  participantName: string;
  ticketCount: number;
  notes?: string;
  createdAt: string;
  status: 'In attesa' | 'Confermata' | 'Archiviata';
}

export interface FilterState {
  categoryId: CategoryId | 'all';
  targetAudience: TargetAudience;
  ageRange: [number, number];
  selectedDays: string[];
  maxDistanceKm: number;
  onlyFreeTrials: boolean;
  searchQuery: string;
  zone: string | 'all';
  sortBy: 'popular' | 'rating' | 'price_asc' | 'distance';
}
