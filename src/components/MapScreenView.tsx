import React, { useState, useMemo, useRef, useCallback } from 'react';
import { 
  Heart, 
  Search, 
  Navigation, 
  Calendar, 
  Baby, 
  Car, 
  SlidersHorizontal, 
  Plus, 
  Minus, 
  ChevronDown, 
  X, 
  MapPin, 
  Clock, 
  ArrowRight,
  Palette,
  Trees,
  Waves,
  Home as HomeIcon,
  Sparkles,
  MoreHorizontal,
  User
} from 'lucide-react';
import { Activity } from '../types';
import { MamappLogo } from './MamappLogo';

interface MapScreenViewProps {
  activities?: Activity[];
  favorites?: string[];
  onToggleFavorite?: (activityId: string, e?: React.MouseEvent) => void;
  onSelectActivity?: (activity: Activity) => void;
  onBookActivity?: (activity: Activity) => void;
  selectedDay?: string;
  onSelectDay?: (day: string) => void;
  selectedDistance?: number;
  onSelectDistance?: (km: number) => void;
  selectedCategories?: string[];
  onToggleCategory?: (catId: string) => void;
  onSwitchToList?: () => void;
  onOpenFilters?: () => void;
  onChangeTab?: (tab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets') => void;
  onOpenManageFamily?: () => void;
  isActive?: boolean;
  className?: string;
}

// Coordinate virtuali dello spazio mappa vettoriale di Palermo (viewport 0 0 1000 850)
interface VectorMapItem {
  id: string;
  title: string;
  categoryName: string;
  categoryId: 'creativi' | 'parchi' | 'sport' | 'spazi' | 'eventi' | 'altro';
  venueName: string;
  price: number;
  priceUnit?: string;
  ageMin: number;
  ageMax: number;
  timeRange: string;
  image: string;
  x: number; // coordinate nel viewBox SVG (0-1000)
  y: number; // coordinate nel viewBox SVG (0-850)
  description: string;
}

// Colore di Brand Ufficiale Magenta / Rosa-Lampone Profondo (var(--color-brand-600))
const COLOR_RASPBERRY = 'var(--color-brand-600)';
const COLOR_RASPBERRY_HOVER = 'var(--color-brand-700)';
const COLOR_RASPBERRY_ACTIVE = 'var(--color-brand-700)';
const COLOR_RASPBERRY_BG_TINT = '#FDF2F6';
const COLOR_RASPBERRY_BORDER = 'var(--color-brand-200)';

export const MapScreenView: React.FC<MapScreenViewProps> = ({
  favorites = [],
  onToggleFavorite,
  onSelectActivity,
  onOpenFilters,
  className = ''
}) => {
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('3-6');
  const [selectedDistanceFilter, setSelectedDistanceFilter] = useState<string>('15min');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('oggi');
  const [isDistanceDropdownOpen, setIsDistanceDropdownOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VectorMapItem | null>(null);

  // Pan & Zoom state per la mappa vettoriale interattiva
  const [viewTransform, setViewTransform] = useState({
    x: 0,
    y: 0,
    scale: 1
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const mapSvgContainerRef = useRef<HTMLDivElement>(null);

  // Le 6 Categorie con icone circolari (come nella Home)
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

  // 14 Attività a Palermo con coordinate vettoriali posizionate accuratamente
  const mapItems: VectorMapItem[] = useMemo(() => [
    {
      id: 'map-mondello-sup',
      title: 'Mini Surf & Sup al Mare',
      categoryName: 'Sport Acquatici',
      categoryId: 'sport',
      venueName: 'Mondello',
      price: 22,
      priceUnit: 'bambino',
      ageMin: 5,
      ageMax: 10,
      timeRange: '15:30 - 17:00',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
      x: 340,
      y: 110,
      description: 'Prime pagaiate in totale sicurezza nella splendida baia di Mondello con istruttori federali.'
    },
    {
      id: 'map-mondello-castelli',
      title: 'Sculture di Sabbia e Giochi',
      categoryName: 'Attività all\'Aperto',
      categoryId: 'eventi',
      venueName: 'Mondello Lido',
      price: 25,
      priceUnit: 'bambino',
      ageMin: 4,
      ageMax: 10,
      timeRange: '17:00 - 18:30',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      x: 430,
      y: 130,
      description: 'Gara a squadre di castelli di sabbia e mini olimpiadi sulla spiaggia dorata.'
    },
    {
      id: 'map-san-lorenzo-art',
      title: 'Piccoli Artisti Mondello',
      categoryName: 'Laboratori Creativi',
      categoryId: 'creativi',
      venueName: 'San Lorenzo / Resuttana',
      price: 12,
      priceUnit: 'bambino',
      ageMin: 3,
      ageMax: 6,
      timeRange: '16:30 - 17:30',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      x: 375,
      y: 290,
      description: 'Pittura con le dita, argilla e creazione di sagome per stimolare fantasia e manualità.'
    },
    {
      id: 'map-favorita-esploratori',
      title: 'Esploratori al Parco',
      categoryName: 'Parchi & Natura',
      categoryId: 'parchi',
      venueName: 'Parco della Favorita',
      price: 8,
      priceUnit: 'bambino',
      ageMin: 4,
      ageMax: 9,
      timeRange: '17:00 - 18:30',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80',
      x: 520,
      y: 270,
      description: 'Caccia al tesoro botanica e giochi all\'aria aperta immersi nella natura della Favorita.'
    },
    {
      id: 'map-arenella-nuoto',
      title: 'Acquaticità Baby Marina',
      categoryName: 'Nuoto Baby',
      categoryId: 'sport',
      venueName: 'Arenella / Costa',
      price: 12,
      priceUnit: 'bambino',
      ageMin: 2,
      ageMax: 5,
      timeRange: '16:00 - 17:00',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80',
      x: 720,
      y: 330,
      description: 'Corso di ambientamento in acqua e giochi motori guidati da istruttori specializzati.'
    },
    {
      id: 'map-notarbartolo-teatro',
      title: 'Teatro dei Burattini',
      categoryName: 'Teatro & Spettacoli',
      categoryId: 'eventi',
      venueName: 'Notarbartolo',
      price: 14,
      priceUnit: 'bambino',
      ageMin: 3,
      ageMax: 8,
      timeRange: '17:15 - 18:15',
      image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&auto=format&fit=crop&q=80',
      x: 480,
      y: 430,
      description: 'Fiaba recitata dal vivo con burattini artigianali siciliani e laboratorio finale.'
    },
    {
      id: 'map-uditore-calcio',
      title: 'Mini Calcio Uditore',
      categoryName: 'Sport di Squadra',
      categoryId: 'sport',
      venueName: 'Uditore',
      price: 10,
      priceUnit: 'bambino',
      ageMin: 5,
      ageMax: 10,
      timeRange: '17:30 - 18:30',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
      x: 330,
      y: 460,
      description: 'Giochi con la palla, birilli e minipartita su prato sintetico di ultima generazione.'
    },
    {
      id: 'map-giardino-inglese-natura',
      title: 'Botanica per Piccoli Pollici Verdi',
      categoryName: 'Parchi & Natura',
      categoryId: 'parchi',
      venueName: 'Giardino Inglese',
      price: 16,
      priceUnit: 'bambino',
      ageMin: 4,
      ageMax: 9,
      timeRange: '16:30 - 17:45',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
      x: 580,
      y: 450,
      description: 'Trapianto di piantine aromatiche e scoperta delle specie esotiche del parco.'
    },
    {
      id: 'map-liberta-yoga',
      title: 'Yoga Genitori & Bimbi',
      categoryName: 'Benessere & Relax',
      categoryId: 'altro',
      venueName: 'Viale della Libertà',
      price: 10,
      priceUnit: 'bambino',
      ageMin: 3,
      ageMax: 6,
      timeRange: '17:30 - 18:30',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
      x: 520,
      y: 520,
      description: 'Posizioni degli animali, respirazione a bolle e rilassamento dolce insieme.'
    },
    {
      id: 'map-politeama-musica',
      title: 'Musica & Ritmo Baby',
      categoryName: 'Propedeutica Musicale',
      categoryId: 'eventi',
      venueName: 'Politeama Centro',
      price: 15,
      priceUnit: 'bambino',
      ageMin: 2,
      ageMax: 5,
      timeRange: '17:00 - 18:00',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      x: 600,
      y: 540,
      description: 'Tamburelli, xilofoni e canto corale per avvicinare i piccolissimi alla musica.'
    },
    {
      id: 'map-porto-vela',
      title: 'Battesimo della Vela',
      categoryName: 'Sport Acquatici',
      categoryId: 'sport',
      venueName: 'La Cala / Porto',
      price: 15,
      priceUnit: 'bambino',
      ageMin: 6,
      ageMax: 12,
      timeRange: '16:45 - 18:15',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80',
      x: 740,
      y: 540,
      description: 'Piccoli marinai alla scoperta dei nodi, del vento e delle basi della barca a vela.'
    },
    {
      id: 'map-noce-ceramica',
      title: 'Laboratorio Argilla & Mani',
      categoryName: 'Laboratori Creativi',
      categoryId: 'creativi',
      venueName: 'Noce / Zisa',
      price: 18,
      priceUnit: 'bambino',
      ageMin: 4,
      ageMax: 8,
      timeRange: '17:30 - 18:45',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
      x: 430,
      y: 590,
      description: 'Modellazione al tornio baby e pittura ceramica da portare a casa.'
    },
    {
      id: 'map-villa-tasca-festa',
      title: 'Festa dei Nonni a Villa Tasca',
      categoryName: 'Parchi & Natura',
      categoryId: 'parchi',
      venueName: 'Villa Tasca',
      price: 12,
      priceUnit: 'bambino',
      ageMin: 3,
      ageMax: 10,
      timeRange: '16:00 - 19:00',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=80',
      x: 360,
      y: 710,
      description: 'Picnic, giochi d\'una volta e animazione per bimbi e nonni nel grande parco.'
    },
    {
      id: 'map-stazione-corso',
      title: 'Percorso Motricità & Gym',
      categoryName: 'Ginnastica & Movimento',
      categoryId: 'sport',
      venueName: 'Centro Storico / Oreto',
      price: 40,
      priceUnit: 'pacchetto 4 lezioni',
      ageMin: 3,
      ageMax: 7,
      timeRange: '16:00 - 17:30',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
      x: 620,
      y: 700,
      description: 'Tappeti elastici, spalliere e percorsi d\'equilibrio guidati da preparatori atletici.'
    }
  ], []);

  const activitiesCount = mapItems.length; // Esattamente 14 attività

  // Filtra attività in base a ricerca e categoria selezionata
  const displayedItems = useMemo(() => {
    let items = mapItems;
    if (selectedCategoryId !== 'all') {
      items = items.filter(item => item.categoryId === selectedCategoryId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.venueName.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q)
      );
    }
    return items;
  }, [mapItems, selectedCategoryId, searchQuery]);

  // Gestione Zoom e Pan della mappa
  const handleZoomIn = () => {
    setViewTransform(prev => ({
      ...prev,
      scale: Math.min(2.2, prev.scale + 0.25)
    }));
  };

  const handleZoomOut = () => {
    setViewTransform(prev => ({
      ...prev,
      scale: Math.max(0.75, prev.scale - 0.25)
    }));
  };

  const handleResetMap = () => {
    setViewTransform({ x: 0, y: 0, scale: 1 });
    setSelectedItem(null);
  };

  // Mouse / Touch drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.map-interactive-pin')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: viewTransform.x,
      startY: viewTransform.y
    };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setViewTransform(prev => ({
      ...prev,
      x: dragStartRef.current!.startX + dx,
      y: dragStartRef.current!.startY + dy
    }));
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Touch handlers per dispositivi mobili
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        startX: viewTransform.x,
        startY: viewTransform.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    setViewTransform(prev => ({
      ...prev,
      x: dragStartRef.current!.startX + dx,
      y: dragStartRef.current!.startY + dy
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Posizione della bolla speciale "14 attività" (centro nevralgico di Palermo)
  const clusterPosition = { x: 500, y: 375 };

  return (
    <div className={`w-full h-full flex flex-col bg-white text-slate-800 font-sans relative overflow-hidden select-none ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. INTESTAZIONE SUPERIORE                                                 */}
      {/* - Logo "Mamapp" in turchese/ciano brillante affiancato da un pin a cuore rosa*/}
      {/* - A destra: icona cuore (preferiti) e cerchio profilo utente "M"          */}
      {/* ========================================================================= */}
      <header className="bg-white px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-100 z-30 shrink-0">
        
        {/* Sinistra: Watercolor Pin con Famiglia + Scritta "Mamapp" con Gradiente Magenta-to-Lilac */}
        <div 
          onClick={() => {}}
          className="flex items-center cursor-pointer active:scale-98 transition-transform"
        >
          <MamappLogo size="md" layout="horizontal" />
        </div>

        {/* ========================================================================= */}
        {/* A DESTRA (IN LINEA): TRE ICONE MINIMALISTE DISPOSTE IN SEQUENZA ESATTA:   */}
        {/* 1. Icona della lente d'ingrandimento (ricerca)                            */}
        {/* 2. Icona dei filtri (impostazioni/imbuto)                                 */}
        {/* 3. Icona dell'omino/profilo account circolare (profilo utente)            */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* 1. Icona della lente d'ingrandimento (ricerca) */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('map-search-input');
              if (el) el.focus();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-[var(--color-brand-600)] hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
            title="Cerca nella mappa"
            aria-label="Cerca"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          {/* 2. Icona dei filtri (impostazioni/imbuto) */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFilters) onOpenFilters();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-[var(--color-brand-600)] hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
            title="Filtri mappa"
            aria-label="Filtri mappa"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </button>

          {/* 3. Icona dell'omino/profilo account circolare (profilo utente) */}
          <div 
            style={{ 
              backgroundColor: COLOR_RASPBERRY_BG_TINT,
              borderColor: COLOR_RASPBERRY_BORDER,
              color: COLOR_RASPBERRY
            }}
            className="w-9 h-9 rounded-full border flex items-center justify-center shadow-2xs cursor-pointer hover:bg-[var(--color-brand-50)] transition-colors active:scale-95"
            title="Profilo Utente"
            aria-label="Profilo Utente"
          >
            <User className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>

        </div>

      </header>

      {/* ========================================================================= */}
      {/* 2. BARRA DI RICERCA                                                       */}
      {/* Sbarra bianca con bordi sottili e segnaposto:                             */}
      {/* "Cerca attività, zona o età a Palermo..."                                  */}
      {/* ========================================================================= */}
      <section className="bg-white px-4 pt-2.5 pb-2 border-b border-slate-100 z-30 shrink-0 space-y-2.5">
        
        {/* Barra di ricerca con lente d'ingrandimento e icona di localizzazione */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none stroke-[2.2]" />
          
          <input
            id="map-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca attività, zona o età a Palermo..."
            className="w-full bg-white border border-slate-200/90 rounded-2xl py-2 pl-9 pr-10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)]/15 focus:border-[var(--color-brand-600)] transition-all shadow-xs"
          />

          <button
            type="button"
            onClick={handleResetMap}
            className="absolute right-3 text-slate-600 hover:text-[var(--color-brand-600)] transition-colors cursor-pointer p-0.5"
            title="Centra su Palermo"
            aria-label="Centra Mappa"
          >
            <Navigation className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* ======================================================================= */}
        {/* 3. RIGA DELLE CATEGORIE ORIZZONTALI (Subito sotto la ricerca)           */}
        {/* Icone circolari con etichetta: Creativi, Parchi, Sport, Spazi, Eventi, Altro*/}
        {/* ======================================================================= */}
        <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(selectedCategoryId === cat.id ? 'all' : cat.id);
                }}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group active:scale-95 transition-transform"
              >
                {/* Cerchio icona con sfondo colorato */}
                <div 
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all ${cat.bg} ${cat.border} ${
                    isSelected 
                      ? `ring-2 ${cat.activeRing} ring-offset-2 scale-105 shadow-xs` 
                      : 'hover:scale-105 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${cat.text} stroke-[2]`} />
                </div>

                {/* Etichetta di testo sotto l'icona */}
                <span className={`text-[11px] font-semibold tracking-tight transition-colors ${
                  isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================================= */}
        {/* 4. FILTRI RAPIDI (Sotto le categorie: "Oggi", "3-6 anni +", "Entro 15 min")*/}
        {/* ======================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
          
          {/* 1. "Oggi" con icona calendario rosa-lampone */}
          <button
            type="button"
            onClick={() => setSelectedDateFilter(selectedDateFilter === 'oggi' ? 'all' : 'oggi')}
            style={
              selectedDateFilter === 'oggi'
                ? {
                    backgroundColor: COLOR_RASPBERRY_BG_TINT,
                    color: COLOR_RASPBERRY,
                    borderColor: COLOR_RASPBERRY_BORDER
                  }
                : undefined
            }
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              selectedDateFilter === 'oggi'
                ? 'border ring-1 ring-[var(--color-brand-600)]/20 font-bold'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Calendar 
              style={{ color: selectedDateFilter === 'oggi' ? COLOR_RASPBERRY : 'var(--color-brand-600)' }}
              className="w-3.5 h-3.5 stroke-[2.2]" 
            />
            <span>Oggi</span>
          </button>

          {/* 2. "3-6 anni +" con icona bimbo */}
          <button
            type="button"
            onClick={() => setSelectedAgeFilter(selectedAgeFilter === '3-6' ? 'all' : '3-6')}
            style={
              selectedAgeFilter === '3-6'
                ? {
                    backgroundColor: COLOR_RASPBERRY_BG_TINT,
                    color: COLOR_RASPBERRY,
                    borderColor: COLOR_RASPBERRY_BORDER
                  }
                : undefined
            }
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              selectedAgeFilter === '3-6'
                ? 'border ring-1 ring-[var(--color-brand-600)]/20 font-bold'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Baby 
              style={{ color: selectedAgeFilter === '3-6' ? COLOR_RASPBERRY : '#64748B' }}
              className="w-3.5 h-3.5" 
            />
            <span>3-6 anni +</span>
          </button>

          {/* 3. "Entro 15 min ⌵" con icona auto */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDistanceDropdownOpen(!isDistanceDropdownOpen)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            >
              <Car className="w-3.5 h-3.5 text-slate-600" />
              <span>{selectedDistanceFilter === '15min' ? 'Entro 15 min' : 'Tutta Palermo'}</span>
              <ChevronDown className="w-3 h-3 text-slate-500 stroke-[2]" />
            </button>

            {isDistanceDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-38 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 p-1.5 z-40 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDistanceFilter('15min');
                    setIsDistanceDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: COLOR_RASPBERRY_BG_TINT,
                    color: COLOR_RASPBERRY
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Entro 15 min
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDistanceFilter('all');
                    setIsDistanceDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Tutta Palermo
                </button>
              </div>
            )}
          </div>

          {/* 4. "Filtri" con icona di regolazione */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFilters) onOpenFilters();
            }}
            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 stroke-[2]" />
            <span>Filtri</span>
          </button>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. SFONDO DELLA MAPPA VETTORIALE (Stile Apple Maps minimalista)            */}
      {/* Pulita, con aree verdi e coste - ZERO API key, ZERO testi di errore       */}
      {/* ========================================================================= */}
      <div 
        ref={mapSvgContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full h-full relative overflow-hidden bg-[#F6F8FA] cursor-grab active:cursor-grabbing select-none"
      >
        
        {/* Contenitore Mappa Vettoriale Trasformabile */}
        <div 
          style={{
            transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.scale})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="w-full h-full flex items-center justify-center pointer-events-auto"
        >
          <svg
            viewBox="0 0 1000 850"
            className="w-full h-full min-w-[700px] min-h-[550px] object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Acqua Golfo di Palermo / Mare Tirreno */}
              <linearGradient id="seaWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EBF5FF" />
                <stop offset="70%" stopColor="#C9E6FD" />
                <stop offset="100%" stopColor="#8AC6F0" />
              </linearGradient>

              {/* Parco della Favorita */}
              <linearGradient id="parkFavoritaGrad" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#E5F8ED" />
                <stop offset="100%" stopColor="#C7F2D6" />
              </linearGradient>

              {/* Rilievi Monte Pellegrino */}
              <linearGradient id="mountPellegrinoGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#E6ECE7" />
                <stop offset="100%" stopColor="#D5DFD8" />
              </linearGradient>
            </defs>

            {/* Sfondo Suolo Urbano di Palermo */}
            <rect width="1000" height="850" fill="#F8FAFC" />

            {/* ===================================================================== */}
            {/* AREE NATURALI & RILIEVI (Monte Pellegrino & Parchi)                   */}
            {/* ===================================================================== */}
            
            {/* Sagoma Monte Pellegrino a nord-est */}
            <path
              d="M580 80 Q680 70 760 140 Q820 220 780 320 Q720 370 640 330 Q580 270 560 180 Z"
              fill="url(#mountPellegrinoGrad)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <text x="680" y="210" fill="#64748B" fontSize="12" fontWeight="700" letterSpacing="1" opacity="0.75">
              MONTE PELLEGRINO
            </text>

            {/* Parco della Favorita (Grande corridoio verde) */}
            <path
              d="M480 200 L560 210 L580 320 L530 380 L460 350 L450 240 Z"
              fill="url(#parkFavoritaGrad)"
              stroke="#86EFAC"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="475" y="300" fill="#15803D" fontSize="11" fontWeight="800" opacity="0.85">
              PARCO DELLA FAVORITA
            </text>

            {/* Villa Tasca (Sud-Ovest) */}
            <rect x="330" y="670" width="80" height="70" rx="16" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="340" y="710" fill="#166534" fontSize="10" fontWeight="700">VILLA TASCA</text>

            {/* Giardino Inglese / Parco Piersanti Mattarella */}
            <rect x="550" y="420" width="60" height="50" rx="12" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="555" y="450" fill="#166534" fontSize="9" fontWeight="700">G. INGLESE</text>

            {/* Parco Uditore */}
            <rect x="300" y="440" width="55" height="45" rx="10" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="305" y="465" fill="#166534" fontSize="8.5" fontWeight="700">P. UDITORE</text>

            {/* Parco d'Orleans & Villa Giulia a sud-est */}
            <rect x="580" y="660" width="65" height="55" rx="12" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="585" y="690" fill="#166534" fontSize="9" fontWeight="700">ORLEANS</text>

            {/* ===================================================================== */}
            {/* ZONA COSTIERA & MARE TIRRENO (Mondello, Arenella, La Cala, Foro Italico) */}
            {/* ===================================================================== */}
            
            {/* Golfo di Mondello in alto */}
            <path
              d="M260 0 Q340 70 460 70 Q540 60 590 0 L1000 0 L1000 850 L840 850 Q830 730 810 650 Q800 580 770 540 Q750 510 770 480 Q800 450 820 400 Q830 350 790 320 Q800 210 760 140 Q680 70 580 80 Z"
              fill="url(#seaWaterGrad)"
              stroke="#93C5FD"
              strokeWidth="2"
            />

            {/* Spiaggia dorata di Mondello */}
            <path
              d="M320 68 Q400 78 480 72"
              stroke="#FDE68A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <text x="360" y="55" style={{ fill: "var(--color-petrolio-600)" }} fontSize="13" fontWeight="800" letterSpacing="1">
              GOLFO DI MONDELLO
            </text>
            <text x="820" y="380" style={{ fill: "var(--color-petrolio-600)" }} fontSize="13" fontWeight="800" letterSpacing="1.5">
              GOLFO DI PALERMO
            </text>

            {/* Insenatura La Cala (Porto Storico di Palermo) */}
            <path
              d="M770 540 Q740 545 735 560 Q738 575 765 570"
              style={{ fill: "var(--color-petrolio-200)" }}
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <text x="745" y="590" style={{ fill: "var(--color-petrolio-700)" }} fontSize="9" fontWeight="700">LA CALA</text>

            {/* ===================================================================== */}
            {/* RETE STRADALE PRINCIPALE DI PALERMO (Tracciati vettoriali puliti)       */}
            {/* ===================================================================== */}
            
            {/* Viale Regione Siciliana (Circonvallazione ad arco ovest) */}
            <path
              d="M260 240 Q250 400 270 560 Q290 680 380 790 L420 850"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M260 240 Q250 400 270 560 Q290 680 380 790 L420 850"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <text x="210" y="470" fill="#94A3B8" fontSize="8" fontWeight="700" transform="rotate(-78 210 470)">
              VIALE REGIONE SICILIANA
            </text>

            {/* Asse Nord-Sud: Da Mondello verso la Favorita */}
            <path
              d="M400 70 L470 200 L510 370 L550 430"
              stroke="#FFFFFF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M400 70 L470 200 L510 370 L550 430"
              stroke="#E2E8F0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Viale della Libertà (Centro città) */}
            <path
              d="M520 400 L560 480 L600 550"
              stroke="#FFFFFF"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M520 400 L560 480 L600 550"
              stroke="#CBD5E1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <text x="560" y="490" fill="#64748B" fontSize="9" fontWeight="700" transform="rotate(50 560 490)">
              V.LE DELLA LIBERTÀ
            </text>

            {/* Via Notarbartolo (Trasversale ovest-est) */}
            <path
              d="M320 450 L480 430 L560 420"
              stroke="#FFFFFF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M320 450 L480 430 L560 420"
              stroke="#E2E8F0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <text x="380" y="435" fill="#64748B" fontSize="8.5" fontWeight="700">
              VIA NOTARBARTOLO
            </text>

            {/* Via Roma & Corso Vittorio Emanuele (Centro Storico) */}
            <path
              d="M600 550 L630 630 L660 720"
              stroke="#FFFFFF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M600 550 L630 630 L660 720"
              stroke="#CBD5E1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Corso Vittorio Emanuele (da Palazzo Reale al mare) */}
            <path
              d="M480 660 L620 640 L750 630"
              stroke="#FFFFFF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M480 660 L620 640 L750 630"
              stroke="#E2E8F0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <text x="640" y="635" fill="#64748B" fontSize="8.5" fontWeight="700">
              C.SO VITTORIO EMANUELE
            </text>

            {/* Foro Italico / Lungomare */}
            <path
              d="M750 570 Q770 650 780 740"
              stroke="#FFFFFF"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M750 570 Q770 650 780 740"
              stroke="#CBD5E1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <text x="770" y="670" style={{ fill: "var(--color-petrolio-600)" }} fontSize="8.5" fontWeight="700" transform="rotate(82 770 670)">
              FORO ITALICO
            </text>

            {/* Rete secondaria di quartiere */}
            <path d="M420 500 L440 620 L380 700" stroke="#FFFFFF" strokeWidth="4" fill="none" />
            <path d="M480 320 L400 340 L340 400" stroke="#FFFFFF" strokeWidth="4" fill="none" />
            <path d="M600 350 L680 430 L730 500" stroke="#FFFFFF" strokeWidth="4" fill="none" />
            <path d="M480 480 L540 590 L500 660" stroke="#FFFFFF" strokeWidth="4" fill="none" />

            {/* Etichette Quartieri di Palermo */}
            <text x="600" y="570" fill="#334155" fontSize="11" fontWeight="800">POLITEAMA</text>
            <text x="650" y="660" fill="#334155" fontSize="11" fontWeight="800">CENTRO STORICO</text>
            <text x="430" y="570" fill="#475569" fontSize="10" fontWeight="700">ZISA</text>
            <text x="350" y="320" fill="#475569" fontSize="10" fontWeight="700">SAN LORENZO</text>
            <text x="730" y="350" fill="#475569" fontSize="10" fontWeight="700">ARENELLA</text>
          </svg>

          {/* ===================================================================== */}
          {/* 6. PIN SULLA MAPPA: PIN A GOCCIA MAGENTA-LAMPONE PROFONDO (var(--color-brand-600))    */}
          {/* Con prezzi in bianco al centro (es. €8, €10, €14, €22, €40)            */}
          {/* ===================================================================== */}
          <div className="absolute inset-0 pointer-events-none">
            {displayedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              // Percentuali relative alle coordinate 1000x850
              const leftPercent = (item.x / 1000) * 100;
              const topPercent = (item.y / 850) * 100;

              return (
                <div
                  key={item.id}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                  className="absolute pointer-events-auto map-interactive-pin z-20 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                >
                  <div className={`flex flex-col items-center transition-all duration-200 ${isSelected ? 'scale-115 -translate-y-1' : 'group-hover:scale-108'}`}>
                    
                    {/* Testa a goccia di colore MAGENTA-LAMPONE ELEGANTE E PROFONDO con prezzo bianco */}
                    <div 
                      style={{
                        backgroundColor: isSelected ? COLOR_RASPBERRY_ACTIVE : COLOR_RASPBERRY,
                        boxShadow: `0 4px 16px rgba(184, 29, 91, 0.45)`
                      }}
                      className={`relative flex items-center justify-center font-extrabold text-white px-2.5 py-1 rounded-full border-2 border-white transition-all ${
                        isSelected ? 'ring-4 ring-[var(--color-brand-600)]/30' : ''
                      }`}
                    >
                      <span className="text-[12px] sm:text-[13px] tracking-tight leading-none font-bold">
                        €{item.price}
                      </span>
                      
                      {/* Puntina a triangolo verso il basso dello stesso colore */}
                      <div 
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent"
                        style={{ borderTopColor: isSelected ? COLOR_RASPBERRY_ACTIVE : COLOR_RASPBERRY }}
                      />
                    </div>

                    {/* Prezzo specchiato grigio scuro sotto la goccia */}
                    <span className="text-[9px] font-bold text-slate-600 mt-1 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] opacity-90 group-hover:opacity-100">
                      €{item.price}
                    </span>

                  </div>
                </div>
              );
            })}

            {/* =================================================================== */}
            {/* PIN SPECIALE A BOLLA: "14 attività" IN MAGENTA-LAMPONE PROFONDO     */}
            {/* =================================================================== */}
            <div
              style={{
                left: `${(clusterPosition.x / 1000) * 100}%`,
                top: `${(clusterPosition.y / 850) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute pointer-events-auto map-interactive-pin z-20 cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                setIsListOpen(true);
              }}
              title="Mostra tutte le 14 attività"
            >
              <div 
                style={{
                  backgroundColor: COLOR_RASPBERRY,
                  boxShadow: `0 6px 24px rgba(184, 29, 91, 0.5)`
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white border-3 sm:border-4 border-white flex flex-col items-center justify-center transition-transform active:scale-95 group-hover:scale-105"
              >
                <span className="text-base sm:text-lg font-black leading-none tracking-tight">
                  {activitiesCount}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold opacity-95 leading-tight">
                  attività
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* CONTROLLI DELLA MAPPA (Lato destro)                                        */}
        {/* ========================================================================= */}
        <div className="absolute right-4 bottom-32 sm:bottom-36 z-30 flex flex-col items-center gap-3">
          
          {/* Pulsante GPS recenter */}
          <button
            type="button"
            onClick={handleResetMap}
            aria-label="Posizione Palermo"
            className="w-11 h-11 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:text-[var(--color-brand-600)] active:scale-95 transition-all cursor-pointer"
          >
            <Navigation className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Controlli Zoom (+ e - verticali arrotondati) */}
          <div className="w-11 rounded-2xl bg-white shadow-md border border-slate-100 flex flex-col items-center divide-y divide-slate-100 overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom avanti"
              className="w-11 h-11 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom indietro"
              className="w-11 h-11 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-colors cursor-pointer"
            >
              <Minus className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 7. PULSANTE FLESSIBILE IN BASSO:                                           */}
        {/* Fluttuante sulla mappa sopra la barra di navigazione:                      */}
        {/* "☰ Mostra lista (14) ⌵"                                                   */}
        {/* ========================================================================= */}
        <div className="absolute bottom-22 sm:bottom-24 left-1/2 -translate-x-1/2 z-30">
          <button
            type="button"
            onClick={() => setIsListOpen(true)}
            className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-6 py-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-slate-200/80 flex items-center gap-2 text-sm sm:text-base active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="text-base sm:text-lg leading-none">☰</span>
            <span className="tracking-tight">Mostra lista ({displayedItems.length})</span>
            <span className="text-xs text-slate-500 leading-none">⌵</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PREVIEW CARD FLUTTUANTE: Quando l'utente tocca un pin sulla mappa          */}
        {/* ========================================================================= */}
        {selectedItem && !isListOpen && (
          <div className="absolute bottom-36 sm:bottom-40 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-96 z-40 animate-in slide-in-from-bottom duration-200">
            <div 
              onClick={() => {
                const act = {
                  id: selectedItem.id,
                  title: selectedItem.title,
                  categoryName: selectedItem.categoryName,
                  venueName: selectedItem.venueName,
                  price: selectedItem.price,
                  priceUnit: selectedItem.priceUnit || 'bambino',
                  ageMin: selectedItem.ageMin,
                  ageMax: selectedItem.ageMax,
                  image: selectedItem.image,
                  description: selectedItem.description
                } as Activity;
                onSelectActivity?.(act);
              }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5 flex gap-3.5 items-center cursor-pointer relative"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Chiudi anteprima"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div 
                  style={{ color: COLOR_RASPBERRY }}
                  className="text-[10px] font-bold uppercase tracking-wider"
                >
                  {selectedItem.categoryName}
                </div>
                <h4 className="font-bold text-sm text-slate-900 truncate">
                  {selectedItem.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedItem.venueName}</span>
                </div>
                <div className="text-xs font-bold mt-1 flex items-center justify-between">
                  <span style={{ color: COLOR_RASPBERRY }}>
                    €{selectedItem.price} <span className="text-[10px] text-slate-400 font-normal">/{selectedItem.priceUnit || 'bambino'}</span>
                  </span>
                  <span 
                    style={{ color: COLOR_RASPBERRY }}
                    className="text-[11px] font-semibold hover:underline flex items-center gap-0.5"
                  >
                    Dettagli <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASSETTO LISTA ATTIVITÀ (Bottom Sheet a comparsa dal pulsante Mostra lista)*/}
        {/* ========================================================================= */}
        {isListOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-2xs animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col w-full overflow-hidden animate-in slide-in-from-bottom duration-300">
              
              {/* Header del cassetto con maniglia */}
              <div className="pt-3 pb-2.5 px-5 flex flex-col items-center border-b border-slate-100 shrink-0">
                <div 
                  className="w-10 h-1 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition-colors mb-3" 
                  onClick={() => setIsListOpen(false)}
                />
                
                <div className="w-full flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900">
                      Attività a Palermo sulla Mappa
                    </h3>
                    <p className="text-xs text-slate-500">
                      {displayedItems.length} esperienze disponibili
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsListOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lista delle attività scorrevole */}
              <div className="overflow-y-auto p-4 space-y-3 min-h-0 flex-1">
                {displayedItems.map((item) => {
                  const isFav = favorites.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsListOpen(false);
                        setSelectedItem(item);
                        // Centra la mappa su questo elemento
                        setViewTransform({
                          x: (500 - item.x) * 0.8,
                          y: (425 - item.y) * 0.8,
                          scale: 1.25
                        });
                      }}
                      className="bg-white rounded-2xl border border-slate-100 p-3 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex gap-3.5 items-center relative group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <div 
                          style={{ color: COLOR_RASPBERRY }}
                          className="text-[10px] font-bold uppercase tracking-wider"
                        >
                          {item.categoryName}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-[var(--color-brand-600)] transition-colors truncate">
                          {item.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{item.venueName}</span>
                          <span className="text-slate-300">•</span>
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="shrink-0">{item.timeRange}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                          <span 
                            style={{ color: COLOR_RASPBERRY }}
                            className="text-sm font-extrabold"
                          >
                            €{item.price} <span className="text-[10px] text-slate-400 font-normal">/{item.priceUnit || 'bambino'}</span>
                          </span>

                          <span 
                            style={{ color: COLOR_RASPBERRY }}
                            className="text-xs font-semibold hover:underline flex items-center gap-0.5"
                          >
                            Mostra sulla mappa &gt;
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite?.(item.id, e);
                        }}
                        className="absolute top-3 right-3 p-1 text-slate-300 hover:text-[var(--color-brand-600)] transition-colors"
                      >
                        <Heart 
                          style={isFav ? { fill: COLOR_RASPBERRY, color: COLOR_RASPBERRY } : undefined}
                          className="w-4 h-4 stroke-current" 
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
