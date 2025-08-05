'use client';

import { useState, useRef } from 'react';

interface ClaritySelectorProps {
  onClaritySelect: (clarity: string) => void;
  selectedClarity: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const clarityGrades = [
  { id: 'FL', value: 'FL', label: 'FL' },
  { id: 'IF', value: 'IF', label: 'IF' },
  { id: 'VVS1', value: 'VVS1', label: 'VVS1' },
  { id: 'VVS2', value: 'VVS2', label: 'VVS2' },
  { id: 'VS1', value: 'VS1', label: 'VS1' },
  { id: 'VS2', value: 'VS2', label: 'VS2' },
  { id: 'SI1', value: 'SI1', label: 'SI1' },
  { id: 'SI2', value: 'SI2', label: 'SI2' },
  { id: 'I1', value: 'I1', label: 'I1' },
  { id: 'I2', value: 'I2', label: 'I2' },
  { id: 'I3', value: 'I3', label: 'I3' },
];

export default function ClaritySelector({ onClaritySelect, selectedClarity, selectedShape, isOpen, onToggle }: ClaritySelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleClarityClick = (clarity: string) => {
    if (selectedClarity === clarity) {
      onClaritySelect('');
    } else {
      onClaritySelect(clarity);
    }
  };

  const getBackgroundImage = () => {
    if (!selectedShape) return '';
    
    const shapeImages: { [key: string]: string } = {
      'Round': '/img/Round.png',
      'Square': '/img/Square.png',
      'Heart': '/img/Heart.png',
      'Cushion': '/img/Cushion.png',
      'Oval': '/img/Oval.png',
      'Rectangle': '/img/Rectangle.png',
      'Emerald': '/img/Emerald.png',
      'Pear': '/img/Pear.png',
      'Marquise': '/img/Marquise.png',
    };
    
    return shapeImages[selectedShape] || '';
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

  const backgroundImage = getBackgroundImage();

  return (
    <div className="accordion-section">
      <div 
        className={`header ${selectedClarity ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span>CLARITY</span>
        {selectedClarity && <span className="gem-shape">{selectedClarity}</span>}
        <i className="fa fa-info-circle"></i>
      </div>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className="slider-container">
          <div className="chevron-left" onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          
          <div className="slider clarity" ref={sliderRef}>
            {clarityGrades.map((clarity, index) => (
              <div
                key={clarity.id}
                className={`slider-item ${selectedClarity === clarity.value ? 'selected' : ''}`}
                onClick={() => handleClarityClick(clarity.value)}
              >
                <div 
                  className="clarity-image"
                  style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
                  }}
                />
                <div className="clarity-text">{clarity.label}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <p className="info">
          Minor inclusions that range from difficult to somewhat easy to see are visible to a skilled grader at 10x.
        </p>
      </div>
    </div>
  );
} 