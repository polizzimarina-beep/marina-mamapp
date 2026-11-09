import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  QrCode, 
  Calendar, 
  Clock, 
  MapPin, 
  Trash2, 
  Phone, 
  Maximize2,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Booking } from '../types';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(bookings[0] || null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (val: string) => {
    navigator.clipboard?.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFCFB] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col relative animate-in slide-in-from-bottom duration-300 cursor-default"
      >
        
        {/* Top Header - Minimal, white background, Serif brand in #E11D48 */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#E11D48] flex items-center justify-center border border-[#FCD3E1]">
              <Ticket className="w-4 h-4 stroke-[1.75]" />
            </div>
            <div>
              <h2 
                className="font-serif text-lg font-bold text-[#E11D48]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                I Miei Biglietti & Pass
              </h2>
              <p className="text-[11px] text-slate-500">Palermo City Pass ({bookings.length})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">

          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-white rounded-3xl p-6 border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                <Ticket className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 
                className="font-serif text-base font-bold text-slate-800"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Nessun biglietto salvato
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Prenota un'attività per visualizzare qui il codice QR per l'ingresso.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#E11D48] hover:bg-[#D91656] text-white text-xs font-medium px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
              >
                Esplora Eventi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Left Ticket List Selector */}
              <div className="md:col-span-5 space-y-2 max-h-72 md:max-h-[460px] overflow-y-auto pr-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Seleziona Pass
                </p>
                {bookings.map((b) => {
                  const isSelected = selectedTicket?.id === b.id;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedTicket(b)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#FFF0F5] border-[#E11D48] shadow-xs ring-1 ring-[#E11D48]/30'
                          : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={b.activityImage}
                          alt={b.activityTitle}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 inline-block">
                              {b.bookingCode}
                            </span>
                            <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              Confermato
                            </span>
                          </div>
                          <h4 className="font-semibold text-xs truncate text-slate-800 mt-1">
                            {b.activityTitle}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                            {b.dateSelected}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Ticket Detail & QR Code */}
              {selectedTicket && (
                <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-slate-100 space-y-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  
                  <div>
                    {/* Top Pass Bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Pass Digitale Ufficiale
                        </span>
                        <h3 
                          className="font-serif font-bold text-base text-[#E11D48]"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {selectedTicket.bookingCode}
                        </h3>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        Valido
                      </span>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-slate-50/70 p-4 rounded-2xl max-w-[180px] mx-auto my-3 border border-slate-100 text-center">
                      <QrCode className="w-32 h-32 text-slate-800 mx-auto stroke-[1.2]" />
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedTicket.qrCodeValue)}
                        className="text-[9px] font-mono text-slate-500 hover:text-slate-800 transition-colors mt-2 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <span className="truncate max-w-[140px]">{selectedTicket.qrCodeValue}</span>
                        <span className="text-[#E11D48] font-sans font-medium">{copied ? '✓' : ''}</span>
                      </button>
                    </div>

                    {/* Pass Details */}
                    <div className="space-y-1.5 text-xs bg-slate-50/50 p-3.5 rounded-2xl text-slate-600 border border-slate-100">
                      <p className="font-semibold text-xs text-slate-800">{selectedTicket.activityTitle}</p>
                      <p className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#E11D48] stroke-[1.5]" />
                        <span>{selectedTicket.venueName}</span>
                      </p>
                      <p className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
                        <span>{selectedTicket.dateSelected} • {selectedTicket.slot.time}</span>
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                        <span>Partecipante: <strong className="text-slate-700">{selectedTicket.participantName}</strong></span>
                        <span>Totale: <strong className="text-slate-700">{selectedTicket.totalPaid === 0 ? 'Gratis' : `€${selectedTicket.totalPaid}`}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${selectedTicket.venuePhone}`}
                      className="text-xs font-medium text-slate-600 hover:text-[#E11D48] flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Chiama Location</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onCancelBooking(selectedTicket.id)}
                      className="text-xs font-medium text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Annulla Pass</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
