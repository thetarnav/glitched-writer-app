import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'

import InlineSvg from 'vue-inline-svg'
import IconButton from './components/common/IconButton.vue'
import AutoTextarea from './components/common/AutoTextarea.vue'

createApp(App)
	.use(store, key)
	.component('inline-svg', InlineSvg)
	.component('IconButton', IconButton)
	.component('AutoTextarea', AutoTextarea)
	.mount('#app')
