'use client';

import { useState, useRef } from 'react';

interface CutSelectorProps {
  onCutSelect: (cut: string) => void;
  selectedCut: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const cutGrades = [
  { id: 'Poor-1', value: 'Poor', label: 'Poor' },
  { id: 'Fair-1', value: 'Fair', label: 'Fair' },
  { id: 'Good-1', value: 'Good', label: 'Good' },
  { id: 'Very-Good-1', value: 'Very Good', label: 'Very Good' },
  { id: 'Excellent', value: 'Excellent', label: 'Excellent' },
  { id: 'Very-Good-2', value: 'Very Good', label: 'Very Good' },
  { id: 'Good-2', value: 'Good', label: 'Good' },
  { id: 'Fair-2', value: 'Fair', label: 'Fair' },
  { id: 'Poor-2', value: 'Poor', label: 'Poor' },
];

export default function CutSelector({ onCutSelect, selectedCut, isOpen, onToggle }: CutSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCutClick = (cut: string) => {
    if (selectedCut === cut) {
      onCutSelect('');
    } else {
      onCutSelect(cut);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="accordion-section">
      <div 
        className={`header ${selectedCut ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span>CUT</span>
        {selectedCut && <span className="gem-shape">{selectedCut}</span>}
        <i className="fa fa-info-circle"></i>
      </div>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className="slider-container">
          <div className="chevron-left" onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          
          <div className="slider cut" ref={sliderRef}>
            {cutGrades.map((cut, index) => (
              <div
                key={cut.id}
                className={`slider-item ${selectedCut === cut.value ? 'selected' : ''}`}
                onClick={() => handleCutClick(cut.value)}
              >
                <div className="cut-image">
                  <div className="cut-grade">{cut.label}</div>
                </div>
                <div className="cut-text">{cut.label}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <p className="info">
          Cut refers to how well a diamond&apos;s facets interact with light.
        </p>
      </div>
    </div>
  );
} 