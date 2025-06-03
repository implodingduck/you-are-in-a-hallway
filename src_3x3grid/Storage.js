export default class Storage {
    game;

    constructor() {
        const value = localStorage.getItem("game");
        if (value) {
            this.game = JSON.parse(value);
        } else {
            this.game = {};
        }
    }

    // store data in localStorage
    save(key, value) {
        const game = this.game || {};
        game[key] = value;
        localStorage.setItem("game", JSON.stringify(game));
    }

    get(key, defaultValue="") {
        const game = this.game || {};
        if (game[key] === undefined) {
            return defaultValue;
        }
        return game[key];
    }

}