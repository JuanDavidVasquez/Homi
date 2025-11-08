# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.



# Estructura de Carpetas Recomendada para Proyecto Homi

## 📁 Estructura Principal

```
proyecto-homi/
├── 📁 assets/
│   ├── 📁 scss/                      # Arquitectura SCSS 7-1
│   │   ├── 📁 abstracts/             # Sin salida CSS
│   │   │   ├── _variables.scss       # Variables del sistema de diseño
│   │   │   ├── _functions.scss       # Funciones SCSS
│   │   │   ├── _mixins.scss          # Mixins reutilizables
│   │   │   ├── _placeholders.scss    # Placeholders para @extend
│   │   │   └── _animations.scss      # Keyframes y animaciones
│   │   │
│   │   ├── 📁 base/                  # Estilos base y reset
│   │   │   ├── _reset.scss           # Reset CSS moderno
│   │   │   ├── _typography.scss      # Sistema tipográfico
│   │   │   ├── _base.scss            # Estilos base HTML
│   │   │   └── _helpers.scss         # Clases helper globales
│   │   │
│   │   ├── 📁 components/            # Componentes UI
│   │   │   ├── _buttons.scss         # Todos los botones
│   │   │   ├── _cards.scss           # Tarjetas y contenedores
│   │   │   ├── _forms.scss           # Inputs, selects, etc.
│   │   │   ├── _modals.scss          # Modales y diálogos
│   │   │   ├── _tables.scss          # Tablas de datos
│   │   │   ├── _alerts.scss          # Alertas y notificaciones
│   │   │   ├── _badges.scss          # Badges y chips
│   │   │   ├── _dropdowns.scss       # Menús desplegables
│   │   │   ├── _tooltips.scss        # Tooltips y popovers
│   │   │   ├── _avatars.scss         # Avatares de usuario
│   │   │   ├── _loading.scss         # Spinners y skeleton
│   │   │   └── _breadcrumbs.scss     # Migas de pan
│   │   │
│   │   ├── 📁 layouts/               # Estructuras principales
│   │   │   ├── _header.scss          # Header/navbar
│   │   │   ├── _sidebar.scss         # Sidebar de navegación
│   │   │   ├── _footer.scss          # Footer
│   │   │   ├── _navigation.scss      # Sistemas de navegación
│   │   │   ├── _grid.scss            # Sistema de grid
│   │   │   ├── _auth.scss            # Layout de autenticación
│   │   │   └── _admin.scss           # Layout administrativo
│   │   │
│   │   ├── 📁 pages/                 # Estilos específicos de página
│   │   │   ├── _login.scss           # Página de login
│   │   │   ├── _dashboard.scss       # Dashboard
│   │   │   ├── _residents.scss       # Gestión de residentes
│   │   │   ├── _payments.scss        # Pagos y facturas
│   │   │   ├── _profile.scss         # Perfil de usuario
│   │   │   ├── _settings.scss        # Configuración
│   │   │   ├── _reports.scss         # Reportes
│   │   │   └── _error.scss           # Páginas de error
│   │   │
│   │   ├── 📁 themes/                # Temas y variaciones
│   │   │   ├── _default.scss         # Tema por defecto
│   │   │   ├── _dark.scss            # Tema oscuro
│   │   │   ├── _primevue-custom.scss # Personalización PrimeVue
│   │   │   └── _print.scss           # Estilos de impresión
│   │   │
│   │   ├── 📁 utils/                 # Utilidades y overrides
│   │   │   ├── _utilities.scss       # Clases de utilidad
│   │   │   ├── _spacing.scss         # Utilidades de spacing
│   │   │   ├── _colors.scss          # Utilidades de color
│   │   │   ├── _flexbox.scss         # Utilidades flexbox
│   │   │   ├── _grid-utils.scss      # Utilidades de grid
│   │   │   ├── _responsive.scss      # Utilidades responsive
│   │   │   └── _shame.scss           # Fixes temporales
│   │   │
│   │   └── main.scss                 # Archivo principal que importa todo
│   │
│   └── 📁 images/
│       ├── logo.svg
│       ├── buildings.svg
│       └── ...
├── 📁 components/
│   ├── 📁 auth/
│   │   ├── LoginForm.vue
│   │   ├── RegisterForm.vue
│   │   ├── ForgotPasswordForm.vue
│   │   └── SocialLoginButtons.vue
│   ├── 📁 common/
│   │   ├── AppHeader.vue
│   │   ├── AppSidebar.vue
│   │   ├── AppFooter.vue
│   │   ├── LoadingSpinner.vue
│   │   └── EmptyState.vue
│   ├── 📁 dashboard/
│   │   ├── StatsCard.vue
│   │   ├── RecentActivity.vue
│   │   └── QuickActions.vue
│   └── 📁 residents/
│       ├── ResidentCard.vue
│       ├── ResidentList.vue
│       └── ResidentForm.vue
│
├── 📁 composables/
│   ├── useAuth.ts               # Lógica de autenticación
│   ├── useApi.ts                # Llamadas API
│   ├── useNotifications.ts      # Sistema de notificaciones
│   ├── usePermissions.ts        # Manejo de permisos
│   └── useValidation.ts         # Validaciones de formularios
│
├── 📁 layouts/
│   ├── default.vue              # Layout principal (autenticado)
│   ├── auth.vue                 # Layout para páginas de auth
│   ├── admin.vue                # Layout para admin
│   └── error.vue                # Layout para páginas de error
│
├── 📁 middleware/
│   ├── auth.ts                  # Verificar autenticación
│   ├── guest.ts                 # Solo usuarios no autenticados
│   ├── role.ts                  # Verificar roles
│   └── permission.ts            # Verificar permisos específicos
│
├── 📁 pages/
│   ├── index.vue                # Landing page
│   ├── login.vue                # Página de login
│   ├── register.vue             # Página de registro
│   ├── forgot-password.vue      # Recuperar contraseña
│   ├── 📁 dashboard/
│   │   └── index.vue            # Dashboard principal
│   ├── 📁 residents/
│   │   ├── index.vue            # Lista de residentes
│   │   ├── [id].vue             # Detalle de residente
│   │   └── create.vue           # Crear residente
│   ├── 📁 payments/
│   │   ├── index.vue            # Lista de pagos
│   │   └── [id].vue             # Detalle de pago
│   ├── 📁 admin/
│   │   ├── index.vue            # Panel de admin
│   │   ├── users.vue            # Gestión de usuarios
│   │   └── settings.vue         # Configuración
│   └── 📁 profile/
│       ├── index.vue            # Perfil de usuario
│       └── edit.vue             # Editar perfil
│
├── 📁 plugins/
│   ├── primevue.ts              # Configuración de PrimeVue
│   ├── api.ts                   # Cliente API
│   └── auth.client.ts           # Inicialización de auth (client-side)
│
├── 📁 public/
│   ├── favicon.ico
│   └── ...
│
├── 📁 server/
│   ├── 📁 api/
│   │   ├── 📁 auth/
│   │   │   ├── login.post.ts
│   │   │   ├── logout.post.ts
│   │   │   ├── register.post.ts
│   │   │   └── refresh.post.ts
│   │   ├── 📁 residents/
│   │   │   ├── index.get.ts
│   │   │   ├── [id].get.ts
│   │   │   └── index.post.ts
│   │   └── ...
│   ├── 📁 middleware/
│   │   └── auth.ts              # Middleware de auth del servidor
│   └── 📁 utils/
│       ├── jwt.ts               # Utilidades JWT
│       └── database.ts          # Conexión a BD
│
├── 📁 stores/
│   ├── auth.ts                  # Store de autenticación
│   ├── residents.ts             # Store de residentes
│   ├── payments.ts              # Store de pagos
│   └── notifications.ts         # Store de notificaciones
│
├── 📁 types/
│   ├── auth.ts                  # Tipos de autenticación
│   ├── api.ts                   # Tipos de API
│   ├── models.ts                # Modelos de datos
│   └── index.ts                 # Exportaciones principales
│
├── 📁 utils/
│   ├── constants.ts             # Constantes de la aplicación
│   ├── formatters.ts            # Formateadores (fecha, moneda, etc)
│   ├── validators.ts            # Funciones de validación
│   └── helpers.ts               # Funciones auxiliares
│
├── app.vue                      # Componente raíz
├── nuxt.config.ts               # Configuración de Nuxt
├── package.json
├── tsconfig.json
└── .env                         # Variables de entorno
```

## 🔐 Manejo de Autenticación

### 1. **Flujo de Autenticación**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        // configuración de Redis para sesiones
      }
    }
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: process.env.API_BASE_URL
    }
  }
})
```

### 2. **Protección de Rutas**

```vue
<!-- pages/dashboard/index.vue -->
<template>
  <div>Dashboard Content</div>
</template>

<script setup>
// Esta página requiere autenticación
definePageMeta({
  middleware: 'auth'
})
</script>
```

### 3. **Rutas por Rol**

```vue
<!-- pages/admin/index.vue -->
<script setup>
definePageMeta({
  middleware: ['auth', 'role'],
  requiredRole: 'admin'
})
</script>
```

### 4. **Plugin de Inicialización de Auth**

```typescript
// plugins/auth.client.ts
export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Inicializar auth al cargar la aplicación
  await authStore.initAuth()
})
```

## 🎯 Mejores Prácticas

### 1. **Componentes Modulares**
- Un componente por archivo
- Componentes pequeños y reutilizables
- Props tipadas con TypeScript
- Emits documentados

### 2. **Gestión de Estado**
- Usar Pinia para estado global
- Composables para lógica compartida
- Estado local con `ref` y `reactive`

### 3. **Llamadas API**
- Centralizar en composables
- Manejo de errores consistente
- Loading states
- Retry logic para errores de red

### 4. **Seguridad**
- Tokens JWT con refresh tokens
- HTTPS en producción
- Validación en cliente y servidor
- Sanitización de inputs
- CORS configurado correctamente

### 5. **Performance**
- Lazy loading de componentes
- Code splitting automático
- Imágenes optimizadas
- Caching estratégico

## 🔄 Flujo de Trabajo Recomendado

### Para Usuario No Autenticado:
```
1. Usuario accede a ruta protegida
2. Middleware 'auth' detecta que no hay token
3. Redirección a /login
4. Usuario se autentica
5. Token se guarda en cookie httpOnly
6. Redirección a ruta original
```

### Para Usuario Autenticado:
```
1. Token se valida en cada request
2. Si token expira, se intenta refrescar
3. Si refresh falla, logout automático
4. Permisos se verifican en middleware
```

## 📝 Ejemplo de Uso en Páginas

### Página Pública
```vue
<!-- pages/index.vue -->
<template>
  <div>Landing Page - Acceso público</div>
</template>
```

### Página Protegida
```vue
<!-- pages/dashboard/index.vue -->
<template>
  <div>
    <h1>Bienvenido, {{ user?.firstName }}</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
</script>
```

### Página con Permisos
```vue
<!-- pages/admin/users.vue -->
<template>
  <div v-if="can('manage_users')">
    <!-- Contenido admin -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'role'],
  requiredRole: 'admin',
  requiredPermissions: ['manage_users']
})

const { can } = useAuth()
</script>
```

## 🛠️ Configuración Inicial

```bash
# Instalar dependencias
npm install @pinia/nuxt @vueuse/nuxt @primevue/nuxt-module

# Variables de entorno (.env)
JWT_SECRET=your-secret-key
API_BASE_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
```

Esta estructura te permitirá:
- ✅ Escalar fácilmente el proyecto
- ✅ Mantener código organizado
- ✅ Reutilizar componentes
- ✅ Gestionar autenticación de forma segura
- ✅ Implementar autorización basada en roles
- ✅ Manejar estado de forma eficiente