const { Player } = require("./player");
const {BOARD_SIZE, HIT, MISS} = require("./gameboard.js")

const ships = [
[[0, 0], 1, true],
[[3, 2], 4, false],
[[3, 8], 2, true],
[[8, 4], 3, true]
];

class BattleShip {
    #players;
    #turn;
    #winner;
    constructor() {
        this.#players = [new Player("Player 1"), new Player("Player 2")];
        this.#turn = 0;
        this.#winner = null;
        //populate boards with dummy ships
        for (const shipArgs of ships) {
            this.#players[0].place(...shipArgs);
            this.#players[1].place(...shipArgs);
        }
    }

    #updateTurn() {
        this.#turn = (this.#turn + 1) % 2;
    }

    get activePlayerName() {
        return this.#attacker.name;
    }
    get inactivePlayerBoard() {
        return this.#defender.exposeBoard.map((cellVal) => {
              return {    
                        miss : (cellVal === MISS),
                        hit : (cellVal === HIT),
                        get clear() { return !this.miss && !this.hit }
            }
        });
    }

    get #attacker() {
        return this.#players[this.#turn];
    }
    get #defender() {
        return this.#players[(this.#turn + 1) % 2];
    }

    //returns true if attack causes game to end
    attack(row, col) {
        const result = this.#defender.receiveAttack(row, col);
        if (result.gameOver) {
            this.#winner = this.#attacker;
            return result;
        } else if (result.valid) {
            this.#updateTurn();
            return result;
        }
        return result;
    }
    dummyattack(row, col) {
        return this.#players[0].receiveAttack(row, col);
    }
}

module.exports = {
    BattleShip,
    getCoord(index) { return [Math.floor(index / BOARD_SIZE), index % BOARD_SIZE];}
};