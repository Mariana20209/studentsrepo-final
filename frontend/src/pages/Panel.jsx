import { Outlet, Navigate } from 'react-router-dom'
import BarraLateral from '../components/BarraLateral'

function Panel() {
  const usuario = localStorage.getItem('usuario')

  if (!usuario) {
    return <Navigate to="/acceso" />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8faff' }}>
      <BarraLateral />
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Panel