<script lang="ts">
import { defineComponent } from 'vue'
import NavButton from './NavButton.vue'

export default defineComponent({
	name: 'Navbar',
	data() {
		return {
			tabs: ['options', 'presets', 'queue', 'about'],
		}
	},
	methods: {
		isActive(name: string) {
			// console.log(name)
		},
	},
	components: {
		NavButton,
	},
	setup() {},
})
</script>

<template>
	<nav class="navbar">
		<NavButton
			v-for="tab in tabs"
			:key="tab"
			:active="isActive(tab)"
			:name="tab"
		/>
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
	@apply grid grid-cols-4;
	@apply md:gap-4;
}
</style>
