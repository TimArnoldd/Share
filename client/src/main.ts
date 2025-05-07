import './assets/main.scss'
import './assets/navigation.scss'
import './assets/toast.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
