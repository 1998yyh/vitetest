import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/index'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.log(err)
}
app.use(router)
app.mount('#app')
