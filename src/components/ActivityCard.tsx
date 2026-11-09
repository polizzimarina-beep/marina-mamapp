import React from 'react';
import { Star, Heart, Zap, ShieldCheck, Baby, Shield, Trees, Car } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (activityId: string, e: React.MouseEvent) => void;
  onSelect: (activity: Activity) => void;
  onBookNow: (activity: Activity, e: React.MouseEvent) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  // Determine Salva-Mamma badges based on activity categories or badges
  const getSalvaMammaBadges = () => {
    const badgesList = activity.badges || [];
    const text = `${activity.title} ${activity.subtitle} ${(activity.description || '')}`.toLowerCase();
    const salvaMamma: { label: string; icon: React.ReactNode; color: string }[] = [];

    if (text.includes('fasciatoio') || text.includes('neonat') || text.includes('baby') || activity.categoryId === 'indoor' || activity.categoryId === 'yoga') {
      salvaMamma.push({
        label: 'Fasciatoio',
        icon: <Baby className="w-3 h-3 text-brand-500" />,
        color: 'bg-brand-50 text-brand-700 border-brand-200'
      });
    }

    if (text.includes('recintat') || text.includes('sicurez') || activity.categoryId === 'parchi' || activity.categoryId === 'gokart') {
      salvaMamma.push({
        label: 'Recintato',
        icon: <Shield className="w-3 h-3 text-emerald-500" />,
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      });
    }

    if (text.includes('passeggin') || text.includes('accessibil') || text.includes('strada') || activity.categoryId === 'concerti' || activity.categoryId === 'ristoranti') {
      salvaMamma.push({
        label: 'Passeggino ok',
        icon: <Baby className="w-3 h-3 text-petrolio-500" />,
        color: 'bg-petrolio-50 text-petrolio-700 border-petrolio-200'
      });
    }

    if (text.includes('ombra') || text.includes('parco') || text.includes('albero') || activity.categoryId === 'mare') {
      salvaMamma.push({
        label: 'Zona ombra',
        icon: <Trees className="w-3 h-3 text-amber-500" />,
        color: 'bg-amber-50 text-amber-800 border-amber-200'
      });
    }

    // Default fallback if none matched
    if (salvaMamma.length === 0) {
      salvaMamma.push({
        label: 'Passeggino ok',
        icon: <Baby className="w-3 h-3 text-petrolio-500" />,
        color: 'bg-petrolio-50 text-petrolio-700 border-petrolio-200'
      });
      salvaMamma.push({
        label: 'Fasciatoio',
        icon: <Baby className="w-3 h-3 text-brand-500" />,
        color: 'bg-brand-50 text-brand-700 border-brand-200'
      });
    }

    return salvaMamma.slice(0, 2);
  };

  const salvaMammaBadges = getSalvaMammaBadges();

  return (
    <div 
      onClick={() => onSelect(activity)}
      className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-row items-stretch gap-3 cursor-pointer group hover:-translate-y-0.5 relative overflow-hidden"
    >
      {/* Left Image Container (Compact ~100x100px) */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img
          src={activity.image}
          alt={activity.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(activity.id, e)}
          className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs z-10 cursor-pointer ${
            isFavorite 
              ? 'bg-brand-500 text-white' 
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-brand-500'
          }`}
          title={isFavorite ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-white' : 'text-slate-600'}`} strokeWidth={2.5} />
        </button>

        {/* Location Distance Overlay Tag on Image */}
        <div className="absolute bottom-1.5 left-1.5 z-10 pointer-events-none">
          <span className="bg-black/75 backdrop-blur-md text-white font-semibold text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
            📍 {activity.distanceKm || '1.2'} km
          </span>
        </div>
      </div>

      {/* Right Content Body */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          {/* Location / Venue Subtitle */}
          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mb-0.5 flex items-center gap-1">
            <span className="truncate">{activity.organizer?.name || activity.venueName || 'Kartsam Arena'}</span>
            <span>•</span>
            <span className="shrink-0">Palermo</span>
          </div>

          {/* Title (max 2 lines) */}
          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-brand-600 line-clamp-2 transition-colors mb-1">
            {activity.title}
          </h3>

          {/* Badges Salva-Mamma (Fast Icons) */}
          <div className="flex items-center gap-1.5 flex-wrap my-1">
            {salvaMammaBadges.map((badge, idx) => (
              <span key={idx} className={`inline-flex items-center gap-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${badge.color}`}>
                {badge.icon}
                <span>{badge.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row: Rating on left, Price on right */}
        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-extrabold text-slate-900">{activity.rating}</span>
            <span className="text-slate-400 font-normal text-[10px]">({activity.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-medium mr-1">da</span>
            <span className="text-xs sm:text-sm font-black text-slate-900">
              {activity.price === 0 ? (
                <span className="text-emerald-600 font-extrabold">Gratuito</span>
              ) : (
                <span className="text-brand-600">{activity.price} €</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

