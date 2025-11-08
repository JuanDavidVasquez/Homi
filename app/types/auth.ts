// types/auth.ts

export type UserRole =
  | 'admin'
  | 'resident'
  | 'guard'
  | 'maintenance'
  | 'visitor'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: UserRole
  permissions?: string[]
  apartment?: string
  building?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  apartment?: string
  building?: string
  role?: UserRole
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    refreshToken: string
    expiresIn: number
  }
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  confirmPassword: string
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
