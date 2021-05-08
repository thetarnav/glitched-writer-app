<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CustomButton',
	props: {
		trailingIcon: {
			type: String,
			default: '',
		},
		leadingIcon: {
			type: String,
			default: '',
		},
	},
	setup() {},
})
</script>

<template>
	<button class="button caption">
		<inline-svg
			v-if="leadingIcon"
			:src="`./svg/${leadingIcon}.svg`"
			class="icon"
		/>
		<span><slot></slot></span>
		<inline-svg
			v-if="trailingIcon"
			:src="`./svg/${trailingIcon}.svg`"
			class="icon"
		/>
	</button>
</template>

<style lang="scss">
@import '../../assets/scss/utils/mixins.scss';
.button {
	@apply h-8 px-3;
	@apply bg-2 text-4 transition-colors;
	@apply flex space-x-1 items-center;

	@include button-interaction;
}

.icon {
	@apply w-4;
}
</style>
