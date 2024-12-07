import { createApp } from 'vue'
import Toast from 'vue-toastification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faSpinner, 
  faTimes, 
  faClipboard, 
  faHistory,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'
import 'vue-toastification/dist/index.css'
import './style.css'
import App from './App.vue'

library.add(faSpinner, faTimes, faClipboard, faHistory, faEye, faEyeSlash)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  toastClassName: 'bg-[#36393f] text-white',
})

app.mount('#app')