import React, { useState, useRef } from 'react';
import { 
  Search, 
  User,
  SlidersHorizontal,
  X,
  Users,
  Check,
  Wifi
} from 'lucide-react';
import { FamilyMemberProfile } from '../types';
import { MamappLogo } from './MamappLogo';

interface HeaderProps {
  currentZone?: string;
  onSelectZone?: (zone: string) => void;
  selectedFamilyMember?: FamilyMemberProfile | null;
  familyMembers?: FamilyMemberProfile[];
  onSelectFamilyMember?: (member: FamilyMemberProfile | null) => void;
  onOpenManageFamily?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeTicketsCount?: number;
  onOpenTickets?: () => void;
  activeTab?: string;
  onChangeTab?: (tab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets') => void;
  hasActiveFilters?: boolean;
  activeFiltersCount?: number;
  onOpenFilters?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  [key: string]: any;
}

export const Header: React.FC<HeaderProps> = ({
  selectedFamilyMember = null,
  familyMembers = [],
  onSelectFamilyMember,
  onOpenManageFamily,
  searchQuery = '',
  onSearchChange,
  onChangeTab,
  hasActiveFilters = false,
  activeFiltersCount = 0,
  onOpenFilters
}) => {
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    searchInputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 select-none font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* ========================================================================= */}
        {/* 1. BARRA DI STATO IOS (9:50 a sx, Segnale, Wi-Fi e Batteria a dx)         */}
        {/* ========================================================================= */}
        <div className="pt-2 pb-1.5 flex items-center justify-between text-xs font-semibold text-slate-900 select-none">
          <span className="font-semibold text-xs tracking-tight">9:50</span>
          
          <div className="flex items-center gap-1.5">
            {/* 4 barre segnale cellulare */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-1 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-1.5 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-2 bg-slate-900 rounded-2xs" />
              <span className="w-0.5 h-2.5 bg-slate-900 rounded-2xs" />
            </div>

            {/* Icona Wi-Fi */}
            <Wifi className="w-3.5 h-3.5 stroke-[2.2] text-slate-900" />

            {/* Icona Batteria iOS */}
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 border border-slate-900 rounded-xs p-0.5 flex items-center">
                <div className="w-3 h-full bg-slate-900 rounded-3xs" />
              </div>
              <div className="w-0.5 h-1 bg-slate-900 rounded-r-xs" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 2. INTESTAZIONE SUPERIORE:                                                */}
        {/* - Sinistra: Logo "Mamapp" in turchese/ciano brillante con pin a cuore rosa*/}
        {/* - Destra: Icona preferiti (cuore), carrello con badge numerico e profilo "M"*/}
        {/* ========================================================================= */}
        <div className="h-13 sm:h-14 flex items-center justify-between gap-4">
          
          {/* Logo Mamapp: Watercolor Pin con Sagoma Famiglia + Scritta "Mamapp" con Gradiente Magenta-to-Lilac */}
          <button 
            type="button"
            className="cursor-pointer focus:outline-none flex items-center text-left active:scale-98 transition-transform group" 
            onClick={() => {
              if (onChangeTab) onChangeTab('home');
              if (onSelectFamilyMember) onSelectFamilyMember(null);
            }}
            title="Mamapp Home"
            aria-label="Mamapp Home"
          >
            <MamappLogo size="md" layout="horizontal" />
          </button>

          {/* ========================================================================= */}
          {/* A DESTRA (IN LINEA): TRE ICONE MINIMALISTE DISPOSTE IN SEQUENZA ESATTA:   */}
          {/* 1. Icona della lente d'ingrandimento (ricerca)                            */}
          {/* 2. Icona dei filtri (impostazioni/imbuto)                                 */}
          {/* 3. Icona dell'omino/profilo account circolare (profilo utente)            */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* 1. Icona della lente d'ingrandimento (ricerca) */}
            <button
              type="button"
              onClick={handleSearchIconClick}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-[var(--color-brand-600)] hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
              title="Cerca attività"
              aria-label="Cerca attività"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* 2. Icona dei filtri (impostazioni/imbuto) */}
            <button
              type="button"
              onClick={() => onOpenFilters?.()}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-[var(--color-brand-600)] hover:bg-slate-50 transition-all cursor-pointer relative active:scale-95"
              title="Filtri attività"
              aria-label="Filtri attività"
            >
              <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
              {hasActiveFilters && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-brand-600)] ring-2 ring-white" />
              )}
            </button>

            {/* 3. Icona dell'omino/profilo account circolare (profilo utente) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                className="w-9 h-9 rounded-full bg-[#FDF2F6] border border-[var(--color-brand-200)] text-[var(--color-brand-600)] flex items-center justify-center shadow-2xs hover:bg-[var(--color-brand-50)] transition-colors cursor-pointer group active:scale-95"
                title="Profilo Utente"
                aria-label="Profilo Utente"
              >
                <User className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>

              {/* Dropdown gestione profili */}
              {showMemberDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-[var(--color-brand-600)] uppercase tracking-wider">
                        Profilo Famiglia
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        {selectedFamilyMember ? selectedFamilyMember.name : 'Tutta la Famiglia'}
                      </div>
                    </div>
                    {familyMembers.length > 0 && (
                      <span className="bg-[#FDF2F6] text-[var(--color-brand-600)] text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-100">
                        {familyMembers.length} membri
                      </span>
                    )}
                  </div>

                  <div className="py-2 px-1.5 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectFamilyMember) onSelectFamilyMember(null);
                        setShowMemberDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        !selectedFamilyMember ? 'bg-[#FDF2F6] text-[var(--color-brand-600)] font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[var(--color-brand-600)]" />
                        <span>Mostra per tutta la famiglia</span>
                      </div>
                      {!selectedFamilyMember && <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />}
                    </button>

                    {familyMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => {
                          if (onSelectFamilyMember) onSelectFamilyMember(member);
                          setShowMemberDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          selectedFamilyMember?.id === member.id ? 'bg-[#FDF2F6] text-[var(--color-brand-600)] font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-[var(--color-brand-600)] font-bold text-[10px] flex items-center justify-center">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                          <span>{member.name}</span>
                          <span className="text-[10px] text-slate-400">({member.age} anni)</span>
                        </div>
                        {selectedFamilyMember?.id === member.id && (
                          <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 px-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMemberDropdown(false);
                        if (onOpenManageFamily) onOpenManageFamily();
                      }}
                      className="text-xs font-bold text-[var(--color-brand-600)] hover:underline cursor-pointer"
                    >
                      + Gestisci profili
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMemberDropdown(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BARRA DI RICERCA BIANCA CON BORDI SOTTILI                              */}
        {/* "Cerca attività, categoria o luogo a Palermo..."                          */}
        {/* ========================================================================= */}
        <div className="pb-3 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.2]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Cerca attività, categoria o luogo a Palermo..."
              className="w-full bg-white border border-slate-200/90 rounded-2xl py-2 sm:py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)]/15 focus:border-[var(--color-brand-600)] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
