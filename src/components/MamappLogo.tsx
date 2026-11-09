import React from 'react';

interface MamappLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  iconOnly?: boolean;
  useImage?: boolean;
}

export const MamappLogo: React.FC<MamappLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  layout = 'horizontal',
  iconOnly = false,
  useImage = false
}) => {
  // Sizing definitions
  const imageSizeMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
    xl: 'h-24 sm:h-28'
  };

  const iconDimMap = {
    sm: { width: 30, height: 35 },
    md: { width: 38, height: 44 },
    lg: { width: 54, height: 62 },
    xl: { width: 80, height: 92 }
  };

  const textFontSizeMap = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[27px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-5xl'
  };

  const currentIconDim = iconDimMap[size] || iconDimMap.md;

  // Se viene richiesto layout verticale con immagine completa (incluso il logo ufficiale uploadato)
  if (useImage && layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src="/mamapp-logo.png"
          alt="Mamapp Logo"
          className={`${imageSizeMap[size]} w-auto object-contain drop-shadow-xs`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${layout === 'vertical' ? 'flex-col gap-1.5' : 'flex-row gap-2.5'} select-none ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. WATERCOLOR-STYLE LOCATION MAP PIN:                                     */}
      {/* - Gradient of magenta, bright pink, and soft lilac/purple                 */}
      {/* - Abstract smooth silhouettes of a family of three inside:               */}
      {/*   two adult figures on outside holding hands, forming a protective arch   */}
      {/*   over a smaller child figure in the center                               */}
      {/* ========================================================================= */}
      <div 
        style={{ width: currentIconDim.width, height: currentIconDim.height }}
        className="shrink-0 relative flex items-center justify-center group"
      >
        <svg
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_6px_rgba(225,29,98,0.18)] transition-transform duration-200 group-hover:scale-105"
        >
          <defs>
            {/* Gradiente ad acquerello per il bordo del pin: Magenta -> Rosa vivace -> Lilla/Viola */}
            <linearGradient id="watercolorPinGrad" x1="20" y1="30" x2="180" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--color-brand-600)" }} />
              <stop offset="28%" style={{ stopColor: "var(--color-brand-600)" }} />
              <stop offset="55%" style={{ stopColor: "var(--color-brand-400)" }} />
              <stop offset="78%" stopColor="#B35CE2" />
              <stop offset="100%" stopColor="#8E54D2" />
            </linearGradient>

            {/* Sfumatura morbida per effetto pennellata acquerello (texture pittorica) */}
            <linearGradient id="watercolorWashGrad" x1="15" y1="20" x2="185" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--color-brand-600)" }} stopOpacity="0.45" />
              <stop offset="35%" style={{ stopColor: "var(--color-brand-400)" }} stopOpacity="0.30" />
              <stop offset="70%" stopColor="#C084FC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.45" />
            </linearGradient>

            {/* Gradiente figura sinistra (Adulto / Mamma - Magenta caldo) */}
            <linearGradient id="leftAdultGrad" x1="60" y1="45" x2="95" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--color-brand-600)" }} />
              <stop offset="60%" style={{ stopColor: "var(--color-brand-500)" }} stopOpacity="0.95" />
              <stop offset="100%" style={{ stopColor: "var(--color-brand-400)" }} stopOpacity="0.80" />
            </linearGradient>

            {/* Gradiente figura destra (Adulto / Papà - Lilla e Viola morbido) */}
            <linearGradient id="rightAdultGrad" x1="140" y1="45" x2="105" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8E54D2" />
              <stop offset="60%" stopColor="#A855F7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.80" />
            </linearGradient>

            {/* Gradiente figura centrale (Bambino al centro - Rosa pesca caldo e rassicurante) */}
            <linearGradient id="centerChildGrad" x1="100" y1="85" x2="100" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--color-brand-400)" }} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.80" />
            </linearGradient>
          </defs>

          {/* 1. VELATURA ACQUERELLO SFUMATA ESTERNA (TEXTURE PITTO RICA) */}
          <path
            d="M100 20 C54 20 18 56 18 102 C18 140 50 178 94 216 C98 220 102 220 106 216 C124 200 172 152 178 108 C182 64 146 20 100 20 Z"
            stroke="url(#watercolorWashGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.65"
          />

          {/* 2. PENNELLATA PRINCIPALE DEL PIN AD ACQUERELLO */}
          <path
            d="M98 212 C96 210 40 156 30 110 C21 68 52 26 98 26 C142 26 174 60 170 104 C166 144 126 186 104 212 C101 215 97 220 95 222 C94 223 92 220 93 218 C94 216 97 214 98 212 Z"
            fill="url(#watercolorPinGrad)"
          />

          {/* Pennellata interna di riflesso morbido */}
          <path
            d="M100 32 C60 32 34 64 36 104 C38 136 68 174 98 204 C99 205 101 205 102 204 C128 178 162 138 164 104 C167 68 140 32 100 32 Z"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Coda decorativa ad acquerello alla base del pin (pennellata sfumata verso il viola) */}
          <path
            d="M96 208 C97 212 100 218 104 222 C108 225 115 220 112 215 C108 210 103 204 98 198"
            stroke="#8E54D2"
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />

          {/* ========================================================================= */}
          {/* SAGOME DELLA FAMIGLIA DI TRE ELEMENTI:                                    */}
          {/* Due figure adulte all'esterno che si tengono per mano formando un arco    */}
          {/* protettivo sopra la figura più piccola del bambino al centro              */}
          {/* ========================================================================= */}

          {/* 1. ADULTO SINISTRA (Mamma - Rosa/Magenta) */}
          {/* Testa */}
          <circle cx="78" cy="70" r="13" fill="url(#leftAdultGrad)" />
          {/* Corpo che curva morbidamente verso il centro formando l'arco sinistro */}
          <path
            d="M78 86 C67 88 56 99 55 115 C54 131 62 150 76 163 C78 165 82 163 81 160 C74 148 69 133 72 119 C75 108 85 102 94 104 C98 105 100 108 100 111 C100 108 98 102 91 97 C85 92 82 88 78 86 Z"
            fill="url(#leftAdultGrad)"
          />

          {/* 2. ADULTO DESTRA (Papà/Partner - Lilla/Viola) */}
          {/* Testa */}
          <circle cx="122" cy="70" r="13" fill="url(#rightAdultGrad)" />
          {/* Corpo che curva morbidamente verso il centro formando l'arco destro */}
          <path
            d="M122 86 C133 88 144 99 145 115 C146 131 138 150 124 163 C122 165 118 163 119 160 C126 148 131 133 128 119 C125 108 115 102 106 104 C102 105 100 108 100 111 C100 108 102 102 109 97 C115 92 118 88 122 86 Z"
            fill="url(#rightAdultGrad)"
          />

          {/* 3. BAMBINO AL CENTRO SOTTO L'ARCO PROTETTIVO (Rosa pesca morbido) */}
          {/* Testa */}
          <circle cx="100" cy="112" r="8.5" fill="url(#centerChildGrad)" />
          {/* Corpo a goccia raccolto sotto l'abbraccio dei genitori */}
          <path
            d="M100 123 C93 123 89 130 90 139 C91 151 97 165 100 173 C103 165 109 151 110 139 C111 130 107 123 100 123 Z"
            fill="url(#centerChildGrad)"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. TESTO "Mamapp" ACCANTO:                                                */}
      {/* - Font sans-serif moderno, arrotondato e accogliente (Comfortaa/Quicksand)*/}
      {/* - Esatto gradiente da magenta a lilla/viola identico al pin               */}
      {/* ========================================================================= */}
      {showText && !iconOnly && (
        <span 
          className={`font-sans font-extrabold tracking-tight leading-none ${textFontSizeMap[size] || 'text-2xl sm:text-[27px]'}`}
          style={{
            fontFamily: "'Comfortaa', 'Quicksand', 'Nunito', system-ui, sans-serif",
            letterSpacing: '-0.025em',
            background: 'linear-gradient(95deg, var(--color-brand-600) 0%, var(--color-brand-600) 24%, var(--color-brand-400) 50%, #B35CE2 76%, #8E54D2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          Mamapp
        </span>
      )}

    </div>
  );
};
