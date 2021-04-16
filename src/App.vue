<script lang="ts">
import { computed, defineComponent } from 'vue'
import Navbar from './components/nav/Navbar.vue'
import { useStore } from './store'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
	},
	setup() {
		const store = useStore()

		return {
			increment: () => store.commit('increment'),
			count: computed(() => store.state.count),
		}
	},
})
</script>

<template>
	<header>
		<div class="logo">
			<inline-svg :src="`./svg/logo.svg`" class="w-6" />
			<h6>Glitched Writer</h6>
		</div>
		<Navbar />
		<div class="right-placeholder lg:w-64">
			<div class="quick-links">
				<a
					href="https://github.com/thetarnav/glitched-writer"
					target="_blank"
				>
					<inline-svg :src="`./svg/github.svg`" />
				</a>
				<a
					href="https://www.npmjs.com/package/glitched-writer"
					target="_blank"
				>
					<inline-svg :src="`./svg/npm.svg`" class="npm" />
				</a>
			</div>
		</div>
	</header>
	<main class="middle-wrapper">
		<!-- Aside Panel -->
		<!-- Text Canvas -->
	</main>
</template>

<style src="./assets/scss/base.scss" lang="scss" />

<style lang="scss" scoped>
#app {
	@apply flex flex-col w-screen h-screen;
}

header {
	@apply w-full p-3 flex justify-between items-center bg-gray-50;
}
.logo {
	@apply flex space-x-2 lg:w-64;
}
.quick-links {
	@apply flex space-x-2 md:space-x-3 justify-end;
	@apply lg:fixed right-6 bottom-6;

	svg {
		@apply w-6 text-gray-600;
		&.npm {
			@apply w-5 mt-0.5;
		}
	}
}

.navbar {
	@apply w-full fixed left-0 bottom-0;
	@apply md:static md:w-auto;
}
.middle-wrapper {
	@apply w-full relative flex-grow;
}
</style>
