<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CustomButton',
	props: {
		buttonIcon: {
			type: String,
			required: true,
		},
	},
	setup() {},
})
</script>

<template>
	<button class="custom-button">
		<span><slot></slot></span>
		<inline-svg :src="`./svg/${icon}.svg`" />
	</button>
</template>

<style lang="scss">
.custom-button {
	@apply border-2 border-gray-300 bg-red-600;
}
</style>
