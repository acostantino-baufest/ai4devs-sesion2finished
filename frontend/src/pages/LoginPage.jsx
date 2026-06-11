import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../services/authService'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginRequest(usuario, password)
      login(data.access_token, usuario)
      navigate('/welcome', { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Brand panel */}
      <div className="login-brand">
        <div className="login-brand-deco-1" />
        <div className="login-brand-deco-2" />
        <div className="login-brand-content">
          <div className="login-brand-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)" />
              <path d="M24 10C24 10 14 18 14 27C14 32.52 18.48 37 24 37C29.52 37 34 32.52 34 27C34 18 24 10 24 10Z" fill="rgba(255,255,255,0.9)" />
              <path d="M24 16V37" stroke="#0B7A36" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 24L19 19" stroke="#0B7A36" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 28L29 23" stroke="#0B7A36" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="login-brand-title">Molinos Agro</h1>
          <p className="login-brand-subtitle">
            Sistema de gestión agrícola corporativo. Monitoreo, planificación y control
            de operaciones en un solo lugar.
          </p>
          <ul className="login-brand-features">
            <li className="login-brand-feature">
              <span className="feature-check">✓</span> Gestión de cultivos y campos
            </li>
            <li className="login-brand-feature">
              <span className="feature-check">✓</span> Monitoreo de producción
            </li>
            <li className="login-brand-feature">
              <span className="feature-check">✓</span> Reportes en tiempo real
            </li>
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <div className="login-form-header">
            <p className="eyebrow">BIENVENIDO</p>
            <h2 className="login-form-title">Iniciar sesión</h2>
            <p className="login-form-subtitle">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="usuario">Usuario</label>
              <input
                id="usuario"
                type="text"
                className={`input-field${error ? ' input-error' : ''}`}
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className={`input-field${error ? ' input-error' : ''}`}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-error" role="alert">
                <span className="login-error-icon">⚠</span>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          <div className="login-hint">
            <p className="login-hint-label">Credenciales de demo</p>
            <div className="login-hint-row">
              <span>Usuario:</span><code>admin</code>
            </div>
            <div className="login-hint-row">
              <span>Contraseña:</span><code>admin123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
