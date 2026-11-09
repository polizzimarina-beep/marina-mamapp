import React, { useState } from 'react';
import { 
  X, 
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
  Users, 
  Clock, 
  Award, 
  ExternalLink,
  Sparkles,
  Filter,
  Building2
} from 'lucide-react';
import { OrganizerProfile, Activity } from '../types';

interface OrganizerProfileModalProps {
  organizer: OrganizerProfile | null;
  isOpen: boolean;
  onClose: () => void;
  organizerActivities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onOpenBooking: (activity: Activity) => void;
}

export const OrganizerProfileModal: React.FC<OrganizerProfileModalProps> = ({
  organizer,
  isOpen,
  onClose,
  organizerActivities,
  onSelectActivity,
  onOpenBooking
}) => {
  if (!isOpen || !organizer) return null;

  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');

  // Months available in activities
  const months = ['all', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  const filteredActivities = (organizerActivities || []).filter(act => {
    if (selectedMonthFilter === 'all') return true;
    return (act.slots || []).some(s => (s.dayOfWeek || '').toLowerCase().includes((selectedMonthFilter || '').toLowerCase()));
  });

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col relative animate-in slide-in-from-bottom duration-300 border border-slate-100 cursor-default"
      >
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer border border-white/20"
          title="Chiudi profilo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Hero Cover Banner */}
          <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
            <img
              src={organizer.coverImage}
              alt={organizer.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

            {/* Top Left Tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-slate-700">
                <Building2 className="w-3.5 h-3.5 text-petrolio-400" />
                <span>Organizzatore Accreditato</span>
              </span>
            </div>

            {/* Logo Avatar Floating Overlay */}
            <div className="absolute -bottom-8 left-6 sm:left-8 z-20 flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-white p-1 shadow-2xl ring-4 ring-white shrink-0 overflow-hidden">
                <img
                  src={organizer.logo}
                  alt={organizer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Organizer Details Header Section */}
          <div className="pt-10 px-6 sm:px-8 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {organizer.name}
                  </h2>
                  {organizer.verified && (
                    <CheckCircle2 className="w-5 h-5 text-petrolio-500 fill-petrolio-100 shrink-0" title="Verificato" />
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-petrolio-600 mt-1 flex items-center gap-2">
                  <span>{organizer.category}</span>
                  <span>•</span>
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {organizer.address} ({organizer.zone})
                  </span>
                </p>
              </div>

              {/* Rating & Review Counter */}
              <div className="bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-2xs">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                <div>
                  <div className="text-sm font-black text-slate-900 leading-none">
                    {organizer.rating} / 5.0
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                    {organizer.reviewCount} recensioni famiglie
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
              {organizer.description}
            </p>

            {/* Badges / Amenities Pills */}
            {organizer.badges && organizer.badges.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap mt-4">
                {organizer.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-extrabold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200/70 flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-petrolio-600" />
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Social Action Buttons */}
            {organizer.instagram && (
              <div className="flex items-center gap-2.5 mt-5">
                <a
                  href={`https://instagram.com/${organizer.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-3.5 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors border border-brand-200 cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-brand-600" />
                  <span>Segui {organizer.instagram}</span>
                </a>
              </div>
            )}
          </div>

          {/* 🗓️ CALENDARIO ED EVENTI ORGANIZZATORE SECTION */}
          <div className="p-6 sm:p-8 space-y-5 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-petrolio-600" />
                  <span>Calendario Eventi & Corsi</span>
                  <span className="text-xs bg-petrolio-100 text-petrolio-800 font-extrabold px-2.5 py-0.5 rounded-full border border-petrolio-200">
                    {filteredActivities.length} attività
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Sfoglia tutti i corsi, lezioni prova e spettacoli offerti da {organizer.name}
                </p>
              </div>

              {/* Month Filter Selector inside Organizer Profile */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonthFilter(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      selectedMonthFilter === m
                        ? 'bg-petrolio-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {m === 'all' ? 'Tutti i Mesi' : m}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Activities for this Organizer */}
            {filteredActivities.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-extrabold text-slate-800 text-sm">Nessun evento in questo mese</h4>
                <p className="text-xs text-slate-500">
                  Prova a selezionare "Tutti i Mesi" per vedere la programmazione completa dell'organizzatore.
                </p>
                <button
                  onClick={() => setSelectedMonthFilter('all')}
                  className="mt-2 text-xs font-black text-petrolio-600 underline cursor-pointer"
                >
                  Mostra Tutti gli Eventi
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredActivities.map((activity) => {
                  const firstSlot = activity.slots[0];
                  return (
                    <div
                      key={activity.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectActivity(activity)}>
                          <img
                            src={activity.image}
                            alt={activity.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-white/20">
                            {activity.targetAudienceLabel}
                          </div>

                          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md text-slate-900 font-black text-xs px-2.5 py-1 rounded-lg shadow-md border border-slate-200">
                            {activity.price === 0 ? (
                              <span className="text-emerald-600">GRATIS</span>
                            ) : (
                              <span>€{activity.price}</span>
                            )}
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="p-4 space-y-2">
                          <h4 
                            onClick={() => onSelectActivity(activity)}
                            className="font-black text-slate-900 text-sm group-hover:text-petrolio-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {activity.title}
                          </h4>

                          <p className="text-xs text-slate-500 font-medium line-clamp-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-petrolio-500 shrink-0" />
                            <span>{activity.venueName} ({activity.zone})</span>
                          </p>

                          {/* Slots count or Next Date */}
                          {firstSlot && (
                            <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-600">
                              <span className="bg-petrolio-50 text-petrolio-800 px-2 py-0.5 rounded-md border border-petrolio-100 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-petrolio-600" />
                                {firstSlot.dayOfWeek.split(' ')[0]} {firstSlot.dayOfWeek.split(' ')[1]}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500">
                                {activity.slots.length} date disponibili
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectActivity(activity)}
                          className="text-xs font-extrabold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          Dettagli
                        </button>

                        <button
                          onClick={() => onOpenBooking(activity)}
                          className="bg-petrolio-600 hover:bg-petrolio-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>Prenota Posto</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
