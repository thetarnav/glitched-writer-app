<script lang="ts">
import { defineComponent } from 'vue'
import { startCase } from 'lodash'

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	computed: {
		capitalName(): string {
			return startCase(this.name)
		},
	},
	setup() {},
})
</script>

<template>
	<button class="nav-button">
		<inline-svg :src="`./svg/${name}.svg`" class="icon" />
		<span class="text">
			{{ capitalName }}
		</span>
	</button>
</template>

<style lang="scss" scoped>
.nav-button {
	@apply bg-gray-50 text-gray-700;
	@apply p-3 border-t-2 border-gray-300;
	@apply flex flex-col justify-center items-center;
	@media screen and (min-width: 768px) {
		@apply border-2 flex-row space-x-2 py-2;
	}
}
.icon {
	@apply w-6 md:w-5;
}
.text {
	@apply text-sm font-medium;
}
</style>
