import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, RotateCcw, Sprout, Trees, Leaf, Check } from 'lucide-react';

export interface ParkItem {
  id: string;
  name: string;
  subtitle: string;
  badges: string[];
  iconType?: 'trees' | 'leaf' | 'sprout';
}

export const PALERMO_PARKS: ParkItem[] = [
  {
    id: 'favorita',
    name: 'Parco della Favorita',
    subtitle: 'Monte Pellegrino',
    badges: ['🧺 Area Picnic', '🚲 Piste Ciclabili', '🌲 Natura'],
    iconType: 'trees'
  },
  {
    id: 'uditore',
    name: 'Parco Uditore',
    subtitle: 'Piazza Einstein',
    badges: ['🛝 Area Giochi attrezzata', '🏃‍♀️ Senza auto (Sicuro)', '🐕 Area Cani'],
    iconType: 'sprout'
  },
  {
    id: 'mattarella',
    name: 'Parco Piersanti Mattarella',
    subtitle: 'Giardino Inglese / Politeama',
    badges: ['🎠 Giostrine', '🦆 Laghetto', '🍦 Chioschi'],
    iconType: 'leaf'
  },
  {
    id: 'orto-botanico',
    name: 'Orto Botanico di Palermo',
    subtitle: 'Via Lincoln',
    badges: ['🐢 Vasche con tartarughe', '🌿 Piante rare', '📖 Educativo'],
    iconType: 'sprout'
  },
  {
    id: 'villa-giulia',
    name: 'Villa Giulia & Foro Italico',
    subtitle: 'Lungomare',
    badges: ['🪁 Prato enorme', '⛲ Fontane storiche', '🚲 Passeggino ok'],
    iconType: 'trees'
  },
  {
    id: 'villa-trabia',
    name: 'Villa Trabia',
    subtitle: 'Terre Rosse',
    badges: ['🛝 Area Giochi', '🌳 Molta ombra', '🐟 Vasche con pesci'],
    iconType: 'leaf'
  },
  {
    id: 'parco-orleans',
    name: "Parco d'Orléans",
    subtitle: 'Palazzo dei Normanni',
    badges: ['🦩 Animali (Parco ornitologico)', '🦜 Pappagalli', '🚶‍♂️ Passeggiata'],
    iconType: 'sprout'
  },
  {
    id: 'giardino-zisa',
    name: 'Giardino della Zisa',
    subtitle: 'Piazza Zisa',
    badges: ["💧 Canali d'acqua", '🏰 Vista Castello', '🛹 Aree pavimentate'],
    iconType: 'leaf'
  },
  {
    id: 'villa-garibaldi',
    name: 'Villa Garibaldi',
    subtitle: 'Piazza Marina',
    badges: ['🌳 Ficus gigante', '🧊 Ombra fresca', '🚶‍♀️ Centro storico'],
    iconType: 'trees'
  },
  {
    id: 'villa-bonanno',
    name: 'Villa Bonanno',
    subtitle: 'Piazza della Vittoria',
    badges: ['🌴 Palme monumentali', '🏛️ Rovine storiche', '🚶 Passeggino ok'],
    iconType: 'leaf'
  }
];

interface ParksFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParkIds: string[];
  onApply: (selectedIds: string[]) => void;
}

export const ParksFilterModal: React.FC<ParksFilterModalProps> = ({
  isOpen,
  onClose,
  selectedParkIds,
  onApply
}) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedParkIds);
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronizza selezione interna all'apertura
  useEffect(() => {
    if (isOpen) {
      setInternalSelected(selectedParkIds);
      setSearchQuery('');
    }
  }, [isOpen, selectedParkIds]);

  // Gestione chiusura con tasto ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Toggle selezione singolo parco
  const togglePark = (parkId: string) => {
    setInternalSelected((prev) =>
      prev.includes(parkId) ? prev.filter((id) => id !== parkId) : [...prev, parkId]
    );
  };

  // Azzera selezione
  const handleReset = () => {
    setInternalSelected([]);
  };

  // Applica filtri e chiudi
  const handleConfirm = () => {
    onApply(internalSelected);
    onClose();
  };

  // Filtra parchi in tempo reale
  const filteredParks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return PALERMO_PARKS;
    return PALERMO_PARKS.filter((park) => {
      const matchName = park.name.toLowerCase().includes(query);
      const matchSub = park.subtitle.toLowerCase().includes(query);
      const matchBadges = park.badges.some((b) => b.toLowerCase().includes(query));
      return matchName || matchSub || matchBadges;
    });
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 1. OVERLAY SFONDO SCURO CON SFOCATURA */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. MODALE CONTAINER (Centrato desktop, bottom-sheet mobile) */}
      <div className="fixed inset-0 z-10 pointer-events-none flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="parks-modal-title"
          className="pointer-events-auto w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 border border-slate-100"
        >
          {/* DRAG HANDLE BAR FOR MOBILE */}
          <div className="pt-3 pb-1 flex justify-center sm:hidden">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
          </div>

          {/* 3. HEADER MODALE */}
          <div className="px-5 pt-3 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="parks-modal-title"
                  className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </span>
                  Parchi e Aree Verdi
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Seleziona uno o più parchi storici e giardini di Palermo con attività per famiglie
                </p>
              </div>

              {/* Tasto Chiudi (X) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi finestra"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4. BARRA DI RICERCA INTERNA */}
            <div className="relative mt-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca parco, quartiere o caratteristica (es. picnic, tartarughe)..."
                className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#C2185B] focus:bg-white focus:outline-none rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Cancella ricerca"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 5. LISTA DEI 10 PARCHI SCORREVOLE */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 divide-y divide-transparent">
            {filteredParks.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs sm:text-sm space-y-2">
                <p className="font-semibold">Nessun parco trovato per "{searchQuery}"</p>
                <p className="text-[11px] text-slate-400">Prova a cercare "Favorita", "Zisa", "giochi" o "picnic".</p>
              </div>
            ) : (
              filteredParks.map((park) => {
                const isChecked = internalSelected.includes(park.id);
                return (
                  <label
                    key={park.id}
                    className={`flex items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none gap-3 ${
                      isChecked
                        ? 'border-[#C2185B] bg-pink-50/40 shadow-xs ring-1 ring-[#C2185B]/30'
                        : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    {/* A SINISTRA: BADGE CIRCOLARE VERDE CON ICONA BOTANICA */}
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs mt-0.5 sm:mt-0">
                      {park.iconType === 'trees' ? (
                        <Trees className="w-5 h-5 stroke-[2.2]" />
                      ) : park.iconType === 'leaf' ? (
                        <Leaf className="w-5 h-5 stroke-[2.2]" />
                      ) : (
                        <Sprout className="w-5 h-5 stroke-[2.2]" />
                      )}
                    </div>

                    {/* AL CENTRO: NOME, SOTTOTITOLO E BADGE CARATTERISTICHE */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {park.name}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          ({park.subtitle})
                        </span>
                      </div>

                      {/* RIGA BADGE CARATTERISTICHE */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {park.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium border border-slate-200/60"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* A DESTRA: CHECKBOX CON ACCENTO MAGENTA */}
                    <div className="pt-1 sm:pt-0 shrink-0 flex items-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePark(park.id)}
                        className="w-5 h-5 rounded cursor-pointer accent-[#C2185B] transition-transform hover:scale-110"
                      />
                    </div>
                  </label>
                );
              })
            )}
          </div>

          {/* 6. FOOTER DELLA MODALE */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={internalSelected.length === 0}
              className={`text-xs font-bold transition py-2.5 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer ${
                internalSelected.length > 0
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Azzera selezione</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="bg-[#C2185B] hover:bg-[#A01349] active:scale-95 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>
                {internalSelected.length > 0
                  ? `Applica filtri (${internalSelected.length})`
                  : 'Applica filtri'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
