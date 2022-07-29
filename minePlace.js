class MinePlace {
  minesAmount;

  randomMinesTemp = [];

  mines = [];

  minesForStopwatch = [];

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
    for (let i = 0; i < this.minesAmount; i++) {
      // picking first digits to place the mines. Amount of mines defined by the board size
      const rand = this.randomMinesTemp[this.randomMinesTemp.length - 1 - i];
      this.minesForStopwatch.push(rand);
      // will be used later on to stop the timer if button with mine is pressed
      this.mines.push(`${rand}td`);
    }
    for (let i = 0; i < board.size; i++) {
      // counting the mines to show it on the table cell
      let minesCounter = 0;
      for (let j = 0; j < this.minesAmount; j++) {
        if (board.tableId[i + 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i + board.x + 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i + board.x] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i + board.x - 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i - 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i - board.x + 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i - board.x] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i - board.x - 1] === this.mines[j]) {
          minesCounter++;
        } else if (board.tableId[i] === this.mines[j]) {
          const mineDraw = document.getElementById(board.tableId[i]);
          mineDraw.style.background = "url('mine.png')";
        }
      }
      minesCounter = minesCounter.toString();
      const drawCounter = document.getElementById(board.tableId[i]);
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
    for (let i = 0; i < this.minesAmount; i++) {
      const minesPos = document.getElementById(this.mines[i]);
      minesPos.innerHTML = '  ';
    }
  }
}
const minePlace = new MinePlace();
