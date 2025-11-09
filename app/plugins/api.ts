export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Crea una instancia personalizada de $fetch
  const api = $fetch.create({
    baseURL: config.public.apiBase as string, // ej: "https://api.tuservidor.com"
    credentials: 'include',

    onRequest({ options }) {
      const token = useCookie('token').value

      if (token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)
        options.headers = headers
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        const router = useRouter()
        router.push('/login')
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
