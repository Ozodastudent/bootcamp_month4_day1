var modeBtn = document.querySelector(".mode");
var bodyBox = document.querySelector(".body-box");

modeBtn.addEventListener("click", function () {
  bodyBox.classList.toggle("mode-opener");
});
