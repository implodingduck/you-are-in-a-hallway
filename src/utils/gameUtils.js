// Helper function to determine direction from click
import { DIRECTIONS, PHASES } from '../models/Constants.js';

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

export const logicMoveEnemies = (newEnemies, hero) => {
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
}

export const logicSpawnEnemies = (enemies, setEnemies, hero, gridSize) => {
    if (enemies.length < 5) {
            // Try up to 10 times to find a valid spawn location
            for (let attempts = 0; attempts < 10; attempts++) {
                const x = Math.floor(Math.random() * gridSize);
                const y = Math.floor(Math.random() * gridSize);
                // Check if position is occupied by hero or other enemies
                const isOccupied = (x === hero.x && y === hero.y) ||
                    enemies.some(enemy => enemy.x === x && enemy.y === y);

                if (!isOccupied) {
                    setEnemies(prev => [...prev, { x, y }]);
                    break;
                }
            }
        }
}

export const logicHighlightCells = (phase, hero, gridSize) => {
    const cells = []
    if (phase === PHASES.HERO_ACTION) {
        const dir = DIRECTIONS[hero.direction];
        if (dir) {
            let x = hero.x + dir.x;
            let y = hero.y + dir.y;

            // Add cells in line of sight until we hit grid boundary
            while (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
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
            if (adjX >= 0 && adjX < gridSize && adjY >= 0 && adjY < gridSize) {
                cells.push({ x: adjX, y: adjY });
            }
        }

    }
    return cells;
}