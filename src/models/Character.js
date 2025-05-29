export class Character {
    constructor(name, stats, position, side) {
        this.name = name;
        this.stats = stats;
        this.position = position;
        this.side = side;
        this.tick = Math.floor(Math.random() * 3) + 1; // Random initial tick between 1-3
        this.currentTick = this.tick;
        this.isActive = false;
    }

    attack(target) {
        // Basic attack logic - can be enhanced with stats later
        const damage = Math.max(1, this.stats.power - target.stats.defense);
        target.stats.hp -= damage;
        return damage;
    }
}
