import { useState, useEffect } from "react"
import { puntos_finales } from "../services/api"
import Swal from "sweetalert2"

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [filtroArea, setFiltroArea] = useState("Todos")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    area: "Desarrollo de Software",
    archivoUrl: ""
  })

  const usuario = JSON.parse(localStorage.getItem("usuario"))

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = () => {
    fetch(puntos_finales.proyectos)
      .then((res) => res.json())
      .then((datos) => {
        setProyectos(datos.filter(p => p.estado === "Aprobado"))
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }

  const enviarProyecto = async () => {
    if (!formulario.titulo || !formulario.descripcion) {
      Swal.fire("Campos vacíos", "Completa todos los campos", "warning")
      return
    }

    const nuevoProyecto = {
      ...formulario,
      estado: "Pendiente",
      estudiante: usuario?.fullName || "Estudiante",
      fecha: new Date().toISOString().split("T")[0],
    }

    fetch("https://studentsrepo-backend.onrender.com/api/proyectos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProyecto)
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Proyecto enviado",
          text: "Tu proyecto fue enviado al administrador para revisión",
          timer: 2000,
          showConfirmButton: false
        })
        setMostrarFormulario(false)
        setFormulario({ titulo: "", descripcion: "", area: "Desarrollo de Software", archivoUrl: "" })
      })
      .catch(() => Swal.fire("Error", "No se pudo enviar el proyecto", "error"))
  }

  const areas = ["Todos", "Desarrollo de Software", "Diseño Gráfico", "Talento Humano", "Administración", "Servicio al Cliente", "Gestión de Proyectos", "Logística y Operaciones", "Gestión Documental"]

  const proyectosFiltrados = proyectos
    .filter(p => filtroArea === "Todos" ? true : p.area === filtroArea)
    .filter(p => p.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.estudiante?.toLowerCase().includes(busqueda.toLowerCase()))

  const TarjetaSkeleton = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', width: '70%', marginBottom: '12px' }}></div>
      <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '100%', marginBottom: '8px' }}></div>
      <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '60%' }}></div>
    </div>
  )

  return (
    <div style={{ padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f1f1f', margin: '0 0 4px 0' }}>
            📁 Proyectos
          </h1>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            Explora y consulta los proyectos aprobados
          </p>
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          style={{
            padding: '10px 20px',
            background: '#2a66f5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          + Subir Proyecto
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar por título o autor..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: '16px'
        }}
      />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {areas.map(area => (
          <button
            key={area}
            onClick={() => setFiltroArea(area)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '12px',
              background: filtroArea === area ? '#2a66f5' : 'white',
              color: filtroArea === area ? 'white' : '#444',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
          >
            {area}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {cargando ? (
          <>
            <TarjetaSkeleton />
            <TarjetaSkeleton />
            <TarjetaSkeleton />
          </>
        ) : proyectosFiltrados.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#999' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px 0' }}>🔍</p>
            <p>No se encontraron proyectos</p>
          </div>
        ) : (
          proyectosFiltrados.map(proyecto => (
            <div key={proyecto.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #2a66f5'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f1f1f' }}>
                {proyecto.titulo}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>{proyecto.descripcion}</p>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#999' }}>👤 {proyecto.estudiante}</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#999' }}>📚 {proyecto.area}</p>
              <a
                href={proyecto.archivoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '8px',
                  background: '#f8faff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#2a66f5',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                📄 Ver PDF
              </a>
            </div>
          ))
        )}
      </div>

      {mostrarFormulario && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '20px'
        }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '480px', overflow: 'hidden' }}>
            <div style={{ background: '#2a66f5', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>📤 Subir Proyecto</h2>
              <button onClick={() => setMostrarFormulario(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Título</label>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  value={formulario.titulo}
                  onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Descripción</label>
                <textarea
                  placeholder="Describe tu proyecto..."
                  value={formulario.descripcion}
                  onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Área</label>
                <select
                  value={formulario.area}
                  onChange={(e) => setFormulario({ ...formulario, area: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                >
                  <option>Desarrollo de Software</option>
                  <option>Diseño Gráfico</option>
                  <option>Talento Humano</option>
                  <option>Administración</option>
                  <option>Servicio al Cliente</option>
                  <option>Gestión de Proyectos</option>
                  <option>Logística y Operaciones</option>
                  <option>Gestión Documental</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>
                  URL del PDF
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formulario.archivoUrl}
                  onChange={(e) => setFormulario({ ...formulario, archivoUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0 0' }}>
                  💡 Sube tu PDF a Google Drive, compártelo y pega el link aquí
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setMostrarFormulario(false)}
                  style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', color: '#444', cursor: 'pointer', fontWeight: '500' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={enviarProyecto}
                  style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: '#2a66f5', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Enviar al admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Proyectos