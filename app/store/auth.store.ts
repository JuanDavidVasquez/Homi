import { defineStore } from 'pinia'
import type { AuthState, User, LoginCredentials, AuthResponse } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    fullName: (state) =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    userRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admin',
    isResident: (state) => state.user?.role === 'resident',
    isGuard: (state) => state.user?.role === 'guard'
  },

  actions: {
    // ✅ Guardar usuario y token
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
      if (process.client) {
        localStorage.setItem('userData', JSON.stringify(user))
      }
    },

    setToken(token: string, refreshToken?: string) {
      this.token = token
      if (refreshToken) this.refreshToken = refreshToken
      if (process.client) {
        localStorage.setItem('authToken', token)
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken)
        }
      }
    },

    // ✅ Cargar sesión desde localStorage
    loadSession() {
      if (!process.client) return

      const userData = localStorage.getItem('userData')
      const token = localStorage.getItem('authToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (userData && token) {
        this.user = JSON.parse(userData)
        this.token = token
        this.refreshToken = refreshToken
        this.isAuthenticated = true
      }
    },

    // ✅ Limpiar sesión
    clearSession() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('userData')
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
      }
    },

    // ✅ Logout
    async logout() {
      this.clearSession()
      const router = useRouter()
      await router.push('/login')
    },

    // ✅ Login principal con $fetch (Nuxt 4)
    async login(credentials: LoginCredentials) {
      this.isLoading = true
      this.error = null
      const config = useRuntimeConfig()

      try {
        const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/login`, {
          method: 'POST',
          body: credentials
        })

        if (!response?.data?.user || !response?.data?.token) {
          throw new Error('Respuesta inválida del servidor')
        }

        const { user, token, refreshToken } = response.data
        this.setUser(user)
        this.setToken(token, refreshToken)

        return response
      } catch (err: any) {
        this.error = err?.response?._data?.message || 'Error de autenticación'
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
