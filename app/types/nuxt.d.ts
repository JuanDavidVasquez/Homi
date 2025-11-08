import type { FetchInstance } from 'ofetch'

declare module '#app' {
  interface NuxtApp {
    $api: FetchInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: FetchInstance
  }
}
