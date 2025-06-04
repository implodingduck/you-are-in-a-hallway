import { BaseCard } from "./BaseCard";

export class SpellCard extends BaseCard {
    constructor(name, type, description, castTime, effect, tags = []) {
        super(name, "Spell", description, tags);
        this.castTime = castTime; // Time required to cast the spell
        this.effect = effect; // Effect of the spell (e.g., damage, healing, buff)
    }
}