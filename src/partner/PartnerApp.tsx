import React, { useEffect, useState } from 'react';
import {
  Sun,
  ClipboardList,
  CalendarDays,
  Store,
  BarChart3,
  Wallet,
  Settings,
  MessageCircle,
  Plus,
  MoreHorizontal,
  X,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { MamappLogo } from '../components/MamappLogo';
import { INITIAL_BOOKINGS, INITIAL_EVENTS, PARTNER, Booking, PartnerEvent } from './data';
import {
  Screen,
  OggiScreen,
  PrenotazioniScreen,
  CalendarioScreen,
  VetrinaScreen,
  StatisticheScreen,
  PagamentiScreen
} from './screens';
import { NewEventWizard } from './NewEventWizard';

const NAV: { id: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'oggi', label: 'Oggi', icon: Sun },
  { id: 'prenotazioni', label: 'Prenotazioni', icon: ClipboardList },
  { id: 'calendario', label: 'Calendario ed eventi', icon: CalendarDays },
  { id: 'vetrina', label: 'La mia vetrina', icon: Store },
  { id: 'statistiche', label: 'Statistiche', icon: BarChart3 },
  { id: 'pagamenti', label: 'Pagamenti', icon: Wallet }
];

export const PartnerApp: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('oggi');
  const [events, setEvents] = useState<PartnerEvent[]>(INITIAL_EVENTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen]);

  const pendingCount = bookings.filter((b) => b.status === 'in_attesa').length;

  const setStatus = (id: string, status: Booking['status']) =>
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, status } : b)));

  const onConfirm = (id: string) => {
    const b = bookings.find((x) => x.id === id);
    setStatus(id, 'confermata');
    if (b) {
      setEvents((list) => list.map((e) => (e.id === b.eventId ? { ...e, booked: Math.min(e.capacity, e.booked + b.seats) } : e)));
      setToast(`Prenotazione confermata. ${b.family} riceve l'avviso nell'app.`);
    }
  };
  const onReject = (id: string) => {
    const b = bookings.find((x) => x.id === id);
    setStatus(id, 'rifiutata');
    if (b) setToast(`Richiesta rifiutata. ${b.family} viene rimborsata.`);
  };
  const onCheckIn = (id: string) => {
    setStatus(id, 'presente');
    setToast('Presenza segnata.');
  };

  const onSaveEvent = (ev: PartnerEvent, published: boolean) => {
    setEvents((list) => [...list, ev]);
    setWizardOpen(false);
    setScreen('calendario');
    setToast(published ? `Pubblicato! «${ev.title}» è già visibile nell'app.` : `Bozza salvata: «${ev.title}».`);
  };

  const common = {
    events,
    bookings,
    onConfirm,
    onReject,
    onCheckIn,
    onNewEvent: () => setWizardOpen(true),
    onGo: setScreen
  };

  const go = (s: Screen) => {
    setScreen(s);
    setMoreOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans lg:flex">
      {/* SIDEBAR (computer) */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 bg-slate-50 border-r border-slate-200/80 px-4 py-5">
        <div className="px-2">
          <MamappLogo size="sm" />
          <div className="text-[12px] font-semibold text-petrolio-700 mt-1.5 pl-1">Area partner</div>
        </div>
        <div className="mt-5 mb-4 mx-1 p-3 rounded-xl bg-white border border-slate-200">
          <div className="text-[13.5px] font-bold text-slate-900 truncate">{PARTNER.name}</div>
          <div className="text-[12px] text-slate-500">{PARTNER.type} · {PARTNER.zone}</div>
        </div>
        <nav className="flex flex-col gap-0.5" aria-label="Menu principale">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold cursor-pointer transition-colors ${
                  active ? 'bg-petrolio-600 text-white' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span className="flex-1 text-left">{label}</span>
                {id === 'prenotazioni' && pendingCount > 0 && (
                  <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${active ? 'bg-white text-petrolio-700' : 'bg-brand-600 text-white'}`}>
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <button type="button" onClick={() => setWizardOpen(true)} className="mt-5 mx-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-4 py-2.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Nuovo evento
        </button>
        <div className="mt-auto flex flex-col gap-0.5 border-t border-slate-200 pt-3">
          <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-semibold text-slate-600 hover:bg-white cursor-pointer">
            <Settings className="w-[18px] h-[18px]" /> Impostazioni
          </button>
          <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-semibold text-slate-600 hover:bg-white cursor-pointer">
            <MessageCircle className="w-[18px] h-[18px]" /> Aiuto su WhatsApp
          </button>
        </div>
      </aside>

      {/* INTESTAZIONE (telefono) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <MamappLogo size="sm" />
          <span className="text-[11px] font-bold text-petrolio-700 bg-petrolio-50 rounded-full px-2 py-0.5 whitespace-nowrap">Partner</span>
        </div>
        <button type="button" onClick={() => go('prenotazioni')} className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer" aria-label={`Notifiche: ${pendingCount} richieste da confermare`}>
          <Bell className="w-5 h-5" />
          {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">{pendingCount}</span>}
        </button>
      </header>

      {/* CONTENUTO */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 pt-5 lg:pt-8 pb-28 lg:pb-10 max-w-6xl">
        {screen === 'oggi' && <OggiScreen {...common} />}
        {screen === 'prenotazioni' && <PrenotazioniScreen {...common} />}
        {screen === 'calendario' && <CalendarioScreen {...common} />}
        {screen === 'vetrina' && <VetrinaScreen {...common} onSaved={() => setToast('Vetrina aggiornata: le famiglie vedono già le modifiche.')} />}
        {screen === 'statistiche' && <StatisticheScreen {...common} />}
        {screen === 'pagamenti' && <PagamentiScreen {...common} onUpgrade={() => setToast('Anteprima: qui si attiverà il pagamento del piano Premium.')} />}
      </main>

      {/* BARRA IN BASSO (telefono) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 pt-1.5 pb-[max(8px,env(safe-area-inset-bottom))] grid grid-cols-5" aria-label="Menu principale">
        {([
          ['oggi', 'Oggi', Sun],
          ['prenotazioni', 'Prenotazioni', ClipboardList],
          ['nuovo', 'Nuovo', Plus],
          ['vetrina', 'Vetrina', Store],
          ['altro', 'Altro', MoreHorizontal]
        ] as const).map(([id, label, Icon]) => {
          if (id === 'nuovo') {
            return (
              <button key={id} type="button" onClick={() => setWizardOpen(true)} className="flex flex-col items-center justify-center cursor-pointer" aria-label="Nuovo evento">
                <span className="w-12 h-12 -mt-5 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
                  <Plus className="w-6 h-6" />
                </span>
              </button>
            );
          }
          const active = id === 'altro' ? moreOpen || ['calendario', 'statistiche', 'pagamenti'].includes(screen) : screen === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => (id === 'altro' ? setMoreOpen(true) : go(id))}
              className={`relative flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold cursor-pointer ${active ? 'text-petrolio-700' : 'text-slate-500'}`}
            >
              <Icon className="w-5 h-5" />
              {label}
              {id === 'prenotazioni' && pendingCount > 0 && (
                <span className="absolute top-0 right-[22%] min-w-4 h-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">{pendingCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* FOGLIO "ALTRO" (telefono) */}
      {moreOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 flex items-end" onClick={() => setMoreOpen(false)}>
          <div className="bg-white w-full rounded-t-3xl p-4 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900">Altro</span>
              <button type="button" onClick={() => setMoreOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 cursor-pointer" aria-label="Chiudi">
                <X className="w-5 h-5" />
              </button>
            </div>
            {([
              ['calendario', 'Calendario ed eventi', CalendarDays],
              ['statistiche', 'Statistiche', BarChart3],
              ['pagamenti', 'Pagamenti', Wallet]
            ] as const).map(([id, label, Icon]) => (
              <button key={id} type="button" onClick={() => go(id)} className="w-full flex items-center gap-3 px-2 py-3.5 border-b border-slate-100 text-[15px] font-semibold text-slate-800 cursor-pointer">
                <Icon className="w-5 h-5 text-petrolio-600" /> {label}
              </button>
            ))}
            <button type="button" className="w-full flex items-center gap-3 px-2 py-3.5 border-b border-slate-100 text-[15px] font-semibold text-slate-800 cursor-pointer">
              <Settings className="w-5 h-5 text-petrolio-600" /> Impostazioni
            </button>
            <button type="button" className="w-full flex items-center gap-3 px-2 py-3.5 text-[15px] font-semibold text-slate-800 cursor-pointer">
              <MessageCircle className="w-5 h-5 text-petrolio-600" /> Aiuto su WhatsApp
            </button>
          </div>
        </div>
      )}

      {wizardOpen && <NewEventWizard existing={events.filter((e) => e.status !== 'bozza')} onClose={() => setWizardOpen(false)} onSave={onSaveEvent} />}

      {toast && (
        <div role="status" className="fixed z-[60] inset-x-4 mx-auto w-fit max-w-md bottom-24 lg:bottom-8 bg-slate-900 text-white text-[13.5px] font-semibold rounded-xl px-4 py-3 shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          {toast}
        </div>
      )}
    </div>
  );
};
