import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Play, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  User, 
  Baby, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Lock,
  Waves
} from 'lucide-react';
import { Activity } from '../types';
import { PackageComparisonTable } from './PackageComparisonTable';
import { MamappLogo } from './MamappLogo';

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (activityId: string) => void;
  onOpenBooking: (activity: Activity) => void;
  onOpenMapLocation: (latitude: number, longitude: number) => void;
  onOpenOrganizerProfile?: (organizerName: string) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenBooking
}) => {
  if (!isOpen || !activity) return null;

  const [selectedImage, setSelectedImage] = useState(activity.image);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activity.title,
        text: `Scopri ${activity.title} a Palermo!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const primarySlot = activity.slots && activity.slots[0];
  const slotDisplay = primarySlot ? `${primarySlot.dayOfWeek} • ${primarySlot.time}` : 'Oggi • 17:00 - 18:00';
  const locationDisplay = `${activity.venueName}, ${activity.address}`;
  const attendeesCount = activity.attendeesCount || 160;

  // Specific items for "Cosa Portare" with linear outline SVG icons
  const cosaPortareItems = [
    {
      label: 'Cuffia',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M4 15a8 8 0 0 1 16 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 14c2-1 4-1 8 0 4-1 6-1 8 0" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: 'Asciugamano',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <rect x="5" y="4" width="14" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 8h14M5 16h14" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: 'Ciabatte',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M7 3c3 0 5 4 5 10 0 4-1.5 8-5 8s-5-4-5-8c0-6 2-10 5-10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 12c2-1 4-1 6 0" strokeLinecap="round"/>
          <path d="M17 3c3 0 5 4 5 10 0 4-1.5 8-5 8s-5-4-5-8c0-6 2-10 5-10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 12c2-1 4-1 6 0" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: 'Costume',
      icon: (
        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 14h12l-2 7H8l-2-7z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      {/* Modal Card su Sfondo Crema Chiaro (#FDFCFB) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFCFB] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.06)] overflow-hidden max-h-[94vh] sm:max-h-[92vh] flex flex-col relative animate-in slide-in-from-bottom duration-300 cursor-default text-slate-800 font-sans"
      >
        
        {/* ========================================================================= */}
        {/* 1. INTESTAZIONE:                                                          */}
        {/* In alto a sinistra: il logo "Mamapp" in un elegante carattere serif        */}
        {/* bordeaux (#6B283A).                                                       */}
        {/* In alto a destra: icona utente (cerchio contorno) e icona ricerca (lente) */}
        {/* con pulsante chiusura X sottile.                                          */}
        {/* ========================================================================= */}
        <header className="px-5 sm:px-6 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          
          {/* Logo "Mamapp" ad acquerello */}
          <MamappLogo size="sm" />

          {/* Icone a destra: Cerca + Profilo utente + Chiudi */}
          <div className="flex items-center gap-3 text-slate-700">
            <button
              type="button"
              onClick={handleShare}
              className="p-1 hover:text-[#6B283A] transition-colors cursor-pointer relative"
              title="Condividi"
            >
              <Share2 className="w-5 h-5 stroke-[1.6]" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 bg-slate-800 text-white text-[9px] px-2 py-0.5 rounded shadow">
                  Copiato
                </span>
              )}
            </button>

            <button
              type="button"
              className="w-7 h-7 rounded-full border border-slate-300 hover:border-[#6B283A] text-slate-700 hover:text-[#6B283A] flex items-center justify-center transition-colors cursor-pointer"
              title="Profilo utente"
            >
              <User className="w-4 h-4 stroke-[1.6]" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-100 ml-1"
              title="Chiudi"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CORPO DELLA PAGINA (Scrollabile)                                       */}
        {/* ========================================================================= */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          
          {/* Foto hero dell'attività (angoli smussati) */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-xs">
            <img
              src={selectedImage}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            {/* Bottone Cuore flottante */}
            <button
              type="button"
              onClick={() => onToggleFavorite(activity.id)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-[#6B283A] text-[#6B283A]' : 'text-slate-400'}`} 
                strokeWidth={1.8} 
              />
            </button>
          </div>

          {/* Titolo dell'Evento: Grande titolo in alto in carattere bordeaux (#6B283A) */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#6B283A] leading-tight">
              {activity.title}
            </h1>

            {/* Recensioni: Stellina dorata brillante, punteggio "4.8" in grassetto, "(98 recensioni verificate)" */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm mt-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-slate-800">{activity.rating || '4.8'}</span>
              <span className="text-slate-500 font-normal">
                ({activity.reviewCount || '98'} recensioni verificate)
              </span>
            </div>
          </div>

          {/* Box Informativo Condizioni: 3 Colonne Orizzontali (Cancella Gratis, Prenota Ora, Pass Digitale) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              
              {/* Colonna 1: Scudo con segno di spunta - "Cancella" / "Gratis" */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <ShieldCheck className="w-5 h-5 text-slate-900 stroke-[1.6] mb-1" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Cancella</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">Gratis</span>
              </div>

              {/* Colonna 2: Calendario - "Prenota" / "Ora" */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <Calendar className="w-5 h-5 text-slate-900 stroke-[1.6] mb-1" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Prenota</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">Ora</span>
              </div>

              {/* Colonna 3: Stelle scintillanti - "Pass" / "Digitale" */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <Sparkles className="w-5 h-5 text-slate-900 stroke-[1.6] mb-1" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Pass</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">Digitale</span>
              </div>

            </div>
          </div>

          {/* Descrizione Attività */}
          <div className="space-y-1.5">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              Descrizione Attività
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {activity.description || 'Lezioni di acquaticità per stimolare la coordinazione, la respirazione e il piacere di muoversi in acqua in totale sicurezza.'}
            </p>
          </div>

          {/* Sezione "Cosa Portare" con elenco orizzontale di icone lineari e testo */}
          <div className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              Cosa Portare
            </h2>
            
            <div className="grid grid-cols-4 gap-2">
              {cosaPortareItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <div className="text-slate-800 mb-1.5">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Dettagli Evento: bianca, angoli arrotondati, ombra sottile */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
            {/* Riga 1: Pin di posizione + Palermo Centro, Viale del Fante 5, Palermo */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
              <MapPin className="w-4 h-4 text-slate-700 stroke-[1.6] shrink-0" />
              <span className="truncate">{locationDisplay}</span>
            </div>

            {/* Riga 2: Orologio + Oggi • 17:00 - 18:00 */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
              <Clock className="w-4 h-4 text-slate-700 stroke-[1.6] shrink-0" />
              <span>{slotDisplay}</span>
            </div>
          </div>

          {/* Social Proof & Invito: Avatar sovrapposti + "+160" + "160+ famiglie prenotate" + "Invita Amici >" */}
          <div className="flex items-center justify-between gap-3 pt-1 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                  👩
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                  👶
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                  👨
                </div>
                <div className="w-7 h-7 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                  +{attendeesCount}
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {attendeesCount}+ famiglie prenotate
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Invita Amici</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tabella Comparativa Pacchetti */}
          <div className="pt-1">
            <PackageComparisonTable 
              activityTitle={activity.title}
              onSelectPackage={() => {
                onClose();
                onOpenBooking(activity);
              }}
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. PIÈ DI PAGINA (BARRA DI AZIONE STICKY IN BASSO)                        */}
        {/* A sinistra: "DA" seguito da "15 € / a bambino" (euro grande bordeaux)     */}
        {/* A destra: pulsante bordeaux "Seleziona Date"                              */}
        {/* Sotto: loghi di pagamento (Visa, MasterCard, PayPal) + "Pagamento Sicuro" */}
        {/* ========================================================================= */}
        <footer className="p-4 sm:p-5 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2.5 z-30 shrink-0">
          
          <div className="flex items-center justify-between gap-4">
            {/* Prezzo a sinistra: "DA" + "15 € / a bambino" */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                DA
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#6B283A]">
                  {activity.price === 0 ? 'GRATIS' : `${activity.price} €`}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  /{activity.priceUnit ? activity.priceUnit.replace('a ', '') : 'a bambino'}
                </span>
              </div>
            </div>

            {/* Pulsante CTA: bordeaux con angoli arrotondati e testo bianco "Seleziona Date" */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking(activity);
              }}
              className="bg-[#6B283A] hover:bg-[#581F2F] active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Seleziona Date</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pagamento Sicuro: loghi di pagamento + testo "Pagamento Sicuro" */}
          <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-100/70 text-[10px] text-slate-400 font-sans">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="font-medium text-slate-500">Pagamento Sicuro</span>
            <span>•</span>
            <span className="font-semibold text-slate-600">Visa</span>
            <span>•</span>
            <span className="font-semibold text-slate-600">MasterCard</span>
            <span>•</span>
            <span className="font-semibold text-slate-600">PayPal</span>
            <span>•</span>
            <span className="font-semibold text-slate-600">Apple Pay</span>
          </div>

        </footer>

      </div>
    </div>
  );
};
