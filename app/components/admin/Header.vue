<template>
  <header class="admin-header" :class="{ collapsed: isCollapsed }">
    <div class="header-left">
      <div class="page-title">
        <h1>Dashboard</h1>
      </div>
    </div>

    <div class="header-right">
      <button class="header-icon-button">
        <i class="pi pi-bell"></i>
        <span class="notification-badge">3</span>
      </button>

      <div class="user-menu">
        <button class="user-menu-trigger" @click="toggleUserMenu">
          <div class="user-avatar-small">U</div>
          <span class="user-name-header">Usuario</span>
          <i class="pi pi-chevron-down"></i>
        </button>

        <Transition name="dropdown">
          <div v-if="isUserMenuOpen" class="user-dropdown">
            <div class="dropdown-header">
              <div class="dropdown-avatar">U</div>
              <div class="dropdown-user-info">
                <span class="dropdown-user-name">Usuario</span>
                <span class="dropdown-user-email">usuario@email.com</span>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item">
                  <i class="pi pi-user"></i>
                  <span>Mi Perfil</span>
                </button>
              </li>
              <li>
                <button class="dropdown-item logout">
                  <i class="pi pi-sign-out"></i>
                  <span>Cerrar Sesión</span>
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '~/composables/useSidebar'

const { isCollapsed } = useSidebar()

const searchQuery = ref('')
const isUserMenuOpen = ref(false)

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-8px);
}
</style>