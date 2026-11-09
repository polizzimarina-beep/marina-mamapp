import React, { useState, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  BottomNavBar 
} from './components/BottomNavBar';
import { 
  ActivityCard 
} from './components/ActivityCard';
import { 
  ActivityDetailModal 
} from './components/ActivityDetailModal';
import { 
  BookingModal 
} from './components/BookingModal';
import { 
  MyTicketsModal 
} from './components/MyTicketsModal';
import { 
  FamilyProfilesModal 
} from './components/FamilyProfilesModal';
import { 
  MapView 
} from './components/MapView';
import { 
  MapScreenView 
} from './components/MapScreenView';
import {
  HomeDashboardView
} from './components/HomeDashboardView';
import {
  ParksScreenView
} from './components/ParksScreenView';
import {
  TicketsAndBookingsView
} from './components/TicketsAndBookingsView';
import {
  ThreeColumnCalendarView
} from './components/ThreeColumnCalendarView';
import {
  MobileFilterBottomSheet,
  FilterCategoryTab
} from './components/MobileFilterBottomSheet';
import {
  TrustFooterBar
} from './components/TrustFooterBar';
import { 
  OrganizerProfileModal 
} from './components/OrganizerProfileModal';
import { 
  OrganizerProfilePage 
} from './components/OrganizerProfilePage';
import { 
  MOCK_ACTIVITIES, 
  MOCK_FAMILY_MEMBERS, 
  INITIAL_BOOKINGS,
  INITIAL_INTERNAL_REQUESTS,
  ORGANIZERS
} from './data/mockData';
import { 
  Activity, 
  CategoryId, 
  TargetAudience, 
  AgeGroup,
  FamilyMemberProfile, 
  Booking,
  OrganizerProfile,
  InternalRequest
} from './types';
import { Sparkles, Heart, Search, Building2, CheckCircle2, ChevronRight, ShieldCheck, Baby, MapPin, Clock } from 'lucide-react';

export default function App() {
  // State variables
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedGenderTargets, setSelectedGenderTargets] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>(['1-3 anni']);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  
  const [currentZone, setCurrentZone] = useState<string>('Tutti i Quartieri');
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedOrganizerFilter, setSelectedOrganizerFilter] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [isBachecaOpen, setIsBachecaOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);

  const handleToggleAgeGroup = (age: string) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const handleToggleGenderTarget = (target: string) => {
    setSelectedGenderTargets((prev) =>
      prev.includes(target) ? prev.filter((t) => t !== target) : [...prev, target]
    );
  };

  const handleToggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleToggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleToggleZone = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const handleToggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'sport',
    'laboratori',
    'piscina',
    'parchi',
    'cultura',
    'feste'
  ]);
  const [selectedMaxDistance, setSelectedMaxDistance] = useState<number>(5);

  const handleToggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberProfile[]>(MOCK_FAMILY_MEMBERS);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMemberProfile | null>(null);

  const [favorites, setFavorites] = useState<string[]>(['act-lucilla', 'act-gokart-papa']);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [internalRequests, setInternalRequests] = useState<InternalRequest[]>(INITIAL_INTERNAL_REQUESTS);

  const handleAddInternalRequest = (newReq: InternalRequest) => {
    setInternalRequests((prev) => [newReq, ...prev]);
  };

  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'planning' | 'favorites' | 'tickets'>('home');
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'planning'>('grid');

  // Modals & Dedicated Page state
  const [activityForDetail, setActivityForDetail] = useState<Activity | null>(null);
  const [activityForBooking, setActivityForBooking] = useState<Activity | null>(null);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState<boolean>(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterModalTab, setFilterModalTab] = useState<FilterCategoryTab>('eta');
  const [isParksScreenOpen, setIsParksScreenOpen] = useState<boolean>(false);
  const [activeCategoryType, setActiveCategoryType] = useState<string>('parchi');
  const [selectedOrganizerProfile, setSelectedOrganizerProfile] = useState<OrganizerProfile | null>(null);
  const [activeOrganizerPage, setActiveOrganizerPage] = useState<OrganizerProfile | null>(null);
  const [organizerInitialTab, setOrganizerInitialTab] = useState<'activities' | 'palinsesto' | 'requests'>('activities');

  // Open Internal Dashboard directly
  const handleOpenInternalDashboard = () => {
    handleOpenOrganizerProfile('Body Studio Politeama / Parco della Favorita');
    setOrganizerInitialTab('requests');
  };

  // Open Organizer Profile (Dedicated Page View)
  const handleOpenOrganizerProfile = (organizerIdentifier: string | OrganizerProfile, tab: 'activities' | 'palinsesto' | 'requests' = 'activities') => {
    let targetOrg: OrganizerProfile | null = null;
    if (typeof organizerIdentifier === 'object' && organizerIdentifier !== null) {
      targetOrg = organizerIdentifier;
    } else {
      const nameOrId = String(organizerIdentifier || '').toLowerCase();
      const found = ORGANIZERS.find(
        (o) =>
          (o.id || '').toLowerCase() === nameOrId ||
          (o.name || '').toLowerCase().includes(nameOrId) ||
          nameOrId.includes((o.id || '').toLowerCase()) ||
          nameOrId.includes((o.name || '').toLowerCase().split(' ')[0])
      );
      if (found) {
        targetOrg = found;
      } else {
        targetOrg = {
          id: 'org-custom',
          name: String(organizerIdentifier),
          category: 'Organizzatore Verificato Palermo',
          logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
          coverImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
          description: `Organizzatore accreditato di eventi, spettacoli e attività sportive per la famiglia a Palermo.`,
          address: 'Palermo Centro',
          city: 'Palermo',
          zone: 'Politeama / Centro',
          phone: '+39 091 626 4702',
          email: 'info@organizzatore.it',
          isPartner: true,
          verified: true,
          rating: 4.9,
          reviewCount: 45,
          badges: ['Partner MAMA Ufficiale', 'Conferma Immediata']
        };
      }
    }
    setActiveOrganizerPage(targetOrg);
    setSelectedOrganizerProfile(targetOrg);
    setOrganizerInitialTab(tab);
  };

  // Compute activities hosted by selected organizer profile
  const selectedOrganizerActivities = useMemo(() => {
    if (!selectedOrganizerProfile) return [];
    return MOCK_ACTIVITIES.filter((act) => {
      if (act.organizerId && act.organizerId === selectedOrganizerProfile.id) return true;
      const orgFirstName = (selectedOrganizerProfile.name || '').toLowerCase().split(' ')[0];
      return (
        (act.organizer?.name || '').toLowerCase().includes(orgFirstName) ||
        (selectedOrganizerProfile.name || '').toLowerCase().includes((act.organizer?.name || '').toLowerCase())
      );
    });
  }, [selectedOrganizerProfile]);

  // Compute Organizers found from search query
  const matchingOrganizersFromSearch = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ORGANIZERS.filter(
      (org) =>
        (org.name || '').toLowerCase().includes(q) ||
        (org.category || '').toLowerCase().includes(q) ||
        (org.zone || '').toLowerCase().includes(q) ||
        (org.description || '').toLowerCase().includes(q) ||
        (org.badges || []).some((b) => (b || '').toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Activities count by age group for kids section
  const activitiesCountByAge = useMemo(() => {
    const counts: Record<string, number> = {
      '0-3': 0,
      '3-6': 0,
      '6-10': 0,
      '10-14+': 0
    };
    MOCK_ACTIVITIES.forEach((act) => {
      // Exclude adult parent-specific activities from children age group counts
      if (act.targetAudience === 'mamme' || act.targetAudience === 'papa') return;

      if (act.ageMin <= 3 && act.ageMax >= 0) counts['0-3']++;
      if (act.ageMin <= 6 && act.ageMax >= 3) counts['3-6']++;
      if (act.ageMin <= 10 && act.ageMax >= 6) counts['6-10']++;
      if (act.ageMin <= 16 && act.ageMax >= 10) counts['10-14+']++;
    });
    return counts;
  }, []);

  // Toggle Favorite
  const handleToggleFavorite = (activityId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Filtered Activities Calculation
  const filteredActivities = useMemo(() => {
    return MOCK_ACTIVITIES.filter((act) => {
      // 1. Accordion: Filtro per Età (selectedAgeGroups)
      if (selectedAgeGroups.length > 0) {
        const matchesAge = selectedAgeGroups.some((age) => {
          if (age === '0-12 mesi') return act.ageMin <= 1 && act.ageMax >= 0;
          if (age === '1-3 anni') return act.ageMin <= 3 && act.ageMax >= 1;
          if (age === '4-6 anni') return act.ageMin <= 6 && act.ageMax >= 4;
          if (age === '7-10 anni') return act.ageMin <= 10 && act.ageMax >= 7;
          return true;
        });
        if (!matchesAge) return false;
      }

      // 2. Accordion: Filtro per Genere / Target (selectedGenderTargets)
      if (selectedGenderTargets.length > 0) {
        const matchesTarget = selectedGenderTargets.some((target) => {
          if (target === 'Maschi') return act.targetAudience === 'papa' || act.targetAudience === 'bimbi' || act.targetAudience === 'famiglia';
          if (target === 'Femmine') return act.targetAudience === 'mamme' || act.targetAudience === 'bimbi' || act.targetAudience === 'famiglia';
          if (target === 'Genitore') return act.targetAudience === 'mamme' || act.targetAudience === 'papa';
          if (target === 'Genitori & Figli') return act.targetAudience === 'famiglia' || act.targetAudience === 'bimbi';
          return true;
        });
        if (!matchesTarget) return false;
      }

      // 2.b Accordion: Filtro per Fascia Oraria (selectedTimeSlots)
      if (selectedTimeSlots.length > 0) {
        const matchesSlot = selectedTimeSlots.some((slot) => {
          return (act.slots || []).some((s) => {
            const timeStr = `${s.time || ''} ${s.dayOfWeek || ''}`.toLowerCase();
            if (slot === 'Mattina') return timeStr.includes('08:') || timeStr.includes('09:') || timeStr.includes('10:') || timeStr.includes('11:') || timeStr.includes('mattina') || timeStr.includes('09.00') || timeStr.includes('10.00');
            if (slot === 'Pomeriggio') return timeStr.includes('14:') || timeStr.includes('15:') || timeStr.includes('16:') || timeStr.includes('17:') || timeStr.includes('18:') || timeStr.includes('pomeriggio');
            if (slot === 'Sera') return timeStr.includes('19:') || timeStr.includes('20:') || timeStr.includes('21:') || timeStr.includes('sera');
            if (slot === 'Intera giornata') return timeStr.includes('intera') || timeStr.includes('giornata') || timeStr.includes('09:00 - 18') || timeStr.includes('10:00 - 19');
            return true;
          });
        });
        if (!matchesSlot) return false;
      }

      // 3. Accordion: Filtro per Attività (selectedActivities)
      if (selectedActivities.length > 0) {
        const allText = `${act.title} ${act.subtitle} ${(act.description || '')} ${(act.categoryName || '')} ${(act.badges || []).join(' ')}`.toLowerCase();
        
        const matchesActivity = selectedActivities.some((actOption) => {
          if (actOption === 'Acqua / Nuoto') return act.categoryId === 'piscina' || act.categoryId === 'mare' || allText.includes('nuot') || allText.includes('piscina') || allText.includes('acqu') || allText.includes('mare') || allText.includes('sub');
          if (actOption === 'Al chiuso / Ludoteche') return act.categoryId === 'indoor' || act.categoryId === 'cinema' || allText.includes('chiuso') || allText.includes('ludotec') || allText.includes('indoor') || allText.includes('gonfiabil');
          if (actOption === 'Arti marziali / Judo / Karate') return allText.includes('judo') || allText.includes('karate') || allText.includes('arti marziali') || allText.includes('lotta') || allText.includes('difesa');
          if (actOption === 'Atletica / Corsa') return allText.includes('atletica') || allText.includes('corsa') || allText.includes('run') || allText.includes('sport');
          if (actOption === 'Basket / Minibasket') return allText.includes('basket') || allText.includes('minibasket') || allText.includes('pallacanestro');
          if (actOption === 'Calcio / Calcetto') return allText.includes('calcio') || allText.includes('calcetto') || allText.includes('football');
          if (actOption === 'Danza / Ginnastica ritmica') return allText.includes('danz') || allText.includes('ballo') || allText.includes('ginnastica') || allText.includes('ritmica') || allText.includes('balletto');
          if (actOption === 'Dove mangiare') return act.categoryId === 'ristoranti' || allText.includes('ristorant') || allText.includes('mangiar') || allText.includes('pizza') || allText.includes('brunch') || allText.includes('merenda');
          if (actOption === 'Laboratori creativi') return allText.includes('laborator') || allText.includes('creativ') || allText.includes('pittura') || allText.includes('ceramica') || allText.includes('cucina');
          if (actOption === 'Parchi & Natura') return act.categoryId === 'parchi' || allText.includes('parco') || allText.includes('villa') || allText.includes('natur') || allText.includes('giardino') || allText.includes('orto');
          if (actOption === 'Pallavolo') return allText.includes('pallavolo') || allText.includes('volley');
          if (actOption === 'Pattinaggio / Skateboard') return allText.includes('pattin') || allText.includes('skate') || allText.includes('roller');
          if (actOption === 'Tennis / Padel') return allText.includes('tennis') || allText.includes('padel') || allText.includes('racchetta');
          if (actOption === 'Trekking / Escursioni') return allText.includes('trekking') || allText.includes('escursion') || allText.includes('passeggiata') || allText.includes('montagna') || allText.includes('sentier');
          return allText.includes(actOption.toLowerCase());
        });
        if (!matchesActivity) return false;
      }

      // 4. Accordion: Filtro per Locazione / Zona a Palermo (selectedZones)
      if (selectedZones.length > 0) {
        const actZone = (act.zone || '').toLowerCase();
        const actVenue = (act.venueName || '').toLowerCase();

        const matchesZone = selectedZones.some((z) => {
          if (z === 'Centro / Politeama' || z === 'Centro') {
            return actZone.includes('centro') || actZone.includes('politeama') || actZone.includes('libertà') || actZone.includes('foro') || actZone.includes('kalsa') || actVenue.includes('politeama') || actVenue.includes('libertà');
          }
          if (z === 'Mondello / Mare' || z === 'Mondello/Mare') {
            return actZone.includes('mondello') || actZone.includes('addaura') || actZone.includes('mare') || actVenue.includes('mondello') || actVenue.includes('lido');
          }
          if (z === 'Zona Nord') {
            return actZone.includes('nord') || actZone.includes('favorita') || actZone.includes('notarbartolo') || actZone.includes('libertà') || actVenue.includes('favorita');
          }
          if (z === 'Zona Sud') {
            return actZone.includes('sud') || actZone.includes('orto') || actZone.includes('kalsa') || actZone.includes('marina') || actVenue.includes('orto');
          }
          if (z === 'Fuori porta') {
            return actZone.includes('fuori') || actZone.includes('monreale') || actZone.includes('cefalù') || actZone.includes('provincia');
          }
          return actZone.includes(z.toLowerCase());
        });
        if (!matchesZone) return false;
      }

      // Zone Filter
      if (currentZone !== 'Tutti i Quartieri') {
        const actZone = (act.zone || '').toLowerCase();
        const actVenue = (act.venueName || '').toLowerCase();

        if (currentZone === 'Centro') {
          const isCentro = actZone.includes('centro') || actZone.includes('politeama') || actZone.includes('libertà') || actZone.includes('foro') || actZone.includes('kalsa') || actVenue.includes('politeama') || actVenue.includes('libertà');
          if (!isCentro) return false;
        } else if (currentZone === 'Mondello/Mare') {
          const isMondello = actZone.includes('mondello') || actZone.includes('addaura') || actZone.includes('mare') || actVenue.includes('mondello') || actVenue.includes('lido');
          if (!isMondello) return false;
        } else if (currentZone === 'Zona Nord') {
          const isNord = actZone.includes('nord') || actZone.includes('favorita') || actZone.includes('notarbartolo') || actZone.includes('libertà') || actVenue.includes('favorita');
          if (!isNord) return false;
        } else if (currentZone === 'Zona Sud') {
          const isSud = actZone.includes('sud') || actZone.includes('orto') || actZone.includes('kalsa') || actZone.includes('marina') || actVenue.includes('orto');
          if (!isSud) return false;
        } else if (currentZone === 'Fuori porta') {
          const isFuori = actZone.includes('fuori') || actZone.includes('monreale') || actZone.includes('cefalù') || actZone.includes('provincia');
          if (!isFuori) return false;
        } else if (act.zone !== currentZone) {
          return false;
        }
      }

      // Audience Filter
      if (selectedAudience !== 'all' && act.targetAudience !== selectedAudience) {
        return false;
      }

      // Age Group Filter (0-12 mesi, 1-3 anni, 4-6 anni, 7-10 anni or 0-3, 3-6, 6-10, 10-14+)
      if (selectedAgeGroup !== 'all') {
        if (selectedAudience !== 'mamme' && act.targetAudience === 'mamme') return false;
        if (selectedAudience !== 'papa' && act.targetAudience === 'papa') return false;

        if (selectedAgeGroup === '0-12 mesi' || selectedAgeGroup === '0-12m') {
          if (!(act.ageMin <= 1 && act.ageMax >= 0)) return false;
        } else if (selectedAgeGroup === '1-3 anni' || selectedAgeGroup === '1-3') {
          if (!(act.ageMin <= 3 && act.ageMax >= 1)) return false;
        } else if (selectedAgeGroup === '4-6 anni' || selectedAgeGroup === '4-6') {
          if (!(act.ageMin <= 6 && act.ageMax >= 4)) return false;
        } else if (selectedAgeGroup === '7-10 anni' || selectedAgeGroup === '7-10') {
          if (!(act.ageMin <= 10 && act.ageMax >= 7)) return false;
        } else if (selectedAgeGroup === '0-3') {
          if (!(act.ageMin <= 3 && act.ageMax >= 0)) return false;
        } else if (selectedAgeGroup === '3-6') {
          if (!(act.ageMin <= 6 && act.ageMax >= 3)) return false;
        } else if (selectedAgeGroup === '6-10') {
          if (!(act.ageMin <= 10 && act.ageMax >= 6)) return false;
        } else if (selectedAgeGroup === '10-14+') {
          if (!(act.ageMin <= 16 && act.ageMax >= 10)) return false;
        }
      }

      // Salva-mamma Services Filter
      if (selectedServices.length > 0) {
        const allText = `${act.title} ${act.subtitle} ${(act.description || '')} ${(act.venueName || '')} ${(act.badges || []).join(' ')}`.toLowerCase();
        
        for (const service of selectedServices) {
          if (service === 'Accessibile in passeggino') {
            const match = allText.includes('passeggin') || allText.includes('accessibil') || act.categoryId === 'parchi' || act.categoryId === 'ristoranti' || act.categoryId === 'indoor' || act.categoryId === 'cinema';
            if (!match) return false;
          } else if (service === 'Fasciatoio') {
            const match = allText.includes('fasciatoio') || allText.includes('nido') || allText.includes('baby') || act.categoryId === 'ristoranti' || act.categoryId === 'indoor';
            if (!match) return false;
          } else if (service === 'Parco recintato') {
            const match = allText.includes('recintat') || allText.includes('parco') || allText.includes('villa') || allText.includes('favorita') || act.categoryId === 'parchi';
            if (!match) return false;
          } else if (service === "Zona d'ombra") {
            const match = allText.includes('ombra') || allText.includes('alber') || allText.includes('indoor') || act.categoryId === 'parchi' || act.categoryId === 'mare' || act.categoryId === 'ristoranti';
            if (!match) return false;
          } else {
            if (!allText.includes(service.toLowerCase())) return false;
          }
        }
      }

      // Category Filter
      if (selectedCategory !== 'all') {
        if (act.categoryId === selectedCategory) {
          // Exact match
        } else if (selectedCategory === 'parchi') {
          const isParchi = act.categoryId === 'parchi' || 
            (act.categoryName || '').toLowerCase().includes('parch') || 
            (act.categoryName || '').toLowerCase().includes('natur') ||
            (act.title || '').toLowerCase().includes('parco') ||
            (act.title || '').toLowerCase().includes('villa');
          if (!isParchi) return false;
        } else if (selectedCategory === 'sport') {
          const isSport = act.categoryId === 'sport' || 
            act.categoryId === 'gokart' || 
            act.categoryId === 'piscina' || 
            act.categoryId === 'mare' || 
            (act.categoryName || '').toLowerCase().includes('sport') ||
            (act.categoryName || '').toLowerCase().includes('nuot') ||
            (act.categoryName || '').toLowerCase().includes('vela') ||
            (act.categoryName || '').toLowerCase().includes('padel');
          if (!isSport) return false;
        } else if (selectedCategory === 'ristoranti') {
          const isRistoranti = act.categoryId === 'ristoranti' || 
            (act.categoryName || '').toLowerCase().includes('ristorant') || 
            (act.categoryName || '').toLowerCase().includes('mangiar') ||
            (act.categoryName || '').toLowerCase().includes('bar') ||
            (act.categoryName || '').toLowerCase().includes('local') ||
            (act.categoryName || '').toLowerCase().includes('feste') ||
            (act.title || '').toLowerCase().includes('pizza') ||
            (act.title || '').toLowerCase().includes('ristorante') ||
            (act.title || '').toLowerCase().includes('brunch') ||
            (act.title || '').toLowerCase().includes('merenda');
          if (!isRistoranti) return false;
        } else if (selectedCategory === 'indoor') {
          const isIndoor = act.categoryId === 'indoor' || 
            act.categoryId === 'cinema' || 
            act.categoryId === 'concerti' || 
            act.categoryId === 'lingue' || 
            act.categoryId === 'musica' || 
            (act.categoryName || '').toLowerCase().includes('chiuso') ||
            (act.categoryName || '').toLowerCase().includes('ludotec') ||
            (act.categoryName || '').toLowerCase().includes('laborator') ||
            (act.categoryName || '').toLowerCase().includes('teatro') ||
            (act.title || '').toLowerCase().includes('indoor') ||
            (act.title || '').toLowerCase().includes('ludoteca');
          if (!isIndoor) return false;
        } else if (act.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Organizer Filter
      if (selectedOrganizerFilter !== 'all') {
        const matchesOrgId = act.organizerId === selectedOrganizerFilter;
        const orgObj = ORGANIZERS.find((o) => o.id === selectedOrganizerFilter);
        const matchesOrgName = orgObj && (
          (act.organizer?.name || '').toLowerCase().includes((orgObj.name || '').toLowerCase().split(' ')[0]) ||
          (orgObj.name || '').toLowerCase().includes((act.organizer?.name || '').toLowerCase())
        );
        if (!matchesOrgId && !matchesOrgName) return false;
      }

      // Day of Week Filter (Bacheca Settimanale & Giornaliera)
      if (selectedDay !== 'all') {
        const hasMatchingSlot = (act.slots || []).some((slot) => {
          const day = (slot.dayOfWeek || '').toLowerCase();
          if (selectedDay === 'venerdi') return day.includes('venerdì') || day.includes('15');
          if (selectedDay === 'sabato') return day.includes('sabato') || day.includes('16');
          if (selectedDay === 'domenica') return day.includes('domenica') || day.includes('17');
          if (selectedDay === 'weekend') return day.includes('sabato') || day.includes('domenica');
          if (selectedDay === 'oggi') return day.includes('venerdì') || day.includes('15') || day.includes('oggi');
          if (selectedDay === 'domani') return day.includes('sabato') || day.includes('16') || day.includes('domani');
          return true;
        });
        if (!hasMatchingSlot) return false;
      }

      // Family Member Role Filter
      if (selectedFamilyMember) {
        if (selectedFamilyMember.role === 'mamma' && act.targetAudience !== 'mamme' && act.targetAudience !== 'famiglia') {
          return false;
        }
        if (selectedFamilyMember.role === 'papa' && act.targetAudience !== 'papa' && act.targetAudience !== 'famiglia') {
          return false;
        }
        if (selectedFamilyMember.role === 'bimbo' && act.targetAudience !== 'bimbi' && act.targetAudience !== 'famiglia') {
          return false;
        }
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = (act.title || '').toLowerCase().includes(query);
        const matchesSub = (act.subtitle || '').toLowerCase().includes(query);
        const matchesVenue = (act.venueName || '').toLowerCase().includes(query);
        const matchesZone = (act.zone || '').toLowerCase().includes(query);
        const matchesBadges = (act.badges || []).some((b) => (b || '').toLowerCase().includes(query));
        const matchesOrganizer = (act.organizer?.name || '').toLowerCase().includes(query) || Boolean(act.organizerId && (act.organizerId || '').toLowerCase().includes(query));
        if (!matchesTitle && !matchesSub && !matchesVenue && !matchesZone && !matchesBadges && !matchesOrganizer) {
          return false;
        }
      }

      // Free Events Filter
      if (onlyFree) {
        const isFree = 
          act.price === 0 || 
          Boolean(act.isTrialFree) || 
          (act.badges || []).some((b) => {
            const lower = (b || '').toLowerCase();
            return lower.includes('gratui') || lower.includes('gratis') || lower.includes('libero') || lower.includes('offerta');
          });
        if (!isFree) return false;
      }

      return true;
    });
  }, [
    selectedAgeGroups,
    selectedGenderTargets,
    selectedTimeSlots,
    selectedActivities,
    selectedZones,
    currentZone,
    selectedAudience,
    selectedAgeGroup,
    selectedServices,
    selectedCategory,
    selectedOrganizerFilter,
    selectedDay,
    selectedFamilyMember,
    searchQuery,
    onlyFree
  ]);

  const isFilterActive = useMemo(() => {
    return (
      selectedAgeGroups.length > 0 ||
      selectedGenderTargets.length > 0 ||
      selectedTimeSlots.length > 0 ||
      selectedActivities.length > 0 ||
      selectedZones.length > 0 ||
      selectedCategory !== 'all' || 
      selectedAudience !== 'all' || 
      selectedAgeGroup !== 'all' || 
      selectedDay !== 'all' || 
      currentZone !== 'Tutti i Quartieri' || 
      selectedServices.length > 0 || 
      Boolean(searchQuery) || 
      Boolean(selectedFamilyMember)
    );
  }, [
    selectedAgeGroups,
    selectedGenderTargets,
    selectedTimeSlots,
    selectedActivities,
    selectedZones,
    selectedCategory,
    selectedAudience,
    selectedAgeGroup,
    selectedDay,
    currentZone,
    selectedServices,
    searchQuery,
    selectedFamilyMember
  ]);

  const totalActiveFiltersCount = useMemo(() => {
    return (
      selectedAgeGroups.length +
      selectedActivities.length +
      selectedZones.length +
      selectedTimeSlots.length +
      selectedGenderTargets.length +
      (onlyFree ? 1 : 0)
    );
  }, [
    selectedAgeGroups,
    selectedActivities,
    selectedZones,
    selectedTimeSlots,
    selectedGenderTargets,
    onlyFree
  ]);

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];
    selectedAgeGroups.forEach((a) => labels.push(`Età: ${a}`));
    selectedGenderTargets.forEach((g) => labels.push(`Target: ${g}`));
    selectedTimeSlots.forEach((t) => labels.push(`Fascia: ${t}`));
    selectedActivities.forEach((act) => labels.push(`Attività: ${act}`));
    selectedZones.forEach((z) => labels.push(`Zona: ${z}`));
    if (selectedDay !== 'all') labels.push(`Giorno: ${selectedDay}`);
    if (searchQuery) labels.push(`Cerca: "${searchQuery}"`);
    return labels;
  }, [selectedAgeGroups, selectedGenderTargets, selectedTimeSlots, selectedActivities, selectedZones, selectedDay, searchQuery]);

  // Featured Events
  const featuredActivities = useMemo(() => {
    return filteredActivities.filter((a) => a.featured);
  }, [filteredActivities]);

  // Favorite Activities
  const favoriteActivities = useMemo(() => {
    return MOCK_ACTIVITIES.filter((a) => favorites.includes(a.id));
  }, [favorites]);

  // Handle Tab Switch
  const handleTabChange = (tab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets') => {
    setActiveTab(tab);
    setIsParksScreenOpen(false);
    if (tab === 'explore') {
      setViewMode('map');
    } else if (tab === 'planning') {
      setViewMode('planning');
    } else if (tab === 'home') {
      setViewMode('grid');
    } else if (tab === 'tickets') {
      setIsTicketsModalOpen(true);
    }
  };

  // Add Family Member
  const handleAddFamilyMember = (member: FamilyMemberProfile) => {
    setFamilyMembers((prev) => [...prev, member]);
  };

  // Delete Family Member
  const handleDeleteFamilyMember = (memberId: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== memberId));
    if (selectedFamilyMember?.id === memberId) {
      setSelectedFamilyMember(null);
    }
  };

  // Confirm New Booking
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  if (activeOrganizerPage) {
    const orgActivities = MOCK_ACTIVITIES.filter((act) => {
      if (act.organizerId && act.organizerId === activeOrganizerPage.id) return true;
      const orgFirstName = (activeOrganizerPage.name || '').toLowerCase().split(' ')[0];
      return (
        (act.organizer?.name || '').toLowerCase().includes(orgFirstName) ||
        (activeOrganizerPage.name || '').toLowerCase().includes((act.organizer?.name || '').toLowerCase())
      );
    });

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-20">
        <Header
          currentZone={currentZone}
          onSelectZone={setCurrentZone}
          selectedFamilyMember={selectedFamilyMember}
          familyMembers={familyMembers}
          onSelectFamilyMember={setSelectedFamilyMember}
          onOpenManageFamily={() => setIsFamilyModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setActiveOrganizerPage(null);
            setSearchQuery(q);
          }}
          activeTicketsCount={bookings.length}
          onOpenTickets={() => setIsTicketsModalOpen(true)}
          viewMode={viewMode === 'planning' ? 'grid' : viewMode}
          onToggleViewMode={() => setViewMode((prev) => (prev === 'grid' ? 'map' : 'grid'))}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenInternalDashboard={handleOpenInternalDashboard}
          internalRequestsCount={internalRequests.length}
        />
        <OrganizerProfilePage
          organizer={activeOrganizerPage}
          onBack={() => setActiveOrganizerPage(null)}
          organizerActivities={orgActivities}
          onSelectActivity={(act) => setActivityForDetail(act)}
          onOpenBooking={(act) => setActivityForBooking(act)}
          internalRequests={internalRequests}
          initialTab={organizerInitialTab}
        />
        {activityForDetail && (
          <ActivityDetailModal
            activity={activityForDetail}
            isOpen={!!activityForDetail}
            onClose={() => setActivityForDetail(null)}
            isFavorite={favorites.includes(activityForDetail.id)}
            onToggleFavorite={handleToggleFavorite}
            onOpenBooking={(act) => setActivityForBooking(act)}
            onOpenMapLocation={() => setViewMode('map')}
            onOpenOrganizerProfile={handleOpenOrganizerProfile}
          />
        )}
        {activityForBooking && (
          <BookingModal
            activity={activityForBooking}
            isOpen={!!activityForBooking}
            onClose={() => setActivityForBooking(null)}
            familyMembers={familyMembers}
            onConfirmBooking={handleConfirmBooking}
            onSendCustomRequest={handleAddInternalRequest}
          />
        )}
        <MyTicketsModal
          isOpen={isTicketsModalOpen}
          onClose={() => setIsTicketsModalOpen(false)}
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
        />
        <FamilyProfilesModal
          isOpen={isFamilyModalOpen}
          onClose={() => setIsFamilyModalOpen(false)}
          familyMembers={familyMembers}
          onAddMember={handleAddFamilyMember}
          onDeleteMember={handleDeleteFamilyMember}
        />
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-white text-slate-800 font-sans antialiased">
      
      {/* Sticky Top Header Navigation (Fixed Height) - Hidden when in full-screen views (Parks, Tickets & Map) */}
      {!isParksScreenOpen && activeTab !== 'tickets' && activeTab !== 'explore' && viewMode !== 'map' && (
        <Header
          currentZone={currentZone}
          onSelectZone={setCurrentZone}
          selectedFamilyMember={selectedFamilyMember}
          familyMembers={familyMembers}
          onSelectFamilyMember={setSelectedFamilyMember}
          onOpenManageFamily={() => setIsFamilyModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTicketsCount={bookings.length}
          onOpenTickets={() => setIsTicketsModalOpen(true)}
          viewMode={viewMode}
          onToggleViewMode={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
          hasActiveFilters={totalActiveFiltersCount > 0}
          activeFiltersCount={totalActiveFiltersCount}
          onOpenFilters={() => {
            setFilterModalTab('all');
            setIsFilterModalOpen(true);
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenInternalDashboard={handleOpenInternalDashboard}
          internalRequestsCount={internalRequests.length}

          // Mobile Filter Props
          selectedAgeGroups={selectedAgeGroups}
          onToggleAgeGroup={handleToggleAgeGroup}
          selectedGenderTargets={selectedGenderTargets}
          onToggleGenderTarget={handleToggleGenderTarget}
          selectedTimeSlots={selectedTimeSlots}
          onToggleTimeSlot={handleToggleTimeSlot}
          selectedActivities={selectedActivities}
          onToggleActivity={handleToggleActivity}
          selectedZones={selectedZones}
          onToggleZone={handleToggleZone}
          onResetFilters={() => {
            setSelectedAgeGroups([]);
            setSelectedGenderTargets([]);
            setSelectedTimeSlots([]);
            setSelectedActivities([]);
            setSelectedZones([]);
            setSelectedAudience('all');
            setSelectedCategory('all');
            setSelectedDay('all');
            setSelectedServices([]);
            setOnlyFree(false);
            setSearchQuery('');
          }}
          filteredCount={filteredActivities.length}
        />
      )}

      {/* 1. IMMOBILIARE.IT SPLIT-SCREEN MAP VIEW CONTAINER (Full Width, Left ~45% Cards + Right ~55% Fixed Map) */}
      <div 
        id="container-map"
        className={`flex-1 min-h-0 w-full overflow-hidden relative ${
          activeTab === 'explore' || viewMode === 'map' ? 'flex' : 'hidden'
        }`}
      >
        <MapScreenView
          activities={filteredActivities}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectActivity={(act) => setActivityForDetail(act)}
          onBookActivity={(act) => setActivityForBooking(act)}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          selectedDistance={selectedMaxDistance}
          onSelectDistance={setSelectedMaxDistance}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          isActive={activeTab === 'explore' || viewMode === 'map'}
          onSwitchToList={() => {
            setActiveTab('home');
            setViewMode('grid');
          }}
          onOpenFilters={() => {
            setFilterModalTab('all');
            setIsFilterModalOpen(true);
          }}
        />
      </div>

      {/* 2. CLASSIC HOME & OTHER TABS CONTAINER */}
      <div 
        id="container-home"
        className={`flex-1 min-h-0 w-full overflow-hidden ${
          activeTab === 'explore' || viewMode === 'map' ? 'hidden' : 'flex'
        }`}
      >
        {/* Main Content Area */}
        <main className={`flex-1 min-w-0 h-full ${isParksScreenOpen || activeTab === 'tickets' ? 'bg-[#FDFCFB]' : 'bg-white'} flex flex-col relative overflow-y-auto pb-24`}>
          {activeTab === 'planning' || viewMode === 'planning' ? (
            /* CALENDARIO VIEW (Design pulito e ordinato con barra Oggi 15 Mag, Domani 16 Mag, Scegli data, Filtri) */
            <ThreeColumnCalendarView
              activities={filteredActivities}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectActivity={(act) => setActivityForDetail(act)}
              onBookActivity={(act) => setActivityForBooking(act)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedAgeGroups={selectedAgeGroups}
              onToggleAgeGroup={handleToggleAgeGroup}
              selectedActivities={selectedActivities}
              onToggleActivity={handleToggleActivity}
              selectedZones={selectedZones}
              onToggleZone={handleToggleZone}
              selectedTimeSlots={selectedTimeSlots}
              onToggleTimeSlot={handleToggleTimeSlot}
              onlyFree={onlyFree}
              onToggleFree={() => setOnlyFree(!onlyFree)}
              onResetFilters={() => {
                setSelectedAgeGroups([]);
                setSelectedActivities([]);
                setSelectedZones([]);
                setSelectedTimeSlots([]);
                setSelectedGenderTargets([]);
                setOnlyFree(false);
              }}
            />
          ) : activeTab === 'favorites' ? (
            /* FAVORITES VIEW */
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-[var(--color-brand-700)] flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[var(--color-brand-700)] fill-[var(--color-brand-700)]" />
                    I Tuoi Eventi Preferiti a Palermo ({favoriteActivities.length})
                  </h2>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setViewMode('grid');
                    }}
                    className="text-xs font-bold text-[var(--color-petrolio-600)] hover:underline cursor-pointer"
                  >
                    ← Torna alla Home
                  </button>
                </div>

                {favoriteActivities.length === 0 ? (
                  <div className="text-center py-16 bg-[#EBF6F7] rounded-3xl border border-[var(--color-petrolio-200)] p-8 space-y-3 shadow-2xs">
                    <Heart className="w-12 h-12 text-[var(--color-brand-700)]/40 mx-auto" />
                    <h3 className="text-base font-bold text-[var(--color-brand-700)]">Nessun preferito salvato</h3>
                    <p className="text-xs text-[var(--color-brand-700)] max-w-sm mx-auto">
                      Clicca sull'icona a cuore in qualsiasi card per salvare gli eventi tra i tuoi preferiti.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('home');
                        setViewMode('grid');
                      }}
                      className="bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-700)] text-white text-xs font-bold px-6 py-2.5 rounded-full transition cursor-pointer shadow-xs"
                    >
                      Esplora Attività
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {favoriteActivities.map((act) => (
                      <ActivityCard
                        key={act.id}
                        activity={act}
                        isFavorite={favorites.includes(act.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelect={(activity) => setActivityForDetail(activity)}
                        onBookNow={(activity, e) => {
                          e.stopPropagation();
                          setActivityForBooking(activity);
                        }}
                      />
                    ))}
                  </div>
                )}

                <TrustFooterBar />
              </div>
            </div>
          ) : activeTab === 'tickets' ? (
            /* DEFINITIVE iOS PREMIUM TICKETS & BOOKINGS SCREEN (MAMAPP DESIGN SYSTEM) */
            <TicketsAndBookingsView
              bookings={bookings}
              onBackToHome={() => {
                setActiveTab('home');
                setViewMode('grid');
              }}
              onExploreActivities={() => {
                setActiveTab('home');
                setViewMode('grid');
              }}
              onSelectBookingDetail={(b) => {
                const matchedAct = MOCK_ACTIVITIES.find(a => a.id === b.activityId);
                if (matchedAct) setActivityForDetail(matchedAct);
              }}
            />
          ) : isParksScreenOpen ? (
            /* DEFINITIVE SINGLE HIGH-FIDELITY SCREEN FOR "PARCHI E NATURA" */
            <ParksScreenView
              category={activeCategoryType}
              onBackToHome={() => setIsParksScreenOpen(false)}
              activities={MOCK_ACTIVITIES}
              onSelectActivity={(act) => setActivityForDetail(act)}
              onOpenBooking={(act) => setActivityForBooking(act)}
              onOpenMapWithPark={(_parkName) => {
                setIsParksScreenOpen(false);
                setActiveTab('explore');
                setViewMode('map');
              }}
            />
          ) : (
            /* DEFINITIVE HOME DASHBOARD VIEW (Matching requested mockup) */
            <HomeDashboardView
              activities={filteredActivities}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectActivity={(act) => setActivityForDetail(act)}
              onBookActivity={(act) => setActivityForBooking(act)}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigateToParks={() => {
                setActiveCategoryType('parchi');
                setIsParksScreenOpen(true);
              }}
              onNavigateToCategory={(catId) => {
                setActiveCategoryType(catId);
                setIsParksScreenOpen(true);
              }}
              onViewAllToday={() => {
                setSelectedDay('oggi');
              }}
              onViewAllWeekend={() => {
                setSelectedDay('weekend');
              }}
              onSelectCategory={(catId) => {
                if (catId === 'all') {
                  setSelectedCategories(['sport', 'laboratori', 'piscina', 'parchi', 'cultura', 'feste']);
                } else {
                  setSelectedCategories([catId]);
                }
              }}
              selectedAgeGroups={selectedAgeGroups}
              onToggleAgeGroup={handleToggleAgeGroup}
              selectedActivities={selectedActivities}
              onToggleActivity={handleToggleActivity}
              selectedZones={selectedZones}
              onToggleZone={handleToggleZone}
              selectedTimeSlots={selectedTimeSlots}
              onToggleTimeSlot={handleToggleTimeSlot}
              onlyFree={onlyFree}
              onToggleFree={() => setOnlyFree(!onlyFree)}
              onResetFilters={() => {
                setSelectedAgeGroups([]);
                setSelectedActivities([]);
                setSelectedZones([]);
                setSelectedTimeSlots([]);
                setSelectedGenderTargets([]);
                setOnlyFree(false);
              }}
              onOpenMap={() => {
                setActiveTab('explore');
                setViewMode('map');
              }}
            />
          )}
        </main>
      </div>

      {/* Activity Detail Modal (Matching mockup 1) */}
      <ActivityDetailModal
        activity={activityForDetail}
        isOpen={!!activityForDetail}
        onClose={() => setActivityForDetail(null)}
        isFavorite={activityForDetail ? favorites.includes(activityForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenBooking={(act) => setActivityForBooking(act)}
        onOpenMapLocation={() => setViewMode('map')}
        onOpenOrganizerProfile={handleOpenOrganizerProfile}
      />

      {/* Organizer Profile & Calendar Modal */}
      <OrganizerProfileModal
        organizer={selectedOrganizerProfile}
        isOpen={!!selectedOrganizerProfile}
        onClose={() => setSelectedOrganizerProfile(null)}
        organizerActivities={selectedOrganizerActivities}
        onSelectActivity={(activity) => {
          setActivityForDetail(activity);
          setSelectedOrganizerProfile(null);
        }}
        onOpenBooking={(activity) => {
          setActivityForBooking(activity);
          setSelectedOrganizerProfile(null);
        }}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        activity={activityForBooking}
        isOpen={!!activityForBooking}
        onClose={() => setActivityForBooking(null)}
        familyMembers={familyMembers}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Active Digital Tickets Modal */}
      <MyTicketsModal
        isOpen={isTicketsModalOpen}
        onClose={() => setIsTicketsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Family Profiles Management Modal */}
      <FamilyProfilesModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        familyMembers={familyMembers}
        onAddMember={handleAddFamilyMember}
        onDeleteMember={handleDeleteFamilyMember}
      />

      {/* Global Mobile Filter Modal / Bottom Sheet */}
      <MobileFilterBottomSheet
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeCategoryTab={filterModalTab}
        onChangeCategoryTab={setFilterModalTab}
        selectedAgeGroups={selectedAgeGroups}
        onToggleAgeGroup={handleToggleAgeGroup}
        selectedActivities={selectedActivities}
        onToggleActivity={handleToggleActivity}
        selectedZones={selectedZones}
        onToggleZone={handleToggleZone}
        selectedTimeSlots={selectedTimeSlots}
        onToggleTimeSlot={handleToggleTimeSlot}
        onlyFree={onlyFree}
        onToggleFree={() => setOnlyFree(!onlyFree)}
        onResetFilters={() => {
          setSelectedAgeGroups([]);
          setSelectedGenderTargets([]);
          setSelectedTimeSlots([]);
          setSelectedActivities([]);
          setSelectedZones([]);
          setSelectedAudience('all');
          setSelectedCategory('all');
          setSelectedDay('all');
          setSelectedServices([]);
          setOnlyFree(false);
          setSearchQuery('');
        }}
        hasActiveFilters={totalActiveFiltersCount > 0}
        filteredCount={filteredActivities.length}
      />

      {/* Floating Bottom Navigation Bar (5 tabs matching reference screenshot) */}
      <BottomNavBar
        activeTab={isParksScreenOpen ? 'home' : activeTab}
        onChangeTab={handleTabChange}
        favoritesCount={favorites.length}
        ticketsCount={bookings.length}
      />

    </div>
  );
}
