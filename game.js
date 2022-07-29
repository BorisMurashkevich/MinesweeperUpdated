class Game {
  constructor() {
    this.infoMenu();
    this.hideButtonsWithEmptyFields();
  }
  infoMenu() {
    document.getElementById('minesCounter').value = minePlace.minesAmount;
    // formula for measuring size of the info menu (the one with the counter and stuff)
    document.getElementById('info').style.width = `${60 * board.x + 60 + board.x * 3.2}px`;
  }

  showFlag() {
    let minesLeftCounter = minePlace.minesAmount;
    let flagCounter = 0;
    const buttonsWithMines = minePlace.mines;
    for (let i = 0; i < buttonsWithMines.length; i++) { // slicing 'td'
      buttonsWithMines[i] = buttonsWithMines[i].slice(0, -2);
    }
    document.addEventListener('contextmenu', (e) => {
      const { target } = e;
      const targetId = target.id;
      const img = "url('flag.png')";
      const indexOfPressedButton = board.buttonId.indexOf(targetId, 0);
      const getPressedButton = document.getElementById(board.buttonId[indexOfPressedButton]);
      const minesCounterHtml = document.getElementById('minesCounter');
      if (getPressedButton.style.opacity !== '0') {
        if (getPressedButton.style.background === 'grey') { // if you click and there is no flag image its shows a flag
          getPressedButton.disabled = true;
          getPressedButton.style.background = img;
          minesLeftCounter--;
          minesCounterHtml.value = minesLeftCounter;
          for (let i = 0; i < buttonsWithMines.length; i++) {
            if (board.buttonId[indexOfPressedButton] === buttonsWithMines[i]) {
              flagCounter++; // counting placed flags
            }
          }
        } else if (getPressedButton.style.background !== 'grey') { // and the opposite
          getPressedButton.disabled = false;
          getPressedButton.style.background = 'grey';
          minesLeftCounter++;
          minesCounterHtml.value = minesLeftCounter;
          // if (board.buttonId[indexOfPressedButton] === buttonsWithMines[i]) {
          //   flagCounter--;
          // }
        }
        if (minesLeftCounter < 0) {
          minesLeftCounter++;
          minesCounterHtml.value = minesLeftCounter;
        }
        if (minesLeftCounter > minePlace.minesAmount) {
          minesLeftCounter = minePlace.minesAmount;
          minesCounterHtml.value = minesLeftCounter;
        }
        if (flagCounter === minePlace.minesAmount) {
          // if all flags were placed correct
          // all buttons are disabling and timer is stopping(win script)
          for (let i = 0; i < board.buttonId.length; i++) {
            const disableAllButtons = document.getElementById(board.buttonId[i]);
            disableAllButtons.disabled = true;
            clearInterval(stopwatch.timerId);
          }
        }
      }
    });
    return minesLeftCounter;
  }

  hideButtonsWithEmptyFields() {
    let minesLeftCounter = this.showFlag();
    document.addEventListener('click', (e) => {
      stopwatch.timerIsSet++;
      // we don't need stopwatch to start every time the button pressed, so we launch it only once
      if (stopwatch.timerIsSet === 1) {
        stopwatch.startStopwatch();
      }
      const minesCounterHtml = document.getElementById('minesCounter');
      const { target } = e;
      const targetId = target.id;
      const indexOfPressedButton = board.buttonId.indexOf(targetId, 0);
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
      let buttonIdForDelete = [];
      let btnWithNum = 0;
      const getPressedDocument = document.getElementById(board.tableId[indexOfPressedButton]);
      const losePicture = document.getElementById('restartBtn');
      for (let i = 0; i < minePlace.minesForStopwatch.length; i++) {
        if (indexOfPressedButton === minePlace.minesForStopwatch[i]) {
          // if user pressed a btn with mine, the stopwatch is stopping,
          // all mines are showing and buttons are disabling
          clearInterval(stopwatch.timerId);
          losePicture.style.backgroundImage = 'url("lose2.PNG")';
          for (let j = 0; j < minePlace.minesForStopwatch.length; j++) {
            const btnWithMines = document.getElementById(board.buttonId[minePlace.minesForStopwatch[j]]);
            btnWithMines.style.opacity = '0';
            for (let k = 0; k < board.buttonId.length; k++) {
              const disableAllButtons = document.getElementById(board.buttonId[k]);
              disableAllButtons.style.pointerEvents = 'none';
            }
          }
        }
      }
      for (let i = 0; i < tableNumbers.length; i++) {
        const btnPressed = document.getElementById(board.buttonId[indexOfPressedButton]);
        // if a cell number is 1-5 we just open it
        if (getPressedDocument.innerHTML === tableNumbers[i]) {
          btnPressed.style.opacity = '0';
          btnWithNum = 1;
        }
        if (getPressedDocument.innerHTML === '  ') {
          btnPressed.style.opacity = '0';
          btnWithNum = 1;
        }
        if (getPressedDocument.innerHTML === ' ') {
          btnWithNum = 0;
        }
      }
      // buttons id which not include edges
      buttonIdForDelete = board.buttonId.filter((i) => !showEmptyFields.leftEdges.includes(i)
          && !showEmptyFields.rightEdges.includes(i) && !showEmptyFields.upperEdges.includes(i)
          && !showEmptyFields.lowerEdges.includes(i) && !showEmptyFields.corners.includes(i));
      function buttonDelete() {
        // if button what user pressed = any number of the array with empty fields
        // we should write the array with that numbers to a new array, so we could delete buttons
        let buttonsForDelete = [];
        for (let i = 0; i < showEmptyFields.emptyTabCopy.length; i++) {
          for (let j = 0; j < showEmptyFields.emptyTabCopy[i].length; j++) {
            if (board.buttonId[indexOfPressedButton] === showEmptyFields.emptyTabCopy[i][j]) {
              buttonsForDelete = showEmptyFields.emptyTabCopy[i];
            }
          }
        }
        for (let i = 0; i < buttonsForDelete.length; i++) {
          for (let j = 0; j < showEmptyFields.leftEdges.length; j++) {
            for (let k = 0; k < numbersAroundButtonLeft.length; k++) {
              const btnDeletedInt = Number(buttonsForDelete[i]);
              if (buttonsForDelete[i] === showEmptyFields.leftEdges[j]) {
                const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                + numbersAroundButtonLeft[k]]);
                btnDeleted.style.opacity = '0';
              } else if (buttonsForDelete[i] === showEmptyFields.lowerEdges[j]) {
                const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                + numbersAroundButtonDown[k]]);
                btnDeleted.style.opacity = '0';
              } else if (buttonsForDelete[i] === showEmptyFields.rightEdges[j]) {
                const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                + numbersAroundButtonRight[k]]);
                btnDeleted.style.opacity = '0';
              } else if (buttonsForDelete[i] === showEmptyFields.upperEdges[j]) {
                const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                + numbersAroundButtonUp[k]]);
                btnDeleted.style.opacity = '0';
              } else if (buttonsForDelete[i] === board.buttonId[0]) {
                if (k < leftUpNumbers.length) { // k will be over arrays length
                  const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                  + leftUpNumbers[k]]);
                  btnDeleted.style.opacity = '0';
                }
              } else if (buttonsForDelete[i] === board.buttonId[board.x - 1]) {
                if (k < rightUpNumbers.length) {
                  const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                  + rightUpNumbers[k]]);
                  btnDeleted.style.opacity = '0';
                }
              } else if (buttonsForDelete[i] === board.buttonId[board.size - board.x]) {
                if (k < leftDownNumbers.length) {
                  const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                  + leftDownNumbers[k]]);
                  btnDeleted.style.opacity = '0';
                }
              } else if (buttonsForDelete[i] === board.buttonId[board.size - 1]) {
                if (k < rightDownNumbers.length) {
                  const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                  + rightDownNumbers[k]]);
                  btnDeleted.style.opacity = '0';
                }
              }
            }
          }
        }
        for (let i = 0; i < buttonsForDelete.length; i++) {
          for (let j = 0; j < buttonIdForDelete.length; j++) {
            for (let k = 0; k < numbersAroundButton.length; k++) {
              if (buttonsForDelete[i] === buttonIdForDelete[j]) {
                const btnDeletedInt = Number(buttonsForDelete[i]);
                const btnDeleted = document.getElementById(board.buttonId[btnDeletedInt
                + numbersAroundButton[k]]);
                btnDeleted.style.opacity = '0';
              }
            }
          }
        }
      }
      if (btnWithNum !== 1) {
        buttonDelete();
        for (let i = 0; i < board.buttonId.length; i++) {
          const getButton = document.getElementById(board.buttonId[i]);
          if (getButton.style.opacity === '0') {
            if (getButton.style.background !== 'grey') { // if user left a flag and button disappeared cause there was no bomb the mines counter sums the count of disappeared flags
              minesLeftCounter++;
              minesCounterHtml.value = minesLeftCounter;
            }
          }
        }
      }
    });
  }
}
const game = new Game();
