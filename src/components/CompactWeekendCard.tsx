import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { Activity } from '../types';

interface CompactWeekendCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (activityId: string, e: React.MouseEvent) => void;
  onSelect: (activity: Activity) => void;
  dateText?: string;
  ageText?: string;
  tagText?: string;
}

export const CompactWeekendCard: React.FC<CompactWeekendCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  onSelect,
  dateText,
  ageText,
  tagText
}) => {
  const date = dateText || (
    activity.id === 'act-english-stem' ? 'Sab 31 mag • 10:30' :
    activity.id === 'act-vela-padel-papa' ? 'Sab 31 mag • 09:00' :
    activity.id === 'act-cannolo-family' ? 'Dom 1 giu • 11:00' :
    'Dom 1 giu • 15:00'
  );

  const age = ageText || (
    activity.id === 'act-english-stem' ? '4-8 anni' :
    activity.id === 'act-vela-padel-papa' ? 'Tutte le età' :
    activity.id === 'act-cannolo-family' ? '4-10 anni' :
    activity.ageMin === 0 ? 'Tutte le età' :
    `${activity.ageMin}-${activity.ageMax} anni`
  );

  const tag = tagText || (
    activity.id === 'act-english-stem' ? 'Fasciatoio' :
    activity.id === 'act-vela-padel-papa' ? 'Passeggino ok' :
    activity.id === 'act-cannolo-family' ? 'Materiale incluso' :
    'Al chiuso'
  );

  return (
    <div
      onClick={() => onSelect(activity)}
      className="bg-white rounded-2xl border border-[#E2EEF0] shadow-xs hover:shadow-md hover:border-[#0D7480]/40 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group hover:-translate-y-0.5"
    >
      {/* Top Image */}
      <div className="relative h-32 sm:h-36 w-full bg-slate-100 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Date Badge in Verde Ottanio */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full shadow-xs bg-[#0D7480] text-white border border-[#2DD4BF]/40">
            {date}
          </span>
        </div>

        {/* Heart Icon in Magenta */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(activity.id, e);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#701542] text-white'
              : 'bg-white/90 text-[#701542] hover:bg-white hover:scale-105'
          }`}
          title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white text-white' : 'text-[#701542]'}`} strokeWidth={2.5} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          {/* Titolo Attività (Magenta) */}
          <h3 className="text-xs font-black text-[#701542] group-hover:text-[#8D1B54] transition-colors line-clamp-1 leading-snug">
            {activity.title}
          </h3>

          {/* Sottotitolo / Location */}
          <p className="text-[11px] font-medium text-[#8A375F] line-clamp-1">
            {activity.venueName || 'Palermo Centro'}
          </p>

          {/* Age Group Target */}
          <p className="text-[11px] font-bold text-[#701542]">
            {age}
          </p>
        </div>

        {/* Tag & Prezzo in Verde Ottanio */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBF6F7] text-[#0B434C] border border-[#BCE2E6]">
            {tag}
          </span>

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
