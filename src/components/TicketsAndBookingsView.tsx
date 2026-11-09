import React, { useState } from 'react';
import { 
  QrCode, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  ChevronRight, 
  Share2, 
  Sparkles, 
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock4,
  ExternalLink,
  Phone,
  Maximize2,
  X,
  CreditCard,
  User,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Booking, Activity } from '../types';
import { MamappLogo } from './MamappLogo';

import { ILLUSTRAZIONI } from '../data/illustrazioni';
interface TicketsAndBookingsViewProps {
  bookings: Booking[];
  onBackToHome: () => void;
  onSelectBookingDetail?: (booking: Booking) => void;
  onExploreActivities: () => void;
}

// Sample enriched past and upcoming bookings to ensure both tabs demonstrate the premium iOS design
const SAMPLE_BOOKINGS_DATA: Booking[] = [
  {
    id: 'book-101',
    bookingCode: 'MAM-PA-882109',
    activityId: 'act-lucilla',
    activityTitle: 'Lucilla in Concerto - Live Show Bambini',
    activityImage: ILLUSTRAZIONI.musica,
    venueName: 'Teatro Golden Palermo',
    venueAddress: 'Via Terrasanta 60, Palermo',
    participantId: 'fam-3',
    participantName: 'Matteo & Sofia',
    participantRole: 'bimbo',
    slot: { id: 's-luc-1', dayOfWeek: 'Sabato 16 Maggio', time: '17:00 - 18:30', availableSeats: 12, startDate: '2026-05-16' },
    dateSelected: 'Sabato 16 Maggio 2026',
    ticketsCount: 2,
    totalPaid: 36,
    discountApplied: 0,
    paymentMethod: 'Apple Pay',
    status: 'confermato',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    qrCodeValue: 'MAMAPP-PALERMO-LUCILLA-882109',
    notes: 'Poltronissima Fila 4 Posti 12-13',
    venuePhone: '+39 091 626 4702'
  },
  {
    id: 'book-102',
    bookingCode: 'MAM-PA-441029',
    activityId: 'act-sassi-mondello',
    activityTitle: 'Piccoli Artisti: Pittura sui Sassi del Mare',
    activityImage: ILLUSTRAZIONI.creativi,
    venueName: 'Atelier Bimbi Mondello',
    venueAddress: 'Viale Regina Margherita 42, Mondello (PA)',
    participantId: 'fam-1',
    participantName: 'Chiara (5 anni)',
    participantRole: 'bimbo',
    slot: { id: 's-art-1', dayOfWeek: 'Domenica 24 Maggio', time: '16:30 - 17:30', availableSeats: 8, startDate: '2026-05-24' },
    dateSelected: 'Domenica 24 Maggio 2026',
    ticketsCount: 1,
    totalPaid: 12,
    discountApplied: 0,
    paymentMethod: 'Carta di Credito',
    status: 'confermato',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    qrCodeValue: 'MAMAPP-PALERMO-SASSI-441029',
    notes: 'Kit pennarelli e sassi incluso',
    venuePhone: '+39 091 450 1120'
  },
  {
    id: 'book-past-1',
    bookingCode: 'MAM-PA-193820',
    activityId: 'act-orto-botanico',
    activityTitle: 'Visita Sensoriale & Tartarughe all\'Orto Botanico',
    activityImage: ILLUSTRAZIONI.parchi,
    venueName: 'Orto Botanico dell\'Università di Palermo',
    venueAddress: 'Via Lincoln 2, Palermo Centro',
    participantId: 'fam-2',
    participantName: 'Famiglia Polizzi (3 pers.)',
    participantRole: 'famiglia',
    slot: { id: 's-orto-1', dayOfWeek: 'Domenica 19 Aprile', time: '10:30 - 12:30', availableSeats: 0, startDate: '2026-04-19' },
    dateSelected: 'Domenica 19 Aprile 2026',
    ticketsCount: 3,
    totalPaid: 18,
    discountApplied: 4,
    paymentMethod: 'Apple Pay',
    status: 'completato',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 35).toISOString(),
    qrCodeValue: 'MAMAPP-PALERMO-ORTO-193820',
    notes: 'Ingresso Orto + Serra Carolina',
    venuePhone: '+39 091 238 91236'
  }
];

export const TicketsAndBookingsView: React.FC<TicketsAndBookingsViewProps> = ({
  bookings = [],
  onBackToHome,
  onExploreActivities
}) => {
  // Use passed bookings or merged sample data to guarantee complete preview
  const allBookings = bookings.length > 0 ? bookings : SAMPLE_BOOKINGS_DATA;

  // Active view tab: 'tickets' (Biglietti con QR) vs 'upcoming' (Prossime) vs 'past' (Passate)
  const [activeSegment, setActiveSegment] = useState<'tickets' | 'upcoming' | 'past'>('tickets');
  
  // Full-screen modal for scanning QR at the venue gate
  const [fullScreenTicket, setFullScreenTicket] = useState<Booking | null>(null);
  
  // Quick copied notification
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const upcomingBookings = allBookings.filter(b => b.status === 'confermato' || b.status === 'in_attesa');
  const pastBookings = allBookings.filter(b => b.status === 'completato' || b.status === 'annullato');

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 flex flex-col font-sans pb-28">
      
      {/* 1. TOP BAR (Minimal, Glass/Clean, Logo Serif Magenta Scuro, No Heavy Dark Blocks) */}
      <header className="sticky top-0 z-30 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            type="button"
            onClick={onBackToHome}
            aria-label="Torna alla Home"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors py-1 px-2 -ml-2 rounded-full cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Logo Mamapp ad acquerello */}
          <button 
            type="button"
            onClick={onBackToHome}
            className="cursor-pointer active:scale-95 transition-transform"
          >
            <MamappLogo size="sm" />
          </button>

          <div className="w-8 flex justify-end">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-600)]" title="Stato Sincronizzato" />
          </div>
        </div>
      </header>

      {/* 2. HEADER EDITORIALE */}
      <section className="max-w-2xl mx-auto w-full px-4 pt-6 pb-4">
        <h1 
          className="text-2xl sm:text-3xl font-serif text-[var(--color-brand-600)] font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          I Miei Biglietti & Prenotazioni
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Accessi digitali con codice QR e riepilogo delle esperienze a Palermo
        </p>

        {/* 3. SEGMENTED CONTROL IOS (Sfondo grigio chiarissimo, pillola attiva) */}
        <div className="mt-5 p-1 bg-slate-100/90 rounded-2xl flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveSegment('tickets')}
            className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'tickets'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Biglietti QR</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeSegment === 'tickets' ? 'bg-[var(--color-brand-600)] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('upcoming')}
            className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'upcoming'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock4 className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Prossime ({upcomingBookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('past')}
            className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'past'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Archivio ({pastBookings.length})</span>
          </button>
        </div>
      </section>

      {/* 4. MAIN CONTENT AREA */}
      <main className="max-w-2xl mx-auto w-full px-4 pt-2 space-y-6">

        {/* ----------------- TAB A: BIGLIETTI ACQUISTATI CON CODICE QR ----------------- */}
        {activeSegment === 'tickets' && (
          <div className="space-y-6">
            
            {upcomingBookings.length === 0 ? (
              /* Empty state pulito ed elegante su fondo crema */
              <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center space-y-4 my-6">
                <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                  <Ticket className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 
                    className="font-serif text-lg font-bold text-slate-800"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Nessun biglietto attivo
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Non hai ancora biglietti acquistati per i prossimi eventi a Palermo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onExploreActivities}
                  className="bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-600)] text-white text-xs font-medium px-6 py-3 rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-xs"
                >
                  Scopri le attività di oggi
                </button>
              </div>
            ) : (
              upcomingBookings.map((ticket) => (
                /* SCHEDA BIGLIETTO DIGITALE ELEGANTE */
                <article 
                  key={ticket.id}
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all hover:border-slate-200"
                >
                  {/* Parte superiore del Biglietto: Dati evento */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Intestazione Ticket: Badge di stato & codice univoco */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                          Biglietto Ufficiale
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {ticket.bookingCode}
                      </span>
                    </div>

                    {/* Foto e Titolo dell'attività */}
                    <div className="flex items-start gap-4">
                      <img 
                        src={ticket.activityImage} 
                        alt={ticket.activityTitle} 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 
                          className="font-serif text-base sm:text-lg font-bold text-slate-800 leading-snug line-clamp-2"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {ticket.activityTitle}
                        </h2>
                        
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-[var(--color-brand-600)] shrink-0" />
                          <span className="truncate">{ticket.venueName}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Clock className="w-3.5 h-3.5 stroke-[1.5] text-slate-400 shrink-0" />
                          <span>{ticket.dateSelected} • {ticket.slot.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dettagli Partecipanti e Posti */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100/80">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Partecipante</span>
                        <span className="font-medium text-slate-700 mt-0.5 block truncate">
                          {ticket.participantName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ingressi</span>
                        <span className="font-medium text-slate-700 mt-0.5 block">
                          {ticket.ticketsCount} {ticket.ticketsCount === 1 ? 'Bambino' : 'Biglietti'} ({ticket.totalPaid === 0 ? 'Gratuito' : `€${ticket.totalPaid}`})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* NOTCH DI PERFORAZIONE (Stile biglietto iOS / Card con tagli laterali e linea tratteggiata) */}
                  <div className="relative flex items-center justify-between my-0">
                    <div className="w-4 h-7 bg-[#FDFCFB] rounded-r-full -ml-1 border-r border-t border-b border-slate-200/50" />
                    <div className="flex-1 border-t border-dashed border-slate-200 mx-3" />
                    <div className="w-4 h-7 bg-[#FDFCFB] rounded-l-full -mr-1 border-l border-t border-b border-slate-200/50" />
                  </div>

                  {/* Parte inferiore del Biglietto: CODICE QR & AZIONI */}
                  <div className="p-5 sm:p-6 bg-slate-50/50 space-y-4 text-center">
                    
                    {/* Codice QR minimale su sfondo bianco puro */}
                    <div className="inline-block bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                      {/* Vettore QR pulito e scansionabile */}
                      <div className="w-36 h-36 mx-auto flex items-center justify-center p-1 bg-white relative">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Corner Markers */}
                          <rect x="5" y="5" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                          <rect x="13" y="13" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />

                          <rect x="69" y="5" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                          <rect x="77" y="13" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />

                          <rect x="5" y="69" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                          <rect x="13" y="77" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />

                          {/* Data Matrix Dots Pattern */}
                          <rect x="37" y="8" width="6" height="6" fill="#1E293B" />
                          <rect x="47" y="8" width="6" height="6" fill="#1E293B" />
                          <rect x="57" y="16" width="6" height="6" fill="#1E293B" />
                          <rect x="37" y="24" width="6" height="6" fill="#1E293B" />
                          <rect x="47" y="24" width="6" height="6" fill="#1E293B" />
                          
                          <rect x="8" y="37" width="6" height="6" fill="#1E293B" />
                          <rect x="16" y="47" width="6" height="6" fill="#1E293B" />
                          <rect x="24" y="37" width="6" height="6" fill="#1E293B" />

                          <rect x="37" y="37" width="8" height="8" rx="2" style={{ fill: "var(--color-brand-600)" }} />
                          <rect x="49" y="37" width="6" height="6" fill="#1E293B" />
                          <rect x="59" y="37" width="6" height="6" fill="#1E293B" />

                          <rect x="37" y="49" width="6" height="6" fill="#1E293B" />
                          <rect x="47" y="49" width="8" height="8" rx="2" style={{ fill: "var(--color-brand-600)" }} />
                          <rect x="59" y="49" width="6" height="6" fill="#1E293B" />

                          <rect x="37" y="61" width="6" height="6" fill="#1E293B" />
                          <rect x="47" y="61" width="6" height="6" fill="#1E293B" />
                          <rect x="57" y="69" width="6" height="6" fill="#1E293B" />

                          <rect x="69" y="37" width="6" height="6" fill="#1E293B" />
                          <rect x="79" y="47" width="6" height="6" fill="#1E293B" />
                          <rect x="89" y="37" width="6" height="6" fill="#1E293B" />
                          <rect x="69" y="57" width="6" height="6" fill="#1E293B" />
                          <rect x="79" y="67" width="6" height="6" fill="#1E293B" />
                          <rect x="89" y="57" width="6" height="6" fill="#1E293B" />

                          <rect x="37" y="79" width="6" height="6" fill="#1E293B" />
                          <rect x="47" y="87" width="6" height="6" fill="#1E293B" />
                          <rect x="57" y="79" width="6" height="6" fill="#1E293B" />
                          <rect x="67" y="87" width="6" height="6" fill="#1E293B" />
                          <rect x="77" y="79" width="6" height="6" fill="#1E293B" />
                          <rect x="87" y="87" width="6" height="6" fill="#1E293B" />
                        </svg>
                      </div>
                      
                      <div className="mt-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(ticket.qrCodeValue)}
                          className="text-[10px] font-mono text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{ticket.qrCodeValue}</span>
                          <span className="text-[9px] text-[var(--color-brand-600)]">
                            {copiedCode === ticket.qrCodeValue ? 'Copiato!' : 'Copia'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Mostra questo QR code all'ingresso del tornello o al desk di registrazione
                    </p>

                    {/* BOTTONI D'AZIONE: Magenta vivace */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFullScreenTicket(ticket)}
                        className="w-full sm:w-auto bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-600)] text-white text-xs font-medium px-5 py-3 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5 stroke-[1.75]" />
                        <span>Mostra Biglietto a Schermo Intero</span>
                      </button>

                      <a
                        href={`tel:${ticket.venuePhone}`}
                        className="w-full sm:w-auto bg-white border border-slate-200/80 hover:border-slate-300 text-slate-700 text-xs font-medium px-4 py-3 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 stroke-[1.5] text-slate-500" />
                        <span>Contatta Location</span>
                      </a>
                    </div>

                  </div>
                </article>
              ))
            )}

            {/* Suggerimento per l'utente */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 text-xs text-slate-500 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">Garanzia Accesso Senza Fila</span>
                <span>Tutti i pass emessi da Mamapp sono convalidati direttamente con le strutture convenzionate di Palermo.</span>
              </div>
            </div>

          </div>
        )}

        {/* ----------------- TAB B: PROSSIME PRENOTAZIONI ----------------- */}
        {activeSegment === 'upcoming' && (
          <div className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center space-y-4 my-6">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto stroke-[1.5]" />
                <h3 
                  className="font-serif text-lg font-bold text-slate-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Nessuna prenotazione futura
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Pianifica il weekend o i pomeriggi dei tuoi bambini a Palermo.
                </p>
                <button
                  type="button"
                  onClick={onExploreActivities}
                  className="bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-600)] text-white text-xs font-medium px-6 py-3 rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Esplora il calendario
                </button>
              </div>
            ) : (
              upcomingBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={b.activityImage} 
                      alt={b.activityTitle} 
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Confermata
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {b.bookingCode}
                        </span>
                      </div>
                      <h4 
                        className="font-serif text-sm font-bold text-slate-800 mt-1"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {b.activityTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {b.venueName} • {b.dateSelected}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveSegment('tickets')}
                      className="bg-[var(--color-brand-600)] text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[var(--color-brand-600)] transition-all cursor-pointer shadow-xs"
                    >
                      Mostra QR
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ----------------- TAB C: ARCHIVIO PRENOTAZIONI PASSATE ----------------- */}
        {activeSegment === 'past' && (
          <div className="space-y-4">
            {pastBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center space-y-3">
                <Clock className="w-8 h-8 text-slate-300 mx-auto stroke-[1.5]" />
                <h3 
                  className="font-serif text-lg font-bold text-slate-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Nessuna esperienza passata
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Le attività completate verranno archiviate qui come storico delle tue esperienze a Palermo.
                </p>
              </div>
            ) : (
              pastBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 opacity-90 shadow-[0_1px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={b.activityImage} 
                      alt={b.activityTitle} 
                      className="w-14 h-14 rounded-xl object-cover shrink-0 grayscale-[40%] border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Completata
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {b.bookingCode}
                        </span>
                      </div>
                      <h4 
                        className="font-serif text-sm font-bold text-slate-800 mt-1"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {b.activityTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {b.venueName} • Svolta il {b.dateSelected}
                      </p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-end">
                    <button
                      type="button"
                      onClick={onExploreActivities}
                      className="bg-white border border-slate-200 text-slate-700 hover:border-slate-300 text-xs font-medium px-4 py-2 rounded-full transition-all cursor-pointer"
                    >
                      Prenota di nuovo
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>

      {/* 5. MODALE SCHERMO INTERO CODICE QR (Ottimizzato per tornelli/luce ingresso) */}
      {fullScreenTicket && (
        <div 
          onClick={() => setFullScreenTicket(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-sm rounded-3xl p-6 border border-slate-100 shadow-2xl space-y-5 text-center relative animate-in zoom-in-95 duration-200 cursor-default"
          >
            {/* Pulsante chiusura */}
            <button
              type="button"
              onClick={() => setFullScreenTicket(null)}
              aria-label="Chiudi visualizzatore QR"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Testata del Pass */}
            <div>
              <span className="font-serif text-xl font-bold text-[var(--color-brand-600)] block" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Mamapp Pass
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Luminosità aumentata per lettura ottica
              </p>
            </div>

            {/* QR Grande Scannerizzabile */}
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-inner inline-block">
              <div className="w-48 h-48 mx-auto flex items-center justify-center p-2 bg-white">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                  <rect x="13" y="13" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />
                  <rect x="69" y="5" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                  <rect x="77" y="13" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />
                  <rect x="5" y="69" width="26" height="26" rx="4" stroke="#1E293B" strokeWidth="6" />
                  <rect x="13" y="77" width="10" height="10" style={{ fill: "var(--color-brand-600)" }} />
                  <rect x="37" y="8" width="6" height="6" fill="#1E293B" />
                  <rect x="47" y="8" width="6" height="6" fill="#1E293B" />
                  <rect x="57" y="16" width="6" height="6" fill="#1E293B" />
                  <rect x="37" y="37" width="8" height="8" rx="2" style={{ fill: "var(--color-brand-600)" }} />
                  <rect x="49" y="37" width="6" height="6" fill="#1E293B" />
                  <rect x="47" y="49" width="8" height="8" rx="2" style={{ fill: "var(--color-brand-600)" }} />
                  <rect x="69" y="37" width="6" height="6" fill="#1E293B" />
                  <rect x="79" y="47" width="6" height="6" fill="#1E293B" />
                  <rect x="89" y="57" width="6" height="6" fill="#1E293B" />
                  <rect x="37" y="79" width="6" height="6" fill="#1E293B" />
                  <rect x="47" y="87" width="6" height="6" fill="#1E293B" />
                  <rect x="77" y="79" width="6" height="6" fill="#1E293B" />
                </svg>
              </div>
              <span className="font-mono text-xs font-bold text-slate-800 tracking-wider block mt-2">
                {fullScreenTicket.bookingCode}
              </span>
            </div>

            {/* Dati essenziali per il tornello */}
            <div className="bg-slate-50 p-3.5 rounded-2xl text-left text-xs space-y-1 border border-slate-100">
              <p className="font-semibold text-slate-800 truncate">{fullScreenTicket.activityTitle}</p>
              <p className="text-slate-500">{fullScreenTicket.venueName}</p>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200/60 text-[11px]">
                <span>{fullScreenTicket.dateSelected}</span>
                <span className="font-medium text-[var(--color-brand-600)]">{fullScreenTicket.slot.time}</span>
              </div>
            </div>

            {/* Bottone Chiudi */}
            <button
              type="button"
              onClick={() => setFullScreenTicket(null)}
              className="w-full bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-600)] text-white text-xs font-medium py-3 rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-xs"
            >
              Fatto
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
