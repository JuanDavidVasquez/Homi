<template>
  <div class="dashboard-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <p class="page-description">
          Bienvenido de vuelta, {{ userName }}. Aquí está el resumen de tu conjunto residencial.
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon success">
              <i class="pi pi-users"></i>
            </div>
            <div class="stat-details">
              <span class="stat-label">Total Residentes</span>
              <span class="stat-value">324</span>
              <span class="stat-change positive">
                <i class="pi pi-arrow-up"></i> 12% vs mes anterior
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon primary">
              <i class="pi pi-building"></i>
            </div>
            <div class="stat-details">
              <span class="stat-label">Torres Activas</span>
              <span class="stat-value">8</span>
              <span class="stat-change neutral">
                Sin cambios
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon warning">
              <i class="pi pi-home"></i>
            </div>
            <div class="stat-details">
              <span class="stat-label">Apartamentos</span>
              <span class="stat-value">156</span>
              <span class="stat-change positive">
                <i class="pi pi-arrow-up"></i> 4 nuevos
              </span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon info">
              <i class="pi pi-dollar"></i>
            </div>
            <div class="stat-details">
              <span class="stat-label">Ingresos Mensuales</span>
              <span class="stat-value">$45,230</span>
              <span class="stat-change positive">
                <i class="pi pi-arrow-up"></i> 8.2% de incremento
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Recent Activity -->
      <Card class="activity-card">
        <template #header>
          <div class="card-header">
            <h3>Actividad Reciente</h3>
            <Button 
              label="Ver todo" 
              text 
              size="small"
              icon="pi pi-arrow-right"
              iconPos="right"
            />
          </div>
        </template>
        <template #content>
          <div class="activity-list">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="activity-item"
            >
              <div :class="['activity-icon', activity.type]">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-content">
                <p class="activity-title">{{ activity.title }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Quick Actions -->
      <Card class="quick-actions-card">
        <template #header>
          <div class="card-header">
            <h3>Acciones Rápidas</h3>
          </div>
        </template>
        <template #content>
          <div class="quick-actions-grid">
            <button 
              v-for="action in quickActions"
              :key="action.id"
              class="quick-action-btn"
              @click="handleQuickAction(action)"
            >
              <i :class="action.icon"></i>
              <span>{{ action.label }}</span>
            </button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth.store'
import Card from 'primevue/card'
import Button from 'primevue/button'

definePageMeta({
  layout: 'admin',
  middleware: ['guest']
})

const authStore = useAuthStore()

// Computed
const userName = computed(() => {
  return authStore.user?.firstName || 'Usuario'
})

// Data
const recentActivities = ref([
  {
    id: 1,
    type: 'success',
    icon: 'pi pi-check-circle',
    title: 'Nuevo residente registrado en Torre A',
    time: 'Hace 5 minutos'
  },
  {
    id: 2,
    type: 'warning',
    icon: 'pi pi-exclamation-triangle',
    title: 'Mantenimiento programado para el ascensor 3',
    time: 'Hace 15 minutos'
  },
  {
    id: 3,
    type: 'info',
    icon: 'pi pi-info-circle',
    title: 'Pago recibido de Apt. 304',
    time: 'Hace 1 hora'
  },
  {
    id: 4,
    type: 'primary',
    icon: 'pi pi-user-plus',
    title: 'Nueva solicitud de visitante',
    time: 'Hace 2 horas'
  }
])

const quickActions = ref([
  { id: 1, icon: 'pi pi-user-plus', label: 'Agregar Residente', action: 'add-resident' },
  { id: 2, icon: 'pi pi-file-invoice', label: 'Nueva Factura', action: 'new-invoice' },
  { id: 3, icon: 'pi pi-megaphone', label: 'Crear Anuncio', action: 'new-announcement' },
  { id: 4, icon: 'pi pi-calendar', label: 'Agendar Evento', action: 'schedule-event' }
])

// Methods
const handleQuickAction = (action: any) => {
  console.log('Quick action:', action)
  // Implementar navegación según la acción
}
</script>

