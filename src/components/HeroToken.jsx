import { useState } from 'react';
import './HeroToken.css';

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};

export default function HeroToken({ hero, phase, onMove }) {
    return (
        <div className="hero-container">
            <div className={`hero hero-${hero.direction.toLowerCase()}`} title={JSON.stringify(hero)}>
                <span>H</span>
            </div>
            {phase === 'HERO_MOVE' && (
                <div className="hero-controls">
                    <button 
                        className="direction-btn up" 
                        onClick={() => onMove('UP')}
                        title="Move Up"
                    >↑</button>
                    <button 
                        className="direction-btn right" 
                        onClick={() => onMove('RIGHT')}
                        title="Move Right"
                    >→</button>
                    <button 
                        className="direction-btn down" 
                        onClick={() => onMove('DOWN')}
                        title="Move Down"
                    >↓</button>
                    <button 
                        className="direction-btn left" 
                        onClick={() => onMove('LEFT')}
                        title="Move Left"
                    >←</button>
                </div>
            )}
        </div>
    );
}