import { useState } from "react"
import { alertaRedireccion } from "../helpers/alertas"
import Encabezado from "../components/Encabezado"
import PiePagina from "../components/PiePagina"
import imagenFondo from "../assets/images/marca.png"

function Acceso() {
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [cargando, setCargando] = useState(false)

  const iniciarSesion = (e) => {
    e.preventDefault()

    if (!nombreUsuario || !contrasena) {
      alertaRedireccion("Campos vacíos", "Completa usuario y contraseña", "/acceso", "warning")
      return
    }

    setCargando(true)

    const usuariosLocales = [
      {
        id: 1,
        nombre: "Mariana Suárez",
        username: "mariana",
        password: "Admin2026!",
        role: "admin"
      },
      {
        id: 2,
        nombre: "Viadis Correa",
        username: "viadis",
        password: "Admin2026!",
        role: "admin"
      },
      {
        id: 3,
        nombre: "Estudiante Demo",
        username: "estudiante",
        password: "Estudiante2026!",
        role: "estudiante"
      }
    ]

    const usuarioEncontrado = usuariosLocales.find(
      (usuario) =>
        usuario.username === nombreUsuario &&
        usuario.password === contrasena
    )

    if (usuarioEncontrado) {
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado))

      alertaRedireccion(
        "Bienvenido",
        `Hola ${usuarioEncontrado.nombre}`,
        "/panel",
        "success"
      )

      setCargando(false)
      return
    }

    setCargando(false)
    alertaRedireccion("Error", "Usuario o contraseña incorrectos", "/acceso", "error")
  }

  return (
    <div className="app">
      <Encabezado />
      <main className="form-login-container" style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        flex: 1
      }}>
        <div className="login-card">
          <h2 className="login-titulo">Iniciar sesión</h2>

          <form className="form" onSubmit={iniciarSesion}>
            <input
              type="text"
              placeholder="Usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button type="submit" className="login-btn" disabled={cargando}>
              {cargando ? "Verificando..." : "Acceder"}
            </button>
          </form>
        </div>
      </main>
      <PiePagina />
    </div>
  )
}

export default Acceso