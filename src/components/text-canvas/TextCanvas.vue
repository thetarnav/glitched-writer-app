<script lang="ts">
import { computed, defineComponent } from 'vue'
import tabs from '../../modules/tabs'
import Writer from './Writer.vue'
import Counters from './info/Counters.vue'
import Progress from './info/Progress.vue'

export default defineComponent({
	components: {
		Writer,
		Progress,
		Counters,
	},
	setup() {
		return {
			isTabOpen: computed(() => tabs.isTabOpen()),
		}
	},
})
</script>

<template>
	<Writer :class="{ 'tab-open': isTabOpen }" />
	<Counters />
	<Progress />
</template>
