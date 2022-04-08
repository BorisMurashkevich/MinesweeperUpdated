function arraysForDeletion(){
    let emptyTab = []
    let emptyTabCopy = []
    for (let i = 0;i<board1.size;i++){
        let emptyEl = document.getElementById(board1.tableId[i])
        if (emptyEl.innerHTML === ' '){                         // making an array with empty fields
            emptyTab.push(board1.tableId[i])
        }
    }
    emptyTabCopy = emptyTab                               // converting previous array to int
    console.log(emptyTabCopy)
    for (let i =0;i<emptyTabCopy.length;i++){
        let strChange = emptyTabCopy[i]
        strChange = strChange.replace("td","")
        emptyTabCopy[i] = strChange
        emptyTabCopy[i] = Number(emptyTabCopy[i])
    }
    console.log(emptyTabCopy)
    let array1 = []
    let arrayLeft = []
    let arrayRight = []
    let tempArrayForSeparation = []
    let tempArrayLeftSeparate = []
    let tempArrayRightSeparate = []
    let tempArray = []
    let tabsIntWithoutEdges = []
    let leftArraysDone = []
    let rightArraysDone = []
    let leftEdgesInt = []
    let rightEdgesInt = []
    function getLeftAndRightEdges() {
        let allBoard = []
        for (let i = 0;i<board1.size;i++){
            allBoard.push(i)
        }
        let addNumToArray = 0
        leftEdgesInt.push(addNumToArray) //left edge of the board always starts with 0
        for (let i =0;i<board1.y;i++){
            addNumToArray = addNumToArray+board1.x
            if (addNumToArray<board1.size){
                leftEdgesInt.push(addNumToArray)
            }
        }
        addNumToArray = board1.x-1
        rightEdgesInt.push(board1.x-1) // right edge of the board always starts with x-1(the count starts from 0 not from 1, so 1 should be subtracted)
        for (let i =0;i<board1.y;i++){
            addNumToArray = addNumToArray+board1.x
            if (addNumToArray<board1.size){
                rightEdgesInt.push(addNumToArray)
            }
        }
    }
    getLeftAndRightEdges()

    for (let i = 0;i<board1.size;i++){
        tabsIntWithoutEdges.push(i)
    }
    for (let i=0;i<leftEdgesInt.length;i++){
        let numberDelete = tabsIntWithoutEdges.indexOf(leftEdgesInt[i])
        tabsIntWithoutEdges.splice(numberDelete,1)
    }
    for (let i=0;i<rightEdgesInt.length;i++){
        let numberDelete2 = tabsIntWithoutEdges.indexOf(rightEdgesInt[i])
        tabsIntWithoutEdges.splice(numberDelete2,1)
    }

    while (emptyTabCopy.length !== 0){ // in order to correctly delete buttons when user is clicking on the button with an empty cell under it
        // i've decided to divide array with all empty cells(tabs) into multiple arrays

        for (let i = 0;i<emptyTabCopy.length;i++){               // creating arrays with all left and right empty tabs
            for (let j = 0;j<leftEdgesInt.length;j++){
                if (emptyTabCopy[i]===leftEdgesInt[j]){
                    arrayLeft.push(leftEdgesInt[j])            // array with only left empty tabs
                }
                else if (emptyTabCopy[i]===rightEdgesInt[j]){
                    arrayRight.push(rightEdgesInt[j])
                }
            }
        }
        console.log(emptyTabCopy)
        for (let i = 0;i<leftEdgesInt.length;i++){               // deleting right and left empty tabs (different logic would be made for them)
            for (let j = 0;j<emptyTabCopy.length;j++){
                if (emptyTabCopy[j]===leftEdgesInt[i]){
                    emptyTabCopy.splice(emptyTabCopy.indexOf(emptyTabCopy[j]),1)
                }
                else if (emptyTabCopy[j]===rightEdgesInt[i]){
                    emptyTabCopy.splice(emptyTabCopy.indexOf(emptyTabCopy[j]),1)
                }
            }
        }
        console.log(emptyTabCopy)

        array1.push(emptyTabCopy[0])
        for (let k =0;k<5;k++){                      // rechecking massive 5 times to make sure every number is correct (if not rechecked it might left some doubles)

            array1 = array1.filter((item, index) => {          // deleting doubles
                return array1.indexOf(item) === index
            })
            for (let i = 0;i<emptyTabCopy.length;i++){
                for (let j=0;j<array1.length;j++){
                    if (emptyTabCopy[i]===array1[j]+1 || emptyTabCopy[i]===array1[j]-board1.y || emptyTabCopy[i]===array1[j]-1 || emptyTabCopy[i]===array1[j]+board1.y){
                        array1.push(emptyTabCopy[i])
                    }


                }
            }
        }

        arrayLeft = arrayLeft.filter((item, index) => {
            return arrayLeft.indexOf(item) === index
        })
        function tabsSeparation(tempArraySideSeparate,edges,array) {
            for (let i = 0;i<array.length;i++){             // separating right and left empty fields and adding them into a different array
                let limit = board1.x
                if (array[i]===edges[edges.length-1]){
                    limit = 0
                }
                let getDocumentNext = document.getElementById(board1.tableId[array[i]+limit])
                tempArrayForSeparation.push(array[i])
                if (getDocumentNext.innerHTML !== ' '){
                    tempArraySideSeparate.push(tempArrayForSeparation)
                    tempArrayForSeparation = []
                }
                else if (array[i]===edges[edges.length-1]){
                    tempArraySideSeparate.push(tempArrayForSeparation)
                    tempArrayForSeparation = []
                }





            }
        }
        tabsSeparation(tempArrayLeftSeparate,leftEdgesInt,arrayLeft)

        let set = new Set(tempArrayLeftSeparate.map(JSON.stringify));    // deleting double arrays between two-dimensional arrays
        tempArrayLeftSeparate = Array.from(set).map(JSON.parse);



        arrayRight = arrayRight.filter((item, index) => {
            return arrayRight.indexOf(item) === index
        })
        tabsSeparation(tempArrayRightSeparate,rightEdgesInt,arrayRight)

        set = new Set(tempArrayRightSeparate.map(JSON.stringify));
        tempArrayRightSeparate = Array.from(set).map(JSON.parse);

        let arrayLeftFinal = []
        function arraySep(inArray,outArray,side) {
            while (inArray.length!==0){                // making separate arrays to open left empty fields, so it would't open the right ones and vice versa
                arrayLeftFinal = inArray.shift()
                for (let k =0;k<10;k++){
                    arrayLeftFinal = arrayLeftFinal.filter((item, index) => {
                        return arrayLeftFinal.indexOf(item) === index
                    })
                    for (let i = 0;i<emptyTabCopy.length;i++){
                        for (let j=0;j<arrayLeftFinal.length;j++){
                            if (side === 0){                   // different logic is needed depending on the side we are working on. Side 0 = left side
                                if (emptyTabCopy[i]===arrayLeftFinal[j]+1 || emptyTabCopy[i]===arrayLeftFinal[j]-board1.x || emptyTabCopy[i]===arrayLeftFinal[j]+board1.x){   // same logic as before but without -1(so it wouldn't open right fields)
                                    arrayLeftFinal.push(emptyTabCopy[i])
                                }
                            }
                            else if (side === 1){     // side 1 = right side
                                if (emptyTabCopy[i]===arrayLeftFinal[j]-1 || emptyTabCopy[i]===arrayLeftFinal[j]-board1.x || emptyTabCopy[i]===arrayLeftFinal[j]+board1.x){   // same logic as before but without -1(so it wouldn't open right fields)
                                    arrayLeftFinal.push(emptyTabCopy[i])
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
        arraySep(tempArrayLeftSeparate,leftArraysDone,0)
        arraySep(tempArrayRightSeparate,rightArraysDone,1)

        set = new Set(leftArraysDone.map(JSON.stringify));
        leftArraysDone = Array.from(set).map(JSON.parse);
        set = new Set(rightArraysDone.map(JSON.stringify));
        rightArraysDone = Array.from(set).map(JSON.parse);

        console.log(leftArraysDone)
        console.log(rightArraysDone)






        array1 = array1.filter((item, index) => {
            return array1.indexOf(item) === index
        })
        emptyTabCopy = emptyTabCopy.filter(function(val) {   // deleting doubles for the next array
            return array1.indexOf(val) === -1
        })

        for (let i = 0;i<leftArraysDone.length;i++){         // adding our left and right arrays to the final array
            tempArray.push(leftArraysDone[i])
        }
        for (let i = 0;i<rightArraysDone.length;i++){
            tempArray.push(rightArraysDone[i])
        }
        tempArray.push(array1)
        set = new Set(tempArray.map(JSON.stringify));
        tempArray = Array.from(set).map(JSON.parse);

        array1 = []
    }

    for (let i = 0;i<tempArray.length;i++){             // comparing array and searching for the same numbers because there could be arrays which supposed to be one but were separated
        for (let j = 0;j<tempArray[i].length;j++){
            for (let k = 0;k<tempArray.length;k++){
                tempArray[i] = tempArray[i].filter((item, index) => {
                    return tempArray[i].indexOf(item) === index
                })
                for (let l = 0;l<tempArray[k].length;l++){
                    if (i !== k) {
                        if (tempArray[i][j] === tempArray[k][l]) {    // if any same number is found we are combining two arrays and delete one of them
                            tempArray[i] = tempArray[i].concat(tempArray[k])
                            tempArray.splice(tempArray.indexOf(tempArray[k]), 1)
                            k--        // undefined k length fix
                        }
                    }
                }
            }
        }
    }
// || tempArray[i][j] === tempArray[k][l] + board1.x + 1 || tempArray[i][j] === tempArray[k][l] + board1.x - 1 || tempArray[i][j] === tempArray[k][l] - board1.x + 1 || tempArray[i][j] === tempArray[k][l] - board1.x - 1


    for (let i = 0;i<tempArray.length;i++){                    // converting numbers in the array back to string
        let tempVar = tempArray[i]
        tempVar = tempVar.map(String)
        emptyTabCopy.push(tempVar)
    }
    console.log(emptyTabCopy)
    return emptyTabCopy
}