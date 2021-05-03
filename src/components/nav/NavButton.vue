<script lang="ts">
import { computed, defineComponent } from 'vue'
import { startCase } from 'lodash'
import tabs from '../../modules/tabs'

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	setup({ name }) {
		const { toggleTab, isTabOpen } = tabs

		return {
			toggleTab: () => toggleTab(name),
			isActive: computed(() => isTabOpen(name)),
			capitalName: startCase(name),
		}
	},
})
</script>

<template>
	<button class="nav-button" :class="{ active: isActive }" @click="toggleTab">
		<inline-svg :src="`./svg/${name}.svg`" class="icon" />
		<span class="text">
			{{ capitalName }}
		</span>
	</button>
</template>

<style lang="scss" scoped>
.nav-button {
	@apply bg-0 text-3;
	@apply p-3 border-t-2 border-1;
	@apply flex flex-col justify-center items-center;
	@media screen and (min-width: 768px) {
		@apply w-max border-2 flex-row space-x-2 py-2;
	}
}
.icon {
	@apply w-5 md:w-5;
}
.text {
	@apply text-sm font-medium;
}

.active {
	@apply border-3;
}
</style>
