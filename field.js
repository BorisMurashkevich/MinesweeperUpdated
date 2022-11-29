class Field { // this class is used to create fields on the board, contains logic for win/lose cases
  // and actions on left and right click
  td = document.createElement('td');

  btn = document.createElement('button');

  stateProperty = 'hidden';

  mine = false;

  flag = false;

  amountOfMinesAround = '0';

  createCell() {
    this.td.className = 'cellStyle';
    this.td.innerHTML = '';
    const createButton = () => {
      this.td.appendChild(this.btn);
      this.btn.className = 'jsButtonsStyle';
      this.btn.addEventListener('click', () => {
        const losePicture = document.getElementById('restartBtn');
        let deleteButtons = [];
        this.stateProperty = 'shown';
        stopwatch.timerIsSet++;
        // we don't need stopwatch to start every time the button pressed, so we launch it only once
        if (stopwatch.timerIsSet === 1) {
          stopwatch.startStopwatch();
        }
        for (let i = 0; i < board.emptyFieldsListSeparated.length; i++) {
          for (let j = 0; j < board.emptyFieldsListSeparated[i].length; j++) {
            if (this.btn.id === board.emptyFieldsListSeparated[i][j].btn.id) {
              // if this field is empty then creating array with this
              // and other empty fields around it
              deleteButtons = board.emptyFieldsListSeparated[i];
            }
          }
        }
        if (this.mine === true) { // if user pressed a btn with mine, the stopwatch is stopping,
          // all mines are showing and buttons are disabling
          clearInterval(stopwatch.timerId);
          losePicture.style.backgroundImage = 'url("lose2.PNG")';
          for (let i = 0; i < board.fieldsList.length; i++) {
            board.fieldsList[i].btn.style.pointerEvents = 'none';
            if (board.fieldsList[i].mine === true) {
              board.fieldsList[i].stateProperty = 'shown';
              board.fieldsList[i].td.style.background = "url('mine.png')";
            }
          }
        }
        if (this.mine === false && this.amountOfMinesAround === '0') { // if there are no bombs around
          // nor this field contain a bomb then calling a function to open empty fields
          board.showFieldsWithNoMinesAround(0, deleteButtons);
        }
        for (let i = 0; i < board.fieldsList.length; i++) {
          const currentElement = board.fieldsList[i];
          if (currentElement.stateProperty === 'shown') {
            // if the field is shown then rendering numbers of mines around that field
            currentElement.btn.style.opacity = '0';
            currentElement.td.innerHTML = currentElement.amountOfMinesAround;
            if (currentElement.amountOfMinesAround === '1') { // adding color to each number
              currentElement.td.style.color = 'blue';
            } else if (currentElement.amountOfMinesAround === '2') {
              currentElement.td.style.color = 'green';
            } else if (currentElement.amountOfMinesAround === '3') {
              currentElement.td.style.color = 'red';
            } else if (currentElement.amountOfMinesAround === '4') {
              currentElement.td.style.color = 'black';
            } else if (currentElement.amountOfMinesAround === '5') {
              currentElement.td.style.color = 'brown';
            }
            if (currentElement.amountOfMinesAround === '0') { // if there are no mines around the field should be empty
              currentElement.td.innerHTML = ' ';
            }
            if (currentElement.mine) {
              // if there is a mine on a field, only an image of mine should be shown
              currentElement.td.innerHTML = ' ';
            }
            if (board.fieldsList[i].flag === true) { // if user left a flag and button disappeared
              // cause there was no bomb the mines counter sums the count of disappeared flags
              const minesCounterHtml = document.getElementById('minesCounter');
              mines.minesLeftCounter++;
              minesCounterHtml.value = mines.minesLeftCounter;
              board.fieldsList[i].flag = false;
            }
          }
        }
      });
      this.btn.addEventListener('contextmenu', () => { // showing flags on right click
        const img = "url('flag.png')";
        const minesCounterHtml = document.getElementById('minesCounter');
        if (this.stateProperty === 'hidden') {
          if (this.flag === false) { // if you click and there is no flag image its shows a flag
            this.btn.style.background = img;
            this.flag = true;
            mines.minesLeftCounter--;
            minesCounterHtml.value = mines.minesLeftCounter;
            if (this.mine === true) {
              board.flagCounter++; // counting placed flags
            }
          } else if (this.flag) { // and the opposite
            this.btn.style.background = 'gray';
            this.flag = false;
            mines.minesLeftCounter++;
            minesCounterHtml.value = mines.minesLeftCounter;
          }
          if (mines.minesLeftCounter < 0) {
            mines.minesLeftCounter++;
            minesCounterHtml.value = mines.minesLeftCounter;
          }
          if (mines.minesLeftCounter > mines.minesAmount) {
            mines.minesLeftCounter = mines.minesAmount;
            minesCounterHtml.value = mines.minesLeftCounter;
          }
          if (board.flagCounter === mines.minesAmount) {
            // if all flags were placed correct
            // all buttons are disabling and timer is stopping
            for (let i = 0; i < board.fieldsList.length; i++) {
              board.fieldsList[i].btn.disabled = true;
              clearInterval(stopwatch.timerId);
            }
          }
        }
      });
    };
    createButton();
    return this.td;
  }
}
