import { Link } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'

function Inicio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Encabezado />

      <section style={{
        background: '#2a66f5', color: 'white',
        textAlign: 'center', padding: '100px 20px'
      }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px' }}>
          Repositorio Estudiantil CESDE
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Un espacio para compartir proyectos académicos, investigaciones y logros de los estudiantes.
        </p>
        <Link to="/acceso">
          <button style={{
            padding: '14px 28px', border: '2px solid white',
            borderRadius: '8px', background: 'white',
            color: '#2a66f5', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
          }}>
            Explorar proyectos
          </button>
        </Link>
      </section>

      <section style={{ padding: '60px 40px', textAlign: 'center', background: '#f5f5f5' }}>
        <h2 style={{ color: '#2a66f5', fontSize: '28px', marginBottom: '40px' }}>
          Áreas Académicas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderRadius: '12px', padding: '30px 20px', background: '#dbeafe', textAlign: 'left' }}>
            <h3 style={{ color: '#1d4ed8', fontWeight: 'bold', marginBottom: '12px' }}>💻 Desarrollo de Software</h3>
            <p style={{ fontSize: '14px', color: '#000' }}>Proyectos de programación, apps y soluciones tecnológicas.</p>
          </div>
          <div style={{ borderRadius: '12px', padding: '30px 20px', background: '#dcfce7', textAlign: 'left' }}>
            <h3 style={{ color: '#15803d', fontWeight: 'bold', marginBottom: '12px' }}>🎨 Diseño Gráfico</h3>
            <p style={{ fontSize: '14px', color: '#000' }}>Proyectos visuales, creatividad digital e identidad de marca.</p>
          </div>
          <div style={{ borderRadius: '12px', padding: '30px 20px', background: '#fce7f3', textAlign: 'left' }}>
            <h3 style={{ color: '#be185d', fontWeight: 'bold', marginBottom: '12px' }}>👥 Talento Humano</h3>
            <p style={{ fontSize: '14px', color: '#000' }}>Gestión, liderazgo y desarrollo organizacional.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#2a66f5', fontSize: '28px', marginBottom: '20px' }}>¿Qué es StudentsRepo?</h2>
        <p style={{ fontSize: '16px', color: '#444', marginBottom: '16px' }}>
          StudentsRepo es una plataforma educativa donde los estudiantes del CESDE pueden compartir y consultar proyectos académicos de todas las áreas formativas.
        </p>
        <p><em>"El conocimiento se multiplica cuando se comparte."</em></p>
      </section>

      <PiePagina />
    </div>
  )
}

export default Inicio