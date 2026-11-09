import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ChevronLeft, 
  MapPin, 
  Clock, 
  X, 
  Check, 
  ChevronRight,
  Sparkles,
  Palette,
  Trees,
  Landmark,
  Gamepad2,
  UtensilsCrossed
} from 'lucide-react';
import { Activity } from '../types';

// Colore di Brand Ufficiale Magenta Scuro / Rosa-lampone elegante e profondo
export const COLOR_MAGENTA_SCURO = '#B81D5B';
export const COLOR_MAGENTA_SCURO_HOVER = '#A3154E';

export interface CategoryItemDetail {
  id: string;
  name: string;
  subtitle: string;
  hours: string;
  address: string;
  zone: string;
  image: string;
  badgePills: string[];
  filterTags: string[];
  description: string;
  services: string[];
  recommendedAge: string;
  price?: string;
}

export interface CategoryScreenConfig {
  id: 'parchi' | 'laboratori' | 'musei' | 'ludoteche' | 'ristoranti';
  title: string;
  subtitle: string;
  resultsCountLabel: string;
  heroImage: string;
  filterPills: string[];
  items: CategoryItemDetail[];
}

export const CATEGORIES_DATA: Record<string, CategoryScreenConfig> = {
  // =========================================================================
  // 1. PARCHI E NATURA (10 aree verdi)
  // =========================================================================
  parchi: {
    id: 'parchi',
    title: 'Parchi e Natura',
    subtitle: 'Scopri le 10 aree verdi di Palermo per i tuoi bambini',
    resultsCountLabel: 'aree verdi trovate',
    heroImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
    filterPills: ['Tutti', 'Con Area Giochi', 'Area Picnic', 'Animali e Natura'],
    items: [
      {
        id: 'favorita',
        name: 'Parco della Favorita',
        subtitle: 'Monte Pellegrino / Resuttana',
        hours: '08:00 - 20:00',
        address: '📍 viale Diana',
        zone: 'Favorita / Resuttana',
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌳 Ombra', '🚲 Bici', '🧺 Picnic'],
        filterTags: ['Tutti', 'Area Picnic', 'Animali e Natura'],
        description: 'Il polmone verde più grande di Palermo alle pendici di Monte Pellegrino. Lunghi viali alberati perfetti per gite in bicicletta, corse e picnic all\'aria aperta in mezzo alla natura.',
        services: ['Piste ciclabili e podistiche', 'Grandi radure per picnic', 'Vicino Palazzina Cinese', 'Punti sosta con ombra naturale'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      },
      {
        id: 'uditore',
        name: 'Parco Uditore',
        subtitle: 'Passo di Rigano / Uditore',
        hours: '08:00 - 20:00',
        address: '📍 piazza Albert Einstein',
        zone: 'Uditore / Passo di Rigano',
        image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Giochi', '🧺 Picnic', '🌳 Ombra'],
        filterTags: ['Tutti', 'Con Area Giochi', 'Area Picnic'],
        description: 'Nato dalla riqualificazione cittadina, è un parco recintato totalmente pedonale senza auto, ideale per i primi passi dei bimbi in totale sicurezza con altalene, scivoli e percorsi verdi.',
        services: ['Area Giochi 0-10 anni', 'Fontanella acqua potabile', 'Panchine ombreggiate', 'Prato per picnic', 'Accessibile con passeggino'],
        recommendedAge: '0 - 12 anni',
        price: 'Gratuito'
      },
      {
        id: 'mattarella',
        name: 'Giardino Inglese',
        subtitle: 'Parco Piersanti Mattarella',
        hours: '08:00 - 20:00',
        address: '📍 via della Libertà, 48',
        zone: 'Politeama / Libertà',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Giochi', '🦆 Laghetto', '🌳 Ombra'],
        filterTags: ['Tutti', 'Con Area Giochi', 'Animali e Natura'],
        description: 'Il cuore verde della Palermo Liberty. Alberi secolari, un suggestivo laghetto centrale con cigni e anatre, ponticelli in legno e una vivace area giostrine storiche amatissima dai più piccoli.',
        services: ['Laghetto con anatre', 'Giostrine per bimbi', 'Pista pattinaggio', 'Chiosco ristoro / gelati', 'Bagni pubblici'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      },
      {
        id: 'orto-botanico',
        name: 'Orto Botanico',
        subtitle: 'Kalsa / Foro Italico',
        hours: '09:00 - 19:00',
        address: '📍 via Lincoln, 2',
        zone: 'Kalsa / Foro Italico',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🦆 Animali', '🌿 Natura', '🌳 Ombra'],
        filterTags: ['Tutti', 'Animali e Natura'],
        description: 'Uno dei giardini botanici più prestigiosi al mondo con oltre due secoli di storia. Famoso per il monumentale Ficus magnolioide gigante, le serre storiche e le grandi vasche d\'acqua popolate da tartarughe e ninfee.',
        services: ['Visite didattiche', 'Vasche con tartarughe acquatiche', 'Serre storiche', 'Bookshop', 'Percorsi ombreggiati'],
        recommendedAge: '3 - 14 anni',
        price: 'Gratuito < 6 anni'
      },
      {
        id: 'villa-trabia',
        name: 'Villa Trabia',
        subtitle: 'Terre Rosse / Libertà',
        hours: '08:00 - 19:30',
        address: '📍 via Salinas, 3',
        zone: 'Libertà / Giardino Inglese',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Giochi', '🌳 Ombra', '🐟 Laghetto'],
        filterTags: ['Tutti', 'Con Area Giochi', 'Animali e Natura'],
        description: 'Suggestiva dimora nobiliare immersa in un parco ottocentesco ricco di alberi secolari, un ponticello in ferro battuto, un laghetto con pesci e una vivace area giochi rinnovata per bambini.',
        services: ['Area giochi con scivoli e altalene', 'Laghetto con pesci rossi', 'Biblioteca multimediale', 'Viali freschi e ombrosi'],
        recommendedAge: '0 - 10 anni',
        price: 'Gratuito'
      },
      {
        id: 'parco-orleans',
        name: "Parco d'Orléans",
        subtitle: 'Palazzo dei Normanni / Indipendenza',
        hours: '09:00 - 18:30',
        address: '📍 piazza Indipendenza, 21',
        zone: 'Palazzo Reale / Indipendenza',
        image: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🦆 Animali', '🦩 Fenicotteri', '🌳 Ombra'],
        filterTags: ['Tutti', 'Animali e Natura'],
        description: 'L\'unico parco ornitologico cittadino della Sicilia con fenicotteri rosa, pellicani, pappagalli esotici e laghetti protetti in pieno centro.',
        services: ['Parco ornitologico e animali protetti', 'Percorsi naturalistici guidati', 'Ingresso gratuito', 'Aree sosta con panchine'],
        recommendedAge: '1 - 12 anni',
        price: 'Gratuito'
      },
      {
        id: 'villa-giulia',
        name: 'Villa Giulia & Foro Italico',
        subtitle: 'Lungomare / Kalsa',
        hours: '08:00 - 20:00',
        address: '📍 via Lincoln / Foro Italico',
        zone: 'Foro Italico / Mare',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🧺 Picnic', '🌊 Mare', '🌳 Ombra'],
        filterTags: ['Tutti', 'Area Picnic'],
        description: 'Il primo giardino pubblico d\'Italia (1777), con fontana del Dodecaedro e grande prato verde sul lungomare perfetto per aquiloni.',
        services: ['Viali ampi per passeggini', 'Fontane e statue storiche', 'Grande prato fronte mare', 'Chioschi nei dintorni'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      },
      {
        id: 'giardino-zisa',
        name: 'Giardino della Zisa',
        subtitle: 'Piazza Zisa',
        hours: '08:30 - 19:00',
        address: '📍 piazza Guglielmo il Buono',
        zone: 'Zisa',
        image: 'https://images.unsplash.com/photo-1572979203248-185e7a91dc20?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🏰 Castello', '💧 Fontane', '🌳 Natura'],
        filterTags: ['Tutti', 'Animali e Natura'],
        description: 'Di fronte al maestoso Castello della Zisa, rievoca le meraviglie arabo-normanne con scenografici canali d\'acqua a cascata e pergolati.',
        services: ['Canali d\'acqua e fontane a cascata', 'Passeggiata con vista castello', 'Aree pavimentate sicure'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      },
      {
        id: 'villa-garibaldi',
        name: 'Villa Garibaldi',
        subtitle: 'Piazza Marina',
        hours: '08:00 - 20:00',
        address: '📍 piazza Marina',
        zone: 'Centro Storico / Marina',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌳 Ficus gigante', '🏛️ Centro', '🌳 Ombra'],
        filterTags: ['Tutti', 'Animali e Natura'],
        description: 'Ospita il più grande Ficus macrophylla d\'Europa con imponenti radici aeree che sembrano un castello magico per i bambini.',
        services: ['Ficus monumentale spettacolare', 'Ombra densa anche d\'estate', 'Circondato da palazzi storici'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      },
      {
        id: 'villa-bonanno',
        name: 'Villa Bonanno',
        subtitle: 'Piazza della Vittoria',
        hours: '08:00 - 20:00',
        address: '📍 piazza della Vittoria',
        zone: 'Cattedrale / Cassaro',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌴 Palmeto', '🏛️ Cattedrale', '🌳 Ombra'],
        filterTags: ['Tutti'],
        description: 'Splendido palmeto storico situato tra il Palazzo Reale e la Cattedrale, con scavi romani a cielo aperto e viali acciottolati tranquilli.',
        services: ['Palmeto monumentale', 'Vicinissimo a Palazzo dei Normanni', 'Sedute all\'ombra'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito'
      }
    ]
  },

  // =========================================================================
  // 2. LABORATORI CREATIVI (12 attività artistiche)
  // =========================================================================
  laboratori: {
    id: 'laboratori',
    title: 'Laboratori Creativi',
    subtitle: 'Prenota le 12 attività artistiche per i tuoi bambini',
    resultsCountLabel: 'laboratori trovati',
    heroImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80',
    filterPills: ['Tutti', 'Ceramica', 'Pittura', 'Robotica'],
    items: [
      {
        id: 'atelier-arte-insieme',
        name: 'Atelier Arte Insieme',
        subtitle: 'Pittura e Modellazione Argilla',
        hours: '16:00 - 18:30',
        address: '📍 via Maqueda, 124',
        zone: 'Centro Storico',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
        badgePills: ['👶 Dai 4 anni', '🎨 Materiali inclusi'],
        filterTags: ['Tutti', 'Ceramica', 'Pittura'],
        description: 'Manipolazione argilla, colori a dita su tela e scultura guidata con maestri d\'arte specializzati nell\'infanzia.',
        services: ['Tutti i materiali inclusi', 'Grembiulino protettivo fornito', 'Piccola merenda bio', 'Creazione portata a casa'],
        recommendedAge: '4 - 10 anni',
        price: '€14'
      },
      {
        id: 'makerspace-inventori',
        name: 'Makerspace Piccoli Inventori',
        subtitle: 'Laboratorio di Robotica e Coding',
        hours: '15:30 - 17:30',
        address: '📍 piazza Castelnuovo, 8',
        zone: 'Politeama',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🤖 Robotica', '📅 Weekend'],
        filterTags: ['Tutti', 'Robotica'],
        description: 'Costruzione di piccoli robot intelligenti con sensori e motori, imparando la logica e la creatività tecnologica.',
        services: ['Kit robotico individuale', 'Istruttori certificati STEM', 'Attestato inventore'],
        recommendedAge: '6 - 12 anni',
        price: '€18'
      },
      {
        id: 'bottega-ceramica',
        name: 'Bottega Ceramica e Argilla Viva',
        subtitle: 'Tornio e Decori Tradizionali',
        hours: '16:30 - 18:00',
        address: '📍 via Alloro, 36',
        zone: 'Kalsa',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🏺 Tornio', '👶 Dai 5 anni'],
        filterTags: ['Tutti', 'Ceramica'],
        description: 'Esperienza tattile al tornio guidato e decorazione con smalti ecologici a base d\'acqua cotti in forno.',
        services: ['Uso tornio per bimbi', 'Cottura ceramica inclusa', 'Ritiro manufatto'],
        recommendedAge: '5 - 11 anni',
        price: '€16'
      },
      {
        id: 'pittura-emozionale',
        name: 'Pittura Emozionale e Colori a Dita',
        subtitle: 'Atelier Sensoriale su Grandi Fogli',
        hours: '10:30 - 12:00',
        address: '📍 via della Libertà, 62',
        zone: 'Libertà',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🖌 Acquerelli', '🎨 Colori a dita'],
        filterTags: ['Tutti', 'Pittura'],
        description: 'Pittura libera a parete e a terra su rulli di carta giganti, usando spugne, rulli e colori fluorescenti atossici.',
        services: ['Colori 100% lavabili certificati', 'Spazio a prova di macchia', 'Foto ricordo digitali'],
        recommendedAge: '3 - 8 anni',
        price: '€12'
      },
      {
        id: 'artisti-mondello',
        name: 'Piccoli Artisti a Mondello',
        subtitle: 'Pittura Open-Air fronte Mare',
        hours: '10:00 - 12:30',
        address: '📍 piazza Mondello, 12',
        zone: 'Mondello',
        image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌊 Open Air', '🎨 Tempere lavabili'],
        filterTags: ['Tutti', 'Pittura'],
        description: 'Cavalletti da pittore allestiti all\'ombra dei pini marittimi con vista golfo, dipingendo conchiglie e paesaggi.',
        services: ['Cavalletto professionale bimbi', 'Colori solari resistenti', 'Spazio verde riservato'],
        recommendedAge: '4 - 10 anni',
        price: '€15'
      },
      {
        id: 'coding-lego',
        name: 'Coding & Robotica con Mattoncini',
        subtitle: 'Costruzioni Meccaniche e Sensori',
        hours: '17:00 - 18:30',
        address: '📍 via Notarbartolo, 15',
        zone: 'Notarbartolo',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🤖 Robotica', '💻 Primi Passi'],
        filterTags: ['Tutti', 'Robotica'],
        description: 'Divertenti missioni spaziali e labirinti da superare programmazione visiva a blocchi su tablet.',
        services: ['Tablet e kit dedicati', 'Piccoli gruppi max 8', 'Sfida finale a squadre'],
        recommendedAge: '7 - 13 anni',
        price: '€17'
      },
      {
        id: 'falegnameria-bimbi',
        name: 'Falegnameria Creativa per Bimbi',
        subtitle: 'Costruisci il Tuo Giocattolo in Legno',
        hours: '15:00 - 17:00',
        address: '📍 via Roma, 280',
        zone: 'Centro',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🪵 Legno sicuro', '✂️ Manualità'],
        filterTags: ['Tutti'],
        description: 'Levigatura, assemblaggio e pittura di macchinine e barchette con utensili pensati per le manine dei piccoli.',
        services: ['Legno naturale di balsa', 'Occhialini di sicurezza', 'Giocattolo da portare a casa'],
        recommendedAge: '5 - 12 anni',
        price: '€20'
      },
      {
        id: 'cartapesta-maschere',
        name: 'Cartapesta & Maschere di Scena',
        subtitle: 'Teatro e Scenografia',
        hours: '16:00 - 18:00',
        address: '📍 via Vittorio Emanuele, 180',
        zone: 'Cassaro',
        image: 'https://images.unsplash.com/photo-1576764402988-7143f9cca90a?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎭 Tradizione', '🎨 Creatività'],
        filterTags: ['Tutti', 'Pittura'],
        description: 'Creazione di maschere fantastiche e personaggi delle leggende siciliane con pasta di carta e tempere.',
        services: ['Materiali di riciclo creativo', 'Piume e brillantini lavabili'],
        recommendedAge: '4 - 9 anni',
        price: '€13'
      },
      {
        id: 'stampa-botanica',
        name: 'Laboratorio Botanico & Eco-Print',
        subtitle: 'Stampa con Foglie e Fiori',
        hours: '10:00 - 11:30',
        address: '📍 via Lincoln, 4',
        zone: 'Kalsa',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌿 Ecosostenibile', '🍃 Foglie e Colori'],
        filterTags: ['Tutti'],
        description: 'Impronte naturali su borse di cotone biologico pestando foglie e petali colorati raccolti nel parco.',
        services: ['Borsa shopper in omaggio', 'Pigmenti vegetali naturali'],
        recommendedAge: '3 - 8 anni',
        price: '€11'
      },
      {
        id: 'stop-motion-kids',
        name: 'Stop Motion & Piccoli Registi',
        subtitle: 'Cartoni Animati in Pasta Modellabile',
        hours: '17:00 - 19:00',
        address: '📍 via Dante, 45',
        zone: 'Politeama',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎬 Cinema', '📱 Digitale creativo'],
        filterTags: ['Tutti'],
        description: 'Creazione di un mini film d\'animazione fotografando pupazzetti fotogramma per fotogramma con colonna sonora.',
        services: ['Video MP4 inviato ai genitori', 'Set miniature fotografici'],
        recommendedAge: '6 - 12 anni',
        price: '€19'
      },
      {
        id: 'mosaico-siciliano',
        name: 'Mosaico dei Piccoli Artigiani',
        subtitle: 'Tessere e Geometrie Dorate',
        hours: '16:00 - 17:30',
        address: '📍 piazza Marina, 19',
        zone: 'Marina',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
        badgePills: ['✨ Tessere colorate', '🏛️ Arte locale'],
        filterTags: ['Tutti', 'Ceramica'],
        description: 'Ispirato ai mosaici della Cappella Palatina, i bambini compongono formelle decorate con tessere atossiche.',
        services: ['Supporto in terracotta', 'Collanti atossici all\'acqua'],
        recommendedAge: '5 - 11 anni',
        price: '€15'
      },
      {
        id: 'tessitura-fili',
        name: 'Tessitura & Intrecci Magici',
        subtitle: 'Telai Morbidi in Legno',
        hours: '15:30 - 17:00',
        address: '📍 via Bara all\'Olivella, 8',
        zone: 'Teatro Massimo',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🧵 Telai morbidi', '👶 Dai 3 anni'],
        filterTags: ['Tutti'],
        description: 'Trama e ordito con filati di lana arcobaleno per sviluppare coordinazione oculo-manuale e pazienza creativa.',
        services: ['Mini telaio in legno compreso', 'Fili di cotone coloratissimi'],
        recommendedAge: '3 - 7 anni',
        price: '€12'
      }
    ]
  },

  // =========================================================================
  // 3. MUSEI E CULTURA (8 musei)
  // =========================================================================
  musei: {
    id: 'musei',
    title: 'Musei e Cultura',
    subtitle: 'Scopri gli 8 musei kid-friendly di Palermo',
    resultsCountLabel: 'musei trovati',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    filterPills: ['Tutti', 'Interattivi', 'Storici', 'Con Laboratorio'],
    items: [
      {
        id: 'palazzo-butera',
        name: 'Palazzo Butera',
        subtitle: 'Arte Contemporanea sul Foro Italico',
        hours: '10:00 - 19:00',
        address: '📍 via della Libertà / Foro Italico',
        zone: 'Kalsa / Mare',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎨 Interattivo', '📍 Visita Guidata'],
        filterTags: ['Tutti', 'Interattivi', 'Con Laboratorio'],
        description: 'Magnifica dimora nobiliare restaurata affacciata sul mare. Ospita percorsi ludici dove i bambini esplorano installazioni d\'arte e colori.',
        services: ['Kit esploratore bimbi con mappa e matite', 'Visite animate ogni weekend', 'Ascensori per passeggini'],
        recommendedAge: '4 - 12 anni',
        price: 'Gratuito < 12'
      },
      {
        id: 'museo-marionette',
        name: 'Museo Internazionale delle Marionette',
        subtitle: 'Pupi Siciliani e Teatrini del Mondo',
        hours: '10:00 - 18:00',
        address: '📍 piazzetta Niscemi, 5',
        zone: 'Marina / Kalsa',
        image: 'https://images.unsplash.com/photo-1576764402988-7143f9cca90a?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🏛 Storico', '✂️ Laboratorio'],
        filterTags: ['Tutti', 'Storici', 'Con Laboratorio'],
        description: 'Oltre 5.000 marionette, ombre e pupi cavallereschi provenienti da tutto il mondo con spettacoli domenicali dal vivo.',
        services: ['Spettacolo dell\'Opera dei Pupi incluso', 'Laboratorio costruzione burattini', 'Accesso guidato'],
        recommendedAge: '3 - 12 anni',
        price: '€5 bambino'
      },
      {
        id: 'museo-salinas',
        name: 'Museo Archeologico Salinas',
        subtitle: 'I Tesori dell\'Antica Sicilia',
        hours: '09:00 - 19:00',
        address: '📍 piazza Olivella, 24',
        zone: 'Teatro Massimo',
        image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🏺 Reperti', '🧒 Caccia al Tesoro'],
        filterTags: ['Tutti', 'Storici', 'Interattivi'],
        description: 'Cortili incantevoli con fontane storiche e reperti fenici e greci resi avvincenti per i piccoli grazie a una caccia al reperto.',
        services: ['Caccia al tesoro archeologica', 'Percorsi tattili autorizzati', 'Caffetteria interna'],
        recommendedAge: '5 - 13 anni',
        price: 'Gratuito < 18'
      },
      {
        id: 'palazzo-reale',
        name: 'Palazzo Reale e Cappella Palatina',
        subtitle: 'La Corte dei Re Normanni',
        hours: '08:30 - 17:30',
        address: '📍 piazza Indipendenza, 1',
        zone: 'Palazzo dei Normanni',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        badgePills: ['👑 Reale', '✨ Mosaici d\'oro'],
        filterTags: ['Tutti', 'Storici'],
        description: 'La più antica residenza reale d\'Europa con la maestosa Cappella Palatina interamente ricoperta di mosaici dorati scintillanti.',
        services: ['Guida illustrata per ragazzi', 'Visita ai giardini reali', 'Punti ristoro'],
        recommendedAge: 'Tutte le età',
        price: 'Gratuito < 14'
      },
      {
        id: 'museo-doderlein',
        name: 'Museo di Zoologia "Doderlein"',
        subtitle: 'Collezioni Faunistiche del Mediterraneo',
        hours: '09:00 - 17:00',
        address: '📍 via Archirafi, 16',
        zone: 'Stazione Centrale',
        image: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🦖 Animali rari', '🔬 Scientifico'],
        filterTags: ['Tutti', 'Interattivi'],
        description: 'Teca storica con squali fossili, cetacei, tartarughe giganti e diorami naturalistici che affascinano ogni giovane scienziato.',
        services: ['Microscopi didattici interattivi', 'Visite guidate da biologi marini'],
        recommendedAge: '4 - 12 anni',
        price: '€4'
      },
      {
        id: 'gam-palermo',
        name: 'GAM - Galleria d\'Arte Moderna',
        subtitle: 'Complesso Monumentale di Sant\'Anna',
        hours: '09:30 - 18:30',
        address: '📍 via Sant\'Anna, 21',
        zone: 'Kalsa',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎨 Interattivo', '✂️ Laboratorio Bimbi'],
        filterTags: ['Tutti', 'Interattivi', 'Con Laboratorio'],
        description: 'Grandi sale luminose con capolavori dell\'Ottocento e Novecento e weekend dedicati ai laboratori pittorici per l\'infanzia.',
        services: ['Spazio didattico permanente', 'Attività pratiche a fine percorso'],
        recommendedAge: '5 - 12 anni',
        price: '€6 bambino'
      },
      {
        id: 'museo-gemmellaro',
        name: 'Museo Geologico Gemmellaro',
        subtitle: 'Fossili, Minerali ed Elefanti Nani',
        hours: '09:00 - 16:30',
        address: '📍 corso Tukory, 131',
        zone: 'Università',
        image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🦴 Dinosauri', '💎 Cristalli e fossili'],
        filterTags: ['Tutti', 'Storici', 'Interattivi'],
        description: 'Celebre per i resti fossili degli elefanti nani preistorici di Sicilia e la ricostruzione scheletrica del dinosauro siciliano.',
        services: ['Simulazione scavo fossile', 'Laboratorio piccoli paleontologi'],
        recommendedAge: '4 - 12 anni',
        price: '€3'
      },
      {
        id: 'ecomuseo-mare',
        name: 'Ecomuseo Mare Memoria Viva',
        subtitle: 'Storie di Pescatori e Golfo',
        hours: '10:00 - 18:30',
        address: '📍 via Messina Marine, 27',
        zone: 'Sant\'Erasmo',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌊 Mare', '📱 Multimediale'],
        filterTags: ['Tutti', 'Interattivi'],
        description: 'Ex deposito locomotive affacciato sul mare trasformato in spazio multimediale con mappe interattive e barche a remi.',
        services: ['Installazioni touch screen', 'Cortile giochi fronte mare'],
        recommendedAge: '4 - 12 anni',
        price: 'Gratuito'
      }
    ]
  },

  // =========================================================================
  // 4. LUDOTECHE E SPAZI GIOCO (6 spazi sicuri al chiuso)
  // =========================================================================
  ludoteche: {
    id: 'ludoteche',
    title: 'Ludoteche e Spazi Gioco',
    subtitle: 'Esplora i 6 spazi sicuri al chiuso per i più piccoli',
    resultsCountLabel: 'luoghi trovati',
    heroImage: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80',
    filterPills: ['Tutti', 'Vasca Palline', 'Feste', 'Area 0-3'],
    items: [
      {
        id: 'paese-dei-balocchi',
        name: 'Il Paese dei Balocchi',
        subtitle: 'Mega Playground e Gonfiabili Morbidi',
        hours: '15:30 - 20:30',
        address: '📍 via Roma, 142',
        zone: 'Centro',
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🤹 Vaschetta Palline', '☕ Bar Famiglie'],
        filterTags: ['Tutti', 'Vasca Palline', 'Feste'],
        description: 'Grande struttura indoor con labirinto protetto su tre livelli, scivoli tubolari a spirale e vasca con 15.000 palline igienizzate.',
        services: ['Vasca palline certificata', 'Bar caffetteria per genitori con Wi-Fi', 'Calze antiscivolo fornite'],
        recommendedAge: '1 - 9 anni',
        price: '€8 / ora'
      },
      {
        id: 'nuvola-morbida',
        name: 'Spazio Gioco "Nuvola Morbida"',
        subtitle: 'Area Sensoriale & Primi Passi',
        hours: '09:00 - 19:30',
        address: '📍 piazza Mondello, 5',
        zone: 'Mondello',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
        badgePills: ['👶 Area 0-3 Anni', '♿ Accessibile'],
        filterTags: ['Tutti', 'Area 0-3'],
        description: 'Superfici morbide antitrauma a tema nuvole, specchi sensoriali Montessori, dondoli in legno e cuscini giganti per gattonare.',
        services: ['Pavimentazione antibatterica 100%', 'Zona allattamento e fasciatoi', 'Parcheggio passeggini'],
        recommendedAge: '0 - 4 anni',
        price: '€9 / ora'
      },
      {
        id: 'jungle-jump',
        name: 'Jungle Jump Indoor Play',
        subtitle: 'Parco Gonfiabili a Tema Giungla',
        hours: '16:00 - 21:00',
        address: '📍 viale Regione Siciliana, 1200',
        zone: 'Circonvallazione',
        image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🧗 Gonfiabili', '🎂 Feste Compleanno'],
        filterTags: ['Tutti', 'Feste', 'Vasca Palline'],
        description: 'Vasti castelli gonfiabili con leoni e giraffe, pista per macchinine a pedali, trampolini elastici protetti da reti e sale feste.',
        services: ['Sale private per compleanni', 'Animatori professionisti', 'Aria condizionata sanificata'],
        recommendedAge: '3 - 11 anni',
        price: '€10 / ora'
      },
      {
        id: 'oasi-baby',
        name: 'Oasi Baby & Psicomotricità',
        subtitle: 'Percorsi di Equilibrio e Gioco Libero',
        hours: '09:30 - 18:30',
        address: '📍 via Notarbartolo, 32',
        zone: 'Notarbartolo',
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🧸 Soft Play', '👶 Area 0-3 Anni'],
        filterTags: ['Tutti', 'Area 0-3'],
        description: 'Ambiente caldo in parquet ecologico con cubi modulari morbidi, vasca palline pastello e tunnel sensoriali per lo sviluppo motorio.',
        services: ['Educatori per la prima infanzia', 'Massimo 12 bambini per turno'],
        recommendedAge: '6 mesi - 3 anni',
        price: '€10 / ora'
      },
      {
        id: 'ludolandia-fantasia',
        name: 'LudoLandia Fantasia',
        subtitle: 'Animazione, Giochi da Tavolo e Balli',
        hours: '16:00 - 20:00',
        address: '📍 via Libertà, 94',
        zone: 'Libertà',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🤹 Vasca Palline', '🎉 Feste a Tema'],
        filterTags: ['Tutti', 'Vasca Palline', 'Feste'],
        description: 'Pareti d\'arrampicata baby con materassi ad aria, vasca palline con scivolo a tunnel, angolo travestimenti e trucchi lavabili.',
        services: ['Costumi per giochi di ruolo', 'Baby disco e karaoke'],
        recommendedAge: '2 - 8 anni',
        price: '€8 / ora'
      },
      {
        id: 'mondo-piccoli',
        name: 'Mondo Piccoli Spazio Famiglie',
        subtitle: 'Caffè Family-Friendly & Gioco Protetto',
        hours: '09:00 - 19:00',
        address: '📍 via Strasburgo, 58',
        zone: 'San Lorenzo',
        image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=600&q=80',
        badgePills: ['☕ Bar Famiglie', '👶 Area 0-3 Anni'],
        filterTags: ['Tutti', 'Area 0-3'],
        description: 'Concept space con angolo gioco Montessori per i bimbi a vista dai tavolini del bistrot, per unire relax dei genitori e gioco sicuro.',
        services: ['Menu bio per bambini', 'Libreria illustrata multilingue'],
        recommendedAge: '0 - 6 anni',
        price: '€7 / ora'
      }
    ]
  },

  // =========================================================================
  // 5. SPAZI E RISTORANTI (15 locali kid-friendly)
  // =========================================================================
  ristoranti: {
    id: 'ristoranti',
    title: 'Spazi e Ristoranti',
    subtitle: 'Trova i 15 locali kid-friendly per la tua famiglia',
    resultsCountLabel: 'ristoranti trovati',
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    filterPills: ['Tutti', 'Menu Bimbi', 'Area Giochi', 'Fasciatoio'],
    items: [
      {
        id: 'albero-magico',
        name: "Pizzeria L'Albero Magico",
        subtitle: 'Pizza Forno a Legna & Playground Interno',
        hours: '19:00 - 23:30',
        address: '📍 via Libertà, 88',
        zone: 'Libertà',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🍕 Menu Bimbi', '🎠 Area Giochi', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Area Giochi', 'Fasciatoio'],
        description: 'Pizzeria pensata per le famiglie con maxi area giochi recintata a vista dai tavoli, menu baby con pizza a forma di orsetto e impasti ad alta digeribilità.',
        services: ['Area giochi con scivoli e casetta', 'Fasciatoio e riduttore wc', 'Kit matite colorate al tavolo', 'Seggioloni igienizzati'],
        recommendedAge: 'Tutte le età',
        price: 'Menu Baby €9'
      },
      {
        id: 'bistrot-fiabe',
        name: 'Bistrot delle Fiabe',
        subtitle: 'Cucina Espressa & Tavoli Interattivi',
        hours: '12:00 - 15:30 • 19:30 - 23:00',
        address: '📍 piazza Castelnuovo, 14',
        zone: 'Politeama',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🍝 Baby Food', '🎨 Tavoli con Colori', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Atmosfera fiabesca con pareti illustrate, tovagliette da colorare con pennarelli atossici e piatti sani a base di verdure e pasta fresca per bambini.',
        services: ['Scaldabiberon disponibile', 'Omogeneizzati bio a richiesta', 'Spazio passeggini comodo', 'Fasciatoio dedicato'],
        recommendedAge: '0 - 10 anni',
        price: 'Menu Kids €11'
      },
      {
        id: 'playground-grillo',
        name: 'Pizzeria & Playground Il Grillo',
        subtitle: 'Maxi Labirinto Morbido & Pizze Baby',
        hours: '18:30 - 23:30',
        address: '📍 via Notarbartolo, 45',
        zone: 'Notarbartolo',
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Maxi Scivoli', '🍕 Menu Bimbi', '☕ Bar Famiglie'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Area Giochi'],
        description: 'Vera e propria ludoteca annessa alla pizzeria con animatrici nel weekend, vasca con palline e mini calzone al pomodoro dolce.',
        services: ['Animazione weekend inclusa', 'Vasca palline sicura', 'Parcheggio privato convenzionato', 'Menu pizza + bibita bimbi'],
        recommendedAge: '2 - 9 anni',
        price: 'Menu Baby €10'
      },
      {
        id: 'giardino-segreto',
        name: 'Trattoria del Giardino Segreto',
        subtitle: 'Cucina Tradizionale sul Prato Verde',
        hours: '12:30 - 16:00 • 19:30 - 23:30',
        address: '📍 viale Margherita, 12',
        zone: 'Mondello',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌿 Giardino', '🍝 Menu Bimbi', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Area Giochi', 'Fasciatoio'],
        description: 'Ampio parco alberato con tavoli all\'aperto e prato dove i bambini possono muoversi e giocare con altalene in legno durante il pranzo domenicale.',
        services: ['Grande giardino recintato', 'Fasciatoio nel bagno dedicato', 'Polpettine e patate al forno baby', 'Seggioloni morbidi'],
        recommendedAge: 'Tutte le età',
        price: 'Pranzo Family €18'
      },
      {
        id: 'bio-bistrot',
        name: 'Bio Bistrot Piccoli Sapori',
        subtitle: 'Biologico, Pappe e Merende Artigianali',
        hours: '08:30 - 20:00',
        address: '📍 via Alloro, 22',
        zone: 'Kalsa',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🥗 Pappe Bio', '🍼 Fasciatoio', '👶 Seggioloni'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Punto di riferimento per neogenitori nel centro storico con passati di verdura freschi, frullati di frutta a km zero e angolo morbido relax.',
        services: ['Cucinotto pappe autonomo', 'Bagno nursery attrezzatissimo', 'Merende senza zuccheri aggiunti', 'Wi-Fi veloce'],
        recommendedAge: '0 - 5 anni',
        price: 'Pappa Bio €6'
      },
      {
        id: 'la-pineta',
        name: 'Ristorante Pizzeria La Pineta',
        subtitle: 'Sotto i Pini del Parco con Giostrine',
        hours: '12:00 - 16:00 • 19:30 - 23:30',
        address: '📍 viale Diana, 4',
        zone: 'Favorita',
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Area Giochi', '🍕 Menu Bimbi', '🌳 All\'Aperto'],
        filterTags: ['Tutti', 'Area Giochi', 'Menu Bimbi'],
        description: 'Immerso nella Favorita con pineta ombreggiata, pista per tricicli e altalene. Ideale per pranzi con nonni e corse all\'aria aperta.',
        services: ['Parco giochi all\'aperto', 'Spazio bici e monopattini', 'Forno a legna tradizionale', 'Menu cotoletta e patatine fresche'],
        recommendedAge: 'Tutte le età',
        price: 'Menu Bimbi €10'
      },
      {
        id: 'casale-gelso',
        name: 'Casale del Gelso Family Park',
        subtitle: 'Agriturismo Cittadino & Gonfiabili',
        hours: '12:30 - 17:00 (Sab & Dom)',
        address: '📍 via San Lorenzo, 102',
        zone: 'San Lorenzo',
        image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🤹 Animazione', '🎠 Area Giochi', '🍕 Forno a Legna'],
        filterTags: ['Tutti', 'Area Giochi', 'Menu Bimbi'],
        description: 'Spazio all\'aperto con mega gonfiabili e staff di animatori che intrattengono i piccoli durante il pranzo della domenica.',
        services: ['Animazione con baby dance', 'Gonfiabili controllati', 'Ampio parcheggio interno', 'Menu genuino a km 0'],
        recommendedAge: '3 - 11 anni',
        price: 'Menu Baby €12'
      },
      {
        id: 'piccoli-principi',
        name: 'Osteria dei Piccoli Principi',
        subtitle: 'Tavoli con Libri & Pizza Margherita Baby',
        hours: '19:00 - 23:00',
        address: '📍 via Maqueda, 190',
        zone: 'Centro Storico',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🍕 Menu Bimbi', '📖 Libri Illustrati', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Ambiente caldo con pavimenti in legno, angolo lettura con fiabe illustrate e servizio al tavolo rapido per non far annoiare i piccoli.',
        services: ['Libreria bimbi a disposizione', 'Fasciatoio con salviette bio', 'Servizio bimbi prioritario'],
        recommendedAge: '1 - 8 anni',
        price: 'Menu Kids €8'
      },
      {
        id: 'monte-pellegrino-ristoro',
        name: 'Fattoria Didattica & Ristoro Monte Pellegrino',
        subtitle: 'Animali da Cortile e Pranzo nel Bosco',
        hours: '11:00 - 17:00',
        address: '📍 via Pietro Bonanno, 80',
        zone: 'Monte Pellegrino',
        image: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🐑 Animali', '🌿 Giardino', '🍝 Menu Bimbi'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Area Giochi'],
        description: 'A pochi minuti dalla città, i bambini possono accarezzare caprette e asinelli e pranzare all\'aperto all\'ombra degli alberi.',
        services: ['Visita agli animali inclusa', 'Prato per pic-nic e tavoli', 'Primi piatti con pomodoro fresco bio'],
        recommendedAge: 'Tutte le età',
        price: 'Menu Baby €13'
      },
      {
        id: 'burger-fun',
        name: 'Burger & Fun Kids Diner',
        subtitle: 'American Style con Mini Burger e Playground',
        hours: '12:00 - 15:00 • 19:00 - 23:30',
        address: '📍 via Roma, 210',
        zone: 'Centro',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🍔 Mini Burger', '🎮 Giochi', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Area Giochi', 'Fasciatoio'],
        description: 'Diner moderno colorato con mini hamburger di manzo locale, patatine fritte al forno e vasca interattiva con proiezioni a terra.',
        services: ['Proiettore interattivo per giochi a pavimento', 'Sorpresa giocattolo nel box meal', 'Fasciatoio'],
        recommendedAge: '3 - 12 anni',
        price: 'Burger Box €9.50'
      },
      {
        id: 'oasi-verde-pizza',
        name: 'Pizzeria Oasi Verde',
        subtitle: 'Parco Recintato & Giostre Nuove',
        hours: '19:30 - 23:30',
        address: '📍 piazza Albert Einstein, 3',
        zone: 'Uditore',
        image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🎠 Area Giochi', '🍕 Menu Bimbi', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Area Giochi', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Vicinissima al Parco Uditore con giardino privato, pista per macchinine a spinta e pizze cotte nel forno a legna con farine siciliane.',
        services: ['Parco giochi recintato con erba sintetica', 'Seggioloni igienizzati', 'Fasciatoio con pannolini d\'emergenza'],
        recommendedAge: '1 - 10 anni',
        price: 'Menu Pizza €8.50'
      },
      {
        id: 'mimmo-sul-mare',
        name: 'Trattoria Da Mimmo sul Mare',
        subtitle: 'Pesce Fresco a Prova di Bambino',
        hours: '12:30 - 15:30 • 19:30 - 23:00',
        address: '📍 via Barcarello, 18',
        zone: 'Sferracavallo',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🐟 Menu Bimbi', '🌊 Vista Mare', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Fronte mare nella baia di Sferracavallo, celebre per le sue polpettine di pesce azzurro senza spine amate dai bambini e terrazza ventilata.',
        services: ['Menu senza spine garantito', 'Terrazza protetta senza auto', 'Tovagliette e colori marini'],
        recommendedAge: 'Tutte le età',
        price: 'Menu Mare Baby €12'
      },
      {
        id: 'family-lounge-dante',
        name: "Giardino d'Inverno Family Lounge",
        subtitle: 'Caffetteria, Brunch & Giochi Montessori',
        hours: '08:00 - 19:30',
        address: '📍 via Dante, 30',
        zone: 'Politeama',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
        badgePills: ['☕ Merende Bio', '🎨 Tavolo Disegno', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Spazio luminoso con verande a vetri per colazioni e merende con yogurt fresco, pancake per bambini e giochi sensoriali in legno.',
        services: ['Pancake baby con frutta fresca', 'Giochi in legno certificati', 'Fasciatoio con scaldasalviette'],
        recommendedAge: '0 - 7 anni',
        price: 'Merenda Baby €5'
      },
      {
        id: 'casetta-bosco',
        name: 'Pizzeria La Casetta nel Bosco',
        subtitle: 'Pini Secolari & Casetta sull\'Albero',
        hours: '19:30 - 23:30',
        address: '📍 via Resuttana, 75',
        zone: 'Resuttana',
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🌲 Giardino', '🎠 Area Giochi', '🍕 Menu Bimbi'],
        filterTags: ['Tutti', 'Area Giochi', 'Menu Bimbi'],
        description: 'Pizzeria con suggestiva casetta in legno con ponticello e scivolo, dove i bambini possono esplorare in sicurezza prima della pizza.',
        services: ['Casetta sull\'albero certificata', 'Impasti pizza ai 5 cereali', 'Tavoli distanziati'],
        recommendedAge: '3 - 10 anni',
        price: 'Menu Baby €9'
      },
      {
        id: 'forno-marionette',
        name: 'Il Forno delle Marionette',
        subtitle: 'Pizze dei Paladini & Mini Teatrino',
        hours: '19:00 - 23:30',
        address: '📍 corso Vittorio Emanuele, 240',
        zone: 'Cassaro',
        image: 'https://images.unsplash.com/photo-1576764402988-7143f9cca90a?auto=format&fit=crop&w=600&q=80',
        badgePills: ['🍕 Menu Bimbi', '🎭 Teatrino Pupi', '🍼 Fasciatoio'],
        filterTags: ['Tutti', 'Menu Bimbi', 'Fasciatoio'],
        description: 'Locale caratteristico vicino ai Quattro Canti dove i bimbi possono assistere a un breve teatrino dei pupi prima della pizza a spicchi.',
        services: ['Piccolo teatrino per bimbi', 'Pizze intagliate a stella', 'Fasciatoio'],
        recommendedAge: '2 - 10 anni',
        price: 'Menu Paladino €8.50'
      }
    ]
  }
};

export interface ParksScreenViewProps {
  onBackToHome: () => void;
  category?: string;
  activities?: Activity[];
  onSelectActivity?: (act: Activity) => void;
  onOpenBooking?: (act: Activity) => void;
  onOpenMapWithPark?: (parkName: string) => void;
}

export const ParksScreenView: React.FC<ParksScreenViewProps> = ({
  onBackToHome,
  category = 'parchi',
  activities = [],
  onSelectActivity,
  onOpenMapWithPark
}) => {
  // Normalizzazione della categoria attiva
  const initialCategoryKey = useMemo<'parchi' | 'laboratori' | 'musei' | 'ludoteche' | 'ristoranti'>(() => {
    const catLower = (category || 'parchi').toLowerCase();
    if (catLower.includes('parc') || catLower.includes('natur') || catLower.includes('green') || catLower.includes('giard')) return 'parchi';
    if (catLower.includes('lab') || catLower.includes('creat') || catLower.includes('art')) return 'laboratori';
    if (catLower.includes('mus') || catLower.includes('cult')) return 'musei';
    if (catLower.includes('lud') || catLower.includes('indoor') || catLower.includes('gioc')) return 'ludoteche';
    if (catLower.includes('rist') || catLower.includes('spaz') || catLower.includes('food') || catLower.includes('mang')) return 'ristoranti';
    return 'parchi';
  }, [category]);

  const [activeCategory, setActiveCategory] = useState<'parchi' | 'laboratori' | 'musei' | 'ludoteche' | 'ristoranti'>(initialCategoryKey);
  const [activeFilter, setActiveFilter] = useState<string>('Tutti');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [favoritesList, setFavoritesList] = useState<string[]>(['favorita', 'albero-magico', 'bistrot-fiabe', 'atelier-arte-insieme', 'paese-dei-balocchi', 'palazzo-butera']);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<CategoryItemDetail | null>(null);

  // Sincronizza categoria attiva se cambia la prop
  useEffect(() => {
    setActiveCategory(initialCategoryKey);
    setActiveFilter('Tutti');
    setSearchQuery('');
    setIsSearchOpen(false);
  }, [initialCategoryKey]);

  // Configurazione della categoria attiva
  const currentConfig = CATEGORIES_DATA[activeCategory] || CATEGORIES_DATA.parchi;

  // Reset filtro al cambio categoria
  const handleSwitchCategory = (newCat: 'parchi' | 'laboratori' | 'musei' | 'ludoteche' | 'ristoranti') => {
    setActiveCategory(newCat);
    setActiveFilter('Tutti');
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Toggle preferiti
  const handleToggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritesList((prev) => 
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Filtra gli elementi della categoria
  const filteredItems = useMemo(() => {
    return currentConfig.items.filter((item) => {
      // 1. Ricerca testuale
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          item.name.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.badgePills.some((b) => b.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Filtro per pillola
      if (activeFilter === 'Tutti') return true;
      return item.filterTags.includes(activeFilter);
    });
  }, [currentConfig, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans antialiased flex flex-col select-none relative overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER:                                                           */}
      {/* - Immagine di sfondo con soli bambini (nessun adulto)                     */}
      {/* - Gradiente scuro in basso per massima leggibilità del testo              */}
      {/* - Due pulsanti circolari semitrasparenti in stile glassmorfismo in alto:  */}
      {/*   freccia indietro (<) a sinistra, icona di ricerca a destra              */}
      {/* - Area Titolo: Testo grande bianco in grassetto e sottotitolo bianco      */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[235px] sm:h-[255px] overflow-hidden select-none bg-slate-900 flex flex-col justify-between p-5 sm:p-6 shrink-0">
        
        {/* Immagine di sfondo specifica per categoria con soli bambini */}
        <img 
          src={currentConfig.heroImage} 
          alt={currentConfig.title} 
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
        />

        {/* Gradiente scuro in basso per la massima leggibilità del testo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />

        {/* Top bar trasparente della hero: Tasto Indietro a sx (<), Ricerca a dx */}
        <div className="relative z-10 flex items-center justify-between">
          
          {/* Pulsante circolare semitrasparente in stile glassmorfismo (<) */}
          <button
            type="button"
            onClick={onBackToHome}
            aria-label="Indietro"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Pulsante circolare semitrasparente in stile glassmorfismo (Ricerca) */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Cerca attività"
            className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/25 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 ${
              isSearchOpen 
                ? 'bg-white text-slate-900' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Search className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>

        </div>

        {/* Campo di ricerca a comparsa nella hero */}
        {isSearchOpen && (
          <div className="relative z-10 pt-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cerca in ${currentConfig.title.toLowerCase()}...`}
                className="w-full bg-white/95 backdrop-blur-md border border-white rounded-full py-2 pl-9 pr-9 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B81D5B]"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 2. AREA TITOLO: Testo grande bianco in grassetto e sottotitolo bianco */}
        <div className="relative z-10 pb-4 space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md leading-tight">
            {currentConfig.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/95 font-medium leading-snug drop-shadow-xs">
            {currentConfig.subtitle}
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* CORPO DELLA SCHERMATA (Foglio Bianco Fluttuante con Bordi Arrotondati)     */}
      {/* ========================================================================= */}
      <div className="-mt-6 rounded-t-3xl sm:rounded-t-[32px] bg-white relative z-10 shadow-lg min-h-screen pt-3.5 pb-28 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        
        {/* Maniglia decorativa sottile iOS */}
        <div className="flex justify-center pb-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Selettore rapido 5 categorie in stile pillola pastello */}
        <div className="flex items-center justify-between pb-2 pt-0.5 border-b border-slate-100 mb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'parchi', label: 'Parchi', icon: Trees },
              { id: 'laboratori', label: 'Laboratori', icon: Palette },
              { id: 'musei', label: 'Musei', icon: Landmark },
              { id: 'ludoteche', label: 'Ludoteche', icon: Gamepad2 },
              { id: 'ristoranti', label: 'Ristoranti', icon: UtensilsCrossed }
            ].map((catTab) => {
              const isCurrent = activeCategory === catTab.id;
              const TabIcon = catTab.icon;
              return (
                <button
                  key={catTab.id}
                  type="button"
                  onClick={() => handleSwitchCategory(catTab.id as any)}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isCurrent
                      ? 'bg-[#FDF2F6] text-[#B81D5B] border border-[#FBCFE8]'
                      : 'text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{catTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PILLOLE SOTTOCATEGORIE:                                                */}
        {/* - Riga orizzontale scorrevole                                             */}
        {/* - Pulsante attivo "Tutti" con sfondo magenta/rosa-lampone elegante (#B81D5B)*/}
        {/* - Pulsanti inattivi grigio chiaro con testo scuro                         */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5">
          {currentConfig.filterPills.map((tag) => {
            const isSelected = activeFilter === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                style={
                  isSelected 
                    ? { backgroundColor: COLOR_MAGENTA_SCURO, borderColor: COLOR_MAGENTA_SCURO } 
                    : undefined
                }
                className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer font-bold shrink-0 shadow-2xs active:scale-95 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/80'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. CONTEGGIO RISULTATI: Piccolo testo grigio chiaro                       */}
        {/* ========================================================================= */}
        <div className="pt-2.5 pb-2 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>{filteredItems.length} {currentConfig.resultsCountLabel}</span>
          {activeFilter !== 'Tutti' && (
            <button
              type="button"
              onClick={() => setActiveFilter('Tutti')}
              style={{ color: COLOR_MAGENTA_SCURO }}
              className="font-bold hover:underline cursor-pointer"
            >
              Mostra tutti
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. CARD ATTIVITÀ (Lista Verticale di Card Bianche Nitide):                 */}
        {/* - Sinistra: Anteprima quadrata con angoli arrotondati                     */}
        {/* - Destra: Titolo in grassetto scuro, pin posizione, etichette grigie      */}
        {/* - Alto a destra: Icona cuore vuota o piena in magenta                     */}
        {/* - Basso a destra: Pulsante circolare magenta/rosa-lampone con freccia (>) */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-1">
          {filteredItems.map((item) => {
            const isFav = favoritesList.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItemForDetail(item)}
                className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-100 hover:border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
              >
                
                {/* A SINISTRA: Immagine quadrata con angoli arrotondati */}
                <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-2xl overflow-hidden shrink-0 bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* AL CENTRO: Titolo, pin con posizione e etichette grigie per caratteristiche */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    {/* Titolo in grassetto scuro */}
                    <h2 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#B81D5B] transition-colors leading-snug truncate">
                      {item.name}
                    </h2>

                    {/* Pin con posizione esatta in piccolo */}
                    <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-0.5 truncate">
                      <span>{item.address}</span>
                    </p>
                  </div>

                  {/* Riga con piccole etichette grigie per caratteristiche */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {item.badgePills.map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold border border-slate-200/50"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* A DESTRA: Cuore in alto + Pulsante circolare Magenta con freccia bianca in basso */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5 pl-1">
                  
                  {/* Icona cuore vuota o piena in magenta se preferito */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(item.id, e)}
                    aria-label={isFav ? `Rimuovi ${item.name} dai preferiti` : `Aggiungi ${item.name} ai preferiti`}
                    className="p-1 text-slate-400 hover:text-[#B81D5B] transition-colors cursor-pointer"
                  >
                    <Heart 
                      style={isFav ? { fill: COLOR_MAGENTA_SCURO, color: COLOR_MAGENTA_SCURO } : undefined}
                      className="w-5 h-5 stroke-[1.8] transition-colors" 
                    />
                  </button>

                  {/* Pulsante circolare magenta/rosa-lampone profondo con freccia bianca (>) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemForDetail(item);
                    }}
                    style={{ backgroundColor: COLOR_MAGENTA_SCURO }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:opacity-90 active:scale-90 text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
                    title={`Scopri dettagli ${item.name}`}
                    aria-label={`Scopri dettagli ${item.name}`}
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALE DETTAGLIO ATTIVITÀ / LUOGO (Design Editoriale iOS)                  */}
      {/* ========================================================================= */}
      {selectedItemForDetail && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItemForDetail(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300"
          >
            {/* Header con foto */}
            <div className="relative h-48 sm:h-56 w-full bg-slate-100 shrink-0">
              <img
                src={selectedItemForDetail.image}
                alt={selectedItemForDetail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              {/* Tasto chiudi */}
              <button
                type="button"
                onClick={() => setSelectedItemForDetail(null)}
                aria-label="Chiudi"
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Titolo e posizione */}
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#B81D5B] text-white px-2 py-0.5 rounded-full mb-1.5 inline-block">
                  {currentConfig.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
                  {selectedItemForDetail.name}
                </h2>
                <p className="text-xs text-slate-200 font-medium mt-0.5">
                  {selectedItemForDetail.address} • {selectedItemForDetail.hours}
                </p>
              </div>
            </div>

            {/* Contenuto scrollabile del modale */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              
              {/* Badge caratteristiche */}
              <div className="flex flex-wrap gap-2">
                {selectedItemForDetail.badgePills.map((b, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1 rounded-full border border-slate-200">
                    {b}
                  </span>
                ))}
                {selectedItemForDetail.price && (
                  <span className="bg-[#FDF2F6] text-[#B81D5B] font-extrabold text-xs px-3 py-1 rounded-full border border-pink-100">
                    {selectedItemForDetail.price}
                  </span>
                )}
              </div>

              {/* Descrizione */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Descrizione
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedItemForDetail.description}
                </p>
              </div>

              {/* Servizi inclusi */}
              {selectedItemForDetail.services && selectedItemForDetail.services.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Caratteristiche e Servizi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedItemForDetail.services.map((srv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-[#B81D5B] shrink-0" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Azioni */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenMapWithPark) {
                      onOpenMapWithPark(selectedItemForDetail.name);
                      setSelectedItemForDetail(null);
                    }
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>Vedi su Mappa</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedItemForDetail(null);
                  }}
                  style={{ backgroundColor: COLOR_MAGENTA_SCURO }}
                  className="flex-1 hover:brightness-110 text-white font-bold text-xs py-3 rounded-full transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Prenota Posto</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
