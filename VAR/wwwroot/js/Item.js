var inputNumber = document.getElementById("number");
var selectItem = document.getElementById("select-item");
var startBtn = document.getElementById("startBtn");


var addBttn = document.getElementById("add");
var addItemBttn = document.getElementById("add-item");
var tableData = JSON.parse(localStorage.getItem('tableData'));

$/*(document).ready(function () {*/
// your code here
if (tableData != null) {

    //addItemBttn.click();

    $.ajax({
        url: "/Item/itemCart",
        success: function (result) {
            if (itemCart.innerHTML == "") {
                $("#cart-items").html(result);


                // Loop through the table data and add rows to the table
                for (let i = 0; i < tableData.length; i++) {
                    const row = $("<tr>");
                    $("<td>").text(tableData[i].name).appendTo(row);
                    $("<td>").text(tableData[i].type).appendTo(row);
                    $("<td>").text(tableData[i].price).appendTo(row);
                    $("<td>").text(tableData[i].Quantity).appendTo(row);
                    $("<td>").text(tableData[i]["Total Price"]).appendTo(row);
                    row.appendTo("#table-body");
                };
            }
        }
    });
}
else {
    tableData = [];
}

/*});*/

addItemBttn.addEventListener("click", () => {

    $.ajax({
        url: "/Item/getAllItemsInStock",
        success: function (result) {

            $("#display-items").html(result);
            addBttn.style.display = "block";

        }
    });
});


    //console.log("from item js", itemList);


    var itemsCart = document.getElementById("items-cart");
    var MaxQuantityItem = -1;

    function setMaxQuantityItem() {
        if (localStorage.getItem(`${selectedItem.name} CurrentInStock`) == null) {

            console.log(selectedItem);

            MaxQuantityItem = selectedItem.inStock - parseInt(itemQuantityNumInput.value);
            inputNumber.max = MaxQuantityItem;
            localStorage.setItem(`${selectedItem.name} CurrentInStock`, MaxQuantityItem);
        }
        else {
            console.log(selectedItem);

            MaxQuantityItem = localStorage.getItem(`${selectedItem.name} CurrentInStock`) - itemQuantityNumInput.value;
            inputNumber.max = MaxQuantityItem;
            localStorage.setItem(`${selectedItem.name} CurrentInStock`, MaxQuantityItem);

        };
    };

    var selectedItem;
    function setItemNumInStock() {
        selectedItem = itemList.find(function (item) {
            console.log(item);
            return item.id == selectItem.value;

        });
        inputNumber.max = localStorage.getItem(`${selectedItem.name} CurrentInStock`) == null ? selectedItem.inStock : localStorage.getItem(`${selectedItem.name} CurrentInStock`);
        console.log("block");

     };

    var itemsCartPrice = document.getElementById("items-cart-price");
    var partialElement = document.getElementById("partial");


    var addBtnDiv = document.getElementById("add-div");
    var itemCart = document.getElementById("cart-items");
    var itemQuantityNumInput = document.getElementById("number");

    var isItemExisit = 0;
  
    // Function to update tableData array of rowData objects and save to local storage
    function updateTable(name, type, price, quantity, totalPrice)
    {

        // Check if the item already exists in the tableData array    
        const existingItemIndex = tableData.findIndex(item => item.name === selectedItem.name);
        console.log(existingItemIndex);

        // If the item already exists, update the existing object with the new data
        if (existingItemIndex != -1) {
            console.log(tableData[existingItemIndex]);
            tableData[existingItemIndex]["Quantity"] = quantity;
            tableData[existingItemIndex]["Total Price"] = totalPrice;
            console.log(tableData);
        }

        // Otherwise, create a new object for the item and add it to the tableData array
        else
        {

            const rowData = {
                name: name,
                type: type,
                price: price,
                Quantity: quantity,
                "Total Price": totalPrice,
            };
            tableData.push(rowData);

        };

        // Save table data to local storage
        localStorage.setItem('tableData', JSON.stringify(tableData));
    };


//array holds the IDs of Ordered Items to Save it in OrderItemDetails Table In DataBase 
   var arrayOfItemsIDs = [];

    addBttn.addEventListener("click", () => {

        //Check if the id of selected is already exisit in arrayOfItemsIDs or not 
        if (!arrayOfItemsIDs.includes(selectedItem.id))
        {
            arrayOfItemsIDs.push(selectedItem.id);
            // Save arrayOfItemsIDs to local storage
            localStorage.setItem('arrayOfItemsIDs', arrayOfItemsIDs);
        } 
        console.log(arrayOfItemsIDs);
 
        $.ajax({
            url: "/Item/itemCart",
            success: function (result) {
                if (itemCart.innerHTML == "") {
                    $("#cart-items").html(result);

                         var row = $("<tr>");

                        $("<td>").text(selectedItem.name).appendTo(row);
                        $("<td>").text(selectedItem.type).appendTo(row);
                        $("<td>").text(selectedItem.price).appendTo(row);
                        $("<td>").text(itemQuantityNumInput.value).appendTo(row);
                        $("<td>").text(selectedItem.price * itemQuantityNumInput.value).appendTo(row);

                        row.appendTo("#table-body");
                        setMaxQuantityItem();

                        updateTable(selectedItem.name, selectedItem.type, selectedItem.price, itemQuantityNumInput.value, selectedItem.price * itemQuantityNumInput.value);
                   

                }
                else {
                    var tableBody = document.getElementById("table-body");
                    console.log("lenght", tableBody.rows.length);

                    for (let i = 0; i < tableBody.rows.length; i++) {
                        const ItemNameCell = tableBody.rows[i].cells[0].textContent;
                        var ItemQuantityCell = tableBody.rows[i].cells[3];
                        console.log(ItemNameCell, selectedItem.name);
                        if (ItemNameCell == selectedItem.name) {
                            var ItemPriceCell = tableBody.rows[i].cells[2];
                            var ItemTotalPriceCell = tableBody.rows[i].cells[4];

                            console.log(ItemNameCell);
                            ItemQuantityCell.textContent = parseInt(ItemQuantityCell.textContent) + parseInt(itemQuantityNumInput.value);
                            ItemTotalPriceCell.textContent = parseFloat(ItemPriceCell.textContent) * parseInt(ItemQuantityCell.textContent);

                            //set Max Quantity withe the item Quantity inStock
                            setMaxQuantityItem();

                            isItemExisit = 0;
                            updateTable(null, null, null, ItemQuantityCell.textContent, ItemTotalPriceCell.textContent);
                            break;
                        }
                        else isItemExisit = 1;

                    }

                    if (isItemExisit == 1) {
                        var row = $("<tr>");

                        $("<td>").text(selectedItem.name).appendTo(row);
                        $("<td>").text(selectedItem.type).appendTo(row);
                        $("<td>").text(selectedItem.price).appendTo(row);
                        $("<td>").text(itemQuantityNumInput.value).appendTo(row);
                        $("<td>").text(selectedItem.price * itemQuantityNumInput.value).appendTo(row);

                        row.appendTo("#table-body");

                        //set Max Quantity withe the item Quantity inStock
                        setMaxQuantityItem();

                        updateTable(selectedItem.name, selectedItem.type, selectedItem.price, itemQuantityNumInput.value, selectedItem.price * itemQuantityNumInput.value)


                    }

                }
            }
        });
    });
