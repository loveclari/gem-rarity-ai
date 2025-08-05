'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ShapeSelector from '@/components/ShapeSelector';
import CaratSelector from '@/components/CaratSelector';
import ClaritySelector from '@/components/ClaritySelector';
import ColorSelector from '@/components/ColorSelector';
import CutSelector from '@/components/CutSelector';
import AIAnalysis from '@/components/AIAnalysis';
import { SelectionState, RarityResult, GemData } from '@/types';
import {
  calculateRarity,
  getGemData,
  getRarityDescription
} from '@/lib/rarity';

export default function Home() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selections, setSelections] = useState<SelectionState>({
    selectedShape: null,
    selectedCarat: null,
    selectedClarity: null,
    selectedColor: null,
    selectedCut: null,
  });
  const [rarityResult, setRarityResult] = useState<RarityResult | null>(null);
  const [gemData, setGemData] = useState<GemData[]>([]);

  useEffect(() => {
    // Load gem data
    const data = getGemData();
    setGemData(data);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleShapeSelect = (shape: string) => {
    const newSelections = { ...selections, selectedShape: shape };
    setSelections(newSelections);
    updateRarity(newSelections);
  };

  const handleCaratSelect = (carat: string) => {
    const newSelections = { ...selections, selectedCarat: carat };
    setSelections(newSelections);
    updateRarity(newSelections);
  };

  const handleClaritySelect = (clarity: string) => {
    const newSelections = { ...selections, selectedClarity: clarity };
    setSelections(newSelections);
    updateRarity(newSelections);
  };

  const handleColorSelect = (color: string) => {
    const newSelections = { ...selections, selectedColor: color };
    setSelections(newSelections);
    updateRarity(newSelections);
  };

  const handleCutSelect = (cut: string) => {
    const newSelections = { ...selections, selectedCut: cut };
    setSelections(newSelections);
    updateRarity(newSelections);
  };

  const updateRarity = (currentSelections: SelectionState) => {
    if (currentSelections.selectedShape && 
        currentSelections.selectedCarat && 
        currentSelections.selectedClarity && 
        currentSelections.selectedColor && 
        currentSelections.selectedCut) {
      
      const result = calculateRarity(
        currentSelections.selectedShape,
        currentSelections.selectedCarat,
        currentSelections.selectedClarity,
        currentSelections.selectedColor,
        currentSelections.selectedCut,
        gemData
      );
      setRarityResult(result);
    } else {
      setRarityResult(null);
    }
  };

  const clearSelections = () => {
    setSelections({
      selectedShape: null,
      selectedCarat: null,
      selectedClarity: null,
      selectedColor: null,
      selectedCut: null,
    });
    setRarityResult(null);
  };

  const getSelectedValues = () => {
    const values = [];
    if (selections.selectedShape) values.push(selections.selectedShape);
    if (selections.selectedCarat) values.push(selections.selectedCarat);
    if (selections.selectedClarity) values.push(selections.selectedClarity);
    if (selections.selectedColor) values.push(selections.selectedColor);
    if (selections.selectedCut) values.push(selections.selectedCut);
    return values.join(', ');
  };

  const hasAllSelections = selections.selectedShape && 
                          selections.selectedCarat && 
                          selections.selectedClarity && 
                          selections.selectedColor && 
                          selections.selectedCut;

  return (
    <div id="grid">
      <div className="main">
        <Image src="/img/gia-logo.png" alt="GIA Logo" width={200} height={60} />
        <h1>Welcome to the GIA Rarity App</h1>
        <h2>Start by selecting a dimension and value.</h2>
        <div className="big-diamond-blink"></div>
        <div className="footnote-main">
          <div className="diamond-img"></div>
          <div className="diamond-text">
            <p className="your-diamond">Your diamond</p>
            <p className="make-select">
              {getSelectedValues() || 'Make a selection'}
            </p>
          </div>
          <div className="slidecontainer">
            {rarityResult && (
              <div>
                <p className="range-paragraph">RARITY</p>
                <div className="break"></div>
                <p className="rare-data">{rarityResult.ratio}</p>
                <p className="description">{rarityResult.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <form className="accordion">
        <ShapeSelector 
          onShapeSelect={handleShapeSelect}
          selectedShape={selections.selectedShape}
          isOpen={openSection === 'shape'}
          onToggle={() => toggleSection('shape')}
        />
        
        <CaratSelector 
          onCaratSelect={handleCaratSelect}
          selectedCarat={selections.selectedCarat}
          selectedShape={selections.selectedShape}
          isOpen={openSection === 'carat'}
          onToggle={() => toggleSection('carat')}
        />
        
        <ClaritySelector 
          onClaritySelect={handleClaritySelect}
          selectedClarity={selections.selectedClarity}
          selectedShape={selections.selectedShape}
          isOpen={openSection === 'clarity'}
          onToggle={() => toggleSection('clarity')}
        />
        
        <ColorSelector 
          onColorSelect={handleColorSelect}
          selectedColor={selections.selectedColor}
          isOpen={openSection === 'color'}
          onToggle={() => toggleSection('color')}
        />
        
        <CutSelector 
          onCutSelect={handleCutSelect}
          selectedCut={selections.selectedCut}
          isOpen={openSection === 'cut'}
          onToggle={() => toggleSection('cut')}
        />
        
        {hasAllSelections && (
          <div className="clear-button">
            <button onClick={clearSelections}>
              Clear Selections
            </button>
          </div>
        )}
        
        <div className="footnote">
          <p>
            © 2023 Gemological Institute of America Inc. GIA is a
            nonprofit 501(c)(3) organization. All rights reserved.
          </p>
        </div>
      </form>

      {/* AI Analysis Component */}
      <AIAnalysis selections={selections} />
    </div>
  );
}
