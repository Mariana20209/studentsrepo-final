import { useState, useEffect } from "react"
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

  const cargarProyectos = async () => {
    try {
      // Cargar del backend
      const respuestaBackend = await fetch("http://localhost:10000/api/proyectos")
      const datosBackend = await respuestaBackend.json()

      // Cargar del JSON local
      const respuestaLocal = await fetch("/db-proyectos.json")
      const datosLocal = await respuestaLocal.json()

      // Combinar ambos y filtrar solo Aprobados
      const todos = [
        ...datosBackend,
        ...datosLocal.proyectos
      ]

      setProyectos(todos.filter((p) => p.estado === "Aprobado"))
    } catch (error) {
      console.log("Error cargando proyectos:", error)
      Swal.fire("Error", "No se pudieron cargar los proyectos", "error")
    } finally {
      setCargando(false)
    }
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

    try {
      await fetch("http://localhost:10000/api/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProyecto)
      })
      Swal.fire({
        icon: "success",
        title: "Proyecto enviado",
        text: "Tu proyecto fue enviado al administrador para revisión",
        timer: 2000,
        showConfirmButton: false
      })
      setMostrarFormulario(false)
      setFormulario({ titulo: "", descripcion: "", area: "Desarrollo de Software", archivoUrl: "" })
      cargarProyectos()
    } catch {
      Swal.fire("Error", "No se pudo enviar el proyecto", "error")
    }
  }

  const areas = [
    "Todos",
    "Desarrollo de Software",
    "Diseño Gráfico",
    "Talento Humano",
    "Administración",
    "Servicio al Cliente",
    "Gestión de Proyectos",
    "Logística y Operaciones",
    "Gestión Documental"
  ]

  const proyectosFiltrados = proyectos
    .filter((p) => filtroArea === "Todos" ? true : p.area === filtroArea)
    .filter((p) =>
      p.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.estudiante?.toLowerCase().includes(busqueda.toLowerCase())
    )

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1>📁 Proyectos</h1>
          <p>Explora y consulta los proyectos de tu interés.</p>
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          style={{
            padding: "10px 20px",
            background: "#2a66f5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer"
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
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "16px",
          boxSizing: "border-box"
        }}
      />

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => setFiltroArea(area)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              background: filtroArea === area ? "#2a66f5" : "white",
              color: filtroArea === area ? "white" : "#444",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            {area}
          </button>
        ))}
      </div>

      {cargando ? (
        <p>Cargando proyectos...</p>
      ) : proyectosFiltrados.length === 0 ? (
        <p>No se encontraron proyectos</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px"
        }}>
          {proyectosFiltrados.map((proyecto, index) => (
            <div
              key={proyecto.id || index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                borderLeft: "4px solid #2a66f5"
              }}
            >
              <h3>{proyecto.titulo}</h3>
              <p>{proyecto.descripcion}</p>
              <p>👤 {proyecto.estudiante}</p>
              <p>📚 {proyecto.area}</p>
              
              <a
                href={proyecto.archivoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "8px",
                  background: "#f8faff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#2a66f5",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
              >
                📄 Ver PDF
              </a>
            </div>
          ))}
        </div>
      )}

      {mostrarFormulario && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: "20px"
        }}>
          <div style={{ background: "white", borderRadius: "16px", width: "100%", maxWidth: "480px", overflow: "hidden" }}>
            <div style={{ background: "#2a66f5", color: "white", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "18px" }}>📤 Subir Proyecto</h2>
              <button onClick={() => setMostrarFormulario(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Título</label>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  value={formulario.titulo}
                  onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Descripción</label>
                <textarea
                  placeholder="Describe tu proyecto..."
                  value={formulario.descripcion}
                  onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", resize: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Área</label>
                <select
                  value={formulario.area}
                  onChange={(e) => setFormulario({ ...formulario, area: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px" }}
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
                <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>
                  URL del PDF
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formulario.archivoUrl}
                  onChange={(e) => setFormulario({ ...formulario, archivoUrl: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
                <p style={{ fontSize: "12px", color: "#999", margin: "4px 0 0 0" }}>
                  💡 Sube tu PDF a Google Drive, compártelo y pega el link aquí
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setMostrarFormulario(false)}
                  style={{ flex: 1, padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "white", color: "#444", cursor: "pointer", fontWeight: "500" }}
                >
                  Cancelar
                </button>
                <button
                  onClick={enviarProyecto}
                  style={{ flex: 1, padding: "10px", border: "none", borderRadius: "8px", background: "#2a66f5", color: "white", cursor: "pointer", fontWeight: "bold" }}
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