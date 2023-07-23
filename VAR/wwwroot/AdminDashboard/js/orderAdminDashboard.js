
//var pageNumber;
//// Attach a click event listener to all delete buttons
//const tablePageNumButtons = document.querySelectorAll('.page-link');
//var tablePageNumLis = document.querySelectorAll('.page-item');

//tablePageNumButtons.forEach(button => {
//    button.addEventListener('click', () => {
//        // Get the ID of the item to be deleted from the data-rowid attribute
//        tablePageNumLis.forEach(function (elementLi) {
//            elementLi.classList.add('active');

//        });

//        pageNumber = button.innerHTML;
//        console.log(pageNumber);
//        //window.location.href = `http://localhost:32719/Order/getOrdersPagination/?page=${pageNumber}&size=10`;

//    });
//});

var pageNumber;

// getting the pervious li
var previousLi = document.getElementById('pervious-li');
var nextLi = document.getElementById('next-li');
// getting the  whole pagination-ul 
var paginationUl = document.getElementById('pagination-ul');

var beforeLastLi = paginationUl.lastElementChild.previousElementSibling;
var pageLinks = document.querySelectorAll('.page-item a');

var currentActiveLiFromLocalStorage = localStorage.getItem("active List");
// get the first li with page number 1 
if (currentActiveLiFromLocalStorage == null || currentActiveLiFromLocalStorage == 1) {
    var currentActiveLi = pageLinks[1];
    currentActiveLi.parentElement.classList.add('active');
    console.log(currentActiveLi);

} else {
    // check if the currentActiveLiFromLocalStorage = the last number in page links and the li after it , its next li
    if (currentActiveLiFromLocalStorage == beforeLastLi.innerText) nextLi.classList.add('disabled');
    var currentActiveLi = pageLinks[parseInt(currentActiveLiFromLocalStorage)];
    currentActiveLi.parentElement.classList.add('active');
    previousLi.classList.remove('disabled');
    console.log(currentActiveLi);

}
//var currentActiveLi = currentActiveLiFromLocalStorage == null ? pageLinks[1] : pageLinks[parseInt(currentActiveLiFromLocalStorage)];

// in initailization page add active class to parent of first li with page number 1 



pageLinks.forEach(function (pageLink) {
    pageLink.addEventListener('click',  function (event) {
        event.preventDefault();
        // to perven 
        var fromNextOrPervious;
        pageNumber = pageLink.innerHTML;
        console.log(pageLink);
        var parentLi = this.parentNode;
        var activeLi = document.querySelector('.page-item.active');
   
        if (parentLi === nextLi) {
            console.log(activeLi.nextElementSibling.firstElementChild);
            var nextElement = activeLi.nextElementSibling.firstElementChild;
            fromNextOrPervious = 1;
            nextElement.click();
            

        }
        else if (parentLi === previousLi) {
            console.log(activeLi.previousElementSibling.firstElementChild);


            activeLi.previousElementSibling.firstElementChild.click();
            fromNextOrPervious = 1;

        }
        if (activeLi)
        {
            console.log("active", activeLi);
                //nextLi.classList.toggle('disabled', parentLi === beforeLastLi);
                //previousLi.classList.toggle('disabled', parentLi.textContent === '1');
                //activeLi.classList.remove('active');
            
            if (parentLi.childNodes[0].innerHTML != 1)
            {
                if (parentLi === beforeLastLi)
                {
                    nextLi.classList.add('disabled');
                    console.log("beforelast", parentLi);
                }
                else if (fromNext != 1)
                {
                    nextLi.classList.remove('disabled');
                    console.log("NOT beforelast", parentLi);


                }
                console.log("prev");
                previousLi.classList.remove('disabled');
                console.log(previousLi);
            }
            else
            {
                nextLi.classList.remove('disabled');
                previousLi.classList.add('disabled');

            }
            activeLi.classList.remove('active');
        }
        if (parentLi != nextLi && parentLi != previousLi) {
            console.log(parentLi);
            console.log("page link text",pageLink.innerText);

            parentLi.classList.add('active');
            // save the current active li to retrive the active page link when the page is reloaded
            localStorage.setItem("active List", `${pageLink.innerText}`);
        }

        window.location.href = `http://localhost:32719/Order/getOrdersPagination/?page=${pageNumber}&size=10`;

    });
});
