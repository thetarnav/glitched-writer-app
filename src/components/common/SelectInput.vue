<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

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
			currentIndex = ref(0),
			{ length } = list,
			getValue = () => list[currentIndex.value]

		findIndex(props.modelValue)
		watch(props, newProps => findIndex(newProps.modelValue))

		function findIndex(searchFor: typeof props.modelValue) {
			const found = list.findIndex(item => item === searchFor)
			if (found !== -1) currentIndex.value = found
		}

		function nextIndex() {
			currentIndex.value++
			if (currentIndex.value >= length) currentIndex.value = 0
			emit('update:modelValue', getValue())
		}

		return {
			currentIndex,
			nextIndex,
			getValue,
		}
	},
})
</script>

<template>
	<button @click="nextIndex" class="select-input">
		<div
			v-for="(item, index) in list"
			:key="item"
			class="select-item"
			:class="{ active: index === currentIndex }"
		>
			<div class="content">
				<span class="mono">
					{{ item }}
				</span>
			</div>
		</div>
	</button>
</template>

<style lang="scss" scoped>
.select-input {
	@apply flex space-x-1 h-6 items-stretch;
	outline: none !important;

	&:focus,
	&:hover {
		.active .content {
			@apply bg-gray-darkest;
		}
	}
}
.select-item {
	@apply overflow-hidden transition w-1.5;
	transition-property: width;

	&.active {
		@apply w-18;

		.content {
			@apply bg-gray-dark;
		}
	}
}
.content {
	@apply h-full w-full px-2 flex items-center transition-colors;
	@apply bg-gray text-1;
}
</style>
