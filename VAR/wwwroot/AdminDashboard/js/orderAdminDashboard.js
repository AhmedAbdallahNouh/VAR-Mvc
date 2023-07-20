
var pageNumber;
// Attach a click event listener to all delete buttons
const tablePageNumButtons = document.querySelectorAll('.page-link');
tablePageNumButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the ID of the item to be deleted from the data-rowid attribute

        pageNumber = button.innerHTML;
        console.log(pageNumber);
        window.location.href = `http://localhost:32719/Order/getOrdersPagination/?page=${pageNumber}&size=10`;
        //$.ajax({
        //    url: `/Order/getOrdersPagination/?page=${pageNumber}&size=10`,
        //    type: 'POST',
        //    success: function (result) {
                
        //        //console.log(result);

        //    }
        //});
    });
});

