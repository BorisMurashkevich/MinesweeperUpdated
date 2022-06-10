class getEmptyFieldsAroundMines {
    emptyTabCopy = []
    array1 = []
    arrayLeft = []
    arrayRight = []
    tempArrayForSeparation = []
    tempArrayLeftSeparate = []
    tempArrayRightSeparate = []
    tempArray = []
    tabsIntWithoutEdges = []
    leftArraysDone = []
    rightArraysDone = []
    leftEdgesInt = []
    rightEdgesInt = []
    constructor() {
        this.getEmptyFields()
        this.convertEmptyFieldsArrayToInt()
        this.getLeftEdgesOfTheBoard()
        this.getRightEdgesOfTheBoard()
        this.getFieldsWithoutLeftAndRightEdges()
        this.showFieldsWithNoMinesAround()
        this.searchForDuplicatesInArray()
        this.convertEmptyFieldsArrayToString()
    }
    getEmptyFields(){           // making an array with empty fields
        for (let i = 0;i<board1.size;i++){
            let emptyEl = document.getElementById(board1.tableId[i])
            if (emptyEl.innerHTML === ' '){
                this.emptyTabCopy.push(board1.tableId[i])
            }
        }
    }
    convertEmptyFieldsArrayToInt(){       // converting array with empty fields into integer
        for (let i =0;i<this.emptyTabCopy.length;i++){
            let strChange = this.emptyTabCopy[i]
            strChange = strChange.replace("td","")
            this.emptyTabCopy[i] = strChange
            this.emptyTabCopy[i] = Number(this.emptyTabCopy[i])
        }
        console.log(this.emptyTabCopy)
    }
    getLeftEdgesOfTheBoard() {
        let addNumToArray = 0
        this.leftEdgesInt.push(addNumToArray) //left edge of the board always starts with 0
        for (let i =0;i<board1.y;i++){
            addNumToArray = addNumToArray+board1.x
            if (addNumToArray<board1.size){
                this.leftEdgesInt.push(addNumToArray)
            }
        }
    }
    getRightEdgesOfTheBoard() {
        let addNumToArray = board1.x-1
        this.rightEdgesInt.push(board1.x-1) // right edge of the board always starts with x-1(the count starts from 0 not from 1, so 1 should be subtracted)
        for (let i =0;i<board1.y;i++){
            addNumToArray = addNumToArray+board1.x
            if (addNumToArray<board1.size){
                this.rightEdgesInt.push(addNumToArray)
            }
        }
    }
    getFieldsWithoutLeftAndRightEdges(){
        for (let i = 0;i<board1.size;i++){
            this.tabsIntWithoutEdges.push(i)
        }
        for (let i=0;i<this.leftEdgesInt.length;i++){
            let numberDelete = this.tabsIntWithoutEdges.indexOf(this.leftEdgesInt[i])
            this.tabsIntWithoutEdges.splice(numberDelete,1)
        }
        for (let i=0;i<this.rightEdgesInt.length;i++){
            let numberDelete2 = this.tabsIntWithoutEdges.indexOf(this.rightEdgesInt[i])
            this.tabsIntWithoutEdges.splice(numberDelete2,1)
        }
    }
    showFieldsWithNoMinesAround(){
        let getLeftAndRightEmptyFields = ()=>{
            for (let i = 0;i<this.emptyTabCopy.length;i++){       // dividing array with all empty fields into multiple arrays
                for (let j = 0;j<this.leftEdgesInt.length;j++){   // creating arrays with all left and right empty fields
                    if (this.emptyTabCopy[i]===this.leftEdgesInt[j]){
                        this.arrayLeft.push(this.leftEdgesInt[j])            // array with only left empty fields
                    }
                    else if (this.emptyTabCopy[i]===this.rightEdgesInt[j]){
                        this.arrayRight.push(this.rightEdgesInt[j])
                    }
                }
            }
            console.log(this.emptyTabCopy)
        }
        let deleteLeftAndRightEmptyFields = ()=> {
            for (let i = 0; i < this.leftEdgesInt.length; i++) {               // deleting right and left empty fields from array with all empty fields (different logic would be made for them)
                for (let j = 0; j < this.emptyTabCopy.length; j++) {
                    if (this.emptyTabCopy[j] === this.leftEdgesInt[i]) {
                        this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[j]), 1)
                    } else if (this.emptyTabCopy[j] === this.rightEdgesInt[i]) {
                        this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[j]), 1)
                    }
                }
            }
            console.log(this.emptyTabCopy)
            this.array1.push(this.emptyTabCopy[0])
        }
        let arrayRecheck =()=>{
            for (let k =0;k<5;k++){                      // rechecking array 5 times to make sure every number is correct (if not rechecked it might leave some doubles)
                this.array1 = this.array1.filter((item, index) => {          // deleting doubles
                    return this.array1.indexOf(item) === index
                })
                for (let i = 0;i<this.emptyTabCopy.length;i++){
                    for (let j=0;j<this.array1.length;j++){
                        if (this.emptyTabCopy[i]===this.array1[j]+1 || this.emptyTabCopy[i]===this.array1[j]-board1.y || this.emptyTabCopy[i]===this.array1[j]-1 || this.emptyTabCopy[i]===this.array1[j]+board1.y){
                            this.array1.push(this.emptyTabCopy[i])
                        }
                    }
                }
            }
            this.arrayLeft = this.arrayLeft.filter((item, index) => {
                return this.arrayLeft.indexOf(item) === index
            })
        }
        getLeftAndRightEmptyFields()
        deleteLeftAndRightEmptyFields()
        arrayRecheck()
        let fieldsSeparation = (tempArraySideSeparate,edges,array) => { // Have to use an arrow function so the key word "this" wouldn't lose its context
            for (let i = 0;i<array.length;i++){             // separating right and left empty fields and adding them into a different array
                let limit = board1.x
                if (array[i]===edges[edges.length-1]){
                    limit = 0
                }
                let getDocumentNext = document.getElementById(board1.tableId[array[i]+limit])
                this.tempArrayForSeparation.push(array[i])
                if (getDocumentNext.innerHTML !== ' '){
                    tempArraySideSeparate.push(this.tempArrayForSeparation)
                    this.tempArrayForSeparation = []
                }
                else if (array[i]===edges[edges.length-1]){
                    tempArraySideSeparate.push(this.tempArrayForSeparation)
                    this.tempArrayForSeparation = []
                }
            }
        }
        fieldsSeparation(this.tempArrayLeftSeparate,this.leftEdgesInt,this.arrayLeft)
        let doublesDelete = (doubleArray) =>{
            let set = new Set(doubleArray.map(JSON.stringify));    // deleting double arrays between two-dimensional arrays
            doubleArray = Array.from(set).map(JSON.parse);
        }
        doublesDelete(this.tempArrayLeftSeparate)
        this.arrayRight = this.arrayRight.filter((item, index) => {
            return this.arrayRight.indexOf(item) === index
        })
        fieldsSeparation(this.tempArrayRightSeparate,this.rightEdgesInt,this.arrayRight)
        doublesDelete(this.tempArrayRightSeparate)
        let arrayLeftFinal = []
        let arraysForDifferentSides = (inArray,outArray,side) => {
            while (inArray.length!==0){                // making separate arrays to open left empty fields, so it wouldn't open the right ones and vice versa
                arrayLeftFinal = inArray.shift()
                for (let k =0;k<10;k++){
                    arrayLeftFinal = arrayLeftFinal.filter((item, index) => {
                        return arrayLeftFinal.indexOf(item) === index
                    })
                    for (let i = 0;i<this.emptyTabCopy.length;i++){
                        for (let j=0;j<arrayLeftFinal.length;j++){
                            if (side === 0){                   // different logic is needed depending on the side we are working on. Side 0 = left side
                                if (this.emptyTabCopy[i]===arrayLeftFinal[j]+1 || this.emptyTabCopy[i]===arrayLeftFinal[j]-board1.x || this.emptyTabCopy[i]===arrayLeftFinal[j]+board1.x){   // same logic as before but without -1(so it wouldn't open right fields)
                                    arrayLeftFinal.push(this.emptyTabCopy[i])
                                }
                            }
                            else if (side === 1){     // side 1 = right side
                                if (this.emptyTabCopy[i]===arrayLeftFinal[j]-1 || this.emptyTabCopy[i]===arrayLeftFinal[j]-board1.x || this.emptyTabCopy[i]===arrayLeftFinal[j]+board1.x){   // same logic as before but without -1(so it wouldn't open right fields)
                                    arrayLeftFinal.push(this.emptyTabCopy[i])
                                }
                            }
                        }
                    }
                }
                arrayLeftFinal = arrayLeftFinal.filter((item, index) => {
                    return arrayLeftFinal.indexOf(item) === index
                })
                outArray.push(arrayLeftFinal)
                arrayLeftFinal = []
            }
        }
        arraysForDifferentSides(this.tempArrayLeftSeparate,this.leftArraysDone,0)
        arraysForDifferentSides(this.tempArrayRightSeparate,this.rightArraysDone,1)
        doublesDelete(this.leftArraysDone)
        doublesDelete(this.rightArraysDone)
        console.log(this.leftArraysDone)
        console.log(this.rightArraysDone)
        this.array1 = this.array1.filter((item, index) => {
            return this.array1.indexOf(item) === index
        })
        this.emptyTabCopy = this.emptyTabCopy.filter((val) => {   // deleting doubles for the next array
            return this.array1.indexOf(val) === -1
        })
        for (let i = 0;i<this.leftArraysDone.length;i++){         // adding our left and right arrays to the final array
            this.tempArray.push(this.leftArraysDone[i])
        }
        for (let i = 0;i<this.rightArraysDone.length;i++){
            this.tempArray.push(this.rightArraysDone[i])
        }
        this.tempArray.push(this.array1)
        doublesDelete(this.tempArray)
        this.array1 = []
        if (this.emptyTabCopy.length!==0){
            this.showFieldsWithNoMinesAround()   // using recursion to create arrays with empty fields around mines until array with all empty fields is empty
        }
    }
    searchForDuplicatesInArray(){
        for (let i = 0;i<this.tempArray.length;i++){             // comparing array and searching for the same numbers because there could be arrays which supposed to be one but were separated
            for (let j = 0;j<this.tempArray[i].length;j++){
                for (let k = 0;k<this.tempArray.length;k++){
                    this.tempArray[i] = this.tempArray[i].filter((item, index) => {
                        return this.tempArray[i].indexOf(item) === index
                    })
                    for (let l = 0;l<this.tempArray[k].length;l++){
                        if (i !== k) {
                            if (this.tempArray[i][j] === this.tempArray[k][l]) {    // if any same number is found we are combining two arrays and delete one of them
                                this.tempArray[i] = this.tempArray[i].concat(this.tempArray[k])
                                this.tempArray.splice(this.tempArray.indexOf(this.tempArray[k]), 1)
                                k--        // undefined k length fix
                            }
                        }
                    }
                }
            }
        }
    }
    convertEmptyFieldsArrayToString(){
        for (let i = 0;i<this.tempArray.length;i++){                    // converting numbers in the array back to string
            let tempVar = this.tempArray[i]
            tempVar = tempVar.map(String)
            this.emptyTabCopy.push(tempVar)
        }
    }
}