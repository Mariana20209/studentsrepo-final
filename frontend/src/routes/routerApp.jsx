import { Navigate } from "react-router-dom"
import Inicio from "../pages/Inicio"
import Acceso from "../pages/Acceso"
import Panel from "../pages/Panel"
import Proyectos from "../pages/Proyectos"
import Estudiantes from "../pages/Estudiantes"
import Administracion from "../pages/Administracion"
import RutaProtegida from "../pages/RutaProtegida"


export const routerApp = [
  { path: "/", element: <Inicio /> },
  { path: "/acceso", element: <Acceso /> },
  

  {
    path: "/panel",
    element: (
      <RutaProtegida>
        <Panel />
      </RutaProtegida>
    ),
    children: [
      { path: "", element: <Navigate to="proyectos" /> },
      { path: "proyectos", element: <Proyectos /> },
      { path: "estudiantes", element: <Estudiantes /> },
      {
        path: "administracion",
        element: (
          <RutaProtegida soloAdmin={true}>
            <Administracion />
          </RutaProtegida>
        )
      }
    ]
  }
]