import React from 'react';
import { BookingStatus, EventStatus } from './data';

// ---------------------------------------------------------------------------
// Formati in italiano
// ---------------------------------------------------------------------------

const dayFmt = new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });
const dayLongFmt = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
const timeFmt = new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit' });
const eurFmt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export const fmtDay = (d: Date) => dayFmt.format(d);
export const fmtDayLong = (d: Date) => dayLongFmt.format(d);
export const fmtTime = (d: Date) => timeFmt.format(d);
export const fmtEur = (n: number) => eurFmt.format(n);
export const fmtPrice = (n: number) => (n > 0 ? fmtEur(n) : 'Gratis');

export const fmtAgo = (d: Date) => {
  const h = Math.round((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return 'pochi minuti fa';
  if (h < 24) return `${h} ${h === 1 ? 'ora' : 'ore'} fa`;
  const g = Math.round(h / 24);
  return `${g} ${g === 1 ? 'giorno' : 'giorni'} fa`;
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// ---------------------------------------------------------------------------
// Etichette di stato: sempre colore + parola, mai solo colore
// ---------------------------------------------------------------------------

const TONE = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  gray: 'bg-slate-100 text-slate-600 border-slate-200',
  petrolio: 'bg-petrolio-50 text-petrolio-700 border-petrolio-200'
};

export const Chip: React.FC<{ tone: keyof typeof TONE; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11.5px] font-semibold whitespace-nowrap ${TONE[tone]}`}>
    {children}
  </span>
);

export const BookingChip: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const map: Record<BookingStatus, [keyof typeof TONE, string]> = {
    in_attesa: ['amber', 'Da confermare'],
    confermata: ['green', 'Confermata'],
    presente: ['petrolio', 'Presente'],
    annullata: ['gray', 'Annullata'],
    rifiutata: ['red', 'Rifiutata']
  };
  const [tone, label] = map[status];
  return <Chip tone={tone}>{label}</Chip>;
};

export const EventChip: React.FC<{ status: EventStatus }> = ({ status }) => {
  const map: Record<EventStatus, [keyof typeof TONE, string]> = {
    pubblicato: ['green', 'Pubblicato'],
    bozza: ['gray', 'Bozza'],
    esaurito: ['amber', 'Esaurito'],
    concluso: ['petrolio', 'Concluso']
  };
  const [tone, label] = map[status];
  return <Chip tone={tone}>{label}</Chip>;
};

// ---------------------------------------------------------------------------
// Pulsanti: una sola azione rosa per schermata, le altre bianche o petrolio
// ---------------------------------------------------------------------------

export const btnPrimary =
  'inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-4 py-2.5 min-h-[40px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
export const btnSecondary =
  'inline-flex items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm px-4 py-2.5 min-h-[40px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrolio-600';
export const btnLink =
  'inline-flex items-center gap-1 text-petrolio-700 hover:text-petrolio-800 font-semibold text-sm cursor-pointer';

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <section className={`bg-white rounded-2xl border border-slate-200/80 ${className}`}>{children}</section>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex items-end justify-between gap-3 mb-3">
    <div className="min-w-0">
      <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <header className="flex flex-wrap items-end justify-between gap-3 mb-5">
    <div className="min-w-0">
      <h1 className="text-[22px] sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
    {action}
  </header>
);

export const Stat: React.FC<{ label: string; value: string; delta?: string; positive?: boolean }> = ({ label, value, delta, positive = true }) => (
  <Card className="p-4">
    <div className="text-[12.5px] font-semibold text-slate-500">{label}</div>
    <div className="text-[26px] font-bold text-slate-900 mt-1 tabular-nums">{value}</div>
    {delta && (
      <div className={`text-[12px] font-semibold mt-0.5 ${positive ? 'text-emerald-700' : 'text-red-700'}`}>{delta}</div>
    )}
  </Card>
);

export const SeatsBar: React.FC<{ booked: number; capacity: number }> = ({ booked, capacity }) => {
  const pct = Math.min(100, Math.round((booked / Math.max(1, capacity)) * 100));
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full rounded-full ${pct >= 100 ? 'bg-amber-500' : 'bg-petrolio-500'}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[12px] font-semibold text-slate-600 tabular-nums whitespace-nowrap">
        {booked}/{capacity}
      </span>
    </div>
  );
};
