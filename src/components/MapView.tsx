import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Star, ChevronRight, X, Compass, ExternalLink, Calendar, Users, Filter, Maximize2, Minimize2 } from 'lucide-react';
import { Activity } from '../types';
import { CATEGORIES } from '../data/mockData';

interface MapViewProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  className?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

// Center of Palermo city (Teatro Politeama / Viale Libertà area)
const PALERMO_CENTER: [number, number] = [38.1320, 13.3550];
const PALERMO_DEFAULT_ZOOM = 13;

// Helper to get emoji icon for categories in Leaflet HTML markers
const getCategoryIconEmoji = (categoryId: string): string => {
  switch (categoryId) {
    case 'concerti': return '🎟️';
    case 'yoga': return '🧘‍♀️';
    case 'gokart': return '🏎️';
    case 'mare': return '🏖️';
    case 'piscina': return '🏊';
    case 'sport': return '⚽';
    case 'parchi': return '🌳';
    case 'laboratori': return '🎨';
    case 'ristoranti': return '🍕';
    default: return '✨';
  }
};

export const MapView: React.FC<MapViewProps> = ({
  activities,
  onSelectActivity,
  className = '',
  isFullscreen: externalFullscreen,
  onToggleFullscreen: externalToggleFullscreen
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [internalFullscreen, setInternalFullscreen] = useState(false);
  const isFullscreen = externalFullscreen !== undefined ? externalFullscreen : internalFullscreen;

  const handleToggleFullscreen = () => {
    if (externalToggleFullscreen) {
      externalToggleFullscreen();
    } else {
      setInternalFullscreen(!internalFullscreen);
    }
  };

  const [selectedActivityOnMap, setSelectedActivityOnMap] = useState<Activity | null>(
    activities[0] || null
  );

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Trigger leaflet resize whenever fullscreen toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Filter activities for map view if local filter is active
  const filteredMapActivities = activities.filter(act => {
    if (activeCategoryFilter !== 'all' && act.categoryId !== activeCategoryFilter) return false;
    return true;
  });

  // Initialize Leaflet Map on mount
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: PALERMO_CENTER,
      zoom: PALERMO_DEFAULT_ZOOM,
      zoomControl: false,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Custom zoom control in top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Markers whenever `filteredMapActivities` or `selectedActivityOnMap` changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (filteredMapActivities.length === 0) return;

    filteredMapActivities.forEach((act) => {
      const lat = act.latitude || 38.1157;
      const lng = act.longitude || 13.3615;

      const isSelected = selectedActivityOnMap?.id === act.id;
      const catObj = CATEGORIES.find(c => c.id === act.categoryId);
      const catColor = catObj?.color || '#0284c7';
      const catEmoji = getCategoryIconEmoji(act.categoryId);

      const priceText = act.price === 0 ? 'GRATIS' : `€${act.price}`;

      // Booking.com style pill badge icon
      const customIcon = L.divIcon({
        className: 'booking-style-marker-icon',
        html: `
          <div style="
            position: relative; 
            transform: translate(-50%, -100%); 
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: ${isSelected ? '999' : '10'};
          ">
            <div style="
              background-color: ${isSelected ? '#0F172A' : '#FFFFFF'};
              color: ${isSelected ? '#FFFFFF' : '#0F172A'};
              padding: 5px 11px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: 800;
              font-family: system-ui, -apple-system, sans-serif;
              box-shadow: ${isSelected ? '0 12px 24px -4px rgba(15, 23, 42, 0.45), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' : '0 6px 16px -2px rgba(0, 0, 0, 0.18), 0 2px 4px -1px rgba(0, 0, 0, 0.08)'};
              border: 2px solid ${isSelected ? '#38BDF8' : catColor};
              display: flex;
              align-items: center;
              gap: 6px;
              white-space: nowrap;
              transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'};
              cursor: pointer;
            ">
              <span style="
                font-size: 13px; 
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
              ">${catEmoji}</span>
              <span style="
                letter-spacing: -0.01em; 
                color: ${isSelected ? '#38BDF8' : '#0F172A'};
              ">${priceText}</span>
            </div>
            
            <!-- Pin Pointer Triangle -->
            <div style="
              width: 0; 
              height: 0; 
              border-left: 6px solid transparent; 
              border-right: 6px solid transparent; 
              border-top: 7px solid ${isSelected ? '#0F172A' : '#FFFFFF'}; 
              margin: 0 auto;
              margin-top: -1px;
              filter: drop-shadow(0 2px 2px rgba(0,0,0,0.15));
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedActivityOnMap(act);
        map.flyTo([lat, lng], 14, { duration: 0.8 });
      });

      markersRef.current.push(marker);
    });

  }, [filteredMapActivities, selectedActivityOnMap]);

  // Recenter on Palermo
  const handleRecenterPalermo = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(PALERMO_CENTER, PALERMO_DEFAULT_ZOOM, { duration: 1 });
    }
  };

  return (
    <div className={`relative w-full bg-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 rounded-0 shadow-2xl h-screen' 
        : 'h-full min-h-[550px] sm:min-h-[650px] rounded-2xl border border-slate-200/90 shadow-md'
    } ${className}`}>
      
      {/* Real OpenStreetMap Leaflet Canvas Centered on Palermo */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Map Header Overlay with Category Quick Filters */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none">
        
        {/* Top Badge, Palermo Recenter & Fullscreen Button */}
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          <div className="bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700/80 text-xs font-bold flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>Mappa Palermo ({filteredMapActivities.length} eventi)</span>
          </div>

          <button
            onClick={handleRecenterPalermo}
            className="bg-white/95 text-slate-800 hover:bg-slate-100 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all"
            title="Centra la mappa su Palermo"
          >
            <Compass className="w-3.5 h-3.5 text-pink-600" />
            <span className="hidden sm:inline">Centra Palermo</span>
          </button>

          {/* Fullscreen Expansion Toggle Button */}
          <button
            onClick={handleToggleFullscreen}
            className={`backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
              isFullscreen
                ? 'bg-pink-600 text-white border-pink-700 hover:bg-pink-700'
                : 'bg-white/95 text-slate-800 hover:bg-slate-100 border-slate-200'
            }`}
            title={isFullscreen ? 'Riduci visualizzazione' : 'Ingrandisci a schermo intero'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Riduci Mappa</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Espandi a Tutto Schermo</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Category Pills on Map */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-md border border-slate-200/90 max-w-full overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeCategoryFilter === 'all'
                ? 'bg-pink-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tutti ({activities.length})
          </button>
          {CATEGORIES.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeCategoryFilter === cat.id
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{getCategoryIconEmoji(cat.id)}</span>
              <span>{cat.name.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Booking.com Style Bottom Floating Property Preview Card */}
      {selectedActivityOnMap && (
        <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4 z-20 max-w-xl mx-auto bg-white rounded-[24px] p-3.5 sm:p-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200">
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200/80">
                {selectedActivityOnMap.targetAudienceLabel}
              </span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                Ages: {selectedActivityOnMap.ageMin}-{selectedActivityOnMap.ageMax} anni
              </span>
            </div>

            <button
              onClick={() => setSelectedActivityOnMap(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Chiudi anteprima"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div 
            onClick={() => onSelectActivity(selectedActivityOnMap)}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <img
              src={selectedActivityOnMap.image}
              alt={selectedActivityOnMap.title}
              className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                {selectedActivityOnMap.title}
              </h4>
              
              <p className="text-xs text-slate-500 font-semibold truncate mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="truncate">{selectedActivityOnMap.venueName} — <strong>{selectedActivityOnMap.zone}</strong></span>
              </p>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-base font-black text-slate-900">
                  {selectedActivityOnMap.price === 0 ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">GRATIS</span>
                  ) : (
                    <span><span className="text-xs font-semibold text-slate-500 pr-0.5">da</span> €{selectedActivityOnMap.price}</span>
                  )}
                </span>

                <span className="text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full font-black border border-amber-200/80 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  {selectedActivityOnMap.rating}
                </span>

                {selectedActivityOnMap.slots[0] && (
                  <span className="text-[11px] text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full font-bold border border-sky-100 hidden sm:inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-600" />
                    {selectedActivityOnMap.slots[0].dayOfWeek.split(' ')[0]}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <p className="text-[11px] text-slate-500 font-medium truncate hidden sm:block">
              Clicca per dettagli, date e prenotazione posto
            </p>

            <button
              onClick={() => onSelectActivity(selectedActivityOnMap)}
              className="w-full sm:w-auto ml-auto bg-sky-600 hover:bg-sky-700 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-sky-200"
            >
              <span>Vedi Dettagli & Prenota</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};


