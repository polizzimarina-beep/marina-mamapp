import React, { useState } from 'react';
import { 
  Check, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Ticket,
  HelpCircle,
  Award
} from 'lucide-react';

export interface PackageOption {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  priceUnit: string;
  perEntryPrice: string;
  savingsBadge?: string;
  isPopular?: boolean;
  validity: string;
  entriesCount: string;
  isFamilyShareable: boolean;
  priorityBooking: string;
  cancellation: string;
  includedAmenities: string;
  welcomeKit: string;
}

export const PACKAGES_DATA: PackageOption[] = [
  {
    id: 'single',
    name: 'Singolo Ingresso',
    price: 30,
    priceDisplay: '30 €',
    priceUnit: 'una tantum',
    perEntryPrice: '30 € / ingresso',
    isPopular: false,
    validity: 'Data evento scelta',
    entriesCount: '1 ingresso',
    isFamilyShareable: false,
    priorityBooking: 'Standard',
    cancellation: 'Entro 24 ore prima',
    includedAmenities: 'Passeggino & Fasciatoio',
    welcomeKit: 'Guida digitale Palermo'
  },
  {
    id: 'pack5',
    name: 'Pacchetto 5 Ingressi',
    price: 125,
    priceDisplay: '125 €',
    priceUnit: 'totale',
    perEntryPrice: '25 € / ingresso',
    savingsBadge: 'Risparmi 25 €',
    isPopular: false,
    validity: '3 mesi dalla data di acquisto',
    entriesCount: '5 ingressi scalabili',
    isFamilyShareable: true,
    priorityBooking: 'Priorità 48h prima',
    cancellation: 'Recupero credito flessibile',
    includedAmenities: 'Passeggino, Fasciatoio & Area Nanna',
    welcomeKit: 'Badge Junior Mamapp'
  },
  {
    id: 'pack10',
    name: 'Pacchetto 10 Ingressi',
    price: 220,
    priceDisplay: '220 €',
    priceUnit: 'totale',
    perEntryPrice: '22 € / ingresso',
    savingsBadge: 'Risparmi 80 €',
    isPopular: true,
    validity: '6 mesi dalla data di acquisto',
    entriesCount: '10 ingressi scalabili',
    isFamilyShareable: true,
    priorityBooking: 'Posto VIP riservato garantito',
    cancellation: 'Recupero immediato senza penale',
    includedAmenities: 'Passeggino prioritario, Fasciatoio & Area Relax',
    welcomeKit: 'Kit Mamapp + Merenda bio inclusa'
  },
  {
    id: 'subscription',
    name: 'Abbonamento',
    price: 250,
    priceDisplay: '250 €',
    priceUnit: '/ anno',
    perEntryPrice: 'Ingressi illimitati',
    savingsBadge: 'Miglior valore annuo',
    isPopular: false,
    validity: '12 mesi (365 giorni)',
    entriesCount: 'Illimitati per 1 anno',
    isFamilyShareable: true,
    priorityBooking: 'Accesso prioritario sempre',
    cancellation: 'Sospensione ferie fino a 30 gg',
    includedAmenities: 'Accesso completo a tutti i servizi',
    welcomeKit: 'Box Benvenuto + Convenzioni partner'
  }
];

interface PackageComparisonTableProps {
  activityTitle?: string;
  onSelectPackage?: (pkg: PackageOption) => void;
  className?: string;
}

export const PackageComparisonTable: React.FC<PackageComparisonTableProps> = ({
  activityTitle = 'questa attività',
  onSelectPackage,
  className = ''
}) => {
  const [selectedMobileTab, setSelectedMobileTab] = useState<string>('pack10');
  const [purchasedPkg, setPurchasedPkg] = useState<string | null>(null);

  const handleBuy = (pkg: PackageOption) => {
    setPurchasedPkg(pkg.id);
    setTimeout(() => setPurchasedPkg(null), 2500);
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden ${className}`}>
      
      {/* Header of Section */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-700)]" />
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-brand-700)]">
                Piani & Tariffe Flessibili
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Scegli il tuo pacchetto
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Tariffe trasparenti e condivisibili in famiglia per {activityTitle}. Nessun costo nascosto.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[var(--color-petrolio-600)]" />
            <span>Garanzia rimborso 100%</span>
          </div>
        </div>
      </div>

      {/* Confirmation Toast Notification if bought */}
      {purchasedPkg && (
        <div className="bg-[var(--color-brand-50)] border-b border-[var(--color-brand-700)]/20 px-6 py-2.5 text-xs font-bold text-[var(--color-brand-700)] flex items-center justify-between animate-in fade-in duration-200">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-700)]" />
            Pacchetto aggiunto con successo al carrello!
          </span>
          <span className="text-[11px] text-slate-500">Pronto per il checkout</span>
        </div>
      )}

      {/* Mobile Selector Tabs (Visible on < md) */}
      <div className="md:hidden p-3 bg-slate-50/70 border-b border-slate-200/80">
        <div className="grid grid-cols-2 gap-1.5">
          {PACKAGES_DATA.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedMobileTab(pkg.id)}
              className={`p-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                selectedMobileTab === pkg.id
                  ? pkg.isPopular
                    ? 'bg-white text-[var(--color-brand-700)] border-2 border-[var(--color-brand-700)] shadow-xs font-black'
                    : 'bg-white text-[var(--color-petrolio-600)] border border-[var(--color-petrolio-600)] shadow-xs font-black'
                  : 'text-slate-600 bg-white/70 border border-slate-200 hover:bg-white'
              }`}
            >
              <div className="truncate">{pkg.name}</div>
              <div className="text-[11px] font-extrabold text-[var(--color-petrolio-600)]">{pkg.priceDisplay}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP COMPARATIVE TABLE (Full 5 Columns: Labels + 4 Packages)         */}
      {/* ========================================================================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[720px]">
          
          {/* Table Header: Package Cards Row */}
          <thead>
            <tr className="border-b border-slate-200/80 divide-x divide-slate-100">
              
              {/* Left Column: Parameter Labels Header */}
              <th className="w-[24%] p-4 bg-slate-50/80 align-bottom">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Caratteristiche & Servizi
                </span>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  Confronta i vantaggi
                </p>
              </th>

              {/* 4 Package Columns */}
              {PACKAGES_DATA.map((pkg) => {
                const isHighlight = pkg.isPopular;
                return (
                  <th 
                    key={pkg.id}
                    className={`w-[19%] p-4 align-top transition-colors relative ${
                      isHighlight 
                        ? 'bg-[var(--color-brand-50)]/30 ring-2 ring-inset ring-[var(--color-brand-700)]' 
                        : 'bg-white'
                    }`}
                  >
                    {/* Highlight Badge "PIÙ SCELTO" */}
                    <div className="h-6 flex items-center mb-1">
                      {isHighlight ? (
                        <span className="inline-flex items-center gap-1 bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-700)]/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                          <Sparkles className="w-3 h-3 text-[var(--color-brand-700)]" />
                          PIÙ SCELTO
                        </span>
                      ) : pkg.savingsBadge ? (
                        <span className="inline-block bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[var(--color-brand-700)]/20">
                          {pkg.savingsBadge}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400">Opzione Base</span>
                      )}
                    </div>

                    {/* Package Name */}
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      {pkg.name}
                    </h3>

                    {/* Price in Verde Ottanio */}
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[var(--color-petrolio-600)]">
                        {pkg.priceDisplay}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {pkg.priceUnit}
                      </span>
                    </div>

                    {/* Per Entry Note */}
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                      {pkg.perEntryPrice}
                    </p>

                    {/* Buy CTA Button */}
                    <div className="mt-3.5">
                      {isHighlight ? (
                        <button
                          onClick={() => handleBuy(pkg)}
                          className="w-full py-2.5 px-3 bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-700)] text-white rounded-xl text-xs font-black transition-all shadow-sm shadow-[var(--color-brand-700)]/20 hover:shadow active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer group"
                        >
                          <span>Acquista</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuy(pkg)}
                          className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 hover:text-[var(--color-petrolio-600)] border border-slate-200 hover:border-[var(--color-petrolio-600)] rounded-xl text-xs font-bold transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer group"
                        >
                          <span>Acquista</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--color-petrolio-600)] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body: Parameter Rows */}
          <tbody className="divide-y divide-slate-100 text-xs">
            
            {/* Row 1: Validità */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Validità temporale</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-700 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15 font-semibold text-slate-900' : ''
                  }`}
                >
                  {pkg.validity}
                </td>
              ))}
            </tr>

            {/* Row 2: Ingressi Inclusi */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-slate-400" />
                <span>Ingressi inclusi</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-800 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15 font-bold text-[var(--color-brand-700)]' : ''
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                    <span>{pkg.entriesCount}</span>
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 3: Condivisibile in famiglia */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Condivisibile in famiglia</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 ${pkg.isPopular ? 'bg-[var(--color-brand-50)]/15' : ''}`}
                >
                  {pkg.isFamilyShareable ? (
                    <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                      <span>Fratelli &amp; Genitori</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 font-normal">
                      <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      <span>Nominale singolo</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Row 4: Prenotazione prioritaria */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <span>Priorità prenotazione</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-700 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15 font-semibold text-slate-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {pkg.priorityBooking !== 'Standard' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 text-center text-slate-300">•</span>
                    )}
                    <span>{pkg.priorityBooking}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 5: Rimborso & Cancellazione */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Politica di rimborso</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-700 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15 font-semibold text-slate-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                    <span>{pkg.cancellation}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 6: Servizi Salva-Mamma Inclusi */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <span className="text-xs">🚼</span>
                <span>Spazio Passeggino &amp; Baby</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-700 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                    <span className="line-clamp-2">{pkg.includedAmenities}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 7: Vantaggi & Welcome Kit */}
            <tr className="divide-x divide-slate-100 hover:bg-slate-50/40 transition-colors">
              <td className="p-3.5 bg-slate-50/60 font-bold text-slate-800 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Welcome kit &amp; Extra</span>
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3.5 text-slate-700 font-medium ${
                    pkg.isPopular ? 'bg-[var(--color-brand-50)]/15 font-semibold text-[var(--color-brand-700)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-petrolio-600)] shrink-0" />
                    <span>{pkg.welcomeKit}</span>
                  </div>
                </td>
              ))}
            </tr>

          </tbody>

          {/* Bottom Table Footer: Second Row of CTA Buttons */}
          <tfoot>
            <tr className="divide-x divide-slate-100 border-t border-slate-200/80 bg-slate-50/40">
              <td className="p-3 bg-slate-50/80 text-[11px] font-semibold text-slate-500">
                Paga in sicurezza con carta o Satispay
              </td>
              {PACKAGES_DATA.map((pkg) => (
                <td 
                  key={pkg.id} 
                  className={`p-3 ${pkg.isPopular ? 'bg-[var(--color-brand-50)]/30' : ''}`}
                >
                  {pkg.isPopular ? (
                    <button
                      onClick={() => handleBuy(pkg)}
                      className="w-full py-2 px-3 bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-700)] text-white rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Acquista</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(pkg)}
                      className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Acquista</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>
                  )}
                </td>
              ))}
            </tr>
          </tfoot>

        </table>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE CARD VIEW (Active Package Detail for Small Screens)              */}
      {/* ========================================================================= */}
      <div className="md:hidden p-4 space-y-4">
        {(() => {
          const pkg = PACKAGES_DATA.find((p) => p.id === selectedMobileTab) || PACKAGES_DATA[2];
          const isHighlight = pkg.isPopular;
          return (
            <div className={`p-4 rounded-2xl border transition-all ${
              isHighlight 
                ? 'border-2 border-[var(--color-brand-700)] bg-[var(--color-brand-50)]/40 shadow-sm' 
                : 'border-slate-200 bg-white shadow-2xs'
            }`}>
              
              {/* Top Banner on Mobile */}
              <div className="flex items-center justify-between mb-2">
                {isHighlight ? (
                  <span className="bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-700)]/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[var(--color-brand-700)]" />
                    PIÙ SCELTO DALLE MAMME
                  </span>
                ) : pkg.savingsBadge ? (
                  <span className="bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[var(--color-brand-700)]/20">
                    {pkg.savingsBadge}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Tariffa Flessibile
                  </span>
                )}
                <span className="text-xs font-extrabold text-[var(--color-petrolio-600)]">
                  {pkg.perEntryPrice}
                </span>
              </div>

              {/* Title & Price */}
              <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">
                  {pkg.name}
                </h3>
                <div className="text-right">
                  <span className="text-2xl font-black text-[var(--color-petrolio-600)]">
                    {pkg.priceDisplay}
                  </span>
                  <span className="text-xs text-slate-500 font-medium ml-1">
                    {pkg.priceUnit}
                  </span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="py-3 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Validità:</strong> {pkg.validity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Ingressi:</strong> {pkg.entriesCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Condivisione:</strong> {pkg.isFamilyShareable ? 'Sì, tutta la famiglia' : 'Nominale singolo'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Priorità:</strong> {pkg.priorityBooking}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Cancellazione:</strong> {pkg.cancellation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-petrolio-600)] shrink-0" />
                  <span><strong>Extra:</strong> {pkg.welcomeKit}</span>
                </div>
              </div>

              {/* Buy CTA */}
              <div className="pt-2">
                {isHighlight ? (
                  <button
                    onClick={() => handleBuy(pkg)}
                    className="w-full py-3 bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-700)] text-white rounded-xl text-xs font-black shadow-md shadow-[var(--color-brand-700)]/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Acquista a {pkg.priceDisplay}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(pkg)}
                    className="w-full py-3 bg-white hover:bg-slate-50 text-slate-900 border border-[var(--color-petrolio-600)] rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Acquista a {pkg.priceDisplay}</span>
                    <ChevronRight className="w-4 h-4 text-[var(--color-petrolio-600)]" />
                  </button>
                )}
              </div>

            </div>
          );
        })()}
      </div>

      {/* Footer Notes */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>I pacchetti possono essere utilizzati per date e orari differenti a tua scelta.</span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-slate-600">
          <span>Pagamento Protetto SSL</span>
          <span>•</span>
          <span>Fattura immediata</span>
        </div>
      </div>

    </section>
  );
};
