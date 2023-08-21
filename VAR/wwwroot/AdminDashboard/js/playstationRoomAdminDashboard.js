
var id;
// Attach a click event listener to all delete buttons
const deleteButtons = document.querySelectorAll('.btn-danger[data-bs-toggle="modal"]');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the ID of the item to be deleted from the data-rowid attribute
        const itemId = button.getAttribute('data-rowid');
        console.log(itemId);
        id = itemId;
        console.log(id);

        // Set the value of the delete-id input field to the item ID
        //const deleteId = document.querySelector('#delete-id');
        //deleteId.value = itemId;

        // Show the confirmation modal
        //const modal = new bootstrap.Modal(document.querySelector('#exampleModal'));
        //modal.show();
    });
});


const deleteBtn = document.getElementById("confirm-delete-item");

deleteBtn.addEventListener("click", function () {
    $.ajax({
        url: `/PlaystationRoom/Delete/${id}`,
        type:'POST',
        success: function (result) {
            // To close modal after confirm delete
            const canceltBtn = document.getElementById("cancel");
            canceltBtn.click();
            console.log(result);
            window.location.href = "http://localhost:32719/playstationroom/getAllRoomsforadmin";

        }
    });
});

//var addBtn = document.getElementById("confirm-add-playstation-room");

//addBtn.addEventListener("click", function () {
//    var playstationRoomToAdd = {

//        StartTime: startTime ? `${startTime.toLocaleDateString('en-US')} ${startTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
//        EndTime: stopTime ? `${stopTime.toLocaleDateString('en-US')} ${stopTime.toLocaleTimeString('en-US').substring(0, 10)}` : null,
//        TotalPrice: orderTotalPriceValueAfterDiscount,
//        Discount: parseFloat(discount.value),
//        adminID: adminId,
//        playstationID: parseInt(playstationRoomId)
//    };
//    try {
//        const response = await fetch("/Order/AddOrderDB", {

//            method: "POST",
//            headers: {
//                "Content-type": "application/json; charset=UTF-8"
//            },

//            body: JSON.stringify(orderToAdd)
//        });

//        if (response.ok) {
//            result = await response.json();
//            window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
//            console.log(result);
//        } else {
//            throw new Error(`HTTP Error: ${response.status}`);
//        }
//    }
//    catch (error) {
//        console.error(error);
//    }
//});

