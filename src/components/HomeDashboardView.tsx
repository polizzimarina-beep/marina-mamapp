import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  MapPin, 
  Clock, 
  Users,
  Palette, 
  Trees,
  Waves, 
  Home as HomeIcon,
  Calendar,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import { Activity } from '../types';
import { ParksFilterModal } from './ParksFilterModal';

interface HomeDashboardViewProps {
  activities: Activity[];
  favorites: string[];
  onToggleFavorite: (activityId: string, e: React.MouseEvent) => void;
  onSelectActivity: (activity: Activity) => void;
  onBookActivity?: (activity: Activity) => void;
  selectedDay: string;
  onSelectDay: (day: string) => void;
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
  selectedServices?: string[];
  onToggleService?: (srv: string) => void;
  onOpenAllFilters?: () => void;
  onViewAllToday?: () => void;
  onViewAllWeekend?: () => void;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedParkIds?: string[];
  onSelectParks?: (parkIds: string[]) => void;
  onNavigateToParks?: () => void;
  onNavigateToCategory?: (categoryId: string) => void;
  onOpenMap?: () => void;
}

// Colori ufficiali del Brand Mamapp
const COLOR_RASPBERRY = 'var(--color-brand-600)';
const COLOR_RASPBERRY_HOVER = 'var(--color-brand-700)';
const COLOR_RASPBERRY_BG_TINT = '#FDF2F6';
const COLOR_RASPBERRY_BORDER = 'var(--color-brand-200)';

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  activities = [],
  favorites = [],
  onToggleFavorite,
  onSelectActivity,
  onBookActivity,
  searchQuery = '',
  selectedParkIds: externalParkIds,
  onSelectParks: externalSelectParks,
  onNavigateToParks,
  onNavigateToCategory
}) => {
  // Modal states
  const [isParksModalOpen, setIsParksModalOpen] = useState(false);
  const [localParkIds, setLocalParkIds] = useState<string[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeParkIds = externalParkIds ?? localParkIds;

  const handleApplyParks = (ids: string[]) => {
    if (externalSelectParks) {
      externalSelectParks(ids);
    } else {
      setLocalParkIds(ids);
    }
  };

  // =========================================================================
  // 3. RIGA DELLE CATEGORIE ORIZZONTALI (Icone circolari con sfondi pastello)
  // - "Creativi" (sfondo rosa chiaro)
  // - "Parchi" (sfondo verde menta chiaro)
  // - "Sport" (sfondo azzurro cielo)
  // - "Spazi" (sfondo arancione/pesca chiaro)
  // - "Eventi" (sfondo rosa)
  // - "Altro" (sfondo neutro)
  // =========================================================================
  const CATEGORIES = [
    {
      id: 'creativi',
      label: 'Creativi',
      icon: Palette,
      bg: 'bg-[var(--color-brand-50)]',
      border: 'border-[var(--color-brand-200)]',
      text: 'text-[var(--color-brand-600)]',
      activeRing: 'ring-[var(--color-brand-600)]'
    },
    {
      id: 'parchi',
      label: 'Parchi',
      icon: Trees,
      bg: 'bg-[#ECFDF5]',
      border: 'border-[#A7F3D0]',
      text: 'text-[#059669]',
      activeRing: 'ring-[#059669]'
    },
    {
      id: 'sport',
      label: 'Sport',
      icon: Waves,
      bg: 'bg-[var(--color-petrolio-50)]',
      border: 'border-[var(--color-petrolio-200)]',
      text: 'text-[var(--color-petrolio-600)]',
      activeRing: 'ring-[var(--color-petrolio-600)]'
    },
    {
      id: 'spazi',
      label: 'Spazi',
      icon: HomeIcon,
      bg: 'bg-[#FFF7ED]',
      border: 'border-[#FED7AA]',
      text: 'text-[#EA580C]',
      activeRing: 'ring-[#EA580C]'
    },
    {
      id: 'eventi',
      label: 'Eventi',
      icon: Calendar,
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#FECACA]',
      text: 'text-[#DC2626]',
      activeRing: 'ring-[#DC2626]'
    },
    {
      id: 'altro',
      label: 'Altro',
      icon: MoreHorizontal,
      bg: 'bg-[#F8FAFC]',
      border: 'border-[#E2E8F0]',
      text: 'text-[#64748B]',
      activeRing: 'ring-[#64748B]'
    }
  ];

  // =========================================================================
  // 4. CAROSELLO BANNER PRINCIPALE
  // REQUISITO FOTOGRAFICO: Esclusivamente bambini felici impegnati in attività
  // ASSOLUTAMENTE NESSUN ADULTO.
  // Pulsanti CTA e badge: Esclusivamente magenta / rosa-lampone elegante e profondo.
  // =========================================================================
  const HERO_SLIDES = [
    {
      id: 'slide-creativi',
      title: 'Laboratorio Creativo e Pittura',
      subtitle: 'Sconto 30% per le iscrizioni di oggi a Palermo',
      ctaText: 'Prenota Ora',
      badge: 'In Evidenza Oggi',
      // Foto di bambina felice che dipinge con pennelli e colori (solo bambini, zero adulti)
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1000&auto=format&fit=crop&q=80',
      action: () => {
        const act = activities.find(a => a.id === 'act-artisti') || activities[0];
        if (act && onBookActivity) onBookActivity(act);
        else if (act) onSelectActivity(act);
      }
    },
    {
      id: 'slide-parchi',
      title: 'Esploratori al Parco della Favorita',
      subtitle: 'Caccia al tesoro nella natura e giochi all\'aria aperta',
      ctaText: 'Scopri i Parchi',
      badge: 'Parchi & Natura',
      // Foto di bambini felici che corrono e giocano sul prato verde (solo bambini, zero adulti)
      image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=1000&auto=format&fit=crop&q=80',
      action: () => {
        if (onNavigateToParks) onNavigateToParks();
        else setIsParksModalOpen(true);
      }
    },
    {
      id: 'slide-nuoto',
      title: 'Acquaticità & Giochi d\'Acqua',
      subtitle: 'Lezioni baby in piscina riscaldata in totale sicurezza',
      ctaText: 'Prenota Ora',
      badge: 'Nuoto Baby',
      // Foto di bimbo felice con braccioli che sorride in acqua (solo bambini, zero adulti)
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1000&auto=format&fit=crop&q=80',
      action: () => {
        const act = activities.find(a => a.id === 'act-acquaticita') || activities[1];
        if (act && onBookActivity) onBookActivity(act);
        else if (act) onSelectActivity(act);
      }
    },
    {
      id: 'slide-sport',
      title: 'Piccoli Calciatori & Sport di Squadra',
      subtitle: 'Divertimento, coordinazione e nuove amicizie su prato sintetico',
      ctaText: 'Iscrivi Subito',
      badge: 'Sport di Squadra',
      // Foto di bambino sorridente con pallone sul campo da gioco (solo bambini, zero adulti)
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1000&auto=format&fit=crop&q=80',
      action: () => {
        const act = activities.find(a => a.id === 'act-mini-calcio') || activities[2];
        if (act && onBookActivity) onBookActivity(act);
        else if (act) onSelectActivity(act);
      }
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Autoplay carosello (5 secondi)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  // =========================================================================
  // 5. ATTIVITÀ IN EVIDENZA OGGI
  // Card bianche pulite con bordi sottili, foto di bambini felici (zero adulti),
  // dettagli con icone lineari (orario, posizione, età) e prezzi in evidenza.
  // =========================================================================
  const featuredActivitiesList = useMemo(() => [
    {
      id: 'act-artisti',
      title: 'Piccoli Artisti a Mondello',
      categoryName: 'Laboratori Creativi',
      categoryId: 'creativi',
      venueName: 'Mondello Lido',
      distance: '1,2 km',
      // Foto: Bambina felice con colori e pennelli (solo bambini)
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      ageMin: 3,
      ageMax: 6,
      timeRange: '16:30 - 17:30',
      price: 12,
      priceUnit: 'bambino',
      badgeType: 'creativi',
      description: 'Pittura con le dita, argilla e creazione di sagome per stimolare fantasia e manualità.'
    },
    {
      id: 'act-acquaticita',
      title: 'Acquaticità & Nuoto Baby',
      categoryName: 'Nuoto Baby',
      categoryId: 'sport',
      venueName: 'Palermo Centro',
      distance: '2,4 km',
      // Foto: Bimbo sorridente che gioca nell\'acqua azzurra (solo bambini)
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80',
      ageMin: 4,
      ageMax: 8,
      timeRange: '17:00 - 18:00',
      price: 15,
      priceUnit: 'bambino',
      badgeType: 'sport',
      description: 'Giochi di galleggiamento e acquaticità guidati da istruttori federali per la massima sicurezza.'
    },
    {
      id: 'act-mini-calcio',
      title: 'Mini Calcio Uditore',
      categoryName: 'Sport di Squadra',
      categoryId: 'sport',
      venueName: 'Parco Uditore',
      distance: '3,1 km',
      // Foto: Bimbo sorridente con il pallone da calcio su prato (solo bambini)
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
      ageMin: 5,
      ageMax: 10,
      timeRange: '17:30 - 18:30',
      price: 10,
      priceUnit: 'bambino',
      badgeType: 'sport',
      description: 'Giochi con la palla, birilli e minipartita su prato sintetico di ultima generazione.'
    },
    {
      id: 'act-botanica-parco',
      title: 'Botanica per Piccoli Pollici Verdi',
      categoryName: 'Parchi & Natura',
      categoryId: 'parchi',
      venueName: 'Giardino Inglese',
      distance: '1,8 km',
      // Foto: Bambini sorridenti che piantano semi nel parco (solo bambini)
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
      ageMin: 4,
      ageMax: 9,
      timeRange: '16:30 - 17:45',
      price: 16,
      priceUnit: 'bambino',
      badgeType: 'parchi',
      description: 'Trapianto di piantine aromatiche e scoperta delle specie botaniche del parco.'
    },
    {
      id: 'act-musica-ritmo',
      title: 'Musica & Ritmo Baby',
      categoryName: 'Eventi & Musica',
      categoryId: 'eventi',
      venueName: 'Politeama Centro',
      distance: '2,1 km',
      // Foto: Bimbi allegri alle prese con xilofoni e strumenti musicali (solo bambini)
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      ageMin: 2,
      ageMax: 5,
      timeRange: '17:00 - 18:00',
      price: 15,
      priceUnit: 'bambino',
      badgeType: 'eventi',
      description: 'Tamburelli, xilofoni e canto corale per avvicinare i piccolissimi alla musica.'
    }
  ], []);

  // Badge styles per categoria
  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case 'creativi':
        return {
          pill: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-200)]',
          icon: Palette
        };
      case 'parchi':
        return {
          pill: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
          icon: Trees
        };
      case 'sport':
        return {
          pill: 'bg-[var(--color-petrolio-50)] text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-200)]',
          icon: Waves
        };
      case 'spazi':
        return {
          pill: 'bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]',
          icon: HomeIcon
        };
      case 'eventi':
        return {
          pill: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
          icon: Calendar
        };
      default:
        return {
          pill: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-200)]',
          icon: Sparkles
        };
    }
  };

  // Filtra attività in base a ricerca o categoria selezionata
  const displayedActivities = useMemo(() => {
    let list = featuredActivitiesList;
    if (selectedCatId !== 'all') {
      list = list.filter(a => a.categoryId === selectedCatId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.venueName.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [featuredActivitiesList, searchQuery, selectedCatId]);

  return (
    <div className="bg-white min-h-full px-4 sm:px-6 max-w-4xl mx-auto w-full font-sans select-none space-y-4 pt-1 pb-28">
      
      {/* ========================================================================= */}
      {/* 3. RIGA DELLE CATEGORIE ORIZZONTALI (Subito sotto la ricerca)             */}
      {/* Icone circolari con sfondi pastello tenui ed etichette:                   */}
      {/* Creativi (rosa), Parchi (verde menta), Sport (azzurro), Spazi (arancione),*/}
      {/* Eventi (rosa), Altro (neutro).                                            */}
      {/* (NOTA: Nessun pulsante "Oggi / Domani" in questa sezione, si collega      */}
      {/*  direttamente al carosello banner).                                       */}
      {/* ========================================================================= */}
      <section className="pt-1 pb-0.5">
        <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCatId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id === 'parchi') {
                    if (onNavigateToParks) onNavigateToParks();
                    else if (onNavigateToCategory) onNavigateToCategory('parchi');
                    return;
                  }
                  const newCat = selectedCatId === cat.id ? 'all' : cat.id;
                  setSelectedCatId(newCat);
                  if (onNavigateToCategory && newCat !== 'all') {
                    onNavigateToCategory(cat.id);
                  }
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group active:scale-95 transition-transform"
              >
                {/* Cerchio icona con sfondo pastello tenue e bordo sottile */}
                <div 
                  className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border transition-all ${cat.bg} ${cat.border} ${
                    isSelected 
                      ? `ring-2 ${cat.activeRing} ring-offset-2 scale-105 shadow-xs` 
                      : 'hover:scale-105 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${cat.text} stroke-[2]`} />
                </div>

                {/* Etichetta di testo pulita */}
                <span className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors ${
                  isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CAROSELLO BANNER PRINCIPALE (Subito sotto le categorie)                 */}
      {/* - Frecce laterali trasparenti minimali                                    */}
      {/* - Indicatori a pallini di navigazione in basso                             */}
      {/* - Esclusivamente bambini felici (zero adulti)                             */}
      {/* - CTA e badge in magenta / rosa-lampone elegante e profondo (var(--color-brand-600))     */}
      {/* ========================================================================= */}
      <section className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 min-h-[200px] sm:min-h-[225px] flex flex-col justify-between p-5 sm:p-6 text-white select-none bg-slate-900">
          
          {/* Foto e overlay brillante per ciascuna slide */}
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlideIndex === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradiente sfumato morbido per massima leggibilità del testo */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent w-full sm:w-[85%]" />
            </div>
          ))}

          {/* Frecce laterali trasparenti iOS Premium */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Slide precedente"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 active:scale-90 backdrop-blur-md flex items-center justify-center text-white border border-white/35 transition-all cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Slide successiva"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 active:scale-90 backdrop-blur-md flex items-center justify-center text-white border border-white/35 transition-all cursor-pointer shadow-xs"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Badge categoria in alto a destra nel colore del brand magenta-lampone */}
          <div className="flex justify-end relative z-10 pr-6 sm:pr-8">
            <span 
              style={{ backgroundColor: COLOR_RASPBERRY }}
              className="text-white rounded-full px-3 py-0.5 text-[11px] font-bold shadow-xs backdrop-blur-xs"
            >
              {HERO_SLIDES[currentSlideIndex].badge}
            </span>
          </div>

          {/* Contenuto testuale della slide con CTA in magenta vivace */}
          <div className="relative z-10 pl-5 sm:pl-7 pr-8 space-y-1.5 pt-1 pb-2">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-xs max-w-sm">
              {HERO_SLIDES[currentSlideIndex].title}
            </h2>
            
            <p className="text-xs sm:text-sm text-white/95 font-medium leading-snug drop-shadow-xs max-w-xs">
              {HERO_SLIDES[currentSlideIndex].subtitle}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={HERO_SLIDES[currentSlideIndex].action}
                style={{ backgroundColor: COLOR_RASPBERRY }}
                className="hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{HERO_SLIDES[currentSlideIndex].ctaText}</span>
              </button>
            </div>
          </div>

          {/* Indicatori a pallini di navigazione in basso al centro */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  backgroundColor: currentSlideIndex === idx ? COLOR_RASPBERRY : 'rgba(255, 255, 255, 0.6)'
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlideIndex === idx ? 'w-5 h-1.5 shadow-xs' : 'w-1.5 h-1.5 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SEZIONE: "Attività in evidenza oggi"                                    */}
      {/* Card bianche pulite con bordi sottili, foto di bambini felici,            */}
      {/* dettagli con icone lineari (orario, posizione, età) e prezzi in evidenza. */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 pt-1">
        
        {/* Titolo di sezione */}
        <div className="flex items-baseline justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Attività in evidenza oggi
          </h3>

          {selectedCatId !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedCatId('all')}
              style={{ color: COLOR_RASPBERRY }}
              className="text-xs font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Mostra tutte ({featuredActivitiesList.length})</span>
            </button>
          )}
        </div>

        {/* Le Card delle Attività in Evidenza */}
        <div className="space-y-3">
          {displayedActivities.map((act) => {
            const isFav = favorites.includes(act.id);
            const badge = getBadgeStyle(act.badgeType);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity(act as unknown as Activity)}
                className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex gap-3.5 items-center relative group"
              >
                {/* Immagine quadrata con soli bambini felici */}
                <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 relative">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Dettagli dell'attività */}
                <div className="flex-1 min-w-0 pr-10 sm:pr-12">
                  
                  {/* Badge categoria pastello tenue */}
                  <div className="mb-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${badge.pill}`}>
                      <BadgeIcon className="w-3 h-3 stroke-[2.2]" />
                      <span>{act.categoryName}</span>
                    </span>
                  </div>

                  {/* Titolo attività */}
                  <h4 
                    style={{ color: '#0F172A' }}
                    className="font-extrabold text-sm sm:text-base group-hover:text-[var(--color-brand-600)] transition-colors leading-snug truncate"
                  >
                    {act.title}
                  </h4>

                  {/* Dettagli lineari: Orario & Fascia d'età */}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    
                    {/* Orario */}
                    {act.timeRange && (
                      <div 
                        style={{ 
                          backgroundColor: COLOR_RASPBERRY_BG_TINT,
                          color: COLOR_RASPBERRY 
                        }}
                        className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md"
                      >
                        <Clock className="w-3 h-3" />
                        <span>{act.timeRange}</span>
                      </div>
                    )}

                    {/* Fascia età */}
                    <div 
                      style={{ 
                        backgroundColor: COLOR_RASPBERRY_BG_TINT,
                        color: COLOR_RASPBERRY 
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md"
                    >
                      <Users className="w-3 h-3" />
                      <span>{act.ageMin}–{act.ageMax} anni</span>
                    </div>

                  </div>

                  {/* Luogo con distanza e icona lineare */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{act.venueName} • {act.distance}</span>
                  </div>

                </div>

                {/* Prezzo in evidenza a destra */}
                <div className="absolute right-3.5 bottom-3.5 text-right">
                  <div className="text-base sm:text-lg font-black text-slate-900 leading-none">
                    €{act.price}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    a {act.priceUnit || 'bambino'}
                  </div>
                </div>

                {/* Cuore preferiti in alto a destra */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(act.id, e);
                  }}
                  className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-[var(--color-brand-600)] transition-colors cursor-pointer"
                  title="Preferiti"
                  aria-label="Preferiti"
                >
                  <Heart
                    style={isFav ? { fill: COLOR_RASPBERRY, color: COLOR_RASPBERRY } : undefined}
                    className="w-5 h-5 transition-colors stroke-current"
                    strokeWidth={1.8}
                  />
                </button>

              </div>
            );
          })}
        </div>

      </section>

      {/* Modal filtri parchi */}
      <ParksFilterModal
        isOpen={isParksModalOpen}
        onClose={() => setIsParksModalOpen(false)}
        selectedParkIds={activeParkIds}
        onApplyParks={handleApplyParks}
      />

    </div>
  );
};
