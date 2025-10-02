import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordData,
  UpdateProfileData
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

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${this.baseUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        await this.refreshToken()
        return this.getCurrentUser()
      }
      throw new Error('Failed to get current user')
    }

    return response.json()
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      throw new Error('No refresh token found')
    }

    const response = await fetch(`${this.baseUrl}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      // Refresh failed, clear tokens
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)

    return data.token
  }

  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка запроса сброса пароля')
    }
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    const response = await fetch(`${this.baseUrl}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка сброса пароля')
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${this.baseUrl}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка изменения пароля')
    }
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    if (data.company) formData.append('company', data.company)
    if (data.avatar) formData.append('avatar', data.avatar)

    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Ошибка обновления профиля')
    }

    return response.json()
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
