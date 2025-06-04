import { BaseCard } from "./BaseCard";

export class MonsterCard extends BaseCard {
    constructor(name, type, description, health, attack, special, tags = [], damagetaken=0) {
        super(name, "Monster", description, tags);
        this.health = health; // Health points of the monster
        this.attack = attack; // Attack points of the monster
        this.special = special; // Special ability of the monster
        this.damagetaken = damagetaken; // Damage taken by the monster
    }

    attachItem(item) {
        // Attach an item to the monster card
        if (!this.items) {
            this.items = [];
        }
        this.items.push(item);
    }

    takeDamage(damage) {
        console.log(`Monster ${this.name} takes ${damage} damage... current damage taken: ${this.damagetaken}`);
        this.damagetaken += parseInt(damage); // Increment damage taken
    }

    getEffectiveHealth() {
        // Calculate effective health after damage taken
        return Math.max(parseInt(this.getEffectiveMaxHealth()) - this.damagetaken, 0);
    }

    getEffectiveMaxHealth() {
        // Return the maximum health of the monster
        return this.health;
    }

    getEffectiveAttack() {
        // Calculate effective attack, considering items or special abilities
        let effectiveAttack = this.attack;
        if (this.items) {
            for (const item of this.items) {
                effectiveAttack += item.attackBoost || 0;
            }
        }
        return effectiveAttack;
    }
}