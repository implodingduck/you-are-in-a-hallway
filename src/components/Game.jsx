import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

import HeroToken from './HeroToken.jsx';
import { use } from 'react';

const GRID_SIZE = 10;
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    UP_RIGHT: { x: 1, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN_RIGHT: { x: 1, y: 1 },
    DOWN: { x: 0, y: 1 },
    DOWN_LEFT: { x: -1, y: 1 },
    LEFT: { x: -1, y: 0 },
    UP_LEFT: { x: -1, y: -1 }
};

// Helper function to determine direction from click
const getDirectionFromClick = (heroX, heroY, clickX, clickY) => {
    const dx = Math.sign(clickX - heroX);
    const dy = Math.sign(clickY - heroY);

    // Map the dx/dy combinations to directions
    if (dx === 0 && dy === -1) return 'UP';
    if (dx === 1 && dy === -1) return 'UP_RIGHT';
    if (dx === 1 && dy === 0) return 'RIGHT';
    if (dx === 1 && dy === 1) return 'DOWN_RIGHT';
    if (dx === 0 && dy === 1) return 'DOWN';
    if (dx === -1 && dy === 1) return 'DOWN_LEFT';
    if (dx === -1 && dy === 0) return 'LEFT';
    if (dx === -1 && dy === -1) return 'UP_LEFT';
    return null;
};

/** @enum {string} */
const PHASES = Object.freeze({
    HERO_MOVE: 'HERO_MOVE',
    HERO_ACTION: 'HERO_ACTION',
    ENEMY_MOVE: 'ENEMY_MOVE',
    ENEMY_SPAWN: 'ENEMY_SPAWN',
    ENEMY_ACTION: 'ENEMY_ACTION'
});

// Array to define phase order
const PHASE_ORDER = Object.freeze([
    PHASES.HERO_MOVE,
    PHASES.HERO_ACTION,
    PHASES.ENEMY_MOVE,
    PHASES.ENEMY_SPAWN,
    PHASES.ENEMY_ACTION
]);

export default function Game() {
    const [grid, setGrid] = useState([]);
    const [hero, setHero] = useState({ x: 5, y: 5, direction: 'RIGHT' });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [bullets, setBullets] = useState([]);
    const [phase, setPhase] = useState(PHASES.HERO_MOVE);

    const nextPhase = useCallback(() => {
        setPhase(currentPhase => {
            const currentIndex = PHASE_ORDER.indexOf(currentPhase);
            const nextIndex = (currentIndex + 1) % PHASE_ORDER.length;
            return PHASE_ORDER[nextIndex];
        });
    }, []);

    // handle phase changes
    useEffect(() => {
        console.log(`Current phase: ${phase}`);
        switch (phase) {
            case PHASES.HERO_MOVE:
                break;
            case PHASES.HERO_ACTION:
                //shoot();
                break;
            case PHASES.ENEMY_MOVE:
                moveEnemies();
                nextPhase();
                break;
            case PHASES.ENEMY_SPAWN:
                spawnEnemy();
                nextPhase();
                break;
            case PHASES.ENEMY_ACTION:
                nextPhase();
                break;
            default:
                console.warn(`Unknown phase: ${phase}`);
                break;

        }
    }, [phase])

    const handleOnMove = (direction) => {
        if (phase !== PHASES.HERO_MOVE) return;
        moveHero(direction);
    };

    const handleOnAim = (direction) => {
        if (phase !== PHASES.HERO_ACTION) return; // Only aim during HERO_ACTION phase
        setHero(prev => ({
            ...prev,
            direction: direction
        }));
    };

    // Handle hero movement
    const moveHero = useCallback((direction) => {
        if (phase !== PHASES.HERO_MOVE) return; // Only move during HERO_MOVE phase
        setHero(prev => {
            const newPos = {
                x: prev.x + DIRECTIONS[direction].x,
                y: prev.y + DIRECTIONS[direction].y,
                direction: prev.direction
            };

            // Check if position is within grid bounds and not occupied by an enemy
            if (newPos.x >= 0 && newPos.x < GRID_SIZE &&
                newPos.y >= 0 && newPos.y < GRID_SIZE &&
                !enemies.some(enemy => enemy.x === newPos.x && enemy.y === newPos.y)) {
                return newPos;
            }
            //return { ...prev, direction }; // Only update direction if we can't move
            return { ...prev }
        });
        nextPhase();
    }, [hero, enemies, phase]); // Add enemies as a dependency


    // Move enemies towards hero
    const moveEnemies = useCallback(() => {
        setEnemies(prev => {
            // Process enemies one at a time to avoid conflicts
            const newEnemies = [...prev];

            // Not needed since all enemies move at once.
            // Shuffle array to randomize which enemies move first
            // for (let i = newEnemies.length - 1; i > 0; i--) {
            //     const j = Math.floor(Math.random() * (i + 1));
            //     [newEnemies[i], newEnemies[j]] = [newEnemies[j], newEnemies[i]];
            // }



            // return newEnemies.map(enemy => {
            //     const dx = Math.sign(hero.x - enemy.x);
            //     const dy = Math.sign(hero.y - enemy.y);

            //     // Try to move in x or y direction randomly
            //     const tryX = Math.random() < 0.5;
            //     let newX = enemy.x;
            //     let newY = enemy.y;

            //     if (tryX && dx !== 0) {
            //         newX = enemy.x + dx;
            //     } else if (dy !== 0) {
            //         newY = enemy.y + dy;
            //     }

            //     // Check if new position would collide with other enemies or hero
            //     const wouldCollide = (newX === hero.x && newY === hero.y) ||
            //         newEnemies.some(other => 
            //             other !== enemy && 
            //             other.x === newX && 
            //             other.y === newY
            //         );

            //     // If would collide, try other direction
            //     if (wouldCollide) {
            //         newX = enemy.x;
            //         newY = enemy.y;

            //         if (!tryX && dx !== 0) {
            //             newX = enemy.x + dx;
            //         } else if (dy !== 0) {
            //             newY = enemy.y + dy;
            //         }

            //         // Check again for collision
            //         const secondaryCollision = (newX === hero.x && newY === hero.y) ||
            //             newEnemies.some(other => 
            //                 other !== enemy && 
            //                 other.x === newX && 
            //                 other.y === newY
            //             );

            //         // If still would collide, stay in place
            //         if (secondaryCollision) {
            //             newX = enemy.x;
            //             newY = enemy.y;
            //         }
            //     }

            //     return {
            //         ...enemy,
            //         x: newX,
            //         y: newY
            //     };
            // });


            for (const enemy of newEnemies) {
                const dx = Math.sign(hero.x - enemy.x);
                const dy = Math.sign(hero.y - enemy.y);

                // Try to move in x or y direction randomly
                const tryX = Math.random() < 0.5;
                let newX = enemy.x;
                let newY = enemy.y;

                if (tryX && dx !== 0) {
                    newX = enemy.x + dx;
                } else if (dy !== 0) {
                    newY = enemy.y + dy;
                }
                // Check if new position would collide with other enemies or hero
                const wouldCollide = (newX === hero.x && newY === hero.y) ||
                    newEnemies.some(other =>
                        other !== enemy &&
                        other.x === newX &&
                        other.y === newY
                    );

                // If would collide, try other direction
                if (wouldCollide) {
                    newX = enemy.x;
                    newY = enemy.y;

                    if (!tryX && dx !== 0) {
                        newX = enemy.x + dx;
                    } else if (dy !== 0) {
                        newY = enemy.y + dy;
                    }

                    // Check again for collision
                    const secondaryCollision = (newX === hero.x && newY === hero.y) ||
                        newEnemies.some(other =>
                            other !== enemy &&
                            other.x === newX &&
                            other.y === newY
                        );

                    // If still would collide, stay in place
                    if (secondaryCollision) {
                        newX = enemy.x;
                        newY = enemy.y;
                    }
                }
                enemy.x = newX;
                enemy.y = newY;

            }
            return newEnemies;
        });
    }, [enemies, hero, moveHero]);

    // Spawn enemies randomly
    const spawnEnemy = useCallback(() => {
        if (enemies.length < 5) {
            // Try up to 10 times to find a valid spawn location
            for (let attempts = 0; attempts < 10; attempts++) {
                const x = Math.floor(Math.random() * GRID_SIZE);
                const y = Math.floor(Math.random() * GRID_SIZE);
                // Check if position is occupied by hero or other enemies
                const isOccupied = (x === hero.x && y === hero.y) ||
                    enemies.some(enemy => enemy.x === x && enemy.y === y);

                if (!isOccupied) {
                    setEnemies(prev => [...prev, { x, y }]);
                    break;
                }
            }
        }
    }, [enemies, hero, moveHero, moveEnemies]);

    // Handle keyboard input
    const handleKeyPress = useCallback((e) => {
        // Handle diagonal movements with numpad
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case '8':
                handleOnMove('UP');
                handleOnAim('UP');
                break;
            case '9':
                handleOnMove('UP_RIGHT');
                handleOnAim('UP_RIGHT');
                break;
            case 'ArrowRight':
            case 'd':
            case '6':
                handleOnMove('RIGHT');
                handleOnAim('RIGHT');
                break;
            case '3':
                handleOnMove('DOWN_RIGHT');
                handleOnAim('DOWN_RIGHT');
                break;
            case 'ArrowDown':
            case 's':
            case '2':
                handleOnMove('DOWN');
                handleOnAim('DOWN');
                break;
            case '1':
                handleOnMove('DOWN_LEFT');
                handleOnAim('DOWN_LEFT');
                break;
            case 'ArrowLeft':
            case 'a':
            case '4':
                handleOnMove('LEFT');
                handleOnAim('LEFT');
                break;
            case '7':
                handleOnMove('UP_LEFT');
                handleOnAim('UP_LEFT');
                break;
            case ' ':
                shoot();
                break;
            default:
                break;
        }
    }, [moveHero, phase]); // Add moveHero as a dependency

    // Initialize grid and set up event listeners
    useEffect(() => {
        const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('.'));
        setGrid(newGrid);

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]); // Add handleKeyPress as a dependency



    // Handle shooting
    const shoot = () => {
        if (phase !== PHASES.HERO_ACTION) return; // Only shoot during HERO_ACTION phase
        const dir = DIRECTIONS[hero.direction];
        const startX = hero.x + dir.x;
        const startY = hero.y + dir.y;
        console.log(`Shooting from (${hero.x}, ${hero.y}) in direction ${hero.direction} to (${startX}, ${startY})`);
        // Only shoot if the starting position is within the grid
        if (startX >= 0 && startX < GRID_SIZE && startY >= 0 && startY < GRID_SIZE) {
            setBullets(prev => [...prev, { x: startX, y: startY, dx: dir.x, dy: dir.y }]);
        }

    };

    useEffect(() => {
        console.log(`Bullets: ${JSON.stringify(bullets)}`);
        // If there are no bullets left, move to the next phase
        if (bullets.length === 0) {
            if (phase === PHASES.HERO_ACTION) {
                nextPhase();
            }
        }
    }, [bullets]);

    // Update bullets and check collisions
    useEffect(() => {
        const interval = setInterval(() => {
            if (phase !== PHASES.HERO_ACTION) return; // Only update bullets during HERO_ACTION phase
            setBullets(prev => {
                const newBullets = prev.map(bullet => ({
                    ...bullet,
                    x: bullet.x + bullet.dx,
                    y: bullet.y + bullet.dy
                })).filter(bullet =>
                    bullet.x >= 0 && bullet.x < GRID_SIZE &&
                    bullet.y >= 0 && bullet.y < GRID_SIZE
                );
                return newBullets;
            });

            // Check for bullet-enemy collisions
            bullets.forEach(bullet => {
                enemies.forEach((enemy, index) => {
                    if (bullet.x === enemy.x && bullet.y === enemy.y) {
                        setEnemies(prev => prev.filter((_, i) => i !== index));
                        setBullets(prev => prev.filter(b => b !== bullet));
                        setScore(prev => prev + 100);
                    }
                });
            });
        }, 100);

        return () => clearInterval(interval);
    }, [bullets, enemies]);

    // Calculate cells to highlight in hero's line of sight
    const getHighlightedCells = useCallback(() => {
        const cells = []
        if (phase === PHASES.HERO_ACTION) {
            const dir = DIRECTIONS[hero.direction];
            let x = hero.x + dir.x;
            let y = hero.y + dir.y;

            // Add cells in line of sight until we hit grid boundary
            while (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
                cells.push({ x, y });
                x += dir.x;
                y += dir.y;
            }

            
        }
        if (phase === PHASES.HERO_MOVE) {
            // Highlight the hero's current position
            cells.push({ x: hero.x, y: hero.y });
            // Highlight adjacent cells
            for (const direction of Object.values(DIRECTIONS)) {
                const adjX = hero.x + direction.x;
                const adjY = hero.y + direction.y;
                if (adjX >= 0 && adjX < GRID_SIZE && adjY >= 0 && adjY < GRID_SIZE) {
                    cells.push({ x: adjX, y: adjY });
                }
            }
            
        }
        return cells;

    }, [phase, hero.direction, hero.x, hero.y]);

    return (
        <div className="game-container">
            <div className="game-info">
                <h2>Score: {score}</h2>
                <p>{enemies.length}</p>
                <p>Phase: {phase}</p>
                <button onClick={shoot}>Shoot</button>
            </div>
            <div className="game-grid" data-phase={phase}>
                {grid.map((row, y) => (
                    <div key={y} className="grid-row">
                        {row.map((_, x) => {
                            const isHero = hero.x === x && hero.y === y;
                            const isEnemy = enemies.some(e => e.x === x && e.y === y);
                            const isBullet = bullets.some(b => Math.floor(b.x) === x && Math.floor(b.y) === y);
                            const isHighlighted = getHighlightedCells().some(cell => cell.x === x && cell.y === y);

                            return (
                                <div
                                    key={`${x}-${y}`}
                                    className={`grid-cell ${isHighlighted ? 'highlighted' : ''}`}
                                    onClick={() => {
                                        if (phase === PHASES.HERO_ACTION) {
                                            const direction = getDirectionFromClick(hero.x, hero.y, x, y);
                                            if (direction) {
                                                handleOnAim(direction);
                                            }
                                        }
                                    }}
                                >
                                    {isHero && <HeroToken hero={hero} phase={phase} onMove={(direction) => {
                                        handleOnMove(direction);
                                    }} />}
                                    {isEnemy && <div className="enemy">E</div>}
                                    {isBullet && <div className="bullet">•</div>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

