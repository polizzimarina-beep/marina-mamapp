import React from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Check, 
  RotateCcw, 
  Baby, 
  Clock, 
  MapPin, 
  Palette,
  SlidersHorizontal,
  Milk,
  Footprints,
  Smile,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';

export type FilterCategoryTab = 'all' | 'eta' | 'attivita' | 'zona' | 'fascia';

interface MobileFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategoryTab: FilterCategoryTab;
  onChangeCategoryTab: (tab: FilterCategoryTab) => void;
  
  // Selected filter states
  selectedAgeGroups: string[];
  onToggleAgeGroup: (id: string) => void;
  
  selectedActivities: string[];
  onToggleActivity: (act: string) => void;
  
  selectedZones: string[];
  onToggleZone: (zone: string) => void;
  
  selectedTimeSlots: string[];
  onToggleTimeSlot: (slot: string) => void;

  onlyFree?: boolean;
  onToggleFree?: () => void;
  
  onResetFilters: () => void;
  hasActiveFilters?: boolean;
  filteredCount?: number;
}

// Palette di Brand: Soft Teal (var(--color-petrolio-600)) per azioni primarie, Warm Coral (#FF6B6B) per accenti numerici
const COLOR_TEAL = 'var(--color-petrolio-600)';
const COLOR_TEAL_HOVER = 'var(--color-petrolio-600)';
const COLOR_TEAL_TINT = 'var(--color-petrolio-50)';
const COLOR_TEAL_BORDER = 'var(--color-petrolio-200)';
const COLOR_CORAL = '#FF6B6B';

export const MobileFilterBottomSheet: React.FC<MobileFilterBottomSheetProps> = ({
  isOpen,
  onClose,
  activeCategoryTab,
  onChangeCategoryTab,
  selectedAgeGroups = ['1-3 anni'],
  onToggleAgeGroup,
  selectedActivities = [],
  onToggleActivity,
  selectedZones = [],
  onToggleZone,
  selectedTimeSlots = [],
  onToggleTimeSlot,
  onlyFree = false,
  onToggleFree,
  onResetFilters,
  hasActiveFilters: externalHasActiveFilters,
  filteredCount
}) => {
  if (!isOpen) return null;

  // Fasce d'età con icone minimaliste
  const ageOptions = [
    { 
      id: '0-12 mesi', 
      label: '0-12 mesi', 
      desc: 'Prima infanzia e culla',
      icon: Milk 
    },
    { 
      id: '1-3 anni', 
      label: '1-3 anni', 
      desc: 'Primi passi e baby ludoteche',
      icon: Footprints 
    },
    { 
      id: '4-6 anni', 
      label: '4-6 anni', 
      desc: 'Scuola dell\'infanzia e parchi',
      icon: Smile 
    },
    { 
      id: '7-10 anni', 
      label: '7-10 anni', 
      desc: 'Scuola primaria e laboratori',
      icon: BookOpen 
    },
    { 
      id: '10+ anni', 
      label: '10+ anni', 
      desc: 'Ragazzi e pre-adolescenti',
      icon: Sparkles 
    }
  ];

  const activityOptions = [
    { id: 'Laboratori creativi', label: 'Laboratori creativi', desc: 'Pittura, ceramica, arte manuale' },
    { id: 'Parchi & Natura', label: 'Parchi & Natura', desc: 'Aree verdi, boschi ed escursioni' },
    { id: 'Acqua / Nuoto', label: 'Acqua / Nuoto', desc: 'Acquaticità e corsi nuoto baby' },
    { id: 'Al chiuso / Spazi', label: 'Al chiuso / Spazi', desc: 'Ludoteche e spazi coperti' },
    { id: 'Calcio / Sport', label: 'Calcio / Sport', desc: 'Scuole calcio e motricità' },
    { id: 'Danza / Movimento', label: 'Danza / Movimento', desc: 'Ginnastica posturale e danza' },
    { id: 'Musica / Canto', label: 'Musica / Canto', desc: 'Propedeutica e strumenti' },
    { id: 'Teatro / Circo', label: 'Teatro / Circo', desc: 'Acrobatica e spettacoli' }
  ];

  const zoneOptions = [
    { id: 'Centro / Politeama', label: 'Centro / Politeama', desc: 'Politeama, Massimo, Kalsa, Libertà' },
    { id: 'Mondello / Mare', label: 'Mondello / Mare', desc: 'Spiaggia, Addaura, Sferracavallo' },
    { id: 'Zona Nord', label: 'Zona Nord', desc: 'Favorita, San Lorenzo, Resuttana' },
    { id: 'Zona Sud', label: 'Zona Sud', desc: 'Oreto, Brancaccio, Kalsa marina' },
    { id: 'Fuori porta', label: 'Fuori porta', desc: 'Monreale, Bagheria, Altofonte' }
  ];

  const timeSlotOptions = [
    { id: 'Mattina', label: 'Mattina', range: '08:00 - 13:00', desc: 'Attività del mattino' },
    { id: 'Pomeriggio', label: 'Pomeriggio', range: '14:00 - 19:00', desc: 'Doposcuola e corsi pomeridiani' },
    { id: 'Sera', label: 'Sera', range: '19:00 - 22:30', desc: 'Spettacoli ed eventi serali' },
    { id: 'Intera giornata', label: 'Intera giornata', range: 'Tutto il giorno', desc: 'Gite ed eventi prolungati' }
  ];

  // Helper count badges
  const etaCount = selectedAgeGroups.length;
  const attivitaCount = selectedActivities.length;
  const zonaCount = selectedZones.length;
  const fasciaCount = selectedTimeSlots.length;
  const totalActiveFiltersCount = etaCount + attivitaCount + zonaCount + fasciaCount + (onlyFree ? 1 : 0);
  const hasActiveFilters = externalHasActiveFilters !== undefined ? externalHasActiveFilters : totalActiveFiltersCount > 0;

  // Il conteggio in evidenza: se passato usalo, altrimenti default 27 come da mockup
  const displayActivitiesCount = filteredCount !== undefined && filteredCount > 0 ? filteredCount : 27;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col justify-end font-sans select-none">
      
      {/* 1. Backdrop con sfocatura elegante sullo sfondo dell'app per famiglie */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-md transition-opacity cursor-pointer animate-in fade-in duration-200"
        aria-label="Chiudi filtri"
      />

      {/* 2. Modale Bottom-Sheet: Bianco Pristino con morbidi angoli arrotondati in stile iOS */}
      <div 
        className="relative z-10 bg-white rounded-t-[32px] sm:rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.12)] flex flex-col w-full h-[76vh] max-h-[78vh] min-h-[58vh] overflow-hidden border-t border-slate-100 animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Filtri di Ricerca"
      >
        
        {/* Maniglia superiore sottile per lo swipe/chiusura in stile iOS */}
        <div className="pt-3 pb-1 flex justify-center shrink-0 bg-white">
          <div 
            className="w-10 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full cursor-pointer transition-colors" 
            onClick={onClose} 
            title="Chiudi pannello filtri"
          />
        </div>

        {/* ========================================================================= */}
        {/* INTESTAZIONE: Titolo e Sottotitolo Humanistic Sans-Serif + Close X Soft Teal*/}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-6 py-3 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                Filtri di Ricerca
              </h3>
              {hasActiveFilters && (
                <span 
                  style={{ backgroundColor: COLOR_TEAL_TINT, color: COLOR_TEAL }}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-[var(--color-petrolio-600)]/20"
                >
                  {totalActiveFiltersCount} attivi
                </span>
              )}
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-1">
              Personalizza le attività e le esperienze a Palermo
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Top-right close (X) icon in pulito soft teal */}
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: COLOR_TEAL_TINT, color: COLOR_TEAL }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border border-[var(--color-petrolio-600)]/25 hover:bg-[var(--color-petrolio-100)] active:scale-95 shadow-2xs"
              title="Chiudi"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILTER TABS ROW: Tutti i Filtri, Età (Attivo Soft Teal), Attività, Zona, Fascia*/}
        {/* Con piccole icone minimaliste su ogni tab                                 */}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-6 py-3 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          
          {/* 1. Tutti i Filtri */}
          <button
            type="button"
            onClick={() => onChangeCategoryTab('all')}
            style={activeCategoryTab === 'all' ? { backgroundColor: COLOR_TEAL } : undefined}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategoryTab === 'all'
                ? 'text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
            <span>Tutti i Filtri</span>
          </button>

          {/* 2. Età (Tab Attiva con sfondo Soft Teal, testo bianco e minuscola icona età) */}
          <button
            type="button"
            onClick={() => onChangeCategoryTab('eta')}
            style={activeCategoryTab === 'eta' ? { backgroundColor: COLOR_TEAL } : undefined}
            className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategoryTab === 'eta'
                ? 'text-white font-bold shadow-xs'
                : etaCount > 0
                ? 'bg-[var(--color-petrolio-50)] text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-600)]/40 font-bold'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 font-semibold'
            }`}
          >
            <Baby className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Età</span>
            {etaCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeCategoryTab === 'eta' ? 'bg-white text-[var(--color-petrolio-600)]' : 'bg-[var(--color-petrolio-600)] text-white'
              }`}>
                {etaCount}
              </span>
            )}
          </button>

          {/* 3. Attività */}
          <button
            type="button"
            onClick={() => onChangeCategoryTab('attivita')}
            style={activeCategoryTab === 'attivita' ? { backgroundColor: COLOR_TEAL } : undefined}
            className={`px-3.5 py-2 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategoryTab === 'attivita'
                ? 'text-white font-bold shadow-xs'
                : attivitaCount > 0
                ? 'bg-[var(--color-petrolio-50)] text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-600)]/40 font-bold'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 font-semibold'
            }`}
          >
            <Palette className="w-3.5 h-3.5 stroke-[2]" />
            <span>Attività</span>
            {attivitaCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeCategoryTab === 'attivita' ? 'bg-white text-[var(--color-petrolio-600)]' : 'bg-[var(--color-petrolio-600)] text-white'
              }`}>
                {attivitaCount}
              </span>
            )}
          </button>

          {/* 4. Zona */}
          <button
            type="button"
            onClick={() => onChangeCategoryTab('zona')}
            style={activeCategoryTab === 'zona' ? { backgroundColor: COLOR_TEAL } : undefined}
            className={`px-3.5 py-2 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategoryTab === 'zona'
                ? 'text-white font-bold shadow-xs'
                : zonaCount > 0
                ? 'bg-[var(--color-petrolio-50)] text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-600)]/40 font-bold'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 font-semibold'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 stroke-[2]" />
            <span>Zona</span>
            {zonaCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeCategoryTab === 'zona' ? 'bg-white text-[var(--color-petrolio-600)]' : 'bg-[var(--color-petrolio-600)] text-white'
              }`}>
                {zonaCount}
              </span>
            )}
          </button>

          {/* 5. Fascia Oraria */}
          <button
            type="button"
            onClick={() => onChangeCategoryTab('fascia')}
            style={activeCategoryTab === 'fascia' ? { backgroundColor: COLOR_TEAL } : undefined}
            className={`px-3.5 py-2 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategoryTab === 'fascia'
                ? 'text-white font-bold shadow-xs'
                : fasciaCount > 0
                ? 'bg-[var(--color-petrolio-50)] text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-600)]/40 font-bold'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 font-semibold'
            }`}
          >
            <Clock className="w-3.5 h-3.5 stroke-[2]" />
            <span>Fascia Oraria</span>
            {fasciaCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeCategoryTab === 'fascia' ? 'bg-white text-[var(--color-petrolio-600)]' : 'bg-[var(--color-petrolio-600)] text-white'
              }`}>
                {fasciaCount}
              </span>
            )}
          </button>

        </div>

        {/* ========================================================================= */}
        {/* CORPO DEI FILTRI                                                          */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0 bg-white">

          {/* OPTIONS AREA: "Solo Eventi Gratuiti" toggle switch (Teal when on) */}
          {onToggleFree && (activeCategoryTab === 'all' || activeCategoryTab === 'attivita') && (
            <div 
              onClick={onToggleFree}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                onlyFree 
                  ? 'bg-[var(--color-petrolio-50)] border-[var(--color-petrolio-600)] ring-1 ring-[var(--color-petrolio-600)]/30' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Solo Eventi Gratuiti</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Mostra solo attività ad accesso libero o gratuite</div>
              </div>
              
              {/* Switch iOS Teal quando ON */}
              <div 
                style={{ backgroundColor: onlyFree ? COLOR_TEAL : '#E2E8F0' }}
                className="w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center shrink-0"
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    onlyFree ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </div>
            </div>
          )}
          
          {/* ======================================================================= */}
          {/* SEZIONE FASCE D'ETÀ: Grid di card interattive con angoli arrotondati,   */}
          {/* icona minimalista, titolo, descrizione e checkmark.                     */}
          {/* "1-3 anni" è ATTIVA con sfondo Soft Teal, testo bianco e checkmark bianco*/}
          {/* ======================================================================= */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'eta') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  FASCE D'ETÀ
                </span>
                {etaCount > 0 && (
                  <span style={{ color: COLOR_TEAL }} className="text-xs font-bold">
                    {etaCount} {etaCount === 1 ? 'selezionata' : 'selezionate'}
                  </span>
                )}
              </div>

              {/* Grid di Card Fasce d'Età */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ageOptions.map((opt) => {
                  const isChecked = selectedAgeGroups.includes(opt.id);
                  const Icon = opt.icon;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => onToggleAgeGroup(opt.id)}
                      style={
                        isChecked 
                          ? { 
                              backgroundColor: COLOR_TEAL,
                              borderColor: COLOR_TEAL,
                              boxShadow: '0 4px 14px rgba(0, 168, 181, 0.28)'
                            } 
                          : undefined
                      }
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                        isChecked
                          ? 'text-white'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      {/* Icona + Testo */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Icona minimalista della fascia d'età */}
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isChecked 
                              ? 'bg-white/20 text-white' 
                              : 'bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-[var(--color-petrolio-50)] group-hover:text-[var(--color-petrolio-600)]'
                          }`}
                        >
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>

                        {/* Titolo e descrizione fedele all'originale */}
                        <div className="truncate">
                          <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'text-white' : 'text-slate-900'}`}>
                            {opt.label}
                          </span>
                          <span className={`text-[11px] block truncate mt-0.5 ${isChecked ? 'text-white/90 font-medium' : 'text-slate-500 font-normal'}`}>
                            {opt.desc}
                          </span>
                        </div>
                      </div>

                      {/* Icona Checkmark: Cerchio bianco con check teal quando attivo, cornice grigio chiaro quando inattivo */}
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isChecked 
                            ? 'bg-white text-[var(--color-petrolio-600)] shadow-xs font-bold' 
                            : 'border-2 border-slate-300 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEZIONE 2: TIPOLOGIA ATTIVITÀ */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'attivita') && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  TIPOLOGIA ATTIVITÀ
                </span>
                {attivitaCount > 0 && (
                  <span style={{ color: COLOR_TEAL }} className="text-xs font-bold">
                    {attivitaCount} selezionate
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activityOptions.map((opt) => {
                  const isChecked = selectedActivities.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => onToggleActivity(opt.id)}
                      style={
                        isChecked 
                          ? { 
                              backgroundColor: COLOR_TEAL_TINT,
                              borderColor: COLOR_TEAL 
                            } 
                          : undefined
                      }
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'ring-1 ring-[var(--color-petrolio-600)]/30 shadow-2xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className={`text-xs sm:text-sm font-bold block truncate ${isChecked ? 'text-[var(--color-petrolio-600)]' : 'text-slate-900'}`}>
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal block truncate mt-0.5">
                          {opt.desc}
                        </span>
                      </div>
                      
                      <div 
                        style={isChecked ? { backgroundColor: COLOR_TEAL, borderColor: COLOR_TEAL } : undefined}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isChecked ? 'text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEZIONE 3: ZONA A PALERMO */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'zona') && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  ZONA A PALERMO
                </span>
                {zonaCount > 0 && (
                  <span style={{ color: COLOR_TEAL }} className="text-xs font-bold">
                    {zonaCount} selezionate
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {zoneOptions.map((opt) => {
                  const isChecked = selectedZones.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => onToggleZone(opt.id)}
                      style={
                        isChecked 
                          ? { 
                              backgroundColor: COLOR_TEAL_TINT,
                              borderColor: COLOR_TEAL 
                            } 
                          : undefined
                      }
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'ring-1 ring-[var(--color-petrolio-600)]/30 shadow-2xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-[var(--color-petrolio-600)]' : 'text-slate-900'}`}>
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">{opt.desc}</div>
                      </div>

                      <div 
                        style={isChecked ? { backgroundColor: COLOR_TEAL, borderColor: COLOR_TEAL } : undefined}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isChecked ? 'text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEZIONE 4: FASCIA ORARIA */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'fascia') && (
            <div className="space-y-3 pt-1 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  FASCIA ORARIA
                </span>
                {fasciaCount > 0 && (
                  <span style={{ color: COLOR_TEAL }} className="text-xs font-bold">
                    {fasciaCount} selezionate
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {timeSlotOptions.map((opt) => {
                  const isChecked = selectedTimeSlots.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => onToggleTimeSlot(opt.id)}
                      style={
                        isChecked 
                          ? { 
                              backgroundColor: COLOR_TEAL_TINT,
                              borderColor: COLOR_TEAL 
                            } 
                          : undefined
                      }
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'ring-1 ring-[var(--color-petrolio-600)]/30 shadow-2xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-[var(--color-petrolio-600)]' : 'text-slate-900'}`}>
                          {opt.label}
                        </span>
                        <div 
                          style={isChecked ? { backgroundColor: COLOR_TEAL, borderColor: COLOR_TEAL } : undefined}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal">{opt.range}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ACTION BAR:                                                         */}
        {/* Sinistra: Link Soft Teal "Resetta tutto"                                   */}
        {/* Destra: Pulsante Soft Teal "Applica Filtri" con circoletto Coral "27"       */}
        {/*         e scritta "attività" sotto o a fianco per massima evidenza         */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between gap-4 shrink-0 shadow-[0_-6px_25px_rgba(0,0,0,0.04)] z-20 pb-7 sm:pb-5">
          
          {/* Link Soft Teal a sinistra: "Resetta tutto" */}
          <button
            type="button"
            onClick={onResetFilters}
            style={{ color: COLOR_TEAL }}
            className="px-2 py-3 text-xs sm:text-sm font-bold hover:underline transition-all cursor-pointer shrink-0"
          >
            Resetta tutto
          </button>

          {/* Main Action Button "Applica Filtri" in Soft Teal con badge Coral "27 attività" */}
          <button
            type="button"
            onClick={onClose}
            style={{ 
              backgroundColor: COLOR_TEAL,
              boxShadow: '0 6px 20px rgba(0, 168, 181, 0.32)' 
            }}
            className="flex-1 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm py-3 px-5 sm:px-6 rounded-full transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3"
          >
            <span className="tracking-tight text-sm sm:text-base">Applica Filtri</span>
            
            {/* Badge circolare Coral con conteggio ben evidente */}
            <div className="flex items-center gap-1.5 pl-1 border-l border-white/25">
              <span 
                style={{ backgroundColor: COLOR_CORAL }}
                className="w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center shadow-xs ring-2 ring-white/30"
              >
                {displayActivitiesCount}
              </span>
              <span className="text-[11px] font-semibold text-white/95 leading-none">
                attività
              </span>
            </div>
          </button>

        </div>

      </div>
    </div>,
    document.body
  );
};
