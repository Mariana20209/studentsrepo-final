function Analitica() {
  const enlaceColab = "https://colab.research.google.com/drive/1Hv3P8z3KBe6dx1F0x58weQt2Eo7f1Dh6#scrollTo=cojFmAy7loE1"

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#2a66f5", fontSize: "28px" }}>
        📊 Módulo de Analítica
      </h1>

      <p style={{ fontSize: "16px", color: "#444", maxWidth: "800px" }}>
        En este módulo se presenta el análisis de datos de StudentsRepo
        utilizando Python, Pandas y Google Colab.
      </p>

      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        marginTop: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        maxWidth: "800px"
      }}>
        <h2>Indicadores analizados</h2>

        <ul>
          <li>Total de proyectos registrados.</li>
          <li>Proyectos por área.</li>
          <li>Proyectos por estado.</li>
          <li>Gráficas con Pandas y Matplotlib.</li>
        </ul>

        <a
          href={enlaceColab}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "12px 20px",
            background: "#2a66f5",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Ver análisis en Google Colab
        </a>
      </div>
    </div>
  )
}

export default Analitica