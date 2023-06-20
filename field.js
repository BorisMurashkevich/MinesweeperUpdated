/** This class is used to create fields on the board,
 contains logic for win/lose cases and actions on left and right click. */
class Field {
  td = document.createElement('td');

  btn = document.createElement('button');

  mine = false;

  flag = false;

  amountOfMinesAround = 0;

  fieldList;

  id;

  fieldStates = {
    Shown: 'Shown',
    Hidden: 'Hidden',
  };

  stateProperty = this.fieldStates.Hidden;

  constructor(btnId, fieldList) {
    this.fieldList = fieldList;
    this.id = btnId;
  }
  /**
   * Create cell of the field.
   * @return {HTMLTableCellElement} cell of the field.
   */

  createCell() {
    this.td.className = 'cellStyle';
    this.td.innerHTML = '';
    this.createButton();
    return this.td;
  }
  /**
   * Method to create button. It is used when board is creating a cell
   */

  createButton() {
    this.td.appendChild(this.btn);
    this.btn.className = 'jsButtonsStyle';
    this.leftClickAction();
    this.rightClickAction();
  }
  /**
   * This method is handling left mouse click
   */

  leftClickAction() {
    this.btn.addEventListener('click', () => {
      if (this.amountOfMinesAround === 0) {
        this.revealEmptyFields(this.getEmptyFields());
      }
      this.stateProperty = this.fieldStates.Shown;
      if (this.mine) {
        this.ShowAllMines();
      }
      if (this.stateProperty === this.fieldStates.Shown) { // reveal field on click
        this.btn.style.opacity = '0';
      }
      if (this.amountOfMinesAround === 0) {
        // drawing whitespace instead of 0 if clicked field is empty
        this.amountOfMinesAround = ' ';
      }
      this.td.innerHTML = this.amountOfMinesAround.toString(); // show numbers on click
    });
  }
  /**
   * This method is handling right mouse click
   */

  rightClickAction() {
    const amountOfMines = Math.floor((this.fieldList.length) / 8);
    function updateMinesCounter(minesLeftCounter) {
      document.getElementById('minesCounter').value = minesLeftCounter;
    }
    this.btn.addEventListener('contextmenu', () => { // show flags on the right click
      let minesLeftCounter = document.getElementById('minesCounter').value;
      const flagImg = "url('flag.png')";
      if (this.stateProperty === this.fieldStates.Hidden && this.flag === false) {
        this.btn.style.background = flagImg;
        this.flag = true;
        minesLeftCounter--;
        updateMinesCounter(minesLeftCounter); // updating mines counter
      } else if (this.stateProperty === this.fieldStates.Hidden && this.flag) { // and the opposite
        this.btn.style.background = 'gray';
        this.flag = false;
        minesLeftCounter++;
        updateMinesCounter(minesLeftCounter);
      }
      if (minesLeftCounter < 0) {
        minesLeftCounter++;
        updateMinesCounter(minesLeftCounter);
      }
      if (minesLeftCounter === 0) {
        // if all flags were placed correct
        // all buttons are disabling and timer is stopping
        let correctPlacedFlags = 0;
        for (let i = 0; i < this.fieldList.length; i++) {
          if (this.fieldList[i].flag && this.fieldList[i].mine) {
            correctPlacedFlags++;
          }
          if (correctPlacedFlags === amountOfMines) { // win script
            this.fieldList[i].btn.style.pointerEvents = 'none';
            clearInterval(stopwatch.timerId);
          }
        }
      }
    });
  }

  /**
   * This method shows empty fields if user clicked on an empty field.
   */
  revealEmptyFields(emptyFields) {
    emptyFields.forEach((field) => {
      if (field.stateProperty !== this.fieldStates.Shown) {
        field.stateProperty = this.fieldStates.Shown;

        if (field.amountOfMinesAround > 0) {
          field.td.innerHTML = field.amountOfMinesAround.toString();
        }

        field.btn.style.opacity = '0';

        if (field.flag) {
          document.getElementById('minesCounter').value++;
        }

        this.revealEmptyFields(emptyFields);
      }
    });
  }

  /**
   * This method finds empty fields adjacent to clicked field.
   * @return {Array} list of empty fields.
   */

  getEmptyFields() {
    let emptyFields = [];
    const sizeOfTheBoard = this.fieldList.length;
    const sizeX = Math.sqrt(sizeOfTheBoard);
    const { id } = this;
    const row = Math.floor(id / (sizeX)); // row of the current field
    const col = id % (sizeX); // column of the current field
    for (let i = row - 1; i <= row + 1; i++) { // This line starts a loop that will iterate through
      // the rows of the fields adjacent to the current field
      // The loop starts at the row above the current field
      // and ends at the row below the current field
      for (let j = col - 1; j <= col + 1; j++) {
        // This loop starts at the column to the left of the current field
        // and ends at the column to the right of the current field
        if (i < 0 || i > sizeX - 1 || j < 0 || j > sizeX - 1) {
          // if the current element of the loop
          // is located beyond edges of the board this iteration should be skipped
          continue;
        }
        const newId = i * sizeX + j; // This line calculates the id of the field
        // that is currently being processed by loop based on its row and column
        if (newId >= 0 && newId < sizeOfTheBoard) {
          const newField = this.fieldList[newId];
          if (this.amountOfMinesAround === 0 && this.stateProperty === this.fieldStates.Hidden && !newField.isProcessed) {
            newField.isProcessed = true;
            emptyFields.push(newField);
            emptyFields = emptyFields.concat(newField.getEmptyFields());
            // Here we are recursively calling getEmptyFields method on the current field,
            // and concatenating the array of empty fields
            // returned by the recursive call with the current emptyFields array
          }
        }
      }
    }
    return emptyFields;
  }
  /**
   * This method is used when user has lost the game to show all mines on the board.
   */

  ShowAllMines() {
    for (let i = 0; i < this.fieldList.length; i++) {
      document.getElementById('restartBtn').style.backgroundImage = 'url("lose2.PNG")';
      this.fieldList[i].btn.style.pointerEvents = 'none'; // disabling buttons
      clearInterval(stopwatch.timerId); // stopping stopwatch
      if (this.fieldList[i].mine) {
        this.fieldList[i].td.style.background = "url('mine.png')"; // showing all mines
        this.fieldList[i].stateProperty = this.fieldStates.Shown;
      }
      if (this.fieldList[i].stateProperty === this.fieldStates.Shown) {
        this.fieldList[i].btn.style.opacity = '0';
      }
    }
  }
}
