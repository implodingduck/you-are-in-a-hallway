class Entity {
    id;
    name;
    type;
    hp;
    hpMax; 
    mp;
    mpMax;
    power;
    defense;
    accuracy;
    magic;
    evasion;
    luck;

    constructor(o){
        if(o){
            console.log(`Entity constructor ${JSON.stringify(o)}`);
            this.id = o.id 
            this.name = o.name
            this.type = o.type
            this.hp = o.hp
            this.hpMax = o.hp
            this.mp = o.mp
            this.mpMax = o.mp
            this.power = o.power
            this.defense = o.defense
            this.accuracy = o.accuracy
            this.magic = o.magic
            this.evasion = o.evasion
            this.luck = o.luck
        }
    }

    toString(){
        return `{ "id": ${this.id}, "name": ${this.name}, "type": ${this.type}}`;
    }
}

class Player extends Entity {

}

class Mob extends Entity {

}

export { Player, Mob }