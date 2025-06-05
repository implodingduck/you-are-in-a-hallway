import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

import GameGrid from './GameGrid.jsx';

import { DIRECTIONS, PHASES, PHASE_ORDER } from '../models/Constants.js';
import { getDirectionFromClick, areAdjacent, logicMoveEnemies, logicHighlightCells } from '../utils/gameUtils.js';

const GRID_SIZE = 10;

export default function Game() {
    const [grid, setGrid] = useState([]);
    const [hero, setHero] = useState({ 
        x: 5, 
        y: 5, 
        direction: 'RIGHT',
        maxhealth: 3,
        currenthealth: 3
    });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [bullets, setBullets] = useState([]);
    const [phase, setPhase] = useState(PHASES.HERO_MOVE);
    const [isDamaged, setIsDamaged] = useState(false);
    const [showDebug, setShowDebug] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

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
            case PHASES.ENEMY_ACTION:
                // Check each enemy for adjacency to hero and deal damage
                enemies.forEach(enemy => {
                    if (areAdjacent(enemy, hero)) {
                        setIsDamaged(true);
                        setTimeout(() => setIsDamaged(false), 300); // Reset after animation
                        setHero(prev => ({
                            ...prev,
                            currenthealth: Math.max(0, prev.currenthealth - 1)
                        }));
                    }
                });
                nextPhase();
                break;
            case PHASES.ENEMY_MOVE:
                moveEnemies();
                nextPhase();
                break;
            case PHASES.ENEMY_SPAWN:
                //spawnEnemy();
                nextPhase();
                break;
            
            default:
                console.warn(`Unknown phase: ${phase}`);
                break;

        }
    }, [phase])

    // Handler for hero movement
    const handleOnMove = (direction) => {
        if (isGameOver || phase !== PHASES.HERO_MOVE) return;
        moveHero(direction);
    };

    // Handler for aiming direction
    const handleOnAim = (direction) => {
        if (isGameOver || phase !== PHASES.HERO_ACTION) return; // Only aim during HERO_ACTION phase
        if (direction) {
            setHero(prev => ({
                ...prev,
                direction: direction
            }));
        }
    };

    // Handle hero movement
    const moveHero = useCallback((direction) => {
        if (phase !== PHASES.HERO_MOVE) return; // Only move during HERO_MOVE phase
        setHero(prev => {
            const newPos = {
                ...prev,
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
            
            return logicMoveEnemies(newEnemies, hero);
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
                if (phase !== PHASES.HERO_ACTION) {
                    nextPhase(); // Skip to next phase on space
                }
                shoot();
                break;
            default:
                break;
        }
    }, [moveHero, phase, hero]); // Add moveHero as a dependency

    // Initialize grid and set up event listeners
    useEffect(() => {
        const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('.'));
        setGrid(newGrid);
        spawnEnemy(); // Spawn initial enemies
        
    }, []); // Add handleKeyPress as a dependency

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);


    // Handle shooting
    const shoot = () => {
        if (isGameOver || phase !== PHASES.HERO_ACTION) return; // Only shoot during HERO_ACTION phase
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

    // Update bullets and check for closest enemy in line of fire
    useEffect(() => {
        const interval = setInterval(() => {
            if (phase !== PHASES.HERO_ACTION) return; // Only update bullets during HERO_ACTION phase
            
            setBullets(prev => {
                const newBullets = prev.map(bullet => {
                    // Find enemies in the line of fire
                    const enemiesInPath = enemies.filter(enemy => {
                        // Check if enemy is in the same line as bullet trajectory
                        const dx = enemy.x - bullet.x;
                        const dy = enemy.y - bullet.y;
                        // Enemy must be in direction of bullet's movement
                        const inDirection = (Math.sign(dx) === Math.sign(bullet.dx) || dx === 0) &&
                                         (Math.sign(dy) === Math.sign(bullet.dy) || dy === 0);
                        
                        if (!inDirection) return false;

                        // For diagonal movement, check if enemy is on the same diagonal line
                        if (bullet.dx !== 0 && bullet.dy !== 0) {
                            return Math.abs(dx/bullet.dx - dy/bullet.dy) < 0.1; // Small threshold for floating point comparison
                        }
                        // For horizontal/vertical movement
                        return bullet.dx === 0 ? dy/bullet.dy >= 0 : dx/bullet.dx >= 0;
                    });

                    // Find closest enemy in path
                    if (enemiesInPath.length > 0) {
                        const closestEnemy = enemiesInPath.reduce((closest, enemy) => {
                            const distToCurrent = Math.sqrt(
                                Math.pow(enemy.x - bullet.x, 2) + 
                                Math.pow(enemy.y - bullet.y, 2)
                            );
                            const distToClosest = Math.sqrt(
                                Math.pow(closest.x - bullet.x, 2) + 
                                Math.pow(closest.y - bullet.y, 2)
                            );
                            return distToCurrent < distToClosest ? enemy : closest;
                        });

                        // Remove the closest enemy and this bullet
                        setEnemies(prev => prev.filter(e => e !== closestEnemy));
                        setScore(prev => prev + 100);
                        return null; // Remove this bullet
                    }

                    // Update bullet position if no enemy was hit
                    return {
                        ...bullet,
                        x: bullet.x + bullet.dx,
                        y: bullet.y + bullet.dy
                    };
                }).filter(bullet => 
                    bullet !== null &&
                    bullet.x >= 0 && bullet.x < GRID_SIZE &&
                    bullet.y >= 0 && bullet.y < GRID_SIZE
                );
                return newBullets;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [bullets, enemies]);

    
    

    const resetGame = () => {
        setHero({
            x: 5,
            y: 5,
            direction: 'RIGHT',
            maxhealth: 3,
            currenthealth: 3
        });
        setEnemies([]);
        setScore(0);
        setBullets([]);
        setPhase(PHASES.HERO_MOVE);
        setIsGameOver(false);
    };

    // Check for game over when health changes
    useEffect(() => {
        if (hero.currenthealth <= 0) {
            setIsGameOver(true);
        }
    }, [hero.currenthealth]);

    return (
        <div className="game-container">
            <h1>You are in a Hallway</h1>
            <div className="game-info">
                <h2>Score: {score}</h2>
            </div>
            <GameGrid
                grid={grid}
                gridSize={GRID_SIZE}
                hero={hero}
                enemies={enemies}
                bullets={bullets}
                phase={phase}
                handleOnMove={handleOnMove}
                handleOnAim={handleOnAim}
                shoot={shoot}
                isDamaged={isDamaged}
                nextPhase={nextPhase}
                resetGame={resetGame}
                isGameOver={isGameOver}
            />

            <button onClick={() => setShowDebug(!showDebug)}>Debug</button>
            <div className="debug-info" style={{ display: showDebug ? 'block' : 'none' }}>
                <p>Number of Enemies: {enemies.length}</p>
                <p>Phase: {phase}</p>
                <p>Hero Position: ({hero.x}, {hero.y})</p>
                <p>Hero Direction: {hero.direction}</p>
                <p>Hero Health: {hero.currenthealth}/{hero.maxhealth}</p>
                <p>Active Bullets: {bullets.length}</p>
                <p>Enemy Positions: {JSON.stringify(enemies.map(e => `(${e.x},${e.y})`))}</p>
            </div>
        </div>
    );
};

