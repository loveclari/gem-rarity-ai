'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ShapeSelector from '@/components/ShapeSelector';
import CaratSelector from '@/components/CaratSelector';
import ClaritySelector from '@/components/ClaritySelector';
import ColorSelector from '@/components/ColorSelector';
import CutSelector from '@/components/CutSelector';
import AIAnalysis from '@/components/AIAnalysis';
import { SelectionState, RarityResult } from '@/types';

export default function Home() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [analysisKey, setAnalysisKey] = useState(0);
  const [selections, setSelections] = useState<SelectionState>({
    selectedShape: null,
    selectedCarat: null,
    selectedClarity: null,
    selectedColor: null,
    selectedCut: null,
  });
  const [rarityResult, setRarityResult] = useState<RarityResult | null>(null);
  const rarityRequest = useRef<AbortController | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const applySelection = (newSelections: SelectionState) => {
    setSelections(newSelections);
    updateRarity(newSelections);
    if (
      newSelections.selectedShape &&
      newSelections.selectedCarat &&
      newSelections.selectedClarity &&
      newSelections.selectedColor &&
      newSelections.selectedCut
    ) {
      setOpenSection(null);
    }
  };

  const handleShapeSelect = (shape: string) => {
    applySelection({ ...selections, selectedShape: shape });
  };

  const handleCaratSelect = (carat: string) => {
    applySelection({ ...selections, selectedCarat: carat });
  };

  const handleClaritySelect = (clarity: string) => {
    applySelection({ ...selections, selectedClarity: clarity });
  };

  const handleColorSelect = (color: string) => {
    applySelection({ ...selections, selectedColor: color });
  };

  const handleCutSelect = (cut: string) => {
    applySelection({ ...selections, selectedCut: cut });
  };

  const updateRarity = async (currentSelections: SelectionState) => {
    const hasSelection = Boolean(
      currentSelections.selectedShape ||
        currentSelections.selectedCarat ||
        currentSelections.selectedClarity ||
        currentSelections.selectedColor ||
        currentSelections.selectedCut,
    );

    rarityRequest.current?.abort();

    if (!hasSelection) {
      setRarityResult(null);
      return;
    }

    const controller = new AbortController();
    rarityRequest.current = controller;

    try {
      const response = await fetch('/api/rarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSelections),
        signal: controller.signal,
      });
      if (!response.ok) return;
      const data = (await response.json()) as { result?: RarityResult | null };
      setRarityResult(data.result ?? null);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
  };

  const clearSelections = () => {
    rarityRequest.current?.abort();
    setSelections({
      selectedShape: null,
      selectedCarat: null,
      selectedClarity: null,
      selectedColor: null,
      selectedCut: null,
    });
    setRarityResult(null);
    setOpenSection(null);
    setAnalysisKey((key) => key + 1);
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

  const hasAnySelection = Boolean(
    selections.selectedShape ||
      selections.selectedCarat ||
      selections.selectedClarity ||
      selections.selectedColor ||
      selections.selectedCut,
  );

  return (
    <div id="grid">
      <div className="main">
        <Image src="/img/gia-logo.png" alt="GIA Logo" width={200} height={60} />
        <h1>Welcome to the GIA Rarity App</h1>
        <h2>Start by selecting a dimension and value.</h2>
        <div className="hero-stage">
          <div className="big-diamond-blink"></div>
        </div>
        <div className="footnote-main">
          <div className="diamond-img"></div>
          <div className="diamond-text">
            <p className="your-diamond">Your diamond</p>
            <p className="make-select">
              {getSelectedValues() || 'Make a selection'}
            </p>
          </div>
          <div className={`slidecontainer${rarityResult ? ' has-rarity' : ''}`}>
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
          selectedShape={selections.selectedShape}
          isOpen={openSection === 'color'}
          onToggle={() => toggleSection('color')}
        />
        
        <CutSelector 
          onCutSelect={handleCutSelect}
          selectedCut={selections.selectedCut}
          selectedShape={selections.selectedShape}
          isOpen={openSection === 'cut'}
          onToggle={() => toggleSection('cut')}
        />
        
        <AIAnalysis key={analysisKey} selections={selections} />

        {hasAnySelection && (
          <div className="clear-button">
            <button type="button" onClick={clearSelections}>
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
    </div>
  );
}
