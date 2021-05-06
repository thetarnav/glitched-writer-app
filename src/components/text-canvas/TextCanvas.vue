<script lang="ts">
import { computed, defineComponent } from 'vue'
import tabs from '../../modules/tabs'
import Writer from './Writer.vue'
import Counters from './info/Counters.vue'

export default defineComponent({
	components: {
		Writer,
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
</template>
