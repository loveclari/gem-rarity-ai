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
  { id: 'carat1-030-039', value: '0.30-0.39', label: '0.30-0.39' },
  { id: 'carat1-040-049', value: '0.40-0.49', label: '0.40-0.49' },
  { id: 'carat1-050-069', value: '0.50-0.69', label: '0.50-0.69' },
  { id: 'carat-100-149', value: '1.00-1.49', label: '1.00-1.49' },
  { id: 'carat-150-199', value: '1.50-1.99', label: '1.50-1.99' },
  { id: 'carat-200', value: '200', label: '2.00+' },
  { id: 'carat2-030-039', value: '0.30-0.39', label: '0.30-0.39' },
  { id: 'carat2-040-049', value: '0.40-0.49', label: '0.40-0.49' },
  { id: 'carat2-050-069', value: '0.50-0.69', label: '0.50-0.69' },
];

export default function CaratSelector({ onCaratSelect, selectedCarat, selectedShape, isOpen, onToggle }: CaratSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCaratClick = (carat: string) => {
    if (selectedCarat === carat) {
      onCaratSelect('');
    } else {
      onCaratSelect(carat);
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
        className={`header ${selectedCarat ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span>CARAT WEIGHT</span>
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
                className={`slider-item ${selectedCarat === carat.value ? 'selected' : ''}`}
                onClick={() => handleCaratClick(carat.value)}
              >
                <div 
                  className="carat-image"
                  style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
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
        
        <p className="info">
          Carat weight refers to the measurement of a diamond&apos;s weight.
        </p>
      </div>
    </div>
  );
} 