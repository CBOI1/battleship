const {BattleShip} = require("./battleship.js");
import "./styles.css";
import bullseye from "../assets/bullseye.svg";
import miss from "../assets/miss.svg";
const content = document.querySelector("div#content");
const DIM_SIZE = 10;
//http://localhost:8080/
class BattleShipView {
    #battleship = new BattleShip();
    
    constructor() {
        this.#battleship = new BattleShip();
        //add two separate board divs
        this.#renderBoard(content);
    }

    #renderBoard() {
        const board = document.createElement("div");
        board.classList.add("class", "battleship-board");
        for (let i = 0; i < DIM_SIZE; i++) {
            for (let j = 0; j < DIM_SIZE; j++) {
                const boardCell = document.createElement("div");
                boardCell.classList.add("board-cell");
                boardCell.setAttribute("data-row", i);
                boardCell.setAttribute("data-col", j);
                board.appendChild(boardCell);
                boardCell.addEventListener("click", (e) => {
                    const cell = e.currentTarget;
                    const row = Number(cell.getAttribute("data-row"));
                    const col = Number(cell.getAttribute("data-col"));
                    this.attack(row, col);
                });
            }
        }
        content.appendChild(board);
    }
    //for now have the board being attacked be the same board
    attack(row, col) {
        const result = this.#battleship.dummyattack(row, col);
        if (!result.valid) {
            return
        } else {
            const selectedCell = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
            const icon = result.miss ? this.#missIcon() : this.#hitIcon();
            selectedCell.appendChild(icon);
        }
    }
    #missIcon() {
        const img = document.createElement("img");
        img.setAttribute("src", miss);
        img.setAttribute("alt", "white circle with black outline representing a miss");
        return img;
    }
    #hitIcon() {
        const img = document.createElement("img");
        img.setAttribute("src", bullseye);
        img.setAttribute("alt", "../dartboard with a bullseye");
        return img;
    }
}





function startGame() {
    new BattleShipView();
}
startGame();