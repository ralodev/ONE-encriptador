//Variables
$button_encrypt = document.getElementById("encrypt");
$button_decrypt = document.getElementById("decrypt");
$button_copy = document.getElementById("copy");
$input_text = document.getElementById("input");
$answer_panel = document.getElementById("answer");
$error_panel = document.getElementById("error");
$answer = document.getElementById("answer_text");

const dictionary = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat"
};



//Functions
function show(bool) {
  if (bool) {
    $answer_panel.style.display = "flex";
    $error_panel.style.display = "none";
  } else {
    $answer_panel.style.display = "none";
    $error_panel.style.display = "flex";
  }
}

function encrypt(text) {
  var text = text.toLowerCase();
  var text = text.split("");
  var text = text.map(function (letter) {
    if (dictionary[letter]) {
      return dictionary[letter];
    } else {
      return letter;
    }
  });
  var text = text.join("");
  return text;
}

function decrypt(text) {
  var text = text.toLowerCase();
  var text = text.replace(/enter/g, "e");
  var text = text.replace(/imes/g, "i");
  var text = text.replace(/ai/g, "a");
  var text = text.replace(/ober/g, "o");
  var text = text.replace(/ufat/g, "u");
  return text;
}

//Events
$button_encrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    show(false);
  } else {
    var text = $input_text.value;
    var answer = encrypt(text);
    $answer.innerHTML = answer;
    show(true);
  }
});
$button_decrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    show(false);
  } else {
    var text = $input_text.value;
    var answer = decrypt(text);
    $answer.innerHTML = answer;
    show(true);
  }
});
$button_copy.addEventListener("click", function () {
  var text = $answer.innerHTML;
  navigator.clipboard.writeText(text);
});