var inputNumber = document.getElementById("number");
var selectItem = document.getElementById("select-item");
var startBtn = document.getElementById("startBtn");

var playstationRoomId = window.location.pathname.split('/')[3];

var addBttn = document.getElementById("add");
var addItemBttn = document.getElementById("add-item");
var tableData = playstationRoomId != undefined ? JSON.parse(localStorage.getItem(`oredrItemsForRoom(${playstationRoomId})`))
                                               : JSON.parse(localStorage.getItem('justOrderItems'))
console.log(tableData);
var itemsCart = document.getElementById("items-cart");

var tableBody;
// to delet item from iems table
// Add event listener to table to listen for clicks on "Delete" buttons
$('table').on('click', '.delete-item', function () {
     tableBody = document.getElementById("table-body");

    
    var row = $(this).closest('tr');

    // get name of item which will delte to update tableData
    var rowItemName = row.find('td:first').text();
    console.log(rowItemName)
    //Update tableData
    let tableDataDeletedObjectIndex = tableData.findIndex(item => item.name === rowItemName);

    if (tableDataDeletedObjectIndex !== -1) {
        tableData.splice(tableDataDeletedObjectIndex, 1);

        // Save table data to local storage
        playstationRoomId != undefined
            ? localStorage.setItem(`oredrItemsForRoom(${playstationRoomId})`, JSON.stringify(tableData))
            : localStorage.setItem("justOrderItems", JSON.stringify(tableData));
    }

    //Update arrayOfItemsNameAndItemsId by Removing Deleted Item Object From arrayOfItemsNameAndItemsId
    let arrayOfItemsNameAndItemsIdDeletedObjectIndex = arrayOfItemsNameAndItemsId.findIndex(item => item.hasOwnProperty(rowItemName) == true);
    if (arrayOfItemsNameAndItemsIdDeletedObjectIndex !== -1) {
        arrayOfItemsNameAndItemsId.splice(arrayOfItemsNameAndItemsIdDeletedObjectIndex, 1);

        // Save arrayOfItemsNameAndItemsId to local storage
        localStorage.setItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`, JSON.stringify(arrayOfItemsNameAndItemsId));

    }

    // Delete closest row when "Delete" button is clicked
    row.remove();
    
    // Check if table body has any rows left
    if (tableBody.rows.length == 0) {
        // If there are no more rows in the table body, delete the entire table
        //$('table').remove();
        itemCart.innerHTML = "";
        console.log("lastrow");

    }
    console.log("delete");
});




if (tableData != null && tableData.length!=0) {
    
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
                    $('<td>').append($('<button>', {
                        class: 'delete-item btn btn-danger',
                        id: 'delete-item',
                        text: 'Delete'
                    })).appendTo(row);
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
        playstationRoomId != undefined
        ? localStorage.setItem(`oredrItemsForRoom(${playstationRoomId})`, JSON.stringify(tableData))
        : localStorage.setItem("justOrderItems", JSON.stringify(tableData));

    };


//array holds the IDs of Ordered Items to Save it in OrderItemDetails Table In DataBase 
var arrayOfItemsIDs = localStorage.getItem(`arrayOfItemsIDsForRoom(${playstationRoomId})`) != null ? JSON.parse(localStorage.getItem(`arrayOfItemsIDsForRoom(${playstationRoomId})`)) :[];
var arrayOfItemsNameAndItemsId = localStorage.getItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`) != null ? JSON.parse(localStorage.getItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`)) : [];
    addBttn.addEventListener("click", () => {
   
        //Check if the ItemNameAndItemIdObj of selected is already exisit in arrayOfItemsNameAndItemsId or not
        if (arrayOfItemsNameAndItemsId.length != 0) {
            var ItemNameAndItemIdObjIsExists = arrayOfItemsNameAndItemsId.some(item => {
                if (typeof (item) == "object"  ) return item.hasOwnProperty(selectedItem.name);
               // Or use a specific property for comparison
            });
            if (!ItemNameAndItemIdObjIsExists) {
                var ItemNameAndItemIdObj = {};
                ItemNameAndItemIdObj[selectedItem.name] = selectedItem.id;
                console.log(ItemNameAndItemIdObj);
                arrayOfItemsNameAndItemsId.push(ItemNameAndItemIdObj);
                // Save arrayOfItemsIDs to local storage
                localStorage.setItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`, JSON.stringify(arrayOfItemsNameAndItemsId));
            } 
        }
        else
        {
            var ItemNameAndItemIdObj = {};
            ItemNameAndItemIdObj[selectedItem.name] = selectedItem.id;
            console.log(ItemNameAndItemIdObj);
            arrayOfItemsNameAndItemsId.push(ItemNameAndItemIdObj);
            // Save arrayOfItemsIDs to local storage
            localStorage.setItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`, JSON.stringify(arrayOfItemsNameAndItemsId));
        }
                       
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
                        $('<td>').append($('<button>', {
                        class: 'delete-item btn btn-danger',
                        id: 'delete-item',
                        text: 'Delete'
                        })).appendTo(row);


                        row.appendTo("#table-body");
                        setMaxQuantityItem();

                        updateTable(selectedItem.name, selectedItem.type, selectedItem.price, itemQuantityNumInput.value, selectedItem.price * itemQuantityNumInput.value);
                   

                }
                else {
                    tableBody = document.getElementById("table-body");
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
                        $('<td>').append($('<button>', {
                            class: 'delete-item btn btn-danger',
                            id: 'delete-item',
                            text: 'Delete'
                        })).appendTo(row);
                        row.appendTo("#table-body");

                        //set Max Quantity withe the item Quantity inStock
                        setMaxQuantityItem();

                        updateTable(selectedItem.name, selectedItem.type, selectedItem.price, itemQuantityNumInput.value, selectedItem.price * itemQuantityNumInput.value)


                    }

                }
            }
        });
    });
