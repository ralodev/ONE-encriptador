//Variables
$button_encrypt = document.getElementById("encrypt");
$button_decrypt = document.getElementById("decrypt");
$button_copy = document.getElementById("copy");
$answer_panel = document.getElementById("answer");
$error_panel = document.getElementById("error");
$answer = document.getElementById("answer_text");

//Functions
var showing = false;
function toDo() {
  if (showing == false) {
    $answer_panel.style.display = "flex";
    $error_panel.style.display = "none";
    showing = true;
  } else {
    $answer_panel.style.display = "none";
    $error_panel.style.display = "flex";
    showing = false;
  }
}

//Events
$button_encrypt.addEventListener("click", toDo);
$button_decrypt.addEventListener("click", toDo);
$button_copy.addEventListener("click", toDo);