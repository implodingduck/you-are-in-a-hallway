export default class Api {
    seed; 
    random;

    constructor() {
        this.seed = (new Date()).getTime()
    }

    initRandom() {
        this.random = this.sfc32(this.seed, this.seed, this.seed, this.seed);
    }

    getSeed() {
        return this.seed;
    }

    setSeed(seed) { 
        this.seed = seed;
    }

    sfc32 (a, b, c, d) {
        return function() {
            a |= 0; b |= 0; c |= 0; d |= 0;
            let t = (a + b | 0) + d | 0;
            d = d + 1 | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }
    }

    getRandom(min, max) {
        if (!this.random) {
            this.initRandom();
        }
        if (min === undefined || max === undefined) {
            throw new Error("getRandom requires min and max parameters");
        }
        if (min >= max) {
            throw new Error("getRandom requires min to be less than max");
        }
        const random = this.random();
        console.log(random)
        return Math.floor(random * (max - min + 1)) + min;
    }

} 