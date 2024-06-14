const gameboard = require("./gameboard");

test("gameboard initializes", () => {
  const testboard = new gameboard();
  const expectedBoard = Array(100).fill(0);
  expect(testboard.board).toEqual(expectedBoard);
});

test("correctly places ship", () => {
  const testboard = new gameboard();
  let expectedBoard = Array(100).fill(0);
  expectedBoard[97] = 1;
  expectedBoard[98] = 1;
  expectedBoard[99] = 1;
  testboard.placeShip(3, 97, "h");
  expect(testboard.board).toEqual(expectedBoard);
  expect(testboard.ships.length).toBe(1);

  const testboard2 = new gameboard();
  let expectedBoard2 = Array(100).fill(0);
  expectedBoard2[77] = 1;
  expectedBoard2[87] = 1;
  expectedBoard2[97] = 1;
  testboard2.placeShip(3, 77, "v");
  expect(testboard2.board).toEqual(expectedBoard2);
  expect(testboard2.ships.length).toBe(1);

  const testboard3 = new gameboard();
  let expectedBoard3 = Array(100).fill(0);
  expectedBoard3[97] = 1;
  expectedBoard3[98] = 1;
  expectedBoard3[99] = 1;
  testboard3.placeShip(3, 97, "h");
  expect(testboard3.board).toEqual(expectedBoard3);
  expect(testboard3.ships.length).toBe(1);
});

test("throws error if tried to place out of bounds", () => {
  const testboard = new gameboard();
  expect(() => {
    testboard.placeShip(3, 97, "v");
  }).toThrowError("Ship placement is out of bounds.");

  const testboard2 = new gameboard();
  expect(() => {
    testboard2.placeShip(3, 98, "h");
  }).toThrowError("Ship placement is out of bounds.");
});

test("recieve attack works properly", () => {
  const testboard = new gameboard();
  testboard.placeShip(3, 97, "h");
  testboard.placeShip(3, 0, "h");
  testboard.recieveAttack(0);
  testboard.recieveAttack(50);
  testboard.recieveAttack(0);
  let expectedBoard = Array(100).fill(0);
  expectedBoard[0] = 2;
  expectedBoard[1] = 1;
  expectedBoard[2] = 1;
  expectedBoard[50] = 3;
  expectedBoard[97] = 1;
  expectedBoard[98] = 1;
  expectedBoard[99] = 1;
  expect(testboard.ships[1].hitnumber).toBe(1);
  expect(testboard.ships[0].hitnumber).toBe(0);
  expect(testboard.board[0]).toBe(2);
  expect(testboard.board[50]).toBe(3);
  expect(testboard.board).toEqual(expectedBoard);
});

test("checkships correctly identifies if all ships have been sunk", () => {
  const testboard = new gameboard();
  testboard.placeShip(3, 0, "h");
  testboard.placeShip(3, 10, "h");
  testboard.recieveAttack(0);
  testboard.recieveAttack(1);
  testboard.recieveAttack(2);
  testboard.recieveAttack(10);
  testboard.recieveAttack(11);
  testboard.recieveAttack(12);
  expect(testboard.checkAllSunk()).toBe(true);

  const testboard2 = new gameboard();
  testboard2.placeShip(3, 0, "h");
  testboard2.placeShip(10, 0, "h");
  testboard2.recieveAttack(0);
  testboard2.recieveAttack(1);
  testboard2.recieveAttack(2);
  expect(testboard2.checkAllSunk()).toBe(false);
});
