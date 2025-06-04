import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

const GRID_SIZE = 10;
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};

export default function Game() {
    const [grid, setGrid] = useState([]);
    const [hero, setHero] = useState({ x: 5, y: 5, direction: 'RIGHT' });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [bullets, setBullets] = useState([]);


    // Handle hero movement
    const moveHero = useCallback((direction) => {
        setHero(prev => {
            const newPos = {
                x: prev.x + DIRECTIONS[direction].x,
                y: prev.y + DIRECTIONS[direction].y,
                direction
            };

            // Check if position is within grid bounds and not occupied by an enemy
            if (newPos.x >= 0 && newPos.x < GRID_SIZE &&
                newPos.y >= 0 && newPos.y < GRID_SIZE &&
                !enemies.some(enemy => enemy.x === newPos.x && enemy.y === newPos.y)) {
                return newPos;
            }
            return { ...prev, direction }; // Only update direction if we can't move
        });
    }, [hero, enemies]); // Add enemies as a dependency


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
        switch (e.key) {
            case 'ArrowUp':
                moveHero('UP');
                moveEnemies();
                spawnEnemy();
                break;
            case 'ArrowRight':
                moveHero('RIGHT');
                moveEnemies();
                spawnEnemy();
                break;
            case 'ArrowDown':
                moveHero('DOWN');
                moveEnemies();
                spawnEnemy();
                break;
            case 'ArrowLeft':
                moveHero('LEFT');
                moveEnemies();
                spawnEnemy();
                break;
            case ' ':
                shoot();
                break;
            default:
                break;
        }
    }, [moveHero, spawnEnemy, moveEnemies]); // Add moveHero as a dependency

    // Initialize grid and set up event listeners
    useEffect(() => {
        const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('.'));
        setGrid(newGrid);

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]); // Add handleKeyPress as a dependency



    // Handle shooting
    const shoot = () => {
        const dir = DIRECTIONS[hero.direction];
        const startX = hero.x + dir.x;
        const startY = hero.y + dir.y;
        console.log(`Shooting from (${hero.x}, ${hero.y}) in direction ${hero.direction} to (${startX}, ${startY})`);
        // Only shoot if the starting position is within the grid
        if (startX >= 0 && startX < GRID_SIZE && startY >= 0 && startY < GRID_SIZE) {
            setBullets(prev => [...prev, { x: startX, y: startY, dx: dir.x, dy: dir.y }]);
        }
    };

    // Update bullets and check collisions
    useEffect(() => {
        const interval = setInterval(() => {
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

    // Game loop
    // useEffect(() => {
    //     const gameLoop = setInterval(() => {
    //         spawnEnemy();
    //         moveEnemies();
    //     }, 1000);

    //     return () => clearInterval(gameLoop);
    // }, [spawnEnemy, moveEnemies]);


    return (
        <div className="game-container">
            <div className="game-info">
                <h2>Score: {score}</h2>
                <p>{enemies.length}</p>
            </div>
            <div className="game-grid">
                {grid.map((row, y) => (
                    <div key={y} className="grid-row">
                        {row.map((_, x) => {
                            const isHero = hero.x === x && hero.y === y;
                            const isEnemy = enemies.some(e => e.x === x && e.y === y);
                            const isBullet = bullets.some(b => Math.floor(b.x) === x && Math.floor(b.y) === y);

                            return (
                                <div key={`${x}-${y}`} className="grid-cell">
                                    {isHero && <div className={`hero hero-${hero.direction.toLowerCase()}`} title={JSON.stringify(hero)}>H</div>}
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

