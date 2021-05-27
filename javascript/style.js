var inputSearch = getComputedStyle(
  document.getElementsByClassName("input__search")[0]
);

var input__submit = document.getElementsByClassName("input__submit");
function changeColor(change) {
  if(change){
    if (inputSearch.width > "100px") {
      input__submit[0].style.display = "none";
    }
  }else{
    input__submit[0].style.display = "block";
  }
  
}

var statusWidth = getComputedStyle(
  document.getElementsByClassName("status")[0]
).width;
var statusInfo = document.getElementsByClassName("status__info")[0];

function showSpan(status) {
  if (status === true) {
    statusInfo.style.display = "block";
  } else {
    statusInfo.style.display = "none";
  }
}

var expandMiniNavbar = false;
function expand__navbar() {
  var nav__mini = document.getElementsByClassName("navbar__mini")[0];

  if (expandMiniNavbar === false) {
    nav__mini.style.height = "fit-content";
    expandMiniNavbar = true;
  } else {
    nav__mini.style.height = "1.5rem";
    expandMiniNavbar = false;
  }
}


function WindowSize() {
  console.log("window resized");
  //Change location of status depending on scrren size
  var statusIcon = document.getElementsByClassName("status")[0];

  if (window.screen.width <= 760) {
    statusIcon.style.marginLeft = "1%";
    statusIcon.style.marginTop = "3%";
  } else if (window.screen.width > 760 && window.screen.width <= 870) {
    statusIcon.style.marginLeft = "27.5%";
    statusIcon.style.marginTop = "21.5%";
  } else if (window.screen.width > 760 && window.screen.width <= 940) {
    statusIcon.style.marginLeft = "25%";
    statusIcon.style.marginTop = "19%";
  } else if (window.screen.width > 760 && window.screen.width <= 1000) {
    statusIcon.style.marginLeft = "24.3%";
    statusIcon.style.marginTop = "16%";
  } else if (window.screen.width > 760 && window.screen.width <= 1060) {
    statusIcon.style.marginLeft = "22%";
    statusIcon.style.marginTop = "16%";
  } else if (window.screen.width > 760 && window.screen.width <= 1110) {
    statusIcon.style.marginLeft = "21%";
    statusIcon.style.marginTop = "16%";
  }else{
    statusIcon.style.marginLeft = "17%";
    statusIcon.style.marginTop = "14%";
  }

  //Change Pull request text to pulls
  var pullRequestLink = document.getElementsByClassName("pull__requests")[0];
  if (window.screen.width <= "1150" && window.screen.width > "780") {
    pullRequestLink.innerHTML = "Pulls";
  } else {
      pullRequestLink.innerHTML = "Pull requests";
  }
}

window.addEventListener("resize", WindowSize);

WindowSize();
