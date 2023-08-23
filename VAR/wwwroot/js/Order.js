
var orderTable = document.getElementById("order-table");
console.log("order table", orderTable);
var modalBody = document.getElementById("modal-body");
var modalFooter = document.querySelector(".modal-footer");

var orderTotalPriceValue;

function showOrder() {
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

    orderTotalPriceValue =  AllItemsTotalPrice;

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

