/** This class responsible for starting the game, creating the board,
 maintaining UI and changing difficulty. */

class Game {
  constructor() {
    this.load = new LoadAndSaveTheBoard();
    this.start();
  }
  /** Method to initialize the game. */

  start() {
    this.load.valueLoad(); // loading the previous selected size of the board
    const board = new Board(this.load.xValue, this.load.yValue);
    this.UI(board.sizeX, board.sizeY);
  }
  /**
   * Placing mines with provided amount of mines.
   * @param {number} boardX Size of the board by x coordinate.
   * @param {number} boardY SIze of the board by y coordinate.
   */

  UI(boardX, boardY) { // initializing UI
    const minesCounter = document.getElementById('minesCounter');
    minesCounter.value = Math.floor((boardX * boardY) / 8);
    document.getElementById('info').style.width = `${60 * boardX + 60 + boardY * 3.2}px`;
    // formula for measuring size of the info menu (the one with the counter and stuff)
    stopwatch.startStopwatch();
  }
  /**
   * Method which is used to change the difficulty of the game.
   */

  difficulty() {
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
