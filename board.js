class Board { /** this class is responsible for creating the board and showing empty fields */
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

  createBoard(x, y) { // creating the board with provided size
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

  placeMines(numberOfMines) { // placing mines with provided amount of mines
    const mines = [];
    for (let i = 0; i < numberOfMines; i++) {
      const position = Math.floor(Math.random() * this.size); // generating random position for mine
      if (!mines.includes(position)) {
        mines.push(position);
        this.fieldsList[position].mine = true;
        this.fieldsList[position].td.innerHTML = '  ';
      } else { // if same number was generated then generating a new number
        mines.push(Math.floor(Math.random() * this.size));
        this.fieldsList[position].mine = true;
        this.fieldsList[position].td.innerHTML = '  ';
      }
    }
  }

  minesCount() { // counting mines to show them on the fields
    for (let i = 0; i < this.fieldsList.length; i++) {
      const currentElement = this.fieldsList[i];
      if (currentElement.mine) {
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
