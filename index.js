
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
// Diccionario de palabras
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
function show(booleano) {
  // Si booleano es verdadero (true), mostrar el panel de respuesta y el botón de cambio, y ocultar el panel de error
  if (booleano) {
    $answer_panel.style.display = "flex";
    $button_switch.style.display = "block";
    $error_panel.style.display = "none";
  } else {
    // Si booleano es falso (false), ocultar el panel de respuesta y el botón de cambio, y mostrar el panel de error
    $answer_panel.style.display = "none";
    $button_switch.style.display = "none";
    $error_panel.style.display = "flex";
  }
}

function encrypt(text) {
  // Convertir a minúsculas
  text = text.toLowerCase();
  // Convertir a un array de caracteres
  var characters = text.split("");
  // Mapear cada letra según el diccionario (si no está en el diccionario, se deja igual)
  var encryptedText = characters.map(function (letter) {
    return dictionary[letter] || letter;
  });
  // Unir de nuevo el array en una cadena
  encryptedText = encryptedText.join("");
  return encryptedText;
}

function decrypt(text) {
  // Convertir a minúsculas
  var decryptedText = text.toLowerCase();
  // Reemplazar cada palabra según el diccionario
  decryptedText = decryptedText.replace(/ufat/g, "u");
  decryptedText = decryptedText.replace(/ober/g, "o");
  decryptedText = decryptedText.replace(/ai/g, "a");
  decryptedText = decryptedText.replace(/imes/g, "i");
  decryptedText = decryptedText.replace(/enter/g, "e");

  return decryptedText;
}

function showError(text) {
  // Escribir el texto de error y mostrar el elemento
  $error_text.innerHTML = text;
  $error_text.style.display = "block";
}
function hideError() {
  // Ocultar el elemento de error
  $error_text.style.display = "none";
}

/*
* Sección de eventos:
* Los eventos se declaran con la función addEventListener, que recibe como
* parámetros el nombre del evento y la función que se ejecutará cuando se
* dispare el evento.
*/

$button_encrypt.addEventListener("click", function () {
  // Si el campo de texto está vacío: mostrar error y ocultar el panel de respuesta
  if ($input_text.value == "") {
    showError("No ingresaste ningún texto");
    show(false);
  } else {
    // Si no está vacío: ocultar el panel de error, encriptar el texto y mostrar el panel de respuesta
    hideError();
    $answer_text.innerHTML = encrypt($input_text.value);
    show(true);
  }
});
$button_decrypt.addEventListener("click", function () {
  // Si el campo de texto está vacío: mostrar error y ocultar el panel de respuesta
  if ($input_text.value == "") {
    show(false);
    showError("No ingresaste ningún texto");
  } else {
    // Si no está vacío: ocultar el panel de error, desencriptar el texto y mostrar el panel de respuesta
    hideError();
    $answer_text.innerHTML = decrypt($input_text.value);
    show(true);
  }
});
$button_copy.addEventListener("click", function () {
  // Copiar el texto de la respuesta al portapapeles
  navigator.clipboard.writeText($answer_text.innerHTML);
});
$button_switch.addEventListener("click", function () {
  var backup = $input_text.value;
  // Intercambiar el texto de la respuesta con el del campo de texto
  $input_text.value = $answer_text.innerHTML;
  $answer_text.innerHTML = backup.toLowerCase();
});