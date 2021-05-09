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
@import '../../assets/scss/utils/mixins.scss';
.icon-button {
	@apply w-12 h-12 flex;
	@apply bg-3 md:bg-2 text-0 md:text-4 border border-1;
	@apply md:w-10 md:h-10;

	@include button-interaction;

	svg {
		@apply m-auto md:w-5;
	}
}
</style>
