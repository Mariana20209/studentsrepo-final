import { useState, useEffect } from "react"

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    fetch("https://studentsrepo-backend.onrender.com/api/estudiantes")
      .then((res) => res.json())
      .then((datos) => {
        setEstudiantes(datos.filter(u => u.role === 'estudiante'))
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  const estudiantesFiltrados = estudiantes.filter(e =>
    e.fullName?.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.email?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const TarjetaSkeleton = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }}></div>
      <div style={{ flex: 1 }}>
        <div style={{ height: '14px', background: '#e2e8f0', borderRadius: '4px', width: '60%', marginBottom: '8px' }}></div>
        <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '80%' }}></div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f1f1f', margin: '0 0 4px 0' }}>👥 Estudiantes</h1>
        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Listado de todos los estudiantes registrados</p>
      </div>

      <input type="text" placeholder="🔍 Buscar por nombre o correo..." value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '24px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {cargando ? (
          <><TarjetaSkeleton /><TarjetaSkeleton /><TarjetaSkeleton /></>
        ) : estudiantesFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px 0' }}>🔍</p>
            <p>No se encontraron estudiantes</p>
          </div>
        ) : (
          estudiantesFiltrados.map(estudiante => (
            <div key={estudiante.id} style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2a66f5', color: 'white', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {estudiante.fullName?.split(" ").map((i) => i[0]).join("") || "E"}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#1f1f1f', fontSize: '15px' }}>{estudiante.fullName}</p>
                <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>{estudiante.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Estudiantes