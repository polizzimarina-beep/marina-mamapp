import React, { useState } from 'react';
import { 
  Home, 
  Map, 
  Calendar, 
  Heart, 
  Ticket, 
  ChevronDown, 
  X,
  Baby,
  CalendarDays,
  MapPin,
  Clock,
  Sparkles,
  SlidersHorizontal,
  Activity as ActivityIcon,
  Palette,
  Waves,
  Trees,
  BookOpen,
  PartyPopper,
  Check
} from 'lucide-react';

export interface CategorySidebarItem {
  id: string;
  name: string;
  icon: any;
}

export const SIDEBAR_CATEGORIES: CategorySidebarItem[] = [
  {
    id: 'sport',
    name: 'Sport & Movimento',
    icon: ActivityIcon
  },
  {
    id: 'laboratori',
    name: 'Laboratori & Creatività',
    icon: Palette
  },
  {
    id: 'piscina',
    name: 'Acquaticità & Nuoto',
    icon: Waves
  },
  {
    id: 'parchi',
    name: 'Natura & Outdoor',
    icon: Trees
  },
  {
    id: 'cultura',
    name: 'Cultura & Educazione',
    icon: BookOpen
  },
  {
    id: 'feste',
    name: 'Eventi & Feste',
    icon: PartyPopper
  }
];

interface LeftSidebarProps {
  activeTab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets';
  onChangeTab: (tab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets') => void;
  favoritesCount?: number;
  ticketsCount?: number;
  selectedDay?: string;
  onSelectDay?: (day: string) => void;
  
  // Quick active filters
  selectedAgeGroups?: string[];
  onToggleAgeGroup?: (age: string) => void;
  
  selectedGenderTargets?: string[];
  onToggleGenderTarget?: (target: string) => void;
  
  selectedTimeSlots?: string[];
  onToggleTimeSlot?: (slot: string) => void;
  
  selectedServices?: string[];
  onToggleService?: (service: string) => void;
  
  selectedMaxDistance?: number;
  onSelectMaxDistance?: (distance: number) => void;
  
  selectedPriceFilter?: string;
  onSelectPriceFilter?: (price: string) => void;

  selectedCategories?: string[];
  onToggleCategory?: (categoryId: string) => void;
  
  onResetFilters: () => void;
  onOpenAdvancedFilters?: () => void;
  className?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onChangeTab,
  favoritesCount = 0,
  ticketsCount = 0,
  selectedDay = 'all',
  onSelectDay = (_day: string) => {},
  selectedAgeGroups = ['1-3 anni'],
  onToggleAgeGroup = (_age: string) => {},
  selectedGenderTargets = [],
  onToggleGenderTarget = (_target: string) => {},
  selectedTimeSlots = [],
  onToggleTimeSlot = (_slot: string) => {},
  selectedServices = ['Passeggino ok'],
  onToggleService = (_service: string) => {},
  selectedMaxDistance = 5,
  onSelectMaxDistance = (_distance: number) => {},
  selectedPriceFilter = 'all',
  onSelectPriceFilter = (_price: string) => {},
  selectedCategories = ['sport', 'laboratori', 'piscina', 'parchi', 'cultura', 'feste'],
  onToggleCategory = (_categoryId: string) => {},
  onResetFilters,
  onOpenAdvancedFilters,
  className = ''
}) => {
  // Accordion Expand/Collapse State
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    date: true,
    categorie: true,
    eta: true,
    servizi: true,
    distanza: false,
    prezzo: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Age options
  const ageOptions = [
    { id: '0-12 mesi', label: '0-12 mesi' },
    { id: '1-3 anni', label: '1-3 anni' },
    { id: '4-6 anni', label: '4-6 anni' },
    { id: '7-10 anni', label: '7-10 anni' }
  ];

  // Family Services options
  const serviceOptions = [
    { id: 'Passeggino ok', label: 'Passeggino ok', icon: '🚼' },
    { id: 'Fasciatoio', label: 'Fasciatoio', icon: '🍼' },
    { id: 'Spogliatoio', label: 'Spogliatoio family', icon: '🚿' },
    { id: 'Area relax mamme', label: 'Area relax mamme', icon: '☕' }
  ];

  // Price filter options
  const priceOptions = [
    { id: 'all', label: 'Tutti i prezzi' },
    { id: 'free', label: 'Solo GRATIS' },
    { id: 'under15', label: 'Sotto i 15 €' }
  ];

  return (
    <aside className={`w-64 bg-white border-r border-slate-200/90 flex flex-col shrink-0 h-full font-sans select-none overflow-hidden text-slate-800 ${className}`}>
      
      {/* Scrollable Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0 scrollbar-thin">
        
        {/* ========================================================================= */}
        {/* 1. MENU SECONDARIO (Navigazione rapida)                                   */}
        {/* ========================================================================= */}
        <nav className="space-y-1">
          {/* Home */}
          <button
            onClick={() => onChangeTab('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#0D7480] text-white font-black shadow-xs ring-1 ring-[#0D7480]'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
            }`}
          >
            <Home className={`w-4 h-4 shrink-0 ${activeTab === 'home' ? 'text-white' : 'text-slate-500'}`} />
            <span>Home</span>
          </button>

          {/* Mappa (Active State with Verde Ottanio) */}
          <button
            onClick={() => onChangeTab('explore')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-[#0D7480] text-white font-black shadow-xs ring-1 ring-[#0D7480]'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
            }`}
          >
            <Map className={`w-4 h-4 shrink-0 ${activeTab === 'explore' ? 'text-white' : 'text-slate-500'}`} />
            <span>Mappa Interattiva</span>
          </button>

          {/* Calendario */}
          <button
            onClick={() => onChangeTab('planning')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'planning'
                ? 'bg-[#0D7480] text-white font-black shadow-xs ring-1 ring-[#0D7480]'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
            }`}
          >
            <Calendar className={`w-4 h-4 shrink-0 ${activeTab === 'planning' ? 'text-white' : 'text-slate-500'}`} />
            <span>Calendario</span>
          </button>

          {/* Preferiti */}
          <button
            onClick={() => onChangeTab('favorites')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#0D7480] text-white font-black shadow-xs ring-1 ring-[#0D7480]'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className={`w-4 h-4 shrink-0 ${activeTab === 'favorites' ? 'text-white fill-white' : 'text-slate-500'}`} />
              <span>Preferiti</span>
            </div>
            {favoritesCount > 0 && (
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                activeTab === 'favorites' ? 'bg-[#701542] text-white' : 'bg-[#FAF0F4] text-[#701542] border border-[#701542]/20'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Prenotazioni / Biglietti */}
          <button
            onClick={() => onChangeTab('tickets')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-[#0D7480] text-white font-black shadow-xs ring-1 ring-[#0D7480]'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket className={`w-4 h-4 shrink-0 ${activeTab === 'tickets' ? 'text-white' : 'text-slate-500'}`} />
              <span>Prenotazioni</span>
            </div>
            {ticketsCount > 0 && (
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#701542] text-white">
                {ticketsCount}
              </span>
            )}
          </button>
        </nav>

        {/* ========================================================================= */}
        {/* 2. CATEGORIE (Con Icone in Magenta)                                       */}
        {/* ========================================================================= */}
        <div className="pt-2 border-t border-slate-100">
          <div 
            onClick={() => toggleSection('categorie')}
            className="flex items-center justify-between py-1 cursor-pointer group"
          >
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
              Categorie
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openSections.categorie ? 'rotate-180' : ''}`} />
          </div>

          {openSections.categorie && (
            <div className="space-y-1 pt-1.5">
              {SIDEBAR_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => onToggleCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF0F4] text-[#701542] border border-[#701542]/30 shadow-2xs font-black'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#701542]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Icon Container with Magenta Icon */}
                      <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#701542]" />
                      </div>
                      <span className="text-left font-semibold">{cat.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#0D7480] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. FILTRI RAPIDI (Date, Età, Servizi, Prezzo)                              */}
        {/* ========================================================================= */}
        <div className="pt-2 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#0D7480]" />
              Filtri Rapidi
            </span>
            <button
              onClick={onResetFilters}
              className="text-[10px] font-extrabold text-[#0D7480] hover:text-[#701542] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Quick Date Tabs */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              Quando:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'all', label: 'Tutti' },
                { id: 'oggi', label: 'Oggi' },
                { id: 'domani', label: 'Domani' },
                { id: 'weekend', label: 'Weekend' }
              ].map((day) => (
                <button
                  key={day.id}
                  onClick={() => onSelectDay(day.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDay === day.id
                      ? 'bg-[#0D7480] text-white font-black shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              Età Bambino:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ageOptions.map((age) => {
                const isSelected = selectedAgeGroups.includes(age.id);
                return (
                  <button
                    key={age.id}
                    onClick={() => onToggleAgeGroup(age.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D7480] text-white font-black shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {age.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Family Services */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              Servizi Family:
            </span>
            <div className="space-y-1">
              {serviceOptions.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    onClick={() => onToggleService(srv.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF0F4] text-[#701542] border border-[#701542]/30 shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{srv.icon}</span>
                      <span>{srv.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0D7480]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prezzo */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              Fascia Prezzo:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {priceOptions.map((prc) => (
                <button
                  key={prc.id}
                  onClick={() => onSelectPriceFilter(prc.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedPriceFilter === prc.id
                      ? 'bg-[#0D7480] text-white font-black shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {prc.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Sidebar Footer info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-500">
          MAMAPP Palermo • Guida Certificata
        </p>
      </div>

    </aside>
  );
};
