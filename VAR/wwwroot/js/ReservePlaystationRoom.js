var second = 0;
var minute = 0;
var hour = 0;

var addItemBttn = document.getElementById("add-item");

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
    localStorage.setItem(`Timer State For Room (${playstationRoomId})`, new Date().toString());
    localStorage.setItem(`Timer State Hour For Room (${playstationRoomId})`, hour);
    localStorage.setItem(`Timer State Minute For Room (${playstationRoomId})`, minute);
    localStorage.setItem(`Timer State Second For Room (${playstationRoomId})`, second);

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
    const timerState = new Date(localStorage.getItem(`Timer State For Room (${playstationRoomId})`)).getTime();
    console.log(`timer state : ${timerState}`);
    console.log(`current time : ${new Date().getTime()}`);

    diffrenceTimeInMinutes = Math.round(((new Date().getTime() - timerState) / 60000)) ;
    console.log(`difrrence time : ${diffrenceTimeInMinutes}`); 


    hour = localStorage.getItem(`Timer State Hour For Room (${playstationRoomId})`);
    minute = parseInt(localStorage.getItem(`Timer State Minute For Room (${playstationRoomId})`));
    second = localStorage.getItem(`Timer State Second For Room (${playstationRoomId})`);

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
var timerIntervalId;

startBtn.addEventListener("click", () => {
    //import arrayOfItemsIDs from "./Item";
    console.log("from import", arrayOfItemsIDs);


    timerIntervalId = window.setInterval(timer, 1000);

    startBtn.disabled = true;

    startTime = new Date();
    startTimeH1.innerHTML = startTime;
    console.log(`startTime : ${startTime.toString()}`);

    localStorage.setItem(`start time for room (${playstationRoomId})`, startTime.toString());
});

var diffrence;
var stopTime
stopBtn.addEventListener("click", () => {

    clearInterval(timerIntervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;


    if (localStorage.getItem(`start time for room (${playstationRoomId})`) !== null) {
        startTime = new Date(localStorage.getItem(`start time for room (${playstationRoomId})`));
        console.log(`startTime FROM IF : ${startTime}`);

    } 

    console.log(`startTime  : ${startTime.toString()}`);

    stopTime = new Date() ;
    diffrence = (stopTime.getTime() - startTime.getTime()) / 1000;
    diffrence /= 60;
    diffrence /= 60;
    console.log(startTime);
    console.log(stopTime);
    console.log("diffrence", diffrence);

    console.log("price", (diffrence * 20).toFixed(2));

    localStorage.removeItem(`start time for room (${playstationRoomId})`);
    //diffrence = Math.abs(Math.round(diffrence));

    diffrenceH1.innerHTML = diffrence;
});


//Display Items In Stock


addItemBttn.addEventListener("click", () => {

    $.ajax({
        url: "/Item/getAllItemsInStock",
        success: function (result) {

            $("#display-items").html(result);
            addBttn.style.display = "block";

        }
    });
});


$("#order-btn").click(function () {
    $.ajax({
        url: "/Order/OrderModal",
        success: function (result) {

            $("#order-modal").html(result);
        }
    });
});

var orderTable = document.getElementById("order-table");

function showOrder() {

    var row = document.querySelectorAll("tr");
    console.log("row", row[0]);

    //check if the table head is exist already
    if (row[0].cells[3] == null) {
        var timeCellHeader = document.createElement("th");
        timeCellHeader.textContent = "Time";
        row[0].appendChild(timeCellHeader);

        var timeCellValue = row[1].insertCell();
        timeCellValue.textContent = diffrence.toFixed(2);
        console.log(diffrence);
        row[1].appendChild(timeCellValue);

        var totalPriceCellHeader = document.createElement("th");
        totalPriceCellHeader.textContent = "Total Price";
        row[0].appendChild(totalPriceCellHeader);
    
        var totalPriceCellValue = row[1].insertCell();
        totalPriceCellValue.textContent = (diffrence * 20).toFixed(2);
        console.log(diffrence);
        row[1].appendChild(totalPriceCellValue);
    }

    var plastationRoomTable = document.getElementById("ps-room-table");
    var plastationRoomTableCopy = plastationRoomTable.cloneNode(true);

    orderTable = document.getElementById("order-table");
    var orderTableCopy = orderTable !== null ? orderTable.cloneNode(true) : null ;
    var modalBody = document.getElementById("modal-body");
   
    // Check if the div already contains a table element
    var existingPsRoomTable = (modalBody.querySelectorAll("table"))[0];
    var existingOrderTable = (modalBody.querySelectorAll("table"))[1];

    console.log(existingPsRoomTable);
    console.log(existingOrderTable);

    if (existingPsRoomTable || existingOrderTable) {
        modalBody.removeChild(existingPsRoomTable);
        modalBody.removeChild(existingOrderTable);
    }       

    modalBody.appendChild(plastationRoomTableCopy);
    modalBody.appendChild(orderTableCopy);
  
}


//Add Order To DataBase


function getCookie(cookieNam) {
    // Get the value of the myCookie cookie
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith(cookieNam)).split('=')[1];

    // Parse the value as JSON
    const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
    return parsedValue;
};

var adminId = getCookie("AdminId");
async function confirmOrder()
{
    console.log(adminId);
    if (playstationRoomId === undefined) playstationRoomId = null
    var orderToAdd = {

        StartTime: startTime ? `${startTime.toLocaleDateString('en-US')} ${startTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
        EndTime: stopTime?`${stopTime.toLocaleDateString('en-US')} ${stopTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
        adminID: adminId,
        playstationID: parseInt(playstationRoomId)
    };

    var result;
  
    console.log(orderToAdd);
    try
    {
        const response = await fetch("/Order/AddOrderDB", {

            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify(orderToAdd)
        });

        if (response.ok) {
            result = await response.json();
            window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
            console.log(result);
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    }
    catch (error)
    {     
        console.error(error);
    }

    if (orderTable !== null)
    {
        var tableBody = document.getElementById("table-body");
        for (let i = 0; i < arrayOfItemsIDs.length; i++) 
        {
            var ItemQuantityCell = tableBody.rows[i].cells[3].textContent;
            var ItemTotalPriceCell = tableBody.rows[i].cells[4].textContent;

            console.log(arrayOfItemsIDs[i]);
            console.log(ItemQuantityCell);
            console.log(ItemTotalPriceCell);

            var orderItemDetailsToAdd = {

                orderId: result.id,
                itemId: arrayOfItemsIDs[i],
                Quantity: parseInt(ItemQuantityCell),
                TotalPrice: parseInt(ItemTotalPriceCell)
            };
            console.log(orderItemDetailsToAdd);
            try
            {
                const response1 = await fetch("/OrderItemDetails/Add", {

                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },

                    body: JSON.stringify(orderItemDetailsToAdd)
                });

                if (response1.ok)
                {
                    const result1 = await response1.json();
                    console.log(result1);
                    window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
    
                } else {
                    throw new Error(`HTTP Error: ${response1.status}`);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
       
    }
}


//var formStartTime = document.getElementById("StartTime");
//var formEndTime = document.getElementById("EndTime");
//var formAdminID = document.getElementById("adminID");
//var formPlaystationID = document.getElementById("playstationID");
//var submitOrderBtn = document.getElementById("submit-order");

//function confirmOrder() {
//    console.log(adminId);

//    formStartTime.value = startTime.toISOString().substring(0, 10);
//    formEndTime.value = startTime.toISOString().substring(0, 10);
//    formAdminID.value = adminId;
//    formPlaystationID.value = parseInt(playstationRoomId);
//    submitOrderBtn.click();
  
//}


    //function confirmOrder() {
    //    console.log(adminId);
    //    var orderToAdd = {

    //            StartTime : startTime.toLocaleDateString(),
    //            EndTime : stopTime.toLocaleDateString(),
    //            adminID : adminId,
    //            playstationID : parseInt(playstationRoomId)
    //        };
    //    //var orderToAdd = new Order(startTime.toLocaleDateString(), stopTime.toLocaleDateString(), playstationRoomId, parseInt(adminId));
    //    console.log(orderToAdd);
    //    $.ajax({
    //        url: "/Order/AddOrderDB",
    //        type: 'POST',
    //        data: JSON.stringify(orderToAdd),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            console.log(result);
    //        }
    //    });

    //}
