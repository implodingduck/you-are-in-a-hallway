import './GameGrid.css';

import React, { useState, useEffect, useCallback } from 'react';
import HeroToken from './HeroToken.jsx';
import EnemyToken from './EnemyToken.jsx';
import GameOver from './GameOver.jsx';
import HeroHealth from './HeroHealth.jsx';
import { getDirectionFromClick, logicHighlightCells } from '../utils/gameUtils.js';
import { PHASES } from '../models/Constants.js';

export default function GameGrid({ grid, gridSize, hero, enemies, phase, nextPhase, handleOnMove, handleOnAim, shoot, bullets, score, isDamaged, resetGame, isGameOver }) {

    // Calculate cells to highlight in hero's line of sight
    const getHighlightedCells = useCallback(() => {
        // add call to logicHighlightCells
        
        return logicHighlightCells(phase, hero, grid, gridSize)

    }, [phase, hero.direction, hero.x, hero.y]);

    return (
        <div className="game-grid" data-phase={phase}>
                {isGameOver && (
                    <GameOver
                        resetGame={resetGame}
                        score={score} />
                )}
                <HeroHealth currentHealth={hero.currenthealth} maxHealth={hero.maxhealth} />
                {grid.map((row, y) => (
                    <div key={y} className="grid-row">
                        {row.map((_, x) => {
                            const isHero = hero.x === x && hero.y === y;
                            const isEnemy = enemies.some(e => e.x === x && e.y === y);
                            const isBullet = bullets.some(b => Math.floor(b.x) === x && Math.floor(b.y) === y);
                            const isHighlighted = getHighlightedCells().some(cell => cell.x === x && cell.y === y);

                            const isWall = grid[y][x] === 'wall';
                            return (
                                <div
                                    key={`${x}-${y}`}
                                    className={`grid-cell ${isHighlighted ? 'highlighted' : ''} ${isWall ? 'wall' : ''}`}
                                    onClick={() => {
                                        if (phase === PHASES.HERO_ACTION) {
                                            const direction = getDirectionFromClick(hero.x, hero.y, x, y);
                                            if (direction !== hero.direction) {
                                                handleOnAim(direction);
                                            } else {
                                                shoot(); // Shoot if clicked on the same direction
                                            }
                                        } else if (phase === PHASES.HERO_MOVE && isHighlighted) {
                                            const direction = getDirectionFromClick(hero.x, hero.y, x, y);
                                            if (direction) {
                                                handleOnMove(direction);
                                            }else if(hero.x === x && hero.y === y) {
                                                // If clicked on hero's position, skip to next phase
                                                nextPhase();
                                            }
                                        }
                                    }}
                                >
                                    {isHero && <HeroToken hero={hero} phase={phase} onMove={(direction) => {
                                        handleOnMove(direction);
                                    }} className={isDamaged ? 'hero-damaged' : ''} />}
                                    {isEnemy && <EnemyToken enemy={{ x, y }} />}
                                    {isBullet && <div className="bullet">•</div>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
    );
}