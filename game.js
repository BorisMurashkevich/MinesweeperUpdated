class Game {
  emptyTabCopy = [];

  constructor() {
    this.infoMenu();
    this.getEmptyFields();
    this.showFieldsWIthNoMinesAround();
  }

  infoMenu() {
    document.getElementById('minesCounter').value = minePlace.minesAmount;
    // formula for measuring size of the info menu (the one with the counter and stuff)
    document.getElementById('info').style.width = `${60 * board.x + 60 + board.x * 3.2}px`;
  }

  getEmptyFields() { // making an array with empty fields
    for (let i = 0; i < board.fieldsList.length; i++) {
      if (board.fieldsList[i].mine === false) {
        if (board.fieldsList[i].amountOfMinesAround === '0') {
          this.emptyTabCopy.push(board.fieldsList[i]);
        }
      }
    }
  }

  showFieldsWIthNoMinesAround() { // list with empty fields should be divided into
    // multiple sublists, so the buttons could be deleted in the right place
    const emptyFieldTemp = [];
    emptyFieldTemp.push(this.emptyTabCopy.shift()); // we take first empty element
    for (let i = 0; i < emptyFieldTemp.length; i++) {
      const currentIdTemp = Number(emptyFieldTemp[i].td.id);
      for (let j = 0; j < this.emptyTabCopy.length; j++) {
        const currentIdEmptyTab = Number(this.emptyTabCopy[j].td.id);
        if (this.emptyTabCopy[j].isLeftEdge === true) { // if that empty element is on the edge,
          // it has its own logic, different from elements in the middle
          if (currentIdTemp === currentIdEmptyTab + 1
              || currentIdTemp === currentIdEmptyTab - board.y
              || currentIdTemp === currentIdEmptyTab + board.y
              || currentIdTemp === currentIdEmptyTab + board.y + 1
              || currentIdTemp === currentIdEmptyTab - board.y + 1) {
            emptyFieldTemp.push(this.emptyTabCopy[j]);
            this.emptyTabCopy.splice(j, 1);
          }
        } else if (this.emptyTabCopy[j].isRightEdge === true) {
          if (currentIdTemp === currentIdEmptyTab - 1
              || currentIdTemp === currentIdEmptyTab - board.y
              || currentIdTemp === currentIdEmptyTab + board.y
              || currentIdTemp === currentIdEmptyTab + board.y - 1
              || currentIdTemp === currentIdEmptyTab - board.y - 1) {
            emptyFieldTemp.push(this.emptyTabCopy[j]);
            this.emptyTabCopy.splice(j, 1);
          } // the first moved element is compared to the rest elements in the empty field list,
          // if there are other empty fields near first moved element, they add to the new list
          // and got deleted from the old list
        } else if (currentIdTemp === currentIdEmptyTab + 1
            || currentIdTemp === currentIdEmptyTab - 1
            || currentIdTemp === currentIdEmptyTab - board.y
            || currentIdTemp === currentIdEmptyTab + board.y
            || currentIdTemp === currentIdEmptyTab + board.y - 1
            || currentIdTemp === currentIdEmptyTab - board.y - 1
            || currentIdTemp === currentIdEmptyTab + board.y + 1
            || currentIdTemp === currentIdEmptyTab - board.y + 1) {
          emptyFieldTemp.push(this.emptyTabCopy[j]);
          this.emptyTabCopy.splice(j, 1);
        }
      }
    }// an array with the elements near each other gets pushed to the new array
    // when array with all empty fields is empty we get a two-dimensional array with empty fields
    // located near each other
    board.emptyFieldsList.push(emptyFieldTemp);
    if (this.emptyTabCopy.length !== 0) {
      this.showFieldsWIthNoMinesAround();
    }
  }
}
const game = new Game();
