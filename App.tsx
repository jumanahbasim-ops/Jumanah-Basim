import React, { useState, useEffect } from 'react';
import type { Neo } from './types';
import { nearEarthObjects } from './data/neoData';
import NeoList from './components/NeoList';
import NeoDetail from './components/NeoDetail';
import { LoadingIcon, LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [neos, setNeos] = useState<Neo[]>([]);
  const [selectedNeo, setSelectedNeo] = useState<Neo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setNeos(nearEarthObjects);
      setSelectedNeo(nearEarthObjects[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSelectNeo = (neo: Neo) => {
    setSelectedNeo(neo);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-10 h-10 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">
                NEO Explorer
              </h1>
              <p className="text-slate-400">
                Browse Near-Earth Objects provided by NASA's NeoWs API
              </p>
            </div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center gap-4">
            <LoadingIcon className="w-12 h-12 animate-spin text-cyan-500" />
            <p className="text-lg text-slate-400">Loading Asteroid Data...</p>
          </div>
        </div>
      ) : (
        <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-90px)]">
          <div className="lg:col-span-1 overflow-y-auto bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <NeoList
              neos={neos}
              selectedNeo={selectedNeo}
              onSelectNeo={handleSelectNeo}
            />
          </div>
          <div className="lg:col-span-2 overflow-y-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            {selectedNeo ? (
              <NeoDetail neo={selectedNeo} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-slate-500">Select an asteroid to see details</p>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default App;