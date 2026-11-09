import React from 'react';
import { Leaf, Dumbbell, UtensilsCrossed, Home, Map } from 'lucide-react';
import { CategoryId } from '../types';

interface CategoryCardsRowProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  onOpenMap?: () => void;
}

export const CategoryCardsRow: React.FC<CategoryCardsRowProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenMap
}) => {
  const categories = [
    {
      id: 'parchi' as CategoryId,
      name: 'Parchi & Natura',
      icon: Leaf,
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'sport' as CategoryId,
      name: 'Sport & Movimento',
      icon: Dumbbell,
      iconBg: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'ristoranti' as CategoryId,
      name: 'Dove mangiare',
      icon: UtensilsCrossed,
      iconBg: 'bg-orange-100 text-orange-600',
    },
    {
      id: 'indoor' as CategoryId,
      name: 'Al chiuso',
      icon: Home,
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: 'mappa' as const,
      name: 'Mappa',
      icon: Map,
      iconBg: 'bg-sky-100 text-sky-600',
      action: onOpenMap
    }
  ];

  return (
    <section className="space-y-3 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">Categorie</h2>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
        >
          Vedi tutte
        </button>
      </div>

      {/* Category Pill Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.name}
              onClick={() => {
                if (cat.action) {
                  cat.action();
                } else {
                  onSelectCategory(isSelected ? 'all' : (cat.id as CategoryId));
                }
              }}
              className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left bg-white ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                  : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.iconBg}`}>
                <IconComponent className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
