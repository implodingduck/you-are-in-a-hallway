import { parse } from 'csv-rex'

export class Dataloader {
    constructor() {
        this.monsters = [];
        this.spells = [];
        this.items = [];
    }

    async init() {
        this.monsters = await this.fetchCsv(`../monstercards.csv`);
    }


    async fetchCsv(path) {
        let resp = await fetch(path)
        let text = await resp.text()
        const linesArray = parse(text, {})
        console.log(linesArray)
        return linesArray;
    }


}