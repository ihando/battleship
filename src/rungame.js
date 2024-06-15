const Player = require("./player");

function rungame() {
  const player = new Player(false);
  const computer = new Player(true);

  function placeShipsRandomly(gameboard) {
    const shipSizes = [2, 3, 3, 4, 5];

    // Helper function to check if the placement is valid
    function isValidPlacement(start, length, direction) {
      const board = gameboard.board;
      const isHorizontal = direction === "h";

      for (let i = 0; i < length; i++) {
        const index = isHorizontal ? start + i : start + i * 10;
        const row = Math.floor(index / 10);
        const col = index % 10;

        // Check boundaries and row boundaries for horizontal placement
        if (
          row < 0 ||
          row >= 10 ||
          col < 0 ||
          col >= 10 ||
          (isHorizontal &&
            Math.floor((start + i) / 10) !== Math.floor(start / 10)) ||
          board[index] !== 0
        ) {
          return false;
        }

        // Check surroundings for gap requirement
        const neighbors = [
          index - 11,
          index - 10,
          index - 9,
          index - 1,
          index + 1,
          index + 9,
          index + 10,
          index + 11,
        ];

        for (const neighbor of neighbors) {
          if (neighbor >= 0 && neighbor < 100 && board[neighbor] === 1) {
            return false;
          }
        }
      }

      return true;
    }

    // Function to actually place the ship
    function placeShip(length) {
      let placed = false;

      while (!placed) {
        const start = Math.floor(Math.random() * 100);
        const direction = Math.random() < 0.5 ? "h" : "v";

        if (isValidPlacement(start, length, direction)) {
          gameboard.placeShip(length, start, direction);
          placed = true;
        }
      }
    }

    // Place all ships
    shipSizes.forEach((size) => placeShip(size));
  }
  placeShipsRandomly(player.gameboard);
  placeShipsRandomly(computer.gameboard);
  loadPlayerBoard(player);
  loadComputerBoard(computer);
  let playerturn = false;
  let gameEnded = false;
  let gameStart = false;

  document.querySelector(".button").addEventListener("click", function () {
    playerturn = true;
    gameStart = true;
    document.querySelector(".turnmessage").innerHTML = "Player's turn";
  });
  document
    .querySelector(".changeplacement")
    .addEventListener("click", function () {
      if (!gameStart) {
        resetBoard(player);
      }
    });
  function handleClick(event) {
    document.querySelector(".turnmessage").innerHTML = "Computer's turn";
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
    let randomIndex;
    let validAttack = false;
    document.querySelector(".turnmessage").innerHTML = "Player's turn";

    while (!validAttack) {
      randomIndex = Math.floor(Math.random() * 100);

      if (player.gameboard.board[randomIndex] === 1) {
        player.gameboard.recieveAttack(randomIndex);
        player.gameboard.board[randomIndex] = 2;
        loadPlayerBoard(player);
        checkGameStatus();
        if (!gameEnded) {
          playerturn = true;
        }
        validAttack = true;
      } else if (player.gameboard.board[randomIndex] === 0) {
        player.gameboard.board[randomIndex] = 3;
        loadPlayerBoard(player);
        if (!gameEnded) {
          playerturn = true;
        }
        validAttack = true;
      }
    }
  }

  function checkGameStatus() {
    if (player.gameboard.checkAllSunk()) {
      document.querySelector(".winmessage").innerHTML("Computer won :(");
      endGame();
    } else if (computer.gameboard.checkAllSunk()) {
      document.querySelector(".winmessage").innerHTML("You won!");
      console.log("hi");
      endGame();
    }
  }

  function endGame() {
    gameEnded = true;
    computergridContainer.removeEventListener("click", handleClick);
  }

  function resetBoard(player) {
    player.gameboard.board = Array(100).fill(0);
    const playergridContainer = document.getElementById("playerboard");
    playergridContainer.innerHTML = "";
    player.gameboard.ships = [];
    placeShipsRandomly(player.gameboard);
    loadPlayerBoard(player);
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
    } else if (value === 1) {
      div.classList.add("green");
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
