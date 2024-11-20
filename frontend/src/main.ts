import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importações do Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Font Awesome Imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// Adicione os ícones à biblioteca
library.add(faHome, faUser, faUsers)

// Criação da instância do Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // Registrar o componente globalmente
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
