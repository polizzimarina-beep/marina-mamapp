import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Activity } from '../types';
import { TrustFooterBar } from './TrustFooterBar';

interface ThreeColumnCalendarViewProps {
  activities: Activity[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectActivity: (activity: Activity) => void;
  onBookActivity?: (activity: Activity, e?: React.MouseEvent) => void;
  onChangeViewMode?: (mode: 'calendar' | 'list' | 'map') => void;
  currentViewMode?: 'calendar' | 'list' | 'map';
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedAgeGroups?: string[];
  onToggleAgeGroup?: (age: string) => void;
  selectedActivities?: string[];
  onToggleActivity?: (act: string) => void;
  selectedZones?: string[];
  onToggleZone?: (zone: string) => void;
  selectedTimeSlots?: string[];
  onToggleTimeSlot?: (slot: string) => void;
  onlyFree?: boolean;
  onToggleFree?: () => void;
  onResetFilters?: () => void;
}

export const ThreeColumnCalendarView: React.FC<ThreeColumnCalendarViewProps> = ({
  activities = [],
  favorites = [],
  onToggleFavorite,
  onSelectActivity,
  searchQuery = ''
}) => {
  // Active date selection state: default is custom day 24 or open calendar
  const [selectedDayTab, setSelectedDayTab] = useState<'oggi' | 'domani' | 'custom'>('custom');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(24); // Domenica 24 Maggio 2026
  
  // POP-UP CALENDARIO ATTIVO (Aperto di default come richiesto dal prompt)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(true);
  
  // Current month state
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(4); // 4 = Maggio
  const [currentYear, setCurrentYear] = useState<number>(2026);

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  // Days of week: Lunedì to Domenica
  const weekDays = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

  // Days grid calculation for Maggio 2026 (Starts on Friday = index 4 in Monday-based week)
  // Prev month padding (Aprile has 30 days): 27, 28, 29, 30
  // Maggio has 31 days: 1 .. 31
  // Next month padding (Giugno): 1 .. 7
  const calendarCells = useMemo(() => {
    const cells = [];
    
    // Padding from April (27 to 30)
    for (let d = 27; d <= 30; d++) {
      cells.push({ day: d, isCurrentMonth: false, fullDate: `2026-04-${d}`, hasEvents: false });
    }

    // May (1 to 31)
    const eventDays = [2, 3, 9, 10, 15, 16, 17, 23, 24, 30, 31]; // Typical Palermo family event days
    for (let d = 1; d <= 31; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        fullDate: `2026-05-${String(d).padStart(2, '0')}`,
        hasEvents: eventDays.includes(d)
      });
    }

    // Next month padding (1 to 7 June to complete rows)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, isCurrentMonth: false, fullDate: `2026-06-${d}`, hasEvents: false });
    }

    return cells;
  }, []);

  const handleSelectDay = (dayNum: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    setSelectedDayNumber(dayNum);
    setSelectedDayTab('custom');
  };

  // Filter activities based on selected date
  const filteredActivities = useMemo(() => {
    let list = [...activities];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.venueName.toLowerCase().includes(q));
    }
    return list;
  }, [activities, searchQuery]);

  return (
    <div className="bg-white min-h-full px-4 sm:px-6 max-w-4xl mx-auto w-full font-sans select-none space-y-4 sm:space-y-5 pb-28 relative">
      
      {/* ========================================================================= */}
      {/* 1. INTESTAZIONE E FILTRI SUPERIORI:                                       */}
      {/* Pillole "Oggi 15 Mag", "Domani 16 Mag" e "Scegli data"                    */}
      {/* "Scegli data" appare visivamente selezionato con sottile bordo Magenta    */}
      {/* Scuro (#6B283A)                                                           */}
      {/* ========================================================================= */}
      <div className="pt-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5">
          
          {/* Pillola 1: Oggi 15 Mag */}
          <button
            type="button"
            onClick={() => {
              setSelectedDayTab('oggi');
              setSelectedDayNumber(15);
              setIsDatePickerOpen(false);
            }}
            className={`px-4 sm:px-5 py-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer shrink-0 ${
              selectedDayTab === 'oggi' && !isDatePickerOpen
                ? 'bg-white text-[#6B283A] border border-[#6B283A] shadow-xs font-bold'
                : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 font-medium'
            }`}
          >
            <span className="text-xs sm:text-sm font-bold leading-tight">Oggi</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
              15 Mag
            </span>
          </button>

          {/* Pillola 2: Domani 16 Mag */}
          <button
            type="button"
            onClick={() => {
              setSelectedDayTab('domani');
              setSelectedDayNumber(16);
              setIsDatePickerOpen(false);
            }}
            className={`px-4 sm:px-5 py-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer shrink-0 ${
              selectedDayTab === 'domani' && !isDatePickerOpen
                ? 'bg-white text-[#6B283A] border border-[#6B283A] shadow-xs font-bold'
                : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 font-medium'
            }`}
          >
            <span className="text-xs sm:text-sm font-bold leading-tight">Domani</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
              16 Mag
            </span>
          </button>

          {/* Pillola 3: "Scegli data" (STATO ATTIVO: visivamente selezionato con sottile bordo Magenta Scuro #6B283A) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                isDatePickerOpen || selectedDayTab === 'custom'
                  ? 'bg-white text-[#6B283A] border border-[#6B283A] ring-1 ring-[#6B283A]/20 font-bold'
                  : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 font-medium'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-[#6B283A] stroke-[1.8]" />
              <span className="text-xs sm:text-sm">
                {selectedDayTab === 'custom' && selectedDayNumber ? `${selectedDayNumber} Maggio` : 'Scegli data'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#6B283A] transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. IL PANNELLO CALENDARIO (POP-UP O TENDINA):                             */}
      {/* Sotto la barra dei filtri, si apre un elegante riquadro mensile.          */}
      {/* - Sfondo: Bianco puro (#FFFFFF) con bordi arrotondati e ombra leggerissima*/}
      {/* - Intestazione mese: "Maggio 2026" con 2 freccette minimali               */}
      {/* - Giorni settimana (L, M, M, G, V, S, D) in grigio lavagna                */}
      {/* - STATO SELEZIONATO: cerchio pieno Magenta Scuro (#6B283A) con num bianco */}
      {/* ========================================================================= */}
      {isDatePickerOpen && (
        <div className="relative z-30 animate-in fade-in slide-in-from-top-3 duration-200">
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_6px_30px_rgba(0,0,0,0.06)] p-5 sm:p-6 space-y-4 max-w-md mx-auto sm:mx-0">
            
            {/* Intestazione del Mese: "Maggio 2026" in grigio scuro con due piccole frecce minimali */}
            <div className="flex items-center justify-between px-1">
              <h2 className="font-bold text-base sm:text-lg text-slate-800 tracking-tight">
                {monthNames[currentMonthIndex]} {currentYear}
              </h2>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Mese precedente"
                  className="w-8 h-8 rounded-full border border-slate-200/80 hover:border-slate-300 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.8]" />
                </button>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Mese successivo"
                  className="w-8 h-8 rounded-full border border-slate-200/80 hover:border-slate-300 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            </div>

            {/* Griglia dei Giorni della Settimana: L, M, M, G, V, S, D in grigio lavagna */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((d, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-semibold text-slate-400 py-1"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Griglia dei Giorni del Mese */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarCells.map((cell, idx) => {
                const isSelected = cell.isCurrentMonth && cell.day === selectedDayNumber;

                return (
                  <div key={idx} className="flex flex-col items-center justify-center py-1">
                    <button
                      type="button"
                      disabled={!cell.isCurrentMonth}
                      onClick={() => handleSelectDay(cell.day, cell.isCurrentMonth)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex flex-col items-center justify-center text-xs sm:text-sm font-medium transition-all relative cursor-pointer ${
                        isSelected
                          ? 'bg-[#6B283A] text-white font-bold shadow-xs scale-105'
                          : cell.isCurrentMonth
                          ? 'text-slate-700 hover:bg-slate-50'
                          : 'text-slate-300 cursor-default hover:bg-transparent'
                      }`}
                    >
                      <span>{cell.day}</span>
                      
                      {/* Puntino discreto per indicare eventi in quella data */}
                      {cell.hasEvents && (
                        <span 
                          className={`w-1 h-1 rounded-full absolute bottom-1.5 ${
                            isSelected ? 'bg-white' : 'bg-[#6B283A]'
                          }`} 
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Barra inferiore calendario: Data selezionata & Bottone Conferma */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Selezionato: <strong className="text-slate-800 font-bold">{selectedDayNumber} Maggio 2026</strong>
              </span>

              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                className="bg-[#6B283A] hover:bg-[#581F2F] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                Conferma
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SFONDO GENERALE E LISTA SOTTOSTANTE:                                   */}
      {/* Rimane visibile ma leggermente in secondo piano se il calendario è aperto,*/}
      {/* mantenendo lo stile pulito e senza elementi neri o scuri.                 */}
      {/* ========================================================================= */}
      <div className={`space-y-3 pt-1 transition-opacity duration-200 ${isDatePickerOpen ? 'opacity-55' : 'opacity-100'}`}>
        
        {/* Intestazione Sezione Attività del giorno */}
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            ATTIVITÀ DISPONIBILI ({filteredActivities.length})
          </span>
          <span className="text-xs font-semibold text-[#6B283A]">
            {selectedDayNumber} Maggio 2026
          </span>
        </div>

        {/* Card Attività (Allineate in stile iOS Premium) */}
        <div className="space-y-3">
          {filteredActivities.map((act) => {
            const isFavorite = favorites.includes(act.id);
            const slot = act.slots && act.slots[0] ? act.slots[0].time : '16:30 - 17:30';
            const priceDisplay = act.price === 0 ? 'Gratis' : `€${act.price}`;

            return (
              <article
                key={act.id}
                onClick={() => onSelectActivity(act)}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
              >
                {/* Miniatura quadrata con angoli smussati */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Dettagli centrali */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B283A] block">
                      {(act.categoryName || 'Laboratori').toUpperCase()}
                    </span>

                    <h3 className="font-bold text-sm sm:text-base text-slate-800 truncate leading-snug mt-0.5">
                      {act.title}
                    </h3>

                    <div className="space-y-0.5 mt-0.5 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1 truncate">
                        <span>📍</span>
                        <span className="truncate">{act.venueName}</span>
                        <span>•</span>
                        <span>🕒</span>
                        <span>{slot}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] sm:text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full font-medium border border-slate-100">
                      {act.ageMin}–{act.ageMax} anni
                    </span>
                  </div>
                </div>

                {/* Destra: Cuore e Prezzo bordeaux */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5 pl-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(act.id, e);
                    }}
                    aria-label="Salva nei preferiti"
                    className="p-1 text-slate-300 hover:text-[#6B283A] transition-colors cursor-pointer"
                  >
                    <Heart 
                      className={`w-5 h-5 stroke-[1.8] ${
                        isFavorite ? 'fill-[#6B283A] text-[#6B283A]' : 'text-slate-300'
                      }`} 
                    />
                  </button>

                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-sm sm:text-base text-[#6B283A]">
                      {priceDisplay}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectActivity(act);
                      }}
                      className="bg-[#6B283A] hover:bg-[#581F2F] text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full transition-all active:scale-95 cursor-pointer"
                    >
                      Dettagli
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Trust bar sul fondo */}
      <TrustFooterBar />

    </div>
  );
};
