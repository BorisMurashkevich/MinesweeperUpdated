class Game { /** This class responsible for starting the game, creating the board,
 maintaining UI and changing difficulty */
  constructor() {
    this.load = new LoadAndSaveTheBoard();
    this.start();
  }

  start() { // method to initialize the game
    this.load.valueLoad(); // loading the previous selected size of the board
    const board = new Board(this.load.xValue, this.load.yValue);
    this.UI(board.sizeX, board.sizeY);
  }

  UI(boardX, boardY) { // initializing UI
    const minesCounter = document.getElementById('minesCounter');
    minesCounter.value = Math.floor((boardX * boardY) / 8);
    document.getElementById('info').style.width = `${60 * boardX + 60 + boardY * 3.2}px`;
    // formula for measuring size of the info menu (the one with the counter and stuff)
    stopwatch.startStopwatch();
  }

  difficulty() { // method to change difficulty
    const difficultyLevel = document.getElementById('diffLevel');
    if (difficultyLevel.value === 'Easy') {
      document.getElementById('XInput').value = 9;
      document.getElementById('YInput').value = 9;
    } else if (difficultyLevel.value === 'Medium') {
      document.getElementById('XInput').value = 15;
      document.getElementById('YInput').value = 15;
    } else if (difficultyLevel.value === 'Hard') {
      document.getElementById('XInput').value = 20;
      document.getElementById('YInput').value = 20;
    }
  }
}
const game = new Game();
