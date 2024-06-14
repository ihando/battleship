const ship = require("./ship");

test("ship initializes correctly", () => {
  const testship = new ship(4, []);
  expect(testship.length).toBe(4);
  expect(testship.hitnumber).toBe(0);
  expect(testship.sunk).toBe(false);
  expect(testship.positions).toEqual([]);
});

test("hit function increases hitnumber", () => {
  const testship = new ship(4, []);
  testship.hit();
  expect(testship.hitnumber).toBe(1);
});

test("isSunk works properly", () => {
  const testship = new ship(2, []);
  testship.hit();
  testship.hit();
  expect(testship.sunk).toBe(true);
});
