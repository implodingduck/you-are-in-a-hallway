export class BaseCard {
    constructor(name, type, description, tags = []) {
        this.name = name; // Name of the card
        this.type = type; // Type of card (e.g., "character", "power", etc.)
        this.description = description; // Description of the card's effect or role
        this.tags = tags; // Array of tags for categorizing and filtering cards
    }
}