import { useAuthStore } from '~/store/auth.store'
import { useLocalePath } from '#i18n'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  // Evitar bucles en rutas públicas
  const publicPages = ['/login', '/register', '/forgot-password']
  if (publicPages.includes(to.path)) return

  // Cargar sesión si hace falta
  if (process.client && !authStore.isAuthenticated) {
    authStore.loadSession()
  }

  // Si no está autenticado → al login
  if (!authStore.isAuthenticated) {
    const loginPath = localePath('/login')
    if (to.path !== loginPath) {
      const redirectCookie = useCookie('redirect-after-login')
      redirectCookie.value = to.fullPath
      return navigateTo(loginPath)
    }
  }

  // Si no requiere permisos específicos, continuar
  const requiredPermissions = (to.meta.permissions || []) as string[]
  if (!requiredPermissions.length) return

  // Verificar permisos del usuario
  const userPermissions = authStore.user?.permissions || []
  const hasAll = requiredPermissions.every((perm) =>
    userPermissions.includes(perm)
  )

  if (!hasAll) {
    return navigateTo('/403')
  }
})
