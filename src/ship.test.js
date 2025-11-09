const {Ship} = require("./ship.js");
const LARGE_SIZE = 4;
test("check sink property", () => {
    const largeShip = new Ship(LARGE_SIZE);
    expect(largeShip.isSunk).toBe(false);
    largeShip.attackCell(0);
    expect(largeShip.isSunk).toBe(false);
    largeShip.attackCell(1);
    largeShip.attackCell(3);
    expect(largeShip.isSunk).toBe(false);
    largeShip.attackCell(2);
    expect(largeShip.isSunk).toBe(true);
})
