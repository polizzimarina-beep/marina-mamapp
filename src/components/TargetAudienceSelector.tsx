import React from 'react';
import { TARGET_AUDIENCES } from '../data/mockData';
import { TargetAudience } from '../types';
import { Sparkles, Baby, Users } from 'lucide-react';

export const FemaleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7" />
    <path d="M9 18h6" />
  </svg>
);

export const MaleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="14" r="5" />
    <path d="M13.5 10.5L20 4" />
    <path d="M16 4h5v5" />
  </svg>
);

interface TargetAudienceSelectorProps {
  selectedAudience: TargetAudience;
  onSelectAudience: (audience: TargetAudience) => void;
}

const getAudienceIcon = (id: TargetAudience, className: string) => {
  switch (id) {
    case 'all':
      return <Sparkles className={className} />;
    case 'bimbi':
      return <Baby className={className} />;
    case 'mamme':
      return <FemaleIcon className={className} />;
    case 'papa':
      return <MaleIcon className={className} />;
    case 'famiglia':
      return <Users className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const TargetAudienceSelector: React.FC<TargetAudienceSelectorProps> = ({
  selectedAudience,
  onSelectAudience
}) => {
  return (
    <div className="px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2.5 min-w-max">
        {TARGET_AUDIENCES.map((audience) => {
          const isSelected = selectedAudience === audience.id;
          return (
            <button
              key={audience.id}
              onClick={() => onSelectAudience(audience.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 border-2 border-sky-600 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-400/50 hover:bg-sky-50/50'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-sky-600'}>
                {getAudienceIcon(audience.id, 'w-4 h-4')}
              </span>
              <span className="uppercase tracking-wider">{audience.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

