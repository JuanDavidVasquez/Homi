import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    loading: false,
    locale:
      (typeof window !== 'undefined'
        ? localStorage.getItem('userLocale')
        : null) || 'es'
  }),

  actions: {
    // ✅ Control de carga global
    setLoading(value: boolean) {
      this.loading = value
    },

    // ✅ Cambiar idioma globalmente
    changeLanguage(lang: 'es' | 'en') {
      const { $i18n } = useNuxtApp()
      this.locale = lang
      $i18n.locale.value = lang

      if (typeof window !== 'undefined') {
        localStorage.setItem('userLocale', lang)
      }
    }
  }
})
