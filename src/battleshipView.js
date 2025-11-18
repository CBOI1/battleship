const {BattleShip, getCoord} = require("./battleship.js");
const {BOARD_SIZE} = require("./gameboard.js");
import "./styles.css";
import bullseye from "../assets/bullseye.svg";
import miss from "../assets/miss.svg";
const content = document.querySelector("div#content");
//http://localhost:8080/
class BattleShipView {
    #battleship;
    #header;
    #cells; 
    constructor() {
        this.#battleship = new BattleShip();
        this.#header = document.createElement("div");
        this.#header.classList.add("header");
        this.#cells = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));
        content.append(this.#header);
        //add name of active player
        this.#renderBoard();
        this.#updateName();
    }

    #renderBoard() {
        const board = document.createElement("div");
        board.classList.add("class", "battleship-board");
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                const boardCell = document.createElement("div");
                boardCell.classList.add("board-cell");
                boardCell.setAttribute("data-row", i);
                boardCell.setAttribute("data-col", j);
                this.#cells[i][j] = boardCell;
                board.appendChild(boardCell);
                boardCell.addEventListener("click", (e) => {
                    const cell = e.currentTarget;
                    const row = Number(cell.getAttribute("data-row"));
                    const col = Number(cell.getAttribute("data-col"));
                    this.attack(row, col);
                });
            }
        }
        content.append(board);
    }
    #updateBoard() {
        //update the board
        const boardState = this.#battleship.inactivePlayerBoard;
        boardState.forEach((cellState, index) => {
            const [row, col] = getCoord(index);
            const cell = this.#cells[row][col]
            cell.replaceChildren();
            if (cellState.hit) {
                cell.appendChild(this.#hitIcon());
            } else if (cellState.miss) {
                cell.appendChild(this.#missIcon());
            }
        });
    }
    #updateName() {
        this.#header.textContent = this.#battleship.activePlayerName;
    }
    #switchPlayer() {
        //update name
        this.#updateName();
        this.#updateBoard();
    }
    #renderGameInfo() {
        const gameInfo = document.createElement("div");
    }
    //for now have the board being attacked be the same board
    attack(row, col) {
        const result = this.#battleship.attack(row, col);
        if (!result.valid) return;
      
        const selectedCell = this.#cells[row][col];
        selectedCell.appendChild(result.miss ? this.#missIcon() : this.#hitIcon());

        //timer here 
        this.#switchPlayer();
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