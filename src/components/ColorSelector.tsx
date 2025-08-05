'use client';

import { useState, useRef } from 'react';

interface ColorSelectorProps {
  onColorSelect: (color: string) => void;
  selectedColor: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const colorGrades = [
  { id: 'D', value: 'D', label: 'D' },
  { id: 'E', value: 'E', label: 'E' },
  { id: 'F', value: 'F', label: 'F' },
  { id: 'G', value: 'G', label: 'G' },
  { id: 'H', value: 'H', label: 'H' },
  { id: 'I', value: 'I', label: 'I' },
  { id: 'J', value: 'J', label: 'J' },
  { id: 'K', value: 'K', label: 'K' },
  { id: 'L', value: 'L', label: 'L' },
  { id: 'M', value: 'M', label: 'M' },
  { id: 'N', value: 'N', label: 'N' },
  { id: 'O', value: 'O', label: 'O' },
];

export default function ColorSelector({ onColorSelect, selectedColor, isOpen, onToggle }: ColorSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleColorClick = (color: string) => {
    console.log('Color clicked:', color);
    if (selectedColor === color) {
      onColorSelect('');
    } else {
      onColorSelect(color);
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
        className={`header ${selectedColor ? 'active' : ''}`}
        onClick={handleHeaderClick}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">COLOR</span>
        {selectedColor && <span className="gem-shape">{selectedColor}</span>}
        <i className="fa fa-info-circle"></i>
      </div>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className="slider-container">
          <div className="chevron-left" onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          
          <div className="slider color" ref={sliderRef}>
            {colorGrades.map((color, index) => (
              <div
                key={color.id}
                className={`box${index + 1} box ${selectedColor === color.value ? 'selected' : ''}`}
                onClick={() => handleColorClick(color.value)}
              >
                <div className="color-image">
                  <span className="color-grade">{color.label}</span>
                </div>
                <div className="color-text">{color.label}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <p className="info">
          The diamond color evaluation of most gem-quality diamonds is based on the absence of color.
        </p>
      </div>
    </div>
  );
} 