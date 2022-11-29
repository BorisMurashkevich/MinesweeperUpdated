load.valueLoad(); // loading the previous selected size of the board
class Board { // this class is responsible for creating the board and showing empty fields
  btnId = 0;

  table = document.querySelector('table');

  sizeX;

  sizeY;

  flagCounter = 0; // variable, used by field to count flags placed on the board

  fieldsList = [];

  emptyFieldList = [];

  emptyFieldsListSeparated = []; // two-dimensional array with empty fields, separated into
  // different groups in order to delete the right fields when a button is pressed

  constructor(x, y) {
    this.createBoard(x, y);
    this.sizeX = x; // returning size of the board
    this.sizeY = y;
    this.size = x * y;
  }

  createBoard(x, y) {
    for (let i = 0; i < y; i++) {
      const tr = document.createElement('tr'); // creating rows for the table
      for (let j = 0; j < x; j++) {
        const field = new Field();
        this.fieldsList.push(field);
        const td = field.createCell();
        tr.appendChild(td);
        field.btn.id = this.btnId; // giving an id to each button
        td.id = this.btnId; // giving an id to each cell
        tr.appendChild(field.btn);
        this.btnId++;
      }
      this.table.appendChild(tr);
    }
  }

  showFieldsWithNoMinesAround(indexOfCurrentElement, deleteButtons) {
    // those numbers are used to open empty fields around clicked field,
    // depending on the location of the clicked field
    const numbersAroundField = [0, 1, this.sizeX + 1, this.sizeX,
      this.sizeX - 1, -1, -this.sizeX + 1,
      -this.sizeX, -this.sizeX - 1];
    const numbersAroundFieldLeft = [0, 1, this.sizeX + 1, this.sizeX, -this.sizeX, -this.sizeX + 1];
    const numbersAroundFieldRight = [0, this.sizeX, this.sizeX - 1, -1,
      -this.sizeX - 1, -this.sizeX];
    const numbersAroundFieldDown = [0, 1, -1, -this.sizeX - 1, -this.sizeX, -this.sizeX + 1];
    const numbersAroundFieldTop = [0, 1, this.sizeX + 1, this.sizeX, this.sizeX - 1, -1];
    const lowerLeftCornerNum = [0, 1, -this.sizeX, -this.sizeX + 1];
    const upperLeftCornerNum = [0, 1, this.sizeX, this.sizeX + 1];
    const lowerRightCornerNum = [0, -1, -this.sizeX, -this.sizeX - 1];
    const upperRightCornerNum = [0, -1, this.sizeX - 1, this.sizeX];
    const idOfCurrentElement = Number(deleteButtons[indexOfCurrentElement].btn.id);
    let elementHasBeenProcessed = false;
    for (let i = 1; i < this.sizeX - 1; i++) { // working with top side without corners
      if (idOfCurrentElement === i) {
        for (let j = 0; j < numbersAroundFieldTop.length; j++) {
          this.fieldsList[idOfCurrentElement + numbersAroundFieldTop[j]].stateProperty = 'shown';
          elementHasBeenProcessed = true;
        }
      }
    }
    for (let i = this.size - this.sizeX + 1; i < this.size - 1; i++) {
      // working with bottom side without corners
      if (idOfCurrentElement === i) {
        for (let j = 0; i < numbersAroundFieldDown.length; j++) {
          this.fieldsList[idOfCurrentElement + numbersAroundFieldDown[j]].stateProperty = 'shown';
          elementHasBeenProcessed = true;
        }
      }
    }
    if (Number.isInteger(idOfCurrentElement / this.sizeY)) {
      // if id of the field can be divided by sizeY as integer then this field is on the left side
      if (idOfCurrentElement !== 0 && idOfCurrentElement !== this.size - this.sizeX) {
        // corners require a different logic
        for (let i = 0; i < numbersAroundFieldLeft.length; i++) {
          this.fieldsList[idOfCurrentElement + numbersAroundFieldLeft[i]].stateProperty = 'shown';
          elementHasBeenProcessed = true;
        }
      }
    }
    if (Number.isInteger((idOfCurrentElement + 1) / this.sizeY)) {
      // working on the right side. If you sum 1 to the id's of the right side
      // you'll get id's of the left side, which can be divided by sizeY as integer
      if (idOfCurrentElement !== this.sizeX - 1 && idOfCurrentElement !== this.size - 1) {
        for (let i = 0; i < numbersAroundFieldRight.length; i++) {
          this.fieldsList[idOfCurrentElement + numbersAroundFieldRight[i]].stateProperty = 'shown';
          elementHasBeenProcessed = true;
        }
      }
    }
    if (idOfCurrentElement === 0) { // working with upper left corner
      // When clicking on a corner only 4 buttons instead of usual 9 should be opened
      // So they would have a different logic. Same goes for the edges
      for (let i = 0; i < upperLeftCornerNum.length; i++) {
        this.fieldsList[idOfCurrentElement + upperLeftCornerNum[i]].stateProperty = 'shown';
        elementHasBeenProcessed = true;
      }
    }
    if (idOfCurrentElement === this.sizeX - 1) { // upper right corner
      for (let i = 0; i < upperRightCornerNum.length; i++) {
        this.fieldsList[idOfCurrentElement + upperRightCornerNum[i]].stateProperty = 'shown';
        elementHasBeenProcessed = true;
      }
    }
    if (idOfCurrentElement === this.size - this.sizeX) { // lower left corner
      for (let i = 0; i < lowerLeftCornerNum.length; i++) {
        this.fieldsList[idOfCurrentElement + lowerLeftCornerNum[i]].stateProperty = 'shown';
        elementHasBeenProcessed = true;
      }
    }
    if (idOfCurrentElement === this.size - 1) { // lower right corner
      for (let i = 0; i < lowerRightCornerNum.length; i++) {
        this.fieldsList[idOfCurrentElement + lowerRightCornerNum[i]].stateProperty = 'shown';
        elementHasBeenProcessed = true;
      }
    }
    if (elementHasBeenProcessed === false) {
      // checking if current field has already been processed by another condition
      for (let i = 0; i < numbersAroundField.length; i++) {
        this.fieldsList[idOfCurrentElement + numbersAroundField[i]].stateProperty = 'shown';
        elementHasBeenProcessed = true;
      }
    }
    if (indexOfCurrentElement < deleteButtons.length - 1) {
      // calling the function on each field which should be opened
      indexOfCurrentElement++;
      this.showFieldsWithNoMinesAround(indexOfCurrentElement, deleteButtons);
    }
  }

  separateEmptyFields(iteration) { // list with empty fields should be divided into
    // multiple sublists, so the buttons could be deleted in the right place
    iteration++;
    if (iteration === 1) {
      for (let i = 0; i < this.fieldsList.length; i++) { // making array with empty fields
        this.fieldsList[i].btn.style.opacity = '0.5';
        if (this.fieldsList[i].mine === false) {
          if (this.fieldsList[i].amountOfMinesAround === '0') {
            this.emptyFieldList.push(this.fieldsList[i]);
          }
        }
      }
    }
    const emptyFieldTemp = [];
    emptyFieldTemp.push(this.emptyFieldList.shift()); // we take first empty element
    for (let i = 0; i < emptyFieldTemp.length; i++) {
      const currentIdTemp = Number(emptyFieldTemp[i].td.id);
      for (let j = 0; j < this.emptyFieldList.length; j++) {
        const currentIdEmptyTab = Number(this.emptyFieldList[j].td.id);
        if (Number.isInteger((this.emptyFieldList[j].btn.id) / this.sizeY)) {
          // if that empty element is on the edge,
          // it has its own logic, different from elements in the middle
          if (currentIdTemp === currentIdEmptyTab + 1
              || currentIdTemp === currentIdEmptyTab - this.sizeY
              || currentIdTemp === currentIdEmptyTab + this.sizeY
              || currentIdTemp === currentIdEmptyTab + this.sizeY + 1
              || currentIdTemp === currentIdEmptyTab - this.sizeY + 1) {
            emptyFieldTemp.push(this.emptyFieldList[j]);
            this.emptyFieldList.splice(j, 1);
          }
        } else if (Number.isInteger((this.emptyFieldList[j].btn.id + 1) / this.sizeY)) {
          // right side
          if (currentIdTemp === currentIdEmptyTab - 1
              || currentIdTemp === currentIdEmptyTab - this.sizeY
              || currentIdTemp === currentIdEmptyTab + this.sizeY
              || currentIdTemp === currentIdEmptyTab + this.sizeY - 1
              || currentIdTemp === currentIdEmptyTab - this.sizeY - 1) {
            emptyFieldTemp.push(this.emptyFieldList[j]);
            this.emptyFieldList.splice(j, 1);
          } // the first moved element is compared to the rest elements in the empty field list,
          // if there are other empty fields near first moved element, they add to the new list
          // and got deleted from the old list
        } else if (currentIdTemp === currentIdEmptyTab + 1
            || currentIdTemp === currentIdEmptyTab - 1
            || currentIdTemp === currentIdEmptyTab - this.sizeY
            || currentIdTemp === currentIdEmptyTab + this.sizeY
            || currentIdTemp === currentIdEmptyTab + this.sizeY - 1
            || currentIdTemp === currentIdEmptyTab - this.sizeY - 1
            || currentIdTemp === currentIdEmptyTab + this.sizeY + 1
            || currentIdTemp === currentIdEmptyTab - this.sizeY + 1) {
          emptyFieldTemp.push(this.emptyFieldList[j]);
          this.emptyFieldList.splice(j, 1);
        }
      }
    }// array with the elements near each other gets pushed to the new array
    // when array with all empty fields is empty we get a two-dimensional array with empty fields
    // located near each other
    this.emptyFieldsListSeparated.push(emptyFieldTemp);
    if (this.emptyFieldList.length !== 0) {
      this.separateEmptyFields(iteration);
    }
  }
}
const board = new Board(load.xValue, load.yValue);
