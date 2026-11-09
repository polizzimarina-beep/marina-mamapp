import React from 'react';
import { Home, MapPin, Calendar, Heart, Ticket } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets';
  onChangeTab: (tab: 'home' | 'explore' | 'planning' | 'favorites' | 'tickets') => void;
  favoritesCount?: number;
  ticketsCount?: number;
  className?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  favoritesCount = 2,
  ticketsCount = 1,
  className = ''
}) => {
  return (
    <nav 
      aria-label="Navigazione principale"
      className={`fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/98 backdrop-blur-md rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.08)] border border-slate-100 px-3 py-1.5 w-[92%] max-w-md ${className}`}
    >
      <div className="flex items-center justify-between gap-1">
        
        {/* 1. Home (con cerchio magenta profondo quando attiva) */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className="flex-1 py-1 px-1 sm:px-2 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer group"
        >
          {activeTab === 'home' ? (
            <div 
              style={{ backgroundColor: '#B81D5B' }}
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
            >
              <Home className="w-4 h-4 text-white stroke-[2.4]" />
            </div>
          ) : (
            <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 flex items-center justify-center text-slate-400 group-hover:text-slate-600">
              <Home className="w-5 h-5 stroke-[1.8]" />
            </div>
          )}
          <span 
            style={{ color: activeTab === 'home' ? '#B81D5B' : undefined }}
            className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'home' ? 'font-bold' : 'text-slate-500 font-medium'}`}
          >
            Home
          </span>
        </button>

        {/* 2. Mappa */}
        <button
          type="button"
          onClick={() => onChangeTab('explore')}
          className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'explore'
              ? 'bg-[#FDF2F6] text-[#B81D5B] font-bold shadow-2xs border border-[#FBCFE8]/80 ring-1 ring-[#B81D5B]/20'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <MapPin 
            className={`w-5 h-5 ${activeTab === 'explore' ? 'stroke-[#B81D5B] fill-[#B81D5B]/20' : 'stroke-current'}`} 
            strokeWidth={activeTab === 'explore' ? 2.2 : 1.8} 
          />
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">Mappa</span>
        </button>

        {/* 3. Calendario */}
        <button
          type="button"
          onClick={() => onChangeTab('planning')}
          className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'planning'
              ? 'bg-[#FDF2F6] text-[#B81D5B] font-bold shadow-2xs border border-[#FBCFE8]/80 ring-1 ring-[#B81D5B]/20'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Calendar 
            className={`w-5 h-5 ${activeTab === 'planning' ? 'stroke-[#B81D5B]' : 'stroke-current'}`} 
            strokeWidth={activeTab === 'planning' ? 2.2 : 1.8} 
          />
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">Calendario</span>
        </button>

        {/* 4. Preferiti (con notifica circolare "2") */}
        <button
          type="button"
          onClick={() => onChangeTab('favorites')}
          className={`flex-1 py-1.5 px-3 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            activeTab === 'favorites'
              ? 'bg-[#FDF2F6] text-[#B81D5B] font-bold shadow-2xs border border-[#FBCFE8]/60'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <div className="relative">
            <Heart 
              className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-[#B81D5B] stroke-[#B81D5B]' : 'stroke-current'}`} 
              strokeWidth={activeTab === 'favorites' ? 2.2 : 1.8} 
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#B81D5B] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">Preferiti</span>
        </button>

        {/* 5. Biglietti (con notifica circolare "1") */}
        <button
          type="button"
          onClick={() => onChangeTab('tickets')}
          className={`flex-1 py-1.5 px-3 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            activeTab === 'tickets'
              ? 'bg-[#FDF2F6] text-[#B81D5B] font-bold shadow-2xs border border-[#FBCFE8]/60'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <div className="relative">
            <Ticket 
              className={`w-5 h-5 ${activeTab === 'tickets' ? 'stroke-[#B81D5B]' : 'stroke-current'}`} 
              strokeWidth={activeTab === 'tickets' ? 2.2 : 1.8} 
            />
            {ticketsCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#B81D5B] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                {ticketsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">Biglietti</span>
        </button>

      </div>
    </nav>
  );
};
