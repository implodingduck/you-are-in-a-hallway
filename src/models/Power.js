export class Power {
    constructor(name, time, power, range, description, targetStyle, preActivate=(activator,target)=>{}, postActivate=(activator,target)=>{}) {
        this.name = name; // Name of the power
        this.time = time; // Time required to use the power
        this.power = power; // Power value of the ability
        this.range = range; // Range of the ability ('short', 'mid', 'long')
        this.description = description; // Description of the ability
        this.targetStyle = targetStyle; // Style of the target (allies, enemies, self, etc.)
        this.preActivate = preActivate; // Function to execute before activating the power
        this.postActivate = postActivate; // Function to execute after activating the power
    }

    // Helper function to determine valid target columns based on range and enemy positions
    getValidTargetColumns(enemyPositions) {
        // Get unique enemy columns
        const enemyCols = [...new Set(enemyPositions.map(pos => pos[0]))].sort();
        
        // If no enemies, return empty array
        if (enemyCols.length === 0) return [];
        
        // Get the frontmost enemy column (lowest number)
        const frontColumn = enemyCols[0];
        
        switch(this.range) {
            case 'short':
                return [frontColumn];
            case 'mid':
                return enemyCols.filter(col => col <= Math.min(frontColumn + 1, 2));
            case 'long':
                return [0, 1, 2].filter(col => col >= frontColumn);
            default:
                return [];
        }
    }
}