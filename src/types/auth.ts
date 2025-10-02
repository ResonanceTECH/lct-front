export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  permissions: Permission[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export type UserRole = 'admin' | 'manager' | 'supervisor' | 'worker' | 'client'

export type Permission = 
  | 'objects:read'
  | 'objects:write'
  | 'objects:delete'
  | 'materials:read'
  | 'materials:write'
  | 'materials:delete'
  | 'violations:read'
  | 'violations:write'
  | 'violations:delete'
  | 'remarks:read'
  | 'remarks:write'
  | 'remarks:delete'
  | 'reports:read'
  | 'reports:write'
  | 'users:read'
  | 'users:write'
  | 'users:delete'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  phone: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  phone: string
  password: string
  role: UserRole
}

export type UserRole = 'CUSTOMER' | 'FOREMAN' | 'INSPECTOR' | 'ADMIN'

export interface AuthResponse {
  jwt: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileData {
  name: string
  email: string
  avatar?: File
  company?: string
}
