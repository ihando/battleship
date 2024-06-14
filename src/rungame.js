const Player = require("./player");

function rungame() {
  const player = new Player(false);
  const computer = new Player(true);
  player.gameboard.placeShip(3, 0, "h");
  computer.gameboard.placeShip(3, 0, "h");
  loadPlayerBoard(player);
  loadComputerBoard(computer);
  let playerturn = false;
  let gameEnded = false;

  document.querySelector(".button").addEventListener("click", function () {
    playerturn = true;
  });
  function handleClick(event) {
    if (!playerturn) return;
    if (event.target.classList.contains("grid-item")) {
      const index = Array.from(event.target.parentNode.children).indexOf(
        event.target
      );
      if (computer.gameboard.board[index] === 1) {
        event.target.classList.remove("white");
        event.target.classList.add("red");
        computer.gameboard.recieveAttack(index);
        computer.gameboard.board[index] = 2;
        loadComputerBoard(computer);
        playerturn = false;
        checkGameStatus();
        if (!gameEnded) {
          setTimeout(computerTurn, 1000);
        }
      } else if (computer.gameboard.board[index] === 0) {
        event.target.classList.remove("white");
        event.target.classList.add("blue");
        computer.gameboard.board[index] = 3;
        loadComputerBoard(computer);
        playerturn = false;
        if (!gameEnded) {
          setTimeout(computerTurn, 1000);
        }
      }
    }
  }
  const computergridContainer = document.getElementById("computerboard");
  computergridContainer.addEventListener("click", handleClick);

  function computerTurn() {
    const randomIndex = Math.floor(Math.random() * 100);
    if (player.gameboard.board[randomIndex] === 1) {
      player.gameboard.recieveAttack(randomIndex);
      player.gameboard.board[randomIndex] = 2;
      loadPlayerBoard(player);
      checkGameStatus();
      if (!gameEnded) {
        playerturn = true;
      }
    } else if (player.gameboard.board[randomIndex] === 0) {
      player.gameboard.board[randomIndex] = 3;
      loadPlayerBoard(player);
      if (!gameEnded) {
        playerturn = true;
      }
    }
  }

  function checkGameStatus() {
    if (player.gameboard.checkAllSunk()) {
      console.log("hi");
      endGame();
    } else if (computer.gameboard.checkAllSunk()) {
      console.log("hi");
      endGame();
    }
  }

  function endGame() {
    gameEnded = true;
    computergridContainer.removeEventListener("click", handleClick);
  }
}

function loadPlayerBoard(player) {
  const playergridContainer = document.getElementById("playerboard");
  playergridContainer.innerHTML = "";
  player.gameboard.board.forEach((value, index) => {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    if (value === 0) {
      div.classList.add("white");
    } else if (value === 2) {
      div.classList.add("red");
    } else if (value === 3) {
      div.classList.add("blue");
    }
    playergridContainer.appendChild(div);
  });
}

function loadComputerBoard(computer) {
  const computergridContainer = document.getElementById("computerboard");
  computergridContainer.innerHTML = "";
  computer.gameboard.board.forEach((value, index) => {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    if (value === 0) {
      div.classList.add("white");
    } else if (value === 2) {
      div.classList.add("red");
    } else if (value === 3) {
      div.classList.add("blue");
    }
    computergridContainer.appendChild(div);
  });
}
module.exports = rungame;
