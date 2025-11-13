<template>
  <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="logo-icon">H</div>
        <div class="logo-text" v-if="!isCollapsed">
          <span class="logo-title">Homi</span>
          <span class="logo-subtitle">Gestión Integral</span>
        </div>
      </div>
      <button class="sidebar-toggle" @click="toggle">
        <i :class="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div class="sidebar-scroll">
        <!-- Recorremos las secciones -->
        <div v-for="section in adminRoutes" :key="section.title" class="nav-section">
          <div class="nav-section-title" v-if="!isCollapsed">
            {{ section.title }}
          </div>

          <ul class="nav-list">
            <!-- Recorremos las rutas dentro de cada sección -->
            <li class="nav-item" v-for="route in section.routes" :key="route.name">
              <router-link :to="route.path" class="nav-link" active-class="active" exact-active-class="active">
                <i :class="route.icon"></i>
                <span class="nav-label" v-if="!isCollapsed">{{ route.label }}</span>
              </router-link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-profile">
        <Avatar class="user-avatar" label="U" size="normal" shape="circle" />
        <div class="user-info" v-if="!isCollapsed">
          <span class="user-name">Usuario</span>
          <span class="user-role">Administrador</span>
        </div>
        <button class="logout-button">
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebar } from '~/composables/useSidebar'
import { adminRoutes } from '~/routes/admin'

const { isCollapsed, toggle } = useSidebar()
</script>
