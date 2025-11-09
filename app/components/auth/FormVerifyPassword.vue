<template>

      <!-- Verify Code Card -->
      <div class="verify-code-card">

        <div class="card-header">
          <h2>Verificar código</h2>
          <p>
            Hemos enviado un mensaje a la cuenta de correo que registraste
            <strong>{{ email }}</strong>, por favor verifica el código.
          </p>
        </div>

        <!-- Formulario -->
        <form class="verify-code-form" @submit.prevent="handleVerifyCode">
          <!-- Código de verificación: un input por dígito -->
          <div class="form-group">
            <InputText
              v-for="(digit, index) in verificationCode.length"
              :key="index"
              v-model="verificationCode[index]"
              type="text"
              maxlength="1"
              class="code-input"
              @input="focusNext($event, index)"
            />
          </div>
          <small v-if="errors.code" class="error-text">{{ errors.code }}</small>

          <!-- Timer -->
          <div class="timer-display">
            {{ formatTime(timer) }}
          </div>

          <!-- Reenviar código -->
          <Button
            type="button"
            label="Reenviar código"
            class="resend-button"
            :disabled="timer > 0"
            @click="handleResendCode"
            outlined
          />

          <!-- Submit -->
          <Button
            type="submit"
            label="Verificar"
            class="submit-button"
            :loading="isLoading"
          />
        </form>
      </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
const toast = useToast()

// Estado
const isLoading = ref(false)
const verificationCode = ref(Array(6).fill('')) // Array de 6 dígitos
const timer = ref(300) // 5 minutos en segundos
const email = ref(route.query.email || 'juan.correa@email.com')
const errors = ref<Record<string, string>>({})

// Formatear tiempo (mm:ss)
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} min`
}

// Enfocar siguiente input
const focusNext = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.value.length === 1 && index < verificationCode.value.length - 1) {
    const nextInput = input.nextElementSibling as HTMLInputElement
    nextInput?.focus()
  }
}

// Temporizador
let timerInterval: NodeJS.Timeout | null = null
const startTimer = () => {
  timer.value = 300
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else if (timerInterval) clearInterval(timerInterval)
  }, 1000)
}

// Validación
const validateCode = (): boolean => {
  errors.value = {}
  const code = verificationCode.value.join('')
  if (!code) {
    errors.value.code = 'El código de verificación es requerido'
    return false
  }
  if (!/^\d{6}$/.test(code)) {
    errors.value.code = 'El código debe tener 6 dígitos'
    return false
  }
  return true
}

// Verificar código
const handleVerifyCode = async () => {
  if (!validateCode()) return
  isLoading.value = true
  try {
    // Simulación
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.add({
      severity: 'success',
      summary: 'Código verificado',
      detail: 'Tu cuenta ha sido verificada exitosamente',
      life: 3000
    })
    router.push('/reset-password')
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error de verificación',
      detail: error?.message || 'Código inválido o expirado',
      life: 4000
    })
  } finally {
    isLoading.value = false
  }
}

// Reenviar código
const handleResendCode = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.add({
      severity: 'success',
      summary: 'Código reenviado',
      detail: 'Se ha enviado un nuevo código a tu correo',
      life: 3000
    })
    startTimer()
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error?.message || 'No se pudo reenviar el código',
      life: 4000
    })
  }
}

// Lifecycle
onMounted(() => startTimer())
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})
</script>
