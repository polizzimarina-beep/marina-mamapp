import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Heart, 
  ChevronRight, 
  MapPin, 
  Maximize2, 
  ArrowLeft,
  Calendar,
  Ticket,
  SlidersHorizontal,
  Sparkles,
  Check
} from 'lucide-react';
import { Activity } from '../types';

export const BRAND_MAGENTA = '#B81D5B';
export const BRAND_MAGENTA_HOVER = '#A3154E';
export const BRAND_TEAL = '#00A8B5';

export interface CategoryScreenItem {
  id: string;
  title: string;
  location: string;
  badges: string[];
  image: string;
  isFavorite: boolean;
  price?: string;
  description?: string;
}

export interface CategoryScreenConfig {
  id: 'parchi' | 'musei' | 'laboratori' | 'ludoteche';
  title: string;
  subtitle: string;
  resultsCountText: string;
  heroImage: string;
  gradientOverlay: string;
  filters: string[];
  items: CategoryScreenItem[];
}

export const CATEGORY_SCREENS_CONFIG: Record<string, CategoryScreenConfig> = {
  parchi: {
    id: 'parchi',
    title: 'Parchi e Natura',
    subtitle: 'Scopri le 10 aree verdi di Palermo per i tuoi bambini',
    resultsCountText: '10 aree verdi trovate',
    heroImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1000&q=80',
    gradientOverlay: 'from-emerald-950/80 via-emerald-900/60 to-black/75',
    filters: ['Tutti', 'Con Area Giochi', 'Area Picnic', 'Animali e Natura'],
    items: [
      {
        id: 'parco-favorita',
        title: 'Parco della Favorita',
        location: 'viale Diana',
        badges: ['🌳 Ombra', '🚲 Bici', '🧺 Picnic'],
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=400&q=80',
        isFavorite: true,
        price: 'Gratuito',
        description: 'Il polmone verde più grande di Palermo con viali alberati perfetti per bici e picnic all\'aria aperta.'
      },
      {
        id: 'parco-uditore',
        title: 'Parco Uditore',
        location: 'piazza Albert Einstein',
        badges: ['🎠 Giochi', '🧺 Picnic', '🌳 Ombra'],
        image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: 'Gratuito',
        description: 'Parco recintato totalmente pedonale senza auto, ideale per i primi passi dei bimbi con scivoli e altalene.'
      },
      {
        id: 'giardino-inglese',
        title: 'Giardino Inglese',
        location: 'via della Libertà, 48',
        badges: ['🎠 Giochi', '🦆 Laghetto', '🌳 Ombra'],
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        isFavorite: true,
        price: 'Gratuito',
        description: 'Laghetto centrale con cigni e anatre, ponticelli in legno e storica area giostrine per bambini.'
      }
    ]
  },

  musei: {
    id: 'musei',
    title: 'Musei e Cultura',
    subtitle: 'Scopri gli 8 musei kid-friendly di Palermo',
    resultsCountText: '8 musei trovati',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    gradientOverlay: 'from-amber-950/85 via-stone-900/65 to-black/80',
    filters: ['Tutti', 'Interattivi', 'Storici', 'Con Laboratori'],
    items: [
      {
        id: 'palazzo-butera',
        title: 'Palazzo Butera',
        location: 'viale della Libertà',
        badges: ['🎨 Interattivo', '📍 Visita Guidata'],
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€6 bambino',
        description: 'Dimora nobiliare con collezioni di arte contemporanea e percorsi ludico-didattici per piccoli esploratori.'
      },
      {
        id: 'museo-marionette',
        title: 'Museo Internazionale delle Marionette',
        location: 'piazzetta Niscemi',
        badges: ['🏛 Storico', '✂️ Laboratorio'],
        image: 'https://images.unsplash.com/photo-1576764402988-7143f9cca90a?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€5 bambino',
        description: 'La più vasta collezione al mondo di pupi siciliani con teatrino attivo e laboratori di narrazione.'
      },
      {
        id: 'museo-salinas',
        title: 'Museo Archeologico Salinas',
        location: 'piazza Olivella',
        badges: ['🏺 Reperti', '🧒 Caccia al Tesoro'],
        image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?auto=format&fit=crop&w=400&q=80',
        isFavorite: true,
        price: 'Gratuito < 18',
        description: 'Cortili alberati e reperti storici fenici e greci spiegati con mappe gioco interattive.'
      }
    ]
  },

  laboratori: {
    id: 'laboratori',
    title: 'Laboratori Creativi',
    subtitle: 'Prenota le 12 attività artistiche per i tuoi bambini',
    resultsCountText: '12 laboratori trovati',
    heroImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
    gradientOverlay: 'from-amber-950/85 via-orange-950/65 to-black/80',
    filters: ['Tutti', 'Ceramica', 'Pittura', 'Robotica'],
    items: [
      {
        id: 'atelier-arte-insieme',
        title: 'Atelier Creativo "Arte Insieme"',
        location: 'via Maqueda',
        badges: ['👶 Dai 4 anni', '🎨 Materiali inclusi'],
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
        isFavorite: true,
        price: '€14 / bimbo',
        description: 'Manipolazione argilla, colori naturali a dita e scultura per sviluppare motricità fine e fantasia.'
      },
      {
        id: 'makerspace-inventori',
        title: 'Makerspace "Piccoli Inventori"',
        location: 'piazza Castelnuovo',
        badges: ['🤖 Robotica', '📅 Weekend'],
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€18 / bimbo',
        description: 'Primi passi nel coding con piccoli robot motorizzati e mattoncini programmabili.'
      },
      {
        id: 'pittura-mondello',
        title: 'Colori nel Borgo Marinaro',
        location: 'piazza Mondello',
        badges: ['🖌 Acquerelli', '🌊 Fronte Mare'],
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€12 / bimbo',
        description: 'Sessioni di pittura open-air con cavalletti per bambini e tempere lavabili sicure.'
      }
    ]
  },

  ludoteche: {
    id: 'ludoteche',
    title: 'Ludoteche e Spazi Gioco',
    subtitle: 'Esplora i 6 spazi sicuri al chiuso per i più piccoli',
    resultsCountText: '6 luoghi trovati',
    heroImage: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1000&q=80',
    gradientOverlay: 'from-sky-950/85 via-blue-950/65 to-black/80',
    filters: ['Tutti', 'Con Vasca Palline', 'Feste', 'Area 0-3'],
    items: [
      {
        id: 'paese-balocchi',
        title: 'Ludoteca "Il Paese dei Balocchi"',
        location: 'via Roma',
        badges: ['🤹 Vaschetta Palline', '☕ Bar Famiglie'],
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=400&q=80',
        isFavorite: true,
        price: '€8 / ora',
        description: 'Grande vasca palline multicolore, labirinto morbido con scivoli e comoda area caffetteria per genitori.'
      },
      {
        id: 'nuvola-morbida',
        title: 'Spazio Gioco "Nuvola Morbida"',
        location: 'piazza Mondello',
        badges: ['👶 Area 0-3 Anni', '♿ Accessibile'],
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€9 / ora',
        description: 'Superfici soffici anti-trauma, angoli sensoriali Montessori e igienizzazione continua a vapore.'
      },
      {
        id: 'jungle-jump',
        title: 'Jungle Jump Park',
        location: 'viale Regione Siciliana',
        badges: ['🧗 Gonfiabili', '🎂 Feste Compleanno'],
        image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=400&q=80',
        isFavorite: false,
        price: '€10 / ora',
        description: 'Mega gonfiabili a tema giungla, tappeti elastici protetti con rete e sale dedicate ai compleanni.'
      }
    ]
  }
};

export interface CategoryGridPresentationViewProps {
  onBackToHome: () => void;
  onSelectActivity?: (act: Activity) => void;
  onOpenBooking?: (act: Activity) => void;
  initialFocusedCategory?: 'parchi' | 'musei' | 'laboratori' | 'ludoteche' | null;
  onOpenMap?: () => void;
}

export const CategoryGridPresentationView: React.FC<CategoryGridPresentationViewProps> = ({
  onBackToHome,
  onSelectActivity,
  initialFocusedCategory = null,
  onOpenMap
}) => {
  // Modalità di visualizzazione: griglia 2x2 presentation vs singolo schermo ingrandito
  const [viewMode, setViewMode] = useState<'grid2x2' | 'single'>(initialFocusedCategory ? 'single' : 'grid2x2');
  const [focusedCategory, setFocusedCategory] = useState<'parchi' | 'musei' | 'laboratori' | 'ludoteche'>(initialFocusedCategory || 'parchi');

  // Stato filtri per ciascuna delle 4 schermate
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    parchi: 'Tutti',
    musei: 'Tutti',
    laboratori: 'Tutti',
    ludoteche: 'Tutti'
  });

  // Stato preferiti
  const [favoritesState, setFavoritesState] = useState<Record<string, boolean>>({
    'parco-favorita': true,
    'parco-uditore': false,
    'giardino-inglese': true,
    'palazzo-butera': false,
    'museo-marionette': false,
    'museo-salinas': true,
    'atelier-arte-insieme': true,
    'makerspace-inventori': false,
    'pittura-mondello': false,
    'paese-balocchi': true,
    'nuvola-morbida': false,
    'jungle-jump': false
  });

  const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritesState(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleFilterClick = (catKey: string, filterName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFilters(prev => ({
      ...prev,
      [catKey]: filterName
    }));
  };

  const handleCardClick = (item: CategoryScreenItem, catKey: string) => {
    if (onSelectActivity) {
      // Mock un oggetto Activity compatibile per aprire il modale di dettaglio
      const activityPayload: Activity = {
        id: item.id,
        title: item.title,
        subtitle: item.description || item.title,
        categoryId: (catKey === 'musei' ? 'cultura' : catKey === 'ludoteche' ? 'indoor' : catKey as any) || 'parchi',
        categoryName: CATEGORY_SCREENS_CONFIG[catKey]?.title || item.title,
        targetAudience: 'bimbi',
        targetAudienceLabel: 'Per Bimbi 👶',
        venueId: item.id,
        venueName: item.location,
        zone: item.location,
        address: item.location,
        city: 'Palermo',
        distanceKm: 1.5,
        ageMin: 3,
        ageMax: 12,
        rating: 4.9,
        reviewCount: 38,
        attendeesCount: 50,
        price: item.price ? (parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0) : 0,
        priceUnit: 'bambino',
        courseType: 'single',
        image: item.image,
        gallery: [item.image],
        badges: item.badges,
        description: item.description || item.title,
        whatToBring: ['Scarpe comode', 'Borraccia d\'acqua'],
        requirements: ['Consigliata prenotazione anticipata'],
        slots: [
          {
            id: 'slot-1',
            dayOfWeek: 'Sabato 16 Maggio',
            time: '10:00 - 12:30',
            availableSeats: 8,
            startDate: '2026-05-16'
          }
        ],
        organizer: {
          name: 'Mamapp Partner Verificato',
          avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
          role: 'Organizzatore Verificato'
        },
        latitude: 38.1157,
        longitude: 13.3615
      };
      onSelectActivity(activityPayload);
    }
  };

  /**
   * Componente singolo Schermo Mobile iOS
   */
  const renderMobileScreen = (catKey: 'parchi' | 'musei' | 'laboratori' | 'ludoteche', isCompact = true) => {
    const config = CATEGORY_SCREENS_CONFIG[catKey];
    const activeFilter = activeFilters[catKey] || 'Tutti';

    return (
      <div 
        key={catKey}
        className={`w-full bg-[#F3F4F6] rounded-[34px] sm:rounded-[40px] overflow-hidden border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col relative transition-all duration-300 ${
          isCompact ? 'max-w-[430px] mx-auto' : 'max-w-md mx-auto shadow-2xl'
        }`}
        style={{ minHeight: isCompact ? '690px' : '740px' }}
      >
        {/* ========================================================================= */}
        {/* 1. HEADER HERO: Copertina Emozionale con Dark Gradient Overlay           */}
        {/* - 2 Semi-transparent circular buttons: Back arrow sx, Search dx           */}
        {/* - Titolo grande bianco in grassetto e sottotitolo piccolo bianco          */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[220px] sm:h-[240px] shrink-0 overflow-hidden select-none bg-slate-900">
          <img 
            src={config.heroImage} 
            alt={config.title}
            className="w-full h-full object-cover object-center transform scale-105" 
          />
          
          {/* Dark gradient overlay per garantire massima leggibilità del testo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85" />

          {/* Top buttons semi-trasparenti circolare stile Apple iOS */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBackToHome();
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/25 shadow-md active:scale-90 transition-all cursor-pointer"
              title="Indietro"
              aria-label="Indietro"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (viewMode === 'grid2x2') {
                  setFocusedCategory(catKey);
                  setViewMode('single');
                }
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/25 shadow-md active:scale-90 transition-all cursor-pointer"
              title="Cerca in questa categoria"
              aria-label="Cerca"
            >
              <Search className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
          </div>

          {/* Titolo e Sottotitolo posizionati in basso sopra la copertina */}
          <div className="absolute bottom-6 inset-x-5 z-10">
            <h1 className="text-2xl sm:text-[26px] font-black tracking-tight text-white drop-shadow-md leading-tight mb-1">
              {config.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-xs line-clamp-2">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CORPO DELLA SCHERMATA: Foglio Bianco Fluttuante con angoli arrotondati */}
        {/* ========================================================================= */}
        <div className="flex-1 bg-[#F9FAFB] rounded-t-[26px] -mt-4 relative z-10 flex flex-col pt-3 pb-20 px-4 sm:px-5">
          
          {/* Maniglia pillola iOS */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />

          {/* 3. ROW DEI FILTRI: Pillole orizzontali scorrevoli                          */}
          {/* - Il primo attivo ("Tutti") in Deep Magenta/Raspberry-Pink (#B81D5B)     */}
          {/* - Gli altri in grigio chiaro con testo scuro                              */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-2.5">
            {config.filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={(e) => handleFilterClick(catKey, filter, e)}
                  style={{
                    backgroundColor: isActive ? BRAND_MAGENTA : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#334155',
                    borderColor: isActive ? BRAND_MAGENTA : '#E2E8F0'
                  }}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all shadow-2xs cursor-pointer active:scale-95 ${
                    isActive ? 'shadow-xs' : 'hover:bg-slate-50'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* 4. CONTEGGIO RISULTATI: Testo piccolo grigio scuro                        */}
          <div className="text-[11px] font-semibold text-slate-500 mb-2.5 px-0.5">
            {config.resultsCountText}
          </div>

          {/* 5. LISTA VERTICALE DELLE CARD BIANCHE PULITE                              */}
          {/* - Thumbnail quadrata con angoli arrotondati a sinistra                    */}
          {/* - Titolo in grassetto, pin rosso con posizione, badge grigi discreti     */}
          {/* - Icona cuore in alto a destra                                           */}
          {/* - Pulsante circolare magenta con freccia bianca '>' in basso a destra    */}
          <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
            {config.items.map((item) => {
              const isFav = favoritesState[item.id] ?? item.isFavorite;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item, catKey)}
                  className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-pointer flex gap-3 relative group"
                >
                  {/* Thumbnail quadrata angoli arrotondati */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Dettagli centro-destra */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 pr-8">
                    <div>
                      {/* Titolo Attività */}
                      <h2 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#B81D5B] transition-colors">
                        {item.title}
                      </h2>

                      {/* Posizione con Pin minimalist */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <span className="text-rose-500 text-xs">📍</span>
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    {/* Riga con piccoli badge discreti per le caratteristiche */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {item.badges.map((badge, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-full border border-slate-200/60 whitespace-nowrap"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icona Cuore in alto a destra */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#B81D5B] transition-colors cursor-pointer active:scale-90"
                    title="Aggiungi ai preferiti"
                    aria-label="Preferito"
                  >
                    <Heart 
                      className={`w-4.5 h-4.5 transition-colors ${
                        isFav 
                          ? 'fill-[#B81D5B] text-[#B81D5B]' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`} 
                    />
                  </button>

                  {/* Pulsante circolare magenta con freccia bianca '>' in basso a destra */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item, catKey);
                    }}
                    style={{ backgroundColor: BRAND_MAGENTA }}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full text-white flex items-center justify-center shadow-xs hover:brightness-110 active:scale-95 transition-transform cursor-pointer"
                    title="Vedi dettagli"
                    aria-label="Dettagli"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.6]" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 6. FOOTER TAB BAR: Standard iOS 5-Tab Navigation Bar                        */}
        {/* - Tab 1 ("Home") ATTIVA evidenziata con cerchio deep magenta / raspberry   */}
        {/* - Icone: Home (attiva), Mappa, Calendario, Preferiti (2), Biglietti (1)    */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-2 flex items-center justify-around z-20 shadow-lg">
          
          {/* Tab 1: Home (ATTIVA con cerchio magenta #B81D5B) */}
          <button
            type="button"
            onClick={onBackToHome}
            className="flex flex-col items-center gap-0.5 cursor-pointer group"
          >
            <div 
              style={{ backgroundColor: BRAND_MAGENTA }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span style={{ color: BRAND_MAGENTA }} className="text-[9px] font-bold tracking-tight">
              Home
            </span>
          </button>

          {/* Tab 2: Mappa */}
          <button
            type="button"
            onClick={onOpenMap}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5 stroke-[1.8]" />
            </div>
            <span className="text-[9px] font-medium tracking-tight">
              Mappa
            </span>
          </button>

          {/* Tab 3: Calendario */}
          <button
            type="button"
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5 stroke-[1.8]" />
            </div>
            <span className="text-[9px] font-medium tracking-tight">
              Calendario
            </span>
          </button>

          {/* Tab 4: Preferiti (con badge 2) */}
          <button
            type="button"
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 cursor-pointer relative"
          >
            <div className="w-7 h-7 flex items-center justify-center relative">
              <Heart className="w-4.5 h-4.5 stroke-[1.8]" />
              <span 
                style={{ backgroundColor: BRAND_MAGENTA }}
                className="absolute -top-0.5 -right-1 text-[8px] font-extrabold text-white w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs"
              >
                2
              </span>
            </div>
            <span className="text-[9px] font-medium tracking-tight">
              Preferiti
            </span>
          </button>

          {/* Tab 5: Biglietti (con badge 1) */}
          <button
            type="button"
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 cursor-pointer relative"
          >
            <div className="w-7 h-7 flex items-center justify-center relative">
              <Ticket className="w-4.5 h-4.5 stroke-[1.8]" />
              <span 
                style={{ backgroundColor: BRAND_MAGENTA }}
                className="absolute -top-0.5 -right-1 text-[8px] font-extrabold text-white w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs"
              >
                1
              </span>
            </div>
            <span className="text-[9px] font-medium tracking-tight">
              Biglietti
            </span>
          </button>

        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans antialiased py-4 sm:py-6 px-3 sm:px-6">
      
      {/* ========================================================================= */}
      {/* PRESENTATION TOP BAR / CONTROL STRIP                                      */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto mb-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              style={{ backgroundColor: BRAND_MAGENTA }} 
              className="text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            >
              iOS UI Presentation
            </span>
            <span className="text-xs text-slate-400 font-medium">
              4 Schermate Categoria Mamapp (Palermo)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Presentazione Griglia 2x2 Categorie
          </h1>
        </div>

        {/* Switcher & Azioni */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setViewMode('grid2x2')}
            style={{
              backgroundColor: viewMode === 'grid2x2' ? BRAND_MAGENTA : '#F1F5F9',
              color: viewMode === 'grid2x2' ? '#FFFFFF' : '#475569'
            }}
            className="text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            ⊞ Griglia 2x2 (Showcase)
          </button>

          {/* Pulsanti Categorie Dirette */}
          {(['parchi', 'musei', 'laboratori', 'ludoteche'] as const).map((key) => {
            const isSel = viewMode === 'single' && focusedCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setFocusedCategory(key);
                  setViewMode('single');
                }}
                style={{
                  backgroundColor: isSel ? BRAND_MAGENTA : '#F8FAFC',
                  color: isSel ? '#FFFFFF' : '#64748B',
                  borderColor: isSel ? BRAND_MAGENTA : '#E2E8F0'
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer capitalize hidden sm:inline-block"
              >
                {key}
              </button>
            );
          })}

          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs font-bold text-slate-700 hover:text-[#B81D5B] bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            Home
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2X2 PRESENTATION GRID MODE                                                */}
      {/* Exact 2x2 grid of 4 category listing screens matching user mockup         */}
      {/* ========================================================================= */}
      {viewMode === 'grid2x2' ? (
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* 1. Top-Left: "Parchi e Natura" */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  1. Top-Left: Parchi e Natura
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedCategory('parchi');
                    setViewMode('single');
                  }}
                  className="text-[11px] font-semibold text-[#B81D5B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  Ingrandisci
                </button>
              </div>
              {renderMobileScreen('parchi', true)}
            </div>

            {/* 2. Top-Right: "Musei e Cultura" */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  2. Top-Right: Musei e Cultura
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedCategory('musei');
                    setViewMode('single');
                  }}
                  className="text-[11px] font-semibold text-[#B81D5B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  Ingrandisci
                </button>
              </div>
              {renderMobileScreen('musei', true)}
            </div>

            {/* 3. Bottom-Left: "Laboratori Creativi" */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  3. Bottom-Left: Laboratori Creativi
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedCategory('laboratori');
                    setViewMode('single');
                  }}
                  className="text-[11px] font-semibold text-[#B81D5B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  Ingrandisci
                </button>
              </div>
              {renderMobileScreen('laboratori', true)}
            </div>

            {/* 4. Bottom-Right: "Ludoteche e Spazi Gioco" */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  4. Bottom-Right: Ludoteche e Spazi Gioco
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedCategory('ludoteche');
                    setViewMode('single');
                  }}
                  className="text-[11px] font-semibold text-[#B81D5B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  Ingrandisci
                </button>
              </div>
              {renderMobileScreen('ludoteche', true)}
            </div>

          </div>

          {/* Quick notice note */}
          <div className="mt-8 text-center text-xs text-slate-400">
            Tutte e 4 le schermate condividono fedelmente la palette a due colori: 
            <strong className="text-[#B81D5B] font-semibold"> Deep Magenta (#B81D5B)</strong> per gli elementi attivi, 
            e <strong className="text-slate-800 font-semibold">Teal/Slate</strong> per la struttura, con sfondi puri bianchi per le card.
          </div>

        </div>
      ) : (
        /* SINGLE SCREEN FOCUSED INTERACTIVE VIEW */
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid2x2')}
              className="text-xs font-bold text-[#B81D5B] flex items-center gap-1 hover:underline cursor-pointer"
            >
              ← Torna alla Griglia 2x2
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Categoria attiva:</span>
              <span className="text-xs font-bold text-slate-900 capitalize">
                {CATEGORY_SCREENS_CONFIG[focusedCategory].title}
              </span>
            </div>
          </div>

          <div className="py-2">
            {renderMobileScreen(focusedCategory, false)}
          </div>
        </div>
      )}

    </div>
  );
};
