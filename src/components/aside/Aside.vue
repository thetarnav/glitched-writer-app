<script lang="ts">
import { defineComponent } from 'vue'
import { useStore, Getters } from '../../store'

export default defineComponent({
	name: 'Aside',
	data() {
		return {}
	},
	computed: {
		// capitalName(): string {
		// 	return this.$store.getters.openTabCapital
		// },
		// tabActions():TabAction[] {
		// 	return this.$store.getters.tabActions
		// }
	},
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {
		const store = useStore()

		return {
			capitalName: store.getters.openTabCapital as Getters['openTabCapital'],
			tabActions: store.getters.tabActions as Getters['tabActions'],
		}
	},
})
</script>

<template>
	<aside class="aside">
		<header>
			<h3>{{ capitalName }}</h3>
		</header>
		<div class="action-buttons">
			<IconButton
				icon="reload"
				class="reset"
				v-if="tabActions.has('reset')"
			/>
			<IconButton icon="copy" class="copy" v-if="tabActions.has('copy')" />
			<IconButton icon="close" class="close" @click="closeTab" />
		</div>
	</aside>
</template>

<style lang="scss" scoped>
header {
	@apply p-5;
}
.action-buttons {
	@apply fixed right-0 bottom-16 m-3 flex space-x-2;
	@apply md:absolute md:bottom-auto md:top-0;

	.copy {
		@apply hidden md:block;
	}
}
</style>
