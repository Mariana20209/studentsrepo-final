import Swal from "sweetalert2"

export function alertaRedireccion(titulo, mensaje, url, icono) {
  let intervalo
  Swal.fire({
    title: titulo,
    html: mensaje + "<b></b>",
    timer: 2000,
    timerProgressBar: true,
    icon: icono,
    didOpen: () => {
      Swal.showLoading()
      const temporizador = Swal.getPopup().querySelector("b")
      intervalo = setInterval(() => {
        temporizador.textContent = `${Swal.getTimerLeft()}`
      }, 100)
    },
    willClose: () => {
      clearInterval(intervalo)
      window.location.href = url
    }
  })
}

export function alertaExito(mensaje) {
  return Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: mensaje,
    confirmButtonColor: "#2a66f5",
    timer: 1500,
    showConfirmButton: false
  })
}

export function alertaError(mensaje) {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: "#2a66f5"
  })
}

export function alertaConfirmacion(mensaje) {
  return Swal.fire({
    icon: "warning",
    title: "¿Estás segura?",
    text: mensaje,
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#2a66f5",
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar"
  })
}