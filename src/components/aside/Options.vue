<script lang="ts">
import { defineComponent } from 'vue'
import useOptions, { inputDetails } from '../../state/options'
import RangeInput from '../inputs/RangeInput.vue'

export default defineComponent({
	components: {
		RangeInput,
	},
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {
		const { options } = useOptions()

		const getInputDetails = (option: string) => inputDetails[option] ?? null,
			getRange = (option: string): [number, number] =>
				(getInputDetails(option) as any).range ?? [0, 0],
			getType = (option: string) => getInputDetails(option).type

		return { options, getRange, getType }
	},
})
</script>

<template>
	<ul class="aside-list">
		<li
			class="aside-list--item item-style"
			:class="getType(option)"
			v-for="(value, option) in options"
			:key="option"
		>
			<h6 class="title">{{ option }}</h6>
			<!-- @ts-ignore -->
			<RangeInput
				class="input"
				v-if="['range', 'number'].includes(getType(option))"
				v-model="options[option]"
				:range="getRange(option)"
			/>
			<auto-textarea
				v-if="getType(option) === 'string'"
				v-model="options[option]"
				class="input string"
			/>
		</li>
	</ul>
	<div class="action-buttons">
		<IconButton icon="reload" class="reset" />
		<IconButton icon="copy" class="copy" />
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
.aside-list--item {
	@apply flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-stretch md:items-center;

	&.string {
		@apply max-h-32 overflow-hidden focus-within:max-h-full;

		&:after {
			content: '';
			@apply absolute inset-x-0 top-10 h-24 bg-gradient-to-t from-white to-transparent;
		}
		&:focus-within:after {
			@apply opacity-0;
		}
	}
}
.input {
	@apply flex-grow md:max-w-[500px] lg:max-w-[320px];

	&.string {
		@apply self-start;
	}
}
.title {
	@apply self-start;
}
</style>
