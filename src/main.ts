import { createApp } from 'vue'
import App from './App.vue'

import InlineSvg from 'vue-inline-svg'
import { GlobalEvents } from 'vue-global-events'

import IconButton from './components/common/IconButton.vue'
import AutoTextarea from './components/common/AutoTextarea.vue'
import SwitchButton from './components/common/SwitchButton.vue'
import SelectInput from './components/common/SelectInput.vue'

export default createApp(App)
	.component('inline-svg', InlineSvg)
	.component('GlobalEvents', GlobalEvents)
	.component('IconButton', IconButton)
	.component('AutoTextarea', AutoTextarea)
	.component('SwitchButton', SwitchButton)
	.component('SelectInput', SelectInput)
	.mount('#app')
