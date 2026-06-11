import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchProtected } from '../services/authService'

export default function WelcomePage() {
  const { usuario, token, logout } = useAuth()
  const navigate = useNavigate()
  const [protectedData, setProtectedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [certifications, setCertifications] = useState([])
  const [certificationsLoading, setCertificationsLoading] = useState(true)

  // Certification data for 2026
  const certificationData = [
    {
      id: 1,
      name: 'Cloud and AI Security Engineer Associate',
      code: 'SC-500',
      status: 'new',
      description: 'New certification expanding Azure Security Engineer role to include cloud and AI model protection.',
      availableDate: 'July 2026',
      icon: 'shield'
    },
    {
      id: 2,
      name: 'Microsoft 365 Collaboration Communications Systems Engineer',
      code: 'M365-CCSE',
      status: 'updated',
      description: 'Added for Microsoft Teams specialization to address retiring technical assessments.',
      availableDate: 'Available now',
      icon: 'users'
    },
    {
      id: 3,
      name: 'Copilot and Agent Administration Fundamentals',
      code: 'Copilot-Admin',
      status: 'new',
      description: 'New intermediate skilling option for Modern Work Solutions Partner designation.',
      availableDate: 'Available now',
      icon: 'sparkles'
    },
    {
      id: 4,
      name: 'GitHub Certifications Suite',
      code: 'GitHub-Suite',
      status: 'updated',
      description: 'GitHub Actions, Administration, Advanced Security, and Copilot certifications added to Digital & App Innovation specializations.',
      availableDate: 'Available now',
      icon: 'code'
    }
  ]

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  useEffect(() => {
    fetchProtected(token)
      .then(setProtectedData)
      .catch(() => {
        logout()
        navigate('/login', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [token, logout, navigate])

  // Load certifications data
  useEffect(() => {
    // Simulate loading certifications (in real app, this could be from an API)
    setCertifications(certificationData)
    setCertificationsLoading(false)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const tokenPreview = token
    ? `${token.substring(0, 40)}...${token.substring(token.length - 10)}`
    : '—'

  const getIconSvg = (iconType) => {
    switch (iconType) {
      case 'shield':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )
      case 'users':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )
      case 'sparkles':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />
          </svg>
        )
      case 'code':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        )
      default:
        return null
    }
  }

  const getIconColor = (status) => {
    switch (status) {
      case 'new':
        return 'welcome-card-icon-green'
      case 'updated':
        return 'welcome-card-icon-blue'
      default:
        return 'welcome-card-icon-tertiary'
    }
  }

  const getStatusBadgeText = (status) => {
    switch (status) {
      case 'new':
        return 'Nuevo en 2026'
      case 'updated':
        return 'Actualizado'
      default:
        return 'Available'
    }
  }

  return (
    <div className="welcome-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6C24 6 12 16 12 27C12 33.63 17.37 39 24 39C30.63 39 36 33.63 36 27C36 16 24 6 24 6Z" fill="#0B7A36" />
              <path d="M24 14V39" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M24 26L18 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M24 30L30 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="navbar-brand-name">Molinos Agro</span>
          </div>

          <div className="navbar-links">
            <button className="nav-pill nav-pill-active">Dashboard</button>
            <button className="nav-pill">Cultivos</button>
            <button className="nav-pill">Producción</button>
            <button className="nav-pill">Reportes</button>
          </div>

          <div className="navbar-actions">
            <div className="navbar-avatar" title={usuario}>
              {usuario?.charAt(0).toUpperCase()}
            </div>
            <span className="navbar-username">{usuario}</span>
            <button className="btn-secondary btn-sm" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="welcome-hero">
        <div className="welcome-hero-deco-1" />
        <div className="welcome-hero-deco-2" />
        <div className="welcome-hero-container">
          <p className="eyebrow eyebrow-light">PANEL DE CONTROL</p>
          <h1 className="welcome-hero-title">
            {greeting}, {usuario}
          </h1>
          <p className="welcome-hero-subtitle">
            Bienvenido al sistema de gestión de Molinos Agro. Aquí encontrarás
            toda la información operativa de tu organización.
          </p>
          {!loading && protectedData && (
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {protectedData.message}
            </div>
          )}
        </div>
      </section>

      {/* Cards */}
      <main className="welcome-main">
        <div className="welcome-grid">
          {/* Session card */}
          <div className="card welcome-card">
            <div className="welcome-card-icon-wrap welcome-card-icon-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="card-eyebrow">SESIÓN</p>
            <h3 className="card-title">Autenticación activa</h3>
            <p className="card-body">
              Sesión iniciada con JWT. El token expira en 5 minutos desde el momento del login.
            </p>
            <div className="card-status card-status-success">
              <span className="status-dot status-dot-green" />
              Autenticado correctamente
            </div>
          </div>

          {/* User card */}
          <div className="card welcome-card">
            <div className="welcome-card-icon-wrap welcome-card-icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="card-eyebrow">PERFIL</p>
            <h3 className="card-title">{usuario}</h3>
            <p className="card-body">
              Acceso completo al sistema como administrador de la plataforma.
            </p>
            <div className="card-info-row">
              <span className="card-info-label">Rol</span>
              <span className="card-info-chip">Administrador</span>
            </div>
          </div>

          {/* System card */}
          <div className="card welcome-card">
            <div className="welcome-card-icon-wrap welcome-card-icon-tertiary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <p className="card-eyebrow">SISTEMA</p>
            <h3 className="card-title">Operacional</h3>
            <p className="card-body">
              Todos los servicios del backend están funcionando con normalidad.
            </p>
            <div className="card-status card-status-success">
              <span className="status-dot status-dot-pulse" />
              API conectada en localhost:8000
            </div>
          </div>
        </div>

        {/* Token detail */}
        <div className="card token-card">
          <div className="token-card-header">
            <div>
              <p className="card-eyebrow">SEGURIDAD</p>
              <h3 className="card-title">Token de acceso JWT</h3>
            </div>
            <div className="token-card-badge">Bearer</div>
          </div>
          <div className="token-display">
            <code className="token-value">{tokenPreview}</code>
          </div>
          <p className="token-note">
            El token se almacena en <code>sessionStorage</code> y se elimina automáticamente al cerrar la pestaña del navegador. No se persiste entre sesiones.
          </p>
        </div>

        {/* Microsoft 2026 Certifications Section */}
        <section className="certifications-section">
          <div className="certifications-header">
            <div>
              <p className="eyebrow">OPORTUNIDADES DE DESARROLLO</p>
              <h2 className="section-title">Certificaciones Microsoft 2026</h2>
            </div>
            <p className="section-subtitle">
              Explora las nuevas certificaciones y actualizaciones de Microsoft disponibles en 2026. Construidas con información obtenida del Microsoft Documentation Server.
            </p>
          </div>

          <div className="certifications-grid">
            {!certificationsLoading && certifications.map((cert) => (
              <div key={cert.id} className="card certification-card">
                <div className={`welcome-card-icon-wrap ${getIconColor(cert.status)}`}>
                  {getIconSvg(cert.icon)}
                </div>
                <div className="certification-badge-wrapper">
                  <p className="card-eyebrow">{cert.code}</p>
                  <span className={`certification-badge certification-badge-${cert.status}`}>
                    {getStatusBadgeText(cert.status)}
                  </span>
                </div>
                <h3 className="card-title">{cert.name}</h3>
                <p className="card-body">
                  {cert.description}
                </p>
                <div className="certification-footer">
                  <span className="certification-date">
                    <span className="date-icon">📅</span>
                    {cert.availableDate}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Retiring Certifications Notice */}
          <div className="card retiring-certifications-card">
            <div className="retiring-header">
              <div>
                <p className="card-eyebrow">IMPORTANTE</p>
                <h3 className="card-title">Certificaciones en proceso de retiro</h3>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="card-body retiring-description">
              Algunas certificaciones se están retirando en 2026. Azure AI Engineer Associate y Azure Developer Associate se retiran el 30 de junio y 31 de julio respectivamente. Azure Security Engineer Associate (AZ-500) se retira el 31 de agosto. Considera planificar la transición a las nuevas certificaciones como SC-500 para mantener tus credenciales actualizadas.
            </p>
            <div className="retiring-dates">
              <div className="retiring-date-item">
                <span className="date-label">Junio 30, 2026</span>
                <span className="date-certs">Azure AI, Dynamics 365</span>
              </div>
              <div className="retiring-date-item">
                <span className="date-label">Julio 31, 2026</span>
                <span className="date-certs">Azure Developer, D365 CX</span>
              </div>
              <div className="retiring-date-item">
                <span className="date-label">Agosto 31, 2026</span>
                <span className="date-certs">AZ-500, Power Platform</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
