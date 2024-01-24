
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
const $button_switch = document.getElementById("switch_button");
const $delete_button = document.getElementById("delete_button");
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
  // Mapear cada letra según el diccionario (si no está en el diccionario, se deja igual) *(se puede cambiar por un bucle for)
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

/*
* Sección de eventos:
* Los eventos se declaran con la función addEventListener, que recibe como
* parámetros el nombre del evento y la función que se ejecutará cuando se
* dispare el evento.
*/

$button_encrypt.addEventListener("click", function () {
  // Si el campo de texto está vacío: mostrar error y ocultar el panel de respuesta
  if ($input_text.value == "") {
    showAlert("Debes ingresar texto", "error");
    show(false);
    return;
  }
  let encryptedText = encrypt($input_text.value);
  //Si el texto encriptado es el mismo que ya se ha encriptado, mostrar advertencia
  if ($answer_text.innerHTML == encryptedText) {
    showAlert("El resultado es el mismo", "warning");
    return;
  }
  // Si no está vacío: ocultar el panel de error, encriptar el texto y mostrar el panel de respuesta
  $answer_text.innerHTML = encryptedText
  show(true);
  showAlert("Se ha encriptado el texto", "success");
});

$button_decrypt.addEventListener("click", function () {
  // Si el campo de texto está vacío: mostrar error y ocultar el panel de respuesta
  if ($input_text.value == "") {
    show(false);
    showAlert("Debes ingresar texto", "error");
    return;
  }
  let decryptedText = decrypt($input_text.value);
  //Si el texto desencriptado es el mismo que ya se ha desencriptado, mostrar advertencia
  if ($answer_text.innerHTML == decryptedText) {
    showAlert("El resultado es el mismo", "warning");
    return;
  }
  // Si no está vacío: ocultar el panel de error, desencriptar el texto y mostrar el panel de respuesta
  $answer_text.innerHTML = decryptedText
  show(true);
  showAlert("Se ha desencriptado el texto", "success");
});

$button_copy.addEventListener("click", function () {
  // Si el panel de respuesta está vacío, mostrar error
  if ($answer_text.innerHTML.trim() == "") {
    showAlert("No hay texto para copiar", "error");
    return;
  }
  // Copiar el texto de la respuesta al portapapeles
  navigator.clipboard.writeText($answer_text.innerHTML);
  showAlert("¡Texto copiado!", "success");
});

$button_switch.addEventListener("click", function () {
  if ($answer_text.innerHTML == "") {
    // Si el panel de respuesta está vacío, mostrar error
    showAlert("No hay texto para mover", "error");
    return;
  }
  // Enviamos el texto de la respuesta al campo de texto
  $input_text.value = $answer_text.innerHTML;
  $answer_text.innerHTML = "";
  showAlert("El texto ha sido movido", "info");
});

$delete_button.addEventListener("click", function () {
  // Limpiar el campo de texto
  $input_text.value = "";
  // Limpiar el panel de respuesta
  $answer_text.innerHTML = "";
  // Ocultar el panel de respuesta y el botón de cambio
  show(false);
  showAlert("Se ha borrado todo!", "warning");
});

$input_text.addEventListener("input", function () {
  // Definir dentro de /[]/ los símbolos que no se permiten
  let pattern = /[<>áéíóúÁÉÍÓÚãõÃÕäëïöüÄËÏÖÜ]/;
  // Verificar si el texto del campo de texto coincide con el patrón
  if (pattern.test($input_text.value)) {
    // Si coincide, mostrar error y eliminar el símbolo
    showAlert("No se permite ese caracter", "error");
    $input_text.value = $input_text.value.replace(pattern, "");
  }
});

//---------------- FIN DEL CÓDIGO PRINCIPAL ----------------

// Alertas de SweetAlert2 (ver: https://sweetalert2.github.io/)
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  customClass: {
    popup: "!bg-[#fafbff] hover:opacity-50",
    timerProgressBar: "!bg-[#0a3871]",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

// Función para mostrar alertas
function showAlert(title, icon) {
  Toast.fire({
    icon: icon,
    title: title
  });
}