

var orderTable = document.getElementById("order-table");
console.log("order table", orderTable);
var modalBody = document.getElementById("modal-body");
var modalFooter = document.querySelector(".modal-footer");

var orderTotalPriceValue;

function deleteLocalStorageAfetrItemsOrderConfirming() {
    localStorage.removeItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`);
    localStorage.removeItem("justOrderItems");
}

function showOrder() {
    discount.value = "0";
    var AllItemsTotalPrice = 0;
    var existingOrderTable;
    console.log(modalBody);
    

    orderTable = document.getElementById("order-table");
    console.log("order table", orderTable);


    if (orderTable != null) {
        var orderTableCopy = orderTable.cloneNode(true);
        orderTableCopy.id = "copy-order-table";
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
    else {
            var orderTableCopy = null;
    }
    // Create Order Total Price (Items Total Price + Playstation Gaming Total Price)
    var orderTotalPriceDiv = document.createElement("div");
    orderTotalPriceDiv.classList.add("me-auto", "p-2");
    orderTotalPriceDiv.style.cssText = " font-size: larger;  font-weight: bolder; ";

    orderTotalPriceValue = AllItemsTotalPrice;
    orderTotalPriceValueAfterDiscount = orderTotalPriceValue;

    //orderTotalPriceValue = playstationRoomTotalPrice + AllItemsTotalPrice;
    orderTotalPriceDiv.innerText = `Order Total Price : ${orderTotalPriceValue.toString()} L.E`;

    // Check if the div already contains a table element
    existingOrderTable = (modalBody.querySelectorAll("table"))[0];

    console.log(existingOrderTable);

    if (orderTableCopy != null) {
        if (existingOrderTable != null) {
            modalBody.removeChild(existingOrderTable);
        }
        modalBody.appendChild(orderTableCopy);
    } else if (!orderTableCopy) modalBody.removeChild(existingOrderTable);


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
var orderTotalPriceValueAfterDiscount;
discount.addEventListener("change", () => {
    orderTotalPriceValueAfterDiscount = orderTotalPriceValue - parseFloat(discount.value)
    modalFooter.firstChild.innerText = `Order Total Price : ${orderTotalPriceValueAfterDiscount} L.E`;

});
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

async function confirmOrder() {
    console.log(adminId);
    console.log(orderTotalPriceValue);
    var TotalPriceOfAllOrderedItems = 0;

    //check if there items order to get the total price of all items to add it to total price of playstation gamin order 
    if (orderTable !== null) {
        tableBody = document.getElementById("table-body");
        for (i = 0; i < tableBody.rows.length; i++) {
            console.log(tableBody.rows[i].cells[4].innerText)
            TotalPriceOfAllOrderedItems += parseFloat(tableBody.rows[i].cells[4].innerText);
        }

        if (discount.value != "") TotalPriceOfAllOrderedItems -= parseFloat(discount.value)
    }
    var orderDateTime = new Date();
    var orderToAdd = {

        StartTime: `${orderDateTime.toLocaleDateString('en-US')} ${orderDateTime.toLocaleTimeString('en-US').substring(0, 11)}`,
        EndTime: null,
        TotalPrice: orderTotalPriceValueAfterDiscount,
        Discount: parseFloat(discount.value),
        adminID: adminId,
        // check if this is just items order by checking the startTime Value
        playstationID: null
    };

    var result;

    console.log(orderToAdd);
    try {
        const response = await fetch("/Order/AddOrderDB", {

            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify(orderToAdd)
        });

        if (response.ok) {
            result = await response.json();
            //window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
            console.log(result);
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
    }

    if (orderTable !== null) {
        console.log(arrayOfItemsIDs)
        //if (localStorage.getItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`)) arrayOfItemsNameAndItemsId = JSON.parse(localStorage.getItem("arrayOfItemsIDsForRoom(1)"));
        for (let i = 0; i < arrayOfItemsNameAndItemsId.length; i++) {
            var ItemQuantityCell = tableBody.rows[i].cells[3].textContent;
            var ItemTotalPriceCell = tableBody.rows[i].cells[4].textContent;
            TotalPriceOfAllOrderedItems += parseInt(ItemTotalPriceCell);

            console.log(arrayOfItemsIDs[i]);
            console.log(ItemQuantityCell);
            console.log(ItemTotalPriceCell);

            /* get the item id from arrayOfItemsNameAndItemsId by getting the value of each key 
            of each object  in iarrayOfItemsNameAndItemsId */
            var itemId = arrayOfItemsNameAndItemsId[i][tableBody.rows[i].cells[0].textContent];
            var orderItemDetailsToAdd = {

                orderId: result.id,
                itemId: itemId,
                Quantity: parseInt(ItemQuantityCell),
                TotalPrice: parseInt(ItemTotalPriceCell)
            };
            console.log(orderItemDetailsToAdd);
            try {
                const response1 = await fetch("/OrderItemDetails/Add", {

                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },

                    body: JSON.stringify(orderItemDetailsToAdd)
                });

                if (response1.ok) {
                    const result1 = await response1.json();
                    console.log(result1);

                } else {
                    throw new Error(`HTTP Error: ${response1.status}`);
                }
            }
            catch (error) {
                console.error(error);
            }

        }

    }
    deleteLocalStorageAfetrItemsOrderConfirming();
    //window.location.href = "http://localhost:5208/PlaystationRoom/getallrooms";
    window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";


}