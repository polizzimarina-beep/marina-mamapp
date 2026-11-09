import React from 'react';
import { AGE_BRACKETS } from '../data/mockData';
import { AgeGroup } from '../types';
import { Sparkles, Baby, Palette, Puzzle, Rocket, Check, ChevronRight } from 'lucide-react';

interface KidsAgeSectionProps {
  selectedAgeGroup: AgeGroup | 'all';
  onSelectAgeGroup: (ageGroup: AgeGroup | 'all') => void;
  activitiesCountByAge: Record<string, number>;
}

const getAgeIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Baby':
      return <Baby className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Puzzle':
      return <Puzzle className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    default:
      return <Baby className={className} />;
  }
};

export const KidsAgeSection: React.FC<KidsAgeSectionProps> = ({
  selectedAgeGroup,
  onSelectAgeGroup,
  activitiesCountByAge
}) => {
  return (
    <div className="bg-gradient-to-r from-sky-50/80 via-slate-50 to-indigo-50/40 border border-sky-100 rounded-3xl p-4 sm:p-6 my-4 shadow-xs relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-sky-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Età dei Bimbi
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Baby className="w-5 h-5 text-sky-600 shrink-0" />
            <span>Attività per Fascia d'Età</span>
          </h2>
          <p className="text-slate-600 text-xs mt-0.5 max-w-2xl">
            Filtra gli eventi in base all'età dei bambini.
          </p>
        </div>

        {/* Clear Filter Button */}
        {selectedAgeGroup !== 'all' && (
          <button
            onClick={() => onSelectAgeGroup('all')}
            className="self-start sm:self-center bg-white text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Mostra tutte le età</span>
          </button>
        )}
      </div>

      {/* Age Group Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {AGE_BRACKETS.map((bracket) => {
          const isSelected = selectedAgeGroup === bracket.id;
          const count = activitiesCountByAge[bracket.id] || 0;

          return (
            <button
              key={bracket.id}
              onClick={() => onSelectAgeGroup(isSelected ? 'all' : bracket.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 scale-[1.01]'
                  : 'bg-white hover:bg-sky-50/80 border-slate-200/90 hover:border-sky-300 text-slate-800 shadow-xs'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-sky-100/70 text-sky-700'
                  }`}>
                    {getAgeIcon(bracket.icon, 'w-5 h-5')}
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-sm leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {bracket.title}
                    </h3>
                    <span className={`text-[10px] font-bold block uppercase tracking-wider ${isSelected ? 'text-sky-100' : 'text-sky-700'}`}>
                      {bracket.sub}
                    </span>
                  </div>
                </div>

                <p className={`text-[11px] leading-relaxed line-clamp-2 mt-1 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                  {bracket.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100/50 flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                  {count} attività
                </span>
                <span className={`text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${isSelected ? 'text-white' : 'text-sky-600'}`}>
                  <span>{isSelected ? 'Selezionato' : 'Esplora'}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

