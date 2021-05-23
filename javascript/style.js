var inputSearch =  getComputedStyle(document.getElementsByClassName("input__search")[0]);
console.log(inputSearch.width)

var input__submit = document.getElementsByClassName("input__submit");
function changeColor(){
    if(inputSearch.width>"100px"){
        input__submit[0].style.display = "none"

    }
}