
const loginBtn = document.getElementById('login');

const Email = document.getElementById('Email');
const loginFrom = document.getElementById('login-form');
const Password = document.getElementById('Password');
loginBtn.disabled = true;

function checkValid() {
    if (loginFrom.checkValidity() !== false && Password.value !== "" && Email.value !== "") {
        loginBtn.disabled = false;
        console.log("Valid");
    }
    else {
        loginBtn.disabled = true;
        console.log("Not Valid");

    }
}

//Email.addEventListener("input", () => {
//    console.log(Email.getAttribute("class"));
//    console.log(`Password : ${Password.checkValidity()}`);
//    console.log(`Password value : ${Password.value}`);

//    console.log(loginFrom.checkValidity());
//    const index = Email.getAttribute("class").split(" ").indexOf("input-validation-error");
//    if (loginFrom.checkValidity() !== false & Password.value !== "") {
//        loginBtn.disabled = false;
//        console.log("notvalid");
//        console.log(Password.value === "");
//    }
//    else {
//        loginBtn.disabled = true;
//        console.log("valid");

//    }
//});





$("button").click(function () {
    $.ajax({
        url: "/Account/Spinner",
        success: function (result) {

            $("#spinner").html(result);
        }
    });
});