<template>
  <div class="admin-layout">
    <AdminSidebar />

    <div class="admin-main" :class="{ collapsed: isCollapsed }">
      <AdminHeader />

      <main class="admin-content">
        <NuxtPage />
      </main>

      <footer class="admin-footer">
        <p>© {{ currentYear }} Homi - Gestión Integral</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSidebar } from '~/composables/useSidebar'

const { isCollapsed } = useSidebar()
const currentYear = computed(() => new Date().getFullYear())
</script>