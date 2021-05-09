<script lang="ts">
import { defineComponent } from 'vue'
import { inputDetails, options, reset, copy } from '../../modules/options'
import RangeInput from '../common/RangeInput.vue'
import toCapital from 'lodash.startcase'
import SelectInput from '../common/SelectInput.vue'
import tabs from '../../modules/tabs'

export default defineComponent({
	components: {
		RangeInput,
		SelectInput,
	},
	methods: {
		closeTab() {
			tabs.tab = -1
		},
		toCapital(text: string): string {
			return toCapital(text)
		},
	},
	setup() {
		const getInputDetails = (option: string) => inputDetails[option] ?? null,
			getRange = (option: string): [number, number] =>
				(getInputDetails(option) as any).range ?? [0, 0],
			getType = (option: string) => getInputDetails(option).type,
			getList = (option: string): any[] =>
				(getInputDetails(option) as any).list ?? []

		return { options, getRange, getType, getList, reset, copy }
	},
})
</script>

<template>
	<ul class="aside-list">
		<li
			class="aside-list--item item-style"
			:class="getType(option)"
			:style="{ '--list-delay': index * 0.05 + 's' }"
			v-for="(value, option, index) in options"
			:key="option"
		>
			<h6 class="title">{{ toCapital(option) }} :</h6>
			<RangeInput
				class="input"
				v-if="['range', 'number'].includes(getType(option))"
				v-model="options[option]"
				:range="getRange(option)"
			/>
			<div
				v-else-if="getType(option) === 'string'"
				class="string-input-wrapper"
			>
				<auto-textarea
					v-model="options[option]"
					class="input string mono"
				/>
			</div>
			<switch-button
				v-else-if="getType(option) === 'boolean'"
				v-model="options[option]"
				class="input boolean"
			/>
			<select-input
				v-else-if="getType(option) === 'select'"
				v-model="options[option]"
				:list="getList(option)"
				class="input select"
			/>
		</li>
	</ul>
	<div class="action-buttons">
		<IconButton icon="reload" class="reset" @click="reset" />
		<IconButton icon="copy" class="copy" @click="copy" />
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
.aside-list--item {
	@apply flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between items-stretch md:items-center;

	&.boolean,
	&.select {
		@apply flex-row space-y-0;
	}
}
.string-input-wrapper,
.input {
	@apply flex-grow md:max-w-[500px] lg:max-w-[320px];
}
.string-input-wrapper {
	@apply relative max-h-32 overflow-hidden;
	@apply bg-0;

	&:after {
		content: '';
		@apply absolute inset-x-0 top-8 h-24;
		@apply bg-gradient-to-t from-0 to-transparent pointer-events-none;
	}
	&:focus-within {
		@apply max-h-full;

		&:after {
			@apply opacity-0;
		}
	}

	.input {
		@apply w-full bg-transparent p-2;
	}
}

.input {
	&.string {
		@apply md:self-start;
	}

	&.boolean {
		@apply flex-grow-0;
	}

	&.select {
		@apply flex-grow-0;
	}
}
.title {
	@apply self-start;
}
</style>
