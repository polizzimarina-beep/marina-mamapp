import React, { useState, useEffect } from 'react';
import { PROMO_BANNERS } from '../data/mockData';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PromoCarouselProps {
  onSelectPromo: (tag: string) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ onSelectPromo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-1 py-1">
      <div className="relative overflow-hidden rounded-2xl shadow-xs border border-slate-200">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROMO_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-r ${banner.bgGradient} p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden text-white`}
            >
              {/* Decorative Circle overlay */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div className="z-10 max-w-lg">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{banner.badge}</span>
                </div>

                <h2 className="text-base sm:text-xl font-extrabold tracking-tight mb-1 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-xs sm:text-sm font-normal opacity-90 mb-3 line-clamp-1 sm:line-clamp-2">
                  {banner.subtitle}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectPromo(banner.tag)}
                    className="bg-[#FF5533] hover:bg-[#e04422] text-white font-extrabold px-4 py-1.5 rounded-full text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>Scopri Offerte</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <span className="text-[11px] font-medium opacity-85 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {banner.tag}
                  </span>
                </div>
              </div>

              <div className="z-10 shrink-0 hidden sm:block">
                <img
                  src={banner.image}
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-lg border-2 border-white/30 transform rotate-2 hover:rotate-0 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {PROMO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
