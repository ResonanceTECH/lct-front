import { useState, useEffect, useCallback } from 'react'
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth'
import { authService } from '@/services/api'

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken()
        if (token) {
          const user = await authService.getCurrentUser()
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Ошибка инициализации',
        })
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await authService.login(credentials)
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  const register = useCallback(async (userData: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await authService.register(userData)
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    }
  }, [])

  const updateUser = useCallback((user: User) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }))
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  const hasPermission = useCallback((permission: string) => {
    if (!authState.user) return false
    return authState.user.permissions.includes(permission as any)
  }, [authState.user])

  const hasRole = useCallback((role: string) => {
    if (!authState.user) return false
    return authState.user.role === role
  }, [authState.user])

  const hasAnyRole = useCallback((roles: string[]) => {
    if (!authState.user) return false
    return roles.includes(authState.user.role)
  }, [authState.user])

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    clearError,
    hasPermission,
    hasRole,
    hasAnyRole,
  }
}

export default useAuth
