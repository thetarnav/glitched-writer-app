<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import tabs from '../../modules/tabs'
import Writer from './Writer.vue'
import Counters from './info/Counters.vue'
import Progress from './info/Progress.vue'
import Logs from './info/Logs.vue'

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
			isTabOpen: computed(() => tabs.isTabOpen()),
			vw,
		}
	},
})
</script>

<template>
	<Writer :class="{ 'tab-open': isTabOpen }" />
	<Counters />
	<Progress />
	<Logs v-if="vw > 768" />
</template>
