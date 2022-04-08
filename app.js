valueLoad() // loading entered size of the board
class board {
    tableId = []
    buttonId = []
    btnId = 0
    table = document.querySelector('table')
    x
    y
    constructor(x,y) {
        this.creatingTable(x,y)
        this.x = x              // returning size of the board
        this.y = y
        this.size = x*y

    }
    creatingTable(x,y){
        for (let i = 0; i < y; i++) {
            let tr = document.createElement('tr'); // creating rows for the table

            for (let j = 0; j < x; j++) {
                let td = document.createElement('td'); // and cells
                tr.appendChild(td);
                td.style.border = '1px solid black'
                td.innerHTML = ''
                td.style.width = '55px'
                td.style.height = '55px'

                let btn = document.createElement('button') // for each cell was created a button
                document.body.appendChild(btn)
                btn.style.width = '60px'
                btn.style.height = '60px'
                btn.style.marginLeft = '-4.5em'


                let btnStrId = this.btnId.toString() //giving an id to each button
                btn.id = btnStrId
                this.buttonId.push(btn.id)
                let col = document.getElementById(btn.id)
                col.style.background = "grey"

                let tdId = this.btnId + 'td' // giving an id to each element of the row
                td.id = tdId
                this.tableId.push(td.id)
                tr.appendChild(btn)
                this.btnId++


            }
            this.table.appendChild(tr);
        }
    }

}


function changeX(){        // changing X and Y fields at the same time (if changed separately there will be issues with opening empty fields)
    let xValue = document.getElementById('XInput').value
    document.getElementById('YInput').value = xValue
}
function changeY(){
    let yValue = document.getElementById('YInput').value
    document.getElementById('XInput').value = yValue
}
function valueSave(){ // saving the previous set x and y
    sessionStorage.setItem('xValue',document.getElementById('XInput').value)
    sessionStorage.setItem('yValue',document.getElementById('YInput').value)
}
function valueLoad(){
    if (sessionStorage.getItem('xValue')!==null){
        document.getElementById('XInput').value = sessionStorage.getItem('xValue')
        document.getElementById('YInput').value = sessionStorage.getItem('yValue')
    }
}
let xValue = document.getElementById('XInput').value
let yValue = document.getElementById('YInput').value
xValue = Number(xValue)
yValue = Number(yValue)
board1 = new board(xValue,yValue)

function random() {
    let randomNum = []
    let randomMinesTemp = []
    for (let i = 0;i<board1.size;i++){
        randomNum.push(i)
    }
    for (randomNum, i = randomNum.length; i--; ) {
        let random = randomNum.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        randomMinesTemp.push(random) // making a new array with digits from previous array but in random order
    }
return randomMinesTemp
}

let minesAmount = (board1.size)/8
minesAmount = Math.floor(minesAmount)
document.getElementById("minesCounter").value = minesAmount
let infoSize = 60*board1.x+60+board1.x*3.2+'px'     // formula for measuring size of the info menu (the one with the counter and stuff)
document.getElementById("info").style.width = infoSize

class field {
    emptyTabCopy = []
    randomMinesTemp = []
    mines = []
    minesForStopwatch = []
    leftEdges = []
    rightEdges = []
    upperEdges = []
    lowerEdges = []
    corners = []

    constructor() {
        this.minePlace()
        this.getEdges()
        this.getEmptyFields()
    }
    getEmptyFields(){
        this.emptyTabCopy = arraysForDeletion()
        console.log(this.emptyTabCopy)
        let emptyTabCopyNoEdges = []
        for (let i=0;i<this.emptyTabCopy.length;i++){
            let emptyTabCopyNoEdgesTemp = this.emptyTabCopy[i].filter(i => !this.leftEdges.includes(i) && !this.rightEdges.includes(i) && !this.upperEdges.includes(i) && !this.lowerEdges.includes(i) && !this.corners.includes(i))

            emptyTabCopyNoEdges.push(emptyTabCopyNoEdgesTemp)

        }
        emptyTabCopyNoEdges = emptyTabCopyNoEdges.filter(a => !a.every(ax=> a === undefined)) // deleting empty arrays
        console.log(emptyTabCopyNoEdges)
        console.log(this.emptyTabCopy)
        for (let i = 0;i<emptyTabCopyNoEdges.length;i++){ // when an empty fields are open there could be another empty fields diagonally which has different array
            for (let j = 0;j<emptyTabCopyNoEdges[i].length;j++){ // so it should be opened as well, like in windows miner
                for (let k = 0;k<emptyTabCopyNoEdges.length;k++){ // in order to do that another array has been created with those fields in mind. It will be integrated with the main array later on
                    for (let l = 0;l<emptyTabCopyNoEdges[k].length;l++){
                        if (i!==k){
                            let tabsCompareInt1 = Number(emptyTabCopyNoEdges[i][j])
                            let tabsCompareInt2 = Number(emptyTabCopyNoEdges[k][l])
                            if (tabsCompareInt1===tabsCompareInt2+board1.x-1|| tabsCompareInt1===tabsCompareInt2 + board1.x + 1 || tabsCompareInt1===tabsCompareInt2 + board1.x - 1 || tabsCompareInt1===tabsCompareInt2 - board1.x + 1 || tabsCompareInt1===tabsCompareInt2 - board1.x - 1){
                                emptyTabCopyNoEdges[i] = emptyTabCopyNoEdges[i].concat(emptyTabCopyNoEdges[k])
                                emptyTabCopyNoEdges.splice(emptyTabCopyNoEdges.indexOf(emptyTabCopyNoEdges[k]), 1)
                                k--
                            }
                        }
                    }
                }
            }
        }
        console.log(emptyTabCopyNoEdges)
        for (let i = 0;i<this.emptyTabCopy.length;i++){
            for (let j =0;j<this.emptyTabCopy[i].length;j++){
                for (let k=0;k<emptyTabCopyNoEdges.length;k++){
                    for (let l = 0;l<emptyTabCopyNoEdges[k].length;l++){
                        if (this.emptyTabCopy[i][j]===emptyTabCopyNoEdges[k][l]){
                            this.emptyTabCopy[i] = this.emptyTabCopy[i].concat(emptyTabCopyNoEdges[k])
                            this.emptyTabCopy[i] = this.emptyTabCopy[i].filter((item, index) => {
                                return this.emptyTabCopy[i].indexOf(item) === index
                            })
                        }
                    }
                }
            }
        }
        for (let i = 0;i<this.emptyTabCopy.length;i++){
            for (let j = 0;j<this.emptyTabCopy[i].length;j++){
                for (let k = 0;k<this.emptyTabCopy.length;k++){
                    this.emptyTabCopy[i] = this.emptyTabCopy[i].filter((item, index) => {
                        return this.emptyTabCopy[i].indexOf(item) === index
                    })
                    for (let l = 0;l<this.emptyTabCopy[k].length;l++){
                        if (i !== k) {
                            if (this.emptyTabCopy[i][j] === this.emptyTabCopy[k][l]) {    // if any same number in the arrays is found we are combining two arrays and delete one of them
                                this.emptyTabCopy[i] = this.emptyTabCopy[i].concat(this.emptyTabCopy[k])
                                this.emptyTabCopy.splice(this.emptyTabCopy.indexOf(this.emptyTabCopy[k]), 1)
                                k--
                            }
                        }
                    }
                }
            }
        }
        console.log(this.emptyTabCopy)
    }
    getEdges(){
        for (let i = board1.x;i<board1.buttonId.length;i+=board1.x){  // making array with left edges of the board
            if (i<board1.buttonId.length-board1.x){ //lower left corner would have a different logic, so it does't need here
                this.leftEdges.push(board1.buttonId[i])
            }

        }
        for (let i = board1.x+board1.x-1;i<board1.buttonId.length;i+=board1.x){  // making array with right edges of the board(without the first one and the last one)
            if (i<board1.size-1){
                this.rightEdges.push(board1.buttonId[i])
            }

        }
        for (let i = 1;i<board1.buttonId.length;i++){  // making array with upper edges of the board(without the first one and the last one)
            if (i<board1.x-1){
                this.upperEdges.push(board1.buttonId[i])
            }

        }
        for (let i = board1.size+1-board1.x;i<board1.buttonId.length;i++){  // making array with lower edges of the board(without the first one and the last one)
            if (i<board1.size-1){
                this.lowerEdges.push(board1.buttonId[i])
            }

        }
        this.corners.push(board1.buttonId[0],board1.buttonId[board1.x-1],board1.buttonId[board1.size-board1.x],board1.buttonId[board1.size-1]) // making array with corners
    }
    minePlace (){
        this.randomMinesTemp = random()
        console.log(this.randomMinesTemp)
        for (let i = 0;i<minesAmount;i++){ // picking first digits to place the mines. Amount of mines defined by the board size
            let rand = this.randomMinesTemp[this.randomMinesTemp.length-1-i]
            this.minesForStopwatch.push(rand) // will be used later on to stop the timer if button with mine is pressed
            this.mines.push(rand+'td')

        }
        for (let i = 0;i<board1.size;i++) {     // counting the mines to show it on the table cell
            let minesCounter = 0
            for (let j = 0; j < minesAmount; j++) {
                if (board1.tableId[i + 1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i + board1.x+1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i + board1.x] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i + board1.x-1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i - 1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i - board1.x+1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i - board1.x] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i - board1.x-1] === this.mines[j]) {
                    minesCounter++
                } else if (board1.tableId[i] === this.mines[j]) {
                    let mineDraw = document.getElementById(board1.tableId[i])
                    mineDraw.style.background = "url('mine.png')"
                }
            }
            minesCounter = minesCounter.toString()
            let drawCounter = document.getElementById(board1.tableId[i])
            drawCounter.innerHTML = minesCounter
            drawCounter.style.textAlign = "center"
            if (minesCounter==='1'){        // adding color to each number
                drawCounter.style.color = "blue"
            }
            else if (minesCounter==='2'){
                drawCounter.style.color = 'green'
            }
            else if (minesCounter==='3') {
                drawCounter.style.color = "red"
            }
            else if (minesCounter==='4'){
                drawCounter.style.color = 'black'
            }
            else if (minesCounter==='5'){
                drawCounter.style.color = "brown"
            }
            if(minesCounter==='0'){
                drawCounter.innerHTML = ' '
            }
        }
        for (let i = 0;i<minesAmount;i++){
            let minesPos = document.getElementById(this.mines[i])
            minesPos.innerHTML = '  '
        }
    }

}
let field1 = new field()

// for (let i=0;i<board1.buttonId.length;i++){
//     let disable = document.getElementById(board1.buttonId[i])
//     disable = disable.style.opacity = '0.5'
// }

class game {
    constructor() {
        this.emptyFieldsShow()
    }
    showFlag(){
        let minesLeftCounter = minesAmount
        let flagCounter = 0
        let buttonsWithMines = field1.mines
        for (let i = 0;i<buttonsWithMines.length;i++){        // slicing 'td'
            buttonsWithMines[i] = buttonsWithMines[i].slice(0,-2)
        }
        console.log(field1.mines)


        document.addEventListener("contextmenu",function (e) {
            let target = e.target
            let targetId = target.id
            let img = "url('flag.png')"
            let indexOfPressedButton = board1.buttonId.indexOf(targetId,0)
            let getPressedButton = document.getElementById(board1.buttonId[indexOfPressedButton])
            let minesCounterHtml = document.getElementById('minesCounter')
            if (getPressedButton.style.opacity !== '0'){
                if (getPressedButton.style.background === "grey"){    //if you click and there is no flag image it's shows a flag
                    getPressedButton.disabled = true
                    getPressedButton.style.background = img
                    minesLeftCounter--
                    minesCounterHtml.value = minesLeftCounter
                    for (let i = 0;i<buttonsWithMines.length;i++){
                        if (board1.buttonId[indexOfPressedButton]===buttonsWithMines[i]){
                            flagCounter++      // counting placed flags
                        }
                    }
                }
                else if (getPressedButton.style.background !== "grey" ){ // and the opposite
                    getPressedButton.disabled = false
                    getPressedButton.style.background = "grey"
                    minesLeftCounter++
                    minesCounterHtml.value = minesLeftCounter
                    if (board1.buttonId[indexOfPressedButton]===buttonsWithMines[i]){
                        flagCounter--
                    }

                }

                if (minesLeftCounter<0){
                    minesLeftCounter++
                    minesCounterHtml.value = minesLeftCounter
                }
                if (minesLeftCounter>minesAmount){
                    minesLeftCounter = minesAmount
                    minesCounterHtml.value = minesLeftCounter
                }
                if (flagCounter===minesAmount){   // if all flags were placed correct all buttons are disabling and timer is stopping(win script)
                    for (let i = 0;i<board1.buttonId.length;i++){
                        let disableAllButtons = document.getElementById(board1.buttonId[i])
                        disableAllButtons.disabled = true
                        clearInterval(timerId)
                    }

                }
            }
        })
    }
    emptyFieldsShow(){
        let minesLeftCounter = this.showFlag()
        document.addEventListener("click", function (e) {
            timerIsSet++ // we don't need stopwatch to start every time the button pressed, so we launch it only once
            if (timerIsSet===1){
                stopwatch()
            }
            let img = "url('flag.png')"
            let minesCounterHtml = document.getElementById('minesCounter')
            let target = e.target
            let targetId = target.id
            let indexOfPressedButton = board1.buttonId.indexOf(targetId,0)
            let numbersAroundButton = [0,1,board1.x+1,board1.x,board1.x-1,-1,-board1.x+1,-board1.x,-board1.x-1]
            let numbersAroundButtonLeft = [0,1,board1.x+1,board1.x,-board1.x,-board1.x+1]
            let numbersAroundButtonRight = [0,board1.x,board1.x-1,-1,-board1.x-1,-board1.x]
            let numbersAroundButtonDown = [0,1,-1,-board1.x-1,-board1.x,-board1.x+1]
            let numbersAroundButtonUp = [0,1,board1.x+1,board1.x,board1.x-1,-1]
            let leftDownNumbers = [0,1,-board1.x,-board1.x+1]
            let leftUpNumbers = [0,1,board1.x,board1.x+1]
            let rightDownNumbers = [0,-1,-board1.x,-board1.x-1]
            let rightUpNumbers = [0,-1,board1.x-1,board1.x]
            let tableNumbers = ['1','2','3','4','5']

            let buttonIdForDelete = []
            let btnWithNum = 0
            let getPressedDocument = document.getElementById(board1.tableId[indexOfPressedButton])
            let losePicture = document.getElementById("restartBtn")
            console.log(board1.buttonId[indexOfPressedButton])



            for (let i = 0;i<field1.minesForStopwatch.length;i++){
                if (indexOfPressedButton===field1.minesForStopwatch[i]){   // if user pressed a btn with mine, the stopwatch is stopping, all mines are showing and buttons are disabling
                    clearInterval(timerId)
                    losePicture.style.backgroundImage = 'url("lose2.PNG")'
                    for (let j = 0;j<field1.minesForStopwatch.length;j++){
                        let btnWithMines = document.getElementById(board1.buttonId[field1.minesForStopwatch[j]])
                        console.log(field1.minesForStopwatch)
                        btnWithMines.style.opacity = '0'
                        for (let k = 0;k<board1.buttonId.length;k++){
                            let disableAllButtons = document.getElementById(board1.buttonId[k])
                            disableAllButtons.disabled = true
                        }
                    }

                }
            }
            for (let i = 0;i<tableNumbers.length;i++){
                let btnPressed = document.getElementById(board1.buttonId[indexOfPressedButton])   // if a cell number is 1-5 we just open it
                if (getPressedDocument.innerHTML === tableNumbers[i]){
                    btnPressed.style.opacity = '0'
                    btnWithNum = 1
                }
                if (getPressedDocument.innerHTML === '  '){
                    btnPressed.style.opacity = '0'
                    btnWithNum = 1
                }
                if (getPressedDocument.innerHTML === ' '){
                    btnWithNum = 0
                }
            }
            buttonIdForDelete = board1.buttonId.filter(i => !field1.leftEdges.includes(i) && !field1.rightEdges.includes(i) && !field1.upperEdges.includes(i) && !field1.lowerEdges.includes(i) && !field1.corners.includes(i))  // buttons id which not include edges


            function buttonDelete() {                   // if button what user pressed = any number of the array with empty fields
                let buttonsForDelete = []               // we should write the array with that numbers to a new array so we could delete buttons
                for (let i = 0;i<field1.emptyTabCopy.length;i++){
                    for (let j = 0;j<field1.emptyTabCopy[i].length;j++){
                        if (board1.buttonId[indexOfPressedButton]===field1.emptyTabCopy[i][j]){
                            buttonsForDelete = field1.emptyTabCopy[i]
                        }
                    }
                }
                for (let i = 0;i<buttonsForDelete.length;i++){
                    for (let j=0;j<field1.leftEdges.length;j++){
                        for (let k=0;k<numbersAroundButtonLeft.length;k++){
                            let btnDeletedInt = Number(buttonsForDelete[i])
                            let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt])
                            btnDeleted.style.opacity = '0'
                            if (buttonsForDelete[i]===field1.leftEdges[j]){
                                let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+numbersAroundButtonLeft[k]])
                                btnDeleted.style.opacity = '0'
                            }
                            else if (buttonsForDelete[i]===field1.lowerEdges[j]){
                                let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+numbersAroundButtonDown[k]])
                                btnDeleted.style.opacity = '0'
                            }
                            else if (buttonsForDelete[i]===field1.rightEdges[j]){
                                let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+numbersAroundButtonRight[k]])
                                btnDeleted.style.opacity = '0'
                            }
                            else if (buttonsForDelete[i]===field1.upperEdges[j]){
                                let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+numbersAroundButtonUp[k]])
                                btnDeleted.style.opacity = '0'
                            }
                            else if (buttonsForDelete[i]=== board1.buttonId[0]){
                                if (k<leftUpNumbers.length){            // k will be over arrays length
                                    let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+leftUpNumbers[k]])
                                    btnDeleted.style.opacity = '0'
                                }
                            }
                            else if (buttonsForDelete[i]=== board1.buttonId[board1.x-1]){
                                if (k<rightUpNumbers.length){
                                    let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+rightUpNumbers[k]])
                                    btnDeleted.style.opacity = '0'
                                }
                            }
                            else if (buttonsForDelete[i]=== board1.buttonId[board1.size-board1.x]){
                                if (k<leftDownNumbers.length){
                                    let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+leftDownNumbers[k]])
                                    btnDeleted.style.opacity = '0'
                                }
                            }
                            else if (buttonsForDelete[i]=== board1.buttonId[board1.size-1]){
                                if (k<rightDownNumbers.length){
                                    let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+rightDownNumbers[k]])
                                    btnDeleted.style.opacity = '0'
                                }
                            }


                        }

                    }

                }
                for (let i = 0;i<buttonsForDelete.length;i++){
                    for (let j = 0;j<buttonIdForDelete.length;j++){
                        for (let k = 0;k<numbersAroundButton.length;k++){
                            if (buttonsForDelete[i]===buttonIdForDelete[j]){
                                let btnDeletedInt = Number(buttonsForDelete[i])
                                let btnDeleted = document.getElementById(board1.buttonId[btnDeletedInt+numbersAroundButton[k]])
                                btnDeleted.style.opacity = '0'

                            }


                        }
                    }
                }

            }

            if (btnWithNum!==1){
                buttonDelete()
                for (let i = 0;i<board1.buttonId.length;i++){
                    let getButton = document.getElementById(board1.buttonId[i])
                    if (getButton.style.opacity === '0'){
                        if (getButton.style.background !== 'grey'){       // if user left a flag and button disappeared cause there was no bomb the mines counter sums the count of disappeared flags
                            minesLeftCounter++
                            minesCounterHtml.value = minesLeftCounter
                        }

                    }

                }
            }

        })
    }
}
let game1 = new game()





