import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Heart,
  Search,
  Navigation,
  Calendar,
  SlidersHorizontal,
  Plus,
  Minus,
  X,
  MapPin,
  Clock,
  Palette,
  Trees,
  Waves,
  Home as HomeIcon,
  MoreHorizontal,
  User,
  List,
  Star,
  Baby
} from 'lucide-react';
import { Activity, CategoryId } from '../types';
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

// ---------------------------------------------------------------------------
// Mappa: impostazioni
// ---------------------------------------------------------------------------

// Centro di Palermo (zona Politeama / Libertà)
const PALERMO_CENTER: L.LatLngTuple = [38.1320, 13.3550];
const PALERMO_ZOOM = 12;

// Sfondo mappa: OpenStreetMap (gratuito, senza chiave), reso più chiaro e
// tenue via CSS (.mamapp-map .leaflet-tile-pane in index.css) per uno stile pulito.
// Va bene per prototipo e test. Con molti utenti serve un fornitore con chiave
// (es. MapTiler, Stadia Maps): basta cambiare TILE_URL e TILE_ATTRIBUTION.
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

// ---------------------------------------------------------------------------
// Categorie della mappa (le stesse 6 della Home)
// ---------------------------------------------------------------------------

type MapCategoryId = 'creativi' | 'parchi' | 'sport' | 'spazi' | 'eventi' | 'altro';

const MAP_CATEGORIES: {
  id: MapCategoryId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  border: string;
  text: string;
  activeRing: string;
}[] = [
  { id: 'creativi', label: 'Creativi', icon: Palette, bg: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-600', activeRing: 'ring-brand-600' },
  { id: 'parchi', label: 'Parchi', icon: Trees, bg: 'bg-[#ECFDF5]', border: 'border-[#A7F3D0]', text: 'text-[#059669]', activeRing: 'ring-[#059669]' },
  { id: 'sport', label: 'Sport', icon: Waves, bg: 'bg-petrolio-50', border: 'border-petrolio-200', text: 'text-petrolio-600', activeRing: 'ring-petrolio-600' },
  { id: 'spazi', label: 'Spazi', icon: HomeIcon, bg: 'bg-[#FFF7ED]', border: 'border-[#FED7AA]', text: 'text-[#EA580C]', activeRing: 'ring-[#EA580C]' },
  { id: 'eventi', label: 'Eventi', icon: Calendar, bg: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-500', activeRing: 'ring-brand-500' },
  { id: 'altro', label: 'Altro', icon: MoreHorizontal, bg: 'bg-[#F8FAFC]', border: 'border-[#E2E8F0]', text: 'text-[#64748B]', activeRing: 'ring-[#64748B]' }
];

// Ogni categoria dell'app finisce in uno dei 6 gruppi della mappa
const CATEGORY_GROUP: Record<CategoryId, MapCategoryId> = {
  laboratori: 'creativi',
  cultura: 'creativi',
  parchi: 'parchi',
  mare: 'parchi',
  sport: 'sport',
  piscina: 'sport',
  yoga: 'sport',
  gokart: 'sport',
  indoor: 'spazi',
  ristoranti: 'spazi',
  circoli: 'spazi',
  concerti: 'eventi',
  musica: 'eventi',
  cinema: 'eventi',
  feste: 'eventi',
  benessere: 'altro',
  lingue: 'altro',
  trasporti: 'altro'
};

const groupOf = (act: Activity): MapCategoryId => CATEGORY_GROUP[act.categoryId] || 'altro';
const categoryOf = (act: Activity) => MAP_CATEGORIES.find((c) => c.id === groupOf(act)) || MAP_CATEGORIES[5];

// Piccola icona nei pin (testo semplice, perché i pin sono HTML disegnato dalla mappa)
const GROUP_EMOJI: Record<MapCategoryId, string> = {
  creativi: '🎨',
  parchi: '🌳',
  sport: '⚽',
  spazi: '🏠',
  eventi: '🎉',
  altro: '✨'
};

const formatAge = (act: Activity) => {
  if (act.ageMax >= 99) return `da ${act.ageMin} anni`;
  if (act.ageMin === 0 && act.ageMax <= 1) return '0-12 mesi';
  return `${act.ageMin}-${act.ageMax} anni`;
};

// ---------------------------------------------------------------------------
// Utilità
// ---------------------------------------------------------------------------

const hasCoordinates = (act: Activity) =>
  Number.isFinite(act.latitude) && Number.isFinite(act.longitude) && act.latitude !== 0 && act.longitude !== 0;

const formatPrice = (act: Activity) => (act.price > 0 ? `€${act.price}` : 'Gratis');

const firstTime = (act: Activity) => act.slots?.[0]?.time || '';

// Più attività nello stesso luogo diventano un solo pin ("3 attività")
interface MapPlace {
  key: string;
  lat: number;
  lng: number;
  venueName: string;
  activities: Activity[];
}

const buildPlaces = (activities: Activity[]): MapPlace[] => {
  const byKey = new Map<string, MapPlace>();
  activities.filter(hasCoordinates).forEach((act) => {
    const key = `${act.latitude.toFixed(4)},${act.longitude.toFixed(4)}`;
    const place = byKey.get(key);
    if (place) {
      place.activities.push(act);
    } else {
      byKey.set(key, { key, lat: act.latitude, lng: act.longitude, venueName: act.venueName, activities: [act] });
    }
  });
  return Array.from(byKey.values());
};

// Luoghi vicini sullo schermo diventano un solo pin, così i pin non si sovrappongono.
// Il raggruppamento si ricalcola a ogni zoom.
interface MapCluster {
  key: string;
  lat: number;
  lng: number;
  places: MapPlace[];
  activities: Activity[];
}

const CLUSTER_RADIUS_PX = 58;

const buildClusters = (places: MapPlace[], map: L.Map | null): MapCluster[] => {
  const clusters: (MapCluster & { point?: L.Point })[] = [];
  places.forEach((place) => {
    const point = map ? map.project([place.lat, place.lng], map.getZoom()) : undefined;
    const near = point
      ? clusters.find((c) => c.point && c.point.distanceTo(point) < CLUSTER_RADIUS_PX)
      : undefined;
    if (near) {
      near.places.push(place);
      near.activities.push(...place.activities);
      near.key = `${near.key}+${place.key}`;
    } else {
      clusters.push({ key: place.key, lat: place.lat, lng: place.lng, places: [place], activities: [...place.activities], point });
    }
  });
  return clusters.map((c) => ({
    key: c.key,
    places: c.places,
    activities: c.activities,
    lat: c.places.reduce((sum, p) => sum + p.lat, 0) / c.places.length,
    lng: c.places.reduce((sum, p) => sum + p.lng, 0) / c.places.length
  }));
};

const markerLabel = (cluster: MapCluster) => {
  if (cluster.activities.length === 1) {
    const act = cluster.activities[0];
    return `<span class="mamapp-marker__icon">${GROUP_EMOJI[groupOf(act)]}</span>${formatPrice(act)}`;
  }
  return `${cluster.activities.length} attività`;
};

const makeMarkerIcon = (cluster: MapCluster, isSelected: boolean) =>
  L.divIcon({
    className: 'mamapp-marker',
    html: `<div class="mamapp-marker__pill${isSelected ? ' is-selected' : ''}${cluster.activities.length > 1 ? ' is-group' : ''}">${markerLabel(cluster)}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export const MapScreenView: React.FC<MapScreenViewProps> = ({
  activities = [],
  favorites = [],
  onToggleFavorite,
  onSelectActivity,
  onOpenFilters,
  isActive = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<MapCategoryId | 'all'>('all');
  const [selectedPlaceKey, setSelectedPlaceKey] = useState<string | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  // Quando si tocca un gruppo già al massimo zoom, la lista mostra solo quelle attività
  const [listScope, setListScope] = useState<{ title: string; activities: Activity[] } | null>(null);
  // Cambia a ogni zoom, per ricalcolare i gruppi di pin
  const [zoomTick, setZoomTick] = useState(0);
  // Attività evidenziata nella fila di schede in fondo alla mappa
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollTimerRef = useRef<number | undefined>(undefined);
  const isProgrammaticScrollRef = useRef(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Attività visibili: filtri dell'app + categoria + ricerca di questa schermata
  const displayedActivities = useMemo(() => {
    let list = activities;
    if (selectedCategoryId !== 'all') {
      list = list.filter((act) => groupOf(act) === selectedCategoryId);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((act) =>
        [act.title, act.venueName, act.zone, act.address, act.categoryName]
          .filter(Boolean)
          .some((text) => String(text).toLowerCase().includes(q))
      );
    }
    return list;
  }, [activities, selectedCategoryId, searchQuery]);

  const places = useMemo(() => buildPlaces(displayedActivities), [displayedActivities]);
  const clusters = useMemo(
    () => buildClusters(places, mapRef.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [places, zoomTick]
  );
  const listActivities = listScope ? listScope.activities : displayedActivities;

  // 1. Crea la mappa una sola volta
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: PALERMO_CENTER,
      zoom: PALERMO_ZOOM,
      zoomControl: false,
      attributionControl: true
    });
    map.attributionControl.setPrefix(false);
    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    map.on('click', () => {
      setSelectedPlaceKey(null);
      setSelectedActivityId(null);
    });
    map.on('zoomend', () => setZoomTick((t) => t + 1));
    mapRef.current = map;

    // La mappa deve ricalcolare le dimensioni quando il riquadro cambia
    // (es. quando si apre la scheda Mappa): era la causa della mappa "grigia" o tagliata.
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(mapContainerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // 2. Disegna i pin ogni volta che cambiano le attività o la selezione
  useEffect(() => {
    const layer = markersLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    const map = mapRef.current;
    clusters.forEach((cluster) => {
      const isSelected = cluster.places.length === 1 && cluster.places[0].key === selectedPlaceKey;
      const marker = L.marker([cluster.lat, cluster.lng], {
        icon: makeMarkerIcon(cluster, isSelected),
        zIndexOffset: isSelected ? 1000 : 0,
        keyboard: true,
        title: cluster.places.length === 1 ? cluster.places[0].venueName : `${cluster.activities.length} attività`
      });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (cluster.activities.length === 1) {
          selectActivity(cluster.activities[0], { scrollCard: true, panMap: false });
          return;
        }
        setSelectedPlaceKey(null);
        // Gruppo di luoghi diversi: avvicina la mappa finché si separano
        const bounds = L.latLngBounds(cluster.places.map((p) => [p.lat, p.lng] as L.LatLngTuple));
        const spreadMeters = bounds.getSouthWest().distanceTo(bounds.getNorthEast());
        if (map && cluster.places.length > 1 && spreadMeters > 150 && map.getZoom() < 17) {
          map.flyToBounds(bounds, { paddingTopLeft: [40, 110], paddingBottomRight: [70, 230], maxZoom: 17, duration: 0.5 });
          return;
        }
        // Stesso luogo (o zoom massimo): apri la lista di quelle attività
        setListScope({
          title: cluster.places.length === 1 ? cluster.places[0].venueName : 'Attività in questa zona',
          activities: cluster.activities
        });
        setIsListOpen(true);
      });
      layer.addLayer(marker);
    });
  }, [clusters, selectedPlaceKey]);

  // 3. Inquadra tutti i pin quando cambia l'elenco (filtri, categoria, ricerca)
  const fitToPlaces = () => {
    const map = mapRef.current;
    if (!map) return;
    if (places.length === 0) {
      map.setView(PALERMO_CENTER, PALERMO_ZOOM);
      return;
    }
    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 15);
      return;
    }
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng] as L.LatLngTuple));
    map.fitBounds(bounds, { paddingTopLeft: [40, 110], paddingBottomRight: [70, 230], maxZoom: 15 });
  };

  useEffect(() => {
    setSelectedPlaceKey(null);
    setSelectedActivityId(null);
    fitToPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places.map((p) => p.key).join('|')]);

  // 4. Quando la scheda Mappa diventa visibile, ridisegna e inquadra
  useEffect(() => {
    if (!isActive || !mapRef.current) return;
    const id = window.setTimeout(() => {
      mapRef.current?.invalidateSize();
      fitToPlaces();
    }, 60);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  const showOnMap = (act: Activity) => {
    setIsListOpen(false);
    setListScope(null);
    mapRef.current?.flyTo([act.latitude, act.longitude], Math.max(mapRef.current.getZoom(), 15), { duration: 0.6 });
    // la fila di schede ricompare quando si chiude la lista: aspetta che sia disegnata
    window.setTimeout(() => selectActivity(act, { scrollCard: true, panMap: false }), 80);
  };

  const closeList = () => {
    setIsListOpen(false);
    setListScope(null);
  };

  const placeKeyOf = (act: Activity) => `${act.latitude.toFixed(4)},${act.longitude.toFixed(4)}`;

  // Seleziona un'attività: evidenzia il pin, porta in vista la scheda e, se serve, sposta la mappa
  function selectActivity(act: Activity, opts: { scrollCard: boolean; panMap: boolean }) {
    setSelectedActivityId(act.id);
    setSelectedPlaceKey(placeKeyOf(act));
    if (opts.scrollCard) {
      const card = cardRefs.current[act.id];
      if (card && carouselRef.current) {
        isProgrammaticScrollRef.current = true;
        carouselRef.current.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
        window.setTimeout(() => (isProgrammaticScrollRef.current = false), 600);
      }
    }
    const map = mapRef.current;
    if (opts.panMap && map && hasCoordinates(act) && !map.getBounds().pad(-0.15).contains([act.latitude, act.longitude])) {
      map.panTo([act.latitude, act.longitude], { animate: true });
    }
  }

  // Scorrendo le schede con il dito, si evidenzia il pin della scheda al centro
  const handleCarouselScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      const box = carouselRef.current;
      if (!box) return;
      const center = box.scrollLeft + box.clientWidth / 2;
      let best: Activity | null = null;
      let bestDist = Infinity;
      displayedActivities.forEach((act) => {
        const el = cardRefs.current[act.id];
        if (!el) return;
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = act;
        }
      });
      if (best && (best as Activity).id !== selectedActivityId) {
        selectActivity(best, { scrollCard: false, panMap: true });
      }
    }, 140);
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white text-slate-800 font-sans relative overflow-hidden ${className}`}>
      {/* 1. INTESTAZIONE: logo a sinistra; ricerca, filtri e account a destra */}
      <header className="bg-white px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-100 z-[500] shrink-0">
        <MamappLogo size="md" layout="horizontal" />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => document.getElementById('map-search-input')?.focus()}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
            aria-label="Cerca"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => onOpenFilters?.()}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
            aria-label="Filtri"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </button>
          <div
            className="w-9 h-9 rounded-full border border-brand-200 bg-brand-50 text-brand-600 flex items-center justify-center shadow-2xs"
            aria-label="Profilo"
          >
            <User className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
        </div>
      </header>

      {/* 2. RICERCA + CATEGORIE */}
      <section className="bg-white px-4 pt-2.5 pb-2 border-b border-slate-100 z-[500] shrink-0 space-y-2.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none stroke-[2.2]" />
          <input
            id="map-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca attività, luogo o quartiere..."
            className="w-full bg-white border border-slate-200/90 rounded-2xl py-2 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600/15 focus:border-brand-600 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
              aria-label="Cancella ricerca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1">
          {MAP_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(isSelected ? 'all' : cat.id)}
                aria-pressed={isSelected}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group active:scale-95 transition-transform"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${cat.bg} ${cat.border} ${
                    isSelected ? `ring-2 ${cat.activeRing} ring-offset-2 scale-105 shadow-xs` : 'shadow-2xs'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${cat.text} stroke-[2]`} />
                </div>
                <span className={`text-[11px] tracking-tight ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 font-semibold'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MAPPA */}
      <div className="flex-1 min-h-0 w-full relative">
        <div ref={mapContainerRef} className="mamapp-map absolute inset-0 z-0 bg-[#EEF1F4]" aria-label="Mappa delle attività a Palermo" />

        {/* Nessun risultato */}
        {places.length === 0 && (
          <div className="absolute inset-x-6 top-6 z-[450] bg-white rounded-2xl shadow-lg border border-slate-100 p-4 text-center">
            <p className="font-bold text-sm text-slate-900">Nessuna attività qui</p>
            <p className="text-xs text-slate-500 mt-1">Prova un'altra categoria o allarga i filtri.</p>
            <div className="flex justify-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 cursor-pointer"
              >
                Mostra tutto
              </button>
              <button
                type="button"
                onClick={() => onOpenFilters?.()}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600 text-white cursor-pointer"
              >
                Apri filtri
              </button>
            </div>
          </div>
        )}

        {/* Pulsante "Mostra lista" (in alto, al centro della mappa) */}
        {!isListOpen && displayedActivities.length > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[460]">
            <button
              type="button"
              onClick={() => {
                setListScope(null);
                setIsListOpen(true);
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 font-bold pl-3.5 pr-4 py-2 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-slate-200/80 flex items-center gap-2 text-[13px] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <List className="w-4 h-4 stroke-[2.4] text-brand-600" />
              <span>Mostra lista ({displayedActivities.length})</span>
            </button>
          </div>
        )}

        {/* Controlli: inquadra tutto + zoom (a destra, in alto) */}
        <div className="absolute right-3 top-3 z-[450] flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={fitToPlaces}
            aria-label="Mostra tutte le attività"
            className="w-10 h-10 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:text-brand-600 active:scale-95 transition-all cursor-pointer"
          >
            <Navigation className="w-[18px] h-[18px] stroke-[2.2]" />
          </button>
          <div className="w-10 rounded-2xl bg-white shadow-md border border-slate-100 flex flex-col items-center divide-y divide-slate-100 overflow-hidden">
            <button type="button" onClick={zoomIn} aria-label="Zoom avanti" className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
              <Plus className="w-[18px] h-[18px] stroke-[2.2]" />
            </button>
            <button type="button" onClick={zoomOut} aria-label="Zoom indietro" className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
              <Minus className="w-[18px] h-[18px] stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Fila di schede attività scorrevoli, sopra la barra di navigazione */}
        {!isListOpen && displayedActivities.length > 0 && (
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="absolute left-0 right-0 bottom-24 z-[460] flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-2 pt-1"
          >
            {displayedActivities.map((act) => {
              const cat = categoryOf(act);
              const CatIcon = cat.icon;
              const isSelected = act.id === selectedActivityId;
              const isFav = favorites.includes(act.id);
              const time = firstTime(act);
              return (
                <div
                  key={act.id}
                  ref={(el) => {
                    cardRefs.current[act.id] = el;
                  }}
                  onClick={() => onSelectActivity?.(act)}
                  className={`snap-start shrink-0 w-[84%] max-w-[340px] bg-white rounded-2xl p-2.5 flex gap-3 cursor-pointer transition-all shadow-[0_8px_24px_rgba(15,23,42,0.14)] border ${
                    isSelected ? 'border-brand-600 ring-2 ring-brand-600/20' : 'border-slate-100'
                  }`}
                >
                  {/* Foto con icona della categoria */}
                  <div className="relative w-[92px] h-[92px] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={act.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <span className={`absolute top-1.5 left-1.5 w-7 h-7 rounded-full flex items-center justify-center border shadow-xs ${cat.bg} ${cat.border}`}>
                      <CatIcon className={`w-3.5 h-3.5 ${cat.text} stroke-[2.2]`} />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${cat.text}`}>
                        {act.categoryName || cat.label}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite?.(act.id, e);
                        }}
                        className="-mt-0.5 -mr-0.5 p-0.5 text-slate-300 hover:text-brand-600 cursor-pointer shrink-0"
                        aria-label={isFav ? 'Togli dai preferiti' : 'Aggiungi ai preferiti'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-600 text-brand-600' : ''}`} />
                      </button>
                    </div>

                    <h4 className="font-bold text-[13.5px] leading-snug text-slate-900 line-clamp-2">{act.title}</h4>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-500 mt-1">
                      {time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-petrolio-600" /> {time}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Baby className="w-3 h-3 text-petrolio-600" /> {formatAge(act)}
                      </span>
                    </div>

                    <div className="mt-auto pt-1 flex items-end justify-between gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 min-w-0">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{act.zone || act.venueName}</span>
                        {act.rating > 0 && (
                          <span className="flex items-center gap-0.5 shrink-0 ml-1 text-slate-600 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {act.rating.toFixed(1)}
                          </span>
                        )}
                      </span>
                      <span className="text-[15px] font-extrabold text-brand-600 shrink-0 leading-none">
                        {formatPrice(act)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lista delle attività (cassetto dal basso) */}
        {isListOpen && (
          <div className="absolute inset-0 z-[600] flex flex-col justify-end bg-black/30" onClick={closeList}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl shadow-2xl max-h-[85%] flex flex-col w-full overflow-hidden pb-2"
            >
              <div className="pt-3 pb-2.5 px-5 flex flex-col items-center border-b border-slate-100 shrink-0">
                <div className="w-10 h-1 bg-slate-200 rounded-full mb-3" />
                <div className="w-full flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-slate-900 truncate">
                      {listScope ? listScope.title : 'Attività sulla mappa'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {listActivities.length} attività
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeList}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer shrink-0"
                    aria-label="Chiudi lista"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto p-4 space-y-3 min-h-0 flex-1">
                {listActivities.map((act) => {
                  const isFav = favorites.includes(act.id);
                  const time = firstTime(act);
                  return (
                    <div
                      key={act.id}
                      onClick={() => onSelectActivity?.(act)}
                      className="bg-white rounded-2xl border border-slate-100 p-3 hover:border-slate-300 transition-all cursor-pointer flex gap-3 items-center relative"
                    >
                      <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img src={act.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600 truncate">
                          {act.categoryName || act.zone}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 truncate">{act.title}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{act.venueName}</span>
                          {time && (
                            <>
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                              <span className="shrink-0">{time}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-sm font-extrabold text-brand-600">{formatPrice(act)}</span>
                          {!listScope && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                showOnMap(act);
                              }}
                              className="text-xs font-semibold text-petrolio-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <MapPin className="w-3 h-3" /> Sulla mappa
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite?.(act.id, e);
                        }}
                        className="absolute top-3 right-3 p-1 text-slate-300 hover:text-brand-600 transition-colors cursor-pointer"
                        aria-label={isFav ? 'Togli dai preferiti' : 'Aggiungi ai preferiti'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-600 text-brand-600' : ''}`} />
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
