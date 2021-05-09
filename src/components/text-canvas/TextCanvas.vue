<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue'
import Writer from './Writer.vue'
import Counters from './info/Counters.vue'
import Progress from './info/Progress.vue'
const Logs = defineAsyncComponent(() => import('./info/Logs.vue'))

export default defineComponent({
	components: {
		Writer,
		Progress,
		Counters,
		Logs,
	},
	setup() {
		const vw = ref(window.innerWidth)
		window.addEventListener('resize', () => (vw.value = window.innerWidth))

		return {
			vw,
		}
	},
})
</script>

<template>
	<Writer />
	<Counters />
	<Progress />
	<Logs v-if="vw > 768" />
</template>
