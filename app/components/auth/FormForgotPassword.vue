<template>
  <div>
    <div class="card-header">
      <h2>Recuperar contraseña</h2>
      <p>Ingresa tu correo para recibir instrucciones</p>
    </div>

    <form class="login-form" @submit.prevent="handleForgot">
      <div class="form-group">
        <label class="form-label" for="email">Correo electrónico</label>
        <InputText
          id="email"
          v-model="email"
          placeholder="correo@email.com"
        />
      </div>

      <div class="form-options">
        <NuxtLink @click.prevent="$emit('back-to-login')" class="forgot-link">
          Volver al login
        </NuxtLink>
      </div>

      <Button
        type="submit"
        label="Enviar"
        class="submit-button"
        :loading="isLoading"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const email = ref('')
const isLoading = ref(false)

const handleForgot = async () => {
  isLoading.value = true
  try {
    // Aquí tu lógica de recuperar contraseña
    toast.add({
      severity: 'success',
      summary: 'Correo enviado',
      detail: `Se ha enviado un enlace a ${email.value}`,
      life: 3000
    })
    email.value = ''
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo enviar el correo',
      life: 4000
    })
  } finally {
    isLoading.value = false
  }
}
</script>
