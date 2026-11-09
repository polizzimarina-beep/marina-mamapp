import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Award, 
  Filter,
  Share2,
  X,
  Search,
  Users,
  Building2,
  Printer,
  Sparkles,
  Info,
  ChevronDown
} from 'lucide-react';
import { OrganizerProfile, Activity, ActivitySlot, InternalRequest } from '../types';

interface OrganizerProfilePageProps {
  organizer: OrganizerProfile;
  onBack: () => void;
  organizerActivities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onOpenBooking: (activity: Activity) => void;
  internalRequests?: InternalRequest[];
  initialTab?: 'activities' | 'palinsesto' | 'requests';
}

export const OrganizerProfilePage: React.FC<OrganizerProfilePageProps> = ({
  organizer,
  onBack,
  organizerActivities,
  onSelectActivity,
  onOpenBooking,
  internalRequests = [],
  initialTab = 'activities'
}) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'palinsesto' | 'requests'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [selectedPalinsestoDay, setSelectedPalinsestoDay] = useState<string>('all');
  const [selectedActivityForSlots, setSelectedActivityForSlots] = useState<Activity | null>(null);
  const [showWeeklyOverlayModal, setShowWeeklyOverlayModal] = useState<boolean>(false);
  const [palinsestoSearch, setPalinsestoSearch] = useState<string>('');
  const [palinsestoViewMode, setPalinsestoViewMode] = useState<'matrix' | 'cards'>('matrix');

  const months = ['all', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const weekDays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

  const getStartTime = (timeStr: string): string => {
    if (!timeStr) return '09:00';
    const parts = timeStr.split('-');
    return parts[0].trim();
  };

  const getOnlyDuration = (timeStr: string): string => {
    if (!timeStr) return '50 min';
    const parts = timeStr.split('-');
    if (parts.length < 2) return '50 min';
    const parseMins = (s: string) => {
      const [h, m] = s.trim().split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const startMins = parseMins(parts[0]);
    const endMins = parseMins(parts[1]);
    const diff = endMins - startMins;
    if (diff > 0) {
      if (diff >= 60 && diff % 60 === 0) {
        return `${diff / 60} ora${diff / 60 > 1 ? 'e' : ''}`;
      }
      return `${diff} min`;
    }
    return '50 min';
  };

  const getCourseColorStyle = (title: string, category?: string) => {
    const t = (title + ' ' + (category || '')).toLowerCase();
    if (t.includes('yoga') || t.includes('pilates') || t.includes('postural') || t.includes('panca') || t.includes('stretching')) {
      return {
        bg: 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400',
        badge: 'bg-emerald-800 text-emerald-100',
        pill: 'bg-emerald-100 text-emerald-900',
        shadow: 'shadow-emerald-900/20'
      };
    }
    if (t.includes('zumba') || t.includes('spinning') || t.includes('jump') || t.includes('dance') || t.includes('ballo') || t.includes('fit boxe')) {
      return {
        bg: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-fuchsia-400',
        badge: 'bg-fuchsia-800 text-fuchsia-100',
        pill: 'bg-fuchsia-100 text-fuchsia-900',
        shadow: 'shadow-fuchsia-900/20'
      };
    }
    if (t.includes('omnia') || t.includes('gym') || t.includes('piscina') || t.includes('nuoto') || t.includes('aquagym') || t.includes('step') || t.includes('fast') || t.includes('tone')) {
      return {
        bg: 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400',
        badge: 'bg-sky-800 text-sky-100',
        pill: 'bg-sky-100 text-sky-900',
        shadow: 'shadow-sky-900/20'
      };
    }
    if (t.includes('functional') || t.includes('circuit') || t.includes('acrobatica') || t.includes('circo') || t.includes('ninja') || t.includes('total body')) {
      return {
        bg: 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400',
        badge: 'bg-indigo-800 text-indigo-100',
        pill: 'bg-indigo-100 text-indigo-900',
        shadow: 'shadow-indigo-900/20'
      };
    }
    return {
      bg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300',
      badge: 'bg-amber-800 text-amber-50',
      pill: 'bg-amber-100 text-amber-900',
      shadow: 'shadow-amber-900/20'
    };
  };

  const filteredActivities = (organizerActivities || []).filter(act => {
    if (selectedMonthFilter === 'all') return true;
    return (act.slots || []).some(s => (s.dayOfWeek || '').toLowerCase().includes((selectedMonthFilter || '').toLowerCase()));
  });

  // Extract all unique slots across all activities for the full timetable (Palinsesto Completo)
  const allPalinsestoItems: Array<{
    activity: Activity;
    slot: ActivitySlot;
    day: string;
    time: string;
  }> = [];

  const seenPalinsestoKeys = new Set<string>();

  (organizerActivities || []).forEach(act => {
    (act.slots || []).forEach(slot => {
      let cleanDay = slot.dayOfWeek || '';
      const matchedDay = weekDays.find(d => (slot.dayOfWeek || '').toLowerCase().includes((d || '').toLowerCase()));
      if (matchedDay) {
        cleanDay = matchedDay;
      }

      const timeStr = slot.time || (slot as any).startTime || '09:00';
      const key = `${act.id || act.title}-${cleanDay.toLowerCase()}-${timeStr}`;

      if (!seenPalinsestoKeys.has(key)) {
        seenPalinsestoKeys.add(key);
        allPalinsestoItems.push({
          activity: act,
          slot,
          day: cleanDay,
          time: timeStr
        });
      }
    });
  });

  // Unique time slots sorted chronologically
  const uniqueTimeRows = Array.from(
    new Set(allPalinsestoItems.map(item => getStartTime(item.time)))
  ).sort((a, b) => {
    const toMins = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    return toMins(a) - toMins(b);
  });

  // Filter palinsesto items
  const filteredPalinsesto = allPalinsestoItems.filter(item => {
    const dayStr = item.day || '';
    const selDay = selectedPalinsestoDay || '';
    const matchesDay = selDay === 'all' || dayStr.toLowerCase() === selDay.toLowerCase();
    const searchStr = (palinsestoSearch || '').toLowerCase();
    const matchesSearch = !searchStr || 
      (item.activity?.title || '').toLowerCase().includes(searchStr) ||
      (item.time || '').toLowerCase().includes(searchStr) ||
      item.activity?.instructors?.some(inst => (inst.name || '').toLowerCase().includes(searchStr));
    return matchesDay && matchesSearch;
  });

  // Group palinsesto items by day
  const itemsByDay = weekDays.reduce((acc, day) => {
    acc[day] = filteredPalinsesto.filter(item => (item.day || '').toLowerCase() === (day || '').toLowerCase());
    return acc;
  }, {} as Record<string, typeof filteredPalinsesto>);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-300">
      
      {/* Top Sticky Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 hover:text-sky-600 transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna alle Attività</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              Profilo Ufficiale Organizzatore
            </span>
            <button
              onClick={() => alert(`Link al profilo di ${organizer.name} copiato nei tuoi appunti!`)}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              title="Condividi profilo"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-6">

        {/* Hero Card Container */}
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden relative">
          
          {/* Cover Banner */}
          <div className="relative h-56 sm:h-80 bg-slate-900 overflow-hidden">
            <img
              src={organizer.coverImage}
              alt={organizer.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

            {/* Top Left Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-slate-700">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Organizzatore Accreditato</span>
              </span>
            </div>

            {/* Floating Logo */}
            <div className="absolute -bottom-8 left-6 sm:left-10 z-20">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white p-1.5 shadow-2xl ring-4 ring-white shrink-0 overflow-hidden">
                <img
                  src={organizer.logo}
                  alt={organizer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Organizer Header Info */}
          <div className="pt-12 sm:pt-14 px-6 sm:px-10 pb-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {organizer.name}
                  </h1>
                  {organizer.verified && (
                    <CheckCircle2 className="w-6 h-6 text-sky-500 fill-sky-100 shrink-0" title="Organizzatore Verificato" />
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-sky-600 flex items-center gap-2 flex-wrap">
                  <span className="bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">{organizer.category}</span>
                  <span>•</span>
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {organizer.address} ({organizer.zone})
                  </span>
                </p>
              </div>

              {/* Rating Card */}
              <div className="bg-amber-50 border border-amber-200/90 px-5 py-3 rounded-2xl flex items-center gap-3 self-start shrink-0 shadow-2xs">
                <Star className="w-7 h-7 fill-amber-400 text-amber-500 shrink-0" />
                <div>
                  <div className="text-lg font-black text-slate-900 leading-none">
                    {organizer.rating} / 5.0
                  </div>
                  <div className="text-xs font-bold text-slate-500 mt-1">
                    {organizer.reviewCount} recensioni verificate
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              {organizer.description}
            </p>

            {/* Badges / Amenities */}
            {organizer.badges && organizer.badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {organizer.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-extrabold bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-2xs"
                  >
                    <Award className="w-3.5 h-3.5 text-sky-600" />
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Social Action Buttons */}
            {organizer.instagram && (
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://instagram.com/${organizer.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all border border-pink-200 active:scale-95 cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Segui {organizer.instagram}</span>
                </a>
              </div>
            )}

          </div>
        </div>

        {/* SECTION TABS: Attività vs Palinsesto Completo vs Dashboard Richieste */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-300/70 overflow-x-auto">
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'activities'
                ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>Corsi &amp; Attività ({organizerActivities.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('palinsesto');
              setShowWeeklyOverlayModal(true);
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'palinsesto'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Palinsesto Completo 🗓️</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'requests'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Mail className="w-4 h-4 text-amber-900" />
            <span>Richieste Disponibilità 📥 ({internalRequests.length})</span>
          </button>
        </div>

        {/* VIEW 1: CORSI E ATTIVITÀ (Cards Grid with Course Selector & Days inspector) */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>Programmazione Ufficiale</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Corsi &amp; Lezioni di {organizer.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Seleziona un corso per consultare tutti i giorni e gli orari di lezione disponibili.
                </p>
              </div>

              {/* Quick Course Picker & Month Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Select Course dropdown trigger */}
                <select
                  aria-label="Seleziona un corso per vedere i giorni disponibili"
                  onChange={(e) => {
                    const found = organizerActivities.find(a => a.id === e.target.value);
                    if (found) setSelectedActivityForSlots(found);
                  }}
                  defaultValue=""
                  className="bg-slate-100 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="" disabled>🔍 Seleziona corso e vedi giorni...</option>
                  {organizerActivities.map(act => (
                    <option key={act.id} value={act.id}>
                      {act.title} ({act.slots.length} orari)
                    </option>
                  ))}
                </select>

                {/* Month Filter Selector */}
                <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
                  {months.slice(0, 5).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMonthFilter(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                        selectedMonthFilter === m
                          ? 'bg-sky-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m === 'all' ? 'Tutti' : m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities Cards Grid */}
            {filteredActivities.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-800 text-base">
                  Nessun evento disponibile per i filtri selezionati
                </h3>
                <button
                  onClick={() => setSelectedMonthFilter('all')}
                  className="mt-2 text-xs font-black text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl cursor-pointer"
                >
                  Mostra Tutti i Corsi
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredActivities.map((activity) => {
                  return (
                    <div
                      key={activity.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-sky-500/50"
                    >
                      <div>
                        {/* Image */}
                        <div 
                          className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                          onClick={() => setSelectedActivityForSlots(activity)}
                        >
                          <img
                            src={activity.image}
                            alt={activity.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/20">
                            {activity.targetAudienceLabel}
                          </div>

                          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-black text-xs px-3 py-1 rounded-xl shadow-md border border-slate-200">
                            {activity.price === 0 ? (
                              <span className="text-emerald-600">GRATIS</span>
                            ) : (
                              <span>€{activity.price}</span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                          <h3 
                            onClick={() => setSelectedActivityForSlots(activity)}
                            className="font-black text-slate-900 text-base group-hover:text-sky-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                          >
                            {activity.title}
                          </h3>

                          <p className="text-xs text-slate-500 font-medium line-clamp-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span>{activity.venueName} ({activity.zone})</span>
                          </p>

                          {/* Days Preview Badges */}
                          <div className="pt-2">
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                              <span>Giorni &amp; Orari:</span>
                              <span className="text-sky-600 font-black">{activity.slots.length} turni attivi</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {activity.slots.slice(0, 3).map((slot, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-slate-100 text-slate-700 text-[11px] font-extrabold px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"
                                >
                                  <Clock className="w-3 h-3 text-sky-500" />
                                  {slot.dayOfWeek}: {slot.time || (slot as any).startTime}
                                </span>
                              ))}
                              {activity.slots.length > 3 && (
                                <span className="bg-sky-50 text-sky-700 text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                                  +{activity.slots.length - 3} altri
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedActivityForSlots(activity)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black py-2.5 px-3 rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          <span>Vedi Orari</span>
                        </button>

                        <button
                          onClick={() => onOpenBooking(activity)}
                          className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Prenota</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: PALINSESTO COMPLETO */}
        {activeTab === 'palinsesto' && (
          <div className="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-sky-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Palinsesto Ufficiale Completo</span>
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                    <span>🔁 Ricorrente Ogni Settimana</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Palinsesto Completo - {organizer.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Tutti i corsi e gli orari fissi. Clicca su qualsiasi corso per selezionarlo e prenotare direttamente.
                </p>
              </div>

              {/* Actions & View Switcher */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowWeeklyOverlayModal(true)}
                  className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Apri Palinsesto Completo (Pop-Up) 🗓️</span>
                </button>

                {/* Switcher Griglia Matrix / Carte */}
                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
                  <button
                    onClick={() => setPalinsestoViewMode('matrix')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      palinsestoViewMode === 'matrix'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📊 Tabella Oraria
                  </button>
                  <button
                    onClick={() => setPalinsestoViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      palinsestoViewMode === 'cards'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🗂️ Per Giorni
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cerca lezione..."
                    value={palinsestoSearch}
                    onChange={(e) => setPalinsestoSearch(e.target.value)}
                    className="bg-slate-100 text-xs font-bold text-slate-800 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 w-36 sm:w-48"
                  />
                </div>
              </div>
            </div>

            {/* Banner spiegazione ricorsività */}
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl flex items-center gap-3">
              <Info className="w-5 h-5 text-sky-600 shrink-0" />
              <div className="text-xs text-sky-900 font-medium">
                <strong className="font-black">Orario Completo Palestra &amp; Corsi:</strong> Clicca direttamente su qualunque casella o scheda corso per selezionare l'attività ed aprire subito la schermata di prenotazione.
              </div>
            </div>

            {/* Filter by Day Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100">
              <button
                onClick={() => setSelectedPalinsestoDay('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  selectedPalinsestoDay === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tutti i Giorni (Lun - Sab)
              </button>
              {weekDays.map((day) => {
                const dayCount = (itemsByDay[day] || []).length;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedPalinsestoDay(day)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      (selectedPalinsestoDay || '').toLowerCase() === (day || '').toLowerCase()
                        ? 'bg-sky-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      (selectedPalinsestoDay || '').toLowerCase() === (day || '').toLowerCase()
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {dayCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RENDER MATRIX TIMETABLE GRID (ORARIO CORSI PALESTRA STYLE) */}
            {palinsestoViewMode === 'matrix' ? (
              <div className="space-y-4">
                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-lg scrollbar-thin">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs uppercase font-black tracking-wider border-b-2 border-slate-800">
                        <th className="p-3 text-center w-24 border-r border-slate-800 bg-slate-950">
                          Orario
                        </th>
                        {weekDays
                          .filter(day => selectedPalinsestoDay === 'all' || (day || '').toLowerCase() === (selectedPalinsestoDay || '').toLowerCase())
                          .map(day => (
                            <th key={day} className="p-3.5 text-center border-r border-slate-800 last:border-r-0 min-w-[140px]">
                              <div className="text-sm font-extrabold">{day}</div>
                              <div className="text-[10px] text-sky-300 font-normal normal-case">corsi fissi</div>
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-bold text-slate-800">
                      {uniqueTimeRows.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 font-bold">
                            Nessun orario trovato per i filtri selezionati
                          </td>
                        </tr>
                      ) : (
                        uniqueTimeRows.map(timeRow => (
                          <tr key={timeRow} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-black text-slate-900 text-center bg-slate-100 border-r border-slate-200 align-middle shrink-0 font-mono text-xs sm:text-sm shadow-2xs">
                              {timeRow}
                            </td>

                            {weekDays
                              .filter(day => selectedPalinsestoDay === 'all' || (day || '').toLowerCase() === (selectedPalinsestoDay || '').toLowerCase())
                              .map(day => {
                                const matchingItems = filteredPalinsesto.filter(
                                  item => (item.day || '').toLowerCase() === day.toLowerCase() && getStartTime(item.time) === timeRow
                                );

                                return (
                                  <td key={day} className="p-1.5 border-r border-slate-200 last:border-r-0 align-top h-20">
                                    {matchingItems.length === 0 ? (
                                      <div className="h-full w-full min-h-[56px] rounded-xl border border-dashed border-slate-200/60 bg-slate-50/20 flex items-center justify-center text-[10px] text-slate-300 select-none">
                                        -
                                      </div>
                                    ) : (
                                      <div className="space-y-1.5 h-full">
                                        {matchingItems.map((item, idx) => {
                                          const style = getCourseColorStyle(item.activity.title);
                                          return (
                                            <div
                                              key={idx}
                                              onClick={() => onOpenBooking(item.activity)}
                                              className={`${style.bg} ${style.shadow} p-2.5 rounded-xl border shadow-xs transition-all duration-200 hover:scale-[1.03] cursor-pointer group flex flex-col justify-between min-h-[64px] active:scale-95`}
                                              title={`Clicca per prenotare: ${item.activity.title}`}
                                            >
                                              <div>
                                                <div className="flex items-center justify-between text-[10px] opacity-90 font-mono font-black mb-1">
                                                  <span>{item.time}</span>
                                                  <span className="bg-black/20 px-1.5 py-0.2 rounded text-[9px] font-sans">
                                                    €{item.activity.price === 0 ? 'GRATIS' : item.activity.price}
                                                  </span>
                                                </div>
                                                <h5 className="font-extrabold text-xs sm:text-sm leading-tight group-hover:underline">
                                                  {item.activity.title}
                                                </h5>
                                              </div>
                                              <div className="mt-1.5 pt-1 border-t border-white/20 flex items-center justify-between text-[10px]">
                                                <span className="truncate max-w-[80px] font-medium opacity-90">
                                                  {item.activity.targetAudienceLabel}
                                                </span>
                                                <span className="bg-white/20 group-hover:bg-white/30 text-white px-1.5 py-0.5 rounded-md font-black text-[9px] shrink-0 transition-colors flex items-center gap-0.5">
                                                  <span>Prenota</span>
                                                  <span>➔</span>
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weekDays
                  .filter(day => selectedPalinsestoDay === 'all' || (day || '').toLowerCase() === (selectedPalinsestoDay || '').toLowerCase())
                  .map(day => {
                    const dayItems = itemsByDay[day] || [];
                    return (
                      <div key={day} className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="bg-slate-900 text-white px-4 py-3 font-black text-sm flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="uppercase tracking-wider">{day}</span>
                            <span className="text-[10px] bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded-md font-bold">
                              Ogni settimana
                            </span>
                          </div>
                          <span className="bg-sky-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            {dayItems.length} lezioni
                          </span>
                        </div>

                        <div className="p-3 space-y-3 flex-1">
                          {dayItems.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400 font-bold">
                              Nessuna lezione programmata
                            </div>
                          ) : (
                            dayItems.map((item, idx) => {
                              const mainInstructor = item.activity.instructors?.[0];
                              const style = getCourseColorStyle(item.activity.title);
                              return (
                                <div
                                  key={idx}
                                  onClick={() => onOpenBooking(item.activity)}
                                  className="bg-white hover:bg-sky-50/50 rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md hover:border-sky-400 transition-all space-y-2 group cursor-pointer"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-1.5 bg-sky-50 text-sky-900 px-2.5 py-1 rounded-lg border border-sky-100 text-xs font-black">
                                      <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                                      <span>{item.time}</span>
                                    </div>

                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                      €{item.activity.price === 0 ? 'GRATIS' : item.activity.price}
                                    </span>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                                        {item.activity.targetAudienceLabel}
                                      </span>
                                      <span className={`text-[10px] font-extrabold ${style.pill} px-2 py-0.5 rounded-md`}>
                                        {item.activity.title}
                                      </span>
                                    </div>
                                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-600 transition-colors leading-snug">
                                      {item.activity.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                      📍 {item.activity.venueName}
                                    </p>
                                  </div>

                                  {mainInstructor && (
                                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-xs text-slate-600 font-bold">
                                      <div className="flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{mainInstructor.name}</span>
                                      </div>
                                      <span className="text-sky-600 font-black text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                                        <span>Prenota</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL / DRAWER: SELEZIONA ATTIVITÀ & VEDI TUTTI I GIORNI E ORARI */}
      {selectedActivityForSlots && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10 flex items-start justify-between gap-4">
              <div>
                <span className="bg-sky-100 text-sky-800 text-[11px] font-black uppercase px-2.5 py-1 rounded-full border border-sky-200">
                  {selectedActivityForSlots.targetAudienceLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {selectedActivityForSlots.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedActivityForSlots.venueName} • {selectedActivityForSlots.zone}
                </p>
              </div>

              <button
                onClick={() => setSelectedActivityForSlots(null)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">

              {/* Course Switcher Selector inside Modal */}
              <div className="bg-sky-50 border border-sky-200/80 p-4 rounded-2xl space-y-2">
                <label className="text-xs font-black text-sky-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>Passa ad un altro corso dell'organizzatore:</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedActivityForSlots.id}
                    onChange={(e) => {
                      const found = organizerActivities.find(a => a.id === e.target.value);
                      if (found) setSelectedActivityForSlots(found);
                    }}
                    className="w-full bg-white text-slate-900 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none pr-10 shadow-2xs"
                  >
                    {organizerActivities.map(act => (
                      <option key={act.id} value={act.id}>
                        {act.title} ({act.slots.length} sessioni settimanali)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Description & Badges */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedActivityForSlots.description}
                </p>
                
                {selectedActivityForSlots.badges && selectedActivityForSlots.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedActivityForSlots.badges.map((b, i) => (
                      <span key={i} className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Instructors list */}
              {selectedActivityForSlots.instructors && selectedActivityForSlots.instructors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Istruttori &amp; Trainer dedicati:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedActivityForSlots.instructors.map((inst, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-3">
                        <img 
                          src={inst.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={inst.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-sky-500/30"
                        />
                        <div>
                          <div className="text-xs font-black text-slate-900">{inst.name}</div>
                          <div className="text-[11px] text-sky-600 font-medium">{inst.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DISPONIBILITÀ ORARI E GIORNI COMPLETI */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>Tutti i Giorni &amp; Orari Disponibili ({selectedActivityForSlots.slots.length}):</span>
                  </h4>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Lezione Prova Disponibile
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedActivityForSlots.slots.map((slot, index) => (
                    <div 
                      key={slot.id || index}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-sky-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-lg">
                            {slot.dayOfWeek}
                          </span>
                          <span className="text-xs font-bold text-slate-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                            {slot.time || (slot as any).startTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium pt-0.5">
                          Posti disponibili: <strong className="text-slate-800">{slot.availableSeats}</strong> per questa sessione
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const targetActivity = selectedActivityForSlots;
                          setSelectedActivityForSlots(null);
                          onOpenBooking(targetActivity);
                        }}
                        className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Prenota Questo Giorno</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 rounded-b-[32px]">
              <button
                onClick={() => setSelectedActivityForSlots(null)}
                className="text-xs font-black text-slate-600 hover:text-slate-900 px-4 py-2 cursor-pointer"
              >
                Chiudi Window
              </button>

              <button
                onClick={() => {
                  const targetActivity = selectedActivityForSlots;
                  setSelectedActivityForSlots(null);
                  onOpenBooking(targetActivity);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Prenota Ora Corso Completo (€{selectedActivityForSlots.price})
              </button>
            </div>
          </div>
        </div>
      )}

        {/* VIEW 3: DASHBOARD RICHIESTE DISPONIBILITÀ INTERNE */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-700" />
                    <span>Dashboard Interna Ricezioni</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Richieste di Disponibilità Futura ({internalRequests.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Le richieste degli utenti per date oltre le 2 settimane o corsi personalizzati arrivano direttamente in questa dashboard.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-amber-900">
                  Notifica via e-mail e SMS attiva per l'organizzatore
                </span>
              </div>
            </div>

            {internalRequests.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-800">
                  Nessuna richiesta interna in attesa
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Quando i genitori richiedono disponibilità per date future oltre le 2 settimane, le richieste compariranno qui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internalRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 relative hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-900 font-mono font-black text-[11px] px-2.5 py-0.5 rounded-full border border-amber-300">
                          {req.requestCode}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {new Date(req.createdAt).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                        🟢 {req.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {req.activityTitle}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        📍 {req.venueName}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                      <p>🗓️ <strong>Data Richiesta:</strong> {req.requestedDate}</p>
                      <p>🕒 <strong>Fascia Oraria:</strong> {req.requestedTimeSlot}</p>
                      <p>👤 <strong>Richiedente:</strong> {req.participantName} ({req.ticketCount} persone)</p>
                      {req.notes && (
                        <p className="text-slate-500 italic pt-1 border-t border-slate-100 mt-1">
                          💬 "{req.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => alert(`Risposta inviata a ${req.participantName} per la richiesta ${req.requestCode}!`)}
                        className="flex-1 bg-slate-900 hover:bg-black text-white font-extrabold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer text-center"
                      >
                        ✉️ Rispondi al Genitore
                      </button>
                      <button
                        onClick={() => alert(`Richiesta ${req.requestCode} confermata nel calendario!`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer"
                      >
                        ✓ Conferma
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      {/* OVERLAY MODAL: PALINSESTO COMPLETO (POP-UP) */}
      {showWeeklyOverlayModal && (
        <div 
          onClick={() => setShowWeeklyOverlayModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-y-auto cursor-pointer animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-7xl rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col cursor-default animate-in zoom-in-95 duration-200"
          >
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Palinsesto Completo
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Switcher in modal */}
                <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
                  <button
                    onClick={() => setPalinsestoViewMode('matrix')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      palinsestoViewMode === 'matrix'
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    📊 Griglia Oraria
                  </button>
                  <button
                    onClick={() => setPalinsestoViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      palinsestoViewMode === 'cards'
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🗂️ Per Giorni
                  </button>
                </div>

                <button
                  onClick={() => setShowWeeklyOverlayModal(false)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/70 scrollbar-thin space-y-4">
              
              {palinsestoViewMode === 'matrix' ? (
                /* MATRIX TIMETABLE GRID IN MODAL */
                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xl scrollbar-thin">
                  <table className="w-full border-collapse min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs uppercase font-black tracking-wider border-b-2 border-slate-800">
                        <th className="p-3.5 text-center w-28 border-r border-slate-800 bg-slate-950">
                          Orario
                        </th>
                        {weekDays.map(day => (
                          <th key={day} className="p-3.5 text-center border-r border-slate-800 last:border-r-0 min-w-[140px]">
                            <div className="text-sm font-extrabold">{day}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-bold text-slate-800">
                      {uniqueTimeRows.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 font-bold">
                            Nessun corso in palinsesto
                          </td>
                        </tr>
                      ) : (
                        uniqueTimeRows.map(timeRow => (
                          <tr key={timeRow} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-black text-slate-900 text-center bg-slate-100 border-r border-slate-200 align-middle shrink-0 font-mono text-xs sm:text-sm shadow-2xs">
                              {timeRow}
                            </td>

                            {weekDays.map(day => {
                              const matchingItems = filteredPalinsesto.filter(
                                item => (item.day || '').toLowerCase() === day.toLowerCase() && getStartTime(item.time) === timeRow
                              );

                              return (
                                <td key={day} className="p-1.5 border-r border-slate-200 last:border-r-0 align-top h-20">
                                  {matchingItems.length === 0 ? (
                                    <div className="h-full w-full min-h-[60px] rounded-xl border border-dashed border-slate-200/60 bg-slate-50/20 flex items-center justify-center text-[10px] text-slate-300 select-none">
                                      -
                                    </div>
                                  ) : (
                                    <div className="space-y-1.5 h-full">
                                      {matchingItems.map((item, idx) => {
                                        const style = getCourseColorStyle(item.activity.title);
                                        return (
                                          <div
                                            key={idx}
                                            onClick={() => {
                                              setShowWeeklyOverlayModal(false);
                                              onOpenBooking(item.activity);
                                            }}
                                            className={`${style.bg} ${style.shadow} p-2.5 rounded-xl border shadow-md transition-all duration-200 hover:scale-[1.04] cursor-pointer group flex flex-col justify-between min-h-[64px] active:scale-95`}
                                            title={`Clicca per prenotare: ${item.activity.title}`}
                                          >
                                            <div>
                                              <h5 className="font-black text-xs sm:text-sm leading-snug group-hover:underline">
                                                {item.activity.title}
                                              </h5>
                                              <div className="text-[11px] font-medium mt-0.5 opacity-90">
                                                {item.activity.targetAudienceLabel}
                                              </div>
                                            </div>
                                            <div className="mt-2 pt-1 border-t border-white/20 flex items-center gap-1 text-[10px] font-bold opacity-95">
                                              <Clock className="w-3 h-3 shrink-0" />
                                              <span>Durata: {getOnlyDuration(item.time)}</span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* CARDS VIEW IN MODAL */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {weekDays.map(day => {
                    const dayItems = itemsByDay[day] || [];
                    return (
                      <div key={day} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
                        <div className="bg-slate-900 text-white px-4 py-3 font-black text-xs uppercase flex items-center justify-between">
                          <span>{day}</span>
                          <span className="bg-sky-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            {dayItems.length} lezioni
                          </span>
                        </div>

                        <div className="p-3 space-y-2.5 flex-1">
                          {dayItems.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400 font-bold">
                              Nessuna lezione programmata
                            </div>
                          ) : (
                            dayItems.map((item, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setShowWeeklyOverlayModal(false);
                                  onOpenBooking(item.activity);
                                }}
                                className="bg-slate-50 hover:bg-sky-50/80 border border-slate-200/90 hover:border-sky-400 rounded-xl p-3.5 transition-all cursor-pointer group space-y-2 shadow-2xs hover:shadow-md"
                              >
                                <div>
                                  <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-700 transition-colors leading-snug">
                                    {item.activity.title}
                                  </h4>
                                  <div className="text-xs font-semibold text-slate-600 mt-1">
                                    🎯 Rivolto a: <span className="font-bold text-slate-800">{item.activity.targetAudienceLabel}</span>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-sky-900 font-bold">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                                    <span>Durata: {getOnlyDuration(item.time)}</span>
                                  </div>
                                  <span className="text-[11px] font-black text-sky-600 group-hover:translate-x-0.5 transition-transform">
                                    Prenota ➔
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Modal Bottom Banner */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Palinsesto Settimanale</span>
              <button
                onClick={() => setShowWeeklyOverlayModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-xs font-black cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

