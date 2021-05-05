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
	<button class="custom-button">
		<!-- <span><slot></slot></span>
		<inline-svg :src="`./svg/${icon}.svg`" /> -->
		<slot></slot>
	</button>
</template>

<style lang="scss">
.custom-button {
	@apply bg-gray-300 px-2 py-1 rounded-sm;
}
</style>
