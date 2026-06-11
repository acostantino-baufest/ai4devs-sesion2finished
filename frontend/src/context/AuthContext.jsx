import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('access_token'))
  const [usuario, setUsuario] = useState(() => sessionStorage.getItem('usuario'))

  const login = useCallback((accessToken, usuarioName) => {
    sessionStorage.setItem('access_token', accessToken)
    sessionStorage.setItem('usuario', usuarioName)
    setToken(accessToken)
    setUsuario(usuarioName)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('usuario')
    setToken(null)
    setUsuario(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, usuario, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
