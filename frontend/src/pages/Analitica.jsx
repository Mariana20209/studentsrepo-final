import { useEffect, useState } from "react"

function Analitica() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.plot.ly/plotly-2.35.2.min.js"
    script.onload = () => cargarDatos()
    document.head.appendChild(script)
  }, [])

  const cargarDatos = async () => {
    try {
      const res = await fetch("https://studentsrepo-final.onrender.com/api/proyectos")
      const proyectos = await res.json()

      const localRes = await fetch("/db-proyectos.json")
      const localData = await localRes.json()
      const todos = [...proyectos, ...localData.proyectos]

      const porEstado = contarPor(todos, "estado")
      const porArea = contarPor(todos, "area")
      const porEstudiante = contarPor(todos, "estudiante")

      const kpis = {
        total: todos.length,
        aprobados: todos.filter(p => p.estado === "Aprobado").length,
        pendientes: todos.filter(p => p.estado === "Pendiente").length,
        rechazados: todos.filter(p => p.estado === "Rechazado").length,
        estudiantes: [...new Set(todos.map(p => p.estudiante))].length,
        tasa: Math.round((todos.filter(p => p.estado === "Aprobado").length / todos.length) * 100)
      }

      setData({ kpis, porEstado, porArea, porEstudiante, todos })
    } catch (e) {
      console.error(e)
    }
  }

  const contarPor = (arr, campo) => {
    const conteo = {}
    arr.forEach(item => {
      const val = item[campo] || "Sin dato"
      conteo[val] = (conteo[val] || 0) + 1
    })
    return Object.entries(conteo)
      .map(([k, v]) => ({ label: k, cantidad: v }))
      .sort((a, b) => b.cantidad - a.cantidad)
  }

  useEffect(() => {
    if (!data || !window.Plotly) return

    const layout = {
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "Arial", color: "#444" },
      margin: { t: 20, r: 20, b: 60, l: 180 },
      xaxis: { gridcolor: "#f0f4ff" },
      yaxis: { gridcolor: "#f0f4ff" }
    }

    // Gráfica 1 - Por estado
    window.Plotly.newPlot("chart-estado", [{
      x: data.porEstado.map(d => d.label),
      y: data.porEstado.map(d => d.cantidad),
      type: "bar",
      marker: { color: ["#10b981", "#f59e0b", "#ef4444"] },
      hovertemplate: "%{x}<br>Cantidad: %{y}<extra></extra>"
    }], { ...layout, margin: { t: 20, r: 20, b: 60, l: 65 } }, { responsive: true })

    // Gráfica 2 - Por área
    window.Plotly.newPlot("chart-area", [{
      x: data.porArea.map(d => d.cantidad),
      y: data.porArea.map(d => d.label),
      type: "bar",
      orientation: "h",
      marker: { color: "#2a66f5", opacity: 0.85 },
      hovertemplate: "%{y}<br>Proyectos: %{x}<extra></extra>"
    }], layout, { responsive: true })

    // Gráfica 3 - Top estudiantes
    const top10 = data.porEstudiante.slice(0, 10)
    window.Plotly.newPlot("chart-estudiantes", [{
      x: top10.map(d => d.cantidad),
      y: top10.map(d => d.label),
      type: "bar",
      orientation: "h",
      marker: { color: "#4f8ef7", opacity: 0.85 },
      hovertemplate: "%{y}<br>Proyectos: %{x}<extra></extra>"
    }], layout, { responsive: true })

    // Gráfica 4 - Torta de estados
    window.Plotly.newPlot("chart-torta", [{
      labels: data.porEstado.map(d => d.label),
      values: data.porEstado.map(d => d.cantidad),
      type: "pie",
      hole: 0.45,
      marker: { colors: ["#10b981", "#f59e0b", "#ef4444"] },
      hovertemplate: "%{label}<br>%{value} proyectos (%{percent})<extra></extra>"
    }], {
      paper_bgcolor: "rgba(0,0,0,0)",
      font: { family: "Arial", color: "#444" },
      margin: { t: 20, r: 20, b: 20, l: 20 }
    }, { responsive: true })

  }, [data])

  const card = { background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(42,102,245,0.08)" }
  const badge = { padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "600" }

  if (!data) return (
    <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
      Cargando analítica...
    </div>
  )

  return (
    <div style={{ padding: "28px", background: "#f0f4ff", minHeight: "100vh" }}>

      <h1 style={{ color: "#1a3a8f", fontSize: "28px", marginBottom: "6px" }}>📊 Analítica de Proyectos</h1>
      <p style={{ color: "#888", marginBottom: "28px" }}>Análisis en tiempo real de los proyectos registrados en StudentsRepo.</p>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { emoji: "📁", label: "Total Proyectos", value: data.kpis.total },
          { emoji: "✅", label: "Aprobados", value: data.kpis.aprobados },
          { emoji: "⏳", label: "Pendientes", value: data.kpis.pendientes },
          { emoji: "❌", label: "Rechazados", value: data.kpis.rechazados },
          { emoji: "📈", label: "Tasa de Aprobación", value: data.kpis.tasa + "%" },
          { emoji: "👥", label: "Estudiantes", value: data.kpis.estudiantes },
        ].map((k, i) => (
          <div key={i} style={{ ...card, borderTop: "4px solid #2a66f5" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{k.emoji}</div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontFamily: "Arial", fontWeight: "800", fontSize: "32px", color: "#1a3a8f" }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "24px" }}>

        <div style={{ ...card, gridColumn: "span 2" }}>
          <h3 style={{ color: "#1a3a8f", marginBottom: "4px" }}>1. Proyectos por Estado</h3>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>Distribución según el estado de revisión.</p>
          <div id="chart-estado" style={{ width: "100%", height: "320px" }}></div>
          <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0f4ff", borderLeft: "3px solid #2a66f5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#1a3a8f" }}>
            ✅ La mayoría de proyectos están aprobados.
          </div>
        </div>

        <div style={card}>
          <h3 style={{ color: "#1a3a8f", marginBottom: "4px" }}>2. Proyectos por Área</h3>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>Áreas con más proyectos registrados.</p>
          <div id="chart-area" style={{ width: "100%", height: "360px" }}></div>
          <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0f4ff", borderLeft: "3px solid #2a66f5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#1a3a8f" }}>
            💻 Desarrollo de Software lidera con más proyectos.
          </div>
        </div>

        <div style={card}>
          <h3 style={{ color: "#1a3a8f", marginBottom: "4px" }}>3. Top Estudiantes</h3>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>Estudiantes con más proyectos subidos.</p>
          <div id="chart-estudiantes" style={{ width: "100%", height: "360px" }}></div>
          <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0f4ff", borderLeft: "3px solid #2a66f5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#1a3a8f" }}>
            🏆 Mariana Suárez tiene el mayor número de proyectos.
          </div>
        </div>

        <div style={{ ...card, gridColumn: "span 2" }}>
          <h3 style={{ color: "#1a3a8f", marginBottom: "4px" }}>4. Distribución de Estados</h3>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>Vista proporcional de todos los proyectos.</p>
          <div id="chart-torta" style={{ width: "100%", height: "360px" }}></div>
          <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0f4ff", borderLeft: "3px solid #2a66f5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#1a3a8f" }}>
            📈 El {data.kpis.tasa}% de los proyectos han sido aprobados.
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div style={{ ...card, overflowX: "auto" }}>
        <h3 style={{ color: "#1a3a8f", marginBottom: "4px", fontSize: "18px" }}>📋 Todos los Proyectos</h3>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>Listado completo de proyectos registrados.</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {["#", "Título", "Área", "Estudiante", "Fecha", "Estado"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", background: "#f0f4ff", color: "#1a3a8f", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.todos.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f0f4ff" }}>
                <td style={{ padding: "11px 14px", color: "#888" }}>{i + 1}</td>
                <td style={{ padding: "11px 14px", color: "#444" }}>{p.titulo}</td>
                <td style={{ padding: "11px 14px", color: "#444" }}>{p.area}</td>
                <td style={{ padding: "11px 14px", color: "#444" }}>{p.estudiante}</td>
                <td style={{ padding: "11px 14px", color: "#888" }}>{p.fecha}</td>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{
                    ...badge,
                    background: p.estado === "Aprobado" ? "#d1fae5" : p.estado === "Pendiente" ? "#fef3c7" : "#fee2e2",
                    color: p.estado === "Aprobado" ? "#065f46" : p.estado === "Pendiente" ? "#92400e" : "#991b1b"
                  }}>{p.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Analitica