
import React, { useState, useCallback, useEffect } from 'react';
import type { Neo } from '../types';
import { getAsteroidSummary } from '../services/geminiService';
import { HazardIcon, LinkIcon, LoadingIcon, SparklesIcon } from './Icons';
import CloseApproachChart from './CloseApproachChart';
import OrbitalDiagram from './OrbitalDiagram';

interface NeoDetailProps {
  neo: Neo;
}

const NeoDetail: React.FC<NeoDetailProps> = ({ neo }) => {
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = useCallback(async () => {
    setIsLoadingSummary(true);
    setError('');
    setSummary('');
    try {
      const result = await getAsteroidSummary(neo);
      setSummary(result);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoadingSummary(false);
    }
  }, [neo]);

  // Reset summary when neo changes
  useEffect(() => {
    setSummary('');
    setError('');
    setIsLoadingSummary(false);
  }, [neo]);

  const avgDiameterKm = (neo.estimated_diameter.kilometers.estimated_diameter_min + neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl font-bold text-cyan-300 tracking-wide">{neo.name}</h2>
          {neo.is_potentially_hazardous_asteroid && (
            <span className="text-sm font-semibold bg-red-500/20 text-red-300 px-2 py-1 rounded-full flex items-center gap-1.5">
              <HazardIcon className="w-4 h-4" /> Potentially Hazardous
            </span>
          )}
        </div>
        <a 
          href={neo.nasa_jpl_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-1 mt-1"
        >
          View on JPL Database <LinkIcon className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700">
           <h3 className="text-xl font-semibold text-slate-200 mb-3">Key Information</h3>
           <div className="space-y-2 text-sm">
             <p><strong className="font-medium text-slate-400 w-36 inline-block">Avg. Diameter:</strong> {avgDiameterKm.toFixed(2)} km</p>
             <p><strong className="font-medium text-slate-400 w-36 inline-block">Magnitude:</strong> {neo.absolute_magnitude_h} h</p>
             <p><strong className="font-medium text-slate-400 w-36 inline-block">Sentry Object:</strong> {neo.is_sentry_object ? 'Yes' : 'No'}</p>
           </div>
        </div>
        <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700 flex flex-col">
          <h3 className="text-xl font-semibold text-slate-200 mb-3">Gemini AI Summary</h3>
          <div className="flex-grow">
            {isLoadingSummary && (
              <div className="flex items-center gap-2 text-slate-400">
                <LoadingIcon className="w-5 h-5 animate-spin" />
                <span>Generating insights...</span>
              </div>
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {summary && <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>}
          </div>
          <button
            onClick={handleGenerateSummary}
            disabled={isLoadingSummary}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-5 h-5" />
            {isLoadingSummary ? 'Analyzing...' : 'Generate AI Summary'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-slate-900/70 p-4 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-3">Close Approach Visual</h3>
          <OrbitalDiagram 
            missDistanceKm={parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || '0')} 
            isHazardous={neo.is_potentially_hazardous_asteroid}
          />
        </div>
        <div className="md:col-span-3 bg-slate-900/70 p-4 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-3">Close Approach History</h3>
          <p className="text-xs text-slate-500 mb-4">Miss distance from Earth over time.</p>
          <div className="w-full h-56">
            <CloseApproachChart data={neo.close_approach_data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoDetail;
