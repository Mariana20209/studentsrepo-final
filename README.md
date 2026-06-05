# 📚 StudentsRepo — Repositorio Académico Digital

Plataforma web fullstack para que los estudiantes de **CESDE** puedan cargar, gestionar y consultar proyectos académicos de forma centralizada.

---

##  Demo en producción

| Servicio | URL |
|----------|-----|
| Frontend (Vercel) | https://studentsrepo-final-delta.vercel.app |
| Backend (Render) | https://studentsrepo-final.onrender.com |
| Swagger (API Docs) | https://studentsrepo-final.onrender.com/swagger-ui/index.html |

---

##  Integrantes

| Nombre | Rol |
|--------|-----|
| Mariana Suárez | Frontend + Backend |
| Viadis Correa | Frontend + Backend |

**Institución:** CESDE — Grupo 7  
**Materias:** Nuevas Tecnologías de Programación · Programación de Aplicaciones Móviles II · Programación para la WEB II

---

##  Stack Tecnológico

### Frontend
- React 18 + Vite
- React Router v6
- SweetAlert2
- Plotly.js (analítica)
- Desplegado en **Vercel**

### Backend
- Spring Boot 3 (Java 17)
- Spring Data JPA / Hibernate
- PostgreSQL (Neon)
- Swagger / springdoc-openapi
- Desplegado en **Render**

### Mock API
- JSON Server (`db-proyectos.json`)

---

##  Funcionalidades

-  Login con roles (admin y estudiante)
-  Catálogo de proyectos aprobados con búsqueda y filtros por área
-  Subir proyectos con URL de Google Drive
-  Panel de administración para aprobar, rechazar o editar proyectos
-  Módulo de analítica con gráficas en tiempo real (Plotly)
-  Gestión de estudiantes

---

##  Cómo correr el proyecto localmente

### Requisitos
- Node.js 18+
- Java 17+
- Maven
- PostgreSQL (local o Neon)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mariana20209/studentsrepo-final.git
cd studentsrepo-final
```

### 2. Correr el backend

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Correr el JSON Server

```bash
cd frontend
npx json-server public/db-proyectos.json --port 3002
```

### 4. Correr el frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Abrir en el navegador
http://localhost:5173

---

## Credenciales de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Admin | mariana | Admin2026! |
| Admin | viadis | Admin2026! |
| Estudiante | jtorres | 12345 |

---

## Estructura del Proyecto

studentsrepo-final/
├── backend/
│   ├── src/main/java/com/grupo7/studentsrepo/
│   │   ├── config/          # CORS, OpenAPI
│   │   ├── controller/      # ProyectoController, EstudianteController, AdminController
│   │   ├── dto/             # Request y Response DTOs
│   │   ├── mapper/          # Mappers entre entidad y DTO
│   │   ├── model/entity/    # Proyecto, Estudiante, Admin, BaseEntity
│   │   └── service/         # Lógica de negocio
│   └── src/main/resources/
│       └── application.properties
└── frontend/
├── public/
│   └── db-proyectos.json   
└── src/
├── pages/              # Acceso, Proyectos, Analitica, Administracion, Estudiantes
├── components/         # BarraLateral, Encabezado, PiePagina
└── services/
└── api.js          # URLs del backend

---

## Analítica

El módulo de analítica muestra en tiempo real:

- Total de proyectos, aprobados, pendientes y rechazados
- Tasa de aprobación
- Proyectos por área
- Top estudiantes
- Distribución de estados

---

##  Notas importantes

>  El backend en Render usa el plan gratuito. Puede tardar ~30 segundos en despertar si estuvo inactivo.

> Al actualizar la URL de Vercel, recuerda actualizar `CorsConfig.java` con el nuevo dominio.

---

## Licencia

Proyecto académico — CESDE 2026 · Grupo 7