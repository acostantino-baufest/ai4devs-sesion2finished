const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function loginRequest(usuario, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || 'Error al iniciar sesión')
  }

  return response.json()
}

export async function fetchProtected(token) {
  const response = await fetch(`${API_BASE}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Sesión expirada o inválida')
  }

  return response.json()
}
