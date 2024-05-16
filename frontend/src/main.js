import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import clickOutside from './customDirective/clickOutside'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faRightToBracket,
  faEllipsisVertical,
  faCircleUser,
  faAngleDown,
  faSpinner,
  faUserGroup,
  faPenToSquare,
  faTrashCan,
  faFloppyDisk,
  faUser,
  faRightFromBracket,
  faLock
} from '@fortawesome/free-solid-svg-icons'
// import {} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
  faRightToBracket,
  faEllipsisVertical,
  faCircleUser,
  faAngleDown,
  faSpinner,
  faUserGroup,
  faPenToSquare,
  faTrashCan,
  faFloppyDisk,
  faUser,
  faRightFromBracket,
  faLock
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.directive('click-outside', clickOutside)
app.use(router)

app.mount('#app')
