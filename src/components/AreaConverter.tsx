import React, { useState, ChangeEvent } from 'react';
import SaarlandIcon from './SaarlandIcon';
import FussballfeldIcon from './FussballfeldIcon';

const SAARLAND_AREA_M2 = 2569690000; // 2.569,69 km²

const METRIC_UNITS = {
  'mm²': 0.000001,
  'cm²': 0.0001,
  'm²': 1,
  'ha': 10000, // Hektar
  'km²': 1000000,
  'Fußballfeld': 7140, // Standard-Fußballfeld
  'Saarland': 2569690000, // Fläche des Saarlandes
};

const IMPERIAL_UNITS = {
  'in²': 0.00064516, // square inches
  'ft²': 0.092903, // square feet
  'yd²': 0.836127, // square yards
  'ac': 4046.86, // acres
  'mi²': 2589988.11, // square miles
};

type UnitSystem = 'metric' | 'imperial';
type MetricUnit = keyof typeof METRIC_UNITS;
type ImperialUnit = keyof typeof IMPERIAL_UNITS;
type Unit = MetricUnit | ImperialUnit;

type DisplayMode = 'saarland' | 'fussballfeld';

const AreaConverter: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<Unit>('km²');
  const [saarlandValue, setSaarlandValue] = useState<number>(0);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('saarland');

  const getCurrentUnits = (): Record<string, number> => {
    return unitSystem === 'metric' ? METRIC_UNITS : IMPERIAL_UNITS;
  };

  const calculateSaarland = (value: number, unit: Unit) => {
    const units = getCurrentUnits();
    const areaInM2 = value * units[unit];
    const saarlandUnits = areaInM2 / SAARLAND_AREA_M2;
    setSaarlandValue(saarlandUnits);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Begrenze auf maximal 15 Ziffern
    if (value.length > 15) {
      return;
    }
    
    setInputValue(value);
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      calculateSaarland(numValue, selectedUnit);
    } else {
      setSaarlandValue(0);
    }
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value as Unit;
    setSelectedUnit(unit);
    
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0) {
      calculateSaarland(numValue, unit);
    }
  };

  const handleSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
    const defaultUnit: Unit = system === 'metric' ? 'km²' : 'ft²';
    setSelectedUnit(defaultUnit);
    
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0) {
      const units = system === 'metric' ? METRIC_UNITS : IMPERIAL_UNITS;
      const areaInM2 = numValue * (units as Record<string, number>)[defaultUnit];
      const saarlandUnits = areaInM2 / SAARLAND_AREA_M2;
      setSaarlandValue(saarlandUnits);
    } else {
      setSaarlandValue(0);
    }
  };

  const formatSaarlandValue = (value: number): string => {
    if (value === 0) return '0';
    if (value < 0.000001) return value.toExponential(2);
    if (value < 0.01) return value.toFixed(8);
    if (value < 1) return value.toFixed(6);
    if (value < 100) return value.toFixed(4);
    return value.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  };

  const getDisplayValue = (): string => {
    if (displayMode === 'saarland') {
      return formatSaarlandValue(saarlandValue);
    } else {
      // Umrechnung zu Fußballfeldern (1 Saarland = 2.569.690.000 m² / 7.140 m² = ~359.875 Fußballfelder)
      const fussballfelder = saarlandValue * (SAARLAND_AREA_M2 / 7140);
      return formatSaarlandValue(fussballfelder);
    }
  };

  const getDisplayLabel = (): string => {
    if (displayMode === 'saarland') {
      return saarlandValue === 1 ? 'Saarland' : 'Saarländer';
    } else {
      const fussballfelder = saarlandValue * (SAARLAND_AREA_M2 / 7140);
      return fussballfelder === 1 ? 'Fußballfeld' : 'Fußballfelder';
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'saarland' ? 'fussballfeld' : 'saarland');
  };

  const renderShapes = () => {
    if (saarlandValue === 0) return null;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const maxShapes = isMobile ? 20 : 30;

    if (displayMode === 'saarland') {
      const fullSaarlands = Math.floor(saarlandValue);
      const partialSaarland = saarlandValue - fullSaarlands;
      const shapesToShow = Math.min(fullSaarlands, maxShapes);
      
      const shapes = [];
      
      // Volle Saarländer mit gestaffelter Animation
      for (let i = 0; i < shapesToShow; i++) {
        shapes.push(
          <div 
            key={`full-${i}`} 
            className="saarland-animate"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <SaarlandIcon />
          </div>
        );
      }
      
      // Partielles Saarland
      if (partialSaarland > 0 && fullSaarlands < maxShapes) {
        shapes.push(
          <div 
            key="partial" 
            className="saarland-animate"
            style={{ animationDelay: `${shapesToShow * 0.05}s` }}
          >
            <SaarlandIcon partial opacity={partialSaarland} />
          </div>
        );
      }

      // Wenn mehr als maxShapes, zeige +X an
      if (fullSaarlands > maxShapes) {
        shapes.push(
          <div 
            key="more" 
            className="text-2xl sm:text-3xl font-bold flex items-center saarland-animate"
            style={{ animationDelay: `${maxShapes * 0.05}s` }}
          >
            +{fullSaarlands - maxShapes}
          </div>
        );
      }
      
      return shapes;
    } else {
      // Fußballfelder
      const fussballfelder = saarlandValue * (SAARLAND_AREA_M2 / 7140);
      const fullFelder = Math.floor(fussballfelder);
      const partialFeld = fussballfelder - fullFelder;
      const shapesToShow = Math.min(fullFelder, maxShapes);
      
      const shapes = [];
      
      // Volle Fußballfelder
      for (let i = 0; i < shapesToShow; i++) {
        shapes.push(
          <div 
            key={`full-${i}`} 
            className="saarland-animate"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <FussballfeldIcon />
          </div>
        );
      }
      
      // Partielles Fußballfeld
      if (partialFeld > 0 && fullFelder < maxShapes) {
        shapes.push(
          <div 
            key="partial" 
            className="saarland-animate"
            style={{ animationDelay: `${shapesToShow * 0.05}s` }}
          >
            <FussballfeldIcon partial opacity={partialFeld} />
          </div>
        );
      }

      // Wenn mehr als maxShapes
      if (fullFelder > maxShapes) {
        shapes.push(
          <div 
            key="more" 
            className="text-2xl sm:text-3xl font-bold flex items-center saarland-animate"
            style={{ animationDelay: `${maxShapes * 0.05}s` }}
          >
            +{Math.floor(fullFelder - maxShapes)}
          </div>
        );
      }
      
      return shapes;
    }
  };  

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Linke Seite - Eingabe */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white p-4 sm:p-6 md:p-12 flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 md:px-16 lg:px-24">
        <input
          type="number"
          min="0"
          step="any"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Fläche eingeben..."
          className="w-full px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl md:text-2xl border-2 border-black focus:outline-none"
        />

        <div className="flex gap-2 sm:gap-3">
          <select
            value={selectedUnit}
            onChange={handleUnitChange}
            className="flex-1 px-3 py-3 sm:px-6 sm:py-4 text-base sm:text-lg md:text-xl border-2 border-black focus:outline-none appearance-none bg-white"
          >
            {Object.keys(getCurrentUnits()).map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleSystemChange(unitSystem === 'metric' ? 'imperial' : 'metric')}
            className="px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg md:text-xl border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            {unitSystem === 'metric' ? 'M' : 'I'}
          </button>
        </div>

        <div className="text-center pt-2 sm:pt-4 md:pt-6">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3">
            {getDisplayValue()}
          </div>
          <button 
            onClick={toggleDisplayMode}
            className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors cursor-pointer focus:outline-none"
          >
            {getDisplayLabel()}
          </button>
        </div>
      </div>

      {/* Rechte Seite - Visualisierung */}
      <div className="w-full md:w-1/2 flex-1 md:h-full bg-yellow-300 p-4 sm:p-6 md:p-12 flex items-center justify-center overflow-y-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center w-full h-full content-center">
          {renderShapes()}
        </div>
      </div>
    </div>
  );
};

export default AreaConverter;
