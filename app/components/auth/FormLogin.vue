<template>
  <div>
    <div class="card-header">
      <h2>Bienvenido a Homi</h2>
      <p>Inicia sesión con tus credenciales</p>
    </div>

    <form class="login-form" @submit.prevent="handleLogin">
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

      <!-- Password -->
      <div class="form-group">
        <label class="form-label" for="password">Contraseña</label>
        <div class="input-with-icon">
          <div class="input-icon">
            <i class="pi pi-lock"></i>
          </div>
          <Password
            id="password"
            v-model="formData.password"
            placeholder="••••••••"
            toggleMask
            :feedback="false"
            :invalid="!!errors.password"
          />
        </div>
        <small v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</small>
      </div>

      <!-- Remember & Forgot -->
      <div class="form-options">
        <div class="form-checkbox">
          <Checkbox v-model="formData.rememberMe" inputId="remember" binary />
          <label for="remember">Recordarme</label>
        </div>
        <NuxtLink @click.prevent="$emit('forgot-password')" class="forgot-link">
          ¿Olvidaste tu contraseña?
        </NuxtLink>
      </div>

      <Button
        type="submit"
        label="Iniciar sesión"
        class="submit-button"
        :loading="isLoading"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '~/store/auth.store'
import { loginSchema, type LoginSchema } from '~/schemas/auth.shema'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref<LoginSchema>({
  email: '',
  password: '',
  rememberMe: false
})

const validateForm = (): boolean => {
  const result = loginSchema.safeParse(formData.value)
  if (!result.success) {
    errors.value = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])
    )
    return false
  }
  errors.value = {}
  return true
}

const handleLogin = async () => {
  if (!validateForm()) return
  isLoading.value = true
  try {
    await authStore.login(formData.value)
    toast.add({
      severity: 'success',
      summary: 'Bienvenido',
      detail: `Hola ${authStore.user?.firstName || ''}`,
      life: 3000
    })
    router.push('/dashboard')
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error de autenticación',
      detail: error?.response?._data?.message || 'Credenciales inválidas',
      life: 4000
    })
  } finally {
    isLoading.value = false
  }
}
</script>
