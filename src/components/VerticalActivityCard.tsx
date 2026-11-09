import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { Activity } from '../types';

interface VerticalActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (activityId: string, e: React.MouseEvent) => void;
  onSelect: (activity: Activity) => void;
  onBookNow?: (activity: Activity, e: React.MouseEvent) => void;
  customBadge?: string;
  locationText?: string;
  ageText?: string;
  tags?: { label: string; icon: string; color?: string }[];
}

export const VerticalActivityCard: React.FC<VerticalActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  onSelect,
  customBadge,
  locationText,
  ageText,
  tags
}) => {
  // Compute tags if not explicitly provided
  const computedTags = tags || (() => {
    const text = `${activity.title} ${activity.subtitle} ${(activity.description || '')}`.toLowerCase();
    const result: { label: string; icon: string }[] = [];

    if (text.includes('fasciatoio') || text.includes('neonat') || text.includes('baby') || activity.categoryId === 'yoga') {
      result.push({ label: 'Fasciatoio', icon: '🍼' });
    }
    if (text.includes('spogliatoio') || activity.categoryId === 'piscina') {
      result.push({ label: 'Spogliatoio family', icon: '🚿' });
    }
    if (text.includes('chiuso') || activity.categoryId === 'indoor' || text.includes('arte') || text.includes('creativo')) {
      result.push({ label: 'Al chiuso', icon: '🏠' });
    }
    if (text.includes('parco') || text.includes('natura') || activity.categoryId === 'parchi') {
      result.push({ label: 'Passeggino ok', icon: '🚼' });
    }

    if (result.length === 0) {
      result.push({ label: 'Fasciatoio', icon: '🍼' });
      result.push({ label: 'Passeggino ok', icon: '🚼' });
    }

    return result.slice(0, 2);
  })();

  // Determine top badge (all in Verde Ottanio as requested)
  const badge = customBadge || (
    activity.id === 'act-yoga-mamme' ? 'Speciale Mamme' :
    activity.isTrialFree ? 'Prova gratuita' :
    activity.id === 'act-nuoto-baby' ? 'Molto richiesto' :
    activity.attendeesCount && activity.attendeesCount > 200 ? 'Molto richiesto' :
    'Consigliato'
  );

  return (
    <div
      onClick={() => onSelect(activity)}
      className="bg-white rounded-2xl border border-[#E2EEF0] shadow-xs hover:shadow-md hover:border-[#0D7480]/40 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group hover:-translate-y-0.5"
    >
      {/* Top Image Section */}
      <div className="relative h-40 sm:h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Left Badge in Verde Ottanio */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full shadow-xs bg-[#0D7480] text-white border border-[#2DD4BF]/40">
              {badge}
            </span>
          </div>
        )}

        {/* Top Right Heart Button in Magenta */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(activity.id, e);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#701542] text-white shadow-sm'
              : 'bg-white/90 text-[#701542] hover:bg-white hover:scale-105'
          }`}
          title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : 'text-[#701542]'}`} strokeWidth={2.5} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Titolo Attività (Testo Magenta) */}
          <h3 className="text-sm font-black text-[#701542] group-hover:text-[#8D1B54] transition-colors line-clamp-1 leading-snug">
            {activity.title}
          </h3>

          {/* Dettagli / Luogo e orari (Testo Magenta attenuato) */}
          <p className="text-[11px] font-semibold text-[#8A375F] line-clamp-1">
            {locationText || `Oggi 17:30 • ${activity.venueName || 'Palermo Centro'}`}
          </p>

          {/* Età Consigliata (Testo Magenta) */}
          <p className="text-[11px] font-bold text-[#701542] line-clamp-1">
            {ageText || (
              activity.ageMin === 0 && activity.ageMax <= 3 ? '0-12 mesi • Mamme e bambini' :
              activity.ageMin >= 3 && activity.ageMax <= 6 ? '3 mesi - 3 anni' :
              activity.ageMin === 0 ? 'Tutte le età' :
              `${activity.ageMin}-${activity.ageMax} anni`
            )}
          </p>
        </div>

        {/* Salva-Mamma Badges (Verde Ottanio Chiaro) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {computedTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBF6F7] text-[#0B434C] border border-[#BCE2E6]"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </span>
          ))}
        </div>

        {/* Card Footer: Rating, Distance & Prezzo in Evidenza Verde Ottanio */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            {/* Rating */}
            <div className="flex items-center gap-1 font-bold text-[#701542]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{activity.rating.toFixed(1)}</span>
              <span className="text-[#8A375F] font-normal text-[11px]">({activity.reviewCount})</span>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-0.5 text-[#8A375F] font-medium text-[11px]">
              <MapPin className="w-3 h-3 text-[#0D7480]" />
              <span>{activity.distanceKm || '2.5'} km</span>
            </div>
          </div>

          {/* Prezzo in Evidenza Verde Ottanio */}
          <div className="text-right">
            <span className="text-[11px] text-[#8A375F] mr-1">da</span>
            <span className="text-sm font-black text-[#0D7480]">
              {activity.price === 0 ? 'GRATIS' : `${activity.price} €`}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
