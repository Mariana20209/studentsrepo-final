import { Link, useLocation } from "react-router-dom"
import { alertaConfirmacion } from "../helpers/alertas"
import logo from "../assets/images/logo.png"

const BarraLateral = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const ubicacion = useLocation()

  const cerrarSesion = async () => {
    const resultado = await alertaConfirmacion("¿Deseas cerrar tu sesión?")
    if (resultado.isConfirmed) {
      localStorage.removeItem("usuario")
      window.location.href = "/acceso"
    }
  }

  const estiloEnlace = (ruta) => ({
    display: 'block',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    backgroundColor: ubicacion.pathname.includes(ruta) ? '#2a66f5' : 'transparent',
    color: ubicacion.pathname.includes(ruta) ? 'white' : '#444',
    transition: 'all 0.2s'
  })

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: '#f8faff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img src={logo} alt="logo" style={{ width: '120px' }} />
      </div>

      <div style={{
        background: '#2a66f5',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          width: '48px', height: '48px',
          borderRadius: '50%',
          background: 'white',
          color: '#2a66f5',
          fontWeight: 'bold',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto'
        }}>
          {usuario?.fullName?.split(" ").map((i) => i[0]).join("") || "U"}
        </div>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{usuario?.fullName || "Usuario"}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.85 }}>{usuario?.role || ""}</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Link to="/panel/proyectos" style={estiloEnlace('proyectos')}>
          📁 Proyectos
        </Link>
        <Link to="/panel/estudiantes" style={estiloEnlace('estudiantes')}>
          👥 Estudiantes
        </Link>
        {usuario?.role === 'admin' && (
          <Link to="/panel/administracion" style={estiloEnlace('administracion')}>
            ⚙️ Administración
          </Link>
        )}
      </nav>

      <button
        onClick={cerrarSesion}
        style={{
          padding: '12px',
          background: 'white',
          border: '2px solid #2a66f5',
          borderRadius: '8px',
          color: '#2a66f5',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          marginTop: '16px'
        }}
      >
        Cerrar sesión
      </button>

    </aside>
  )
}

export default BarraLateral