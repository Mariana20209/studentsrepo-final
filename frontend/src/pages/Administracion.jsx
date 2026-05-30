import { useState, useEffect } from "react"
import { obtenerProyectosLocales } from "../services/api"
import Swal from "sweetalert2"

function Administracion() {
  const [proyectos, setProyectos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState("Todos")

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = async () => {
    try {
      const datos = await obtenerProyectosLocales()
      setProyectos(datos)
    } catch (error) {
      console.log("Error cargando proyectos:", error)
    } finally {
      setCargando(false)
    }
  }

  const cambiarEstado = (id, nuevoEstado) => {
    const proyectosActualizados = proyectos.map((proyecto) =>
      proyecto.id === id ? { ...proyecto, estado: nuevoEstado } : proyecto
    )

    setProyectos(proyectosActualizados)

    Swal.fire({
      icon: "success",
      title: `Proyecto ${nuevoEstado}`,
      timer: 1500,
      showConfirmButton: false
    })
  }

  const proyectosFiltrados = proyectos.filter((p) =>
    filtro === "Todos" ? true : p.estado === filtro
  )

  const colorEstado = {
    Pendiente: { background: "#fff7ed", color: "#c2410c" },
    Aprobado: { background: "#f0fdf4", color: "#15803d" },
    Rechazado: { background: "#fef2f2", color: "#dc2626" }
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f1f1f", margin: "0 0 4px 0" }}>
          Administración de Proyectos
        </h1>
        <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
          Aprueba, rechaza o consulta los proyectos de los estudiantes
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["Todos", "Pendiente", "Aprobado", "Rechazado"].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px",
              background: filtro === estado ? "#2a66f5" : "white",
              color: filtro === estado ? "white" : "#444",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
            }}
          >
            {estado}
          </button>
        ))}
      </div>

      {cargando ? (
        <p>Cargando proyectos...</p>
      ) : proyectosFiltrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>
          <p style={{ fontSize: "40px", margin: "0 0 12px 0" }}>📭</p>
          <p>No hay proyectos en este estado</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px"
        }}>
          {proyectosFiltrados.map((proyecto) => (
            <div
              key={proyecto.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                borderLeft: "4px solid #2a66f5"
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{proyecto.titulo}</h3>

              <span style={{
                ...colorEstado[proyecto.estado],
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                {proyecto.estado}
              </span>

              <p style={{ fontSize: "13px", color: "#666" }}>{proyecto.descripcion}</p>
              <p style={{ fontSize: "12px", color: "#999" }}>👤 {proyecto.estudiante}</p>
              <p style={{ fontSize: "12px", color: "#999" }}>📚 {proyecto.area}</p>

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
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "12px"
                }}
              >
                📄 Ver PDF
              </a>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => cambiarEstado(proyecto.id, "Aprobado")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#f0fdf4",
                    color: "#15803d",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Aprobar
                </button>

                <button
                  onClick={() => cambiarEstado(proyecto.id, "Rechazado")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#fef2f2",
                    color: "#dc2626",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Administracion