
import React from 'react';

interface OrbitalDiagramProps {
  missDistanceKm: number;
  isHazardous: boolean;
}

const EARTH_RADIUS_KM = 6371;
const MOON_ORBIT_RADIUS_KM = 384400;

// Scaling factor to fit the diagram in the viewbox
const MAX_VISIBLE_DISTANCE = MOON_ORBIT_RADIUS_KM * 2.5;
const VIEWBOX_SIZE = 200;
const SCALE = VIEWBOX_SIZE / MAX_VISIBLE_DISTANCE;

const earthRadius = EARTH_RADIUS_KM * SCALE * 10; // Exaggerate Earth size for visibility
const moonOrbitRadius = MOON_ORBIT_RADIUS_KM * SCALE;

const OrbitalDiagram: React.FC<OrbitalDiagramProps> = ({ missDistanceKm, isHazardous }) => {
  const approachDistance = (missDistanceKm + EARTH_RADIUS_KM) * SCALE;
  
  // Cap the visual distance to stay within the viewbox
  const displayDistance = Math.min(approachDistance, VIEWBOX_SIZE / 2 - 10);
  
  const pathColor = isHazardous ? 'stroke-red-500' : 'stroke-amber-400';
  const asteroidColor = isHazardous ? 'fill-red-500' : 'fill-amber-400';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} className="w-full h-auto max-h-56">
        <defs>
          <radialGradient id="earthGradient">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>
        </defs>
        
        {/* Moon's Orbit */}
        <circle
          cx={VIEWBOX_SIZE / 2}
          cy={VIEWBOX_SIZE / 2}
          r={moonOrbitRadius}
          fill="none"
          stroke="#475569"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <text x={VIEWBOX_SIZE / 2 + moonOrbitRadius} y={VIEWBOX_SIZE / 2} dy="3" dx="2" fill="#64748b" fontSize="5" textAnchor="start">
          Moon's Orbit
        </text>
        
        {/* Earth */}
        <circle
          cx={VIEWBOX_SIZE / 2}
          cy={VIEWBOX_SIZE / 2}
          r={earthRadius}
          fill="url(#earthGradient)"
        />
        <text x={VIEWBOX_SIZE / 2} y={VIEWBOX_SIZE / 2} dy="1.5" fill="white" fontSize="5" textAnchor="middle">
          Earth
        </text>

        {/* Asteroid Path */}
        <path
          d={`M 0,${VIEWBOX_SIZE / 2 - displayDistance} Q ${VIEWBOX_SIZE / 2},${VIEWBOX_SIZE / 2 - displayDistance - 10} ${VIEWBOX_SIZE},${VIEWBOX_SIZE / 2 - displayDistance}`}
          fill="none"
          className={pathColor}
          strokeWidth="1"
        />

        {/* Asteroid */}
        <circle
          cx={VIEWBOX_SIZE / 2}
          cy={VIEWBOX_SIZE / 2 - displayDistance}
          r="2"
          className={asteroidColor}
        >
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref={`#M 0,${VIEWBOX_SIZE / 2 - displayDistance} Q ${VIEWBOX_SIZE / 2},${VIEWBOX_SIZE / 2 - displayDistance - 10} ${VIEWBOX_SIZE},${VIEWBOX_SIZE / 2 - displayDistance}`} />
          </animateMotion>
        </circle>
      </svg>
       <p className="text-xs text-slate-400 mt-2 text-center">
        Closest Approach: <strong className={isHazardous ? 'text-red-400' : 'text-amber-400'}>{missDistanceKm.toLocaleString()} km</strong>
      </p>
    </div>
  );
};

export default OrbitalDiagram;
