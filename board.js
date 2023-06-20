/** This class is responsible for creating the board
 *  and showing empty fields. */
class Board {
  btnId = 0;

  table = document.querySelector('table');

  sizeX;

  sizeY;

  fieldsList = [];

  constructor(x, y) {
    this.createBoard(x, y);
    this.sizeX = x; // returning size of the board
    this.sizeY = y;
    this.size = x * y;
    this.placeMines(Math.floor((this.size) / 8));
    this.minesCount();
  }

  /**
   * Creates the board with provided size.
   * @param {number} x Number of fields by x coordinate.
   * @param {number} y Number of fields by y coordinate.
   */

  createBoard(x, y) {
    for (let i = 0; i < y; i++) {
      const tr = document.createElement('tr'); // creating rows for the table
      for (let j = 0; j < x; j++) {
        const field = new Field(this.btnId, this.fieldsList);
        this.fieldsList.push(field);
        const td = field.createCell();
        tr.appendChild(td);
        field.btn.id = this.btnId.toString(); // giving an id to each button
        td.id = this.btnId.toString(); // giving an id to each cell
        tr.appendChild(field.btn);
        this.btnId++;
      }
      this.table.appendChild(tr);
    }
  }
  /**
   * Generating mine position.
   * @param {Array} mines All coordinates of mines which will be placed on the board.
   * @return {number} Generated coordinate of mine.
   */

  generateMinePos(mines) {
    const position = Math.floor(Math.random() * this.size); // generating random position for mine
    if (mines.includes(position)) { // check if there was already generated the same number
      this.generateMinePos(mines);
    }
    return position;
  }
  /**
   * Placing mines with provided amount of mines.
   * @param {number} numberOfMines Amount of mines which will be placed on the board.
   */

  placeMines(numberOfMines) {
    const mines = [];
    for (let i = 0; i < numberOfMines; i++) {
      const position = this.generateMinePos(mines); // generated mine position
      mines.push(position);
      this.fieldsList[position].mine = true;
    }
  }
  /**
   * Counting mines to show them on the fields
   * First we go through all the fields to find fields with mines
   * "current element" - field with mine of current iteration
   * Then we go through the fields id located around our "current element"
   * Those fields id are called "currentLoopElementId"
   * While we go through field id's we're accessing fields by those id's
   * and incrementing the counter
   */

  minesCount() {
    for (let i = 0; i < this.fieldsList.length; i++) {
      const currentElement = this.fieldsList[i];
      if (currentElement.mine) { // if an element with mine is found
        // than we add +1 to all the fields around that field with mine
        const { id } = currentElement;
        const row = Math.floor(id / this.sizeX); // row of the current field
        const col = id % this.sizeX;
        for (let j = row - 1; j <= row + 1; j++) {
          for (let k = col - 1; k <= col + 1; k++) {
            if (j < 0 || j > this.sizeX - 1 || k < 0 || k > this.sizeX - 1) {
              // if the current element of the loop is located beyond edges of the board
              // this iteration should be skipped
              continue;
            }
            const currentLoopElementId = j * this.sizeX + k;
            if (currentLoopElementId >= 0 && currentLoopElementId < this.size) {
              this.fieldsList[currentLoopElementId].amountOfMinesAround++;
            }
          }
        }
      }
    }
  }
}
