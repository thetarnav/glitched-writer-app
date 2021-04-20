<script lang="ts">
import { defineComponent } from 'vue'
import useOptions, { inputDetails } from '../../state/options'
import { InputType } from '../../types'

export default defineComponent({
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {
		const { options } = useOptions()

		const getInputDetails = (option: string) => inputDetails[option] ?? null

		return { options, getInputDetails }
	},
})
</script>

<template>
	<ul class="aside-list">
		<li
			class="aside-list--item item-style"
			v-for="(value, option) in options"
			:key="option"
		>
			<h6>{{ option }}</h6>
			<!-- @ts-ignore -->
			<RangeInput
				class="input"
				v-if="['range', 'number'].includes(getInputDetails(option).type)"
				v-model="options[option]"
				:range="getInputDetails(option).range"
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
}
.input {
	@apply flex-grow md:max-w-[500px] lg:max-w-[300px];
}
</style>
