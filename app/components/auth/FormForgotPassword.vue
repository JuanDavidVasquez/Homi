<template>
  <div>
    <div class="card-header">
      <h2>Recuperar contraseña</h2>
      <p>Ingresa tu correo para recibir instrucciones</p>
    </div>

    <form class="login-form" @submit.prevent="handleForgot">
      <!-- Email -->
      <div class="form-group">
        <label class="form-label" for="email">Correo electrónico</label>
        <div class="input-with-icon">
          <div class="input-icon">
            <i class="pi pi-envelope"></i>
          </div>
          <InputText
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="correo@email.com"
            :invalid="!!errors.email"
          />
        </div>
        <small v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</small>
      </div>

      <!-- Back link -->
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

    <!-- ModalEmail -->
    <ModalEmail
      :show="showModal"
      data="Te hemos enviado un código a tu correo electrónico para verificar tu cuenta."
      image="/login/mail-check-fill.svg" 
      buttonText="Verificar"
      title="Verificación de correo"
      returnUrl="/auth/verify-password"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import ModalEmail from '~/components/ui/ModalEmail.vue'
import { z } from 'zod'

const toast = useToast()
const isLoading = ref(false)
const errors = ref<Record<string, string>>({})
const showModal = ref(false)

const formData = ref({ email: '' })

// Validación con zod
const forgotSchema = z.object({
  email: z.string().email('Correo inválido')
})

const validateForm = (): boolean => {
  const result = forgotSchema.safeParse(formData.value)
  if (!result.success) {
    errors.value = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])
    )
    return false
  }
  errors.value = {}
  return true
}

const handleForgot = async () => {
  if (!validateForm()) return
  isLoading.value = true
  try {
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mostrar modal
    showModal.value = true

    // Limpiar form
    formData.value.email = ''
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

const handleModalClose = () => {
  showModal.value = false
}
</script>
