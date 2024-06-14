const Gameboard = require("./gameboard");

class Player {
  //new Player(false) = real player new Player(true) = computer
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  attack(opponent, coordinate) {
    opponent.gameboard.receiveAttack(coordinate);
  }

  randomAttack(opponent) {
    let coordinate;
    do {
      coordinate = Math.floor(Math.random() * 100);
    } while (opponent.gameboard.board[coordinate] !== 0);
    this.attack(opponent, coordinate);
  }
}

module.exports = Player;
