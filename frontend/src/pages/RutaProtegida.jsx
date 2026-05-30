import { Navigate } from 'react-router-dom'

const RutaProtegida = ({ children, soloAdmin }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  if (!usuario) {
    return <Navigate to="/acceso" />
  }

  if (soloAdmin && usuario.role !== 'admin') {
    return <Navigate to="/panel/proyectos" />
  }

  return children
}

export default RutaProtegida