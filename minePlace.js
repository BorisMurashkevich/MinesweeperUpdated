class MinePlace {
  minesAmount;

  randomMinesTemp = [];

  mines = [];

  minesForStopwatch = [];

  minesLeftCounter = [];

  flagCounter = 0;

  constructor() {
    this.minePlace();
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
    this.minesAmount = (board.size) / 8;
    this.minesAmount = Math.floor(this.minesAmount);
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
    for (let i = 0; i < board.size; i++) {
      // counting mines to show them on the table cell
      let minesCounter = 0;
      if (i < board.size - 1) {
        if (board.fieldsList[i + 1].mine === true) {
          minesCounter++;
        }
      }
      if (i < board.size - board.x - 1) {
        if (board.fieldsList[i + board.x + 1].mine === true) {
          minesCounter++;
        }
      }
      if (i <= board.size - board.x - 1) {
        if (board.fieldsList[i + board.x].mine === true) {
          minesCounter++;
        } else if (board.fieldsList[i + board.x - 1].mine === true) {
          minesCounter++;
        }
      }
      if (i !== 0) {
        if (board.fieldsList[i - 1].mine === true) {
          minesCounter++;
        }
      }
      if (i >= board.x) {
        if (board.fieldsList[i - board.x + 1].mine === true) {
          minesCounter++;
        } else if (board.fieldsList[i - board.x].mine === true) {
          minesCounter++;
        }
      }
      if (i > board.x) {
        if (board.fieldsList[i - board.x - 1].mine === true) {
          minesCounter++;
        }
      }
      if (board.fieldsList[i].mine === true) {
        board.fieldsList[i].td.style.background = "url('mine.png')";
      }
      minesCounter = minesCounter.toString();
      const drawCounter = board.fieldsList[i].td;
      board.fieldsList[i].amountOfMinesAround = minesCounter;
      drawCounter.innerHTML = minesCounter;
      drawCounter.style.textAlign = 'center';
      if (minesCounter === '1') { // adding color to each number
        drawCounter.style.color = 'blue';
      } else if (minesCounter === '2') {
        drawCounter.style.color = 'green';
      } else if (minesCounter === '3') {
        drawCounter.style.color = 'red';
      } else if (minesCounter === '4') {
        drawCounter.style.color = 'black';
      } else if (minesCounter === '5') {
        drawCounter.style.color = 'brown';
      }
      if (minesCounter === '0') {
        drawCounter.innerHTML = ' ';
      }
    }
    for (let i = 0; i < board.fieldsList.length; i++) {
      if (board.fieldsList[i].mine === true) {
        board.fieldsList[i].td.innerHTML = '  ';
      }
    }
  }
}
const minePlace = new MinePlace();
