import React, { useMemo, useState } from 'react';
import {
  Check,
  X,
  Clock,
  Users,
  ChevronRight,
  Eye,
  Camera,
  MapPin,
  Phone,
  Mail,
  Download,
  Sparkles,
  CircleCheck,
  Circle,
  UserCheck,
  CalendarDays,
  List
} from 'lucide-react';
import {
  Booking,
  PartnerEvent,
  PARTNER,
  ALL_TAGS,
  WEEKLY_STATS,
  PAYOUTS,
  INVOICES,
  COMMISSION_RATE,
  illustration
} from './data';
import {
  Card,
  PageHeader,
  SectionTitle,
  Stat,
  BookingChip,
  EventChip,
  SeatsBar,
  Chip,
  btnPrimary,
  btnSecondary,
  btnLink,
  fmtDay,
  fmtDayLong,
  fmtTime,
  fmtEur,
  fmtPrice,
  fmtAgo,
  isSameDay
} from './ui';

export type Screen = 'oggi' | 'prenotazioni' | 'calendario' | 'vetrina' | 'statistiche' | 'pagamenti';

interface CommonProps {
  events: PartnerEvent[];
  bookings: Booking[];
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onCheckIn: (id: string) => void;
  onNewEvent: () => void;
  onGo: (s: Screen) => void;
}

const eventOf = (events: PartnerEvent[], id: string) => events.find((e) => e.id === id);

const kidsLabel = (ages: number[]) =>
  `${ages.length} ${ages.length === 1 ? 'bambino' : 'bambini'} (${ages.map((a) => `${a} anni`).join(', ')})`;

// Riga di una richiesta da confermare, con i pulsanti direttamente sulla riga
const RequestRow: React.FC<{ b: Booking; ev?: PartnerEvent; onConfirm: () => void; onReject: () => void }> = ({ b, ev, onConfirm, onReject }) => (
  <li className="flex flex-col sm:flex-row sm:items-center gap-3 py-3.5 border-b border-slate-100 last:border-0">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-slate-900 text-[14.5px]">{b.family}</span>
        <span className="text-[12px] text-slate-400">{fmtAgo(b.createdAt)}</span>
      </div>
      <div className="text-[13px] text-slate-600 mt-0.5">
        {ev?.title} · {ev && `${fmtDay(ev.start)} ore ${fmtTime(ev.start)}`}
      </div>
      <div className="text-[12.5px] text-slate-500 mt-0.5">{kidsLabel(b.childAges)}</div>
    </div>
    <div className="grid grid-cols-2 sm:flex gap-2 shrink-0">
      <button type="button" onClick={onReject} className={btnSecondary}>
        <X className="w-4 h-4" /> Rifiuta
      </button>
      <button type="button" onClick={onConfirm} className={btnPrimary}>
        <Check className="w-4 h-4" /> Conferma
      </button>
    </div>
  </li>
);

// ===========================================================================
// OGGI
// ===========================================================================

export const OggiScreen: React.FC<CommonProps> = ({ events, bookings, onConfirm, onReject, onNewEvent, onGo }) => {
  const today = new Date();
  const pending = bookings.filter((b) => b.status === 'in_attesa');
  const upcoming = events
    .filter((e) => (e.status === 'pubblicato' || e.status === 'esaurito') && e.start >= today)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const todays = upcoming.filter((e) => isSameDay(e.start, today));
  const last = WEEKLY_STATS.at(-1)!;
  const prev = WEEKLY_STATS.at(-2)!;
  const pct = (a: number, b: number) => `${a >= b ? '+' : ''}${Math.round(((a - b) / b) * 100)}% rispetto alla settimana prima`;
  const drafts = events.filter((e) => e.status === 'bozza');

  const checklist = [
    { label: 'Descrizione e foto', done: true },
    { label: 'Orari e contatti', done: true },
    { label: 'Servizi e tag', done: true },
    { label: 'Primo evento pubblicato', done: events.some((e) => e.status !== 'bozza') },
    { label: 'Dati per i pagamenti (IBAN)', done: false }
  ];
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <div>
      <PageHeader
        title={`Ciao ${PARTNER.owner}`}
        subtitle={`${fmtDayLong(today).replace(/^./, (c) => c.toUpperCase())} · ${PARTNER.name}`}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
          {/* Richieste da confermare */}
          <Card className="p-4 sm:p-5">
            <SectionTitle
              title={pending.length ? `Da confermare (${pending.length})` : 'Nessuna richiesta da confermare'}
              subtitle={pending.length ? 'Se non rispondi entro 24 ore la richiesta scade e la famiglia viene rimborsata.' : 'Quando arriva una richiesta te la segnaliamo anche su WhatsApp.'}
            />
            {pending.length > 0 && (
              <ul>
                {pending.map((b) => (
                  <RequestRow key={b.id} b={b} ev={eventOf(events, b.eventId)} onConfirm={() => onConfirm(b.id)} onReject={() => onReject(b.id)} />
                ))}
              </ul>
            )}
          </Card>

          {/* Prossimi eventi */}
          <Card className="p-4 sm:p-5">
            <SectionTitle
              title="Prossimi eventi"
              subtitle={todays.length ? `${todays.length} oggi` : 'Nessun evento oggi'}
              action={
                <button type="button" onClick={() => onGo('calendario')} className={btnLink}>
                  Calendario <ChevronRight className="w-4 h-4" />
                </button>
              }
            />
            <ul className="divide-y divide-slate-100">
              {upcoming.slice(0, 4).map((e) => (
                <li key={e.id} className="flex items-center gap-3 py-3">
                  <img src={illustration(e.illustration)} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px] text-slate-900 truncate">{e.title}</div>
                    <div className="text-[12.5px] text-slate-500">
                      {fmtDay(e.start)} · {fmtTime(e.start)} · {fmtPrice(e.price)}
                    </div>
                  </div>
                  <div className="hidden sm:block w-36">
                    <SeatsBar booked={e.booked} capacity={e.capacity} />
                  </div>
                  <EventChip status={e.status} />
                </li>
              ))}
            </ul>
            {drafts.length > 0 && (
              <p className="text-[13px] text-slate-500 mt-3">
                Hai {drafts.length} {drafts.length === 1 ? 'bozza' : 'bozze'} da completare:{' '}
                <button type="button" className={btnLink} onClick={() => onGo('calendario')}>
                  {drafts.map((d) => d.title).join(', ')}
                </button>
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-5 min-w-0">
          {/* Tre numeri della settimana */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            <Stat label="Visualizzazioni" value={String(last.views)} delta={pct(last.views, prev.views)} />
            <Stat label="Salvati nei preferiti" value={String(last.favorites)} delta={pct(last.favorites, prev.favorites)} />
            <Stat label="Prenotazioni" value={String(last.bookings)} delta={pct(last.bookings, prev.bookings)} />
          </div>

          {/* Completa il profilo */}
          {doneCount < checklist.length && (
            <Card className="p-4 sm:p-5">
              <SectionTitle title="Completa il tuo profilo" subtitle={`${doneCount} di ${checklist.length} passaggi`} />
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-3">
                <div className="h-full bg-petrolio-500 rounded-full" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
              </div>
              <ul className="space-y-2">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-[13.5px]">
                    {c.done ? <CircleCheck className="w-4.5 h-4.5 text-emerald-600" /> : <Circle className="w-4.5 h-4.5 text-slate-300" />}
                    <span className={c.done ? 'text-slate-500' : 'text-slate-900 font-semibold'}>{c.label}</span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => onGo('pagamenti')} className={`${btnSecondary} w-full mt-4`}>
                Aggiungi l'IBAN
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// ===========================================================================
// PRENOTAZIONI
// ===========================================================================

type BookingTab = 'attesa' | 'arrivo' | 'passate';

export const PrenotazioniScreen: React.FC<CommonProps> = ({ events, bookings, onConfirm, onReject, onCheckIn }) => {
  const [tab, setTab] = useState<BookingTab>('attesa');
  const now = new Date();
  const withEvent = bookings
    .map((b) => ({ b, ev: eventOf(events, b.eventId)! }))
    .filter((x) => x.ev)
    .sort((x, y) => x.ev.start.getTime() - y.ev.start.getTime());

  const lists: Record<BookingTab, typeof withEvent> = {
    attesa: withEvent.filter((x) => x.b.status === 'in_attesa'),
    arrivo: withEvent.filter((x) => x.b.status === 'confermata' && x.ev.start >= now),
    passate: withEvent.filter((x) => x.ev.start < now || ['annullata', 'rifiutata', 'presente'].includes(x.b.status))
  };
  const rows = lists[tab];
  const tabs: [BookingTab, string][] = [
    ['attesa', 'Da confermare'],
    ['arrivo', 'In arrivo'],
    ['passate', 'Passate e annullate']
  ];

  const amount = (ev: PartnerEvent, seats: number) => ev.price * seats;

  return (
    <div>
      <PageHeader title="Prenotazioni" subtitle="Tutte le famiglie che hanno prenotato i tuoi eventi." />

      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-full sm:w-fit mb-4 overflow-x-auto no-scrollbar" role="tablist">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              tab === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label} <span className="text-slate-400 font-medium">({lists[id].length})</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-900">Niente da mostrare qui</p>
          <p className="text-sm text-slate-500 mt-1">Le nuove prenotazioni compaiono appena arrivano.</p>
        </Card>
      ) : (
        <>
          {/* Tabella da computer */}
          <Card className="hidden md:block overflow-hidden">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left text-[12px] uppercase tracking-wide text-petrolio-700 bg-petrolio-50/60">
                  <th className="px-4 py-2.5 font-semibold">Data</th>
                  <th className="px-4 py-2.5 font-semibold">Evento</th>
                  <th className="px-4 py-2.5 font-semibold">Famiglia</th>
                  <th className="px-4 py-2.5 font-semibold">Posti</th>
                  <th className="px-4 py-2.5 font-semibold">Stato</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Incasso</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(({ b, ev }) => (
                  <tr key={b.id} className="h-14">
                    <td className="px-4 tabular-nums whitespace-nowrap">
                      {fmtDay(ev.start)} <span className="text-slate-500">{fmtTime(ev.start)}</span>
                    </td>
                    <td className="px-4 font-semibold text-slate-900">{ev.title}</td>
                    <td className="px-4">
                      <div>{b.family}</div>
                      <div className="text-[12px] text-slate-500">{b.childAges.map((a) => `${a} anni`).join(', ')}</div>
                    </td>
                    <td className="px-4 tabular-nums">{b.seats}</td>
                    <td className="px-4"><BookingChip status={b.status} /></td>
                    <td className="px-4 text-right tabular-nums">{fmtPrice(amount(ev, b.seats))}</td>
                    <td className="px-4 text-right whitespace-nowrap">
                      {b.status === 'in_attesa' && (
                        <span className="inline-flex gap-2">
                          <button type="button" className={btnSecondary} onClick={() => onReject(b.id)}>Rifiuta</button>
                          <button type="button" className={btnPrimary} onClick={() => onConfirm(b.id)}>Conferma</button>
                        </span>
                      )}
                      {b.status === 'confermata' && isSameDay(ev.start, now) && (
                        <button type="button" className={btnSecondary} onClick={() => onCheckIn(b.id)}>
                          <UserCheck className="w-4 h-4" /> Segna presente
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Schede da telefono */}
          <ul className="md:hidden flex flex-col gap-3">
            {rows.map(({ b, ev }) => (
              <li key={b.id}>
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900">{b.family}</div>
                      <div className="text-[13px] text-slate-600">{ev.title}</div>
                    </div>
                    <BookingChip status={b.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{fmtDay(ev.start)} {fmtTime(ev.start)}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{kidsLabel(b.childAges)}</span>
                    <span className="tabular-nums">{fmtPrice(amount(ev, b.seats))}</span>
                  </div>
                  {b.status === 'in_attesa' && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button type="button" className={btnSecondary} onClick={() => onReject(b.id)}>Rifiuta</button>
                      <button type="button" className={btnPrimary} onClick={() => onConfirm(b.id)}>Conferma</button>
                    </div>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// ===========================================================================
// CALENDARIO ED EVENTI
// ===========================================================================

export const CalendarioScreen: React.FC<CommonProps> = ({ events, onNewEvent }) => {
  const [view, setView] = useState<'settimana' | 'elenco'>('settimana');
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const offset = (start.getDay() + 6) % 7; // lunedì
  start.setDate(start.getDate() - offset);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div>
      <PageHeader
        title="Calendario ed eventi"
        subtitle="I tuoi laboratori e i posti ancora liberi."
      />
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-4">
        {([['settimana', 'Prossime 2 settimane', CalendarDays], ['elenco', 'Tutti gli eventi', List]] as const).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            aria-pressed={view === id}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer ${
              view === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {view === 'settimana' ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((d) => {
            const dayEvents = events.filter((e) => isSameDay(e.start, d) && e.status !== 'bozza');
            const isToday = isSameDay(d, new Date());
            return (
              <Card key={d.toISOString()} className={`p-2.5 sm:min-h-[104px] ${isToday ? 'border-petrolio-400 ring-1 ring-petrolio-400' : ''} ${!isToday && dayEvents.length === 0 ? 'hidden sm:block' : ''}`}>
                <div className={`text-[12px] font-semibold capitalize ${isToday ? 'text-petrolio-700' : 'text-slate-500'}`}>
                  {isToday ? 'Oggi' : fmtDay(d)}
                </div>
                <div className="flex flex-col gap-1.5 mt-1.5">
                  {isToday && dayEvents.length === 0 && <p className="text-[12.5px] text-slate-400">Nessun evento oggi</p>}
                  {dayEvents.map((e) => (
                    <div key={e.id} className="rounded-lg bg-petrolio-50 border border-petrolio-100 px-2 py-1.5">
                      <div className="text-[12px] font-semibold text-slate-900 leading-tight">{e.title}</div>
                      <div className="text-[11.5px] text-slate-600 tabular-nums">
                        {fmtTime(e.start)} · {e.booked}/{e.capacity} posti
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="divide-y divide-slate-100">
          {sorted.map((e) => (
            <div key={e.id} className="flex items-center gap-3 p-3.5">
              <img src={illustration(e.illustration)} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px] text-slate-900 truncate">{e.title}</div>
                <div className="text-[12.5px] text-slate-500">
                  {fmtDay(e.start)} · {fmtTime(e.start)} · {e.durationMin} min · {fmtPrice(e.price)}
                  {e.payment === 'loco' && ' · acconto in app'}
                </div>
                <div className="sm:hidden mt-1.5"><SeatsBar booked={e.booked} capacity={e.capacity} /></div>
              </div>
              <div className="hidden sm:block w-40"><SeatsBar booked={e.booked} capacity={e.capacity} /></div>
              <div className="hidden md:flex items-center gap-1 text-[12.5px] text-slate-500 w-20 justify-end tabular-nums">
                <Eye className="w-3.5 h-3.5" /> {e.views}
              </div>
              <EventChip status={e.status} />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

// ===========================================================================
// LA MIA VETRINA
// ===========================================================================

export const VetrinaScreen: React.FC<CommonProps & { onSaved: () => void }> = ({ onSaved }) => {
  const [description, setDescription] = useState(PARTNER.description);
  const [tags, setTags] = useState<string[]>(PARTNER.tags);
  const toggle = (t: string) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div>
      <PageHeader
        title="La mia vetrina"
        subtitle="Quello che le famiglie vedono di te nell'app."
        action={
          <button type="button" className={btnPrimary} onClick={onSaved}>
            Salva modifiche
          </button>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5 min-w-0">
          <Card className="p-4 sm:p-5">
            <SectionTitle title="Descrizione" subtitle="Due o tre frasi: cosa fate, per che età, cosa vi rende speciali." />
            <label htmlFor="vetrina-desc" className="sr-only">Descrizione</label>
            <textarea
              id="vetrina-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={400}
              className="w-full rounded-xl border border-slate-200 p-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-petrolio-500/30 focus:border-petrolio-500"
            />
            <div className="text-right text-[12px] text-slate-400 tabular-nums">{description.length}/400</div>
          </Card>

          <Card className="p-4 sm:p-5">
            <SectionTitle title="Foto" subtitle="La prima è la copertina. Bastano 3 foto luminose, con bambini e non adulti." />
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {PARTNER.photos.map((p, i) => (
                <div key={p} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
                  <img src={illustration(p)} alt="" className="w-full h-full object-cover" />
                  {i === 0 && <span className="absolute bottom-1.5 left-1.5"><Chip tone="petrolio">Copertina</Chip></span>}
                </div>
              ))}
              <button type="button" className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-500 hover:border-petrolio-400 hover:text-petrolio-700 cursor-pointer">
                <Camera className="w-6 h-6" />
                <span className="text-[12px] font-semibold">Aggiungi</span>
              </button>
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <SectionTitle title="Servizi e tag" subtitle="Aiutano le mamme a trovarti con i filtri." />
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => {
                const on = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    aria-pressed={on}
                    className={`px-3 py-1.5 rounded-full border text-[13px] font-semibold cursor-pointer transition-colors ${
                      on ? 'bg-petrolio-600 border-petrolio-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {on && <Check className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />}
                    {t}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <SectionTitle title="Orari e contatti" />
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[13.5px]">
              {PARTNER.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-3 border-b border-slate-100 py-1.5">
                  <dt className="text-slate-500">{h.day}</dt>
                  <dd className="font-semibold text-slate-800 text-right">{h.time}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-1.5 mt-4 text-[13.5px] text-slate-700">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-petrolio-600" />{PARTNER.address}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-petrolio-600" />{PARTNER.phone}</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-petrolio-600" />{PARTNER.email}</span>
            </div>
          </Card>
        </div>

        {/* Come ti vedono i genitori */}
        <div className="min-w-0">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-petrolio-700 mb-2">Come ti vedono i genitori</h2>
            <Card className="overflow-hidden">
              <img src={illustration(PARTNER.photos[0])} alt="" className="w-full aspect-[4/3] object-cover" />
              <div className="p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{PARTNER.type}</div>
                <div className="font-bold text-[17px] text-slate-900 mt-0.5">{PARTNER.name}</div>
                <div className="flex items-center gap-1 text-[12.5px] text-slate-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {PARTNER.zone}
                </div>
                <p className="text-[13px] text-slate-600 mt-2 line-clamp-3">{description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-[11.5px] font-semibold text-slate-600">{t}</span>
                  ))}
                  {tags.length > 4 && <span className="text-[11.5px] text-slate-400 self-center">+{tags.length - 4}</span>}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================================================================
// STATISTICHE
// ===========================================================================

const WeeklyChart: React.FC = () => {
  const max = Math.max(...WEEKLY_STATS.map((w) => w.views));
  const W = 640, H = 230, padL = 36, padB = 28, padT = 26;
  const bw = (W - padL - 16) / WEEKLY_STATS.length;
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  const ticks = [0, Math.round(max / 2 / 50) * 50, Math.round(max / 50) * 50];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Visualizzazioni del profilo nelle ultime 8 settimane, in crescita">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - 8} y1={y(t)} y2={y(t)} stroke="#E2E8F0" />
          <text x={padL - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748B">{t}</text>
        </g>
      ))}
      {WEEKLY_STATS.map((w, i) => {
        const x = padL + 8 + i * bw;
        const last = i === WEEKLY_STATS.length - 1;
        return (
          <g key={w.week}>
            <rect x={x} y={y(w.views)} width={bw - 14} height={H - padB - y(w.views)} rx="6" fill={last ? 'var(--color-petrolio-600)' : 'var(--color-petrolio-200)'} />
            {last && <text x={x + (bw - 14) / 2} y={y(w.views) - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">{w.views}</text>}
            <text x={x + (bw - 14) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748B">{w.week}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const StatisticheScreen: React.FC<CommonProps> = ({ events }) => {
  const total = WEEKLY_STATS.reduce(
    (acc, w) => ({ views: acc.views + w.views, favorites: acc.favorites + w.favorites, bookings: acc.bookings + w.bookings }),
    { views: 0, favorites: 0, bookings: 0 }
  );
  const conversion = ((total.bookings / total.views) * 100).toFixed(1).replace('.', ',');
  const top = [...events].filter((e) => e.views > 0).sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div>
      <PageHeader title="Statistiche" subtitle="Ultime 8 settimane." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="Visualizzazioni del profilo" value={total.views.toLocaleString('it-IT')} delta="+28% nelle ultime 4 settimane" />
        <Stat label="Salvati nei preferiti" value={String(total.favorites)} delta="+35% nelle ultime 4 settimane" />
        <Stat label="Prenotazioni" value={String(total.bookings)} delta="+42% nelle ultime 4 settimane" />
        <Stat label="Chi guarda e poi prenota" value={`${conversion}%`} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="p-4 sm:p-5 min-w-0">
          <SectionTitle title="Le famiglie che ti guardano crescono ogni settimana" subtitle="Visualizzazioni del profilo e degli eventi" />
          <WeeklyChart />
        </Card>
        <Card className="p-4 sm:p-5 min-w-0">
          <SectionTitle title="Gli eventi più visti" />
          <ol className="flex flex-col gap-3">
            {top.map((e, i) => (
              <li key={e.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-petrolio-50 text-petrolio-700 text-[12px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold text-slate-900 truncate">{e.title}</div>
                  <div className="text-[12px] text-slate-500 tabular-nums">{e.views} visualizzazioni · {e.booked} prenotati</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-xl bg-brand-50 border border-brand-100 p-3 text-[13px] text-slate-700 flex gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <span>I laboratori del sabato mattina si riempiono prima: prova ad aggiungere una seconda data.</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ===========================================================================
// PAGAMENTI
// ===========================================================================

export const PagamentiScreen: React.FC<CommonProps & { onUpgrade: () => void }> = ({ events, bookings, onUpgrade }) => {
  const rows = useMemo(
    () =>
      bookings
        .filter((b) => b.status === 'confermata' || b.status === 'presente')
        .map((b) => {
          const ev = eventOf(events, b.eventId)!;
          const gross = ev.price * b.seats;
          const commission = Math.round(gross * COMMISSION_RATE * 100) / 100;
          return { b, ev, gross, commission, net: gross - commission };
        }),
    [bookings, events]
  );
  const totals = rows.reduce((a, r) => ({ gross: a.gross + r.gross, commission: a.commission + r.commission, net: a.net + r.net }), { gross: 0, commission: 0, net: 0 });

  return (
    <div>
      <PageHeader title="Pagamenti" subtitle="Incassi, commissioni Mamapp e fatture." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <Stat label="Incassato dalle famiglie" value={fmtEur(totals.gross)} />
        <Stat label={`Commissioni Mamapp (${Math.round(COMMISSION_RATE * 100)}%)`} value={fmtEur(totals.commission)} />
        <Stat label="Il tuo netto" value={fmtEur(totals.net)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5 min-w-0">
          <Card className="overflow-hidden">
            <div className="p-4 sm:p-5 pb-0">
              <SectionTitle title="Commissioni per prenotazione" subtitle="Ogni prenotazione con il dettaglio di quanto resta a te." />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] min-w-[560px]">
                <thead>
                  <tr className="text-left text-[12px] uppercase tracking-wide text-petrolio-700 bg-petrolio-50/60">
                    <th className="px-4 py-2.5 font-semibold">Prenotazione</th>
                    <th className="px-4 py-2.5 font-semibold">Evento</th>
                    <th className="px-4 py-2.5 font-semibold text-right">Pagato</th>
                    <th className="px-4 py-2.5 font-semibold text-right">Commissione</th>
                    <th className="px-4 py-2.5 font-semibold text-right">A te</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r) => (
                    <tr key={r.b.id} className="h-12">
                      <td className="px-4">
                        <div className="font-semibold text-slate-900 tabular-nums">{r.b.code}</div>
                        <div className="text-[12px] text-slate-500">{r.b.family}</div>
                      </td>
                      <td className="px-4">{r.ev.title}</td>
                      <td className="px-4 text-right tabular-nums">{fmtEur(r.gross)}</td>
                      <td className="px-4 text-right tabular-nums text-slate-500">− {fmtEur(r.commission)}</td>
                      <td className="px-4 text-right tabular-nums font-semibold">{fmtEur(r.net)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <SectionTitle title="Bonifici ricevuti" subtitle="Ogni settimana, sull'IBAN indicato nelle impostazioni." />
            <ul className="divide-y divide-slate-100">
              {PAYOUTS.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5 text-[13.5px]">
                  <span>{fmtDay(p.date)} · {p.bookings} prenotazioni</span>
                  <span className="flex items-center gap-3">
                    <Chip tone="green">{p.status}</Chip>
                    <span className="font-semibold tabular-nums">{fmtEur(p.amount)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex flex-col gap-5 min-w-0">
          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-slate-900">Il tuo piano</h2>
              <Chip tone="gray">{PARTNER.plan}</Chip>
            </div>
            <div className="mt-4 rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-slate-900">Vetrina Premium</span>
                <span className="font-bold text-slate-900 tabular-nums">29 € <span className="text-[12px] font-medium text-slate-500">/mese</span></span>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5 text-[13px] text-slate-700">
                {['In evidenza nelle ricerche del tuo quartiere', 'Badge «Verificato Mamapp»', 'Statistiche complete', 'Commissione ridotta al 9%'].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="w-4 h-4 text-petrolio-600 shrink-0 mt-0.5" />{t}</li>
                ))}
              </ul>
              <button type="button" className={`${btnPrimary} w-full mt-4`} onClick={onUpgrade}>
                Attiva Premium
              </button>
              <p className="text-[12px] text-slate-500 mt-2 text-center">Disdici quando vuoi, senza penali.</p>
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <SectionTitle title="Fatture" subtitle="Le fatture delle commissioni, inviate anche allo SdI." />
            <ul className="divide-y divide-slate-100">
              {INVOICES.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-2 py-2.5 text-[13.5px]">
                  <div>
                    <div className="font-semibold text-slate-900">{f.period}</div>
                    <div className="text-[12px] text-slate-500 tabular-nums">{f.number} · {fmtEur(f.amount)}</div>
                  </div>
                  <button type="button" className={btnLink} aria-label={`Scarica fattura ${f.period}`}>
                    <Download className="w-4 h-4" /> PDF
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

