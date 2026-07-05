var form = document.getElementById("registroForm");
var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var telefono = document.getElementById("telefono");
var fechaNacimiento = document.getElementById("fechaNacimiento");
var password = document.getElementById("password");
var resultado = document.getElementById("resultado");
var passwordBar = document.getElementById("passwordBar");
var modal = document.getElementById("modal");
var modalTexto = document.getElementById("modalTexto");
var cerrarModal = document.getElementById("cerrarModal");

function mensaje(id, texto, tipo) {
  var etiqueta = document.getElementById(id);
  etiqueta.textContent = texto;
  etiqueta.className = tipo;
}

function pintarInput(input, correcto) {
  input.className = correcto ? "correcto" : "incorrecto";
}

function telefonoBonito(numero) {
  if (numero.length !== 10) return numero;
  return "(" + numero.slice(0, 3) + ") " + numero.slice(3, 6) + "-" + numero.slice(6);
}

function validarNombre() {
  if (!soloLetras(nombre.value)) {
    mensaje("nombreMensaje", "Solo se permiten letras y espacios.", "error");
    pintarInput(nombre, false);
    return false;
  }

  var nombreFinal = formatearNombre(nombre.value);
  mensaje("nombreMensaje", "formatearNombre: " + nombreFinal, "ok");
  pintarInput(nombre, true);
  return true;
}

function validarCorreoCampo() {
  var correcto = validarCorreo(correo.value);
  var texto = correcto ? "Correo valido." : "El correo no es valido.";

  mensaje("correoMensaje", texto, correcto ? "ok" : "error");
  pintarInput(correo, correcto);
  return correcto;
}

function validarTelefonoCampo() {
  var limpio = limpiarTelefono(telefono.value);
  var correcto = limpio.length === 10;

  if (correcto) {
    mensaje("telefonoMensaje", "limpiarTelefono: " + limpio + " | " + telefonoBonito(limpio), "ok");
  } else {
    mensaje("telefonoMensaje", "Faltan numeros. limpiarTelefono: " + (limpio || "sin numeros"), "error");
  }

  pintarInput(telefono, correcto);
  return correcto;
}

function validarFecha() {
  var correcto = fechaNacimiento.value !== "" && esMayorDeEdad(fechaNacimiento.value);
  var edad = calcularEdad(fechaNacimiento.value);
  var texto = correcto ? "Mayor de edad (" + edad + " anos)." : "Debes ser mayor de edad.";

  mensaje("fechaMensaje", texto, correcto ? "ok" : "error");
  pintarInput(fechaNacimiento, correcto);
  return correcto;
}

function revisarPassword() {
  var texto = password.value;
  var puntos = 0;
  var faltan = [];

  if (texto.length >= 8) puntos++; else faltan.push("8 caracteres");
  if (/[A-Z]/.test(texto)) puntos++; else faltan.push("mayuscula");
  if (/[a-z]/.test(texto)) puntos++; else faltan.push("minuscula");
  if (/[0-9]/.test(texto)) puntos++; else faltan.push("numero");
  if (/[^A-Za-z0-9]/.test(texto)) puntos++; else faltan.push("caracter especial");

  passwordBar.style.width = (puntos * 20) + "%";
  passwordBar.style.backgroundColor = puntos < 3 ? "#c0392b" : puntos < 5 ? "#d68910" : "#16803c";

  if (validarPassword(texto)) {
    mensaje("passwordMensaje", "Contrasena segura.", "ok");
    pintarInput(password, true);
    return true;
  }

  mensaje("passwordMensaje", "Falta: " + faltan.join(", ") + ".", "error");
  pintarInput(password, false);
  return false;
}

nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreoCampo);
telefono.addEventListener("input", validarTelefonoCampo);
fechaNacimiento.addEventListener("change", validarFecha);
password.addEventListener("input", revisarPassword);

nombre.addEventListener("blur", function () {
  if (soloLetras(nombre.value)) {
    nombre.value = formatearNombre(nombre.value);
  }
});

telefono.addEventListener("blur", function () {
  var limpio = limpiarTelefono(telefono.value);
  if (limpio.length === 10) {
    telefono.value = telefonoBonito(limpio);
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var nombreOk = validarNombre();
  var correoOk = validarCorreoCampo();
  var telefonoOk = validarTelefonoCampo();
  var fechaOk = validarFecha();
  var passwordOk = revisarPassword();
  var todoCorrecto = nombreOk && correoOk && telefonoOk && fechaOk && passwordOk;

  if (!todoCorrecto) {
    resultado.textContent = "Hay datos incorrectos. Revisa los mensajes en rojo.";
    resultado.className = "resultado-error";
    return;
  }

  var nombreFinal = formatearNombre(nombre.value);
  var telefonoLimpio = limpiarTelefono(telefono.value);
  var edad = calcularEdad(fechaNacimiento.value);

  nombre.value = nombreFinal;
  telefono.value = telefonoBonito(telefonoLimpio);
  resultado.textContent = "Registro exitoso. Nombre: " + nombreFinal + ". Telefono limpio: " + telefonoLimpio + ".";
  resultado.className = "resultado-ok";
  modalTexto.textContent = nombreFinal + ", tu edad calculada es " + edad + " anos.";
  modal.style.display = "flex";
});

cerrarModal.addEventListener("click", function () {
  modal.style.display = "none";
});