//  http://localhost:8080/

class Ship {
    #size;
    #hitCount;
    constructor(size) {
        this.#size = size;
        this.#hitCount = 0;
    }
    get isSunk() {
        return this.#hitCount == this.#size;
    }
    hit() {
       this.#hitCount = Math.min(this.#hitCount + 1, this.#size); 
    }
}

module.exports = {
    Ship
};