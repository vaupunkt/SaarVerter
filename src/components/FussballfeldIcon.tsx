import React from 'react';

interface FussballfeldIconProps {
  partial?: boolean;
  opacity?: number;
}

const FussballfeldIcon: React.FC<FussballfeldIconProps> = ({ partial = false, opacity = 1 }) => {
  const clipId = `clip-fussball-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg 
      viewBox="0 0 105 68" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-10 md:w-16 md:h-12"
    >
      {partial && (
        <defs>
          <clipPath id={clipId}>
            <rect 
              x="0" 
              y="0" 
              width="105" 
              height={68 * opacity} 
            />
          </clipPath>
        </defs>
      )}
      
      {/* Spielfeld (grün) */}
      <rect 
        x="0" 
        y="0" 
        width="105" 
        height="68" 
        fill="#10b981"
        clipPath={partial ? `url(#${clipId})` : undefined}
      />
      
      {/* Linien */}
      <g stroke="#fff" strokeWidth="0.8" fill="none" opacity={partial ? (opacity > 0.5 ? 1 : 0.3) : 1}>
        {/* Außenlinien */}
        <rect x="2" y="2" width="101" height="64" />
        
        {/* Mittellinie */}
        <line x1="52.5" y1="2" x2="52.5" y2="66" />
        
        {/* Mittelkreis */}
        <circle cx="52.5" cy="34" r="9" />
        <circle cx="52.5" cy="34" r="0.5" fill="#fff" />
        
        {/* Strafräume links */}
        <rect x="2" y="18" width="16" height="32" />
        <rect x="2" y="24" width="5" height="20" />
        
        {/* Strafräume rechts */}
        <rect x="87" y="18" width="16" height="32" />
        <rect x="98" y="24" width="5" height="20" />
      </g>
      
      {/* Gestrichelter Umriss für partiell */}
      {partial && (
        <rect 
          x="2" 
          y="2" 
          width="101" 
          height="64"
          fill="none"
          stroke="#000"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          opacity="0.3"
        />
      )}
    </svg>
  );
};

export default FussballfeldIcon;
