<script lang="ts">
import { defineComponent } from 'vue'
import NavButton from './NavButton.vue'
import tabsModule from '../../modules/tabs'

export default defineComponent({
	name: 'Navbar',
	components: {
		NavButton,
	},
	setup() {
		const { tabs, openTab } = tabsModule
		return {
			tabs: tabs,
			openTab: openTab,
		}
	},
})
</script>

<template>
	<nav class="navbar">
		<NavButton v-for="tab in tabs" :key="tab" :name="tab" />
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
	@apply grid grid-cols-4 gap-2 px-6;
	@apply md:gap-6 md:p-0;
}
</style>
