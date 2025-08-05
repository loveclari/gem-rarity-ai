'use client';

import { useState, useRef } from 'react';

interface CutSelectorProps {
  onCutSelect: (cut: string) => void;
  selectedCut: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const cutGrades = [
  { id: 'Excellent', value: 'Excellent', label: 'Excellent' },
  { id: 'Very Good', value: 'Very Good', label: 'Very Good' },
  { id: 'Good', value: 'Good', label: 'Good' },
  { id: 'Fair', value: 'Fair', label: 'Fair' },
  { id: 'Poor', value: 'Poor', label: 'Poor' },
];

export default function CutSelector({ onCutSelect, selectedCut, isOpen, onToggle }: CutSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCutClick = (cut: string) => {
    console.log('Cut clicked:', cut);
    if (selectedCut === cut) {
      onCutSelect('');
    } else {
      onCutSelect(cut);
    }
  };

  const handleHeaderClick = () => {
    console.log('Header clicked, isOpen:', isOpen);
    onToggle();
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
        onClick={handleHeaderClick}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">CUT</span>
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
                className={`box${index + 1} box ${selectedCut === cut.value ? 'selected' : ''}`}
                onClick={() => handleCutClick(cut.value)}
              >
                <div className="cut-image">
                  <span className="cut-grade">{cut.label}</span>
                </div>
                <div className="cut-text">{cut.label}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="description-text">
          <p>Cut refers to how well a diamond&apos;s facets interact with light.</p>
        </div>
      </div>
    </div>
  );
} 