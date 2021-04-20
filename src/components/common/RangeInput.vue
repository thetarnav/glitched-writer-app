<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import RangeInput from 'vue-slider-component'

export default defineComponent({
	components: {
		RangeInput,
	},
	props: {
		modelValue: {
			type: [Array, Number],
			required: true,
		},
		range: {
			type: Array,
			required: true,
		},
	},
	setup({ modelValue, range }, { emit }) {
		const value = ref(modelValue as [number, number] | number)

		// watch(
		// 	props,
		// 	() => (value.value = props.modelValue as [number, number] | number),
		// )

		watch(value, newValue => emit('update:modelValue', newValue))

		return {
			value,
			range: range as [number, number],
		}
	},
})
</script>

<template>
	<RangeInput
		class="range-input"
		v-model="value"
		:min="range[0]"
		:max="range[1]"
		tooltip="active"
		:use-keyboard="false"
	/>
</template>

<style lang="scss" scoped></style>
