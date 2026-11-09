import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Lock, 
  Check, 
  Minus, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { Activity, ActivitySlot, FamilyMemberProfile, Booking, InternalRequest } from '../types';

interface BookingModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMemberProfile[];
  onConfirmBooking: (newBooking: Booking) => void;
  onSendCustomRequest?: (request: InternalRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  activity,
  isOpen,
  onClose,
  familyMembers,
  onConfirmBooking,
}) => {
  if (!isOpen || !activity) return null;

  // Available slots for the activity
  const availableSlots: ActivitySlot[] = (activity.slots && activity.slots.length > 0)
    ? activity.slots
    : [
        {
          id: 'slot-1',
          dayOfWeek: 'Oggi',
          time: '16:30 - 17:30',
          availableSeats: 8,
          startDate: '2026-05-15'
        },
        {
          id: 'slot-2',
          dayOfWeek: 'Domani',
          time: '10:30 - 11:30',
          availableSeats: 5,
          startDate: '2026-05-16'
        },
        {
          id: 'slot-3',
          dayOfWeek: 'Domenica',
          time: '16:30 - 18:00',
          availableSeats: 6,
          startDate: '2026-05-17'
        }
      ];

  const [selectedSlot, setSelectedSlot] = useState<ActivitySlot>(availableSlots[0]);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Pricing calculation
  const unitPrice = activity.price !== undefined ? activity.price : 12;
  const rawTotal = unitPrice * ticketCount;
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const applyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'PALERMO10' || code === 'MAMMA10') {
      setDiscountPercent(10);
      setPromoSuccess('Sconto 10% applicato');
    } else if (code === 'MAMAPP20') {
      setDiscountPercent(20);
      setPromoSuccess('Sconto 20% applicato');
    } else {
      setPromoError('Codice non valido (prova: PALERMO10)');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `MAM-PA-${randomNum}`;
    const qrCodeValue = `MAMAPP-${bookingCode}-${Date.now()}`;

    const defaultMember = familyMembers[0] || {
      id: 'default-fam',
      name: 'Famiglia',
      role: 'mamma',
      avatar: '👩',
      color: 'bg-pink-100'
    };

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingCode,
      activityId: activity.id,
      activityTitle: activity.title,
      activityImage: activity.image,
      venueName: activity.venueName,
      venueAddress: activity.address,
      participantId: defaultMember.id,
      participantName: defaultMember.name,
      participantRole: defaultMember.role,
      slot: selectedSlot,
      dateSelected: `${selectedSlot.dayOfWeek} • ${selectedSlot.time}`,
      ticketsCount: ticketCount,
      totalPaid: finalTotal,
      discountApplied: discountAmount,
      paymentMethod: 'Pagamento Online (Apple Pay / Carta)',
      status: 'confermato',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      qrCodeValue,
      venuePhone: activity.organizer?.phone || '+39 091 626 4702'
    };

    setCreatedBooking(newBooking);
    setIsSuccess(true);
    onConfirmBooking(newBooking);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.06)] overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col relative animate-in slide-in-from-bottom duration-300 cursor-default"
      >
        
        {/* 1. INTESTAZIONE (Header): Bianco puro, Titolo Serif Magenta Luminoso #E11D48, Sottotitolo Sans-serif grigio chiaro, X cerchietto */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="w-8" /> {/* Spacer per perfetto bilanciamento */}
          
          <div className="text-center flex-1 min-w-0 px-2">
            <h2 
              className="font-serif text-lg sm:text-xl font-bold text-[#E11D48] tracking-tight leading-snug"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {isSuccess ? 'Prenotazione Confermata!' : 'Prenota Attività a Palermo'}
            </h2>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              mamapp • Pagamento sicuro
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-100"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6 text-slate-800">
          
          {isSuccess && createdBooking ? (
            /* Conferma avvenuta con successo in stile iOS Premium */
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-[#FFF0F5] text-[#E11D48] flex items-center justify-center mx-auto border border-[#FCD3E1]">
                <Check className="w-7 h-7 stroke-[2.2]" />
              </div>
              
              <div className="space-y-1">
                <h3 
                  className="font-serif text-xl font-bold text-slate-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Biglietto Emesso con Successo
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Il tuo voucher con codice QR è pronto e salvato nella sezione Biglietti di Mamapp.
                </p>
              </div>

              {/* Card riepilogo bianca con bordo sottilissimo */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Codice Voucher</span>
                  <span className="text-xs font-mono font-bold text-[#E11D48] bg-[#FFF0F5] px-2 py-0.5 rounded">
                    {createdBooking.bookingCode}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">{createdBooking.activityTitle}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{createdBooking.venueName}</p>
                  <p className="text-xs text-[#E11D48] font-medium mt-1">
                    {createdBooking.dateSelected}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
                  <span>Totale pagato:</span>
                  <span className="font-bold text-slate-800">€{createdBooking.totalPaid}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#E11D48] hover:bg-[#D91656] text-white text-sm font-semibold py-3.5 rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-xs"
              >
                Vedi i Miei Biglietti
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Anteprima sintetica attività */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48] stroke-[1.5] shrink-0" />
                    <span>{activity.venueName}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-800">
                    {unitPrice === 0 ? 'Gratis' : `${unitPrice} €`}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ bambino</span>
                </div>
              </div>

              {/* 2. SELEZIONE DATA E ORARIO */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 block">
                  SELEZIONA DATA E ORARIO
                </label>

                <div className="space-y-2">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot.id === slot.id;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF0F5] border border-[#FCD3E1] shadow-xs'
                            : 'bg-white border border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-transparent text-[#E11D48]' : 'bg-transparent text-slate-400'
                          }`}>
                            <Clock className="w-4 h-4 stroke-[1.75]" />
                          </div>
                          <div>
                            <p className={`text-xs font-semibold ${isSelected ? 'text-slate-800 font-bold' : 'text-slate-500'}`}>
                              {slot.dayOfWeek} • {slot.time}
                            </p>
                            <p className="text-[11px] text-slate-400 font-normal">
                              Orario confermato
                            </p>
                          </div>
                        </div>

                        {/* Testo posti: Opzione selezionata ha testo piccolo discreto color Magenta vivace */}
                        <div>
                          {isSelected ? (
                            <span className="text-xs font-bold text-[#E11D48]">
                              {slot.availableSeats ? `${slot.availableSeats} posti rimasti` : 'Disponibile'}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">
                              {slot.availableSeats ? `${slot.availableSeats} posti` : 'Disponibile'}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. MODALITÀ DI PAGAMENTO: Box bianco puro, bordo sottile */}
              <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#E11D48] shrink-0">
                    <Lock className="w-4 h-4 stroke-[1.5] text-[#E11D48]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Pagamento online sicuro
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Carta di Credito • Apple Pay
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-slate-400 font-sans">
                    Protetto SSL
                  </span>
                  <div className="w-5 h-5 rounded-full border border-[#E11D48] flex items-center justify-center text-[#E11D48]">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* 4. CODICE SCONTO */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ES. PALERMO10"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="bg-[#E11D48] hover:bg-[#D91656] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer shrink-0"
                  >
                    Applica
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium pl-1">
                    ✓ {promoSuccess}
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-slate-500 pl-1">
                    {promoError}
                  </p>
                )}
              </div>

              {/* 5. NUMERO BIGLIETTI / PARTECIPANTI */}
              <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Numero Biglietti / Partecipanti
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {unitPrice} € cad.
                  </p>
                </div>

                {/* Stepper a pillola allungata con sfondo grigio chiarissimo */}
                <div className="bg-slate-50/90 border border-slate-200/60 rounded-full px-1.5 py-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    disabled={ticketCount <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#E11D48] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    aria-label="Diminuisci partecipanti"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2]" />
                  </button>

                  <span className="text-xs font-bold text-slate-800 min-w-[16px] text-center">
                    {ticketCount}
                  </span>

                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                    disabled={ticketCount >= 10}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#E11D48] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    aria-label="Aumenta partecipanti"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* 6. PULSANTE FINALE (Call to Action - Sticky in basso): Magenta vivace luminoso */}
              <div className="sticky bottom-0 -mx-5 -mb-5 p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full bg-[#E11D48] hover:bg-[#D91656] text-white font-sans font-bold text-sm py-4 rounded-2xl transition-all active:scale-[0.98] shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Conferma e Paga {finalTotal} €</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
