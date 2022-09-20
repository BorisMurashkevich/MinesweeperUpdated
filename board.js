load.valueLoad(); // loading the previous selected size of the board
class Board {
  btnId = 0;

  table = document.querySelector('table');

  x;

  y;

  fieldsList = [];

  emptyFieldsList = []; // two-dimensional array with empty fields

  leftEdges = [];

  rightEdges = [];

  upperEdges = [];

  lowerEdges = [];

  allEdges = [];

  corners = [];

  constructor(x, y) {
    this.createBoard(x, y);
    this.x = x; // returning size of the board
    this.y = y;
    this.size = x * y;
    this.getEdgesOfTheBoard();
  }

  createBoard(x, y) {
    for (let i = 0; i < y; i++) {
      const tr = document.createElement('tr'); // creating rows for the table
      for (let j = 0; j < x; j++) {
        const field = new Field();
        this.fieldsList.push(field);
        const td = field.createCell();
        tr.appendChild(td);
        const btn = field.createButton();
        btn.id = this.btnId; // giving an id to each button
        td.id = this.btnId; // giving an id to each cell
        tr.appendChild(btn);
        this.btnId++;
      }
      this.table.appendChild(tr);
    }
  }

  getEdgesOfTheBoard() {
    for (let i = 0; i < this.fieldsList.length; i += this.x) {
      // changing the property of field if this field is on the edge of the board
      this.fieldsList[i].isLeftEdge = true;
    }
    for (let i = this.x - 1; i < this.fieldsList.length; i += this.x) {
      this.fieldsList[i].isRightEdge = true;
    }
    for (let i = this.x; i < this.fieldsList.length; i += this.x) {
      // making array with left edges of the board
      if (i < this.fieldsList.length - this.x) {
        // lower left corner would have a different logic, so it doesn't need here
        this.leftEdges.push(this.fieldsList[i].btn.id);
      }
    }
    for (let i = this.x + this.x - 1; i < this.fieldsList.length; i += this.x) {
      // making array with right edges of the board(without the first one and the last one)
      if (i < this.size - 1) {
        this.rightEdges.push(this.fieldsList[i].btn.id);
      }
    }
    for (let i = 1; i < this.fieldsList.length; i++) {
      // making array with upper edges of the board(without the first one and the last one)
      if (i < this.x - 1) {
        this.upperEdges.push(this.fieldsList[i].btn.id);
      }
    }
    for (let i = this.size + 1 - this.x; i < this.fieldsList.length; i++) {
      // making array with lower edges of the board(without the first one and the last one)
      if (i < this.size - 1) {
        this.lowerEdges.push(this.fieldsList[i].btn.id);
      }
    }
    this.corners.push(this.fieldsList[0].btn.id, this.fieldsList[this.x
    - 1].btn.id, this.fieldsList[this.size - this.x].btn.id, this.fieldsList[this.size - 1].btn.id);
    this.allEdges = this.allEdges.concat(
      this.leftEdges, 
      this.rightEdges,
      this.upperEdges,
      this.lowerEdges,
      this.corners,
    );
  }
}
const board = new Board(load.xValue, load.yValue);
