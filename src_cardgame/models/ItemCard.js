import { BaseCard } from "./BaseCard";

export class ItemCard extends BaseCard {
    constructor(name, type, description, effect, tags = []) {
        super(name, "Item", description, tags);
        this.effect = effect; // Effect of the spell (e.g., damage, healing, buff)
    }
}