import { useAuthStore } from '~/store/auth.store'
import { useLocalePath } from '#i18n'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const localePath = useLocalePath()

  // Si no está autenticado, cargar sesión
  if (process.client && !auth.isAuthenticated) {
    auth.loadSession()
  }

  // Si no está autenticado, redirigir al login
  if (!auth.isAuthenticated) {
    const loginPath = localePath('/auth/login')

    // 🔒 Evitar bucles
    if (to.path !== loginPath) {
      return navigateTo(loginPath)
    }
  }
})
