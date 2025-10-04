
import React from 'react';
import type { Neo } from '../types';
import { HazardIcon, NoHazardIcon } from './Icons';

interface NeoListProps {
  neos: Neo[];
  selectedNeo: Neo | null;
  onSelectNeo: (neo: Neo) => void;
}

const NeoList: React.FC<NeoListProps> = ({ neos, selectedNeo, onSelectNeo }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 sticky top-0 bg-slate-800/50 backdrop-blur-sm py-2">
        Asteroids ({neos.length})
      </h2>
      <ul className="space-y-2 flex-grow overflow-y-auto pr-2">
        {neos.map((neo) => (
          <li
            key={neo.id}
            onClick={() => onSelectNeo(neo)}
            className={`p-3 rounded-md cursor-pointer transition-colors duration-200 border-2 ${
              selectedNeo?.id === neo.id
                ? 'bg-cyan-900/50 border-cyan-500'
                : 'bg-slate-700/50 border-transparent hover:bg-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-100">{neo.name}</span>
              {neo.is_potentially_hazardous_asteroid ? (
                <div className="flex items-center gap-1 text-red-400" title="Potentially Hazardous">
                  <HazardIcon className="w-4 h-4" />
                  <span className="text-xs font-bold">HAZARDOUS</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-green-400" title="Not Potentially Hazardous">
                  <NoHazardIcon className="w-4 h-4" />
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Diameter: {parseFloat(neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2))} - {parseFloat(neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2))} km
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeoList;
