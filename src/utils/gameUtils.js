// Helper function to determine direction from click
import { DIRECTIONS, PHASES, GRID_LAYOUTS, TILES } from '../models/Constants.js';

export const getDirectionFromClick = (heroX, heroY, clickX, clickY) => {
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

// Add a function to check if positions are adjacent
export const areAdjacent = (pos1, pos2) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx <= 1 && dy <= 1) && !(dx === 0 && dy === 0);
};

export const logicMoveEnemies = (newEnemies, hero, grid) => {
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
            ) || grid[newY][newX] === TILES.WALL;

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
                ) || grid[newY][newX] === TILES.WALL;

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
}

export const logicSpawnEnemies = (enemies, setEnemies, hero, gridSize, grid) => {
    if (enemies.length < 5 && grid.length > 0 && grid[0].length > 0) {
            // Try up to 10 times to find a valid spawn location
            for (let attempts = 0; attempts < 10; attempts++) {
                const x = Math.floor(Math.random() * gridSize);
                const y = Math.floor(Math.random() * gridSize);
                // Check if position is occupied by hero, other enemies, or a wall
                const isOccupied = (x === hero.x && y === hero.y) ||
                    enemies.some(enemy => enemy.x === x && enemy.y === y) ||
                    grid[y][x] === TILES.WALL;

                if (!isOccupied) {
                    setEnemies(prev => [...prev, { x, y }]);
                    break;
                }
            }
        }
}

export const logicHighlightCells = (phase, hero, grid, gridSize) => {

    const cells = []
    // return cells if grid is empty
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return cells;
    }

    if (phase === PHASES.HERO_ACTION) {
        const dir = DIRECTIONS[hero.direction];
        if (dir) {
            let x = hero.x + dir.x;
            let y = hero.y + dir.y;

            // Add cells in line of sight until we hit grid boundary
            while (x >= 0 && x < gridSize && y >= 0 && y < gridSize && grid[y][x] !== TILES.WALL) {
                cells.push({ x, y });
                x += dir.x;
                y += dir.y;
            }
        }


    }
    if (phase === PHASES.HERO_MOVE) {
        // Highlight the hero's current position
        cells.push({ x: hero.x, y: hero.y });
        // Highlight adjacent cells
        for (const direction of Object.values(DIRECTIONS)) {
            const adjX = hero.x + direction.x;
            const adjY = hero.y + direction.y;
            if (adjX >= 0 && adjX < gridSize && adjY >= 0 && adjY < gridSize && grid[adjY][adjX] !== TILES.WALL) {
                cells.push({ x: adjX, y: adjY });
            }
        }

    }
    return cells;
}

export const initializeGrid = (gridSize) => {
    // // randomly create a grid gridSize x gridSize filled with either empty cells or walls.
    // const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('empty'));
    // const wallProbability = 0.1; // 10% chance of a wall in each cell
    // for (let y = 0; y < gridSize; y++) {
    //     for (let x = 0; x < gridSize; x++) {
    //         if (Math.random() < wallProbability) {
    //             grid[y][x] = 'wall';
    //         } else {
    //             grid[y][x] = 'empty';
    //         }
    //     }
    // }
    // // Make sure the hero's starting position (5,5) is empty
    // grid[5][5] = 'empty';
    // return grid;

    // RANDOMLY SELECT A GRID LAYOUT
    const layouts = Object.values(GRID_LAYOUTS);
    const randomIndex = Math.floor(Math.random() * layouts.length);
    const grid = layouts[randomIndex].map(row => [...row]); // Create a copy of the selected layout
    return grid;
    
}