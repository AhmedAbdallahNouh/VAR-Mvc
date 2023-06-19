var second = 0;
var minute = 50;
var hour = 0;



function timer() {
    if (second != 59 ) {
        timerSecond.innerHTML = `${++second}`;
    }
    else {
        second = 0;
        timerSecond.innerHTML = `${second}`;

        if (minute != 59) {
            timerMinute.innerHTML = `${++minute}`;
        }
        else {
            minute = 0
            timerMinute.innerHTML = `${minute}`;
            timerHour.innerHTML = `${++hour}`;
        }

    }
    localStorage.setItem("Timer State", new Date().toString());
    localStorage.setItem("Timer State Hour", hour);
    localStorage.setItem("Timer State Minute", minute);
    localStorage.setItem("Timer State Second", second);

};


var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var roomStatus = document.getElementById("room-status");
var timerDiv = document.getElementById("timer");

var startTimeH1 = document.getElementById("startTime");
var stopTimeH1 = document.getElementById("stopTime");
var diffrenceH1 = document.getElementById("diffrence");

var timerHour = document.getElementById("hour");
var timerMinute = document.getElementById("minute");
var timerSecond = document.getElementById("second");




var playstationRoomId = window.location.pathname.split('/')[3];
console.log(`URL : ${window.location.pathname.split('/')[3]}`);


const roomStatusVariable = localStorage.getItem(`start time for room (${playstationRoomId})`);
console.log(roomStatusVariable);

if (roomStatusVariable !== null) {
    roomStatus.innerHTML = "Busy";
    startBtn.disabled = true;
    const timerState = new Date(localStorage.getItem("Timer State")).getTime();
    console.log(`timer state : ${timerState}`);
    console.log(`current time : ${new Date().getTime()}`);

    diffrenceTimeInMinutes = Math.round(((new Date().getTime() - timerState) / 60000)) ;
    console.log(`difrrence time : ${diffrenceTimeInMinutes}`); 


    hour = localStorage.getItem("Timer State Hour");
    minute = parseInt(localStorage.getItem("Timer State Minute"));
    second = localStorage.getItem("Timer State Second");

    if ((minute + diffrenceTimeInMinutes) < 59) {
        minute += diffrenceTimeInMinutes;
        timerSecond.innerHTML = `${second}`;
        timerMinute.innerHTML = `${minute}`;
        timerHour.innerHTML = `${hour}`;

        window.setInterval(timer, 1000);
    }
    else {
        console.log(`difrrence time : ${diffrenceTimeInMinutes}`);
        hour += Math.round((minute + diffrenceTimeInMinutes) / 60);
        console.log(`minute : ${minute}`);
        minute = (minute + diffrenceTimeInMinutes) % 60;

        timerSecond.innerHTML = `${second}`;
        timerMinute.innerHTML = `${minute}`;
        timerHour.innerHTML = `${hour}`;
        window.setInterval(timer, 1000);
    }

  
}
else {
    roomStatus.innerHTML = "Free";
}

console.log(`room status : ${roomStatus.innerHTML}`);


var startTime;
let timerIntervalId;

startBtn.addEventListener("click", () => {


    timerIntervalId = window.setInterval(timer, 1000);

    startBtn.disabled = true;

    startTime = new Date();
    startTimeH1.innerHTML = startTime;
    console.log(`startTime : ${startTime.toString()}`);

    localStorage.setItem(`start time for room (${playstationRoomId})`, startTime.toString());
});

stopBtn.addEventListener("click", () => {

    clearInterval(timerIntervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;


    if (roomStatusVariable !== null) {
        startTime = new Date(roomStatusVariable);
        console.log(`startTime FROM IF : ${startTime}`);

    } 

    console.log(`startTime  : ${startTime.toString()}`);

    var stopTime = new Date() ;
    var diffrence = (stopTime.getTime() - startTime.getTime()) / 1000;
    diffrence /= 60;
    diffrence /= 60;
    console.log(startTime);
    console.log(stopTime);
    console.log((diffrence * 20).toFixed(2));

    localStorage.removeItem(`start time for room (${playstationRoomId})`);
    //diffrence = Math.abs(Math.round(diffrence));

    diffrenceH1.innerHTML = diffrence;
});


//Display Items In Stock
//var addItemBtn = document.getElementById("add-item");
//var displayItemsDiv = document.getElementById("display-items");

$("#add-item").click(function () {
    $.ajax({
        url: "/Item/getAllItemsInStock",
        success: function (result) {

            $("#display-items").html(result);
        }
    });
});