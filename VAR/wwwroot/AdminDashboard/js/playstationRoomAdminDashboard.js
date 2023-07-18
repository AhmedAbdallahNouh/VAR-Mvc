
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
