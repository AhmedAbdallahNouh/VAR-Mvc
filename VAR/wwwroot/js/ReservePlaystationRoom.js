var playstationRoomId = window.location.pathname.split('/')[3];
console.log(`URL : ${window.location.pathname.split('/')[3]}`);

var roomStatusVariable = localStorage.getItem(`start time for room (${playstationRoomId})`);

var openTimeRadio = document.getElementById("open-time-radio");
var openTimeRadio = document.getElementById("open-time-radio");
var specificTimeRadio = document.getElementById("specific-time-radio");


var specificTimeRadio = document.getElementById("specific-time-radio");
var specificTimeDiv = document.getElementById("specific-time-div");
var specificTimeHourInput = document.getElementById("specific-time-hour");
var specificTimeMinuteInput = document.getElementById("specific-time-minutes");
var startAndStopBtnsDiv = document.getElementById("start-and-stop-div");

console.log(roomStatusVariable);

var second = 0;
var minute = 0;
var hour = 0;

var addItemBttn = document.getElementById("add-item");
var specificEndTime;
var specificStartTime;
function timer() {
    specificStartTime = new Date(localStorage.getItem(`start time for room (${playstationRoomId})`));

    //console.log(new Date(localStorage.getItem(`start time for room (${playstationRoomId})`)));
    //console.log("start",specificStartTime);   
    specificEndTime = specificStartTime;
    specificEndTime.setHours(specificStartTime.getHours() + parseInt(specificTimeHourInput.value));
    specificEndTime.setMinutes(specificStartTime.getMinutes() + parseInt(specificTimeMinuteInput.value));
    console.log("end", specificEndTime);   
    var nowDate = new Date();
    console.log("New Date", new Date());   

    if ( nowDate > specificEndTime ) {
        console.log("from if");
        timerSecond.innerHTML = `00`;
        timerMinute.innerHTML = `${specificTimeMinuteInput.value}`;
        timerHour.innerHTML = `${specificTimeHourInput.value}`;
        stopBtn.click();
    }
    else
    {

        if (second != 59) {
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
    }
    
    localStorage.setItem(`Timer State For Room (${playstationRoomId})`, new Date().toString());
    localStorage.setItem(`Timer State Hour For Room (${playstationRoomId})`, hour);
    localStorage.setItem(`Timer State Minute For Room (${playstationRoomId})`, minute);
    localStorage.setItem(`Timer State Second For Room (${playstationRoomId})`, second);

}

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

var timerIntervalId;
if (roomStatusVariable !== null) {

    if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific") {
        console.log(specificTimeRadio);
        specificTimeRadio.checked = true;
        handleSpecificTimeRadioClick();

        console.log("specific should clicked");
        // get the object of specific time inputs hours and minutes
        var specificTimeHoursAndMinutes = JSON.parse(localStorage.getItem(`Specific Time For Room (${playstationRoomId})`));
        //check if specific time is already completed
        if (specificTimeHoursAndMinutes.hour > hour || (specificTimeHoursAndMinutes.hour == hour && specificTimeHoursAndMinutes.minute > minute)) {
            hour = specificTimeHoursAndMinutes.hour;
            console.log(hour);
            minute = specificTimeHoursAndMinutes.minute;
            console.log(minute);

            timerSecond.innerHTML = `00`;
            timerMinute.innerHTML = `${minute}`;
            timerHour.innerHTML = `${hour}`;
            timerIntervalId = setInterval(timer, 1000);

        }
      
        specificTimeHourInput.value = specificTimeHoursAndMinutes.hour;
        specificTimeMinuteInput.value = specificTimeHoursAndMinutes.minute;
    }
    else
    {
        const timerState = new Date(localStorage.getItem(`Timer State For Room (${playstationRoomId})`)).getTime();
        console.log(`timer state : ${timerState}`);
        console.log(`current time : ${new Date().getTime()}`);

        diffrenceTimeInMinutes = Math.round(((new Date().getTime() - timerState) / 60000));
        console.log(`difrrence time : ${diffrenceTimeInMinutes}`);

        //var diffrenceTimeInMilisecond = Math.round(((new Date().getTime() - timerState)));
        //var sumOfspecificTimeInMilisecond = ((parent(specificTimeHourInput.value) * 60) + parent(specificTimeMinuteInput.value)) / 60000;
        hour = localStorage.getItem(`Timer State Hour For Room (${playstationRoomId})`);
        minute = parseInt(localStorage.getItem(`Timer State Minute For Room (${playstationRoomId})`));
        second = localStorage.getItem(`Timer State Second For Room (${playstationRoomId})`);

        if ((minute + diffrenceTimeInMinutes) < 59) {

            minute += diffrenceTimeInMinutes;
            timerSecond.innerHTML = `${second}`;
            timerMinute.innerHTML = `${minute}`;
            timerHour.innerHTML = `${hour}`;

            timerIntervalId = setInterval(timer, 1000);
            //setTimeout(function () {
            //    stopBtn.click();
            //}, sumOfspecificTimeInMilisecond - diffrenceTimeInMilisecind);
        }
        else {
            console.log(`difrrence time : ${diffrenceTimeInMinutes}`);
            hour += Math.round((minute + diffrenceTimeInMinutes) / 60);
            console.log(`minute : ${minute}`);
            minute = (minute + diffrenceTimeInMinutes) % 60;

            timerSecond.innerHTML = `${second}`;
            timerMinute.innerHTML = `${minute}`;
            timerHour.innerHTML = `${hour}`;

            timerIntervalId = setInterval(timer, 1000);
            //setTimeout(function () {
            //    stopBtn.click();
            //}, 60000 );
        }
    }

    roomStatus.innerHTML = "Busy";
    startBtn.disabled = true;

}
else {
    roomStatus.innerHTML = "Free";
}

console.log(`room status : ${roomStatus.innerHTML}`);



// Function to execute when the radio button is clicked
function handleSpecificTimeRadioClick() {
    //set value into ls to use it to stope timer counter at specific time
    //specificTimeDiv.style = "display : block";
    specificTimeDiv.classList.remove("d-none");
    specificTimeDiv.classList.add("d-flex");
    stopBtn.style = "display : none";
    startAndStopBtnsDiv.style.marginLeft = "487px";
    startBtn.style.width = "22%";
    localStorage.setItem(`Time Radio For Room (${playstationRoomId})`, "specific");
}
specificTimeRadio.addEventListener("click", handleSpecificTimeRadioClick);

openTimeRadio.addEventListener("click", function () {

    specificTimeDiv.classList.remove("d-flex");
    specificTimeDiv.classList.add("d-none");

    stopBtn.style = "display : block";
    startAndStopBtnsDiv.style.marginLeft = "433px";
    startBtn.style.width = "15%";

    localStorage.setItem(`Time Radio For Room (${playstationRoomId})`, "open");

});

var startTime;

startBtn.addEventListener("click", () => {

    //specific time configuration
    // save the object of specific time hours and minutes to use it to determine timer counter break time 
    if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific") {
        var specifciTimeObj = {
            hour: specificTimeHourInput.value,
            minute: specificTimeMinuteInput.value
        }
        localStorage.setItem(`Specific Time For Room (${playstationRoomId})`, JSON.stringify(specifciTimeObj));
        openTimeRadio.disabled = true;
    }
    else
    {
        specificTimeRadio.disabled = true;
    }
   


    //import arrayOfItemsIDs from "./Item";
    console.log("from import", arrayOfItemsIDs);
    startTime = new Date();

    timerIntervalId = window.setInterval(timer, 1000);
 
    startBtn.disabled = true;

    
    startTimeH1.innerHTML = startTime;
    console.log(`startTime : ${startTime.toString()}`);

    localStorage.setItem(`start time for room (${playstationRoomId})`, startTime.toString());
});

var playstationRoomTableBody = document.getElementById("playstation-room-tbody");
var singlePlayerRadio = document.getElementById("singleRadio");
var MultiPlayerRadio = document.getElementById("MultiRadio");

//get the single and multi price per hour of playstation room
var singlePriceForHour = parseInt(playstationRoomTableBody.rows[0].cells[2].innerText);
var multiPriceForHour =  parseInt(playstationRoomTableBody.rows[0].cells[3].innerText);

var diffrence;
var timeDiff;
var timeDiffInHours;
var timeDiffInMinutes;
var stopTime
var playstationRoomTotalPrice;
stopBtn.addEventListener("click", () => {

    clearInterval(timerIntervalId);
    startBtn.disabled = true;
    stopBtn.disabled = true;

  
    if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific") {
        timeDiffInHours = parseInt(specificTimeHourInput.value);
        timeDiffInMinutes = parseInt(specificTimeMinuteInput.value);
    }
    else {
        var time1 = new Date("Sat Aug 12 2023 17:00:41 GMT+0300");
        var time2 = new Date("Sat Aug 12 2023 18:45:41 GMT+0300");

        if (localStorage.getItem(`start time for room (${playstationRoomId})`) !== null) {
            startTime = new Date(localStorage.getItem(`start time for room (${playstationRoomId})`));
            console.log(`startTime FROM IF : ${startTime}`);

        }
        // Calculate the time difference in milliseconds
        stopTime = new Date();
        var timeDiff = Math.abs(stopTime - startTime);
        //timeDiff = Math.abs(time2 - time1);


        // Convert milliseconds to hours and minutes
        timeDiffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
        timeDiffInMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    }
 
    playstationRoomTotalPrice = singlePlayerRadio.checked ? Math.round(((timeDiffInMinutes / 60) + timeDiffInHours) * singlePriceForHour)
        : Math.round(((timeDiffInMinutes / 60) + timeDiffInHours) * multiPriceForHour);

    diffrenceH1.innerHTML = timeDiff;
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
var modalFooter = document.querySelector(".modal-footer");
var orderTotalPriceValue;
var AllItemsTotalPrice = 0;

function showOrder() {

    console.log(plastationRoomTableCopy);
    var plastationRoomTable = document.getElementById("ps-room-table");
    var plastationRoomTableCopy = plastationRoomTable.cloneNode(true);
    console.log(plastationRoomTableCopy);
    if (singlePlayerRadio.checked) {
        plastationRoomTableCopy.rows[0].cells[3].remove();
        plastationRoomTableCopy.rows[1].cells[3].remove();

    } else {
        plastationRoomTableCopy.rows[0].cells[2].remove()
        plastationRoomTableCopy.rows[1].cells[2].remove()
    }

    var row = document.querySelectorAll("tr");
    console.log("row", row[0]);

    //check if the table head (time and totalPrice) is not exist already
    if (row[0].cells[4] == null) {
        var timeCellHeader = document.createElement("th");
        timeCellHeader.textContent = "Time";
        //row[0].appendChild(timeCellHeader);
        plastationRoomTableCopy.rows[0].appendChild(timeCellHeader);

        var timeCellValue = row[1].insertCell();
        timeCellValue.textContent = `${timeDiffInHours} : ${timeDiffInMinutes}`
        console.log(diffrence);
        plastationRoomTableCopy.rows[1].appendChild(timeCellValue);

        var totalPriceCellHeader = document.createElement("th");
        totalPriceCellHeader.textContent = "Total Price";
        plastationRoomTableCopy.rows[0].appendChild(totalPriceCellHeader);

        var totalPriceCellValue = row[1].insertCell();
        totalPriceCellValue.textContent = playstationRoomTotalPrice.toString();
        console.log(diffrence);
        plastationRoomTableCopy.rows[1].appendChild(totalPriceCellValue);
    }

    orderTable = document.getElementById("order-table");
    //var orderTableCopy = orderTable !== null ? orderTable.cloneNode(true) : null;
    if (orderTable != null) {
        var orderTableCopy = orderTable.cloneNode(true);

        //iterate the table delete button cell to remove it from invoice
        for (let i = 1; i < orderTableCopy.rows.length; i++) {
            orderTableCopy.rows[i].cells[5].remove();
            //Calculate The Order All Items Total Price
            AllItemsTotalPrice += parseInt(orderTableCopy.rows[i].cells[4].textContent);
        }
        //Create a new orderTableCopy row
        var orderTableCopyNewRow = document.createElement("tr");
        orderTableCopyNewRow.style.borderWidth = "3px 0 3px 0";
        //Create a new orderTableCopy AllTotalPrice cell with colspan 5
        var orderTableCopyAllTotalPriceCellHeader = document.createElement("td");
        //Create a new orderTableCopy AllTotalPrice cell with colspan 5
        var orderTableCopyAllTotalPriceCellValue = document.createElement("td");
        orderTableCopyAllTotalPriceCellHeader.colSpan = 4;
        orderTableCopyAllTotalPriceCellHeader.textContent = "All Items Total Price";
        orderTableCopyAllTotalPriceCellHeader.style.fontWeight = "bolder";
        orderTableCopyAllTotalPriceCellHeader.style.padding = "5px 5px 5px 35px";
        orderTableCopyAllTotalPriceCellHeader.style.textAlign = "start";

        //Append the new orderTableCopy AllTotalPriceHeader cell to the new orderTableCopy row
        orderTableCopyNewRow.appendChild(orderTableCopyAllTotalPriceCellHeader);
        //Append the new orderTableCopy AllTotalPriceValue cell to the new orderTableCopy row
        orderTableCopyNewRow.appendChild(orderTableCopyAllTotalPriceCellValue);
        orderTableCopyAllTotalPriceCellValue.textContent = AllItemsTotalPrice.toString();
        orderTableCopyAllTotalPriceCellValue.style.cssText = "font-weight: bolder; padding: 5px;";
        // Step 5: Append the new row to the table
        orderTableCopy.appendChild(orderTableCopyNewRow);
        
    }
    else
    {
        var orderTableCopy = null;
    }
    var modalBody = document.getElementById("modal-body");
    // Create Order Total Price (Items Total Price + Playstation Gaming Total Price)
    var orderTotalPriceDiv = document.createElement("div");
    orderTotalPriceDiv.classList.add("me-auto", "p-2");
    orderTotalPriceDiv.style.cssText = " font-size: larger;  font-weight: bolder; ";

    orderTotalPriceValue =  playstationRoomTotalPrice + AllItemsTotalPrice;

    orderTotalPriceValue = playstationRoomTotalPrice + AllItemsTotalPrice;
    orderTotalPriceDiv.innerText = `Order Total Price : ${orderTotalPriceValue.toString()} L.E`;

    // Check if the div already contains a table element
    var existingPsRoomTable = (modalBody.querySelectorAll("table"))[0];
    var existingOrderTable = (modalBody.querySelectorAll("table"))[1];

    console.log(existingPsRoomTable);
    console.log(existingOrderTable);

    if (existingPsRoomTable == null) modalBody.appendChild(plastationRoomTableCopy);

    if (orderTableCopy != null) {
        if (existingOrderTable != null) {
            modalBody.removeChild(existingOrderTable);
        }
        modalBody.appendChild(orderTableCopy);
    }
   
    //check if already orderTotalPriceDiv is not exist
    if (modalFooter.firstChild.tagName != "DIV") { 
        // insert orderTotalPriceDiv as modalFooter first child
        modalFooter.prepend(orderTotalPriceDiv);
    } 
    else {
        //delete it and update it with new value
        modalFooter.firstChild.remove();
        //delete it and update it with new value
        modalFooter.prepend(orderTotalPriceDiv);
    }
    //set discount max value = order Total Price Value
    discount.setAttribute("max", orderTotalPriceValue.toString());
}
//discount input in invoice modal
var discount = document.getElementById("discount");
var orderTotalPriceValueAfterDiscount ;
discount.addEventListener("change", () => {
    orderTotalPriceValueAfterDiscount = orderTotalPriceValue - parseFloat(discount.value)
    modalFooter.firstChild.innerText = `Order Total Price : ${orderTotalPriceValueAfterDiscount} L.E`;

})
//Add Order To DataBase


function getCookie(cookieNam) {
    // Get the value of the myCookie cookie
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith(cookieNam)).split('=')[1];

    // Parse the value as JSON
    const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
    return parsedValue;
};

var adminId = getCookie("AdminId");

var tableBody;

async function confirmOrder()
{
    console.log(adminId);
    if (playstationRoomId === undefined) playstationRoomId = null
    var TotalPriceOfAllOrderedItems = playstationRoomTotalPrice;
    //check if there items order to get the total price of all items to add it to total price of playstation gamin order 
    if (orderTable !== null) {
        tableBody = document.getElementById("table-body");
        for (i = 0; i < tableBody.rows.length; i++) {
            console.log(tableBody.rows[i].cells[4].innerText)
            TotalPriceOfAllOrderedItems += parseFloat(tableBody.rows[i].cells[4].innerText);
        }

        if (discount.value != "") TotalPriceOfAllOrderedItems -= parseFloat(discount.value) 
    }
    var orderToAdd = {

        StartTime: startTime ? `${startTime.toLocaleDateString('en-US')} ${startTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
        EndTime: stopTime ? `${stopTime.toLocaleDateString('en-US')} ${stopTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
        TotalPrice: orderTotalPriceValueAfterDiscount,
        Discount : parseFloat(discount.value),
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
        
        for (let i = 0; i < arrayOfItemsIDs.length; i++) 
        {
            var ItemQuantityCell = tableBody.rows[i].cells[3].textContent;
            var ItemTotalPriceCell = tableBody.rows[i].cells[4].textContent;
            TotalPriceOfAllOrderedItems += parseInt(ItemTotalPriceCell);

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
