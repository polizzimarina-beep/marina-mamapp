import React from 'react';
import { CalendarDays, Calendar, Clock, Sparkles, ChevronRight, Check } from 'lucide-react';

interface WeeklyBulletinSectionProps {
  selectedDay: string; // 'all' | 'oggi' | 'domani' | 'venerdi' | 'sabato' | 'domenica' | 'weekend'
  onSelectDay: (day: string) => void;
  totalEventsCount: number;
}

export const WEEK_DAYS = [
  { id: 'all', label: 'Tutti i Giorni', sub: 'Palermo Full', icon: CalendarDays },
  { id: 'oggi', label: 'Oggi', sub: 'Eventi di Oggi', icon: Calendar },
  { id: 'domani', label: 'Domani', sub: 'In Programma', icon: Clock },
  { id: 'venerdi', label: 'Venerdì 15', sub: 'Venerdì Sera', icon: Calendar },
  { id: 'sabato', label: 'Sabato 16', sub: 'Weekend Kids', icon: Sparkles },
  { id: 'domenica', label: 'Domenica 17', sub: 'Famiglia Day', icon: Sparkles },
  { id: 'weekend', label: 'Fine Settimana', sub: 'Sab + Dom', icon: CalendarDays },
];

export const WeeklyBulletinSection: React.FC<WeeklyBulletinSectionProps> = ({
  selectedDay,
  onSelectDay,
  totalEventsCount,
}) => {
  return (
    <div className="mx-4 sm:mx-6 my-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-sky-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Bacheca Settimanale
            </span>
            <span className="bg-white/10 text-sky-200 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
              Palermo Calendar
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <span>Programma per Giorno</span>
          </h2>
          <p className="text-slate-300 text-xs mt-0.5 max-w-xl">
            Scegli un giorno per scoprire le attività in programma a Palermo.
          </p>
        </div>

        {selectedDay !== 'all' && (
          <button
            onClick={() => onSelectDay('all')}
            className="self-start sm:self-center bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Mostra Tutti i Giorni</span>
          </button>
        )}
      </div>

      {/* Days Tabs Horizontal Scroll */}
      <div className="overflow-x-auto scrollbar-none pb-1 relative z-10">
        <div className="flex items-center gap-2.5 min-w-max">
          {WEEK_DAYS.map((day) => {
            const isSelected = selectedDay === day.id;
            const IconComp = day.icon;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(isSelected && day.id !== 'all' ? 'all' : day.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30 scale-105 font-black'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-sky-400/50'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700/60 text-sky-400'}`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block leading-none uppercase tracking-wider">{day.label}</span>
                  <span className={`text-[9px] font-medium block mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    {day.sub}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3] ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
