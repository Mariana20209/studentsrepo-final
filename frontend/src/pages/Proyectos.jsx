import { useState, useEffect } from "react"
import { obtenerProyectosLocales } from "../services/api"
import Swal from "sweetalert2"

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [filtroArea, setFiltroArea] = useState("Todos")

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = async () => {
    try {
      const datos = await obtenerProyectosLocales()

      setProyectos(
        datos.filter((p) => p.estado === "Aprobado" || !p.estado)
      )
    } catch (error) {
      console.log("Error cargando proyectos:", error)
      Swal.fire("Error", "No se pudieron cargar los proyectos", "error")
    } finally {
      setCargando(false)
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
      <div style={{ marginBottom: "24px" }}>
        <h1>📁 Proyectos</h1>
        <p>Explora y consulta los proyectos de tu interés.</p>
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
          marginBottom: "16px"
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
          {proyectosFiltrados.map((proyecto) => (
            <div
              key={proyecto.id}
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
    </div>
  )
}

export default Proyectos