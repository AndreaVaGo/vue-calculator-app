import { createApp } from 'vue'

import { createPinia } from 'pinia'

// Importaciones de Bootstrap (estilos y javascript)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Importación de tu componente principal
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
