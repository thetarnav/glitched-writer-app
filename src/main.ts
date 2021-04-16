import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'

import InlineSvg from 'vue-inline-svg'

createApp(App).use(store, key).component('inline-svg', InlineSvg).mount('#app')
