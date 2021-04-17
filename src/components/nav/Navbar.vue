<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../../store'
import { Tab } from '../../types'
import NavButton from './NavButton.vue'

export default defineComponent({
	name: 'Navbar',
	data() {
		return {}
	},
	computed: {
		tabs(): Tab[] {
			return this.$store.state.tabs
		},
	},
	methods: {
		isActive(name: string) {
			// console.log(name)
		},
	},
	components: {
		NavButton,
	},
	setup() {
		const store = useStore()

		return {}
	},
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
