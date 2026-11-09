import React, { useState, useRef, useEffect } from 'react';
import { TargetAudience, AgeGroup, CategoryId, OrganizerProfile } from '../types';
import { PALERMO_ZONES, CATEGORIES, ORGANIZERS, TARGET_AUDIENCES } from '../data/mockData';
import { 
  Sparkles, 
  Baby, 
  Users, 
  CalendarDays, 
  Film, 
  Trees, 
  Bus, 
  Languages,
  Music,
  MapPin, 
  ChevronDown,
  Clock,
  Check,
  Filter,
  X,
  Map,
  Grid,
  Building2,
  ExternalLink,
  Utensils,
  Home,
  CheckCircle2,
  ChevronRight,
  Heart,
  Shield,
  Tag,
  Gift,
  Sun,
  Smile
} from 'lucide-react';

export const AGE_FILTER_OPTIONS = [
  { id: 'all', label: 'Tutte le età', desc: '0 - 14+ anni' },
  { id: '0-3', label: '0-12 mesi / 1-3 anni', desc: 'Neonati e prima infanzia' },
  { id: '3-6', label: '4-6 anni', desc: 'Scuola dell\'infanzia' },
  { id: '6-10', label: '7-10 anni', desc: 'Scuola primaria e laboratori' },
  { id: '10-14+', label: '10-14+ anni', desc: 'Ragazzi e teenager' },
];

export const PALERMO_MACRO_ZONES = [
  { id: 'all', label: 'Tutti i Quartieri', desc: 'Intera città di Palermo' },
  { id: 'Centro', label: 'Centro (Politeama, Massimo, Kalsa)', desc: 'Centro storico e monumentale' },
  { id: 'Mondello/Mare', label: 'Mondello / Mare (Addaura, Sferracavallo)', desc: 'Litorale e spiagge' },
  { id: 'Zona Nord', label: 'Zona Nord (Favorita, San Lorenzo, Resuttana)', desc: 'Parchi e impianti sportivi' },
  { id: 'Zona Sud', label: 'Zona Sud (Oreto, Brancaccio, Villagrazia)', desc: 'Aree a sud di Palermo' },
  { id: 'Fuori porta', label: 'Fuori porta (Monreale, Bagheria, Altofonte)', desc: 'Gite e agriturismi nei dintorni' },
];

export const SALVA_MAMMA_AMENITIES = [
  { id: 'passeggino', label: '🛒 Accessibile in passeggino', desc: 'Rampe e percorsi senza barriere' },
  { id: 'fasciatoio', label: '🍼 Fasciatoio attrezzato', desc: 'Area cambio neonati pulita' },
  { id: 'recintato', label: '🏰 Parco recintato e sicuro', desc: 'Aree protette per far correre i bimbi' },
  { id: 'ombra', label: '🌳 Zona d\'ombra alberata', desc: 'Punti freschi e alberi durante l\'estate' },
  { id: 'gratuiti', label: '🎁 Solo eventi gratuiti', desc: 'Attività ad ingresso libero' },
];

interface QuickFilterNavProps {
  selectedAudience: TargetAudience;
  onSelectAudience: (audience: TargetAudience) => void;
  selectedAgeGroup: AgeGroup | 'all';
  onSelectAgeGroup: (age: AgeGroup | 'all') => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  selectedOrganizer?: string;
  onSelectOrganizer?: (organizerId: string) => void;
  onOpenOrganizerPage?: (organizer: OrganizerProfile) => void;
  selectedDay: string;
  onSelectDay: (day: string) => void;
  currentZone: string;
  onSelectZone: (zone: string) => void;
  onlyFree?: boolean;
  onToggleOnlyFree?: () => void;
  onResetFilters: () => void;
  viewMode?: 'grid' | 'map' | 'planning';
  onSelectViewMode?: (mode: 'grid' | 'map' | 'planning') => void;
}

export const QuickFilterNav: React.FC<QuickFilterNavProps> = ({
  selectedAudience,
  onSelectAudience,
  selectedAgeGroup,
  onSelectAgeGroup,
  selectedCategory,
  onSelectCategory,
  selectedOrganizer = 'all',
  onSelectOrganizer,
  onOpenOrganizerPage,
  selectedDay,
  onSelectDay,
  currentZone,
  onSelectZone,
  onlyFree = false,
  onToggleOnlyFree,
  onResetFilters,
  viewMode,
  onSelectViewMode
}) => {
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [activeTabInDropdown, setActiveTabInDropdown] = useState<'subcat' | 'eta' | 'zona' | 'salvamamma'>('subcat');
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll handler for dynamic header shrinking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close hover menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveHoverMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover enter / leave with smooth delay buffer
  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveHoverMenu(id);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverMenu(null);
    }, 220);
  };

  const hasActiveFilters = 
    selectedAudience !== 'all' || 
    selectedAgeGroup !== 'all' || 
    selectedCategory !== 'all' || 
    selectedOrganizer !== 'all' ||
    selectedDay !== 'all' || 
    currentZone !== 'Tutti i Quartieri' ||
    onlyFree;

  // Main 6 Category Nav Items
  const navItems = [
    {
      id: 'oggi',
      title: 'Cosa fare oggi',
      icon: '📅',
      badge: selectedDay !== 'all' ? 'Attivo' : null,
      subtitle: 'Eventi, spettacoli e laboratori del giorno',
      isActive: selectedDay !== 'all' && viewMode !== 'map',
      activeColor: 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md',
      dropdownHeader: '📅 Cosa Fare Oggi a Palermo',
      dropdownSubHeader: 'Eventi, spettacoli teatrali e laboratori attivi',
      onSelectMainCategory: () => {
        onSelectDay('oggi');
        if (onSelectViewMode) onSelectViewMode('grid');
      },
      subItems: [
        {
          id: 'tutti-oggi',
          label: '✨ Mostra tutti gli eventi di oggi',
          desc: 'Tutto il programma del giorno in corso',
          isSelected: selectedDay === 'oggi' && selectedCategory === 'all',
          onClick: () => {
            onSelectDay('oggi');
            onSelectCategory('all');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'domani',
          label: '🌅 Programma di Domani',
          desc: 'Anticipazioni ed eventi della giornata di domani',
          isSelected: selectedDay === 'domani',
          onClick: () => {
            onSelectDay('domani');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'weekend',
          label: '🎟️ Questo Weekend (Sabato & Domenica)',
          desc: 'Grandi fiere, eventi all\'aperto e teatri per famiglie',
          isSelected: selectedDay === 'weekend',
          onClick: () => {
            onSelectDay('weekend');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'laboratori',
          label: '🎨 Laboratori Creativi & STEM',
          desc: 'Attività pratiche, pittura e scienza divertente',
          isSelected: selectedCategory === 'laboratori' || selectedCategory === 'stem',
          onClick: () => {
            onSelectCategory('laboratori');
            onSelectDay('oggi');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'teatro',
          label: '🎭 Spettacoli & Burattini',
          desc: 'Teatro per bambini, favole e burattini tradizionali',
          isSelected: selectedCategory === 'teatro',
          onClick: () => {
            onSelectCategory('teatro');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        }
      ]
    },
    {
      id: 'parchi',
      title: 'Parchi & Natura',
      icon: '🌳',
      badge: selectedCategory === 'parchi' ? 'Attivo' : null,
      subtitle: 'Ville, aree verdi e parchi giochi',
      isActive: selectedCategory === 'parchi' && viewMode !== 'map',
      activeColor: 'bg-emerald-600 text-white border-emerald-600 font-black shadow-md',
      dropdownHeader: '🌳 Parchi, Aree Verdi & Natura',
      dropdownSubHeader: 'Spazi all\'aperto, giardini alberati e giostre',
      onSelectMainCategory: () => {
        onSelectCategory('parchi');
        if (onSelectViewMode) onSelectViewMode('grid');
      },
      subItems: [
        {
          id: 'tutti-parchi',
          label: '✨ Mostra tutti i Parchi & Aree Verdi',
          desc: 'Tutte le ville e parchi giochi di Palermo',
          isSelected: selectedCategory === 'parchi' && currentZone === 'Tutti i Quartieri',
          onClick: () => {
            onSelectCategory('parchi');
            onSelectZone('Tutti i Quartieri');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'ville-storiche',
          label: '🏛️ Ville Storiche con Giardino',
          desc: 'Villa Giulia, Giardino Inglese, Parco della Favorita',
          isSelected: selectedCategory === 'parchi' && (currentZone === 'Centro' || currentZone === 'Politeama / Centro'),
          onClick: () => {
            onSelectCategory('parchi');
            onSelectZone('Centro');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'parchi-giochi',
          label: '🎡 Parchi Giochi All\'Aperto con Scivoli',
          desc: 'Aree giostre recintate con scivoli e altalene',
          isSelected: selectedCategory === 'parchi' && (currentZone === 'Zona Nord' || currentZone === 'Parco della Favorita'),
          onClick: () => {
            onSelectCategory('parchi');
            onSelectZone('Zona Nord');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'fattorie',
          label: '🚜 Fattorie Didattiche e Animali',
          desc: 'Contatto con la natura, cavalli e laboratori agricoli',
          isSelected: selectedCategory === 'parchi' && currentZone === 'Fuori porta',
          onClick: () => {
            onSelectCategory('parchi');
            onSelectZone('Fuori porta');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        }
      ]
    },
    {
      id: 'sport',
      title: 'Sport & Movimento',
      icon: '⚽',
      badge: selectedCategory === 'sport' ? 'Attivo' : null,
      subtitle: 'Corsi, attività fisiche e prove libere',
      isActive: selectedCategory === 'sport' && viewMode !== 'map',
      activeColor: 'bg-blue-600 text-white border-blue-600 font-black shadow-md',
      dropdownHeader: '⚽ Sport, Corsi & Movimento',
      dropdownSubHeader: 'Discipline sportive e lezioni di prova',
      onSelectMainCategory: () => {
        onSelectCategory('sport');
        if (onSelectViewMode) onSelectViewMode('grid');
      },
      subItems: [
        {
          id: 'tutti-sport',
          label: '✨ Mostra tutti i Corsi & Sport',
          desc: 'Tutte le attività motorie per bambini',
          isSelected: selectedCategory === 'sport' && !onlyFree,
          onClick: () => {
            onSelectCategory('sport');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'nuoto',
          label: '🏊 Acquaticità Neonatale & Nuoto',
          desc: 'Piscine coperte, corsi nido e nuoto bimbi',
          isSelected: selectedCategory === 'sport' && selectedAgeGroup === '0-3',
          onClick: () => {
            onSelectCategory('sport');
            onSelectAgeGroup('0-3');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'tennis-padel',
          label: '🎾 Tennis, Padel & Atletica Junior',
          desc: 'Scuole tennis e percorsi di coordinazione',
          isSelected: selectedCategory === 'sport' && selectedAgeGroup === '6-10',
          onClick: () => {
            onSelectCategory('sport');
            onSelectAgeGroup('6-10');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'open-day',
          label: '🎯 Open Day & Lezioni di Prova Gratuitamente',
          desc: 'Prove libere gratuite nei centri sportivi di Palermo',
          isSelected: selectedCategory === 'sport' && onlyFree,
          onClick: () => {
            onSelectCategory('sport');
            if (onToggleOnlyFree && !onlyFree) onToggleOnlyFree();
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        }
      ]
    },
    {
      id: 'ristoranti',
      title: 'Dove mangiare',
      icon: '🍕',
      badge: selectedCategory === 'ristoranti' ? 'Attivo' : null,
      subtitle: 'Locali, bar e ristoranti family-friendly',
      isActive: selectedCategory === 'ristoranti' && viewMode !== 'map',
      activeColor: 'bg-orange-500 text-white border-orange-500 font-black shadow-md',
      dropdownHeader: '🍕 Locali, Bar & Ristoranti Family',
      dropdownSubHeader: 'Pizzerie con area giochi, seggioloni e cortili',
      onSelectMainCategory: () => {
        onSelectCategory('ristoranti');
        if (onSelectViewMode) onSelectViewMode('grid');
      },
      subItems: [
        {
          id: 'tutti-ristoranti',
          label: '✨ Mostra tutti i Locali Family',
          desc: 'Guida completa a ristoranti e bar con animazione',
          isSelected: selectedCategory === 'ristoranti' && currentZone === 'Tutti i Quartieri',
          onClick: () => {
            onSelectCategory('ristoranti');
            onSelectZone('Tutti i Quartieri');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'pizzerie',
          label: '🍕 Pizzerie con Area Giochi & Animation',
          desc: 'Pizzerie ampie con animatrici e spazio gonfiabili',
          isSelected: selectedCategory === 'ristoranti' && (currentZone === 'Zona Nord' || currentZone === 'Favorita / San Lorenzo'),
          onClick: () => {
            onSelectCategory('ristoranti');
            onSelectZone('Zona Nord');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'merende-gelati',
          label: '🍦 Bar, Gelaterie & Merende All\'Aperto',
          desc: 'Bar con giardini esterni e gelaterie artigianali',
          isSelected: selectedCategory === 'ristoranti' && (currentZone === 'Mondello/Mare' || currentZone === 'Mondello / Addaura'),
          onClick: () => {
            onSelectCategory('ristoranti');
            onSelectZone('Mondello/Mare');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'agriturismi-pranzi',
          label: '🚜 Agriturismi & Ristoranti Fuori Porta',
          desc: 'Pranzi domenicali immersi nel verde vicino a Palermo',
          isSelected: selectedCategory === 'ristoranti' && currentZone === 'Fuori porta',
          onClick: () => {
            onSelectCategory('ristoranti');
            onSelectZone('Fuori porta');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        }
      ]
    },
    {
      id: 'indoor',
      title: 'Al chiuso',
      icon: '🏠',
      badge: (selectedCategory === 'indoor' || selectedCategory === 'cinema' || selectedCategory === 'lingue' || selectedCategory === 'musica') ? 'Attivo' : null,
      subtitle: 'Ludoteche e spazi indoor anti-maltempo',
      isActive: (selectedCategory === 'indoor' || selectedCategory === 'cinema' || selectedCategory === 'lingue' || selectedCategory === 'musica') && viewMode !== 'map',
      activeColor: 'bg-indigo-600 text-white border-indigo-600 font-black shadow-md',
      dropdownHeader: '🏠 Spazi Indoor & Rifugi Anti-Maltempo',
      dropdownSubHeader: 'Ludoteche, teatri, cinema e spazi al coperto',
      onSelectMainCategory: () => {
        onSelectCategory('indoor');
        if (onSelectViewMode) onSelectViewMode('grid');
      },
      subItems: [
        {
          id: 'tutti-indoor',
          label: '✨ Mostra tutti gli Spazi Al Chiuso',
          desc: 'Tutti i posti al coperto e protetti dal freddo',
          isSelected: selectedCategory === 'indoor',
          onClick: () => {
            onSelectCategory('indoor');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'ludoteche-gonfiabili',
          label: '🎈 Ludoteche, Gonfiabili & Playgrounds',
          desc: 'Vasche con palline, gonfiabili e ludoteche per feste',
          isSelected: selectedCategory === 'indoor',
          onClick: () => {
            onSelectCategory('indoor');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'cinema-bimbi',
          label: '🍿 Cinema & Film d\'Animazione',
          desc: 'Rassegne di cartoni animati ed eventi nei cinema',
          isSelected: selectedCategory === 'cinema',
          onClick: () => {
            onSelectCategory('cinema');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'corsi-lingue',
          label: '🇬🇧 Corsi di Lingua & Playgroup Bilingue',
          desc: 'Laboratori in inglese per bambini piccoli',
          isSelected: selectedCategory === 'lingue',
          onClick: () => {
            onSelectCategory('lingue');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        },
        {
          id: 'musica-propedeutica',
          label: '🎵 Propedeutica Musicale & Suoni',
          desc: 'Ritmo, canto e musica per piccolissimi',
          isSelected: selectedCategory === 'musica',
          onClick: () => {
            onSelectCategory('musica');
            if (onSelectViewMode) onSelectViewMode('grid');
          }
        }
      ]
    },
    {
      id: 'mappa',
      title: 'Mappa',
      icon: '🗺️',
      badge: viewMode === 'map' ? 'Mappa' : null,
      subtitle: 'Geolocalizza tutto sulla mappa di Palermo',
      isActive: viewMode === 'map',
      activeColor: 'bg-sky-600 text-white border-sky-600 font-black shadow-md',
      dropdownHeader: '🗺️ Mappa & Geolocalizzazione',
      dropdownSubHeader: 'Esplora sulla mappa interattiva di Palermo',
      onSelectMainCategory: () => {
        if (onSelectViewMode) onSelectViewMode('map');
      },
      subItems: [
        {
          id: 'mappa-generale',
          label: '✨ Apri Mappa Generale di Palermo',
          desc: 'Visualizza tutte le attività attorno a te',
          isSelected: viewMode === 'map' && selectedCategory === 'all',
          onClick: () => {
            if (onSelectViewMode) onSelectViewMode('map');
            onSelectCategory('all');
          }
        },
        {
          id: 'mappa-parchi-verdi',
          label: '🌳 Mappa Parchi & Aree Verdi',
          desc: 'Mappa di ville, giardini e percorsi nel verde',
          isSelected: viewMode === 'map' && selectedCategory === 'parchi',
          onClick: () => {
            if (onSelectViewMode) onSelectViewMode('map');
            onSelectCategory('parchi');
          }
        },
        {
          id: 'mappa-locali-family',
          label: '🍕 Mappa Ristoranti & Pizzerie',
          desc: 'Mappa dei locali con seggioloni e giochi',
          isSelected: viewMode === 'map' && selectedCategory === 'ristoranti',
          onClick: () => {
            if (onSelectViewMode) onSelectViewMode('map');
            onSelectCategory('ristoranti');
          }
        },
        {
          id: 'mappa-spazi-coperti',
          label: '🏠 Mappa Ludoteche & Chiuso',
          desc: 'Geolocalizza posti indoor al coperto',
          isSelected: viewMode === 'map' && selectedCategory === 'indoor',
          onClick: () => {
            if (onSelectViewMode) onSelectViewMode('map');
            onSelectCategory('indoor');
          }
        }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm sticky top-0 z-40 transition-all duration-300">
      
      {/* Dynamic Sticky Header Navigation */}
      <div className={`transition-all duration-300 px-3 sm:px-6 ${
        isScrolled ? 'py-1 sm:py-1.5' : 'py-2 sm:py-3'
      }`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Main 6 Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {navItems.map((item) => {
              const isHovered = activeHoverMenu === item.id;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Category Main Card / Trigger Button */}
                  <button
                    onClick={() => {
                      if (activeHoverMenu === item.id) {
                        setActiveHoverMenu(null);
                      } else {
                        setActiveHoverMenu(item.id);
                      }
                      item.onSelectMainCategory();
                    }}
                    className={`w-full text-left rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between relative overflow-hidden select-none ${
                      isScrolled ? 'p-2' : 'p-2.5 sm:p-3'
                    } ${
                      item.isActive 
                        ? item.activeColor
                        : isHovered
                          ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-xs'
                          : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200/90 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`shrink-0 transition-transform group-hover:scale-110 ${
                        isScrolled ? 'text-lg' : 'text-xl'
                      }`}>{item.icon}</span>
                      
                      <div className="flex items-center gap-1">
                        {item.badge && (
                          <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isHovered ? 'rotate-180 text-sky-600 font-bold' : item.isActive ? 'text-white' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>

                    <div>
                      <div className={`font-extrabold leading-snug flex items-center justify-between ${
                        isScrolled ? 'text-[11px]' : 'text-xs'
                      }`}>
                        <span className="truncate">{item.title}</span>
                      </div>
                      
                      {!isScrolled && (
                        <p className={`text-[10px] leading-tight line-clamp-2 mt-0.5 transition-colors ${
                          item.isActive ? 'text-white/90 font-medium' : 'text-slate-500 group-hover:text-slate-700'
                        }`}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* VERTICAL HOVER DROPDOWN MENU WITH FULL INTEGRATED FILTERS */}
                  {isHovered && (
                    <div 
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-0 top-full mt-1.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      {/* Dropdown Header */}
                      <div className="px-3.5 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-black text-slate-900">{item.dropdownHeader}</div>
                          <div className="text-[10px] font-medium text-slate-400">{item.dropdownSubHeader}</div>
                        </div>
                        <span className="text-2xl">{item.icon}</span>
                      </div>

                      {/* Dropdown Tab Controls: Sottocategorie / Età / Zona / Salva-mamma */}
                      <div className="px-2 mb-2 flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[10px] font-extrabold text-slate-600 overflow-x-auto no-scrollbar">
                        <button
                          onClick={() => setActiveTabInDropdown('subcat')}
                          className={`px-2 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                            activeTabInDropdown === 'subcat' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'hover:text-slate-900'
                          }`}
                        >
                          ✨ Tipologie
                        </button>
                        <button
                          onClick={() => setActiveTabInDropdown('eta')}
                          className={`px-2 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                            activeTabInDropdown === 'eta' ? 'bg-white text-sky-700 shadow-2xs font-black' : 'hover:text-slate-900'
                          }`}
                        >
                          👶 Età
                        </button>
                        <button
                          onClick={() => setActiveTabInDropdown('zona')}
                          className={`px-2 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                            activeTabInDropdown === 'zona' ? 'bg-white text-emerald-700 shadow-2xs font-black' : 'hover:text-slate-900'
                          }`}
                        >
                          📍 Zona Palermo
                        </button>
                        <button
                          onClick={() => setActiveTabInDropdown('salvamamma')}
                          className={`px-2 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                            activeTabInDropdown === 'salvamamma' ? 'bg-white text-purple-700 shadow-2xs font-black' : 'hover:text-slate-900'
                          }`}
                        >
                          🍼 Salva-mamma
                        </button>
                      </div>

                      {/* TAB 1: SOTTOCATEGORIE E ATTIVITÀ SPECIFICHE */}
                      {activeTabInDropdown === 'subcat' && (
                        <div className="space-y-1 px-2 max-h-72 overflow-y-auto">
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                sub.onClick();
                                setActiveHoverMenu(null);
                              }}
                              className={`w-full text-left p-2.5 rounded-xl transition-all text-xs flex items-start gap-2.5 cursor-pointer group/opt ${
                                sub.isSelected
                                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                                  : 'hover:bg-slate-100 text-slate-800'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {sub.isSelected ? (
                                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-slate-300 group-hover/opt:border-sky-500 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/opt:bg-sky-500 transition-colors" />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold">{sub.label}</span>
                                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover/opt:opacity-100 transition-opacity ${
                                    sub.isSelected ? 'text-white' : 'text-slate-400'
                                  }`} />
                                </div>
                                {sub.desc && (
                                  <p className={`text-[10px] mt-0.5 leading-tight ${
                                    sub.isSelected ? 'text-slate-200' : 'text-slate-500'
                                  }`}>
                                    {sub.desc}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* TAB 2: FILTRO ETÀ (0-12 MESI, 1-3 ANNI, 4-6 ANNI, 7-10 ANNI) */}
                      {activeTabInDropdown === 'eta' && (
                        <div className="space-y-1 px-2 max-h-72 overflow-y-auto">
                          <div className="text-[10px] font-black uppercase text-slate-400 px-2 py-1">
                            Fascia d'Età consigliata
                          </div>
                          {AGE_FILTER_OPTIONS.map((ageOpt) => {
                            const isAgeSelected = selectedAgeGroup === ageOpt.id;
                            return (
                              <button
                                key={ageOpt.id}
                                onClick={() => {
                                  onSelectAgeGroup(ageOpt.id as any);
                                  item.onSelectMainCategory();
                                  setActiveHoverMenu(null);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-all text-xs flex items-center justify-between cursor-pointer ${
                                  isAgeSelected
                                    ? 'bg-sky-600 text-white font-extrabold shadow-xs'
                                    : 'hover:bg-slate-100 text-slate-800'
                                }`}
                              >
                                <div>
                                  <div className="font-bold flex items-center gap-1.5">
                                    <span>👶</span>
                                    <span>{ageOpt.label}</span>
                                  </div>
                                  <p className={`text-[10px] mt-0.5 ${
                                    isAgeSelected ? 'text-sky-100' : 'text-slate-500'
                                  }`}>
                                    {ageOpt.desc}
                                  </p>
                                </div>
                                {isAgeSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* TAB 3: FILTRO ZONA A PALERMO */}
                      {activeTabInDropdown === 'zona' && (
                        <div className="space-y-1 px-2 max-h-72 overflow-y-auto">
                          <div className="text-[10px] font-black uppercase text-slate-400 px-2 py-1">
                            Quartiere & Zona di Palermo
                          </div>
                          {PALERMO_MACRO_ZONES.map((zoneOpt) => {
                            const isZoneSelected = currentZone === zoneOpt.id || (zoneOpt.id === 'all' && currentZone === 'Tutti i Quartieri');
                            return (
                              <button
                                key={zoneOpt.id}
                                onClick={() => {
                                  onSelectZone(zoneOpt.id === 'all' ? 'Tutti i Quartieri' : zoneOpt.id);
                                  item.onSelectMainCategory();
                                  setActiveHoverMenu(null);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-all text-xs flex items-center justify-between cursor-pointer ${
                                  isZoneSelected
                                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                                    : 'hover:bg-slate-100 text-slate-800'
                                }`}
                              >
                                <div>
                                  <div className="font-bold flex items-center gap-1.5">
                                    <span>📍</span>
                                    <span>{zoneOpt.label}</span>
                                  </div>
                                  <p className={`text-[10px] mt-0.5 ${
                                    isZoneSelected ? 'text-emerald-100' : 'text-slate-500'
                                  }`}>
                                    {zoneOpt.desc}
                                  </p>
                                </div>
                                {isZoneSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* TAB 4: SERVIZI SALVA-MAMMA */}
                      {activeTabInDropdown === 'salvamamma' && (
                        <div className="space-y-1 px-2 max-h-72 overflow-y-auto">
                          <div className="text-[10px] font-black uppercase text-slate-400 px-2 py-1">
                            Servizi Family & Comfort
                          </div>
                          {SALVA_MAMMA_AMENITIES.map((amenity) => {
                            const isSelected = amenity.id === 'gratuiti' ? onlyFree : selectedAudience === amenity.id;
                            return (
                              <button
                                key={amenity.id}
                                onClick={() => {
                                  if (amenity.id === 'gratuiti') {
                                    if (onToggleOnlyFree) onToggleOnlyFree();
                                  } else {
                                    onSelectAudience(isSelected ? 'all' : (amenity.id as any));
                                  }
                                  item.onSelectMainCategory();
                                  setActiveHoverMenu(null);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-all text-xs flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-purple-600 text-white font-extrabold shadow-xs'
                                    : 'hover:bg-slate-100 text-slate-800'
                                }`}
                              >
                                <div>
                                  <div className="font-bold">{amenity.label}</div>
                                  <p className={`text-[10px] mt-0.5 ${
                                    isSelected ? 'text-purple-100' : 'text-slate-500'
                                  }`}>
                                    {amenity.desc}
                                  </p>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Dropdown Footer with Quick Reset if any filter is active */}
                      {hasActiveFilters && (
                        <div className="mt-2 pt-2 border-t border-slate-100 px-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500">
                            Filtri attivi applicati
                          </span>
                          <button
                            onClick={() => {
                              onResetFilters();
                              setActiveHoverMenu(null);
                            }}
                            className="text-[10px] font-black text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer bg-rose-50 px-2 py-1 rounded-lg border border-rose-100"
                          >
                            <X className="w-3 h-3" /> Azzera filtri
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Filter Pills Bar inside Header (Only visible when active filters exist) */}
          {hasActiveFilters && (
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Filtri Attivi:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0">
                    {selectedCategory}
                    <button onClick={() => onSelectCategory('all')} className="hover:text-sky-950">✕</button>
                  </span>
                )}

                {selectedDay !== 'all' && (
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0">
                    Giorno: {selectedDay}
                    <button onClick={() => onSelectDay('all')} className="hover:text-amber-950">✕</button>
                  </span>
                )}

                {onlyFree && (
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0">
                    Gratuiti
                    <button onClick={onToggleOnlyFree} className="hover:text-emerald-950">✕</button>
                  </span>
                )}

                {currentZone !== 'Tutti i Quartieri' && (
                  <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0">
                    {currentZone}
                    <button onClick={() => onSelectZone('Tutti i Quartieri')} className="hover:text-purple-950">✕</button>
                  </span>
                )}

                {selectedAgeGroup !== 'all' && (
                  <span className="bg-pink-100 text-pink-900 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0">
                    Età: {selectedAgeGroup}
                    <button onClick={() => onSelectAgeGroup('all')} className="hover:text-pink-950">✕</button>
                  </span>
                )}
              </div>

              <button
                onClick={onResetFilters}
                className="text-[10px] font-black text-rose-600 hover:text-rose-800 shrink-0 flex items-center gap-1 cursor-pointer bg-rose-50 px-2 py-1 rounded-lg border border-rose-100"
              >
                <X className="w-3 h-3" /> Resetta tutto
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
