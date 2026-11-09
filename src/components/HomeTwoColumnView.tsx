import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Check, 
  ChevronRight,
  Clock,
  Compass,
  Zap,
  Home,
  Tag,
  Baby
} from 'lucide-react';
import { Activity } from '../types';
import { HorizontalActivityCard } from './HorizontalActivityCard';

interface HomeTwoColumnViewProps {
  activities?: Activity[];
  favorites?: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectActivity: (activity: Activity) => void;
  onBookActivity: (activity: Activity, e: React.MouseEvent) => void;
  selectedDay?: string;
  onSelectDay?: (day: string) => void;
  onChangeTab?: (tab: string) => void;
  onlyFree?: boolean;
  onToggleFree?: () => void;
  selectedAgeGroups?: string[];
  onToggleAgeGroup?: (age: string) => void;
  selectedServices?: string[];
  onToggleService?: (service: string) => void;
  currentZone?: string;
  onSelectZone?: (zone: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectDate?: (day: string) => void;
  onOpenMap?: () => void;
}

export const HomeTwoColumnView: React.FC<HomeTwoColumnViewProps> = ({
  activities = [],
  favorites = [],
  onToggleFavorite,
  onSelectActivity,
  onBookActivity,
  selectedDay = 'all',
  onSelectDay = (_day?: string) => {},
  onChangeTab = (_tab?: string) => {},
  onlyFree = false,
  onToggleFree = () => {},
  selectedAgeGroups = [],
  onToggleAgeGroup = (_age?: string) => {},
  selectedServices = [],
  onToggleService = (_service?: string) => {},
  currentZone = 'Tutti i Quartieri',
  onSelectZone = (_zone?: string) => {},
  searchQuery = '',
  onSearchChange = (_query?: string) => {},
  onSelectDate,
  onOpenMap
}) => {
  const [calendarSubTab, setCalendarSubTab] = useState<'oggi' | 'domani' | 'weekend'>('oggi');
  const [showMoreActivities, setShowMoreActivities] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  // Quick filter pills state logic
  const isNearMeActive = currentZone !== 'Tutti i Quartieri' || activeQuickFilter === 'near';
  const is03Active = (selectedAgeGroups || []).includes('0-3');
  const is36Active = (selectedAgeGroups || []).includes('3-6');
  const isIndoorActive = (selectedServices || []).includes('indoor');

  const handleSelectDay = (day: string) => {
    if (onSelectDate) {
      onSelectDate(day);
    } else if (onSelectDay) {
      onSelectDay(day);
    }
  };

  const handleOpenMap = () => {
    if (onOpenMap) {
      onOpenMap();
    } else if (onChangeTab) {
      onChangeTab('explore');
    }
  };

  // Filter activities to display
  const displayedActivities = showMoreActivities ? activities : activities.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================= */}
        {/* COLONNA DI SINISTRA: CONTENUTO PRINCIPALE (8/12)           */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Titolo Principale Accattivante e Sottotitolo */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-2">
              <span>Cosa fare</span>
              <span className="text-pink-600 font-black">oggi</span>
              <span>con i tuoi bambini 💖</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Scopri attività perfette per divertirvi insieme a Palermo.
            </p>
          </div>

          {/* Riga Filtri Rapidi Orizzontali (Pillole Cliccabili) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {/* Pillola 1: Vicino a me */}
            <button
              onClick={() => {
                if (isNearMeActive) {
                  onSelectZone('Tutti i Quartieri');
                  setActiveQuickFilter(null);
                } else {
                  onSelectZone('Politeama');
                  setActiveQuickFilter('near');
                }
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isNearMeActive
                  ? 'bg-pink-50 text-pink-600 border-pink-300 ring-2 ring-pink-500/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isNearMeActive ? 'text-pink-600' : 'text-pink-500'}`} />
              <span>Vicino a me</span>
            </button>

            {/* Pillola 2: 0-3 anni */}
            <button
              onClick={() => onToggleAgeGroup('0-3')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                is03Active
                  ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>👶 0-3 anni</span>
            </button>

            {/* Pillola 3: 3-6 anni */}
            <button
              onClick={() => onToggleAgeGroup('3-6')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                is36Active
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>🐸 3-6 anni</span>
            </button>

            {/* Pillola 4: Gratis */}
            <button
              onClick={onToggleFree}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                onlyFree
                  ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>🎁 Gratis</span>
            </button>

            {/* Pillola 5: Indoor */}
            <button
              onClick={() => onToggleService('indoor')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isIndoorActive
                  ? 'bg-sky-50 text-sky-800 border-sky-300 ring-2 ring-sky-500/10'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-slate-500" />
              <span>Indoor</span>
            </button>
          </div>

          {/* Intestazione Sezione Consigliate */}
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Consigliate per te
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Attività selezionate in base ai tuoi interessi e alla tua posizione.
            </p>
          </div>

          {/* Lista di Card Attività Orizzontali Compatte */}
          <div className="space-y-3.5">
            {displayedActivities.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-3">
                <p className="text-sm font-bold text-slate-700">Nessuna attività trovata con questi filtri.</p>
                <button
                  onClick={() => {
                    onSelectZone('Tutti i Quartieri');
                    setActiveQuickFilter(null);
                    if (onlyFree) onToggleFree();
                  }}
                  className="text-xs font-extrabold text-pink-600 hover:underline cursor-pointer"
                >
                  Resetta i filtri per vedere tutte le attività
                </button>
              </div>
            ) : (
              displayedActivities.map((act) => (
                <HorizontalActivityCard
                  key={act.id}
                  activity={act}
                  isFavorite={favorites.includes(act.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelectActivity}
                  onBookNow={onBookActivity}
                />
              ))
            )}
          </div>

          {/* Bottone "Vedi altre attività consigliate" */}
          {activities.length > 4 && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowMoreActivities(!showMoreActivities)}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-extrabold text-xs py-3 rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{showMoreActivities ? 'Mostra meno attività' : 'Vedi altre attività consigliate'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMoreActivities ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* COLONNA DI DESTRA: WIDGET LATERALI STICKY (4/12)            */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          
          {/* WIDGET 1: CALENDARIO RAPIDO ("Quando vuoi andare?") */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* Header Box */}
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>Quando vuoi andare?</span>
            </div>

            {/* Sub-tabs: Oggi | Domani | Weekend */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => {
                  setCalendarSubTab('oggi');
                  handleSelectDay('oggi');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  calendarSubTab === 'oggi' || selectedDay === 'oggi'
                    ? 'bg-white text-pink-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Oggi
              </button>
              <button
                onClick={() => {
                  setCalendarSubTab('domani');
                  handleSelectDay('domani');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  calendarSubTab === 'domani' || selectedDay === 'domani'
                    ? 'bg-white text-pink-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Domani
              </button>
              <button
                onClick={() => {
                  setCalendarSubTab('weekend');
                  handleSelectDay('weekend');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  calendarSubTab === 'weekend' || selectedDay === 'weekend'
                    ? 'bg-white text-pink-600 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weekend
              </button>
            </div>

            {/* Griglia Date Selettori Rapidi */}
            <div className="grid grid-cols-4 gap-2">
              
              {/* Card 1: 15 Mag Ven (Oggi) */}
              <button
                onClick={() => {
                  setCalendarSubTab('oggi');
                  handleSelectDay('oggi');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                  calendarSubTab === 'oggi' || selectedDay === 'oggi'
                    ? 'bg-pink-50/60 border-pink-400 ring-2 ring-pink-500/10 text-pink-700 font-extrabold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base font-black leading-none mb-1">15</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Mag</span>
                <span className="text-[10px] font-medium text-pink-600 mt-1">Ven</span>
                {(calendarSubTab === 'oggi' || selectedDay === 'oggi') && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute -bottom-1"></span>
                )}
              </button>

              {/* Card 2: 16 Mag Sab */}
              <button
                onClick={() => {
                  setCalendarSubTab('domani');
                  handleSelectDay('domani');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                  calendarSubTab === 'domani' || selectedDay === 'domani'
                    ? 'bg-pink-50/60 border-pink-400 ring-2 ring-pink-500/10 text-pink-700 font-extrabold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base font-black leading-none mb-1">16</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Mag</span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">Sab</span>
              </button>

              {/* Card 3: 17 Mag Dom */}
              <button
                onClick={() => {
                  setCalendarSubTab('weekend');
                  handleSelectDay('weekend');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                  calendarSubTab === 'weekend' || selectedDay === 'weekend'
                    ? 'bg-pink-50/60 border-pink-400 ring-2 ring-pink-500/10 text-pink-700 font-extrabold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base font-black leading-none mb-1">17</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Mag</span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">Dom</span>
              </button>

              {/* Card 4: Weekend 17-18 Mag */}
              <button
                onClick={() => {
                  setCalendarSubTab('weekend');
                  handleSelectDay('weekend');
                }}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  selectedDay === 'weekend'
                    ? 'bg-pink-50/60 border-pink-400 ring-2 ring-pink-500/10 text-pink-700 font-extrabold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-[10px] font-extrabold text-slate-600 leading-tight">Weekend</span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">17–18 Mag</span>
              </button>

            </div>

          </div>

          {/* WIDGET 2: MAPPA VICINA ("Mappa vicina") */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            
            {/* Header Box */}
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>Mappa vicina</span>
            </div>

            {/* Finta anteprima grafica vettoriale della mappa di Palermo */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 group cursor-pointer"
                 onClick={handleOpenMap}>
              
              {/* Graphic map background styling */}
              <div className="absolute inset-0 bg-[#e5e3df] opacity-90"></div>
              
              {/* Coastline / Sea blue area */}
              <div className="absolute top-0 right-0 w-2/5 h-full bg-[#aadaff] rounded-l-full opacity-80 pointer-events-none"></div>

              {/* Roads / Street lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-40 stroke-white" strokeWidth="3" fill="none">
                  <path d="M 0 30 Q 100 50 200 120 T 350 180" />
                  <path d="M 50 0 L 180 200" />
                  <path d="M 0 100 L 300 80" />
                  <path d="M 120 0 Q 150 100 120 200" />
                </svg>
              </div>

              {/* Park green area - Parco della Favorita */}
              <div className="absolute top-1/3 left-1/3 w-16 h-12 bg-emerald-200/80 rounded-2xl border border-emerald-300 pointer-events-none"></div>

              {/* Simulated Map Markers for Palermo locations */}
              
              {/* Marker 1: Mondello */}
              <div className="absolute top-6 right-8 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span>Mondello</span>
              </div>

              {/* Marker 2: Parco Favorita */}
              <div className="absolute top-16 left-12 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Parco Favorita</span>
              </div>

              {/* Marker 3: Politeama / Centro */}
              <div className="absolute bottom-10 right-16 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Politeama</span>
              </div>

              {/* Marker 4: Zisa */}
              <div className="absolute bottom-4 left-6 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Zisa</span>
              </div>

              {/* Palermo Central Title overlay */}
              <div className="absolute bottom-2 right-3 font-black text-slate-700 text-xs opacity-60 pointer-events-none tracking-widest uppercase">
                Palermo
              </div>

            </div>

            {/* Bottone "Esplora sulla mappa" */}
            <button
              onClick={handleOpenMap}
              className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-extrabold text-xs py-2.5 rounded-xl border border-slate-200/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-600" />
              <span>Esplora sulla mappa</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
