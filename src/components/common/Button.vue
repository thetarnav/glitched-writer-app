<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CustomButton',
	// props: {
	// 	buttonIcon: {
	// 		type: String,
	// 		required: true,
	// 	},
	// },
	setup() {},
})
</script>

<template>
	<button class="custom-button caption">
		<!-- <span><slot></slot></span>
		<inline-svg :src="`./svg/${icon}.svg`" /> -->
		<slot></slot>
	</button>
</template>

<style lang="scss">
.custom-button {
	@apply h-8 px-3;
	@apply bg-gray text-gray-darkest;
}
</style>
