
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

        
    });
});


const deleteBtn = document.getElementById("confirm-delete-admin");

deleteBtn.addEventListener("click", function () {
    $.ajax({
        url: `/Admin/Delete/${id}`,
        type:'POST',
        success: function (result) {
            // To close modal after confirm delete
            const canceltBtn = document.getElementById("cancel");
            canceltBtn.click();
            console.log(result);
            window.location.href = "http://localhost:32719/Admin/getAlladmins";

        }
    });
});
