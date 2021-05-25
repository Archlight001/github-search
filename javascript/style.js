var inputSearch =  getComputedStyle(document.getElementsByClassName("input__search")[0]);

var input__submit = document.getElementsByClassName("input__submit");
function changeColor(){
    if(inputSearch.width>"100px"){
        input__submit[0].style.display = "none"

    }
}

var statusWidth = getComputedStyle(document.getElementsByClassName("status")[0]).width
var statusInfo = document.getElementsByClassName("status__info")[0];

function showSpan(status){
    if(status === true){
        statusInfo.style.display = "block"
    }else{
        statusInfo.style.display = "none"
    }
}