<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Aside',
	data() {
		return {}
	},
	computed: {
		capitalName(): string {
			return this.$store.getters.openTabCapital
		},
	},
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {},
})
</script>

<template>
	<aside class="aside">
		<header>
			<h3>{{ capitalName }}</h3>
		</header>
		<div class="action-buttons">
			<IconButton icon="reload" />
			<IconButton icon="copy" />
			<IconButton icon="close" @click="closeTab" />
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
}
</style>
