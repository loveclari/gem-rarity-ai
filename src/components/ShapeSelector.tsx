'use client';

import { useState, useRef } from 'react';

interface ShapeSelectorProps {
  onShapeSelect: (shape: string) => void;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const shapes = [
  { id: 'pear', name: 'Pear', dataId: 'Pear', image: '/img/Pear.png' },
  { id: 'Round', name: 'Round', dataId: 'Round', image: '/img/round-only.png' },
  { id: 'heart', name: 'Heart', dataId: 'Heart', image: '/img/heart-only.png' },
  { id: 'marquise', name: 'Marquise', dataId: 'Marquise', image: '/img/Marquise.png' },
  { id: 'cushion', name: 'Cushion', dataId: 'Cushion', image: '/img/cushion-only.png' },
  { id: 'oval', name: 'Oval', dataId: 'Oval', image: '/img/Oval.png' },
  { id: 'square', name: 'Square', dataId: 'Square', image: '/img/square-only.png' },
  { id: 'emerald', name: 'Emerald', dataId: 'Emerald', image: '/img/emerald-only.png' },
  { id: 'rectangle', name: 'Rectangle', dataId: 'Rectangle', image: '/img/rectangle-only.png' },
];

export default function ShapeSelector({ onShapeSelect, selectedShape, isOpen, onToggle }: ShapeSelectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleShapeClick = (shape: string) => {
    console.log('Shape clicked:', shape);
    if (selectedShape === shape) {
      onShapeSelect('');
    } else {
      onShapeSelect(shape);
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
        className={`header ${selectedShape ? 'active' : ''}`}
        onClick={handleHeaderClick}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">SHAPE</span>
        {selectedShape && <span className="gem-shape">{selectedShape}</span>}
        <i className="fa fa-info-circle"></i>
      </div>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className="slider-container">
          <div className="chevron-left" onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          
          <div className="slider shape" ref={sliderRef}>
            {shapes.map((shape, index) => (
              <div
                key={shape.id}
                className={`box${index + 1} box ${selectedShape === shape.dataId ? 'selected' : ''}`}
                onClick={() => handleShapeClick(shape.dataId)}
              >
                <div 
                  className="shape-image"
                  style={{
                    backgroundImage: `url(${shape.image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="shape-text">{shape.name}</div>
              </div>
            ))}
          </div>
          
          <div className="chevron-right" onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="description-text">
          <p>Shape refers to the geometric outline and overall physical form of a diamond.</p>
        </div>
      </div>
    </div>
  );
} 