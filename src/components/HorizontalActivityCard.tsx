import React from 'react';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Activity } from '../types';

interface HorizontalActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (activity: Activity) => void;
  onBookNow: (activity: Activity, e: React.MouseEvent) => void;
}

export const HorizontalActivityCard: React.FC<HorizontalActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onBookNow,
}) => {
  // Format age range string
  const getAgeLabel = () => {
    if (activity.ageMin === 0 && activity.ageMax <= 1) return '0-12 mesi';
    if (activity.ageMin === 0 && activity.ageMax <= 3) return '0-3 anni';
    if (activity.ageMin === 3 && activity.ageMax <= 6) return '3-6 anni';
    return `${activity.ageMin}-${activity.ageMax} anni`;
  };

  // Time slot from first slot or default
  const timeSlotLabel = activity.slots && activity.slots.length > 0 
    ? activity.slots[0].time 
    : '09:00 - 20:00';

  // Availability text and style
  const isLowSeats = activity.attendeesCount > 250 || activity.title.includes('Ninja') || activity.title.includes('Kart');
  const availabilityLabel = isLowSeats ? '5 posti rimasti' : 'Disponibile';
  const availabilityColor = isLowSeats ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100';

  return (
    <div 
      onClick={() => onSelect(activity)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 group cursor-pointer hover:border-pink-300 relative"
    >
      {/* Immagine compatto a sinistra */}
      <div className="relative w-full sm:w-44 sm:h-32 h-44 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badge Prova Gratis o Featured se presente */}
        {activity.isTrialFree && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
            Gratis
          </span>
        )}
      </div>

      {/* Dettagli e contenuto al centro/destra */}
      <div className="flex-1 flex flex-col justify-between space-y-2 min-w-0">
        
        {/* Riga Superiore: Ora e Cuore Preferito */}
        <div className="flex items-center justify-between gap-2">
          <span className="bg-pink-50 text-pink-600 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md border border-pink-100 inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-pink-500" />
            {timeSlotLabel}
          </span>

          <button
            onClick={(e) => onToggleFavorite(activity.id, e)}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-pink-500 shrink-0 cursor-pointer"
            title={isFavorite ? "Rimuovi dai preferiti" : "Salva nei preferiti"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>
        </div>

        {/* Titolo e Descrizione */}
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-pink-600 transition-colors line-clamp-1">
            {activity.title}
          </h3>
          <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">
            {activity.subtitle || activity.description}
          </p>
        </div>

        {/* Info Tag: Età, Zona, Distanza, Disponibilità */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {/* Badge Età */}
          <span className="bg-slate-100 text-slate-700 font-extrabold text-[11px] px-2 py-0.5 rounded-md border border-slate-200">
            {getAgeLabel()}
          </span>

          {/* Zona e Distanza */}
          <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{activity.zone}</span>
            <span>•</span>
            <span>{activity.distanceKm} km</span>
          </span>

          {/* Badge Disponibilità */}
          <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${availabilityColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {availabilityLabel}
          </span>
        </div>

        {/* Riga Inferiore: Prezzo e Bottone "Scopri di più" */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div>
            <span className="text-base font-black text-slate-900">€{activity.price}</span>
            <span className="text-[11px] font-medium text-slate-500 ml-1">{activity.priceUnit}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(activity);
            }}
            className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span>Scopri di più</span>
          </button>
        </div>

      </div>
    </div>
  );
};
