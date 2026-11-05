import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('light')
export function useTheme() {
  return useContext(ThemeContext)
}

const AuthContext = createContext<{
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}>({ isAuthenticated: false, login: () => {}, logout: () => {} })
export function useAuth() {
  return useContext(AuthContext)
}

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = useCallback(() => setIsAuthenticated(true), [])
  const logout = useCallback(() => setIsAuthenticated(false), [])

  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}
