<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import Navbar from './components/nav/Navbar.vue'
import TextCanvas from './components/TextCanvas.vue'
import StateDropdown from './components/StateDropdown.vue'
const Aside = defineAsyncComponent(() => import('./components/aside/Aside.vue'))
const ScreenLines = defineAsyncComponent(
	() => import('./components/ScreenLines.vue'),
)
import tabs from './modules/tabs'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		Aside,
		TextCanvas,
		StateDropdown,
		ScreenLines,
	},
	data() {
		return {}
	},
	setup() {
		const { isTabOpen, openTabName } = tabs
		return {
			isTabOpen: computed(() => isTabOpen()),
			openTabName,
		}
	},
})
</script>

<template>
	<div class="app">
		<header>
			<!-- Logo -->
			<div class="logo">
				<inline-svg :src="`./svg/logo.svg`" class="w-5 mr-1" />
				<h6>Glitched Writer</h6>
				<div class="mono absolute top-full mt-1 text-2">v2.0.22</div>
			</div>
			<!-- Navigation -->
			<Navbar />
			<!-- Quick Icon Links -->
			<div class="right-placeholder lg:w-64">
				<div class="quick-links">
					<a
						href="https://github.com/thetarnav/glitched-writer"
						target="_blank"
					>
						<inline-svg src="./svg/github.svg" />
					</a>
					<a
						href="https://www.npmjs.com/package/glitched-writer"
						target="_blank"
					>
						<inline-svg src="./svg/npm.svg" class="npm" />
					</a>
				</div>
			</div>
		</header>
		<main class="middle-wrapper">
			<!-- Aside Panel -->
			<transition name="fade">
				<div v-if="isTabOpen">
					<Aside :key="openTabName" />
				</div>
			</transition>
			<!-- Text Canvas -->
			<TextCanvas />
			<StateDropdown v-if="false" />
		</main>
	</div>
	<!-- Screen Lines - Visual design elements -->
	<ScreenLines />
</template>

<style src="./assets/scss/base.scss" lang="scss"></style>
<style src="./assets/scss/styles.scss" lang="scss"></style>
<style src="./assets/scss/transitions.scss" lang="scss"></style>

<style lang="scss" scoped>
.app {
	@apply flex flex-col w-screen h-screen;
}

header {
	@apply w-full h-12 md:h-14 px-6 lg:px-8;
	@apply flex justify-between items-end;
	@apply border-gray-dark md:border-b;
}
.logo {
	@apply relative flex pb-1 lg:w-64;
	@apply border-b border-gray  md:border-b-0;
}
.quick-links {
	@apply flex space-x-2 md:space-x-3 justify-end;
	@apply border-t border-gray md:border-t-0;
	@apply transform translate-y-full lg:translate-y-0;

	a {
		@apply w-10 h-10 flex justify-center items-center bg-1;
	}

	svg {
		@apply w-6 text-3;
		&.npm {
			@apply w-5 mt-0.5;
		}
	}
}

.navbar {
	@apply w-full h-16 mb-2 fixed z-50 left-0 bottom-0;
	@apply md:static md:w-auto md:h-auto md:mb-0;
}
.middle-wrapper {
	@apply w-full relative flex-grow mb-16 md:mb-0;
}
.aside {
	@apply fixed md:absolute z-10 inset-0 bottom-16 md:bottom-0;
	@apply lg:right-auto lg:w-1/2 lg:max-w-[600px];
}
</style>
