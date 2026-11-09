import React, { useState, useMemo, useRef } from 'react';
import { Activity, CategoryId, AgeGroup, TargetAudience } from '../types';
import { CATEGORIES, PALERMO_ZONES } from '../data/mockData';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Grid,
  Search,
  X,
  RotateCcw,
  Tag,
  Check,
  Users,
  Filter,
  Columns,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Baby,
  Building2
} from 'lucide-react';

interface PlanningCalendarViewProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onBookActivity: (activity: Activity) => void;
  selectedCategory: CategoryId | 'all';
  selectedAgeGroup: AgeGroup | 'all';
  selectedAudience: TargetAudience;
  selectedDay: string;
  currentZone: string;
}

interface DayOption {
  id: string;
  label: string;
  short: string;
  weekday: string;
  weekdayShort: string;
  dateNum: string;
  month: string;
  fullDateStr: string;
}

const MONTH_OPTIONS = [
  { id: 'Mag', name: 'Maggio 2026' },
  { id: 'Giu', name: 'Giugno 2026' },
  { id: 'Lug', name: 'Luglio 2026' },
  { id: 'Ago', name: 'Agosto 2026' },
  { id: 'Set', name: 'Settembre 2026' },
  { id: 'Ott', name: 'Ottobre 2026' },
  { id: 'Nov', name: 'Novembre 2026' },
  { id: 'Dic', name: 'Dicembre 2026' },
];

const generateAllDays = (): DayOption[] => {
  const days: DayOption[] = [];
  const weekdaysShort = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
  const weekdaysFull = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const monthCodes = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  const monthFullNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  // From 15 Maggio 2026 to 31 Dicembre 2026
  const startDate = new Date(2026, 4, 15);
  const endDate = new Date(2026, 11, 31);

  let current = new Date(startDate);
  while (current <= endDate) {
    const year = current.getFullYear();
    const monthIdx = current.getMonth();
    const dateNum = current.getDate();
    const dayOfWeekIdx = current.getDay();

    const monthCode = monthCodes[monthIdx];
    const monthFull = monthFullNames[monthIdx];
    const weekdayShort = weekdaysShort[dayOfWeekIdx];
    const weekdayFull = weekdaysFull[dayOfWeekIdx];

    const monthPadded = String(monthIdx + 1).padStart(2, '0');
    const datePadded = String(dateNum).padStart(2, '0');

    days.push({
      id: `${weekdayShort.toLowerCase()}-${dateNum}-${monthCode.toLowerCase()}`,
      label: `${weekdayFull} ${dateNum} ${monthFull}`,
      short: `${weekdayFull.substring(0, 3)} ${dateNum}`,
      weekday: weekdayFull,
      weekdayShort: weekdayShort,
      dateNum: String(dateNum),
      month: monthCode,
      fullDateStr: `${datePadded}/${monthPadded}/${year}`
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
};

const ALL_DAYS: DayOption[] = generateAllDays();

const DAYS_PER_STEP = 5;
const TOTAL_STEPS = Math.ceil(ALL_DAYS.length / DAYS_PER_STEP);

// Helper functions for instant visual symbol/icon identification
const getCategorySymbol = (categoryId?: string): string => {
  switch (categoryId) {
    case 'concerti': return '🎟️';
    case 'yoga': return '🧘‍♀️';
    case 'gokart': return '🏎️';
    case 'mare': return '🏖️';
    case 'piscina': return '🏊‍♂️';
    case 'sport': return '⚽';
    case 'lingue': return '🗣️';
    case 'musica': return '🎵';
    case 'circoli': return '🎉';
    case 'cinema': return '🎬';
    case 'parchi': return '🌳';
    case 'trasporti': return '🚌';
    default: return '⭐';
  }
};

const getAudienceSymbol = (audience?: string): string => {
  switch (audience) {
    case 'bimbi': return '👶';
    case 'mamme': return '👩';
    case 'papa': return '👨';
    case 'famiglia': return '👨‍👩‍👧';
    default: return '✨';
  }
};

export const PlanningCalendarView: React.FC<PlanningCalendarViewProps> = ({
  activities,
  onSelectActivity,
  onBookActivity,
  selectedCategory,
  selectedAgeGroup,
  selectedAudience,
  selectedDay,
  currentZone,
}) => {
  // Step navigation state (default 7 days per week view)
  const [daysPerStep, setDaysPerStep] = useState<number>(7);
  const [startDayIndex, setStartDayIndex] = useState<number>(0);

  // Month navigation state for Griglia Mode (0 = Maggio 2026, 1 = Giugno 2026)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);

  // Calendar Picker Modal State for Settimana mode
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);

  // Layout Mode: 'horizontal-week' (Settimana) or 'grid' (Griglia)
  const [layoutMode, setLayoutMode] = useState<'horizontal-week' | 'grid'>('horizontal-week');

  // State for expanded day cards in Grid mode
  const [expandedGridDays, setExpandedGridDays] = useState<Record<string, boolean>>({});

  const toggleGridDay = (dayId: string) => {
    setExpandedGridDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  // Days belonging to the active month in Grid mode
  const gridMonthDays = useMemo(() => {
    const activeMonthId = MONTH_OPTIONS[selectedMonthIndex].id;
    return ALL_DAYS.filter(d => d.month === activeMonthId);
  }, [selectedMonthIndex]);

  // Filters State
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>(selectedCategory || 'all');
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>(currentZone !== 'Tutti i Quartieri' ? currentZone : 'all');
  const [activeAgeGroup, setActiveAgeGroup] = useState<AgeGroup | 'all'>(selectedAgeGroup || 'all');
  const [activeAudience, setActiveAudience] = useState<TargetAudience | 'all'>('all');
  const [activeOrganizer, setActiveOrganizer] = useState<string>('all');
  const [activeTimeSlot, setActiveTimeSlot] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract list of unique organizers from available activities
  const organizersList = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((act) => {
      if (act.organizer?.name) set.add(act.organizer.name);
      else if (act.venueName) set.add(act.venueName);
    });
    return Array.from(set).sort();
  }, [activities]);

  // Current active days starting from startDayIndex
  const activeDaysList = useMemo(() => {
    return ALL_DAYS.slice(startDayIndex, Math.min(ALL_DAYS.length, startDayIndex + daysPerStep));
  }, [startDayIndex, daysPerStep]);

  const startDateObj = activeDaysList[0];
  const endDateObj = activeDaysList[activeDaysList.length - 1];

  // Helper to check if a slot matches a specific day option
  const slotMatchesDayObj = (slot: any, dayObj: DayOption): boolean => {
    if (slot.startDate) {
      const parts = slot.startDate.split('-');
      if (parts.length === 3) {
        const monthInt = parseInt(parts[1], 10);
        const dayInt = parseInt(parts[2], 10).toString();
        const monthCodeMap: Record<number, string> = { 5: 'Mag', 6: 'Giu', 7: 'Lug', 8: 'Ago', 9: 'Set', 10: 'Ott', 11: 'Nov', 12: 'Dic' };
        if (dayObj.dateNum === dayInt && dayObj.month === monthCodeMap[monthInt]) {
          return true;
        }
      }
    }

    const slotDay = (slot.dayOfWeek || '').toLowerCase();
    
    if (slotDay.includes((dayObj.month || '').toLowerCase()) && slotDay.includes(dayObj.dateNum)) {
      return true;
    }
    
    if (slotDay.includes(dayObj.dateNum) && slotDay.includes((dayObj.weekday || '').toLowerCase())) {
      return true;
    }

    return false;
  };

  // Filter activities based on active controls and map them to ALL days
  const filteredEventsByDay = useMemo(() => {
    const map = new Map<string, { activity: Activity; slot: any }[]>();

    activities.forEach((act) => {
      // 1. Category Filter
      if (activeCategory !== 'all' && act.categoryId !== activeCategory) return;

      // 2. Zone Filter
      if (activeZoneFilter !== 'all' && !(act.zone || '').toLowerCase().includes((activeZoneFilter || '').toLowerCase())) return;

      // 3. Age Group Filter
      if (activeAgeGroup !== 'all') {
        if (activeAudience !== 'mamme' && act.targetAudience === 'mamme') return;
        if (activeAudience !== 'papa' && act.targetAudience === 'papa') return;

        if (activeAgeGroup === '0-3' && !(act.ageMin <= 3 && act.ageMax >= 0)) return;
        if (activeAgeGroup === '3-6' && !(act.ageMin <= 6 && act.ageMax >= 3)) return;
        if (activeAgeGroup === '6-10' && !(act.ageMin <= 10 && act.ageMax >= 6)) return;
        if (activeAgeGroup === '10-14+' && !(act.ageMin <= 16 && act.ageMax >= 10)) return;
      }

      // 4. Audience Filter
      if (activeAudience !== 'all' && act.targetAudience !== activeAudience) return;

      // 5. Organizer Filter
      if (activeOrganizer !== 'all') {
        const orgName = act.organizer?.name || act.venueName;
        if (orgName !== activeOrganizer) return;
      }

      // 6. Price Filter
      if (onlyFree && act.price > 0) return;

      // 7. Text Search
      if (searchQuery.trim()) {
        const q = (searchQuery || '').toLowerCase();
        const titleMatch = (act.title || '').toLowerCase().includes(q);
        const venueMatch = (act.venueName || '').toLowerCase().includes(q);
        const orgMatch = (act.organizer?.name || '').toLowerCase().includes(q);
        const descMatch = (act.description || '').toLowerCase().includes(q);
        if (!titleMatch && !venueMatch && !orgMatch && !descMatch) return;
      }

      // Match slots with all days of the year & active time slot filter
      act.slots.forEach((slot) => {
        if (activeTimeSlot !== 'all') {
          const hour = parseInt(slot.time.split(':')[0], 10);
          if (activeTimeSlot === 'morning' && !(hour < 12)) return;
          if (activeTimeSlot === 'afternoon' && !(hour >= 12 && hour < 18)) return;
          if (activeTimeSlot === 'evening' && !(hour >= 18)) return;
        }

        ALL_DAYS.forEach((dayObj) => {
          if (slotMatchesDayObj(slot, dayObj)) {
            const list = map.get(dayObj.id) || [];
            list.push({ activity: act, slot });
            map.set(dayObj.id, list);
          }
        });
      });
    });

    // Sort events within each day by time
    map.forEach((items) => {
      items.sort((a, b) => a.slot.time.localeCompare(b.slot.time));
    });

    return map;
  }, [activities, activeCategory, activeZoneFilter, activeAgeGroup, activeAudience, activeOrganizer, activeTimeSlot, onlyFree, searchQuery]);

  // Count total matching events in the current displayed mode
  const totalMatchingEvents = useMemo(() => {
    let count = 0;
    const daysToCheck = layoutMode === 'grid' ? gridMonthDays : activeDaysList;
    daysToCheck.forEach((d) => {
      const list = filteredEventsByDay.get(d.id) || [];
      count += list.length;
    });
    return count;
  }, [filteredEventsByDay, activeDaysList, gridMonthDays, layoutMode]);

  // Count active non-default filters
  const activeFiltersCount = useMemo(() => {
    let cnt = 0;
    if (activeCategory !== 'all') cnt++;
    if (activeZoneFilter !== 'all') cnt++;
    if (activeAgeGroup !== 'all') cnt++;
    if (activeAudience !== 'all') cnt++;
    if (activeOrganizer !== 'all') cnt++;
    if (activeTimeSlot !== 'all') cnt++;
    if (onlyFree) cnt++;
    if (searchQuery.trim() !== '') cnt++;
    return cnt;
  }, [activeCategory, activeZoneFilter, activeAgeGroup, activeAudience, activeOrganizer, activeTimeSlot, onlyFree, searchQuery]);

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setActiveZoneFilter('all');
    setActiveAgeGroup('all');
    setActiveAudience('all');
    setActiveOrganizer('all');
    setActiveTimeSlot('all');
    setOnlyFree(false);
    setSearchQuery('');
    setStartDayIndex(0);
  };

  return (
    <div className="space-y-4">

      {/* SIMPLIFIED CONTROL BAR */}
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Left Controls: Date Selector + Navigation Arrows */}
        <div className="flex items-center gap-2">
          {/* Button to open interactive Calendar Grid Datepicker */}
          <button
            onClick={() => setShowCalendarModal(true)}
            className="h-8 bg-sky-50 hover:bg-sky-100/90 text-sky-950 font-extrabold text-xs px-3 rounded-lg border border-sky-200/90 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0"
            title="Seleziona la data di partenza"
          >
            <CalendarDays className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Data ({startDateObj.dateNum} {startDateObj.month})</span>
          </button>

          {/* Navigation arrows (Prec / Succ) */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
            <button 
              onClick={() => setStartDayIndex(prev => Math.max(0, prev - daysPerStep))}
              disabled={startDayIndex === 0}
              className="p-1 rounded-md bg-white hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs border border-slate-200/60 flex items-center gap-1 text-xs font-bold"
              title={`${daysPerStep} giorni precedenti`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Prec</span>
            </button>
            <button 
              onClick={() => setStartDayIndex(prev => Math.min(ALL_DAYS.length - 1, prev + daysPerStep))}
              disabled={startDayIndex >= ALL_DAYS.length - 1}
              className="p-1 rounded-md bg-white hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs border border-slate-200/60 flex items-center gap-1 text-xs font-bold"
              title={`${daysPerStep} giorni successivi`}
            >
              <span className="hidden sm:inline text-[11px]">Succ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Aligned Clean View Selector Bar (3 Giorni / 7 Giorni / Vista Mese) */}
        <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => {
              setDaysPerStep(3);
              setLayoutMode('horizontal-week');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              layoutMode === 'horizontal-week' && daysPerStep === 3
                ? 'bg-slate-900 text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3 Giorni
          </button>
          <button
            onClick={() => {
              setDaysPerStep(7);
              setLayoutMode('horizontal-week');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              layoutMode === 'horizontal-week' && daysPerStep === 7
                ? 'bg-slate-900 text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7 Giorni
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              layoutMode === 'grid'
                ? 'bg-slate-900 text-white font-extrabold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Vista Mese</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE CALENDAR DATE PICKER MODAL */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Seleziona Data Iniziale</h3>
              </div>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Clicca su un giorno per impostarlo come data di partenza della vista da {daysPerStep} giorni:
            </p>

            {/* Calendar grid grouped by Month */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
              {MONTH_OPTIONS.map((m) => {
                const daysInMonth = ALL_DAYS.filter(d => d.month === m.id);

                return (
                  <div key={m.id} className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 space-y-2">
                    <div className="text-xs font-black text-slate-800 uppercase tracking-wide">
                      🗓️ {m.name}
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                      {daysInMonth.map((dayObj) => {
                        const dayIdx = ALL_DAYS.findIndex(d => d.id === dayObj.id);
                        const isCurrentActive = activeDaysList.some(d => d.id === dayObj.id);

                        return (
                          <button
                            key={dayObj.id}
                            onClick={() => {
                              if (dayIdx !== -1) {
                                setStartDayIndex(dayIdx);
                              }
                              setShowCalendarModal(false);
                            }}
                            className={`p-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center border ${
                              isCurrentActive
                                ? 'bg-sky-600 text-white border-sky-600 shadow-sm font-black'
                                : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-300 font-bold'
                            }`}
                          >
                            <span className="text-[9px] uppercase opacity-80 font-extrabold">{dayObj.weekdayShort}</span>
                            <span className="text-xs font-black">{dayObj.dateNum}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NO RESULTS EMPTY STATE */}
      {totalMatchingEvents === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            Nessun evento corrisponde ai filtri selezionati
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Prova ad avanzare con le frecce ai giorni successivi o ad azzerare la ricerca.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ripristina Filtri</span>
          </button>
        </div>
      )}

      {/* 🌟 MODE 1: VISTA SETTIMANA (3/5/7 GIORNI ADATTIVA CON GRIGLIA A SCHERMO INTERO SENZA SCORRIMENTO) */}
      {layoutMode === 'horizontal-week' && totalMatchingEvents > 0 && (
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs space-y-3">
          
          {/* ADAPTIVE COLUMNS: Grid on desktop so all 7 days fit seamlessly, flex scroll on mobile */}
          <div className={`w-full gap-2.5 pb-3 pt-1 flex overflow-x-auto scrollbar-thin scroll-smooth ${
            daysPerStep <= 3
              ? 'sm:grid sm:grid-cols-3 sm:overflow-visible'
              : daysPerStep === 5
              ? 'md:grid md:grid-cols-5 md:overflow-visible'
              : 'lg:grid lg:grid-cols-7 lg:overflow-visible'
          }`}>
            {activeDaysList.map((dayObj) => {
              const dayEvents = filteredEventsByDay.get(dayObj.id) || [];
              const isEnlarged = daysPerStep <= 3;
              const isMedium = daysPerStep === 5;

              return (
                <div
                  key={dayObj.id}
                  className={`${
                    isEnlarged
                      ? 'min-w-[270px] sm:min-w-0 sm:w-full p-3 space-y-2'
                      : isMedium
                      ? 'min-w-[190px] md:min-w-0 md:w-full p-2 space-y-1.5'
                      : 'min-w-[155px] lg:min-w-0 lg:w-full p-1.5 space-y-1.5'
                  } flex-1 shrink-0 ${
                    isEnlarged ? 'sm:shrink' : isMedium ? 'md:shrink' : 'lg:shrink'
                  } bg-slate-50/90 rounded-2xl border border-slate-200/80 flex flex-col shadow-2xs min-h-[380px] transition-all`}
                >
                  {/* Day Column Header */}
                  <div className={`bg-slate-900 text-white rounded-xl ${isEnlarged ? 'py-2 px-3' : 'py-1.5 px-2'} text-center shrink-0 space-y-0.5 shadow-2xs`}>
                    <div className={`text-amber-400 font-black uppercase tracking-wider leading-none ${isEnlarged ? 'text-sm' : 'text-xs'}`}>
                      {dayObj.weekdayShort} {dayObj.dateNum}
                    </div>
                    <div className={`text-slate-300 font-bold leading-none ${isEnlarged ? 'text-xs' : 'text-[10px]'}`}>
                      {dayObj.month}
                    </div>
                    <span className={`inline-block mt-0.5 bg-slate-800 text-sky-300 font-extrabold px-2 py-0.5 rounded-full ${isEnlarged ? 'text-[10px]' : 'text-[9px]'}`}>
                      {dayEvents.length} {dayEvents.length === 1 ? 'evento' : 'eventi'}
                    </span>
                  </div>

                  {/* Day Events List */}
                  <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[520px] pr-0.5 scrollbar-thin">
                    {dayEvents.length === 0 ? (
                      <div className="h-32 flex items-center justify-center border border-dashed border-slate-200/90 rounded-xl p-2 text-center">
                        <span className={`text-slate-400 font-bold ${isEnlarged ? 'text-xs' : 'text-[10px]'}`}>
                          Nessun evento
                        </span>
                      </div>
                    ) : (
                      dayEvents.map(({ activity, slot }, idx) => {
                        const categoryObj = CATEGORIES.find(c => c.id === activity.categoryId);

                        return (
                          <div
                            key={`${activity.id}_${slot.id}_${idx}`}
                            onClick={() => onSelectActivity(activity)}
                            title={activity.title}
                            className={`bg-white rounded-xl border border-slate-200/80 hover:border-sky-500 shadow-2xs hover:shadow-xs transition-all cursor-pointer group border-l-3 ${
                              isEnlarged ? 'p-2.5 space-y-1.5' : 'p-2 space-y-1'
                            }`}
                            style={{ borderLeftColor: categoryObj?.color || '#0284c7' }}
                          >
                            {/* Header row: Time & Price */}
                            <div className={`flex items-center justify-between gap-1 ${isEnlarged ? 'text-xs' : 'text-[9.5px]'}`}>
                              <span className="font-extrabold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-sky-100">
                                <Clock className={`${isEnlarged ? 'w-3 h-3' : 'w-2.5 h-2.5'} text-sky-600`} />
                                {slot.time}
                              </span>
                              <span className="font-black text-slate-900 shrink-0">
                                {activity.price === 0 ? 'Gratis' : `€${activity.price}`}
                              </span>
                            </div>

                            {/* Title with Category Symbol */}
                            <h4
                              className={`font-black text-slate-900 group-hover:text-sky-600 leading-snug flex items-start gap-1.5 ${
                                isEnlarged
                                  ? 'text-xs line-clamp-2'
                                  : 'text-[11px] line-clamp-2'
                              }`}
                              title={activity.title}
                            >
                              <span className={`${isEnlarged ? 'text-sm' : 'text-xs'} shrink-0 mt-0.5`} title={categoryObj?.name}>
                                {getCategorySymbol(activity.categoryId)}
                              </span>
                              <span className="line-clamp-2">{activity.title}</span>
                            </h4>

                            {/* Zone */}
                            <p className={`text-slate-500 font-medium truncate ${isEnlarged ? 'text-[10.5px]' : 'text-[9.5px]'}`}>
                              📍 {activity.zone}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 🌟 MODE 2: VISTA GRIGLIA MESE PER MESE (NAVIGAZIONE PER MESE & DROPDOWN A TENDINA) */}
      {layoutMode === 'grid' && totalMatchingEvents > 0 && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
          
          {/* MONTH NAVIGATION HEADER BAR */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 text-white p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newIdx = Math.max(0, selectedMonthIndex - 1);
                  setSelectedMonthIndex(newIdx);
                  const monthId = MONTH_OPTIONS[newIdx].id;
                  const firstDayIdx = ALL_DAYS.findIndex(d => d.month === monthId);
                  if (firstDayIdx !== -1) setStartDayIndex(firstDayIdx);
                }}
                disabled={selectedMonthIndex === 0}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shrink-0"
                title="Mese precedente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dropdown Menu per la Selezione Rapida del Mese */}
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 shadow-inner">
                <span className="text-sm shrink-0">🗓️</span>
                <select
                  value={selectedMonthIndex}
                  onChange={(e) => {
                    const newIdx = Number(e.target.value);
                    setSelectedMonthIndex(newIdx);
                    const monthId = MONTH_OPTIONS[newIdx].id;
                    const firstDayIdx = ALL_DAYS.findIndex(d => d.month === monthId);
                    if (firstDayIdx !== -1) setStartDayIndex(firstDayIdx);
                  }}
                  className="bg-transparent text-white font-black text-sm cursor-pointer focus:outline-none focus:ring-0 [&>option]:bg-slate-900 [&>option]:text-white font-sans"
                  title="Seleziona un mese dal menu a tendina"
                >
                  {MONTH_OPTIONS.map((m, idx) => (
                    <option key={m.id} value={idx}>
                      {m.name.split(' ')[0]}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  const newIdx = Math.min(MONTH_OPTIONS.length - 1, selectedMonthIndex + 1);
                  setSelectedMonthIndex(newIdx);
                  const monthId = MONTH_OPTIONS[newIdx].id;
                  const firstDayIdx = ALL_DAYS.findIndex(d => d.month === monthId);
                  if (firstDayIdx !== -1) setStartDayIndex(firstDayIdx);
                }}
                disabled={selectedMonthIndex === MONTH_OPTIONS.length - 1}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shrink-0"
                title="Mese successivo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-sky-600" />
              <span>Clicca su un giorno per aprire o chiudere il menu a tendina con le attività</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sky-700 font-black bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                {gridMonthDays.length} date in questo mese
              </span>
              <button
                onClick={() => {
                  const allOpen = gridMonthDays.every(d => expandedGridDays[d.id]);
                  const newState = { ...expandedGridDays };
                  gridMonthDays.forEach(d => { newState[d.id] = !allOpen; });
                  setExpandedGridDays(newState);
                }}
                className="text-[11px] font-extrabold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                {gridMonthDays.every(d => expandedGridDays[d.id]) ? 'Comprimi mese' : 'Espandi mese'}
              </button>
            </div>
          </div>

          {/* GRID OF DAYS FOR THE SELECTED MONTH ONLY */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-start">
            {gridMonthDays.map((dayObj) => {
              const dayEvents = filteredEventsByDay.get(dayObj.id) || [];
              const isExpanded = !!expandedGridDays[dayObj.id];

              return (
                <div key={dayObj.id} className="bg-slate-50/90 rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all hover:border-slate-300">
                  
                  {/* Clickable Day Header Dropdown Toggle */}
                  <button
                    onClick={() => toggleGridDay(dayObj.id)}
                    className={`w-full p-3.5 flex items-center justify-between transition-all cursor-pointer text-left ${
                      isExpanded 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white hover:bg-slate-100/80 text-slate-900 border-b border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 font-black shadow-2xs ${
                        isExpanded ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-sky-900'
                      }`}>
                        <span className="text-[9px] uppercase leading-none font-extrabold">{dayObj.weekdayShort}</span>
                        <span className="text-sm leading-none">{dayObj.dateNum}</span>
                      </div>
                      <div>
                        <div className="text-xs font-black">{dayObj.label}</div>
                        <div className={`text-[10px] font-extrabold mt-0.5 ${
                          isExpanded ? 'text-sky-300' : 'text-slate-500'
                        }`}>
                          {dayEvents.length} {dayEvents.length === 1 ? 'attività' : 'attività'}
                        </div>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isExpanded ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded Vertical Activities List Dropdown Menu */}
                  {isExpanded && (
                    <div className="p-3 space-y-2.5 bg-slate-50 border-t border-slate-200/60 animate-in fade-in duration-150">
                      {dayEvents.length === 0 ? (
                        <div className="py-5 text-center border-2 border-dashed border-slate-200 rounded-xl p-3 bg-white/50">
                          <span className="text-xs text-slate-400 font-bold">Nessuna attività in questa data</span>
                        </div>
                      ) : (
                        dayEvents.map(({ activity, slot }, idx) => {
                          const categoryObj = CATEGORIES.find(c => c.id === activity.categoryId);

                          return (
                            <div
                              key={`${activity.id}_${slot.id}_${idx}`}
                              onClick={() => onSelectActivity(activity)}
                              className="bg-white p-3 rounded-xl border border-slate-200/90 hover:border-sky-500 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-black text-slate-900 bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md flex items-center gap-1 border border-sky-100">
                                  <Clock className="w-3 h-3 text-sky-600" />
                                  {slot.time}
                                </span>
                                {categoryObj && (
                                  <span 
                                    className="font-extrabold text-white px-2 py-0.5 rounded-md text-[9px] shadow-2xs"
                                    style={{ backgroundColor: categoryObj.color }}
                                  >
                                    {categoryObj.name}
                                  </span>
                                )}
                              </div>

                              <h4 className="text-xs font-black text-slate-900 group-hover:text-sky-600 truncate leading-snug flex items-center gap-1.5" title={activity.title}>
                                <span className="text-sm shrink-0" title={categoryObj?.name}>{getCategorySymbol(activity.categoryId)}</span>
                                <span className="truncate">{activity.title}</span>
                              </h4>

                              <p className="text-[10px] text-slate-500 line-clamp-1">
                                {activity.venueName}
                              </p>

                              <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-100">
                                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                                  📍 {activity.zone}
                                </span>
                                <span className="font-black text-slate-900">
                                  {activity.price === 0 ? 'Gratis' : `€${activity.price}`}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
