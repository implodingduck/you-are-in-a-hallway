import { Mob } from "./Models"
import { parse } from 'csv-rex'

class API {
    mobs;
    constructor() {
        
    }
    async init(){
        let resp = await fetch(`./mobs.csv`)
        let text = await resp.text()
        const linesArray = parse(text, {})
        console.log(linesArray)
        this.mobs = linesArray
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
        return mob
    }

}




export { API }