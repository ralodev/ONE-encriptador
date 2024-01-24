//Variables
$button_encrypt = document.getElementById("encrypt");
$button_decrypt = document.getElementById("decrypt");
$button_copy = document.getElementById("copy");
$input_text = document.getElementById("input");
$answer_panel = document.getElementById("answer");
$error_panel = document.getElementById("error");
$answer = document.getElementById("answer_text");
$error_text = document.getElementById("errot_text");
$switch_button = document.getElementById("switch_button");

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
    $switch_button.style.display = "block";
  } else {
    $answer_panel.style.display = "none";
    $error_panel.style.display = "flex";
    $switch_button.style.display = "none";
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
  var text = text.replace(/ufat/g, "u");
  var text = text.replace(/ober/g, "o");
  var text = text.replace(/ai/g, "a");
  var text = text.replace(/imes/g, "i");
  var text = text.replace(/enter/g, "e");
  return text;
}

function isAlreadyEncrypted(text) {
  var text = text.toLowerCase();
  let sensibility = 3;
  for (var key in dictionary) {
    if (text.includes(dictionary[key])) {
      sensibility--;
    }
  }
  if (sensibility <= 0) {
    return true;
  } else {
    return false;
  }
}

function showError(text) {
  $error_text.innerHTML = text;
  $error_text.style.display = "block";
}

function hideError() {
  $error_text.style.display = "none";
}

//Events
$button_encrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    showError("No ingresaste ningún texto");
    show(false);
  } else {
    // if (isAlreadyEncrypted($input_text.value)) {
    //   showError("El texto ingresado ya está encriptado");
    //   return;
    // }
    hideError();
    var text = $input_text.value;
    var answer = encrypt(text);
    $answer.innerHTML = answer;
    show(true);
  }
});
$button_decrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    show(false);
    showError("No ingresaste ningún texto");
  } else {
    // if (!isAlreadyEncrypted($input_text.value)) {
    //   showError("El texto ingresado no está encriptado");
    //   return;
    // }
    hideError();
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
$switch_button.addEventListener("click", function () {
  var text = $input_text.value;
  $input_text.value = $answer.innerHTML;
  $answer.innerHTML = text.toLowerCase();
});