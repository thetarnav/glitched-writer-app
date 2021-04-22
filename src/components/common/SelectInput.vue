<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
	name: 'SelectInput',
	props: {
		modelValue: {
			type: [String, Number, Boolean],
			required: true,
		},
		list: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { list } = props,
			index = ref(0),
			{ length } = list,
			getValue = () => list[index.value]

		findIndex(props.modelValue)
		watch(props, newProps => findIndex(newProps.modelValue))

		function findIndex(searchFor: typeof props.modelValue) {
			const found = list.findIndex(item => item === searchFor)
			if (found !== -1) index.value = found
		}

		function nextIndex() {
			index.value++
			if (index.value >= length) index.value = 0
			emit('update:modelValue', getValue())
		}

		return {
			nextIndex,
			getValue,
		}
	},
})
</script>

<template>
	<button @click="nextIndex" class="select-input">
		{{ getValue() }}
	</button>
</template>

<style lang="scss" scoped>
.select-input {
	@apply bg-gray-200 text-sm font-medium p-1;
}
</style>
