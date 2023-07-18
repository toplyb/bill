import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';

import App from './App.vue'
import '@/static/css/common.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  return {
    app,
    Pinia
  }
}
