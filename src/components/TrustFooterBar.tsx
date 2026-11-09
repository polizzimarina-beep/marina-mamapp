import React from 'react';
import { Heart, ShoppingBag, RotateCcw, Headphones, ShieldCheck, Baby } from 'lucide-react';

export const TrustFooterBar: React.FC = () => {
  const trustItems = [
    {
      title: 'Attività selezionate con cura',
      desc: 'Esperienze verificate per famiglie e bambini',
      icon: <Heart className="w-5 h-5 text-[#2DD4BF]" />
    },
    {
      title: 'Servizi pensati per i genitori',
      desc: 'Fasciatoio, passeggino e aree allattamento',
      icon: <Baby className="w-5 h-5 text-[#2DD4BF]" />
    },
    {
      title: 'Cancellazione facile e rapida',
      desc: 'Rimborso e cambio data fino a 24h prima',
      icon: <RotateCcw className="w-5 h-5 text-[#2DD4BF]" />
    },
    {
      title: 'Assistenza Mamma a Palermo',
      desc: 'Supporto dedicato sempre al tuo fianco',
      icon: <Headphones className="w-5 h-5 text-[#2DD4BF]" />
    }
  ];

  return (
    <div className="w-full bg-[#0B434C] text-white rounded-3xl border border-[#145C66] p-5 sm:p-6 shadow-md select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {trustItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3.5 group">
            {/* Icon Container with Magenta contrast */}
            <div className="w-11 h-11 rounded-2xl bg-[#701542] text-white flex items-center justify-center shrink-0 border border-[#8D1B54] shadow-sm group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <div>
              {/* Titolo in Bianco */}
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                {item.title}
              </h4>
              {/* Descrizione in Verde Ottanio chiaro / Bianco */}
              <p className="text-[11px] text-[#BCE2E6] font-medium leading-normal mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
