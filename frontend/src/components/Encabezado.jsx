import { Link, useLocation } from "react-router-dom"
import logo from "../assets/images/logo.png"

const Encabezado = () => {
  const ubicacion = useLocation()
  const usuarioLogueado = localStorage.getItem("usuario")

  const cerrarSesion = () => {
    localStorage.removeItem("usuario")
    window.location.href = "/"
  }

  const estiloEnlace = (ruta) => ({
    textDecoration: "none",
    color: ubicacion.pathname === ruta ? "#2a66f5" : "#444",
    fontWeight: ubicacion.pathname === ruta ? "700" : "500",
    fontSize: "15px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: ubicacion.pathname === ruta ? "#eff6ff" : "transparent",
    transition: "all 0.2s"
  })

  const estiloBoton = {
    textDecoration: "none",
    color: "#2a66f5",
    fontWeight: "600",
    fontSize: "14px",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "transparent",
    border: "2px solid #2a66f5",
    transition: "all 0.2s",
    cursor: "pointer"
  }

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 48px",
      background: "white",
      borderBottom: "1px solid #e2e8f0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to="/">
        <img src={logo} alt="logo" style={{ height: "60px" }} />
      </Link>

      <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link to="/" style={estiloEnlace("/")}>
          Inicio
        </Link>

        <Link to="/panel/proyectos" style={estiloEnlace("/panel/proyectos")}>
          Proyectos
        </Link>
      </nav>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {usuarioLogueado ? (
          <button onClick={cerrarSesion} style={estiloBoton}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/acceso" style={estiloBoton}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  )
}

export default Encabezado