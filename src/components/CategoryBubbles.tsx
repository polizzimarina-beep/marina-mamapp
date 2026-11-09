import React from 'react';
import { 
  Ticket, 
  HeartHandshake, 
  Car, 
  Sun, 
  Waves, 
  Trophy, 
  Sparkles, 
  PartyPopper,
  Film,
  Trees,
  MapPin,
  Grid
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';

interface CategoryBubblesProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
}

const getCategoryIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Ticket':
      return <Ticket className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Waves':
      return <Waves className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'PartyPopper':
      return <PartyPopper className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'Trees':
      return <Trees className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const CategoryBubbles: React.FC<CategoryBubblesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="py-2 overflow-x-auto scrollbar-none scroll-smooth">
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 min-w-max">
        
        {/* All / Tutti Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 shadow-xs ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-bold scale-105 border-2 border-sky-600'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-400/50'
            }`}
          >
            <Grid className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
              selectedCategory === 'all' ? 'text-sky-600' : 'text-slate-600'
            }`}
          >
            Tutte
          </span>
        </button>

        {/* Category Bubbles */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-2 group cursor-pointer relative"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 relative overflow-hidden shadow-xs ${
                  isSelected
                    ? 'ring-2 ring-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'border border-slate-200 hover:border-sky-400/50'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : cat.color + '12',
                }}
              >
                <div
                  className={`relative z-10 transition-transform ${
                    isSelected ? 'text-white scale-110' : ''
                  }`}
                  style={{ color: isSelected ? '#FFFFFF' : cat.color }}
                >
                  {getCategoryIcon(cat.iconName, 'w-6 h-6 sm:w-7 sm:h-7')}
                </div>

                {cat.count > 0 && (
                  <span className="absolute bottom-1 right-1 bg-white/90 text-slate-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-slate-200">
                    {cat.count}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-bold tracking-tight text-center max-w-[85px] truncate transition-colors uppercase tracking-wider ${
                  isSelected ? 'text-sky-600 font-black' : 'text-slate-600'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
