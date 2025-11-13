export interface AdminRoute {
  name: string        // Identificador único
  label: string       // Texto que se muestra en el sidebar
  icon: string        // Icono de PrimeIcons (ej: 'pi pi-home')
  path: string        // Ruta de la página (ej: '/dashboard')
  badge?: {           // Badge opcional (ej: contador de notificaciones)
    value: string | number
    severity?: 'success' | 'info' | 'warning' | 'danger'
  }
}

export interface AdminSection {
  title: string       // Título de la sección (ej: 'Principal')
  routes: AdminRoute[]
}

// ============================================================================
// RUTAS DEL ADMIN
// ============================================================================

export const adminRoutes: AdminSection[] = [
  // Sección: Principal
  {
    title: 'Principal',
    routes: [
      {
        name: 'dashboard',
        label: 'Dashboard',
        icon: 'pi pi-home',
        path: '/dashboard'
      }
    ]
  },

  // Sección: Usuarios
  {
    title: 'Usuarios',
    routes: [
      {
        name: 'users',
        label: 'Usuarios',
        icon: 'pi pi-users',
        path: '/users'
      },
      {
        name: 'admins',
        label: 'Administradores',
        icon: 'pi pi-shield',
        path: '/admins'
      }
    ]
  },

  // Sección: Estructura
  {
    title: 'Estructura',
    routes: [
      {
        name: 'towers',
        label: 'Torres',
        icon: 'pi pi-building',
        path: '/towers'
      },
      {
        name: 'apartments',
        label: 'Apartamentos',
        icon: 'pi pi-home',
        path: '/apartments'
      }
    ]
  },

  // Sección: Configuración
  {
    title: 'Configuración',
    routes: [
      {
        name: 'settings',
        label: 'Configuración',
        icon: 'pi pi-cog',
        path: '/settings'
      }
    ]
  }
]