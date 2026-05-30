export default function PiePagina() {
  return (
    <footer style={{
      background: '#2a66f5',
      color: 'white',
      padding: '40px 48px',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>
             StudentsRepo
          </h3>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '14px', maxWidth: '280px' }}>
            Plataforma educativa para compartir y consultar proyectos académicos del CESDE.
          </p>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600' }}>Navegación</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.85, fontSize: '14px' }}>Inicio</a>
            <a href="/acceso" style={{ color: 'white', textDecoration: 'none', opacity: 0.85, fontSize: '14px' }}> Iniciar sesión</a>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600' }}>Equipo</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}> Mariana Suárez</p>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>Viadis Correa</p>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600' }}>Contacto</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>
               soporte@studentsrepo.cesde.edu.co
            </p>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>
               +57 604 123 4567
            </p>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>
               Lun - Vie: 8:00am - 6:00pm
            </p>
          </div>
        </div>

      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.2)',
        marginTop: '32px',
        paddingTop: '20px',
        textAlign: 'center',
        opacity: 0.75,
        fontSize: '13px'
      }}>
        © 2026 StudentsRepo - CESDE. Todos los derechos reservados.
      </div>

    </footer>
  )
}