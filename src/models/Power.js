export class Power {
    constructor(name, time, power, range, description, targetStyle, preActivate=(activator,target)=>{}, postActivate=(activator,target)=>{}) {
        this.name = name; // Name of the power
        this.time = time; // Time required to use the power
        this.power = power; // Power value of the ability
        this.range = range; // Range of the ability
        this.description = description; // Description of the ability
        this.targetStyle = targetStyle; // Style of the target (allies, enemies, self, etc.)
        this.preActivate = preActivate; // Function to execute before activating the power
        this.postActivate = postActivate; // Function to execute after activating the power
    }
}