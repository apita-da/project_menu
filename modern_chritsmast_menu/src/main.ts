import { createBottomSheet } from 'bottom-sheet-vue3'
import { createApp } from 'vue'

import App from './App.vue'
import 'bottom-sheet-vue3/style.css'

const app = createApp(App)
app.use(createBottomSheet())

app.mount('#app')
