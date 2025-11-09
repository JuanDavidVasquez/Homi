// middleware/role.global.ts
import { useAuthStore } from '~/store/auth.store'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Cargar sesión si hace falta
  if (process.client && !authStore.isAuthenticated) {
    authStore.loadSession()
  }

  // Evitar bucle si ya está en login o register
  const publicPages = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/verify-password']

  if (publicPages.includes(to.path)) return

  // Si no está autenticado, redirigir
  if (!authStore.isAuthenticated) {
    const redirectCookie = useCookie('redirect-after-login')
    redirectCookie.value = to.fullPath
    return navigateTo('/auth/login')
  }

  // Roles requeridos
  const requiredRoles = (to.meta.roles || []) as string[]
  if (!requiredRoles.length) return

  const userRole = authStore.user?.role
  if (!userRole || !requiredRoles.includes(userRole)) {
    return navigateTo('/403')
  }

  return
})
