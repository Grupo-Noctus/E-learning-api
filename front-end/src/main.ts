import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

//  Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    },
    typography: {
        font: {
            family: 'Roboto, sans-serif',
        },
    },
})

const app = createApp(App)

app.use(createPinia()).use(vuetify).use(router)

app.mount('#app')
