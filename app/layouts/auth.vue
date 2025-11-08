<!-- layouts/auth.vue -->
<template>
  <div class="auth-layout min-h-screen flex flex-col bg-[var(--color-bg-secondary)]">
    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Si quieres manejar un tema global o estilos SCSS, este layout es ideal para eso
</script>

<style lang="scss" scoped>
.auth-layout {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: $font-family-primary;
}
</style>
