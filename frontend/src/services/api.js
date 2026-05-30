const URL_BASE = "http://localhost:10000"

export const puntos_finales = {
  admins: `${URL_BASE}/api/admins`,
  estudiantes: `${URL_BASE}/api/estudiantes`,
  proyectos: `${URL_BASE}/api/proyectos`,
}

export const obtenerProyectosLocales = async () => {
  const respuesta = await fetch("/db-proyectos.json")
  const datos = await respuesta.json()
  return datos.proyectos
}