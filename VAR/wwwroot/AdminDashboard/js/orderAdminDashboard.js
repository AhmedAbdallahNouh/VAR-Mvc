
const noneExistingOrdersFilterAlert = document.getElementById("alert-div");
//noneExistingOrdersFilterAlert[0].setAttribute("style", "display: none!important;");

class TableRow {
    constructor(startTime, endTime, adminName, playstationRoom) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.adminName = adminName;
        this.playstationRoom = playstationRoom;

    }
};

// get the orders table data to aplly ordering (by : Month, year, adminID ,....) in it
var table = document.getElementById("orders-table");
console.log("table", table);
var tbody = table.getElementsByTagName("tbody")[0];
console.log("tbody", tbody);

var rows = tbody.getElementsByTagName("tr");
console.log("rows", rows);



const data = [];

for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const startTime = cells[0].innerText;
    const endTime = parseInt(cells[1].innerText);
    const adminName = cells[2].innerText;
    const playstationRoom = cells[3].innerText;
    const rowData = new TableRow(startTime, endTime, adminName, playstationRoom);
    data.push(rowData);
}



console.log("original array", data);

const filteredDataByAdmin = data.filter(row => row.adminName === "Hazem");
console.log("fiterd array", filteredDataByAdmin);

const filteredDataByPlaystationRoom = data.filter(row => row.playstationRoom === "Liverpool");
console.log("fiterd array", filteredDataByPlaystationRoom);

const filteredDataByMonth = data.filter(row => row.startTime.split("/")[0] === "4" && row.startTime.split("/")[2].split(" ")[0] === "2023");
console.log("fiterd array by month", filteredDataByMonth);

const targetYear = '2023'
const filteredDataByYear = data.filter(row => {
    const startTime = row.startTime;
    if (startTime == 'ـــــ' ) {
        return false;
    }
    const year = startTime.split('/')[2].split(' ')[0];
    return year === targetYear;
});

console.log("fiterd array by year", filteredDataByYear);


var allOrdersBtn = document.getElementById("all-orders");

const ApplyFilterBtn = document.getElementById("filter-by-date");
const claerFilterBtn = document.getElementById("clear-filter");



function filterBy(filterdArray) {
    // Clear the table body
    tbody.innerHTML = "";

    // Loop through the filtered data and create new rows and cells
    filterdArray.forEach(row => {
        const newRow = tbody.insertRow();
        const startTimeCell = newRow.insertCell();
        startTimeCell.innerText = row.startTime;
        const endTimeCell = newRow.insertCell();
        endTimeCell.innerText = row.endTime;
        const adminNameCell = newRow.insertCell();
        adminNameCell.innerText = row.adminName;
        const playstationRoomCell = newRow.insertCell();
        playstationRoomCell.innerText = row.playstationRoom;
    });
}


const dateInput = document.getElementById("date");
const AdminNameSelect = document.getElementById("select-admin");
const RoomNameSelect = document.getElementById("select-room");

// split the dateInput value in array of year , month , day ex : '18-04-2023' => ['18','04','2023']
var dateInputValueAsArrayOfDate ;
console.log(dateInputValueAsArrayOfDate);

var filteredDataByDay;
ApplyFilterBtn.addEventListener("click", function () {
    dateInputValueAsArrayOfDate = dateInput.value.split('-').reverse();
    console.log(dateInputValueAsArrayOfDate);
    if (dateInput.value != '') {
        filteredDataByDay = data.filter(row => row.startTime.split("/")[1] === dateInputValueAsArrayOfDate[0] && row.startTime.split("/")[0] === dateInputValueAsArrayOfDate[1].slice(1)
            && row.startTime.split("/")[2].split(" ")[0] === dateInputValueAsArrayOfDate[2]);
        console.log("fiterd array by day", filteredDataByDay);
    }
    if (RoomNameSelect.value != "") {
        filteredDataByDay = filteredDataByDay == undefined ? data.filter(row => row.playstationRoom == RoomNameSelect.value) : filteredDataByDay.filter(row => row.playstationRoom == RoomNameSelect.value);
        console.log("fiterd array by day and room", filteredDataByDay);
    }
    if (AdminNameSelect.value != "") {
        filteredDataByDay = filteredDataByDay == undefined ? data.filter(row => row.adminName == AdminNameSelect.value) : filteredDataByDay.filter(row => row.adminName == AdminNameSelect.value);
        console.log("fiterd array by day and room and admin", filteredDataByDay);
    }
    
    if (filteredDataByDay.length != 0) {
        filterBy(filteredDataByDay);
        filteredDataByDay = undefined;
        noneExistingOrdersFilterAlert.setAttribute("style", "display: none!important;");

    }
    else {
        filteredDataByDay = undefined;
        noneExistingOrdersFilterAlert.removeAttribute("style");
    }

});

//resert the filters
claerFilterBtn.addEventListener("click", function () {  
    dateInput.value = '';    
    RoomNameSelect.value = "";   
    AdminNameSelect.value = "";
});

// get all orders by click the current active list from pagination list
allOrdersBtn.addEventListener("click", function () {
    currentActiveLi.click();
})
//filterByRoomNameBtn.addEventListener("click", function () {
//    filterBy(filteredDataByPlaystationRoom);
//});

//filterByAdminBtn.addEventListener("click", function () {
//    filterBy(filteredDataByAdmin);
//});









var pageNumber;

// getting the pervious li
var previousLi = document.getElementById('pervious-li');
var nextLi = document.getElementById('next-li');
// getting the  whole pagination-ul 
var paginationUl = document.getElementById('pagination-ul');

var beforeLastLi = paginationUl.lastElementChild.previousElementSibling;
var pageLinks = document.querySelectorAll('.page-item a');

var currentActiveLiFromLocalStorage = localStorage.getItem("active List");
// get the first li with page number 1 
if (currentActiveLiFromLocalStorage == null || currentActiveLiFromLocalStorage == 1) {
    var currentActiveLi = pageLinks[1];
    currentActiveLi.parentElement.classList.add('active');
    console.log(currentActiveLi);

} else {
    // check if the currentActiveLiFromLocalStorage = the last number in page links and the li after it , its next li
    if (currentActiveLiFromLocalStorage == beforeLastLi.innerText) nextLi.classList.add('disabled');
    var currentActiveLi = pageLinks[parseInt(currentActiveLiFromLocalStorage)];
    currentActiveLi.parentElement.classList.add('active');
    previousLi.classList.remove('disabled');
    console.log(currentActiveLi);

}
//var currentActiveLi = currentActiveLiFromLocalStorage == null ? pageLinks[1] : pageLinks[parseInt(currentActiveLiFromLocalStorage)];

// in initailization page add active class to parent of first li with page number 1 



pageLinks.forEach(function (pageLink) {
    pageLink.addEventListener('click',  function (event) {
        event.preventDefault();
        // to perven 
        var fromNextOrPervious;
        pageNumber = pageLink.innerHTML;
        console.log(pageLink);
        var parentLi = this.parentNode;
        var activeLi = document.querySelector('.page-item.active');
   
        if (parentLi === nextLi) {
            console.log(activeLi.nextElementSibling.firstElementChild);
            var nextElement = activeLi.nextElementSibling.firstElementChild;
            fromNextOrPervious = 1;
            nextElement.click();
            

        }
        else if (parentLi === previousLi) {
            console.log(activeLi.previousElementSibling.firstElementChild);


            activeLi.previousElementSibling.firstElementChild.click();
            fromNextOrPervious = 1;

        }
        if (activeLi)
        {
            console.log("active", activeLi);
                //nextLi.classList.toggle('disabled', parentLi === beforeLastLi);
                //previousLi.classList.toggle('disabled', parentLi.textContent === '1');
                //activeLi.classList.remove('active');
            
            if (parentLi.childNodes[0].innerHTML != 1)
            {
                if (parentLi === beforeLastLi)
                {
                    nextLi.classList.add('disabled');
                    console.log("beforelast", parentLi);
                }
                else if (fromNext != 1)
                {
                    nextLi.classList.remove('disabled');
                    console.log("NOT beforelast", parentLi);


                }
                console.log("prev");
                previousLi.classList.remove('disabled');
                console.log(previousLi);
            }
            else
            {
                nextLi.classList.remove('disabled');
                previousLi.classList.add('disabled');

            }
            activeLi.classList.remove('active');
        }
        if (parentLi != nextLi && parentLi != previousLi) {
            console.log(parentLi);
            console.log("page link text",pageLink.innerText);

            parentLi.classList.add('active');
            // save the current active li to retrive the active page link when the page is reloaded
            localStorage.setItem("active List", `${pageLink.innerText}`);
        }

        window.location.href = `http://localhost:32719/Order/getOrdersPagination/?page=${pageNumber}&size=10`;
        //window.location.href = `http://localhost:5208/Order/getOrdersPagination/?page=${pageNumber}&size=10`;


    });
});
