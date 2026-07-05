function validarCorreo(correo) {
  if (typeof correo !== "string") return false;

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return patronCorreo.test(correo.trim());
}

function soloLetras(texto) {
  if (typeof texto !== "string") return false;

  const patronLetras = /^[A-Za-z\u00C0-\u017F\s]+$/;
  return patronLetras.test(texto.trim());
}

function validarLongitud(numero, maxLongitud) {
  const texto = String(numero).trim();
  return texto.length > 0 && texto.length <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
  const partes = String(fechaNacimiento).split("-");
  const nacimiento =
    partes.length === 3
      ? new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]))
      : new Date(fechaNacimiento);

  if (Number.isNaN(nacimiento.getTime())) return 0;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();
  const mesNacimiento = nacimiento.getMonth();
  const diaNacimiento = nacimiento.getDate();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }

  return Math.max(edad, 0);
}

function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}

function validarPassword(password) {
  if (typeof password !== "string") return false;

  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /\d/.test(password);
  const tieneEspecial = /[^A-Za-z0-9]/.test(password);
  const longitudValida = password.length >= 8;

  return (
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero &&
    tieneEspecial &&
    longitudValida
  );
}

function formatearNombre(texto) {
  if (typeof texto !== "string") return "";

  return texto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function limpiarTelefono(telefono) {
  if (telefono === null || telefono === undefined) return "";

  return String(telefono).replace(/\D/g, "");
}

window.validarCorreo = validarCorreo;
window.soloLetras = soloLetras;
window.validarLongitud = validarLongitud;
window.calcularEdad = calcularEdad;
window.esMayorDeEdad = esMayorDeEdad;
window.validarPassword = validarPassword;
window.formatearNombre = formatearNombre;
window.limpiarTelefono = limpiarTelefono;