import React from 'react';
import { ShieldCheck, Star, Calendar, ChevronRight, MapPin, Building2 } from 'lucide-react';
import { OrganizerProfile } from '../types';

interface OrganizersSectionProps {
  organizers: OrganizerProfile[];
  onSelectOrganizer: (organizer: OrganizerProfile) => void;
}

export const OrganizersSection: React.FC<OrganizersSectionProps> = ({
  organizers,
  onSelectOrganizer
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[28px] p-5 sm:p-6 text-white shadow-xl border border-slate-700/80 my-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-sky-400/30 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-sky-400" />
              Club &amp; Organizzatori Accreditati
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1">
            Profili Partner & Calendari Ufficiali
          </h3>
          <p className="text-xs text-slate-300 font-medium">
            Clicca su un organizzatore per esplorare il profilo e la sua programmazione eventi esclusiva
          </p>
        </div>
      </div>

      {/* Horizontal Scrollable Organizer Cards */}
      <div className="flex overflow-x-auto gap-4 pb-2 pt-1 scrollbar-thin scroll-smooth w-full">
        {organizers.map((org) => (
          <div
            key={org.id}
            onClick={() => onSelectOrganizer(org)}
            className="min-w-[260px] sm:min-w-[280px] max-w-[280px] bg-slate-800/90 hover:bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:border-sky-500/50 transition-all duration-200 cursor-pointer group shrink-0"
          >
            <div>
              {/* Cover Banner */}
              <div className="relative h-28 bg-slate-950 overflow-hidden">
                <img
                  src={org.coverImage}
                  alt={org.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Verified Badge */}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-extrabold text-sky-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-sky-400" />
                  <span>Verificato</span>
                </div>

                {/* Floating Logo */}
                <div className="absolute -bottom-4 left-3.5 w-12 h-12 rounded-xl bg-white p-0.5 shadow-lg ring-2 ring-slate-700 overflow-hidden shrink-0">
                  <img
                    src={org.logo}
                    alt={org.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Card Details */}
              <div className="pt-6 px-3.5 pb-3 space-y-1.5">
                <h4 className="font-black text-white text-sm group-hover:text-sky-300 transition-colors line-clamp-1 leading-snug">
                  {org.name}
                </h4>

                <p className="text-[11px] font-bold text-sky-400 truncate">
                  {org.category}
                </p>

                <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{org.address}</span>
                </p>

                <p className="text-[11px] text-slate-300 line-clamp-2 pt-1 font-normal leading-tight">
                  {org.description}
                </p>
              </div>
            </div>

            {/* Bottom Footer Button */}
            <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Vedi Calendario</span>
              </span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
