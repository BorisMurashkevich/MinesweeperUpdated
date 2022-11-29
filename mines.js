class Mines { // this class is used to place mines and count them for the field to show
  minesAmount;

  randomMinesTemp = [];

  mines = [];

  minesForStopwatch = [];

  minesLeftCounter = [];

  constructor() {
    this.minePlace();
    this.countMines();
  }

  minePlace() {
    const random = () => {
      const boardSize = [];
      const randomMinesTemp = [];
      for (let i = 0; i < board.size; i++) {
        boardSize.push(i);
      }
      for (boardSize, this.i = boardSize.length; this.i--;) {
        const randomNum = boardSize.splice(Math.floor(Math.random() * (this.i + 1)), 1)[0];
        randomMinesTemp.push(randomNum); // making a new array with digits from previous array
        // but in random order
      }
      return randomMinesTemp;
    };
    this.randomMinesTemp = random();
    const difficultyLevelMines = () => { // number of mines is selected based on the difficulty level
      if (load.xValue === 9) {
        this.minesAmount = 10;
      } else if (load.xValue === 15) {
        this.minesAmount = 20;
      } else if (load.xValue === 20) {
        this.minesAmount = 45;
      } else { // if custom size of the board is selected, then number of mines should be calculated
        this.minesAmount = (board.size) / 8;
        this.minesAmount = Math.floor(this.minesAmount);
      }
    };
    difficultyLevelMines();
    this.minesLeftCounter = this.minesAmount;
    for (let i = 0; i < this.minesAmount; i++) {
      // picking first digits to place the mines. Amount of mines defined by the board size
      const rand = this.randomMinesTemp[this.randomMinesTemp.length - 1 - i];
      this.minesForStopwatch.push(rand);
      // will be used later on to stop the timer if button with mine is pressed
      this.mines.push(rand);
    }
    for (let i = 0; i < this.mines.length; i++) {
      // placing mines and changing the field's property "mine"
      board.fieldsList[this.mines[i]].mine = true;
    }
  }

  countMines() {
    for (let i = 0; i < board.size; i++) {
      // counting mines around the field, it would be used later to show numbers on a field
      let minesCounter = 0;
      if (i < board.size - 1) {
        if (board.fieldsList[i + 1].mine === true) {
          minesCounter++;
        }
      }
      if (i < board.size - board.sizeX - 1) {
        if (board.fieldsList[i + board.sizeX + 1].mine === true) {
          minesCounter++;
        }
      }
      if (i <= board.size - board.sizeX - 1) {
        if (board.fieldsList[i + board.sizeX].mine === true) {
          minesCounter++;
        } else if (board.fieldsList[i + board.sizeX - 1].mine === true) {
          minesCounter++;
        }
      }
      if (i !== 0) {
        if (board.fieldsList[i - 1].mine === true) {
          minesCounter++;
        }
      }
      if (i >= board.sizeX) {
        if (board.fieldsList[i - board.sizeX + 1].mine === true) {
          minesCounter++;
        } else if (board.fieldsList[i - board.sizeX].mine === true) {
          minesCounter++;
        }
      }
      if (i > board.sizeX) {
        if (board.fieldsList[i - board.sizeX - 1].mine === true) {
          minesCounter++;
        }
      }
      minesCounter = minesCounter.toString();
      board.fieldsList[i].amountOfMinesAround = minesCounter;
    }
  }
}
const mines = new Mines();
