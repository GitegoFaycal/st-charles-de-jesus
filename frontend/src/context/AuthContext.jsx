import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('scj_token')
    if (!token) {
      setReady(true)
      return
    }
    api
      .get('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem('scj_token'))
      .finally(() => setReady(true))
  }, [])

  const login = useCallback(async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password })
    localStorage.setItem('scj_token', data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('scj_token')
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, setUser, ready, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
