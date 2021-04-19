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
	<div class="item" v-for="(value, option) in options" :key="option">
		<h6>{{ option }}</h6>
		<template v-if="getInputDetails(option)">
			{{ getInputDetails(option).type }}
			{{ value }}
		</template>
	</div>
	<div class="action-buttons">
		<IconButton icon="reload" class="reset" />
		<IconButton icon="copy" class="copy" />
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
.item {
	@apply py-3 px-4 bg-white rounded-md border border-gray-200;
}
</style>
