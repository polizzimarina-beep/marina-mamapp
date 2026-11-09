import { Category, FamilyMemberProfile, Activity, Venue, Booking, TargetAudience, AgeBracketInfo, OrganizerProfile } from '../types';

import { ILLUSTRAZIONI } from './illustrazioni';
export const AGE_BRACKETS: AgeBracketInfo[] = [
  {
    id: '0-3',
    title: '0 - 3 Anni',
    sub: 'Nido & Neonati',
    range: [0, 3],
    icon: 'Baby',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    description: 'Acquaticità baby, stimolazione sensoriale Montessori e ninnananne in musica'
  },
  {
    id: '3-6',
    title: '3 - 6 Anni',
    sub: 'Scuola Infanzia',
    range: [3, 6],
    icon: 'Palette',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
    description: 'Lucilla Live, fiabe animate, danza giocosa e primi laboratori d\'arte'
  },
  {
    id: '6-10',
    title: '6 - 10 Anni',
    sub: 'Scuola Primaria',
    range: [6, 10],
    icon: 'Puzzle',
    badgeColor: 'bg-petrolio-50 text-petrolio-800 border-petrolio-200 hover:bg-petrolio-100',
    description: 'LEGO Robotics, scuola vela Optimist, go-kart e cucina siciliana'
  },
  {
    id: '10-14+',
    title: '10 - 14+ Anni',
    sub: 'Ragazzi & Teens',
    range: [10, 16],
    icon: 'Rocket',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100',
    description: 'SUP & Kayak a Mondello, padel junior, gare di kart e avventure nel parco'
  }
];

export const PALERMO_ZONES = [
  'Tutti i Quartieri',
  'Politeama / Centro',
  'Mondello / Addaura',
  'Parco della Favorita',
  'Viale Libertà / Notarbartolo',
  'Marina / Foro Italico',
  'Orto Botanico / Kalsa'
];

export const TARGET_AUDIENCES: { id: TargetAudience; label: string; icon: string; description: string }[] = [
  { id: 'all', label: 'Tutti gli Eventi', icon: 'Sparkles', description: 'Scopri tutte le attività per famiglie a Palermo' },
  { id: 'bimbi', label: 'Per Bimbi', icon: 'Baby', description: 'Spettacoli, concerti, nuoto e laboratori per i più piccoli' },
  { id: 'mamme', label: 'Per Mamme', icon: 'Heart', description: 'Yoga, pilates, benessere post-parto e incontri tra mamme' },
  { id: 'papa', label: 'Per Papà', icon: 'Shield', description: 'Go-kart, padel, vela e sfide divertenti padre-figlio' },
  { id: 'famiglia', label: 'Famiglia', icon: 'Users', description: 'Lidi attrezzati a Mondello, parchi avventura ed eventi insieme' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'concerti',
    name: 'Concerti & Spettacoli',
    iconName: 'Ticket',
    color: '#FF7A00',
    bgGradient: 'from-orange-500 to-amber-600',
    count: 8,
    description: 'Lucilla in concerto, teatri dei pupi siciliani e musical per bambini'
  },
  {
    id: 'yoga',
    name: 'Yoga & Wellness Mamme',
    iconName: 'HeartHandshake',
    color: 'var(--color-brand-600)',
    bgGradient: 'from-brand-500 to-brand-600',
    count: 12,
    description: 'Yoga post-parto, pilates e mindfulness per madri e neo-mamme'
  },
  {
    id: 'gokart',
    name: 'Go-Kart & Motori',
    iconName: 'Car',
    color: 'var(--color-brand-600)',
    bgGradient: 'from-red-500 to-orange-600',
    count: 6,
    description: 'Sfide go-kart, simulatori di guida e minimoto per papà e ragazzi'
  },
  {
    id: 'mare',
    name: 'Spot Mare Organizzati',
    iconName: 'Sun',
    color: 'var(--color-petrolio-600)',
    bgGradient: 'from-petrolio-400 to-blue-600',
    count: 15,
    description: 'Spiagge attrezzate a Mondello, solarium baby e sup per famiglie'
  },
  {
    id: 'piscina',
    name: 'Piscine & Nuoto Baby',
    iconName: 'Waves',
    color: 'var(--color-petrolio-500)',
    bgGradient: 'from-cyan-500 to-blue-600',
    count: 10,
    description: 'Acquaticità neonatale, corsi di nuoto e giochi in acqua riscaldata'
  },
  {
    id: 'sport',
    name: 'Sport & Club',
    iconName: 'Trophy',
    color: '#16A34A',
    bgGradient: 'from-emerald-500 to-green-700',
    count: 18,
    description: 'Calcio, tennis, padel papà-figlio, vela e arti marziali'
  },
  {
    id: 'lingue',
    name: 'Corsi di Lingue & Inglese',
    iconName: 'Languages',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 to-indigo-600',
    count: 9,
    description: 'Inglese giocoso per bambini, playgroup bilingue, storytelling, spagnolo e STEM in lingua'
  },
  {
    id: 'musica',
    name: 'Musica & Propedeutica',
    iconName: 'Music',
    color: 'var(--color-brand-600)',
    bgGradient: 'from-brand-500 to-brand-600',
    count: 10,
    description: 'Propedeutica musicale, pianoforte, chitarra baby e canto per bambini'
  },
  {
    id: 'circoli',
    name: 'Circoli & Feste',
    iconName: 'PartyPopper',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-yellow-600',
    count: 11,
    description: 'Circoli velici, ludoteche, compleanni ed eventi al parco'
  },
  {
    id: 'cinema',
    name: 'Cinema & Film Bimbi',
    iconName: 'Film',
    color: 'var(--color-brand-600)',
    bgGradient: 'from-brand-500 to-brand-600',
    count: 7,
    description: 'Rassegne di film per famiglie, cartoni animati al cinema e cineforum kids'
  },
  {
    id: 'parchi',
    name: 'Parchi Giochi & Natura',
    iconName: 'Trees',
    color: '#10B981',
    bgGradient: 'from-emerald-500 to-teal-600',
    count: 14,
    description: 'Ville storiche, parchi avventura, aree verdi e parchi giochi all\'aperto'
  },
  {
    id: 'ristoranti',
    name: 'Dove Mangiare Family',
    iconName: 'Utensils',
    color: '#F97316',
    bgGradient: 'from-orange-500 to-amber-600',
    count: 12,
    description: 'Locali, bar, pizzerie e ristoranti family-friendly con area giochi e fasciatoi'
  },
  {
    id: 'indoor',
    name: 'Al Chiuso & Ludoteche',
    iconName: 'Home',
    color: '#6366F1',
    bgGradient: 'from-indigo-500 to-purple-600',
    count: 16,
    description: 'Ludoteche, spazi indoor, laboratori al coperto e rifugi anti-maltempo'
  },
  {
    id: 'trasporti',
    name: 'Mappa & Trasporti',
    iconName: 'MapPin',
    color: 'var(--color-petrolio-600)',
    bgGradient: 'from-petrolio-500 to-blue-600',
    count: 5,
    description: 'Navette family friendly, bus panoramici, trenino di Mondello e mappa interattiva'
  }
];

export const MOCK_FAMILY_MEMBERS: FamilyMemberProfile[] = [
  {
    id: 'fam-1',
    name: 'Marina (Mamma)',
    role: 'mamma',
    avatar: '👩',
    color: 'bg-brand-100 text-brand-700 border-brand-300'
  },
  {
    id: 'fam-2',
    name: 'Marco (Papà)',
    role: 'papa',
    avatar: '👨',
    color: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  {
    id: 'fam-3',
    name: 'Matteo (7 anni)',
    role: 'bimbo',
    age: 7,
    avatar: '👦',
    color: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'fam-4',
    name: 'Sofia (3 anni)',
    role: 'bimbo',
    age: 3,
    avatar: '👧',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  }
];

export const MOCK_VENUES: Venue[] = [
  {
    id: 'venue-golden',
    name: 'Teatro Golden Palermo',
    address: 'Via Terrasanta 60, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    latitude: 38.1294,
    longitude: 13.3512,
    image: ILLUSTRAZIONI.teatro,
    rating: 4.9,
    reviewCount: 340,
    phone: '+39 091 626 4702',
    email: 'eventi@teatrogolden.it',
    facilities: ['Climatizzato', 'Aria condizionata', 'Accessibile disabili', 'Parcheggio convenzionato Barone', 'Bar interno'],
    description: 'Storico teatro di Palermo situato nel quartiere Politeama, punto di riferimento per spettacoli di musica, teatro ragazzi e concerti nazionali.'
  },
  {
    id: 'venue-favorita',
    name: 'Parco della Favorita & Villa Niscemi',
    address: 'Viale Ercole 1, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    latitude: 38.1631,
    longitude: 13.3444,
    image: ILLUSTRAZIONI.parchi,
    rating: 4.8,
    reviewCount: 190,
    phone: '+39 091 740 1111',
    email: 'favorita@comune.palermo.it',
    facilities: ['Area verde immensa', 'Zona ombra con pini secolari', 'Pista ciclabile', 'Area giochi bimbi'],
    description: 'Il polmone verde di Palermo ai piedi del Monte Pellegrino, perfetto per sessioni di yoga outdoor, picnic e attività sportive all’aperto.'
  },
  {
    id: 'venue-kartsam',
    name: 'Kartsam Arena & Speed Circuit Palermo',
    address: 'Via Minutilla 12, Palermo (Zona Uditore)',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    latitude: 38.1420,
    longitude: 13.3280,
    image: ILLUSTRAZIONI.sport,
    rating: 4.9,
    reviewCount: 210,
    phone: '+39 091 688 9012',
    email: 'info@kartsampalermo.it',
    facilities: ['Pista Outdoor 600m', 'Kart 270cc e Bi-posto Padre-Figlio', 'Teleschermi tempi in tempo reale', 'Area Lounge & Pizzeria'],
    description: 'La pista go-kart numero uno a Palermo per corse in sicurezza, sfide in famiglia e feste di compleanno con telemetria professionale.'
  },
  {
    id: 'venue-mondello',
    name: 'Mondello Family Beach Club',
    address: 'Viale Regina Elena 84, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    latitude: 38.2012,
    longitude: 13.3325,
    image: ILLUSTRAZIONI.mare,
    rating: 4.9,
    reviewCount: 420,
    phone: '+39 091 456 1234',
    email: 'lido@mondellofamily.it',
    facilities: ['Sabbia finissima e fondale basso', 'Animazione Miniclub', 'Cabine spogliatoio con fasciatoio', 'Ristorante con menù bimbi'],
    description: 'Stabilimento balneare a Mondello pensato su misura per mamme, papà e bambini con acqua cristallina, solarium distanziato e attività sportive acquatiche.'
  },
  {
    id: 'venue-piscina-comunale',
    name: 'Piscina Olimpionica Comunale di Palermo',
    address: 'Viale del Fante 5, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    latitude: 38.1560,
    longitude: 13.3480,
    image: ILLUSTRAZIONI.nuoto,
    rating: 4.6,
    reviewCount: 155,
    phone: '+39 091 670 3411',
    email: 'piscina@comune.palermo.it',
    facilities: ['Vasca interna coperta riscaldata', 'Spogliatoi riservati infanzia', 'Tribuna per genitori', 'Istruttori FIN'],
    description: 'Complesso natatorio di riferimento a Palermo con vasca coperta riscaldata dedicata ai corsi di nuoto neonatale e acquaticità per piccoli.'
  },
  {
    id: 'venue-lauria',
    name: 'Circolo Canottieri Roggero di Lauria',
    address: 'Viale Radice 1, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    latitude: 38.2045,
    longitude: 13.3390,
    image: ILLUSTRAZIONI.mare,
    rating: 4.9,
    reviewCount: 180,
    phone: '+39 091 450 011',
    email: 'segreteria@clublauria.it',
    facilities: ['3 Campi da Padel panoramici', 'Scuola Vela Optimist', 'Terrazza Vista Golfo di Mondello', 'Ristorante del Circolo'],
    description: 'Prestiglioso circolo velico e sportivo del golfo di Mondello con corsi di vela per bambini, padel per papà e ampie aree relax.'
  }
];

export const ORGANIZERS: OrganizerProfile[] = [
  {
    id: 'body-studio',
    name: 'Body Studio Palermo - Fitness & Family',
    category: 'Club Sportivo & Wellness Famiglie',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Il punto di riferimento a Palermo per lo sport di tutta la famiglia. Piscina olimpionica e baby, campi da padel panoramici, spogliatoi famiglia attrezzati, centro estivo multisport e lezioni prova gratuite.',
    address: 'Via Venti Settembre 5, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    phone: '+39 091 625 1122',
    email: 'info@bodystudiopalermo.it',
    website: 'https://www.bodystudiopalermo.it',
    instagram: '@bodystudiopalermo',
    isPartner: true,
    verified: true,
    rating: 4.9,
    reviewCount: 184,
    badges: ['Partner MAMA Ufficiale', 'Piscina Coperta Riscaldata', 'Padel Junior', 'Nursery & Baby Lounge']
  },
  {
    id: 'virgin-active',
    name: 'Virgin Active Palermo - Via Freedom',
    category: 'Club Fitness & Premium Wellness',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Club Fitness Premium nel cuore di Palermo. Piscina da 25m per nuoto neonatale e baby, corsi outdoor per mamme, lezioni di padel con maestri FITP e area relax e ristorazione bio.',
    address: 'Via Libertà 42, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    phone: '+39 091 782 9900',
    email: 'palermo@virginactive.it',
    website: 'https://www.virginactive.it',
    instagram: '@virginactiveit',
    isPartner: true,
    verified: true,
    rating: 4.9,
    reviewCount: 240,
    badges: ['Club Premium', 'Piscina 25m', 'Padel FITP', 'Area Relax SPA', 'Bar Bio']
  },
  {
    id: 'almanegra-kids',
    name: 'Almanegra Kids Events Palermo',
    category: 'Spettacoli & Concerti per Bambini',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.musica,
    description: 'Agenzia di produzione e promozione spettacoli dal vivo per famiglie e bambini a Palermo. Organizzatrice dei tour Lucilla Live, teatro dei pupi e musical per l\'infanzia.',
    address: 'Teatro Golden - Via Terrasanta 60, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    phone: '+39 091 582 345',
    email: 'eventi@almanagrakids.it',
    website: 'https://www.almanagrakids.it',
    instagram: '@almanagrakids',
    isPartner: true,
    verified: true,
    rating: 5.0,
    reviewCount: 310,
    badges: ['Lucilla Live Tour', 'Meet & Greet Esclusivi', 'Teatro delle Marionette']
  },
  {
    id: 'mamme-in-movimento',
    name: 'Mamme in Movimento Palermo',
    category: 'Associazione Benessere Maternità',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Community di ostetriche, insegnanti yoga ed esperte di movimento in gravidanza e post-parto a Palermo. Attività all\'aperto nei parchi e centri accreditati.',
    address: 'Parco della Favorita / Giardino Inglese, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    phone: '+39 347 112 2334',
    email: 'info@mammeinmovimento.it',
    instagram: '@mammeinmovimentopalermo',
    isPartner: true,
    verified: true,
    rating: 4.8,
    reviewCount: 92,
    badges: ['Yoga Post-Parto', 'Passeggiata Fitness', 'Corsi all\'Aperto']
  },
  {
    id: 'club-velico-mondello',
    name: 'Club Velico Mondello',
    category: 'Scuola Vela & Sport Acquatici',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.mare,
    description: 'Scuola di vela affiliata alla Federazione Italiana Vela (FIV) nella baia di Mondello. Corsi per ragazzi su barche Optimist, lezioni SUP e camp estivi di mare.',
    address: 'Viale Regina Elena 12, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    phone: '+39 091 455 889',
    email: 'scuola@clubvelicomondello.it',
    website: 'https://www.clubvelicomondello.it',
    isPartner: true,
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    badges: ['Scuola FIV Certificata', 'Spiaggia Privata Attrezzata', 'Attrezzatura Inclusa']
  },
  {
    id: 'sicilia-gokart',
    name: 'Sicilia Go-Kart Academy',
    category: 'Motorsport & Circuiti Karting',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Circuito outdoor con kart biposto per gare genitore-figlio, minikart per bambini dai 6 anni e scuola di guida in pista con cronometraggio professionale.',
    address: 'Circuito del Sole - Viale Regione Siciliana, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    phone: '+39 091 888 776',
    email: 'info@siciliagokart.it',
    isPartner: true,
    verified: true,
    rating: 4.8,
    reviewCount: 85,
    badges: ['Kart Biposto Papà-Figlio', 'Mini-Kart 6-12 Anni', 'Casco e Tuta Forniti']
  },
  {
    id: 'accademia-musica',
    name: 'Accademia della Musica Palermo',
    category: 'Scuola di Musica & Laboratori',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.musica,
    description: 'Centro musicale e artistico per l\'infanzia. Propedeutica musicale per bimbi 0-6 anni, coro delle voci bianche, lezioni di pianoforte e percussioni.',
    address: 'Via Ruggero Settimo 28, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    phone: '+39 091 324 112',
    email: 'segreteria@accademiamusicapalermo.it',
    isPartner: true,
    verified: true,
    rating: 4.9,
    reviewCount: 76,
    badges: ['Metodo Orff', 'Canti & Fiabe in Musica', 'Aule Insonorizzate']
  },
  {
    id: 'circolo-favorita',
    name: 'Circolo Tennis Favorita',
    category: 'Club Tennis & Padel Junior',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Immerso nel Parco della Favorita, offre corsi di tennis per tutte le età, lezioni di padel padri-figli, piscina estiva e camp multi-attività.',
    address: 'Viale Ercole, Parco della Favorita, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    phone: '+39 091 670 120',
    email: 'info@tennisfavorita.it',
    isPartner: true,
    verified: true,
    rating: 4.7,
    reviewCount: 110,
    badges: ['Campi in Terra', 'Padel Panorama', 'Club House Ristorante']
  },
  {
    id: 'oxygen-fitness',
    name: 'OXYGEN Fitness Place',
    category: 'Discipline Sportive, Fitness & Salute',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'OXYGEN Fitness Place è il centro sportivo e palinsesto fitness di riferimento a Palermo per la ginnastica finalizzata alla salute, il condizionamento muscolare, fit boxe, functional circuit e rieducazione motoria. Con sala attrezzi interna ed esterna aperta 7 giorni su 7, offre un ricco palinsesto con corsi di Functional Joy Circuit, Fit Boxe, Tabata, Functional Glutes, Stretching Mobility, Yogy Ginnastica e Total Body guidati da istruttori qualificati.',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    phone: '+39 091 688 2211',
    email: 'info@oxygenfitness.it',
    website: 'https://www.oxygenfitness.it',
    instagram: '@oxygenfitness.it',
    isPartner: true,
    verified: true,
    rating: 4.9,
    reviewCount: 195,
    badges: ['Sala Attrezzi Esterna & Interna', 'Palinsesto Settimanale Complete', 'Fit Boxe & Functional', 'Istruttori Qualificati', 'Ginnastica Salute & Fitness']
  },
  {
    id: 'spazio-euphoria',
    name: 'Spazio Euphoria - Circo Creativo',
    category: 'Arti Circensi, Acrobatica Aerea & Teen',
    logo: ILLUSTRAZIONI.profilo,
    coverImage: ILLUSTRAZIONI.sport,
    description: 'Spazio Euphoria - Circo Creativo è il centro polifunzionale a Palermo dedicato alle arti circensi contemporanee, alla danza aerea, al parkour e all\'acrobatica per bambini, teen e ragazzi. Offre un palinsesto settimanale continuo con lezioni fisse e ricorrenti dal Lunedì al Sabato condotte da insegnanti certificate (Antonella, Giulia, Chiara).',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    phone: '+39 091 582 3010',
    email: 'info@spazioeuphoria.it',
    website: 'https://www.spazioeuphoria.it',
    instagram: '@spazio_euphoria',
    isPartner: true,
    verified: true,
    rating: 5.0,
    reviewCount: 98,
    badges: ['Circo Creativo', 'Aerea Teen L1 & L2', 'Multi Ninja & Acro', 'Acrobatica 14+', 'Free Training', 'Palinsesto Ricorrente']
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-artisti',
    title: 'Piccoli Artisti',
    subtitle: 'Laboratorio creativo di pittura e colori per bambini a Mondello',
    categoryId: 'laboratori',
    categoryName: 'Laboratori Creativi',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-mondello',
    venueName: 'Mondello',
    address: 'Viale Regina Elena 84, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    distanceKm: 1.2,
    ageMin: 3,
    ageMax: 6,
    rating: 4.9,
    reviewCount: 142,
    attendeesCount: 220,
    price: 12,
    originalPrice: 16,
    priceUnit: 'a bambino',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.creativi,
    gallery: [
      ILLUSTRAZIONI.creativi
    ],
    badges: ['Colori Atossici', 'Grembiulino Incluso', 'Piccoli Gruppi'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Un laboratorio immersivo dove i bambini sperimentano la pittura con tempere, pennelli e dita in un ambiente accogliente e stimolante a Mondello.',
    whatToBring: ['Vestiti comodi che si possono sporcare'],
    requirements: ['Accompagnatore richiesto per bimbi sotto i 4 anni.'],
    latitude: 38.2012,
    longitude: 13.3325,
    slots: [
      { id: 's-art-1', dayOfWeek: 'Oggi', time: '16:30 - 17:30', availableSeats: 8, startDate: '2026-05-15' },
      { id: 's-art-2', dayOfWeek: 'Domani', time: '10:30 - 11:30', availableSeats: 5, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Atelier Bimbi Mondello',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Atelier d\'Arte'
    }
  },
  {
    id: 'act-acquaticita',
    title: 'Acquaticità',
    subtitle: 'Corso di confidenza con l\'acqua e nuoto baby con istruttori FIN',
    categoryId: 'piscina',
    categoryName: 'Nuoto Baby',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-piscina-comunale',
    venueName: 'Palermo Centro',
    address: 'Viale del Fante 5, Palermo',
    city: 'Palermo',
    zone: 'Palermo Centro',
    distanceKm: 2.4,
    ageMin: 4,
    ageMax: 8,
    rating: 4.8,
    reviewCount: 98,
    attendeesCount: 160,
    price: 15,
    originalPrice: 20,
    priceUnit: 'a bambino',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.nuoto,
    gallery: [
      ILLUSTRAZIONI.nuoto
    ],
    badges: ['Acqua Riscaldata 32°', 'Istruttori FIN', 'Spogliatoio Famiglia'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Lezioni di acquaticità per stimolare la coordinazione, la respirazione e il piacere di muoversi in acqua in totale sicurezza.',
    whatToBring: ['Costumino contenitivo o costume', 'Cuffia e ciabattine'],
    requirements: ['Certificato medico non agonistico.'],
    latitude: 38.1250,
    longitude: 13.3550,
    slots: [
      { id: 's-acq-1', dayOfWeek: 'Oggi', time: '17:00 - 18:00', availableSeats: 6, startDate: '2026-05-15' },
      { id: 's-acq-2', dayOfWeek: 'Domani', time: '17:00 - 18:00', availableSeats: 4, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Baby Swim Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola Nuoto'
    }
  },
  {
    id: 'act-mini-calcio',
    title: 'Mini Calcio',
    subtitle: 'Primi calci, gioco di squadra e coordinazione motoria all\'aperto',
    categoryId: 'sport',
    categoryName: 'Sport di Squadra',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-kartsam',
    venueName: 'Uditore',
    address: 'Via Minutilla 12, Palermo',
    city: 'Palermo',
    zone: 'Uditore',
    distanceKm: 3.1,
    ageMin: 5,
    ageMax: 10,
    rating: 4.9,
    reviewCount: 115,
    attendeesCount: 200,
    price: 10,
    originalPrice: 15,
    priceUnit: 'a bambino',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Campo in Erba Sintetica', 'Pallone Fornito', 'Educatori Sportivi'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Divertimento assicurato con il pallone: esercizi ludici, staffette e partitelle amichevoli per imparare il rispetto e il lavoro di squadra.',
    whatToBring: ['Scarpe da ginnastica o calcetto', 'Borraccia d\'acqua'],
    requirements: ['Abbigliamento sportivo.'],
    latitude: 38.1340,
    longitude: 13.3220,
    slots: [
      { id: 's-cal-1', dayOfWeek: 'Oggi', time: '17:30 - 18:30', availableSeats: 10, startDate: '2026-05-15' },
      { id: 's-cal-2', dayOfWeek: 'Domani', time: '16:30 - 17:30', availableSeats: 8, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Junior Academy Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Polisportivo'
    }
  },
  {
    id: 'act-ninja',
    title: 'Acro Ninja (8+) e Multininja',
    subtitle: 'Corso di ginnastica acrobatica, tessuti aerei e percorsi ninja',
    categoryId: 'sport',
    categoryName: 'Ginnastica e Movimento',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-ninja-politeama',
    venueName: 'Politeama',
    address: 'Via Dante 18, Palermo',
    city: 'Palermo',
    zone: 'Politeama',
    distanceKm: 2.4,
    ageMin: 8,
    ageMax: 14,
    rating: 4.9,
    reviewCount: 88,
    attendeesCount: 140,
    price: 18,
    originalPrice: 22,
    priceUnit: 'a bambino',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Tessuti Aerei', 'Tappeti di Sicurezza', 'Istruttori FGI'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Impara acrobazie spettacolari, arrampicate su tessuti e percorsi a ostacoli ninja in totale sicurezza con maestri federali.',
    whatToBring: ['Leggings o tuta comoda', 'Calzini antiscivolo'],
    requirements: ['Adatto dai 8 anni in su.'],
    latitude: 38.1250,
    longitude: 13.3550,
    slots: [
      { id: 's-nin-1', dayOfWeek: 'Oggi', time: '18:00 - 19:00', availableSeats: 8, startDate: '2026-05-15' },
      { id: 's-nin-2', dayOfWeek: 'Domani', time: '18:00 - 19:00', availableSeats: 6, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Acro Gym Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Acrobatica'
    }
  },
  {
    id: 'act-kart',
    title: 'Gran Premio Go-Kart Sfida Palermo',
    subtitle: 'Gara su pista indoor con kart baby ed elettrici in sicurezza',
    categoryId: 'sport',
    categoryName: 'Eventi e Sport',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-karting',
    venueName: 'Zona Industriale',
    address: 'Via Ugo La Malfa 150, Palermo',
    city: 'Palermo',
    zone: 'Zona Industriale',
    distanceKm: 4.5,
    ageMin: 6,
    ageMax: 12,
    rating: 5.0,
    reviewCount: 160,
    attendeesCount: 310,
    price: 20,
    originalPrice: 25,
    priceUnit: 'a bambino',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Kart Elettrici Sicuri', 'Casco & Tuta Forniti', 'Podio e Medaglia'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Il brivido della pista per giovani piloti: qualifiche, warm-up e gran premio finale con premiazione sul podio.',
    whatToBring: ['Scarpe chiuse'],
    requirements: ['Altezza minima 115 cm.'],
    latitude: 38.1600,
    longitude: 13.3100,
    slots: [
      { id: 's-krt-1', dayOfWeek: 'Oggi', time: '18:00 - 19:30', availableSeats: 12, startDate: '2026-05-15' },
      { id: 's-krt-2', dayOfWeek: 'Domani', time: '18:00 - 19:30', availableSeats: 8, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Karting Arena Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Circuito Kart'
    }
  },
  {
    id: 'act-lucilla',
    title: 'Lucilla in Concerto - Live Show Bambini',
    subtitle: 'Canta e balla dal vivo con la regina della musica per bambini a Palermo!',
    categoryId: 'concerti',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-golden',
    venueName: 'Teatro Golden Palermo',
    address: 'Via Terrasanta 60, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    distanceKm: 0.8,
    ageMin: 1,
    ageMax: 10,
    rating: 4.9,
    reviewCount: 280,
    attendeesCount: 450,
    price: 18,
    originalPrice: 22,
    priceUnit: 'biglietto unico',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.musica,
    videoTeaserUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    gallery: [
      ILLUSTRAZIONI.musica,
      ILLUSTRAZIONI.musica,
      ILLUSTRAZIONI.musica
    ],
    badges: ['Lucilla Live Palermo', 'Incontro & Foto Finale', 'Sconto Famiglia -15%'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Lucilla arriva a Palermo con il suo travolgente show per famiglie! 80 minuti di canzoni, coreografie trascinanti, luci magiche e sorprese dal vivo. Tutti i bambini potranno cantare le canzoni più famose del web e fare la foto sul palco con Lucilla al termine del concerto.',
    whatToBring: ['Voglia di ballare e cantare!', 'Biglietto digitale sul cellulare'],
    requirements: ['I bambini sotto i 2 anni non pagano se seduti in grembo ai genitori.'],
    latitude: 38.1294,
    longitude: 13.3512,
    slots: [
      { id: 's-luc-1', dayOfWeek: 'Sabato 16 Maggio', time: '17:00 - 18:30', availableSeats: 12, startDate: '2026-05-16' },
      { id: 's-luc-2', dayOfWeek: 'Domenica 17 Maggio', time: '10:30 - 12:00', availableSeats: 5, startDate: '2026-05-17' },
      { id: 's-luc-3', dayOfWeek: 'Sabato 23 Maggio', time: '16:00 - 17:30', availableSeats: 18, startDate: '2026-05-23' },
      { id: 's-luc-4', dayOfWeek: 'Sabato 6 Giugno', time: '17:00 - 18:30', availableSeats: 15, startDate: '2026-06-06' },
      { id: 's-luc-5', dayOfWeek: 'Domenica 14 Giugno', time: '11:00 - 12:30', availableSeats: 10, startDate: '2026-06-14' },
      { id: 's-luc-6', dayOfWeek: 'Sabato 20 Giugno', time: '16:30 - 18:00', availableSeats: 8, startDate: '2026-06-20' },
      { id: 's-luc-7', dayOfWeek: 'Sabato 4 Luglio', time: '17:30 - 19:00', availableSeats: 20, startDate: '2026-07-04' },
      { id: 's-luc-8', dayOfWeek: 'Domenica 12 Luglio', time: '10:30 - 12:00', availableSeats: 14, startDate: '2026-07-12' },
      { id: 's-luc-9', dayOfWeek: 'Sabato 25 Luglio', time: '17:00 - 18:30', availableSeats: 16, startDate: '2026-07-25' },
      { id: 's-luc-10', dayOfWeek: 'Sabato 8 Agosto', time: '18:00 - 19:30', availableSeats: 22, startDate: '2026-08-08' },
      { id: 's-luc-11', dayOfWeek: 'Domenica 16 Agosto', time: '11:00 - 12:30', availableSeats: 12, startDate: '2026-08-16' },
      { id: 's-luc-12', dayOfWeek: 'Sabato 29 Agosto', time: '17:30 - 19:00', availableSeats: 18, startDate: '2026-08-29' },
      { id: 's-luc-13', dayOfWeek: 'Sabato 5 Settembre', time: '17:00 - 18:30', availableSeats: 15, startDate: '2026-09-05' },
      { id: 's-luc-14', dayOfWeek: 'Domenica 20 Settembre', time: '10:30 - 12:00', availableSeats: 9, startDate: '2026-09-20' },
      { id: 's-luc-15', dayOfWeek: 'Sabato 3 Ottobre', time: '16:30 - 18:00', availableSeats: 14, startDate: '2026-10-03' },
      { id: 's-luc-16', dayOfWeek: 'Domenica 18 Ottobre', time: '11:00 - 12:30', availableSeats: 11, startDate: '2026-10-18' },
      { id: 's-luc-17', dayOfWeek: 'Sabato 7 Novembre', time: '16:30 - 18:00', availableSeats: 16, startDate: '2026-11-07' },
      { id: 's-luc-18', dayOfWeek: 'Domenica 22 Novembre', time: '11:00 - 12:30', availableSeats: 12, startDate: '2026-11-22' },
      { id: 's-luc-19', dayOfWeek: 'Sabato 12 Dicembre', time: '17:00 - 18:30', availableSeats: 20, startDate: '2026-12-12' },
      { id: 's-luc-20', dayOfWeek: 'Domenica 20 Dicembre', time: '11:00 - 12:30', availableSeats: 15, startDate: '2026-12-20' }
    ],
    organizer: {
      name: 'Almanegra Kids Events Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Organizzatore Tour Sicilia',
      phone: '+39 091 626 4702'
    },
    instructors: [
      {
        name: 'Lucilla',
        role: 'Artista & Cantante Bambini',
        avatar: ILLUSTRAZIONI.profilo,
        experience: 'Star della musica infanzia con oltre 100M di visualizzazioni',
        certifications: ['Live Show Award 2025']
      }
    ],
    reviews: [
      {
        id: 'r-luc-1',
        parentName: 'Chiara R. (Mamma di Sofia)',
        childAge: '4 anni',
        rating: 5,
        date: '2 giorni fa',
        comment: 'Spettacolo stupendo! Sofia non ha smesso un secondo di ballare. Lucilla è dolcissima con i bambini.',
        verified: true
      },
      {
        id: 'r-luc-2',
        parentName: 'Giuseppe T. (Papà)',
        childAge: '6 e 3 anni',
        rating: 5,
        date: '1 settimana fa',
        comment: 'Teatro Golden organizzato benissimo con ingresso prioritario per le famiglie con passeggino.',
        verified: true
      }
    ]
  },
  {
    id: 'act-yoga-mamme',
    title: 'Yoga Post-Parto & Vinyasa in Natura per Mamme',
    subtitle: 'Ritrova energia, flessibilità e benessere con il tuo bambino all’aperto nel verde della Favorita',
    categoryId: 'yoga',
    targetAudience: 'mamme',
    targetAudienceLabel: 'Per Mamme 🧘‍♀️',
    venueId: 'venue-favorita',
    venueName: 'Parco della Favorita',
    address: 'Viale Ercole 1, Palermo (Prato Villa Niscemi)',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    distanceKm: 3.2,
    ageMin: 0,
    ageMax: 99,
    rating: 4.9,
    reviewCount: 142,
    attendeesCount: 190,
    price: 12,
    originalPrice: 18,
    priceUnit: 'singola sessione',
    courseType: 'single',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Lezione Prova Gratis', 'Tisana Rinfrescante Inclusa', 'Spazio Bimbi Accanto'],
    featured: true,
    popular: true,
    isTrialFree: true,
    description: 'Una lezione rilassante e rigenerante studiata per le mamme (anche con neonati al seguito in fascia o passeggino). Lavoro su pavimento pelvico, postura, respirazione diaframmatica e riduzione dello stress, circondati dai pini della Favorita.',
    whatToBring: ['Tappetino da yoga o asciugamano', 'Abbigliamento comodo', 'Borraccia d’acqua'],
    requirements: ['Adatto anche a principianti e neo-mamme da 6 settimane dopo il parto.'],
    latitude: 38.1631,
    longitude: 13.3444,
    slots: [
      { id: 's-yog-1', dayOfWeek: 'Sabato 16 Maggio', time: '09:30 - 10:45', availableSeats: 8, startDate: '2026-05-16' },
      { id: 's-yog-2', dayOfWeek: 'Martedì 19 Maggio', time: '10:00 - 11:15', availableSeats: 6, startDate: '2026-05-19' },
      { id: 's-yog-3', dayOfWeek: 'Giovedì 21 Maggio', time: '17:30 - 18:45', availableSeats: 4, startDate: '2026-05-21' },
      { id: 's-yog-4', dayOfWeek: 'Sabato 30 Maggio', time: '09:30 - 10:45', availableSeats: 7, startDate: '2026-05-30' },
      { id: 's-yog-5', dayOfWeek: 'Martedì 2 Giugno', time: '10:00 - 11:15', availableSeats: 9, startDate: '2026-06-02' },
      { id: 's-yog-6', dayOfWeek: 'Sabato 13 Giugno', time: '09:30 - 10:45', availableSeats: 5, startDate: '2026-06-13' },
      { id: 's-yog-7', dayOfWeek: 'Giovedì 25 Giugno', time: '17:30 - 18:45', availableSeats: 6, startDate: '2026-06-25' },
      { id: 's-yog-8', dayOfWeek: 'Sabato 11 Luglio', time: '09:30 - 10:45', availableSeats: 10, startDate: '2026-07-11' },
      { id: 's-yog-9', dayOfWeek: 'Martedì 21 Luglio', time: '10:00 - 11:15', availableSeats: 8, startDate: '2026-07-21' },
      { id: 's-yog-10', dayOfWeek: 'Sabato 8 Agosto', time: '09:30 - 10:45', availableSeats: 12, startDate: '2026-08-08' },
      { id: 's-yog-11', dayOfWeek: 'Giovedì 20 Agosto', time: '17:30 - 18:45', availableSeats: 7, startDate: '2026-08-20' },
      { id: 's-yog-12', dayOfWeek: 'Sabato 12 Settembre', time: '09:30 - 10:45', availableSeats: 8, startDate: '2026-09-12' },
      { id: 's-yog-13', dayOfWeek: 'Martedì 22 Settembre', time: '10:00 - 11:15', availableSeats: 6, startDate: '2026-09-22' },
      { id: 's-yog-14', dayOfWeek: 'Sabato 10 Ottobre', time: '09:30 - 10:45', availableSeats: 9, startDate: '2026-10-10' },
      { id: 's-yog-15', dayOfWeek: 'Giovedì 22 Ottobre', time: '17:30 - 18:45', availableSeats: 5, startDate: '2026-10-22' },
      { id: 's-yog-16', dayOfWeek: 'Sabato 14 Novembre', time: '09:30 - 10:45', availableSeats: 8, startDate: '2026-11-14' },
      { id: 's-yog-17', dayOfWeek: 'Giovedì 26 Novembre', time: '17:30 - 18:45', availableSeats: 6, startDate: '2026-11-26' },
      { id: 's-yog-18', dayOfWeek: 'Sabato 12 Dicembre', time: '09:30 - 10:45', availableSeats: 10, startDate: '2026-12-12' },
      { id: 's-yog-19', dayOfWeek: 'Martedì 22 Dicembre', time: '10:00 - 11:15', availableSeats: 7, startDate: '2026-12-22' }
    ],
    organizer: {
      name: 'Mamme in Movimento Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Certificato Yoga Maternità',
      phone: '+39 091 740 1111'
    },
    instructors: [
      {
        name: 'Federica Bonanno',
        role: 'Insegnante Yoga Post-Parto & Doula',
        avatar: ILLUSTRAZIONI.profilo,
        experience: '10 anni di insegnamento yoga maternità',
        certifications: ['RYT 500 Prenatal & Postnatal']
      }
    ],
    reviews: [
      {
        id: 'r-yog-1',
        parentName: 'Valeria C.',
        rating: 5,
        date: '3 giorni fa',
        comment: 'Un’oasi di pace nel verde di Palermo! Posso portare la mia bimba di 5 mesi che dorme tranquilla nel passeggino mentre io ritrovo me stessa.',
        verified: true
      }
    ]
  },
  {
    id: 'act-gokart-papa',
    title: 'Gran Premio Go-Kart Sfida Padre & Figlio',
    subtitle: 'Sfreccia in sicurezza su pista outdoor con telemetria live e trofeo finale!',
    categoryId: 'gokart',
    targetAudience: 'papa',
    targetAudienceLabel: 'Per Papà 👨‍👦',
    venueId: 'venue-kartsam',
    venueName: 'Kartsam Arena Palermo',
    address: 'Via Minutilla 12, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 2.5,
    ageMin: 6,
    ageMax: 16,
    rating: 4.9,
    reviewCount: 165,
    attendeesCount: 220,
    price: 25,
    originalPrice: 35,
    priceUnit: 'coppia Papà + Figlio',
    courseType: 'single',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Sconto Coppia Papà-Figlio', 'Casco & Balaclava Forniti', 'Stampa Tempi e Podio'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Adrenalina pura in totale sicurezza! Una sfida a cronometro per papà e ragazzi su kart mono e bi-posto. Comprende briefing tecnico sulla guida, 8 minuti di qualifiche, 10 giri di gara finale, stampa della telemetria con i tempi sul giro e medaglia ricordo per i ragazzi.',
    whatToBring: ['Scarpe da ginnastica chiuse', 'Pantaloni lunghi raccomandati'],
    requirements: ['Altezza minima ragazzi 120 cm per kart mono-posto. Disponibili kart bi-posto per i più piccoli.'],
    latitude: 38.1420,
    longitude: 13.3280,
    slots: [
      { id: 's-kart-1', dayOfWeek: 'Venerdì 15 Maggio', time: '18:00 - 19:30', availableSeats: 5, startDate: '2026-05-15' },
      { id: 's-kart-2', dayOfWeek: 'Sabato 16 Maggio', time: '16:00 - 17:30', availableSeats: 3, startDate: '2026-05-16' },
      { id: 's-kart-3', dayOfWeek: 'Domenica 17 Maggio', time: '11:00 - 12:30', availableSeats: 8, startDate: '2026-05-17' },
      { id: 's-kart-4', dayOfWeek: 'Sabato 23 Maggio', time: '17:00 - 18:30', availableSeats: 6, startDate: '2026-05-23' },
      { id: 's-kart-5', dayOfWeek: 'Venerdì 5 Giugno', time: '18:00 - 19:30', availableSeats: 7, startDate: '2026-06-05' },
      { id: 's-kart-6', dayOfWeek: 'Sabato 13 Giugno', time: '16:00 - 17:30', availableSeats: 4, startDate: '2026-06-13' },
      { id: 's-kart-7', dayOfWeek: 'Domenica 21 Giugno', time: '11:00 - 12:30', availableSeats: 9, startDate: '2026-06-21' },
      { id: 's-kart-8', dayOfWeek: 'Sabato 4 Luglio', time: '17:00 - 18:30', availableSeats: 10, startDate: '2026-07-04' },
      { id: 's-kart-9', dayOfWeek: 'Domenica 19 Luglio', time: '11:00 - 12:30', availableSeats: 5, startDate: '2026-07-19' },
      { id: 's-kart-10', dayOfWeek: 'Sabato 1 Agosto', time: '18:00 - 19:30', availableSeats: 8, startDate: '2026-08-01' },
      { id: 's-kart-11', dayOfWeek: 'Sabato 15 Agosto', time: '17:00 - 18:30', availableSeats: 11, startDate: '2026-08-15' },
      { id: 's-kart-12', dayOfWeek: 'Sabato 5 Settembre', time: '16:00 - 17:30', availableSeats: 6, startDate: '2026-09-05' },
      { id: 's-kart-13', dayOfWeek: 'Domenica 20 Settembre', time: '11:00 - 12:30', availableSeats: 7, startDate: '2026-09-20' },
      { id: 's-kart-14', dayOfWeek: 'Sabato 3 Ottobre', time: '17:00 - 18:30', availableSeats: 9, startDate: '2026-10-03' },
      { id: 's-kart-15', dayOfWeek: 'Domenica 18 Ottobre', time: '11:00 - 12:30', availableSeats: 5, startDate: '2026-10-18' }
    ],
    organizer: {
      name: 'Kartsam Racing Club Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Pista Ufficiale ACI Sport',
      phone: '+39 091 688 9012'
    },
    instructors: [
      {
        name: 'Salvatore Sammito',
        role: 'Direttore di Pista & Pilota Karting',
        avatar: ILLUSTRAZIONI.profilo,
        experience: '15 anni in gare nazionali',
        certifications: ['Istruttore ACI Sport']
      }
    ],
    reviews: [
      {
        id: 'r-kart-1',
        parentName: 'Matteo P. (Papà)',
        childAge: '9 anni',
        rating: 5,
        date: '4 giorni fa',
        comment: 'Pomeriggio indimenticabile con mio figlio Lorenzo! Abbiamo fatto la gara insieme e ci siamo divertiti tantissimo sul podio con le coppe.',
        verified: true
      }
    ]
  },
  {
    id: 'act-mondello-beach',
    title: 'Mondello Family Day - Ombrellone, Mare & Miniclub',
    subtitle: 'Giornata relax per tutta la famiglia nella spiaggia più bella di Palermo con animazione',
    categoryId: 'mare',
    targetAudience: 'famiglia',
    targetAudienceLabel: 'Famiglia 👨‍👩‍👧‍👦',
    venueId: 'venue-mondello',
    venueName: 'Mondello Family Beach Club',
    address: 'Viale Regina Elena 84, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    distanceKm: 8.5,
    ageMin: 0,
    ageMax: 99,
    rating: 4.9,
    reviewCount: 310,
    attendeesCount: 520,
    price: 22,
    originalPrice: 30,
    priceUnit: 'pass giornaliero famiglia',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.mare,
    gallery: [
      ILLUSTRAZIONI.mare,
      ILLUSTRAZIONI.mare
    ],
    badges: ['1 Ombrellone + 2 Lettini', 'Miniclub Bambini Incluso', 'Docce Calde & Cabina'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: ' Goditi il mare turchese di Mondello senza stress! Il pass famiglia comprende postazione riservata (1 ombrellone + 2 lettini ed sedia sdraio), accesso al miniclub dalle 10:00 alle 13:00 con animatori professionisti per i bimbi (giochi di sabbia, baby dance, risveglio muscolare), e docce calde comprese.',
    whatToBring: ['Costume da bagno', 'Protezione solare', 'Asciugamani mare'],
    requirements: ['Valido per 2 adulti + fino a 3 bambini fino a 12 anni.'],
    latitude: 38.2012,
    longitude: 13.3325,
    slots: [
      { id: 's-mon-1', dayOfWeek: 'Sabato 16 Maggio', time: '09:00 - 18:30', availableSeats: 15, startDate: '2026-05-16' },
      { id: 's-mon-2', dayOfWeek: 'Domenica 17 Maggio', time: '09:00 - 18:30', availableSeats: 8, startDate: '2026-05-17' },
      { id: 's-mon-3', dayOfWeek: 'Sabato 23 Maggio', time: '09:00 - 18:30', availableSeats: 20, startDate: '2026-05-23' }
    ],
    organizer: {
      name: 'Stabilimento Mondello Mare',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Gestione Balneare Mondello',
      phone: '+39 091 456 1234'
    },
    instructors: [
      {
        name: 'Martina & Staff Animazione',
        role: 'Responsabile Miniclub Spiaggia',
        avatar: ILLUSTRAZIONI.profilo,
        experience: 'Animazione estiva infanzia',
        certifications: ['Primo Soccorso & Salvamento']
      }
    ],
    reviews: [
      {
        id: 'r-mon-1',
        parentName: 'Elena V. (Mamma)',
        childAge: '5 e 2 anni',
        rating: 5,
        date: '5 giorni fa',
        comment: 'Spiaggia pulitissima e acqua bassa ideale per la piccola. Gli animatori hanno intrattenuto il grande per 2 ore mentre noi ci godiamo un aperitivo in tranquillità!',
        verified: true
      }
    ]
  },
  {
    id: 'act-nuoto-baby',
    title: 'Nuoto Baby & Acquaticità Neonatale (3 mesi - 3 anni)',
    subtitle: 'Corso di acquaticità genitore-figlio in acqua riscaldata a 32° con istruttori FIN',
    categoryId: 'piscina',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-piscina-comunale',
    venueName: 'Piscina Comunale di Palermo',
    address: 'Viale del Fante 5, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    distanceKm: 2.1,
    ageMin: 0,
    ageMax: 3,
    rating: 4.8,
    reviewCount: 110,
    attendeesCount: 160,
    price: 14,
    originalPrice: 20,
    priceUnit: 'lezione prova',
    courseType: 'trial',
    image: ILLUSTRAZIONI.nuoto,
    gallery: [
      ILLUSTRAZIONI.nuoto,
      ILLUSTRAZIONI.nuoto
    ],
    badges: ['Lezione Prova Gratis', 'Acqua a 32°C', 'Presenza in Vasca Mamma/Papà'],
    featured: false,
    popular: true,
    isTrialFree: true,
    description: 'Un’esperienza emotiva e sensoriale unica per rafforzare la fiducia in acqua. Sotto la guida degli istruttori federali, il neonato riscopre la naturale dimestichezza con l’ambiente acquatico attraverso giochi ritmici, tubi galleggianti e canzoncine.',
    whatToBring: ['Pannolino contenitivo da acqua', 'Accappatoio con cappuccio', 'Ciabattine genitore'],
    requirements: ['Richiesta presenza in vasca di 1 genitore (mamma o papà).'],
    latitude: 38.1560,
    longitude: 13.3480,
    slots: [
      { id: 's-pisc-1', dayOfWeek: 'Mercoledì 13 Maggio', time: '16:30 - 17:15', availableSeats: 4, startDate: '2026-05-13' },
      { id: 's-pisc-2', dayOfWeek: 'Sabato 16 Maggio', time: '10:00 - 10:45', availableSeats: 2, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Scuola Nuoto Palermo Junior',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Federazione Italiana Nuoto Palermo',
      phone: '+39 091 670 3411'
    },
    instructors: [
      {
        name: 'Rosaria Di Maggio',
        role: 'Istruttrice Nazionale FIN Neonatale',
        avatar: ILLUSTRAZIONI.profilo,
        experience: '12 anni in corsi acquaticità neonatale',
        certifications: ['Brevetto FIN Infanzia']
      }
    ],
    reviews: [
      {
        id: 'r-pisc-1',
        parentName: 'Marco B. (Papà)',
        childAge: '14 mesi',
        rating: 5,
        date: '1 settimana fa',
        comment: 'Ci vado tutti i sabati mattina con mia figlia, un momento speciale tra papà e bimba.',
        verified: true
      }
    ]
  },
  {
    id: 'act-vela-padel-papa',
    title: 'Scuola Vela & Torneo Padel Padre-Figlio',
    subtitle: 'Giornata al circolo nautico tra lezioni di Optimist e tornei di padel sul mare',
    categoryId: 'sport',
    targetAudience: 'papa',
    targetAudienceLabel: 'Per Papà 👨‍👦',
    venueId: 'venue-lauria',
    venueName: 'Circolo Canottieri Roggero di Lauria',
    address: 'Viale Radice 1, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    distanceKm: 8.8,
    ageMin: 6,
    ageMax: 15,
    rating: 4.9,
    reviewCount: 95,
    attendeesCount: 140,
    price: 30,
    originalPrice: 40,
    priceUnit: 'coppia papà e figlio',
    courseType: 'single',
    image: ILLUSTRAZIONI.mare,
    gallery: [
      ILLUSTRAZIONI.mare,
      ILLUSTRAZIONI.mare
    ],
    badges: ['Gubbino di Salvataggio Incluso', 'Racchette Padel Fornite', 'Aperitivo Finale al Circolo'],
    featured: false,
    popular: true,
    isTrialFree: false,
    description: 'Unire sport, mare e complicità genitoriale! La mattinata comprende una lezione propedeutica di vela su barche Optimist per i ragazzi con istruttori FIV, seguita da un mini-torneo di padel padre-figlio con vista sul Golfo di Mondello e aperitivo analcolico di premiazione.',
    whatToBring: ['Scarpe con suola in gomma bianca per la barca', 'Crema solare', 'Cappellino'],
    requirements: ['Saper nuotare (forniti giubbotti di salvataggio omologati).'],
    latitude: 38.2045,
    longitude: 13.3390,
    slots: [
      { id: 's-vel-1', dayOfWeek: 'Sabato 16 Maggio', time: '09:30 - 13:00', availableSeats: 5, startDate: '2026-05-16' },
      { id: 's-vel-2', dayOfWeek: 'Domenica 24 Maggio', time: '09:30 - 13:00', availableSeats: 6, startDate: '2026-05-24' }
    ],
    organizer: {
      name: 'Circolo Lauria Mondello',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Circolo Nautico d’Eccellenza',
      phone: '+39 091 450 011'
    },
    instructors: [
      {
        name: 'Istruttori FIV Mondello',
        role: 'Maestri di Vela & Padel',
        avatar: ILLUSTRAZIONI.profilo,
        experience: 'Brevetto Federale FIV & FIT',
        certifications: ['FIV Level 2']
      }
    ],
    reviews: []
  },
  {
    id: 'act-english-stem',
    title: 'English Storytelling & LEGO Robotics Palermo',
    subtitle: 'Impara l’inglese costruendo e programmando piccoli robot in un ambiente ludico',
    categoryId: 'lingue',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-golden',
    venueName: 'British Academy Palermo',
    address: 'Viale della Libertà 88, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.1,
    ageMin: 5,
    ageMax: 11,
    rating: 4.8,
    reviewCount: 78,
    attendeesCount: 110,
    price: 15,
    originalPrice: 20,
    priceUnit: 'laboratorio di prova',
    courseType: 'single',
    image: ILLUSTRAZIONI.creativi,
    gallery: [
      ILLUSTRAZIONI.creativi
    ],
    badges: ['Madrelingua Inglese', 'Kit LEGO WeDo 2.0', 'Attestato Junior'],
    featured: false,
    popular: false,
    isTrialFree: true,
    description: 'I bambini ascoltano favole e avventure in inglese britannico e poi danno vita ai personaggi costruendo robot LEGO motorizzati. Un metodo pratico per imparare vocaboli senza noia!',
    whatToBring: ['Zainetto con merenda'],
    requirements: ['Nessun livello d’inglese richiesto.'],
    latitude: 38.1350,
    longitude: 13.3530,
    slots: [
      { id: 's-eng-1', dayOfWeek: 'Lunedì 11 Maggio', time: '17:00 - 18:30', availableSeats: 4, startDate: '2026-05-11' },
      { id: 's-eng-2', dayOfWeek: 'Mercoledì 13 Maggio', time: '17:00 - 18:30', availableSeats: 3, startDate: '2026-05-13' }
    ],
    organizer: {
      name: 'British Academy Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Linguistico Celta',
      phone: '+39 091 324 551'
    },
    instructors: [
      {
        name: 'James O’Connor',
        role: 'Senior Native Teacher',
        avatar: ILLUSTRAZIONI.profilo,
        experience: '8 anni a Palermo',
        certifications: ['CELTA Cambridge']
      }
    ],
    reviews: []
  },
  {
    id: 'act-english-playgroup-baby',
    title: 'English Playgroup Bilingue & Music Baby (0-4 Anni)',
    subtitle: 'Esperienza immersiva in lingua inglese con canzoncine, puppets e strumenti musicali',
    categoryId: 'lingue',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi 👶',
    venueId: 'venue-golden',
    venueName: 'Little England Center Palermo',
    address: 'Via Dante 45, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    distanceKm: 0.6,
    ageMin: 0,
    ageMax: 4,
    rating: 4.9,
    reviewCount: 64,
    attendeesCount: 85,
    price: 0,
    originalPrice: 15,
    priceUnit: 'lezione prova gratuita',
    courseType: 'trial',
    image: ILLUSTRAZIONI.musica,
    gallery: [
      ILLUSTRAZIONI.musica
    ],
    badges: ['Gratuito', 'Madrelingua UK', 'Insieme ai Genitori'],
    featured: true,
    popular: true,
    isTrialFree: true,
    description: 'Un playgroup bilingue divertente per neonati e bimbi da 0 a 4 anni accompagnati dai genitori. Canzoni tradizionali inglesi, burattini colorati e strumenti a percussione per abituare l\'orecchio alla lingua fin da piccoli.',
    whatToBring: ['Calzini antiscivolo per bimbo e genitore'],
    requirements: ['Accompagnati da 1 genitore.'],
    latitude: 38.1250,
    longitude: 13.3560,
    slots: [
      { id: 's-eng-play-1', dayOfWeek: 'Martedì 12 Maggio', time: '16:30 - 17:30', availableSeats: 5, startDate: '2026-05-12' },
      { id: 's-eng-play-2', dayOfWeek: 'Giovedì 14 Maggio', time: '16:30 - 17:30', availableSeats: 4, startDate: '2026-05-14' }
    ],
    organizer: {
      name: 'Little England Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Infanzia Bilingue',
      phone: '+39 091 611 2233'
    },
    instructors: [
      {
        name: 'Sarah Jenkins',
        role: 'Insegnante Bilingue Infanzia',
        avatar: ILLUSTRAZIONI.profilo,
        experience: 'Specializzata in fonetica baby',
        certifications: ['Early Years Educator UK']
      }
    ],
    reviews: []
  },
  {
    id: 'act-cannolo-family',
    title: 'Masterclass Cannolo & Pasticceria Siciliana Famiglie',
    subtitle: 'Mani in pasta per mamme, papà e bambini nel cuore di Palermo!',
    categoryId: 'circoli',
    targetAudience: 'famiglia',
    targetAudienceLabel: 'Famiglia 👨‍👩‍👧‍👦',
    venueId: 'venue-golden',
    venueName: 'Antica Pasticceria Palermo Centro',
    address: 'Corso Vittorio Emanuele 180, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    distanceKm: 0.5,
    ageMin: 4,
    ageMax: 99,
    rating: 5.0,
    reviewCount: 135,
    attendeesCount: 280,
    price: 20,
    originalPrice: 28,
    priceUnit: 'a partecipante (degustazione inc.)',
    courseType: 'package',
    image: ILLUSTRAZIONI.creativi,
    gallery: [
      ILLUSTRAZIONI.creativi
    ],
    badges: ['Pasticcere Maestro', 'Cannoli Caldi Fatti da Voi', 'Diploma di Mastro Pasticcere'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Impara i segreti della cialda croccante e della crema di ricotta fresca! Ogni famiglia avrà la propria postazione da lavoro con grembiulini e ingredienti biologici per impastare, friggere le scorze e guarnire i cannoli con pistacchio di Bronte e gocce di cioccolato.',
    whatToBring: ['Grembiuli forniti sul posto!'],
    requirements: ['Segnalare eventuali allergie o intolleranze al momento della prenotazione.'],
    latitude: 38.1158,
    longitude: 13.3615,
    slots: [
      { id: 's-can-1', dayOfWeek: 'Sabato 16 Maggio', time: '16:00 - 18:00', availableSeats: 6, startDate: '2026-05-16' },
      { id: 's-can-2', dayOfWeek: 'Domenica 17 Maggio', time: '10:30 - 12:30', availableSeats: 4, startDate: '2026-05-17' }
    ],
    organizer: {
      name: 'I Maestri del Cannolo Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola Pasticceria Tradizionale',
      phone: '+39 091 582 109'
    },
    instructors: [
      {
        name: 'Maestro Ciccio Russo',
        role: 'Pasticcere Storico Palermitano',
        avatar: ILLUSTRAZIONI.profilo,
        experience: '30 anni di tradizione culinaria',
        certifications: ['Mastro Pasticcere FIPGC']
      }
    ],
    reviews: []
  },
  {
    id: 'act-cinema-kids',
    title: 'CineBambini: Rassegna Film & Cartoni Animati',
    subtitle: 'Proiezione domenicale con pop-corn e animazione pre-film!',
    categoryId: 'cinema',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Per Bimbi',
    venueId: 'venue-golden',
    venueName: 'Cinema Teatro Golden Palermo',
    address: 'Via Terrasanta 60, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Centro',
    distanceKm: 0.8,
    ageMin: 3,
    ageMax: 12,
    rating: 4.8,
    reviewCount: 92,
    attendeesCount: 210,
    price: 6,
    originalPrice: 9,
    priceUnit: 'a biglietto',
    courseType: 'single',
    image: ILLUSTRAZIONI.teatro,
    gallery: [
      ILLUSTRAZIONI.teatro
    ],
    badges: ['Pop-Corn Gratuito', 'Volume Audio Protetto Bimbi', 'Posti Riservati'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'La magia del grande schermo pensata per i più piccoli: luci soffuse, audio a decibel controllati e mascottes di benvenuto prima dell’inizio del film!',
    whatToBring: ['Voglia di sorridere e divertirsi!'],
    requirements: ['Bambini sotto i 3 anni entrano gratis.'],
    latitude: 38.1294,
    longitude: 13.3512,
    slots: [
      { id: 's-cin-1', dayOfWeek: 'Domenica 17 Maggio', time: '16:00 - 18:00', availableSeats: 25, startDate: '2026-05-17' },
      { id: 's-cin-2', dayOfWeek: 'Sabato 16 Maggio', time: '17:30 - 19:30', availableSeats: 18, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'CineClub Bambini Palermo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Organizzatore Cinema',
      phone: '+39 091 626 4702'
    },
    instructors: [],
    reviews: []
  },
  {
    id: 'act-parco-gonfiabili',
    title: 'Parco Avventura & Maxigonfiabili Favorita',
    subtitle: 'Percorsi sospesi, trampolini elastici e gonfiabili giganti nella natura',
    categoryId: 'parchi',
    targetAudience: 'famiglia',
    targetAudienceLabel: 'Famiglia',
    venueId: 'venue-favorita',
    venueName: 'Parco della Favorita',
    address: 'Viale Ercole 1, Palermo',
    city: 'Palermo',
    zone: 'Parco della Favorita',
    distanceKm: 2.1,
    ageMin: 2,
    ageMax: 16,
    rating: 4.9,
    reviewCount: 310,
    attendeesCount: 540,
    price: 10,
    originalPrice: 15,
    priceUnit: 'a bambino (giornaliero)',
    courseType: 'ticket',
    image: ILLUSTRAZIONI.ludoteca,
    gallery: [
      ILLUSTRAZIONI.ludoteca
    ],
    badges: ['Accesso Illimitato', 'Area Ombra Relax', 'Istruttori di Sicurezza'],
    featured: true,
    popular: true,
    isTrialFree: false,
    description: 'Immerso nel polmone verde di Palermo, il Parco Avventura Favorita offre percorsi avventura tra gli alberi per tutte le età, gonfiabili giganti, trampolini e area picnic ombreggiata per le famiglie.',
    whatToBring: ['Scarpe da ginnastica', 'Borraccia d’acqua'],
    requirements: ['Accompagnatore adulto richiesto per minori di 12 anni.'],
    latitude: 38.1631,
    longitude: 13.3444,
    slots: [
      { id: 's-parc-1', dayOfWeek: 'Sabato 16 Maggio', time: '10:00 - 19:00', availableSeats: 50, startDate: '2026-05-16' },
      { id: 's-parc-2', dayOfWeek: 'Domenica 17 Maggio', time: '10:00 - 19:00', availableSeats: 45, startDate: '2026-05-17' }
    ],
    organizer: {
      name: 'Favorita Adventure Park',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Gestore Parco Avventura',
      phone: '+39 091 740 1111'
    },
    instructors: [],
    reviews: []
  },
  {
    id: 'act-trenino-mondello',
    title: 'Trenino Panoramico & Mappa Trasporti Mondello',
    subtitle: 'Tour panoramico in trenino elettrico dal Paese al Mare con mappa baby',
    categoryId: 'trasporti',
    targetAudience: 'famiglia',
    targetAudienceLabel: 'Famiglia',
    venueId: 'venue-mondello',
    venueName: 'Spiaggia & Borgo di Mondello',
    address: 'Viale Regina Elena, Mondello, Palermo',
    city: 'Palermo',
    zone: 'Mondello / Addaura',
    distanceKm: 3.5,
    ageMin: 0,
    ageMax: 99,
    rating: 4.7,
    reviewCount: 180,
    attendeesCount: 420,
    price: 4,
    originalPrice: 6,
    priceUnit: 'a corsa per adulto (bimbi gratis)',
    courseType: 'single',
    image: ILLUSTRAZIONI.mare,
    gallery: [
      ILLUSTRAZIONI.mare
    ],
    badges: ['Navetta 100% Elettrica', 'Mappa Interattiva Incluso', 'Fermate Lidi Attrezzati'],
    featured: false,
    popular: true,
    isTrialFree: false,
    description: 'Esplora Mondello senza lo stress del parcheggio! Il trenino elettrico collega i parcheggi scambratori con la spiaggia e il borgo marinaro, distribuendo la mappa pieghevole illustrata per bambini.',
    whatToBring: ['Fotocamera e occhiali da sole!'],
    requirements: ['Passeggini pieghevoli ammessi a bordo.'],
    latitude: 38.2011,
    longitude: 13.3325,
    slots: [
      { id: 's-tra-1', dayOfWeek: 'Venerdì 15 Maggio', time: '09:00 - 20:00', availableSeats: 30, startDate: '2026-05-15' },
      { id: 's-tra-2', dayOfWeek: 'Sabato 16 Maggio', time: '09:00 - 20:00', availableSeats: 40, startDate: '2026-05-16' }
    ],
    organizer: {
      name: 'Mondello Express Family',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Servizio Trasporti Turistici',
      phone: '+39 091 456 789'
    },
    instructors: [],
    reviews: []
  },
  {
    id: 'act-oxygen-sala-attrezzi',
    title: 'Sala Attrezzi Interna & Esterna - OXYGEN Fitness',
    subtitle: 'Allenamento libero e guidato in sala attrezzi interna ed area outdoor con macchinari di ultima generazione.',
    categoryId: 'sport',
    targetAudience: 'mamme',
    targetAudienceLabel: 'Per Genitori 🏋️',
    venueId: 'venue-oxygen',
    venueName: 'OXYGEN Fitness Place',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 14,
    ageMax: 70,
    rating: 4.9,
    reviewCount: 94,
    attendeesCount: 210,
    price: 10,
    originalPrice: 15,
    priceUnit: 'ingresso giornaliero / prova',
    courseType: 'single',
    organizerId: 'oxygen-fitness',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Sala Esterna', 'Aperto 7 Giorni', 'Istruttori in Sala', 'Lezione Prova'],
    featured: true,
    popular: true,
    isTrialFree: true,
    description: 'Palinsesto settimanale completo e sala attrezzi interna ed esterna at OXYGEN Fitness Place. Attrezzatura all\'avanguardia, schede personalizzate e rieducazione funzionale con trainer accreditati.',
    whatToBring: ['Asciugamano, scarpette pulite da ginnastica, borraccia d\'acqua'],
    requirements: ['Certificato medico d\'idoneità sportiva non agonistica.'],
    latitude: 38.1512,
    longitude: 13.3441,
    slots: [
      { id: 's-oxy-sa1', dayOfWeek: 'Lunedì', time: '07:00 - 22:00', availableSeats: 25, startDate: '2026-05-18' },
      { id: 's-oxy-sa2', dayOfWeek: 'Martedì', time: '08:00 - 22:00', availableSeats: 25, startDate: '2026-05-19' },
      { id: 's-oxy-sa3', dayOfWeek: 'Mercoledì', time: '07:00 - 22:00', availableSeats: 25, startDate: '2026-05-20' },
      { id: 's-oxy-sa4', dayOfWeek: 'Giovedì', time: '08:00 - 22:00', availableSeats: 25, startDate: '2026-05-21' },
      { id: 's-oxy-sa5', dayOfWeek: 'Venerdì', time: '07:00 - 22:00', availableSeats: 25, startDate: '2026-05-22' },
      { id: 's-oxy-sa6', dayOfWeek: 'Sabato', time: '10:00 - 18:00', availableSeats: 20, startDate: '2026-05-23' }
    ],
    organizer: {
      name: 'OXYGEN Fitness Place',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Fitness & Discipline Sportive',
      phone: '+39 091 688 2211'
    },
    instructors: [
      { name: 'Alba Monteneri', role: 'Master Trainer Functional', avatar: ILLUSTRAZIONI.profilo, experience: '10+ Anni', certifications: ['FIPE Functional', 'TRX Certificata'] },
      { name: 'Giovanni Basile', role: 'Strength & Conditioning Specialist', avatar: ILLUSTRAZIONI.profilo, experience: '8 Anni', certifications: ['CSCS NSCA', 'Master Forza'] },
      { name: 'Angelo Milazzo', role: 'Fit Boxe Coach', avatar: ILLUSTRAZIONI.profilo, experience: '12 Anni', certifications: ['FitBoxe Master', 'Kickboxing CONI'] },
      { name: 'Liliana Ocello', role: 'Tabata & Glutes Trainer', avatar: ILLUSTRAZIONI.profilo, experience: '7 Anni', certifications: ['Group Fitness', 'Zumba B1'] }
    ],
    reviews: []
  },
  {
    id: 'act-oxygen-functional-joy',
    title: 'Functional Joy Circuit & Dinamic - OXYGEN',
    subtitle: 'Circuito funzionale per bruciare calorie, migliorare agilità e coordinazione con Alba Monteneri e Mary Prestigiacomo.',
    categoryId: 'sport',
    targetAudience: 'mamme',
    targetAudienceLabel: 'Per Mamme & Donna ⚡',
    venueId: 'venue-oxygen',
    venueName: 'OXYGEN Fitness Place',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 16,
    ageMax: 65,
    rating: 4.9,
    reviewCount: 68,
    attendeesCount: 140,
    price: 12,
    originalPrice: 15,
    priceUnit: 'singola lezione',
    courseType: 'single',
    organizerId: 'oxygen-fitness',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Functional Joy', 'Alba Monteneri', 'Tone & Burn', 'Musica & Energia'],
    featured: true,
    popular: true,
    isTrialFree: true,
    description: 'Corso settimanale di Functional Joy Circuit e Functional Dinamic dal palinsesto OXYGEN Fitness Place. Stazioni ad alta ed intesità controllata con kettlebell, elastici e TRX.',
    whatToBring: ['Asciugamano da palestra, abbigliamento comodo, borraccia'],
    requirements: ['Certificato medico d\'idoneità sportiva non agonistica.'],
    latitude: 38.1512,
    longitude: 13.3441,
    slots: [
      { id: 's-oxy-fjc1', dayOfWeek: 'Lunedì', time: '09:10 - 10:00 (Alba Monteneri)', availableSeats: 15, startDate: '2026-05-18' },
      { id: 's-oxy-fjc2', dayOfWeek: 'Lunedì', time: '14:30 - 15:30 (Mary Prestigiacomo)', availableSeats: 12, startDate: '2026-05-18' },
      { id: 's-oxy-fjc3', dayOfWeek: 'Martedì', time: '11:00 - 12:00 (Alba Monteneri)', availableSeats: 14, startDate: '2026-05-19' },
      { id: 's-oxy-fjc4', dayOfWeek: 'Mercoledì', time: '09:10 - 10:00 (Alba Monteneri)', availableSeats: 15, startDate: '2026-05-20' },
      { id: 's-oxy-fjc5', dayOfWeek: 'Giovedì', time: '11:45 - 12:30 (Alba Monteneri)', availableSeats: 14, startDate: '2026-05-21' },
      { id: 's-oxy-fjc6', dayOfWeek: 'Venerdì', time: '10:10 - 11:00 (Alba Monteneri)', availableSeats: 15, startDate: '2026-05-22' }
    ],
    organizer: {
      name: 'OXYGEN Fitness Place',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Fitness & Discipline Sportive',
      phone: '+39 091 688 2211'
    },
    instructors: [
      { name: 'Alba Monteneri', role: 'Functional Circuit Trainer', avatar: ILLUSTRAZIONI.profilo, experience: '10+ Anni', certifications: ['FIPE Functional'] },
      { name: 'Mary Prestigiacomo', role: 'Functional Trainer', avatar: ILLUSTRAZIONI.profilo, experience: '6 Anni', certifications: ['AICS Fitness'] }
    ],
    reviews: []
  },
  {
    id: 'act-oxygen-fitboxe',
    title: 'Fit Boxe & Functional Fit Boxe - OXYGEN',
    subtitle: 'Colpisci il sacco a tempo di musica, scarica lo stress e tonifica tutto il corpo con Angelo Milazzo.',
    categoryId: 'sport',
    targetAudience: 'papa',
    targetAudienceLabel: 'Per Papà & Adulti 🥊',
    venueId: 'venue-oxygen',
    venueName: 'OXYGEN Fitness Place',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 16,
    ageMax: 60,
    rating: 5.0,
    reviewCount: 72,
    attendeesCount: 160,
    price: 12,
    originalPrice: 15,
    priceUnit: 'singola lezione',
    courseType: 'single',
    organizerId: 'oxygen-fitness',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Angelo Milazzo', 'Sacchi Da Boxe', 'Alta Intensità', 'Cardio Fun'],
    featured: true,
    popular: true,
    isTrialFree: true,
    description: 'Corso di Fit Boxe dal palinsesto OXYGEN Fitness Place tenuto dal Master Trainer Angelo Milazzo. Calci, pugni e combinazioni al sacco a tempo di musica per un allenamento cardiovascolare entusiasmante.',
    whatToBring: ['Fasce per mani o guantini da Fitboxe, asciugamano, borraccia'],
    requirements: ['Nessuna esperienza pregressa richiesta.'],
    latitude: 38.1512,
    longitude: 13.3441,
    slots: [
      { id: 's-oxy-fb1', dayOfWeek: 'Lunedì', time: '19:00 - 20:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-18' },
      { id: 's-oxy-fb2', dayOfWeek: 'Martedì', time: '11:00 - 12:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-19' },
      { id: 's-oxy-fb3', dayOfWeek: 'Mercoledì', time: '19:00 - 20:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-20' },
      { id: 's-oxy-fb4', dayOfWeek: 'Giovedì', time: '11:00 - 12:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-21' },
      { id: 's-oxy-fb5', dayOfWeek: 'Venerdì', time: '19:00 - 20:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-22' },
      { id: 's-oxy-fb6', dayOfWeek: 'Sabato', time: '11:00 - 12:00 (Angelo Milazzo)', availableSeats: 16, startDate: '2026-05-23' }
    ],
    organizer: {
      name: 'OXYGEN Fitness Place',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Fitness & Discipline Sportive',
      phone: '+39 091 688 2211'
    },
    instructors: [
      { name: 'Angelo Milazzo', role: 'Master Fit Boxe Trainer', avatar: ILLUSTRAZIONI.profilo, experience: '12 Anni', certifications: ['FitBoxe Master', 'CONI'] }
    ],
    reviews: []
  },
  {
    id: 'act-oxygen-stretching-yogy',
    title: 'Stretching Mobility, Yogy Ginnastica & Posturale - OXYGEN',
    subtitle: 'Mobilità articolare, allungamento posturale e ginnastica per la salute con Andrea Sposito e Luna Lo Faso.',
    categoryId: 'benessere',
    targetAudience: 'mamme',
    targetAudienceLabel: 'Per Salute & Postura 🧘‍♀️',
    venueId: 'venue-oxygen',
    venueName: 'OXYGEN Fitness Place',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 14,
    ageMax: 75,
    rating: 4.9,
    reviewCount: 52,
    attendeesCount: 110,
    price: 10,
    originalPrice: 12,
    priceUnit: 'singola lezione',
    courseType: 'single',
    organizerId: 'oxygen-fitness',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Andrea Sposito', 'Luna Lo Faso', 'Posturale & Mobility', 'Zero Impatto'],
    featured: false,
    popular: true,
    isTrialFree: true,
    description: 'Sedute di Stretching Mobility e Yogy Ginnastica di Base focalizzate sul recupero della postura corretta, scioglimento delle tensioni muscolari della schiena e flessibilità.',
    whatToBring: ['Tappetino personale, calzini antiscivolo, asciugamano'],
    requirements: ['Adatto a tutti i livelli di preparazione fisica.'],
    latitude: 38.1512,
    longitude: 13.3441,
    slots: [
      { id: 's-oxy-str1', dayOfWeek: 'Lunedì', time: '17:15 - 18:00 (Andrea Sposito)', availableSeats: 15, startDate: '2026-05-18' },
      { id: 's-oxy-str2', dayOfWeek: 'Martedì', time: '18:00 - 19:00 Yogy Ginn. Base (Luna Lo Faso)', availableSeats: 15, startDate: '2026-05-19' },
      { id: 's-oxy-str3', dayOfWeek: 'Mercoledì', time: '17:15 - 18:00 (Andrea Sposito)', availableSeats: 15, startDate: '2026-05-20' },
      { id: 's-oxy-str4', dayOfWeek: 'Giovedì', time: '18:00 - 19:00 Yogy Ginn. Base (Luna Lo Faso)', availableSeats: 15, startDate: '2026-05-21' },
      { id: 's-oxy-str5', dayOfWeek: 'Venerdì', time: '17:15 - 18:00 (Andrea Sposito)', availableSeats: 15, startDate: '2026-05-22' }
    ],
    organizer: {
      name: 'OXYGEN Fitness Place',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Fitness & Discipline Sportive',
      phone: '+39 091 688 2211'
    },
    instructors: [
      { name: 'Andrea Sposito', role: 'Mobility & Postural Coach', avatar: ILLUSTRAZIONI.profilo, experience: '8 Anni', certifications: ['Posturale Pancafit'] },
      { name: 'Luna Lo Faso', role: 'Insegnante Yogy Ginnastica', avatar: ILLUSTRAZIONI.profilo, experience: '5 Anni', certifications: ['Yoga Alliance RYT200'] }
    ],
    reviews: []
  },
  {
    id: 'act-oxygen-totalbody-zumba',
    title: 'Total Body, Zumba & Balli di Gruppo - OXYGEN',
    subtitle: 'Ipertonificazione muscolare e ballo latino per divertirsi bruciando calorie con Toty Di Stefano, Liliana Ocello e Giulia Novelli.',
    categoryId: 'sport',
    targetAudience: 'famiglia',
    targetAudienceLabel: 'Per Tutti 💃',
    venueId: 'venue-oxygen',
    venueName: 'OXYGEN Fitness Place',
    address: 'Via Resuttana 360, Palermo',
    city: 'Palermo',
    zone: 'Viale Libertà / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 12,
    ageMax: 70,
    rating: 4.8,
    reviewCount: 81,
    attendeesCount: 175,
    price: 10,
    originalPrice: 12,
    priceUnit: 'singola lezione',
    courseType: 'single',
    organizerId: 'oxygen-fitness',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Toty Di Stefano', 'Liliana Ocello', 'Zumba Fitness', 'Group Dance'],
    featured: false,
    popular: true,
    isTrialFree: true,
    description: 'Lezioni dinamiche dal palinsesto OXYGEN Fitness Place: Total Body con Toty Di Stefano per tonificare gambe, addome e braccia; Zumba esplosiva con Liliana Ocello e Balli di Gruppo con Giulia Novelli.',
    whatToBring: ['Scarpe da ginnastica pulite, asciugamano, borraccia'],
    requirements: ['Voglia di muoversi e divertirsi!'],
    latitude: 38.1512,
    longitude: 13.3441,
    slots: [
      { id: 's-oxy-tb1', dayOfWeek: 'Martedì', time: '09:00 - 10:00 Total Body (Toty Di Stefano)', availableSeats: 20, startDate: '2026-05-19' },
      { id: 's-oxy-tb2', dayOfWeek: 'Martedì', time: '12:00 - 13:00 Balli di Gruppo (Giulia Novelli)', availableSeats: 20, startDate: '2026-05-19' },
      { id: 's-oxy-tb3', dayOfWeek: 'Martedì', time: '17:00 - 18:00 Zumba (Liliana Ocello)', availableSeats: 20, startDate: '2026-05-19' },
      { id: 's-oxy-tb4', dayOfWeek: 'Giovedì', time: '09:00 - 10:00 Total Body (Toty Di Stefano)', availableSeats: 20, startDate: '2026-05-21' },
      { id: 's-oxy-tb5', dayOfWeek: 'Giovedì', time: '17:00 - 18:00 Zumba (Liliana Ocello)', availableSeats: 20, startDate: '2026-05-21' }
    ],
    organizer: {
      name: 'OXYGEN Fitness Place',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Centro Fitness & Discipline Sportive',
      phone: '+39 091 688 2211'
    },
    instructors: [
      { name: 'Toty Di Stefano', role: 'Total Body Coach', avatar: ILLUSTRAZIONI.profilo, experience: '15 Anni', certifications: ['Master Total Body'] },
      { name: 'Liliana Ocello', role: 'Zumba & Aerobics Instructor', avatar: ILLUSTRAZIONI.profilo, experience: '7 Anni', certifications: ['ZIN Certified'] },
      { name: 'Giulia Novelli', role: 'Insegnante Balli di Gruppo', avatar: ILLUSTRAZIONI.profilo, experience: '6 Anni', certifications: ['FIDS'] }
    ],
    reviews: []
  },
  {
    id: 'act-eup-aerea-l1',
    title: 'Aerea Teen L1 (10+ Anni) - Danza e Acrobatica Aerea',
    subtitle: 'Corso di acrobatica e danza aerea su tessuti e cerchio per ragazzi dai 10 anni',
    categoryId: 'circoli',
    targetAudience: 'bimbi',
    targetAudienceLabel: '10+ Anni',
    venueId: 'v-spazio-euphoria',
    venueName: 'Spazio Euphoria - Circo Creativo',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 10,
    ageMax: 16,
    rating: 5.0,
    reviewCount: 38,
    attendeesCount: 45,
    price: 45,
    originalPrice: 55,
    priceUnit: 'al mese',
    courseType: 'monthly',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport,
      ILLUSTRAZIONI.sport
    ],
    badges: ['Tutti i giorni segnati', 'Istruttrici Certificate', 'Tessuti & Cerchio', 'Lezione Prova Gratis'],
    popular: true,
    description: 'Il corso Aerea Teen L1 di Spazio Euphoria propone un percorso didattico completo per ragazzi dai 10 anni in su: potenziamento muscolare propedeutico, flessibilità, salite sui tessuti aerei, nodi di sicurezza, figure acrobatiche al cerchio e coreografie aeree. Le lezioni sono fisse e si ripetono ogni settimana dal Lunedì al Giovedì.',
    whatToBring: ['Abbigliamento comodo aderente', 'Asciugamano', 'Borraccia personale'],
    requirements: [
      'Abbigliamento comodo aderente (leggings/t-shirt)',
      'Asciugamano e borraccia personale',
      'Certificato medico sportivo non agonistico'
    ],
    slots: [
      { id: 's-eup-al1-1', dayOfWeek: 'Lunedì', time: '15:00 - 16:00 (Antonella)', availableSeats: 12, startDate: '2026-05-11' },
      { id: 's-eup-al1-2', dayOfWeek: 'Martedì', time: '15:00 - 16:00 (Giulia)', availableSeats: 10, startDate: '2026-05-12' },
      { id: 's-eup-al1-3', dayOfWeek: 'Mercoledì', time: '15:00 - 16:00 (Antonella)', availableSeats: 12, startDate: '2026-05-13' },
      { id: 's-eup-al1-4', dayOfWeek: 'Giovedì', time: '15:00 - 16:00 (Giulia)', availableSeats: 10, startDate: '2026-05-14' }
    ],
    organizerId: 'spazio-euphoria',
    organizer: {
      name: 'Spazio Euphoria - Circo Creativo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola di Circo & Acrobatica',
      phone: '+39 091 582 3010'
    },
    instructors: [
      { name: 'Antonella', role: 'Insegnante Aerea Teen & Multi Ninja', avatar: ILLUSTRAZIONI.profilo, experience: '8 Anni', certifications: ['FIDS Acrobatica Aerea', 'AICS'] },
      { name: 'Giulia', role: 'Insegnante Aerea L1/L2', avatar: ILLUSTRAZIONI.profilo, experience: '6 Anni', certifications: ['Ginnastica Aerea'] }
    ],
    reviews: [],
    latitude: 38.125,
    longitude: 13.355
  },
  {
    id: 'act-eup-aerea-l2-levelup',
    title: 'Aerea Teen L2 & Level Up - Acrobatica Avanzata',
    subtitle: 'Corsi avanzati di acrobatica aerea L2 e Level Up per teen con esperienza',
    categoryId: 'circoli',
    targetAudience: 'bimbi',
    targetAudienceLabel: 'Teen Level Up',
    venueId: 'v-spazio-euphoria',
    venueName: 'Spazio Euphoria - Circo Creativo',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 10,
    ageMax: 16,
    rating: 5.0,
    reviewCount: 29,
    attendeesCount: 35,
    price: 50,
    originalPrice: 60,
    priceUnit: 'al mese',
    courseType: 'monthly',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Aerea L2', 'Level Up', 'Ogni Martedì & Giovedì', 'Spettacoli di Fine Anno'],
    popular: true,
    description: 'Percorso avanzato per teen che intendono perfezionare le tecniche acrobatiche aeree, cadute controllate, sequenze dinamiche su tessuti e cerchio e preparazione per esibizioni e saggi. Lezioni fisse e ripetute ogni settimana nei giorni di Martedì e Giovedì.',
    whatToBring: ['Abbigliamento aderente', 'Borraccia'],
    requirements: [
      'Precedente esperienza in Aerea L1 o ginnastica artistica/ritmica'
    ],
    slots: [
      { id: 's-eup-al2-1', dayOfWeek: 'Martedì', time: '16:00 - 17:30 Aerea Teen L2 (Giulia)', availableSeats: 10, startDate: '2026-05-12' },
      { id: 's-eup-al2-2', dayOfWeek: 'Martedì', time: '17:30 - 19:00 Aerea Teen Level Up (Antonella)', availableSeats: 8, startDate: '2026-05-12' },
      { id: 's-eup-al2-3', dayOfWeek: 'Giovedì', time: '16:00 - 17:30 Aerea Teen L2 (Giulia)', availableSeats: 10, startDate: '2026-05-14' },
      { id: 's-eup-al2-4', dayOfWeek: 'Giovedì', time: '17:30 - 19:00 Aerea Teen Level Up (Antonella)', availableSeats: 8, startDate: '2026-05-14' }
    ],
    organizerId: 'spazio-euphoria',
    organizer: {
      name: 'Spazio Euphoria - Circo Creativo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola di Circo & Acrobatica',
      phone: '+39 091 582 3010'
    },
    instructors: [
      { name: 'Giulia', role: 'Insegnante Aerea L2', avatar: ILLUSTRAZIONI.profilo, experience: '6 Anni', certifications: ['Aerea AICS'] },
      { name: 'Antonella', role: 'Insegnante Aerea Level Up', avatar: ILLUSTRAZIONI.profilo, experience: '8 Anni', certifications: ['Acrobatica Aerea'] }
    ],
    reviews: [],
    latitude: 38.125,
    longitude: 13.355
  },
  {
    id: 'act-eup-ninja',
    title: 'Multi Ninja (8+) & Acro Ninja (8+)',
    subtitle: 'Percorsi Ninja Warrior, parkour e acrobatica per ragazzi dagli 8 anni',
    categoryId: 'sport',
    targetAudience: 'bimbi',
    targetAudienceLabel: '8+ Anni',
    venueId: 'v-spazio-euphoria',
    venueName: 'Spazio Euphoria - Circo Creativo',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 8,
    ageMax: 14,
    rating: 4.9,
    reviewCount: 31,
    attendeesCount: 50,
    price: 40,
    originalPrice: 50,
    priceUnit: 'al mese',
    courseType: 'monthly',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Parkour & Ninja', 'Agilità e Salto', 'Ogni Lun, Mer & Ven', 'Divertimento Assicurato'],
    popular: true,
    description: 'Un entusiasmante corso di parkour, percorsi ad ostacoli stile Ninja Warrior, coordinazione e acro-jump. Sviluppa riflessi, agilità, equilibrio e spirito di gruppo. Ripetuto fisse ogni settimana nei giorni segnati.',
    whatToBring: ['Scarpe da ginnastica pulite', 'Abbigliamento sportivo'],
    requirements: [
      'Scarpe da ginnastica pulite',
      'Abbigliamento sportivo'
    ],
    slots: [
      { id: 's-eup-nin-1', dayOfWeek: 'Lunedì', time: '16:00 - 17:30 Multi Ninja (Antonella)', availableSeats: 15, startDate: '2026-05-11' },
      { id: 's-eup-nin-2', dayOfWeek: 'Mercoledì', time: '16:00 - 17:30 Multi Ninja (Antonella)', availableSeats: 15, startDate: '2026-05-13' },
      { id: 's-eup-nin-3', dayOfWeek: 'Venerdì', time: '16:30 - 17:30 Acro Ninja (Chiara)', availableSeats: 12, startDate: '2026-05-15' }
    ],
    organizerId: 'spazio-euphoria',
    organizer: {
      name: 'Spazio Euphoria - Circo Creativo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola di Circo & Acrobatica',
      phone: '+39 091 582 3010'
    },
    instructors: [
      { name: 'Antonella', role: 'Insegnante Multi Ninja', avatar: ILLUSTRAZIONI.profilo, experience: '8 Anni', certifications: ['Parkour & Acro'] },
      { name: 'Chiara', role: 'Insegnante Acro Ninja & Acrobatica', avatar: ILLUSTRAZIONI.profilo, experience: '5 Anni', certifications: ['Ginnastica Acrobatica'] }
    ],
    reviews: [],
    latitude: 38.125,
    longitude: 13.355
  },
  {
    id: 'act-eup-acrobatica-14',
    title: 'Acrobatica Teen & Ragazzi (14+ Anni)',
    subtitle: 'Corso di acrobatica a terra, verticalismo e saliti a corpo libero per ragazzi 14+',
    categoryId: 'sport',
    targetAudience: 'bimbi',
    targetAudienceLabel: '14+ Anni',
    venueId: 'v-spazio-euphoria',
    venueName: 'Spazio Euphoria - Circo Creativo',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 14,
    ageMax: 18,
    rating: 5.0,
    reviewCount: 22,
    attendeesCount: 25,
    price: 45,
    originalPrice: 55,
    priceUnit: 'al mese',
    courseType: 'monthly',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Acrobatica a Terra', 'Verticalismo', 'Ogni Lunedì & Mercoledì', 'Teen 14+'],
    description: 'Lezione dedicata al condizionamento fisico, verticalismo, capovolte, flic, ruote, salti al mini-trampolino e lavoro di coppia in acro-balance per ragazzi dai 14 anni in su. Lezioni fisse e ripetute ogni settimana nei giorni di Lunedì e Mercoledì.',
    whatToBring: ['Abbigliamento sportivo', 'Asciugamano'],
    requirements: [
      'Abbigliamento da ginnastica/fitness'
    ],
    slots: [
      { id: 's-eup-acro-1', dayOfWeek: 'Lunedì', time: '17:30 - 19:00 (Chiara)', availableSeats: 12, startDate: '2026-05-11' },
      { id: 's-eup-acro-2', dayOfWeek: 'Mercoledì', time: '17:30 - 19:00 (Chiara)', availableSeats: 12, startDate: '2026-05-13' }
    ],
    organizerId: 'spazio-euphoria',
    organizer: {
      name: 'Spazio Euphoria - Circo Creativo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola di Circo & Acrobatica',
      phone: '+39 091 582 3010'
    },
    instructors: [
      { name: 'Chiara', role: 'Insegnante Acrobatica 14+', avatar: ILLUSTRAZIONI.profilo, experience: '5 Anni', certifications: ['Ginnastica Acrobatica'] }
    ],
    reviews: [],
    latitude: 38.125,
    longitude: 13.355
  },
  {
    id: 'act-eup-free-workshops',
    title: 'Free Training & Workshops Intensivi Atelier (Sabato)',
    subtitle: 'Free training assistito la mattina e atelier/workshop intensivi tematici il sabato pomeriggio',
    categoryId: 'circoli',
    targetAudience: 'all',
    targetAudienceLabel: 'Per Tutti',
    venueId: 'v-spazio-euphoria',
    venueName: 'Spazio Euphoria - Circo Creativo',
    address: 'Via Delle Arti Circensi 12, Palermo',
    city: 'Palermo',
    zone: 'Politeama / Notarbartolo',
    distanceKm: 1.2,
    ageMin: 10,
    ageMax: 18,
    rating: 4.9,
    reviewCount: 17,
    attendeesCount: 30,
    price: 15,
    originalPrice: 20,
    priceUnit: 'a sessione',
    courseType: 'single',
    image: ILLUSTRAZIONI.sport,
    gallery: [
      ILLUSTRAZIONI.sport
    ],
    badges: ['Free Training', 'Atelier Sabato', 'Workshop Intensivi', 'Assistenza Tutor'],
    description: 'Il Sabato da Spazio Euphoria è dedicato alla pratica libera assistita dai tutor (dalle 11:30 alle 14:30) per perfezionare le proprie discipline, e nel pomeriggio (dalle 16:00 alle 20:00) a workshop intensivi ed atelier artistici con maestri ed artisti del circo contemporaneo ospiti.',
    whatToBring: ['Abbigliamento comodo'],
    requirements: [
      'Iscrizione preventiva necessaria'
    ],
    slots: [
      { id: 's-eup-sab-1', dayOfWeek: 'Sabato', time: '11:30 - 14:30 Free Training (Libero assistito)', availableSeats: 15, startDate: '2026-05-16' },
      { id: 's-eup-sab-2', dayOfWeek: 'Sabato', time: '16:00 - 20:00 Workshops Intensivi & Atelier', availableSeats: 20, startDate: '2026-05-16' }
    ],
    organizerId: 'spazio-euphoria',
    organizer: {
      name: 'Spazio Euphoria - Circo Creativo',
      avatar: ILLUSTRAZIONI.profilo,
      role: 'Scuola di Circo & Acrobatica',
      phone: '+39 091 582 3010'
    },
    instructors: [
      { name: 'Staff Spazio Euphoria', role: 'Tutor & Artist Guest', avatar: ILLUSTRAZIONI.profilo, experience: 'Team', certifications: ['Circo Contemporaneo'] }
    ],
    reviews: [],
    latitude: 38.125,
    longitude: 13.355
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingCode: 'PAL-98241',
    activityId: 'act-lucilla',
    activityTitle: 'Lucilla in Concerto - Live Show Bambini',
    activityImage: ILLUSTRAZIONI.musica,
    venueName: 'Teatro Golden Palermo',
    venueAddress: 'Via Terrasanta 60, Palermo',
    participantId: 'fam-3',
    participantName: 'Matteo (7 anni)',
    participantRole: 'bimbo',
    slot: { id: 's-luc-1', dayOfWeek: 'Sabato 16 Maggio', time: '17:00 - 18:30', availableSeats: 12, startDate: '2026-05-16' },
    dateSelected: 'Sabato 16 Maggio 2026',
    ticketsCount: 2,
    totalPaid: 36,
    discountApplied: 0,
    paymentMethod: 'Carta di Credito / Apple Pay',
    status: 'confermato',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    qrCodeValue: 'KIDGO-PALERMO-LUCILLA-882109',
    notes: 'Poltronissima Fila 4 Posti 12-13',
    venuePhone: '+39 091 626 4702'
  }
];

export const INITIAL_INTERNAL_REQUESTS: any[] = [
  {
    id: 'req-001',
    requestCode: 'REQ-PAL-4892',
    activityId: 'act-mamme-movimento-1',
    activityTitle: 'Mamme in Movimento Palermo - Ginnastica Posturale con Neonati',
    venueName: 'Body Studio Politeama / Parco della Favorita',
    organizerName: 'Mamme in Movimento Palermo',
    requestedDate: '2026-09-12',
    requestedTimeSlot: 'Pomeriggio (16:00 - 19:00)',
    participantName: 'Sofia (Mamma)',
    ticketCount: 2,
    notes: 'Vorrei sapere se c\'è disponibilità per un ciclo di 5 lezioni a settembre.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    status: 'In attesa'
  },
  {
    id: 'req-002',
    requestCode: 'REQ-PAL-7719',
    activityId: 'act-lucilla',
    activityTitle: 'Lucilla in Concerto - Live Show Bambini',
    venueName: 'Teatro Golden Palermo',
    organizerName: 'Teatro Golden Palermo',
    requestedDate: '2026-09-20',
    requestedTimeSlot: 'Mattina (10:30)',
    participantName: 'Elena & Bimbos',
    ticketCount: 4,
    notes: 'Richiesta prenotazione per gruppo classe di 4 bambini.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    status: 'In attesa'
  }
];

export const PROMO_BANNERS = [
  {
    id: 'p1',
    title: 'Lucilla Live a Palermo!',
    subtitle: 'Teatro Golden • Sabato 16 e Domenica 17 Maggio',
    badge: 'EVENTO TOP',
    bgGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    textColor: 'text-amber-950',
    image: ILLUSTRAZIONI.musica,
    tag: 'Biglietti Disponibili'
  },
  {
    id: 'p2',
    title: 'Speciale Mamme & Yoga',
    subtitle: 'Prima lezione di prova GRATIS al Parco della Favorita',
    badge: 'PROVA GRATIS',
    bgGradient: 'from-brand-500 via-brand-500 to-purple-600',
    textColor: 'text-white',
    image: ILLUSTRAZIONI.sport,
    tag: 'Senza Impegno'
  },
  {
    id: 'p3',
    title: 'Sfida Go-Kart Papà & Figli',
    subtitle: 'Kartsam Arena Palermo • Sconto 10€ sulla prima gara',
    badge: 'SUPER SPEED',
    bgGradient: 'from-red-600 via-orange-600 to-amber-600',
    textColor: 'text-white',
    image: ILLUSTRAZIONI.sport,
    tag: 'Codice: PAPASPEED'
  }
];
