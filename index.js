
/*
* Sección de variables:
* Por convención, las variables que hacen referencia a elementos del DOM
* empiezan con el símbolo $, esto es para diferenciarlas más fácilmente
*/
const $button_encrypt = document.getElementById("encrypt_button");
const $button_decrypt = document.getElementById("decrypt_button");
const $button_copy = document.getElementById("copy_button");
const $input_text = document.getElementById("input");
const $answer_panel = document.getElementById("answer_panel");
const $error_panel = document.getElementById("error_panel");
const $answer_text = document.getElementById("answer_text");
const $error_text = document.getElementById("errot_text");
const $button_switch = document.getElementById("switch_button");

const dictionary = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat"
};


/*
* Sección de funciones:
* Las funciones se declaran con la palabra reservada function, seguida del nombre
* de la función y entre paréntesis los parámetros que recibe, si no recibe
* parámetros, se dejan los paréntesis vacíos.
*/
function show(bool) {
  if (bool) {
    $answer_panel.style.display = "flex";
    $error_panel.style.display = "none";
    $button_switch.style.display = "block";
  } else {
    $answer_panel.style.display = "none";
    $error_panel.style.display = "flex";
    $button_switch.style.display = "none";
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
function showError(text) {
  $error_text.innerHTML = text;
  $error_text.style.display = "block";
}
function hideError() {
  $error_text.style.display = "none";
}

/*
* Sección de eventos:
* Los eventos se declaran con la función addEventListener, que recibe como
* parámetros el nombre del evento y la función que se ejecutará cuando se
* dispare el evento.
*/
$button_encrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    showError("No ingresaste ningún texto");
    show(false);
  } else {
    hideError();
    var text = $input_text.value;
    var answer = encrypt(text);
    $answer_text.innerHTML = answer;
    show(true);
  }
});
$button_decrypt.addEventListener("click", function () {
  if ($input_text.value == "") {
    show(false);
    showError("No ingresaste ningún texto");
  } else {
    hideError();
    var text = $input_text.value;
    var answer = decrypt(text);
    $answer_text.innerHTML = answer;
    show(true);
  }
});
$button_copy.addEventListener("click", function () {
  var text = $answer_text.innerHTML;
  navigator.clipboard.writeText(text);
});
$button_switch.addEventListener("click", function () {
  var text = $input_text.value;
  $input_text.value = $answer_text.innerHTML;
  $answer_text.innerHTML = text.toLowerCase();
});