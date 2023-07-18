const displayItemsBttn = document.getElementById("display-items");
$(document).ready(function () {
    // code to execute after the document has finished loading
        $.ajax({
            url: "/Item/getAllItemsInStock",
            success: function (result) {

                $("#display-items").html(result);
             
            }
        });
     
});

function showOrder() {

    var row = document.querySelectorAll("tr");
    console.log("row", row[0]);


    orderTable = document.getElementById("order-table");
    var orderTableCopy = orderTable !== null ? orderTable.cloneNode(true) : null;
    var modalBody = document.getElementById("modal-body");

    // Check if the div already contains a table element
    var existingOrderTable = (modalBody.querySelectorAll("table"))[1];

    console.log(existingOrderTable);

    if (existingOrderTable) {
        modalBody.removeChild(existingOrderTable);
    }

    modalBody.appendChild(orderTableCopy);
}
    async function confirmOrders() {
       
        var orderToAdd = {

            StartTime: null,
            EndTime: null,
            adminID: 2,
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
                window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
                console.log(result);
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }
        catch (error) {
            console.error(error);
        }

        if (orderTable !== null) {
            var tableBody = document.getElementById("table-body");
            for (let i = 0; i < arrayOfItemsIDs.length; i++) {
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
