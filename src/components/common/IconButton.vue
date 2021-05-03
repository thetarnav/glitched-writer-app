<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IconButton',
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
	setup() {},
})
</script>

<template>
	<button class="icon-button">
		<inline-svg :src="`./svg/${icon}.svg`" />
	</button>
</template>

<style lang="scss">
.icon-button {
	@apply w-12 h-12 flex bg-0 text-3 rounded-full border border-1;
	@apply md:w-10 md:h-10;

	svg {
		@apply m-auto md:w-5;
	}
}
</style>
