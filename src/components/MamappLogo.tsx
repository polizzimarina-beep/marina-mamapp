import React from 'react';
import mamappPin from '../assets/images/mamapp-pin.png';

interface MamappLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  iconOnly?: boolean;
}

/*
 * Logo ufficiale Mamapp.
 * - Simbolo: il pin ad acquerello con la famiglia, ritagliato dal logo ufficiale
 *   (src/assets/images/mamapp-pin.png, sfondo trasparente).
 * - Scritta: testo "Mamapp" in Comfortaa con la stessa sfumatura del logo
 *   (rosa lampone -> rosa -> rosa cipria -> lilla), così resta nitida a ogni dimensione.
 * Il logo completo (simbolo + scritta) è in public/mamapp-logo.png.
 */
const WORDMARK_GRADIENT =
  'linear-gradient(90deg, #E43B80 0%, #E34886 22%, #E76092 42%, #EC88AA 62%, #F09EB2 74%, #C09FC9 86%, #B596C0 100%)';

const iconHeightMap = {
  sm: 34,
  md: 44,
  lg: 62,
  xl: 96
};

const textFontSizeMap = {
  sm: 'text-xl',
  md: 'text-2xl sm:text-[27px]',
  lg: 'text-3xl sm:text-4xl',
  xl: 'text-5xl'
};

export const MamappLogo: React.FC<MamappLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  layout = 'horizontal',
  iconOnly = false
}) => {
  const iconHeight = iconHeightMap[size] || iconHeightMap.md;

  return (
    <div
      className={`inline-flex items-center ${layout === 'vertical' ? 'flex-col gap-1.5' : 'flex-row gap-2'} select-none ${className}`}
    >
      <img
        src={mamappPin}
        alt={showText && !iconOnly ? '' : 'Mamapp'}
        style={{ height: iconHeight, width: 'auto' }}
        className="shrink-0 object-contain"
        draggable={false}
      />

      {showText && !iconOnly && (
        <span
          className={`font-bold leading-none ${textFontSizeMap[size] || textFontSizeMap.md}`}
          style={{
            fontFamily: "'Comfortaa', 'Quicksand', 'Nunito', system-ui, sans-serif",
            letterSpacing: '-0.01em',
            background: WORDMARK_GRADIENT,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: '#E43B80',
            display: 'inline-block',
            paddingBottom: '0.08em'
          }}
        >
          Mamapp
        </span>
      )}
    </div>
  );
};
