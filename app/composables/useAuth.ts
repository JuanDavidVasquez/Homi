import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '~/store/auth.store'

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation?: string
}

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()
  const { $api } = useNuxtApp()

  // 🟦 Helpers de permisos / roles (si el backend lo maneja)
  const can = (permission: string): boolean => {
    return authStore.user?.permissions?.includes(permission) || false
  }

  const hasRole = (role: string): boolean => {
    return authStore.user?.role === role
  }

  // 🟩 Login
  const login = async (credentials: LoginCredentials) => {
    try {
      const { data } = await $api.auth.login(credentials)

      authStore.setUser(data.user)
      authStore.setToken(data.token)

      toast.add({
        severity: 'success',
        summary: 'Bienvenido',
        detail: `Hola ${data.user.name}`,
        life: 3000
      })

      const redirectCookie = useCookie('redirect-after-login')
      const redirectUrl = redirectCookie.value || '/dashboard'
      redirectCookie.value = null

      await router.push(redirectUrl)
      return data
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error de autenticación',
        detail: error.response?.data?.message || 'Credenciales inválidas',
        life: 4000
      })
      throw error
    }
  }

  // 🟥 Logout
  const logout = async () => {
    try {
      authStore.clearSession()
      toast.add({
        severity: 'info',
        summary: 'Sesión cerrada',
        detail: 'Has cerrado sesión exitosamente',
        life: 3000
      })
      await router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // 🟨 Register
  const register = async (data: RegisterData) => {
    try {
      const { data: result } = await $api.auth.register(data)

      authStore.setUser(result.user)
      authStore.setToken(result.token)

      toast.add({
        severity: 'success',
        summary: 'Registro exitoso',
        detail: 'Tu cuenta ha sido creada exitosamente',
        life: 3000
      })

      await router.push('/dashboard')
      return result
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error de registro',
        detail: error.response?.data?.message || 'Error al registrar la cuenta',
        life: 5000
      })
      throw error
    }
  }

  // 🟦 Forgot / Reset password
  const requestPasswordReset = async (email: string) => {
    try {
      await $api.auth.requestPasswordReset({ email })

      toast.add({
        severity: 'success',
        summary: 'Correo enviado',
        detail: 'Revisa tu correo para restablecer tu contraseña',
        life: 4000
      })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Error al enviar el correo',
        life: 4000
      })
      throw error
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      await $api.auth.resetPassword({ token, password })
      toast.add({
        severity: 'success',
        summary: 'Contraseña actualizada',
        detail: 'Tu contraseña ha sido restablecida',
        life: 3000
      })
      await router.push('/login')
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Error al restablecer la contraseña',
        life: 4000
      })
      throw error
    }
  }

  // 🟩 Perfil
  const updateProfile = async (data: Partial<any>) => {
    try {
      const { data: result } = await $api.auth.updateProfile(data)
      authStore.setUser(result.user)

      toast.add({
        severity: 'success',
        summary: 'Perfil actualizado',
        detail: 'Tu información ha sido actualizada',
        life: 3000
      })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Error al actualizar el perfil',
        life: 4000
      })
      throw error
    }
  }

  return {
    // Computed
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    isAuthenticated: computed(() => authStore.isAuthenticated),

    // Roles y permisos
    can,
    hasRole,

    // Acciones
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    updateProfile
  }
}
