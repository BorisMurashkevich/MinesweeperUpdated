class ShowEmptyFields { // this class contains all the logic needed to output
  // the array with empty fields, so it could be used to delete buttons above those empty fields
  emptyTabCopy = [];

  array1 = [];

  arrayLeft = [];

  arrayRight = [];

  tempArrayForSeparation = [];

  tempArrayLeftSeparate = [];

  tempArrayRightSeparate = [];

  tempArray = [];

  tabsIntWithoutEdges = [];

  leftArraysDone = [];

  rightArraysDone = [];

  leftEdgesInt = [];

  rightEdgesInt = [];

  leftEdges = [];

  rightEdges = [];

  upperEdges = [];

  lowerEdges = [];

  corners = [];

  constructor() {
    this.getEdges();
    this.getEmptyFields();
    this.convertEmptyFieldsArrayToInt();
    this.getLeftEdgesOfTheBoard();
    this.getRightEdgesOfTheBoard();
    this.getFieldsWithoutLeftAndRightEdges();
    this.showFieldsWithNoMinesAround();
    this.searchForDuplicatesInArray();
    this.convertEmptyFieldsArrayToString();
    this.fixEmptyFields();
  }

  getEdges() {
    for (let i = board.x; i < board.buttonId.length; i += board.x) {
      // making array with left edges of the board
      if (i < board.buttonId.length - board.x) {
        // lower left corner would have a different logic, so it doesn't need here
        this.leftEdges.push(board.buttonId[i]);
      }
    }
    for (let i = board.x + board.x - 1; i < board.buttonId.length; i += board.x) {
      // making array with right edges of the board(without the first one and the last one)
      if (i < board.size - 1) {
        this.rightEdges.push(board.buttonId[i]);
      }
    }
    for (let i = 1; i < board.buttonId.length; i++) {
      // making array with upper edges of the board(without the first one and the last one)
      if (i < board.x - 1) {
        this.upperEdges.push(board.buttonId[i]);
      }
    }
    for (let i = board.size + 1 - board.x; i < board.buttonId.length; i++) {
      // making array with lower edges of the board(without the first one and the last one)
      if (i < board.size - 1) {
        this.lowerEdges.push(board.buttonId[i]);
      }
    }
    this.corners.push(
      board.buttonId[0],
      board.buttonId[board.x - 1],
      board.buttonId[board.size - board.x],
      board.buttonId[board.size - 1],
    ); // making array with corners
  }

  getEmptyFields() { // making an array with empty fields
    for (let i = 0; i < board.size; i++) {
      const emptyEl = document.getElementById(board.tableId[i]);
      if (emptyEl.innerHTML === ' ') {
        this.emptyTabCopy.push(board.tableId[i]);
      }
    }
  }

  convertEmptyFieldsArrayToInt() { // converting array with empty fields into integer
    for (let i = 0; i < this.emptyTabCopy.length; i++) {
      let strChange = this.emptyTabCopy[i];
      strChange = strChange.replace('td', '');
      this.emptyTabCopy[i] = strChange;
      this.emptyTabCopy[i] = Number(this.emptyTabCopy[i]);
    }
  }

  getLeftEdgesOfTheBoard() {
    let addNumToArray = 0;
    this.leftEdgesInt.push(addNumToArray); // left edge of the board always starts with 0
    for (let i = 0; i < board.y; i++) {
      addNumToArray += board.x;
      if (addNumToArray < board.size) {
        this.leftEdgesInt.push(addNumToArray);
      }
    }
  }

  getRightEdgesOfTheBoard() {
    let addNumToArray = board.x - 1;
    this.rightEdgesInt.push(board.x - 1); // right edge of the board always starts with x-1
    // (the count starts from 0 not from 1, so 1 should be subtracted)
    for (let i = 0; i < board.y; i++) {
      addNumToArray += board.x;
      if (addNumToArray < board.size) {
        this.rightEdgesInt.push(addNumToArray);
      }
    }
  }

  getFieldsWithoutLeftAndRightEdges() {
    for (let i = 0; i < board.size; i++) {
      this.tabsIntWithoutEdges.push(i);
    }
    for (let i = 0; i < this.leftEdgesInt.length; i++) {
      const numberDelete = this.tabsIntWithoutEdges.indexOf(this.leftEdgesInt[i]);
      this.tabsIntWithoutEdges.splice(numberDelete, 1);
    }
    for (let i = 0; i < this.rightEdgesInt.length; i++) {
      const numberDelete2 = this.tabsIntWithoutEdges.indexOf(this.rightEdgesInt[i]);
      this.tabsIntWithoutEdges.splice(numberDelete2, 1);
    }
  }

  showFieldsWithNoMinesAround() {
    const getLeftAndRightEmptyFields = () => {
      // dividing array with all empty fields into multiple arrays
      for (let i = 0; i < this.emptyTabCopy.length; i++) {
        // creating arrays with all left and right empty fields
        for (let j = 0; j < this.leftEdgesInt.length; j++) {
          if (this.emptyTabCopy[i] === this.leftEdgesInt[j]) {
            this.arrayLeft.push(this.leftEdgesInt[j]); // array with only left empty fields
          } else if (this.emptyTabCopy[i] === this.rightEdgesInt[j]) {
            this.arrayRight.push(this.rightEdgesInt[j]);
          }
        }
      }
    };
    const deleteLeftAndRightEmptyFields = () => {
      for (let i = 0; i < this.leftEdgesInt.length; i++) { // deleting right and left empty fields
        // from array with all empty fields (different logic would be made for them)
        for (let j = 0; j < this.emptyTabCopy.length; j++) {
          if (this.emptyTabCopy[j] === this.leftEdgesInt[i]) {
            this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[j]), 1);
          } else if (this.emptyTabCopy[j] === this.rightEdgesInt[i]) {
            this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[j]), 1);
          }
        }
      }
      this.array1.push(this.emptyTabCopy[0]);
    };
    const arrayRecheck = () => {
      for (let k = 0; k < 5; k++) { // rechecking array 5 times to make sure every number is correct
        // (if not rechecked it might leave some doubles)
        // deleting doubles
        this.array1 = this.array1.filter((item, index) => this.array1.indexOf(item) === index);
        for (let i = 0; i < this.emptyTabCopy.length; i++) {
          for (let j = 0; j < this.array1.length; j++) {
            if (this.emptyTabCopy[i] === this.array1[j] + 1
                || this.emptyTabCopy[i] === this.array1[j] - board.y
                || this.emptyTabCopy[i] === this.array1[j] - 1
                || this.emptyTabCopy[i] === this.array1[j] + board.y) {
              this.array1.push(this.emptyTabCopy[i]);
            }
          }
        }
      }
      this.arrayLeft = this.arrayLeft.filter((item, index) => this.arrayLeft.indexOf(item) === index);
    };
    getLeftAndRightEmptyFields();
    deleteLeftAndRightEmptyFields();
    arrayRecheck();
    // Have to use an arrow function so the key word "this" wouldn't lose its context
    const fieldsSeparation = (tempArraySideSeparate, edges, array) => {
      // separating right and left empty fields and adding them into a different array
      for (let i = 0; i < array.length; i++) {
        let limit = board.x;
        if (array[i] === edges[edges.length - 1]) {
          limit = 0;
        }
        const getDocumentNext = document.getElementById(board.tableId[array[i] + limit]);
        this.tempArrayForSeparation.push(array[i]);
        if (getDocumentNext.innerHTML !== ' ') {
          tempArraySideSeparate.push(this.tempArrayForSeparation);
          this.tempArrayForSeparation = [];
        } else if (array[i] === edges[edges.length - 1]) {
          tempArraySideSeparate.push(this.tempArrayForSeparation);
          this.tempArrayForSeparation = [];
        }
      }
    };
    fieldsSeparation(this.tempArrayLeftSeparate, this.leftEdgesInt, this.arrayLeft);
    const doublesDelete = (doubleArray) => {
      // deleting double arrays between two-dimensional arrays
      const set = new Set(doubleArray.map(JSON.stringify));
      Array.from(set).map(JSON.parse);
    };
    doublesDelete(this.tempArrayLeftSeparate);
    this.arrayRight = this.arrayRight.filter((item, index) => this.arrayRight.indexOf(item) === index);
    fieldsSeparation(this.tempArrayRightSeparate, this.rightEdgesInt, this.arrayRight);
    doublesDelete(this.tempArrayRightSeparate);
    let arrayLeftFinal = [];
    const arraysForDifferentSides = (inArray, outArray, side) => {
      while (inArray.length !== 0) { // making separate arrays to open left empty fields,
        // so it wouldn't open the right ones and vice versa
        arrayLeftFinal = inArray.shift();
        for (let k = 0; k < 10; k++) {
          arrayLeftFinal = arrayLeftFinal.filter((item, index) => arrayLeftFinal.indexOf(item) === index);
          for (let i = 0; i < this.emptyTabCopy.length; i++) {
            for (let j = 0; j < arrayLeftFinal.length; j++) {
              if (side === 0) { // different logic is needed depending on the side we are working on
                // Side 0 = left side
                if (this.emptyTabCopy[i] === arrayLeftFinal[j] + 1
                    || this.emptyTabCopy[i] === arrayLeftFinal[j] - board.x
                    || this.emptyTabCopy[i] === arrayLeftFinal[j] + board.x) {
                  arrayLeftFinal.push(this.emptyTabCopy[i]);
                }
              } else if (side === 1) { // side 1 = right side
                if (this.emptyTabCopy[i] === arrayLeftFinal[j] - 1
                    || this.emptyTabCopy[i] === arrayLeftFinal[j] - board.x
                    || this.emptyTabCopy[i] === arrayLeftFinal[j] + board.x) {
                  // same logic as before but without -1(so it wouldn't open right fields)
                  arrayLeftFinal.push(this.emptyTabCopy[i]);
                }
              }
            }
          }
        }
        arrayLeftFinal = arrayLeftFinal.filter((item, index) => arrayLeftFinal.indexOf(item) === index);
        outArray.push(arrayLeftFinal);
        arrayLeftFinal = [];
      }
    };
    arraysForDifferentSides(this.tempArrayLeftSeparate, this.leftArraysDone, 0);
    arraysForDifferentSides(this.tempArrayRightSeparate, this.rightArraysDone, 1);
    doublesDelete(this.leftArraysDone);
    doublesDelete(this.rightArraysDone);
    this.array1 = this.array1.filter((item, index) => this.array1.indexOf(item) === index);
    // deleting doubles for the next array
    this.emptyTabCopy = this.emptyTabCopy.filter((val) => this.array1.indexOf(val) === -1);
    // adding our left and right arrays to the final array
    for (let i = 0; i < this.leftArraysDone.length; i++) {
      this.tempArray.push(this.leftArraysDone[i]);
    }
    for (let i = 0; i < this.rightArraysDone.length; i++) {
      this.tempArray.push(this.rightArraysDone[i]);
    }
    this.tempArray.push(this.array1);
    doublesDelete(this.tempArray);
    this.array1 = [];
    if (this.emptyTabCopy.length !== 0) {
      this.showFieldsWithNoMinesAround(); // using recursion to create arrays with empty fields
      // around mines until array with all empty fields is empty
    }
  }

  searchForDuplicatesInArray() {
    for (let i = 0; i < this.tempArray.length; i++) { // comparing array and searching
      // for the same numbers because there could be arrays
      // which supposed to be one but were separated
      for (let j = 0; j < this.tempArray[i].length; j++) {
        for (let k = 0; k < this.tempArray.length; k++) {
          this.tempArray[i] = this.tempArray[i].filter((item, index) => this.tempArray[i].indexOf(item) === index);
          for (let l = 0; l < this.tempArray[k].length; l++) {
            if (i !== k) {
              // if any same number is found we are combining two arrays and delete one of them
              if (this.tempArray[i][j] === this.tempArray[k][l]) {
                this.tempArray[i] = this.tempArray[i].concat(this.tempArray[k]);
                this.tempArray.splice(this.tempArray.indexOf(this.tempArray[k]), 1);
                k--; // undefined k length fix
              }
            }
          }
        }
      }
    }
  }

  convertEmptyFieldsArrayToString() {
    // converting numbers in the array back to string
    for (let i = 0; i < this.tempArray.length; i++) {
      let tempVar = this.tempArray[i];
      tempVar = tempVar.map(String);
      this.emptyTabCopy.push(tempVar);
    }
  }

  fixEmptyFields() {
    let emptyTabCopyNoEdges = [];
    for (let i = 0; i < this.emptyTabCopy.length; i++) {
      const emptyTabCopyNoEdgesTemp = this.emptyTabCopy[i].filter((j) => !this.leftEdges.includes(j)
                && !this.rightEdges.includes(j) && !this.upperEdges.includes(j)
                && !this.lowerEdges.includes(j) && !this.corners.includes(j));
      emptyTabCopyNoEdges.push(emptyTabCopyNoEdgesTemp);
    }
    emptyTabCopyNoEdges = emptyTabCopyNoEdges.filter((a) => !a.every(() => a === undefined));
    // deleting empty arrays
    for (let i = 0; i < emptyTabCopyNoEdges.length; i++) { // when an empty fields are open
      // there could be another empty fields diagonally which has different array
      for (let j = 0; j < emptyTabCopyNoEdges[i].length; j++) {
        // so it should be opened as well, like in windows miner
        for (let k = 0; k < emptyTabCopyNoEdges.length; k++) {
          // in order to do that another array has been created with those fields in mind.
          // It will be integrated with the main array later on
          for (let l = 0; l < emptyTabCopyNoEdges[k].length; l++) {
            if (i !== k) {
              const tabsCompareInt1 = Number(emptyTabCopyNoEdges[i][j]);
              const tabsCompareInt2 = Number(emptyTabCopyNoEdges[k][l]);
              if (tabsCompareInt1 === tabsCompareInt2 + board.x - 1
                                || tabsCompareInt1 === tabsCompareInt2 + board.x + 1
                                || tabsCompareInt1 === tabsCompareInt2 + board.x - 1
                                || tabsCompareInt1 === tabsCompareInt2 - board.x + 1
                                || tabsCompareInt1 === tabsCompareInt2 - board.x - 1) {
                emptyTabCopyNoEdges[i] = emptyTabCopyNoEdges[i].concat(emptyTabCopyNoEdges[k]);
                emptyTabCopyNoEdges.splice(emptyTabCopyNoEdges.indexOf(emptyTabCopyNoEdges[k]), 1);
                k--;
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < this.emptyTabCopy.length; i++) {
      for (let j = 0; j < this.emptyTabCopy[i].length; j++) {
        for (let k = 0; k < emptyTabCopyNoEdges.length; k++) {
          for (let l = 0; l < emptyTabCopyNoEdges[k].length; l++) {
            if (this.emptyTabCopy[i][j] === emptyTabCopyNoEdges[k][l]) {
              this.emptyTabCopy[i] = this.emptyTabCopy[i].concat(emptyTabCopyNoEdges[k]);
              this.emptyTabCopy[i] = this.emptyTabCopy[i].filter((item, index) => this.emptyTabCopy[i].indexOf(item) === index);
            }
          }
        }
      }
    }
    for (let i = 0; i < this.emptyTabCopy.length; i++) {
      for (let j = 0; j < this.emptyTabCopy[i].length; j++) {
        for (let k = 0; k < this.emptyTabCopy.length; k++) {
          this.emptyTabCopy[i] = this.emptyTabCopy[i].filter((item, index) => this.emptyTabCopy[i].indexOf(item) === index);
          for (let l = 0; l < this.emptyTabCopy[k].length; l++) {
            if (i !== k) {
              if (this.emptyTabCopy[i][j] === this.emptyTabCopy[k][l]) {
                // if any same number in the arrays is found
                // we are combining two arrays and delete one of them
                this.emptyTabCopy[i] = this.emptyTabCopy[i].concat(this.emptyTabCopy[k]);
                this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[k]), 1);
                k--;
              }
            }
          }
        }
      }
    }
  }
}

const showEmptyFields = new ShowEmptyFields();
