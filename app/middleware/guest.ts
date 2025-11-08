import { useAuthStore } from '~/store/auth.store'
import { useLocalePath } from '#i18n'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  const localePath = useLocalePath()

  // Cargar sesión si existe
  if (process.client && !auth.isAuthenticated) {
    auth.loadSession()
  }

  // Si ya está autenticado, redirigir al dashboard
  if (auth.isAuthenticated) {
    const dashboardPath = localePath('/dashboard')

    // Evita bucle (redirige solo si no estás ahí)
    if (useRoute().path !== dashboardPath) {
      return navigateTo(dashboardPath)
    }
  }
})
