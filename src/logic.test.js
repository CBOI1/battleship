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
    board.receiveAttack(0, 2);
    expect(board.isMiss(0, 2)).toBe(true);
    board.receiveAttack(3, 7);
    expect(board.isMiss(3, 7)).toBe(true);
    //attack a ship
    board.receiveAttack(0, 0);
    expect(board.isHit(0, 0)).toBe(true);
    board.receiveAttack(3, 9);
    expect(board.isHit(3, 9)).toBe(true);
});