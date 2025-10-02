import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '@/types/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://lct-back.kixylab.ru'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/sign/in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка входа в систему')
    }

    const data = await response.json()

    // Store JWT token in localStorage
    localStorage.setItem('jwt', data.jwt)

    return data
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/sign/up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка регистрации')
    }

    const data = await response.json()

    // Store JWT token in localStorage
    localStorage.setItem('jwt', data.jwt)

    return data
  }

  async logout(): Promise<void> {
    // Clear stored JWT token
    localStorage.removeItem('jwt')
  }


  getToken(): string | null {
    return localStorage.getItem('jwt')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
export default authService
