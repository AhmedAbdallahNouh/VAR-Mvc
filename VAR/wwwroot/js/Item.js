var inputNumber = document.getElementById("number");
var selectItem = document.getElementById("select-item");
console.log("from item js", itemList);


//var itemsCart = document.getElementById("items-cart");

var selectedItem;
function setItemNumInStock() {
        selectedItem = itemList.find(function (item) {
        console.log(item);
        return item.id == selectItem.value;

    });
    inputNumber.max = selectedItem.price;
}

var itemsCartPrice = document.getElementById("items-cart-price");
var partialElement = document.getElementById("partial");


var addBtnDiv = document.getElementById("add-div");
var itemCart = document.getElementById("cart-items");
var itemQuantityNumInput = document.getElementById("number");



$("#add").click(function () {
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

                }
                else {

                    var tableBody = document.getElementById("table-body");
                    console.log("lenght", tableBody.rows.length);

                    for (let i = 0; i < tableBody.rows.length; i++){
                        const ItemNameCell = tableBody.rows[i].cells[0].textContent;
                        var ItemQuantityCell = tableBody.rows[i].cells[3];
                        console.log(ItemNameCell, selectedItem.name);
                        if (ItemNameCell == selectedItem.name) {
                            console.log(ItemNameCell);
                            ItemQuantityCell.textContent = itemQuantityNumInput.value;
                            //requestAnimationFrame(() => { });

                        }
                        else {
                            var row = $("<tr>");

                            $("<td>").text(selectedItem.name).appendTo(row);
                            $("<td>").text(selectedItem.type).appendTo(row);
                            $("<td>").text(selectedItem.price).appendTo(row);
                            $("<td>").text(itemQuantityNumInput.value).appendTo(row);
                            $("<td>").text(selectedItem.price * itemQuantityNumInput.value).appendTo(row);

                            row.appendTo("#table-body");
                        }
                    }
                       
                  
                   
                }
            }
        });
    });

   