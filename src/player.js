const {Gameboard} = require("./gameboard.js");

class Player {
    #board;
    constructor() {
        this.#board = new Gameboard();
    }
    receiveAttack(row, col) {
        return this.#board.receiveAttack(row, col);
    }
    place(coord, size, isHorizontal) {
        this.#board.place(coord, size, isHorizontal);
    }
}

module.exports = {
    Player
};
