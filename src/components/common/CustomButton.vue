<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'CustomButton',
	setup() {},
})
</script>

<template>
	<button class="custom-button">
		<slot></slot>
	</button>
</template>

<style lang="scss" scoped>
.custom-button {
	@apply border-2 border-gray-300 bg-red-600;
}
</style>
