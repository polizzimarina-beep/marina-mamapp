/*
 * Dati di esempio per l'anteprima della dashboard partner.
 * Il partner di prova è un laboratorio creativo di Mondello.
 * Le date sono calcolate a partire da oggi, così l'anteprima è sempre attuale.
 */
import { ILLUSTRAZIONI, IllustrazioneId } from '../data/illustrazioni';

export const COMMISSION_RATE = 0.12; // 12% sulle prenotazioni (da confermare nel modello di ricavo)

export type EventStatus = 'pubblicato' | 'bozza' | 'esaurito' | 'concluso';
export type PaymentMode = 'app' | 'loco';
export type ApprovalMode = 'automatica' | 'manuale';

export interface PartnerEvent {
  id: string;
  title: string;
  illustration: IllustrazioneId;
  description: string;
  ages: string[];
  tags: string[];
  start: Date;
  durationMin: number;
  capacity: number;
  booked: number;
  price: number; // euro a bambino, 0 = gratis
  payment: PaymentMode;
  approval: ApprovalMode;
  cancelHours: number;
  status: EventStatus;
  views: number;
}

export type BookingStatus = 'in_attesa' | 'confermata' | 'presente' | 'annullata' | 'rifiutata';

export interface Booking {
  id: string;
  code: string;
  eventId: string;
  family: string;
  childAges: number[];
  seats: number;
  status: BookingStatus;
  createdAt: Date;
}

export const PARTNER = {
  name: 'Atelier Bimbi Mondello',
  type: 'Laboratori creativi',
  owner: 'Giulia',
  zone: 'Mondello',
  address: 'Viale Regina Elena 34, Palermo',
  phone: '+39 091 000 0000',
  email: 'ciao@atelierbimbi.it',
  plan: 'Base' as 'Base' | 'Premium',
  description:
    'Laboratori di pittura, ceramica e riciclo creativo per bambini dai 3 ai 10 anni, a due passi dal mare. Piccoli gruppi, materiali naturali e tanta libertà di sporcarsi.',
  tags: ['Materiali inclusi', 'Età 3-6', 'Età 6-10', 'Accessibile col passeggino', 'Fasciatoio'],
  hours: [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì - Venerdì', time: '15:30 - 19:30' },
    { day: 'Sabato', time: '9:30 - 13:00 · 15:30 - 19:00' },
    { day: 'Domenica', time: '10:00 - 13:00' }
  ],
  photos: ['creativi', 'ludoteca', 'teatro'] as IllustrazioneId[]
};

export const ALL_TAGS = [
  'Materiali inclusi',
  'Genitore presente',
  'Al coperto',
  'All\'aperto',
  'Età 0-3',
  'Età 3-6',
  'Età 6-10',
  'Età 10+',
  'Fasciatoio',
  'Accessibile col passeggino',
  'Parcheggio vicino',
  'Menu bimbi'
];

const day = (offset: number, hour: number, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  d.setHours(hour, minute, 0, 0);
  return d;
};

export const INITIAL_EVENTS: PartnerEvent[] = [
  {
    id: 'ev-dita',
    title: 'Pittura con le dita',
    illustration: 'creativi',
    description: 'Colori a dita su grandi fogli: un laboratorio sensoriale per i più piccoli.',
    ages: ['3-6'],
    tags: ['Materiali inclusi', 'Al coperto'],
    start: day(1, 16, 30),
    durationMin: 60,
    capacity: 12,
    booked: 9,
    price: 12,
    payment: 'app',
    approval: 'automatica',
    cancelHours: 24,
    status: 'pubblicato',
    views: 214
  },
  {
    id: 'ev-ceramica',
    title: 'Ceramica per piccole mani',
    illustration: 'ludoteca',
    description: 'Modelliamo l\'argilla e decoriamo una ciotolina da portare a casa.',
    ages: ['6-10'],
    tags: ['Materiali inclusi'],
    start: day(3, 10, 30),
    durationMin: 90,
    capacity: 10,
    booked: 10,
    price: 18,
    payment: 'app',
    approval: 'automatica',
    cancelHours: 24,
    status: 'esaurito',
    views: 302
  },
  {
    id: 'ev-natale',
    title: 'Laboratorio di Natale',
    illustration: 'teatro',
    description: 'Decorazioni con materiali di riciclo e una piccola sorpresa finale.',
    ages: ['3-6', '6-10'],
    tags: ['Materiali inclusi', 'Genitore presente'],
    start: day(12, 16, 0),
    durationMin: 120,
    capacity: 15,
    booked: 4,
    price: 15,
    payment: 'loco',
    approval: 'manuale',
    cancelHours: 48,
    status: 'pubblicato',
    views: 96
  },
  {
    id: 'ev-foglie',
    title: 'Stampa con le foglie',
    illustration: 'parchi',
    description: 'Raccogliamo foglie e fiori e li trasformiamo in stampe colorate.',
    ages: ['3-6'],
    tags: ['All\'aperto'],
    start: day(19, 10, 0),
    durationMin: 60,
    capacity: 12,
    booked: 0,
    price: 10,
    payment: 'app',
    approval: 'automatica',
    cancelHours: 24,
    status: 'bozza',
    views: 0
  },
  {
    id: 'ev-sassi',
    title: 'Pittura sui sassi del mare',
    illustration: 'mare',
    description: 'Sassi raccolti in spiaggia diventano animaletti colorati.',
    ages: ['3-6', '6-10'],
    tags: ['Materiali inclusi'],
    start: day(-5, 16, 30),
    durationMin: 60,
    capacity: 12,
    booked: 12,
    price: 12,
    payment: 'app',
    approval: 'automatica',
    cancelHours: 24,
    status: 'concluso',
    views: 388
  }
];

const ago = (hours: number) => new Date(Date.now() - hours * 3600 * 1000);

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'b1', code: 'MAM-4821', eventId: 'ev-natale', family: 'Famiglia Russo', childAges: [4], seats: 1, status: 'in_attesa', createdAt: ago(2) },
  { id: 'b2', code: 'MAM-4822', eventId: 'ev-natale', family: 'Famiglia La Rosa', childAges: [5, 7], seats: 2, status: 'in_attesa', createdAt: ago(5) },
  { id: 'b3', code: 'MAM-4810', eventId: 'ev-dita', family: 'Famiglia Bianchi', childAges: [3], seats: 1, status: 'confermata', createdAt: ago(20) },
  { id: 'b4', code: 'MAM-4807', eventId: 'ev-dita', family: 'Famiglia Greco', childAges: [4, 6], seats: 2, status: 'confermata', createdAt: ago(28) },
  { id: 'b5', code: 'MAM-4799', eventId: 'ev-dita', family: 'Famiglia Messina', childAges: [5], seats: 1, status: 'confermata', createdAt: ago(40) },
  { id: 'b6', code: 'MAM-4790', eventId: 'ev-ceramica', family: 'Famiglia Lombardo', childAges: [8], seats: 1, status: 'confermata', createdAt: ago(52) },
  { id: 'b7', code: 'MAM-4785', eventId: 'ev-ceramica', family: 'Famiglia Costa', childAges: [7, 9], seats: 2, status: 'confermata', createdAt: ago(60) },
  { id: 'b8', code: 'MAM-4776', eventId: 'ev-dita', family: 'Famiglia Ferrara', childAges: [4], seats: 1, status: 'annullata', createdAt: ago(70) },
  { id: 'b9', code: 'MAM-4702', eventId: 'ev-sassi', family: 'Famiglia Marino', childAges: [6], seats: 1, status: 'presente', createdAt: ago(200) },
  { id: 'b10', code: 'MAM-4698', eventId: 'ev-sassi', family: 'Famiglia Gallo', childAges: [4, 8], seats: 2, status: 'presente', createdAt: ago(210) }
];

// Statistiche delle ultime 8 settimane (dalla più vecchia alla più recente)
export const WEEKLY_STATS = [
  { week: 'Sett. 1', views: 120, favorites: 9, bookings: 6 },
  { week: 'Sett. 2', views: 148, favorites: 12, bookings: 8 },
  { week: 'Sett. 3', views: 135, favorites: 10, bookings: 7 },
  { week: 'Sett. 4', views: 190, favorites: 18, bookings: 11 },
  { week: 'Sett. 5', views: 176, favorites: 15, bookings: 10 },
  { week: 'Sett. 6', views: 230, favorites: 22, bookings: 14 },
  { week: 'Sett. 7', views: 262, favorites: 25, bookings: 16 },
  { week: 'Sett. 8', views: 301, favorites: 31, bookings: 19 }
];

export const PAYOUTS = [
  { id: 'p1', date: ago(24 * 3), amount: 211.2, bookings: 20, status: 'Accreditato' },
  { id: 'p2', date: ago(24 * 10), amount: 168.96, bookings: 16, status: 'Accreditato' },
  { id: 'p3', date: ago(24 * 17), amount: 126.72, bookings: 12, status: 'Accreditato' }
];

export const INVOICES = [
  { id: 'f1', number: 'MAM-2026-0031', period: 'Ottobre 2026', amount: 61.44 },
  { id: 'f2', number: 'MAM-2026-0019', period: 'Settembre 2026', amount: 38.88 }
];

export const illustration = (id: IllustrazioneId) => ILLUSTRAZIONI[id];
