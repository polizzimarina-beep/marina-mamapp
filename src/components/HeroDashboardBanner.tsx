import React from 'react';
import { 
  Sparkles, 
  ArrowRight,
  Heart,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Activity } from '../types';

interface HeroDashboardBannerProps {
  onSelectSpecialPromo?: (activity?: Activity) => void;
  onSelectCategory?: (catId: string) => void;
}

export const HeroDashboardBanner: React.FC<HeroDashboardBannerProps> = ({
  onSelectSpecialPromo,
  onSelectCategory
}) => {
  // Filter pills with Verde Ottanio background and Magenta text as requested
  const filterPills = [
    { id: 'laboratori', label: 'Laboratori Creativi', icon: '🎨' },
    { id: 'parchi', label: 'Parchi & Natura', icon: '🌳' },
    { id: 'sport', label: 'Sport & Nuoto Baby', icon: '🏊' },
    { id: 'indoor', label: 'Spazi al Chiuso', icon: '🏠' },
    { id: 'feste', label: 'Eventi & Spettacoli', icon: '🎭' }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#701542]/20 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
        
        {/* ========================================================================= */}
        {/* 1. METÀ SINISTRA (Sfondo Magenta Scuro, Titolo Bianco, Pillole Verde Ottanio) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-[#701542] p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden text-white">
          
          {/* Subtle Ambient Decorative Gradients */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#8D1B54]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#0D7480]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            {/* Tagline / City Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-pink-100">
              <Heart className="w-3.5 h-3.5 text-[#2DD4BF] fill-[#2DD4BF]" />
              <span>Palermo Family Guide • Oggi e Weekend</span>
            </div>

            {/* Titolo Forte (Testo Bianco) */}
            <h1 className="text-2xl sm:text-3xl lg:text-3.5xl font-black text-white tracking-tight leading-tight pt-1">
              Idee perfette per oggi per i tuoi bambini
            </h1>

            {/* Descrizione */}
            <p className="text-xs sm:text-sm font-medium text-pink-100/90 max-w-xl leading-relaxed">
              Trova le migliori esperienze, corsi e attività a Palermo selezionate per età, 
              zona e servizi family-friendly.
            </p>
          </div>

          {/* Pillole Filtri (Sfondo Verde Ottanio con Testo Magenta) */}
          <div className="relative z-10 pt-5">
            <span className="block text-[11px] font-bold text-pink-200/90 uppercase tracking-wider mb-2">
              Esplora per categoria:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {filterPills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => onSelectCategory && onSelectCategory(pill.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF6F7] hover:bg-[#D4EDF0] border border-[#BCE2E6] text-xs font-black text-[#701542] shadow-2xs hover:shadow-xs hover:scale-102 transition-all cursor-pointer select-none"
                >
                  <span className="text-xs">{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. METÀ DESTRA: SPECIALE MAMME (Sfondo Verde Ottanio, Immagine, CTA Magenta) */}
        {/* ========================================================================= */}
        <div 
          onClick={() => onSelectSpecialPromo && onSelectSpecialPromo()}
          className="lg:col-span-5 bg-[#0B434C] hover:bg-[#0D4D57] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden text-white transition-all cursor-pointer group border-t lg:border-t-0 lg:border-l border-[#145C66]"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0D7480]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            
            {/* Top Badge: Speciale Mamme */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-[#0D7480] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#2DD4BF]/40 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                SPECIALE MAMME
              </span>
              <span className="text-[10px] font-bold text-[#BCE2E6] bg-black/20 px-2.5 py-0.5 rounded-full">
                Posti limitati
              </span>
            </div>

            {/* Event Preview Photo */}
            <div className="relative h-28 sm:h-32 w-full rounded-2xl overflow-hidden border border-[#2DD4BF]/30 shadow-xs">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80" 
                alt="Yoga & Mamme Palermo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B434C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] font-black text-white bg-[#0B434C]/90 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <Calendar className="w-3 h-3 text-[#2DD4BF]" />
                <span>Oggi ore 17:30 • Parco della Favorita</span>
              </div>
            </div>

            {/* Titolo Evento (Testo Bianco) */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white leading-snug group-hover:text-[#2DD4BF] transition-colors">
                Yoga & Famiglia al Parco della Favorita
              </h3>
              <p className="text-xs text-[#BCE2E6] font-medium mt-1 leading-relaxed">
                Momento di relax, postura e respiro per mamme con area tappetoni e fasciatoio bimbi.
              </p>
            </div>
          </div>

          {/* Call to Action (Pulsante Magenta) */}
          <div className="relative z-10 pt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectSpecialPromo) onSelectSpecialPromo();
              }}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-[#701542] hover:bg-[#8D1B54] text-white text-xs font-black rounded-xl transition-all shadow-md group/btn cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Prima Lezione di Prova GRATIS</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
