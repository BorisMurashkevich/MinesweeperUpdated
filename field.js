class Field { /** this class is used to create fields on the board, 
 contains logic for win/lose cases and actions on left and right click */
  td = document.createElement('td');

  btn = document.createElement('button');

  stateProperty = 'hidden';

  mine = false;

  flag = false;

  amountOfMinesAround = 0;

  constructor(btnId, fieldList) {
    this.fieldList = fieldList;
    this.id = btnId;
  }

  createCell() { // method is used to create cell of the field
    this.td.className = 'cellStyle';
    this.td.innerHTML = '';
    const createButton = () => {
      this.td.appendChild(this.btn);
      this.btn.className = 'jsButtonsStyle';
      this.btn.addEventListener('click', () => {
        if (this.amountOfMinesAround === 0) {
          this.revealEmptyFields();
        }
        this.stateProperty = 'shown';
        if (this.mine) {
          this.IsLost();
        }
        if (this.stateProperty === 'shown') { // reveal field on click
          this.btn.style.opacity = '0';
        }
        if (this.amountOfMinesAround === 0) {
          // drawing whitespace instead of 0 if clicked field is empty
          this.amountOfMinesAround = ' ';
        }
        this.td.innerHTML = this.amountOfMinesAround.toString(); // show numbers on click
      });
      this.btn.addEventListener('contextmenu', () => { // show flags on the right click
        const flagImg = "url('flag.png')";
        let minesLeftCounter = document.getElementById('minesCounter').value;
        function updateMinesCounter() {
          document.getElementById('minesCounter').value = minesLeftCounter;
        }
        const amountOfMines = Math.floor((this.fieldList.length) / 8);
        // length of field list is equal to size of the board
        if (this.stateProperty === 'hidden') {
          if (this.flag === false) { // if you click and there is no flag image its shows a flag
            this.btn.style.background = flagImg;
            this.flag = true;
            minesLeftCounter--;
            updateMinesCounter();
          } else if (this.flag) { // and the opposite
            this.btn.style.background = 'gray';
            this.flag = false;
            minesLeftCounter++;
            updateMinesCounter();
          }
          if (minesLeftCounter < 0) {
            minesLeftCounter++;
            updateMinesCounter();
          }
          if (minesLeftCounter > amountOfMines) {
            minesLeftCounter = amountOfMines;
            updateMinesCounter();
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
        }
      });
    };
    createButton();
    return this.td;
  }

  revealEmptyFields() { // this method shows empty fields if user clicked on an empty field
    const emptyFields = this.getEmptyFields();
    emptyFields.forEach((field) => field.stateProperty = 'shown');
    for (let i = 0; i < emptyFields.length; i++) {
      if (emptyFields[i].stateProperty === 'shown') { // showing empty fields
        if (emptyFields[i].amountOfMinesAround > 0) {
          // if revealed field has a number this number should be drawn
          emptyFields[i].td.innerHTML = emptyFields[i].amountOfMinesAround.toString();
        }
        emptyFields[i].btn.style.opacity = '0';
      }
      if (emptyFields[i].flag) {
        document.getElementById('minesCounter').value++;
      }
    }
  }

  getEmptyFields() { // this method finds empty fields adjacent to clicked field
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
          if (this.amountOfMinesAround === 0 && this.stateProperty === 'hidden' && !newField.isProcessed) {
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

  IsLost() { // lose script
    for (let i = 0; i < this.fieldList.length; i++) {
      document.getElementById('restartBtn').style.backgroundImage = 'url("lose2.PNG")';
      this.fieldList[i].btn.style.pointerEvents = 'none'; // disabling buttons
      clearInterval(stopwatch.timerId); // stopping stopwatch
      if (this.fieldList[i].mine) {
        this.fieldList[i].td.style.background = "url('mine.png')"; // showing all mines
        this.fieldList[i].stateProperty = 'shown';
      }
      if (this.fieldList[i].stateProperty === 'shown') {
        this.fieldList[i].btn.style.opacity = '0';
      }
    }
  }
}
