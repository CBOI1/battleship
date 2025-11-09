//  http://localhost:8080/

class Ship {
    #shipHitStatus;
    constructor(size) {
        this.#shipHitStatus = new Array(size);
        this.#shipHitStatus.fill(false);
    }

    get isSunk() {
        return this.#shipHitStatus.reduce((aggregate, cellStatus) => aggregate && cellStatus, true);
    }
    attackCell(ithCell) {
        this.#shipHitStatus[ithCell] = true;
    }
}


module.exports = {
    Ship
};