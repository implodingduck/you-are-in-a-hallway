export class Character {
    constructor(name, stats, position, side, powers = []) {
        this.name = name;
        this.stats = stats;
        this.position = position;
        this.side = side;
        this.tick = 1;
        this.powers = powers; // Array of Power objects
    }

    setTick(tick) {
        this.tick = tick;
    }

    activatePower(powerName, target) {
        // Basic attack logic - can be enhanced with stats later
        const power = this.powers.find(p => p.name === powerName);
        const damage = Math.max(1, this.stats.power - target.stats.defense);
        target.stats.hp -= damage;
        this.setTick(((this.tick + power.time - 1) % 12) + 1); // Increment tick, wrapping around after 12
        return damage;
    }
     
}
