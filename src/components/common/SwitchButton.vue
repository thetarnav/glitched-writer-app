<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		textTrue: {
			type: String,
			default: 'True',
		},
		textFalse: {
			type: String,
			default: 'False',
		},
	},
	setup(props, { emit }) {
		const value = ref(props.modelValue)

		watch(props, newProps => (value.value = newProps.modelValue))

		const change = (val: boolean) =>
			value.value !== val && emit('update:modelValue', val)

		return {
			value,
			change,
		}
	},
})
</script>

<template>
	<div class="switch">
		<button @click="change(true)" :class="{ active: value }">
			{{ textTrue }}
		</button>
		<button @click="change(false)" :class="{ active: !value }">
			{{ textFalse }}
		</button>
	</div>
</template>

<style lang="scss" scoped>
.switch {
	@apply flex;
}
button {
	@apply w-12 h-6 text-sm font-medium border-2 border-1 text-2;
	&:last-child {
		@apply border-l-0;
	}
	&.active {
		@apply bg-1 text-3;
	}
}
</style>
