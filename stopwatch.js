let timerIsSet = 0
let timerId = null // will be used to stop the stopwatch
let hours = 0
let minutes = 0
let seconds = 0
let timeToString = ['00','01','02','03','04','05','06','07','08','09']
function stopwatch(){
    timerId = window.setInterval(function(){
        let clock = document.getElementById("stopwatch");
        if (seconds===60){
            seconds = 0
            minutes++
        }
        if (minutes===60){
            minutes = 0
            hours++
        }
        if (hours===100){
            hours = 0
            minutes = 0
            seconds = 0
        }
        for (let i = 0;i<timeToString.length;i++){
            if (hours===i){
                hours = timeToString[i]
            }
            if (minutes===i){
                minutes = timeToString[i]
            }
            if (seconds===i){
                seconds = timeToString[i]
            }
        }

        clock.value = hours + ':' + minutes + ':' + seconds
        seconds++
    },1000);
};