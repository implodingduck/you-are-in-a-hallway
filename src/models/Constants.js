export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    UP_RIGHT: { x: 1, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN_RIGHT: { x: 1, y: 1 },
    DOWN: { x: 0, y: 1 },
    DOWN_LEFT: { x: -1, y: 1 },
    LEFT: { x: -1, y: 0 },
    UP_LEFT: { x: -1, y: -1 }
};

/** @enum {string} */
export const PHASES = Object.freeze({
    HERO_MOVE: 'HERO_MOVE',
    HERO_ACTION: 'HERO_ACTION',
    ENEMY_ACTION: 'ENEMY_ACTION',
    ENEMY_MOVE: 'ENEMY_MOVE',
    ENEMY_SPAWN: 'ENEMY_SPAWN',
});

// Array to define phase order
export const PHASE_ORDER = Object.freeze([
    PHASES.HERO_MOVE,
    PHASES.HERO_ACTION,
    PHASES.ENEMY_ACTION,
    PHASES.ENEMY_MOVE,
    PHASES.ENEMY_SPAWN,
]);