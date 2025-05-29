import { Mob } from "./Models"
import { parse } from 'csv-rex'

class API {
    mobs;
    jobs;

    constructor() {
        
    }
    async fetchCsv(path) {
        let resp = await fetch(path)
        let text = await resp.text()
        const linesArray = parse(text, {})
        console.log(linesArray)
        return linesArray;
    }

    async init(){
        this.mobs = await this.fetchCsv(`./mobs.csv`)
        this.jobs = await this.fetchCsv(`./jobs.csv`)

    }
    async getRoom(id) {
        console.log(`API getRoom ${id}`)
        return {
            "id": id,
            "description": "TBD",
            "type": "room"
        }
    }
    
    async getEncounterTemplate(id) {
        console.log(`API getEncounterTemplate ${id}`)
        return {
            "id": id,
            "description": "TBD",
            "type": "encounter"
        }
    }
    
    async getMob(id) {
        console.log(`API getMob ${id}`)
        let mob = this.mobs.find( m => m.id == id.toString())
        if (mob){
            mob.currentHp = mob.hp
        }
        
        return mob
    }
    async getRandomMob() {
        console.log(`API getRandomMob`)
        let id = Math.floor(Math.random() * (this.mobs.length -1) + 1);
        let mob = await this.getMob(id)
        return mob
    }

    async getJob(id) {
        console.log(`API getJob ${id}`)
        let job = this.jobs.find( m => m.id == id.toString())
        if (job){
            job.currentHp = job.hp
        }
        
        return job
    }

    async getPlayer(id) {
        let job = await this.getJob(1)
        const player = {
            ...job,
            name: 'player',
            job: job.name,
            equipment: {
                main: {
                    name: "saber",
                    power: 105,
                    accuracy: 3
                }
            }
        }
        return player
    }

    async handleCombat(attacker, defender){
        console.log(`${attacker.accuracy} / ${defender.evasion}`)
        //get the attacker stuff
        const attackerAccuracy = (attacker.equipment) ? parseInt(attacker.accuracy) + parseInt(attacker.equipment.main.accuracy) : parseInt(attacker.accuracy)
        const attackerPower = (attacker.equipment) ? parseInt(attacker.power) + parseInt(attacker.equipment.main.power) : parseInt(attacker.power)

        //get the defender stuff
        const defenderEvasion = 0
        const defenderDefend = 0

        let toHitChance = attackerAccuracy / defender.evasion * 100
        if(toHitChance > 99){
            toHitChance = 99
        }
        
        let toHit = Math.random() * 100
        console.log(`${toHit} vs ${toHitChance}`)
        if (toHit > toHitChance){
            console.log('miss!')
            return 0;
        }
        console.log('hit!')
        
        console.log(`${attackerPower}/5 - ${defender.defense}`)
        let basedmg = attackerPower/5 - defender.defense
        if (basedmg < 1){
            basedmg = 1
        }
        let criticalChance = (attacker.luck / 200) * 100
        console.log(`Critical Chance: ${criticalChance}`)
        if(toHit < criticalChance){
            console.log(`Critical!!!`)
            basedmg = Math.ceil(basedmg * 1.5)
        }
        console.log(`Damage ${basedmg}`)
        return basedmg
    }

}




export { API }