<template>
  <Dialog :visible="show" :modal="true" :closable="false" class="modal-email" @hide="handleClose">
    <h3 class="modal-title">{{ title }}</h3>
    <div class="modal-content">
      <!-- Imagen -->
      <div v-if="image" class="modal-image">
        <img :src="`/images/${image}`" alt="Modal Image" />
      </div>

      <!-- Data / Texto -->
      <div class="modal-text">
        <p>{{ data }}</p>
      </div>

      <!-- Botón de acción -->
      <div class="modal-footer">
        <Button :label=buttonText class="submit-button" @click="handleClose" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRouter } from '#app' // <-- importante en Nuxt 4
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const router = useRouter()

const props = defineProps<{
  show: boolean
  data: string
  image?: string
  buttonText?: string
  title?: string
  returnUrl?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
  if (props.returnUrl) {
    router.push(props.returnUrl)
  }
}
</script>
