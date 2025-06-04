import { useState } from 'react';
import './HeroToken.css';

const MAX_GRID_SIZE = 10; // Assuming a maximum grid size of 10x10
const showcontrols = false;

export default function HeroToken({ hero, phase, onMove }) {
    return (
        <div className="hero-container">
            <div className={`hero hero-${hero.direction.toLowerCase()}`} title={JSON.stringify(hero)}>
                <span>H</span>
            </div>
            {phase === 'HERO_MOVE' && showcontrols && (
                <div className="hero-controls">
                    { hero.x > 0 && hero.y > 0 ? 
                    <button 
                        className="direction-btn up-left" 
                        onClick={() => onMove('UP_LEFT')}
                        title="Move Up Left"
                    >↖</button> : ""}
                    { hero.y > 0 ? 
                    <button 
                        className="direction-btn up" 
                        onClick={() => onMove('UP')}
                        title="Move Up"
                    >↑</button> : "" }
                    { hero.x < MAX_GRID_SIZE - 1 && hero.y > 0 ?
                    <button 
                        className="direction-btn up-right" 
                        onClick={() => onMove('UP_RIGHT')}
                        title="Move Up Right"
                    >↗</button> : "" }
                    { hero.x < MAX_GRID_SIZE - 1 ?
                    <button 
                        className="direction-btn right" 
                        onClick={() => onMove('RIGHT')}
                        title="Move Right"
                    >→</button> : "" }
                    { hero.x < MAX_GRID_SIZE - 1 && hero.y < MAX_GRID_SIZE - 1 ?
                    <button 
                        className="direction-btn down-right" 
                        onClick={() => onMove('DOWN_RIGHT')}
                        title="Move Down Right"
                    >↘</button> : "" }
                    { hero.y < MAX_GRID_SIZE - 1 ?
                    <button 
                        className="direction-btn down" 
                        onClick={() => onMove('DOWN')}
                        title="Move Down"
                    >↓</button> : "" }
                    { hero.x > 0 && hero.y < MAX_GRID_SIZE - 1 ?
                    <button 
                        className="direction-btn down-left" 
                        onClick={() => onMove('DOWN_LEFT')}
                        title="Move Down Left"
                    >↙</button>
                    : "" }
                    { hero.x > 0 ?
                    <button 
                        className="direction-btn left" 
                        onClick={() => onMove('LEFT')}
                        title="Move Left"
                    >←</button> : "" }
                </div>
            )}
        </div>
    );
}