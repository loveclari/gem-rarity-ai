'use client';

import { useState, useRef } from 'react';

interface CaratSelectorProps {
  onCaratSelect: (carat: string) => void;
  selectedCarat: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const caratRanges = [
  { id: '0.30-0.39', value: '0.30-0.39', label: '0.30-0.39' },
  { id: '0.40-0.49', value: '0.40-0.49', label: '0.40-0.49' },
  { id: '0.50-0.69', value: '0.50-0.69', label: '0.50-0.69' },
  { id: '1.00-1.49', value: '1.00-1.49', label: '1.00-1.49' },
  { id: '1.50-1.99', value: '1.50-1.99', label: '1.50-1.99' },
  { id: '2.00+', value: '2.00+', label: '2.00+' },
];

export default function CaratSelector({ onCaratSelect, selectedCarat, selectedShape, isOpen, onToggle }: CaratSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCaratClick = (carat: string) => {
    console.log('Carat clicked:', carat);
    if (selectedCarat === carat) {
      onCaratSelect('');
    } else {
      onCaratSelect(carat);
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

  const getBackgroundImage = () => {
    if (!selectedShape) return null;
    return `/img/${selectedShape.toLowerCase()}-only.png`;
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="accordion-section">
      <div 
        className={`header ${selectedCarat ? 'active' : ''}`}
        onClick={handleHeaderClick}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">CARAT WEIGHT</span>
        {selectedCarat && <span className="gem-shape">{selectedCarat}</span>}
        <i className="fa fa-info-circle"></i>
      </div>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className="slider-container">
          <div className="chevron-left" onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          
          <div className="slider carat" ref={sliderRef}>
            {caratRanges.map((carat, index) => (
              <div
                key={carat.id}
                className={`box${index + 1} box ${selectedCarat === carat.value ? 'selected' : ''}`}
                onClick={() => handleCaratClick(carat.value)}
              >
                <div
                  className="carat-image"
                  style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="carat-text">{carat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="description-text">
          <p>Carat weight refers to the measurement of a diamond&apos;s weight.</p>
        </div>
      </div>
    </div>
  );
} 