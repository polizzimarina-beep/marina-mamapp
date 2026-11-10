import React, { useState } from 'react';
import { X, ChevronLeft, Minus, Plus, Copy, Palette, Ticket, Clock3, MapPin, Check } from 'lucide-react';
import { PartnerEvent, PARTNER, COMMISSION_RATE, illustration } from './data';
import { IllustrazioneId } from '../data/illustrazioni';
import { btnPrimary, btnSecondary, fmtEur, fmtDay, fmtTime, fmtPrice } from './ui';

/*
 * Flusso "Nuovo evento" in 3 passi (Cosa · Quando e quanti · Prezzo e prenotazione)
 * + anteprima. Solo 6 campi obbligatori; tutto il resto ha già un valore.
 */

type Kind = 'laboratorio' | 'spettacolo' | 'turni';
type Step = 'tipo' | 1 | 2 | 3 | 'anteprima';

const AGES = ['0-3', '3-6', '6-10', '10+'];
const EXTRA_TAGS = ['Materiali inclusi', 'Genitore presente', 'Al coperto', "All'aperto"];
const PHOTOS: IllustrazioneId[] = ['creativi', 'ludoteca', 'teatro', 'musica', 'parchi', 'mare'];
const DURATIONS = [60, 90, 120];

const tomorrowIso = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

const Field: React.FC<{ label: string; hint?: string; error?: string; htmlFor?: string; children: React.ReactNode }> = ({ label, hint, error, htmlFor, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="text-[13.5px] font-semibold text-slate-900">
      {label}
    </label>
    {children}
    {error ? <p className="text-[12.5px] font-semibold text-red-700">{error}</p> : hint ? <p className="text-[12.5px] text-slate-500">{hint}</p> : null}
  </div>
);

const inputCls =
  'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-[15px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-petrolio-500/30 focus:border-petrolio-500';

const Pill: React.FC<{ on: boolean; onClick: () => void; children: React.ReactNode }> = ({ on, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    className={`px-3.5 py-2 rounded-xl border text-[13.5px] font-semibold cursor-pointer min-h-[40px] transition-colors ${
      on ? 'bg-petrolio-600 border-petrolio-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
    }`}
  >
    {children}
  </button>
);

export const NewEventWizard: React.FC<{
  existing: PartnerEvent[];
  onClose: () => void;
  onSave: (ev: PartnerEvent, published: boolean) => void;
}> = ({ existing, onClose, onSave }) => {
  const [step, setStep] = useState<Step>('tipo');
  const [kind, setKind] = useState<Kind>('laboratorio');
  const [showErrors, setShowErrors] = useState(false);

  // Passo 1 · Cosa
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState<IllustrazioneId>('creativi');
  const [ages, setAges] = useState<string[]>(['3-6']);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['Materiali inclusi']);
  // Passo 2 · Quando e quanti
  const [date, setDate] = useState(tomorrowIso());
  const [time, setTime] = useState('16:30');
  const [duration, setDuration] = useState(60);
  const [repeat, setRepeat] = useState<'no' | 'settimana'>('no');
  const [seats, setSeats] = useState(12);
  const [waitlist, setWaitlist] = useState(true);
  // Passo 3 · Prezzo e prenotazione
  const [price, setPrice] = useState('12');
  const [free, setFree] = useState(false);
  const [payment, setPayment] = useState<'app' | 'loco'>('app');
  const [approval, setApproval] = useState<'automatica' | 'manuale'>('automatica');
  const [cancelHours, setCancelHours] = useState(24);

  const priceNum = free ? 0 : Math.max(0, Number(price.replace(',', '.')) || 0);
  const commission = Math.round(priceNum * COMMISSION_RATE * 100) / 100;
  const net = priceNum - commission;

  const errors: Record<string, string> = {};
  if (!title.trim()) errors.title = 'Scrivi il titolo del laboratorio';
  if (!date) errors.date = 'Scegli la data';
  if (!time) errors.time = "Manca l'orario di inizio";
  if (seats < 1) errors.seats = 'Servono almeno 1 posto';
  if (!free && priceNum <= 0) errors.price = 'Inserisci il prezzo o scegli «Gratis»';
  const stepErrors = (s: Step) =>
    s === 1 ? ['title'] : s === 2 ? ['date', 'time', 'seats'] : s === 3 ? ['price'] : [];

  const next = () => {
    const has = stepErrors(step).some((k) => errors[k]);
    if (has) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep(step === 1 ? 2 : step === 2 ? 3 : step === 3 ? 'anteprima' : step);
  };
  const back = () => setStep(step === 2 ? 1 : step === 3 ? 2 : step === 'anteprima' ? 3 : step === 1 ? 'tipo' : step);
  const err = (k: string) => (showErrors ? errors[k] : undefined);

  const build = (): PartnerEvent => {
    const [h, m] = time.split(':').map(Number);
    const start = new Date(`${date}T00:00:00`);
    start.setHours(h || 0, m || 0, 0, 0);
    return {
      id: `ev-${Date.now()}`,
      title: title.trim() || 'Nuovo evento',
      illustration: photo,
      description: description.trim(),
      ages,
      tags,
      start,
      durationMin: duration,
      capacity: seats,
      booked: 0,
      price: priceNum,
      payment,
      approval,
      cancelHours,
      status: 'pubblicato',
      views: 0
    };
  };

  const duplicate = (ev: PartnerEvent) => {
    setTitle(ev.title);
    setPhoto(ev.illustration);
    setAges(ev.ages);
    setDescription(ev.description);
    setTags(ev.tags);
    setDuration(ev.durationMin);
    setSeats(ev.capacity);
    setPrice(String(ev.price));
    setFree(ev.price === 0);
    setPayment(ev.payment);
    setApproval(ev.approval);
    setCancelHours(ev.cancelHours);
    setStep(2);
  };

  const stepNum = typeof step === 'number' ? step : null;
  const preview = build();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Nuovo evento">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-3xl rounded-t-3xl max-h-[94vh] flex flex-col shadow-2xl">
        {/* Intestazione con avanzamento */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between gap-2">
            {step !== 'tipo' ? (
              <button type="button" onClick={back} className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer" aria-label="Indietro">
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <span className="w-9" />
            )}
            <div className="text-center">
              <div className="font-bold text-[16px] text-slate-900">
                {step === 'tipo' ? 'Nuovo evento' : step === 'anteprima' ? 'Anteprima' : ['Cosa', 'Quando e quanti', 'Prezzo e prenotazione'][(stepNum ?? 1) - 1]}
              </div>
              {stepNum && <div className="text-[12px] text-slate-500">Passo {stepNum} di 3</div>}
            </div>
            <button type="button" onClick={onClose} className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer" aria-label="Chiudi">
              <X className="w-5 h-5" />
            </button>
          </div>
          {stepNum && (
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`h-1.5 rounded-full ${n <= stepNum ? 'bg-petrolio-500' : 'bg-slate-100'}`} />
              ))}
            </div>
          )}
        </div>

        {/* Contenuto */}
        <div className="overflow-y-auto px-5 py-5 flex-1 min-h-0">
          {step === 'tipo' && (
            <div className="flex flex-col gap-4">
              <p className="text-[14px] text-slate-600">Che cosa vuoi pubblicare?</p>
              {([
                ['laboratorio', 'Laboratorio o corso', 'Posti limitati, una o più date', Palette],
                ['spettacolo', 'Spettacolo o evento', 'Teatro, letture, feste, open day', Ticket],
                ['turni', 'Ingresso a turni', 'Ludoteca o spazio gioco a fasce orarie', Clock3]
              ] as const).map(([id, label, sub, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setKind(id);
                    setStep(1);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-colors ${
                    kind === id ? 'border-petrolio-400 bg-petrolio-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="w-11 h-11 rounded-xl bg-petrolio-50 text-petrolio-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{label}</span>
                    <span className="block text-[13px] text-slate-500">{sub}</span>
                  </span>
                </button>
              ))}
              <div className="mt-2">
                <div className="text-[13px] font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Copy className="w-4 h-4 text-petrolio-600" /> Oppure duplica un evento passato
                </div>
                <div className="flex flex-col gap-2">
                  {existing.slice(0, 3).map((ev) => (
                    <button key={ev.id} type="button" onClick={() => duplicate(ev)} className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-left cursor-pointer">
                      <img src={illustration(ev.illustration)} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13.5px] font-semibold text-slate-900 truncate">{ev.title}</span>
                        <span className="block text-[12px] text-slate-500">{fmtPrice(ev.price)} · {ev.capacity} posti</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <Field label="Titolo" htmlFor="ev-title" error={err('title')} hint="Breve e chiaro, come lo diresti a una mamma.">
                <input id="ev-title" className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Es. Pittura con le dita" maxLength={60} />
              </Field>
              <Field label="Foto" hint="Puoi usare un'illustrazione Mamapp finché non carichi le tue foto.">
                <div className="grid grid-cols-6 gap-2">
                  {PHOTOS.map((p) => (
                    <button key={p} type="button" onClick={() => setPhoto(p)} aria-pressed={photo === p} aria-label={`Illustrazione ${p}`} className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${photo === p ? 'border-petrolio-500' : 'border-transparent'}`}>
                      <img src={illustration(p)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Età">
                <div className="flex flex-wrap gap-2">
                  {AGES.map((a) => (
                    <Pill key={a} on={ages.includes(a)} onClick={() => setAges((c) => (c.includes(a) ? c.filter((x) => x !== a) : [...c, a]))}>
                      {a} anni
                    </Pill>
                  ))}
                </div>
              </Field>
              <Field label="Descrizione breve (facoltativa)" htmlFor="ev-desc" hint="Tre righe al massimo.">
                <textarea id="ev-desc" rows={3} maxLength={240} className={inputCls} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Es. Colori a dita su grandi fogli: un laboratorio sensoriale per i più piccoli." />
              </Field>
              <Field label="Tag (facoltativi)">
                <div className="flex flex-wrap gap-2">
                  {EXTRA_TAGS.map((t) => (
                    <Pill key={t} on={tags.includes(t)} onClick={() => setTags((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]))}>
                      {t}
                    </Pill>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Data" htmlFor="ev-date" error={err('date')}>
                  <input id="ev-date" type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
                </Field>
                <Field label="Ora di inizio" htmlFor="ev-time" error={err('time')}>
                  <input id="ev-time" type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
                </Field>
              </div>
              <Field label="Durata">
                <div className="flex gap-2">
                  {DURATIONS.map((d) => (
                    <Pill key={d} on={duration === d} onClick={() => setDuration(d)}>{d} min</Pill>
                  ))}
                </div>
              </Field>
              <Field label="Ripeti">
                <div className="flex gap-2">
                  <Pill on={repeat === 'no'} onClick={() => setRepeat('no')}>Una volta</Pill>
                  <Pill on={repeat === 'settimana'} onClick={() => setRepeat('settimana')}>Ogni settimana</Pill>
                </div>
              </Field>
              <Field label="Posti" error={err('seats')}>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setSeats((s) => Math.max(1, s - 1))} className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50" aria-label="Meno posti"><Minus className="w-5 h-5" /></button>
                  <span className="text-[22px] font-bold text-slate-900 tabular-nums w-10 text-center">{seats}</span>
                  <button type="button" onClick={() => setSeats((s) => Math.min(99, s + 1))} className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50" aria-label="Più posti"><Plus className="w-5 h-5" /></button>
                </div>
              </Field>
              <label className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                <span>
                  <span className="block text-[13.5px] font-semibold text-slate-900">Lista d'attesa quando è esaurito</span>
                  <span className="block text-[12.5px] text-slate-500">Se qualcuno disdice, il posto va al primo in lista.</span>
                </span>
                <input type="checkbox" checked={waitlist} onChange={(e) => setWaitlist(e.target.checked)} className="w-5 h-5 accent-petrolio-600" />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <Field label="Prezzo a bambino" htmlFor="ev-price" error={err('price')}>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                    <input id="ev-price" inputMode="decimal" disabled={free} className={`${inputCls} pl-8 disabled:bg-slate-50 disabled:text-slate-400`} value={free ? '' : price} onChange={(e) => setPrice(e.target.value)} placeholder="12" />
                  </div>
                  <Pill on={free} onClick={() => setFree(!free)}>Gratis</Pill>
                </div>
              </Field>
              <Field label="Pagamento">
                <div className="flex flex-col gap-2">
                  {([
                    ['app', 'Tutto in app', 'La famiglia paga subito con carta o Apple Pay'],
                    ['loco', 'Acconto in app, saldo da te', 'In app paga solo la commissione Mamapp, il resto lo incassi tu']
                  ] as const).map(([id, label, sub]) => (
                    <label key={id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${payment === id ? 'border-petrolio-400 bg-petrolio-50/50' : 'border-slate-200'}`}>
                      <input type="radio" name="pay" checked={payment === id} onChange={() => setPayment(id)} className="mt-1 w-4 h-4 accent-petrolio-600" />
                      <span>
                        <span className="block text-[13.5px] font-semibold text-slate-900">{label}</span>
                        <span className="block text-[12.5px] text-slate-500">{sub}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {priceNum > 0 && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-[13.5px] text-slate-700 tabular-nums">
                    {payment === 'app' ? (
                      <>La famiglia paga <b>{fmtEur(priceNum)}</b> in app. Tu ricevi <b>{fmtEur(net)}</b> a posto (commissione Mamapp {fmtEur(commission)}).</>
                    ) : (
                      <>La famiglia paga <b>{fmtEur(commission)}</b> in app e <b>{fmtEur(net)}</b> a te al momento dell'arrivo.</>
                    )}
                  </div>
                )}
              </Field>
              <Field label="Conferma delle prenotazioni">
                <div className="flex gap-2">
                  <Pill on={approval === 'automatica'} onClick={() => setApproval('automatica')}>Automatica</Pill>
                  <Pill on={approval === 'manuale'} onClick={() => setApproval('manuale')}>La confermo io</Pill>
                </div>
                <p className="text-[12.5px] text-slate-500">
                  {approval === 'automatica'
                    ? 'Le famiglie ricevono subito la conferma. Tu ricevi un avviso su WhatsApp.'
                    : 'Ricevi ogni richiesta su WhatsApp con i pulsanti Conferma e Rifiuta. Hai 24 ore per rispondere.'}
                </p>
              </Field>
              <Field label="Disdetta gratuita fino a">
                <div className="flex gap-2">
                  {[24, 48].map((h) => (
                    <Pill key={h} on={cancelHours === h} onClick={() => setCancelHours(h)}>{h} ore prima</Pill>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 'anteprima' && (
            <div>
              <p className="text-[13.5px] text-slate-600 mb-3">Così lo vedranno le famiglie nell'app.</p>
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <img src={illustration(preview.illustration)} alt="" className="w-full aspect-[16/9] object-cover" />
                <div className="p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{PARTNER.type}</div>
                  <div className="font-bold text-[18px] text-slate-900 mt-0.5">{preview.title}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-600 mt-1.5">
                    <span>{fmtDay(preview.start)} · {fmtTime(preview.start)} · {duration} min</span>
                    <span>{ages.map((a) => `${a} anni`).join(', ')}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{PARTNER.name}, {PARTNER.zone}</span>
                  </div>
                  {description && <p className="text-[13.5px] text-slate-600 mt-2">{description}</p>}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-4">
                    <span className="text-[20px] font-extrabold text-brand-600 tabular-nums">{fmtPrice(priceNum)}</span>
                    <span className="text-[12.5px] text-slate-500">{seats} posti · disdetta gratuita fino a {cancelHours} ore prima</span>
                  </div>
                </div>
              </div>
              {repeat === 'settimana' && (
                <p className="text-[13px] text-slate-600 mt-3 flex gap-1.5"><Check className="w-4 h-4 text-petrolio-600" /> Si ripeterà ogni settimana alla stessa ora.</p>
              )}
            </div>
          )}
        </div>

        {/* Azioni */}
        {step !== 'tipo' && (
          <div className="px-5 py-3.5 border-t border-slate-100 flex gap-2 shrink-0">
            <button type="button" className={`${btnSecondary} flex-1`} onClick={() => onSave({ ...build(), status: 'bozza' }, false)}>
              Salva bozza
            </button>
            {step === 'anteprima' ? (
              <button type="button" className={`${btnPrimary} flex-[2]`} onClick={() => onSave(build(), true)}>
                Pubblica
              </button>
            ) : (
              <button type="button" className={`${btnPrimary} flex-[2]`} onClick={next}>
                {step === 3 ? 'Vedi anteprima' : 'Avanti'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
