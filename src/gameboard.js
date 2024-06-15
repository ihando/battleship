const ship = require("./ship");

class gameboard {
  constructor() {
    //0=empty 1=ship 2=hit 3=miss
    this.board = Array(100).fill(0);
    this.ships = [];
  }

  //need to make sure you can't place ship where there is already a ship
  placeShip(length, startCoordinate, direction) {
    //check if ship will go out of bounds
    if (
      (direction === "h" && startCoordinate + (length - 1) >= 100) ||
      (direction === "v" && startCoordinate + 10 * (length - 1) >= 100)
    ) {
      throw new Error("Ship placement is out of bounds.");
    }
    let temppositions = [];
    if (direction === "h") {
      for (let i = 0; i < length; i++) {
        temppositions.push(startCoordinate + i);
        this.board[startCoordinate + i] = 1;
      }
    } else if (direction === "v") {
      for (let i = 0; i < length; i++) {
        temppositions.push(startCoordinate + i);
        this.board[startCoordinate + 10 * i] = 1;
      }
    }
    const tempship = new ship(length, temppositions);
    this.ships.push(tempship);
  }

  recieveAttack(coordinate) {
    if (this.board[coordinate] === 1) {
      this.board[coordinate] = 2;
      for (let i = 0; i < this.ships.length; i++) {
        console.log(this.ships[i].positions);
        if (this.ships[i].positions.includes(coordinate)) {
          console.log("hi");
          this.ships[i].hit();
          break;
        }
      }
    } else if (this.board[coordinate] === 0) {
      this.board[coordinate] = 3;
    }
  }

  checkAllSunk() {
    let counter = 0;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].sunk) {
        counter += 1;
      }
    }
    if (counter === this.ships.length) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = gameboard;

/*
placeShip(length, startCoordinate, direction) {
    // Check if ship will go out of bounds
    let status = true;
    if (
      (direction === "h" && (startCoordinate % 10) + (length - 1) >= 10) ||
      (direction === "v" && startCoordinate + 10 * (length - 1) >= 100)
    ) {
      throw new Error("Ship placement is out of bounds.");
    }

    let temppositions = [];

    if (direction === "h") {
      for (let i = 0; i < length; i++) {
        let position = startCoordinate + i;
        if (this.isOccupiedOrTooClose(position)) {
            status=false;
          throw new Error("Ship placement overlaps with another ship or is too close to another ship.");
        }
        temppositions.push(position);
      }
    } else if (direction === "v") {
      for (let i = 0; i < length; i++) {
        let position = startCoordinate + 10 * i;
        if (this.isOccupiedOrTooClose(position)) {
            status=false;
          throw new Error("Ship placement overlaps with another ship or is too close to another ship.");
        }
        temppositions.push(position);
      }
    }

    // Place the ship on the board and mark positions as occupied
    if (status) {
        for (let pos of temppositions) {
      this.board[pos] = 1;
    }

    const tempship = new Ship(length, temppositions);
    this.ships.push(tempship);
    }
  }

  isOccupiedOrTooClose(position) {
    const proximityOffsets = [-11, -10, -9, -1, 0, 1, 9, 10, 11];
    for (let offset of proximityOffsets) {
      const adjacentPosition = position + offset;
      if (adjacentPosition >= 0 && adjacentPosition < 100 && this.board[adjacentPosition] === 1) {
        return true;
      }
    }
    return false;
  }
  */
