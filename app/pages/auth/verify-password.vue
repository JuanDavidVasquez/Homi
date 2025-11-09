<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Hero Section -->
      <div class="login-hero">
        <transition name="fade" mode="out-in">
          <div :key="currentSlide" class="hero-text">
            <h1 v-if="slides[currentSlide]?.title">{{ slides[currentSlide]?.title }}</h1>
            <p>{{ slides[currentSlide]?.subtitle }}</p>
          </div>
        </transition>

        <div class="hero-illustration">
          <img
            :src="slides[currentSlide]?.image"
            :alt="slides[currentSlide]?.alt"
            class="hero-image"
          />
        </div>

        <div class="carousel-dots">
          <span
            v-for="(dot, index) in slides.length"
            :key="index"
            class="dot"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>

      <!-- Login Card -->
      <div class="login-card">
        <div class="card-background">
          <div class="logo-icon">
            <div class="icon-inner">
              <img src="/images/login/edificio.svg" alt="Homi Logo" />
            </div>
          </div>

          <!-- Animación entre login y forgot password -->
          <transition name="fade" mode="out-in">
            <component
              :is="showForgot ? FormVerifyPassword : FormRestarPassword"
              @forgot-password="toggleForm"
              @back-to-login="toggleForm"
              :key="showForgot ? 'forgot' : 'login'"
              class="container-forms"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FormVerifyPassword from '~/components/auth/FormVerifyPassword.vue'
import FormRestarPassword from '~/components/auth/FormRestarPassword.vue'

const showForgot = ref(true)
const currentSlide = ref(0)
const interval = ref<NodeJS.Timeout | null>(null)

// Slides dinámicos
const slides = ref([
  {
    image: '/images/login/carrousel-1.svg',
    alt: 'Gestión eficiente',
    title: 'Gestión Integral',
    subtitle: 'Administra tu conjunto residencial de manera eficiente'
  },
  {
    image: '/images/login/carrousel-2.svg',
    alt: 'Monitoreo en tiempo real',
    title: 'Monitoreo en tiempo real',
    subtitle: 'Supervisa tus operaciones desde cualquier lugar'
  },
  {
    image: '/images/login/carrousel-3.svg',
    alt: 'Control administrativo',
    title: 'Control Administrativo',
    subtitle: 'Optimiza procesos y mejora la comunicación interna'
  }
])

const goToSlide = (index: number) => {
  currentSlide.value = index
  restartAutoSlide()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const restartAutoSlide = () => {
  if (interval.value) clearInterval(interval.value)
  interval.value = setInterval(nextSlide, 4000)
}

onMounted(() => {
  interval.value = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})

const toggleForm = () => {
  showForgot.value = !showForgot.value
}

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})
</script>
<style lang="css" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>