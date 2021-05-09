<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue'
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
	setup(props, { emit }) {
		const value = ref(props.modelValue as [number, number] | number),
			[min, max] = props.range as [number, number]

		const valBefore = computed((): number =>
				typeof value.value === 'number' ? value.value : value.value[0],
			),
			valAfter = computed((): number | null =>
				typeof value.value === 'object' ? value.value[1] : null,
			)

		let interval = max <= 1 ? 0.1 : 1

		if (max - min >= 100) interval = 10
		else if (max - min >= 1000) interval = 20

		const options = {
			min,
			max,
			interval,
		}

		watch(value, newValue => emit('update:modelValue', newValue))
		watch(
			props,
			newProps =>
				(value.value = newProps.modelValue as [number, number] | number),
		)

		return {
			value,
			valBefore,
			valAfter,
			options,
		}
	},
})
</script>

<template>
	<div class="wrapper">
		<span class="value mono">
			{{ valBefore }}
		</span>
		<RangeInput
			class="range-input"
			v-model="value"
			v-bind="options"
			tooltip="none"
			:dotSize="12"
			:height="8"
			:silent="true"
		/>
		<span v-if="valAfter" class="value mono">
			{{ valAfter }}
		</span>
		<span v-else class="value mono">
			{{ valBefore }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	@apply flex items-center space-x-3;
}
.range-input {
	@apply flex-grow;
}
.value {
	@apply w-6;

	&:first-of-type {
		@apply text-right;
	}
}
</style>
