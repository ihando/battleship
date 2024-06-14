class ship {
  constructor(length, positions) {
    this.length = length;
    this.hitnumber = 0;
    this.sunk = false;
    this.positions = positions;
  }

  hit() {
    this.hitnumber += 1;
    this.isSunk();
  }
  isSunk() {
    if (this.hitnumber === this.length) {
      this.sunk = true;
    }
  }
}

module.exports = ship;
