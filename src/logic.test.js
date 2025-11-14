const {Ship} = require("./ship.js");
const {Gameboard, BOARD_SIZE} = require("./gameboard.js");
const LARGE_SIZE = 4;
test("sink and hit functionality", () => {
    const largeShip = new Ship(LARGE_SIZE);
    expect(largeShip.isSunk).toBe(false);
    largeShip.hit();
    expect(largeShip.isSunk).toBe(false);
    largeShip.hit();
    largeShip.hit();
    expect(largeShip.isSunk).toBe(false);
    largeShip.hit();
    expect(largeShip.isSunk).toBe(true);
})

test ("ship placement functionality", () => {
    //place a ship successfully
    const board = new Gameboard();
    expect(board.place([0, 0], 1, true)).toBe(true);
    expect(board.place([8, 6], 4, true)).toBe(true);
    expect(board.place([3, 8], 2, true)).toBe(true);
    //place a ship going out of bounds
    expect(board.place([0, 8], 3, true)).toBe(false);
    //place a ship so there is a cell conflict
    expect(board.place([1, 8], 4, false)).toBe(false);
    //place a ship so two are adjacent
    //adjacent from the left border
    expect(board.place([0, 1], 2, true)).toBe(false);
    //adjacent from the right border
    expect(board.place([7, 3], 3, true)).toBe(false);
    //place another ship
    expect(board.place([3, 2], 4, false)).toBe(true);
    //place a ship to be adjacent to new ship from bottom border
    expect(board.place([7, 0], 4, true)).toBe(false);

});

test('Hitting and missing ships', () => {
    const board = new Gameboard();
    board.place([0, 0], 2, true);
    board.place([3, 2], 4, false);
    board.place([3, 8], 2, true);
    //miss a ship
    expect(board.receiveAttack(0, 2).miss).toBe(true);
    expect(board.receiveAttack(3, 7).miss).toBe(true);
    //attack a ship
    expect(board.receiveAttack(0, 0).hit).toBe(true);
    expect(board.receiveAttack(3, 9).hit).toBe(true);
});

test("Sinking all ships", () => {
    const board = new Gameboard();
    board.place([0, 0], 2, true);
    debugger;
    expect(board.receiveAttack(0, 0).gameOver).toBe(false);
    expect(board.receiveAttack(0, 1).gameOver).toBe(true);
    //place another ship
    board.place([3, 2], 4, false);
    result = board.receiveAttack(2, 2);
    [3, 4, 5, 6].forEach((row) => {
        expect(result.gameOver).toBe(false);
        result = board.receiveAttack(row, 2);
    })
    expect(result.gameOver).toBe(true);
});