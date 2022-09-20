class Field {
  td = document.createElement('td');

  btn = document.createElement('button');

  stateProperty = 'hidden';

  mine = false;

  flag = false;

  amountOfMinesAround = '0';

  isLeftEdge = false;

  isRightEdge = false;

  createCell() {
    this.td.className = 'cellStyle';
    this.td.innerHTML = '';
    return this.td;
  }

  createButton() {
    this.td.appendChild(this.btn);
    this.btn.className = 'jsButtonsStyle';
    this.btn.addEventListener('click', () => {
      const numbersAroundButton = [0, 1, board.x + 1, board.x, board.x - 1, -1, -board.x + 1,
        -board.x, -board.x - 1];
      const numbersAroundButtonLeft = [0, 1, board.x + 1, board.x, -board.x, -board.x + 1];
      const numbersAroundButtonRight = [0, board.x, board.x - 1, -1, -board.x - 1, -board.x];
      const numbersAroundButtonDown = [0, 1, -1, -board.x - 1, -board.x, -board.x + 1];
      const numbersAroundButtonUp = [0, 1, board.x + 1, board.x, board.x - 1, -1];
      const leftDownNumbers = [0, 1, -board.x, -board.x + 1];
      const leftUpNumbers = [0, 1, board.x, board.x + 1];
      const rightDownNumbers = [0, -1, -board.x, -board.x - 1];
      const rightUpNumbers = [0, -1, board.x - 1, board.x];
      const tableNumbers = ['1', '2', '3', '4', '5'];
      const losePicture = document.getElementById('restartBtn');
      let butnIDWithoutEdges = [];
      let deleteButtons = [];
      const idOfButtonsToDelete = [];
      stopwatch.timerIsSet++;
      // we don't need stopwatch to start every time the button pressed, so we launch it only once
      if (stopwatch.timerIsSet === 1) {
        stopwatch.startStopwatch();
      }
      for (let i = 0; i < board.fieldsList.length; i++) {
        butnIDWithoutEdges.push(board.fieldsList[i].btn.id);
      }
      butnIDWithoutEdges = butnIDWithoutEdges.filter((i) => !board.allEdges.includes(i));
      for (let i = 0; i < board.emptyFieldsList.length; i++) {
        for (let j = 0; j < board.emptyFieldsList[i].length; j++) {
          if (this.btn.id === board.emptyFieldsList[i][j].btn.id) {
            deleteButtons = board.emptyFieldsList[i];
          }
        }
      }
      for (let i = 0; i < deleteButtons.length; i++) {
        idOfButtonsToDelete.push(deleteButtons[i].btn.id);
      }
      for (let i = 0; i < idOfButtonsToDelete.length; i++) {
        // logic for buttons on the edge of the board
        const currentEl = Number(idOfButtonsToDelete[i]);
        for (let j = 0; j < board.leftEdges.length; j++) {
          for (let k = 0; k < numbersAroundButtonLeft.length; k++) {
            if (idOfButtonsToDelete[i] === board.leftEdges[j]) {
              board.fieldsList[currentEl + numbersAroundButtonLeft[k]].stateProperty = 'shown';
            } else if (idOfButtonsToDelete[i] === board.rightEdges[j]) {
              board.fieldsList[currentEl + numbersAroundButtonRight[k]].stateProperty = 'shown';
            } else if (idOfButtonsToDelete[i] === board.upperEdges[j]) {
              board.fieldsList[currentEl + numbersAroundButtonUp[k]].stateProperty = 'shown';
            } else if (idOfButtonsToDelete[i] === board.lowerEdges[j]) {
              board.fieldsList[currentEl + numbersAroundButtonDown[k]].stateProperty = 'shown';
            }
          }
        }
      }
      for (let i = 0; i < idOfButtonsToDelete.length; i++) {
        const currentEl = Number(idOfButtonsToDelete[i]);
        for (let j = 0; j < leftUpNumbers.length; j++) {
          if (idOfButtonsToDelete[i] === board.corners[0]) {
            board.fieldsList[currentEl + leftUpNumbers[j]].stateProperty = 'shown';
          } else if (idOfButtonsToDelete[i] === board.corners[1]) {
            board.fieldsList[currentEl + rightUpNumbers[j]].stateProperty = 'shown';
          } else if (idOfButtonsToDelete[i] === board.corners[2]) {
            board.fieldsList[currentEl + leftDownNumbers[j]].stateProperty = 'shown';
          }
          if (idOfButtonsToDelete[i] === board.corners[3]) {
            board.fieldsList[currentEl + rightDownNumbers[j]].stateProperty = 'shown';
          }
        }
      }
      for (let i = 0; i < idOfButtonsToDelete.length; i++) {
        // logic for buttons in the middle of the board
        const currentEl = Number(idOfButtonsToDelete[i]);
        for (let j = 0; j < butnIDWithoutEdges.length; j++) {
          const butnIdInt = Number(butnIDWithoutEdges[j]);
          for (let k = 0; k < numbersAroundButton.length; k++) {
            if (currentEl === butnIdInt) {
              board.fieldsList[currentEl + numbersAroundButton[k]].stateProperty = 'shown';
            }
          }
        }
      }
      for (let i = 0; i < tableNumbers.length; i++) {
        if (this.td.innerHTML === tableNumbers[i]) {
          this.stateProperty = 'shown';
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
          }
        }
      }
      for (let i = 0; i < board.fieldsList.length; i++) {
        if (board.fieldsList[i].stateProperty === 'shown') {
          board.fieldsList[i].btn.style.opacity = '0';
          if (board.fieldsList[i].flag === true) { // if user left a flag and button disappeared
            // cause there was no bomb the mines counter sums the count of disappeared flags
            const minesCounterHtml = document.getElementById('minesCounter');
            minePlace.minesLeftCounter++;
            minesCounterHtml.value = minePlace.minesLeftCounter;
          }
        }
      }
    });
    this.btn.addEventListener('contextmenu', () => {
      const img = "url('flag.png')";
      const minesCounterHtml = document.getElementById('minesCounter');
      if (this.stateProperty === 'hidden') {
        if (this.btn.style.background === 'grey') { // if you click and there is no flag image its shows a flag
          this.btn.style.background = img;
          this.flag = true;
          minePlace.minesLeftCounter--;
          minesCounterHtml.value = minePlace.minesLeftCounter;
          if (this.mine === true) {
            minePlace.flagCounter++; // counting placed flags
          }
        } else if (this.btn.style.background !== 'grey') { // and the opposite
          this.btn.style.background = 'grey';
          this.flag = false;
          minePlace.minesLeftCounter++;
          minesCounterHtml.value = minePlace.minesLeftCounter;
        }
        if (minePlace.minesLeftCounter < 0) {
          minePlace.minesLeftCounter++;
          minesCounterHtml.value = minePlace.minesLeftCounter;
        }
        if (minePlace.minesLeftCounter > minePlace.minesAmount) {
          minePlace.minesLeftCounter = minePlace.minesAmount;
          minesCounterHtml.value = minePlace.minesLeftCounter;
        }
        if (minePlace.flagCounter === minePlace.minesAmount) {
          // if all flags were placed correct
          // all buttons are disabling and timer is stopping
          for (let i = 0; i < board.fieldsList.length; i++) {
            board.fieldsList[i].btn.disabled = true;
            clearInterval(stopwatch.timerId);
          }
        }
      }
    });
    return this.btn;
  }
}
