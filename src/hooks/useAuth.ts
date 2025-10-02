import { useState, useEffect, useCallback } from 'react'
import { AuthState, LoginCredentials, RegisterData } from '@/types/auth'
import { authService } from '@/services/api'

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = authService.getToken()
        setAuthState({
          isAuthenticated: !!token,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
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
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    }
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  }
}

export default useAuth
