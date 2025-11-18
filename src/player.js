const {Gameboard} = require("./gameboard.js");

class Player {
    #board;
    #name
    constructor(name) {
        this.#board = new Gameboard();
        this.#name = name;
    }
    receiveAttack(row, col) {
        return this.#board.receiveAttack(row, col);
    }
    place(coord, size, isHorizontal) {
        this.#board.place(coord, size, isHorizontal);
    }
    get name() {
        return this.#name;
    }
    get exposeBoard() {
        return this.#board.exposeBoard;
    }
}

module.exports = {
    Player
};
