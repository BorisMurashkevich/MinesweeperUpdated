const load = new LoadAndSaveTheBoard();
load.valueLoad(); // loading the previous selected size of the board
class Board {
  tableId = []; // this array contains list of fields

  buttonId = [];

  btnId = 0;

  table = document.querySelector('table');

  x;

  y;

  constructor(x, y) {
    this.createBoard(x, y);
    this.x = x; // returning size of the board
    this.y = y;
    this.size = x * y;
  }

  createBoard(x, y) {
    for (let i = 0; i < y; i++) {
      const tr = document.createElement('tr'); // creating rows for the table
      for (let j = 0; j < x; j++) {
        const field = new Field();
        const td = field.createCell();
        tr.appendChild(td);
        const btn = field.createButton();

        btn.id = this.btnId.toString(); // giving an id to each button
        this.buttonId.push(btn.id);
        const buttonColor = document.getElementById(btn.id);
        buttonColor.style.background = 'grey';

        const tdId = `${this.btnId}td`; // giving an id to each element of the row
        td.id = tdId;
        this.tableId.push(td.id);
        tr.appendChild(btn);
        this.btnId++;
      }
      this.table.appendChild(tr);
    }
  }
}
const board = new Board(load.xValue, load.yValue);
