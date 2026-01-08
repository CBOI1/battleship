const BOARD_SIZE = 10;
const EMPTY_SPACE = -1;
const HIT = -2;
const MISS = -3;
const {Ship} = require("./ship.js");
class Gameboard {
    
    //if board element >= 0 then it represents a specific ship
    
    static range(start, end, step = 1) {
        return Array.from({length: Math.ceil((end - start) / step)}, (_, i) => start + i * step)
    }
    #shipId;    //use to assign new ids to ships
    #idMap;     //use to query a certain ship via id
    #board;      
    
    constructor() {
        this.#shipId = 0;
        this.#idMap = new Map();
        //store board in row major form
        this.#board = new Array(BOARD_SIZE * BOARD_SIZE).fill(EMPTY_SPACE);
        
    }
    //INPUT: Starting coordinates of ship, offset from first cell, isHorizontal flag
    //RETURNS: index of board to retrieve given its orientation
    #getIndexOffset(coord, offset, isHorizontal) {
        return isHorizontal ? (BOARD_SIZE * coord[0]) + (coord[1] + offset) : (BOARD_SIZE * (offset + coord[0])) + coord[1]
    }
    #getIndex(row, col) {
        return (BOARD_SIZE * row) + col;
    }
    //checks a ship's surrounding borders to make sure no ships are adjacent
    #adjacentCellsValid(coord, size, isHorizontal) {
        //left, right, bottom, top point to cells that frame the outer boundary of a ship
        let left, right, bottom, top;
        if (isHorizontal) {
            left = coord[1] - 1;
            right = coord[1] + size;
            top = coord[0] - 1;
            bottom = coord[0] + 1;
        } else {
            left = coord[1] - 1;
            right = coord[1] + 1;
            top = coord[0] - 1;
            bottom = coord[0] + size;
        }
        //check top border
        const checkBorder = (coord, size, isHorizontal) => {
            //dimSelector is the axis the ship lies on
            const dimSelector = isHorizontal ? 1 : 0;
            if (!(0 <= coord[1 - dimSelector] && coord[1 - dimSelector] < BOARD_SIZE)) {
                return true;
            }
            const start = coord[dimSelector];
            const end = coord[dimSelector] + size;
            for (let index = start; index < end; index++) {
                const inBounds = 0 <= index && index < BOARD_SIZE;
                if (inBounds) {
                    const i = this.#getIndexOffset(coord, index - start, isHorizontal);
                    if (this.#board[i] >= 0) {
                         return false;
                    }
                }
            }
            return true;
        }
        //check all borders have no cells that conflict with a ship
        //traverse outer boundaries to check no ships are placed
        let borderIsValid = checkBorder([top, left], right - left + 1, true);
        borderIsValid &&= checkBorder([top, right], bottom - top + 1, false); 
        borderIsValid &&= checkBorder([bottom, left], right - left + 1, true); 
        borderIsValid &&= checkBorder([top, left], bottom - top + 1, false);  
        return borderIsValid;
    }
    //INPUT: size of ship,coordinate of ship, orientation
    //RETURN: true if placement is successful
    //Note function assumes placement begins from left end of ship for horizontal placement
    //and top end of ship for vertical placements.
    //PLACEMENT RULES
    //---------------
    //1. ships cannot go out of bounds.
    //2. ships cannot occupy the same cells as other ships.
    //3. ships cannot be adjacent to each other on the board.
    place(coord, size, isHorizontal) {
        //check if out of bounds
        const dimSelector = isHorizontal ? 1 : 0;
        const outOfBounds = coord[dimSelector] + size - 1 >= BOARD_SIZE;
        if (outOfBounds) {
            return false;
        }
        //check attempting to use a cell already occupied
        const conflictExists = Gameboard.range(0, size).reduce((aggregate, offset) => {
            const cellIndex = this.#getIndexOffset(coord, offset, isHorizontal);
            return aggregate || this.#board[cellIndex] !== EMPTY_SPACE;
        },false);
        if (conflictExists) {
            return false
        }
        //check if adjacent cells are occupied 
        if (!this.#adjacentCellsValid(coord, size, isHorizontal)) {
            return false
        }
        
        const shipId = this.#createShip(size)
        Gameboard.range(0, size).forEach((offset) => {
            this.#board[this.#getIndexOffset(coord, offset, isHorizontal)] = shipId
        });
        return true;
    }

    get exposeBoard() {
        return this.#board.map(val => val);
    }

    #createShip(size) {
        const idOfShip = this.#shipId++;
        this.#idMap.set(idOfShip, new Ship(size));
        return idOfShip;
    }
    //returns result object with valid and gameover properties
    receiveAttack(row, col) {
        const index = this.#getIndex(row, col);
        if (this.#board[index] === EMPTY_SPACE) {
            this.#board[index] = MISS;
            return {valid: true, gameOver: this.allShipsSunk(), hit: false, miss: true};
        } else if (this.#board[index] >= 0) {
            const shipId = this.#board[index];
            this.#idMap.get(shipId).hit();
            this.#board[index] = HIT;
            return {valid: true, gameOver: this.allShipsSunk(), hit: true, miss: false};
        }
        return {valid: false, gameOver: false, hit: false, miss: false};
    }
    allShipsSunk() {
        return this.#idMap.values().reduce((allShipsSunk, currShip) => allShipsSunk && currShip.isSunk, true);
    }
}

module.exports = {
    Gameboard,
    BOARD_SIZE,
    HIT,
    MISS
};