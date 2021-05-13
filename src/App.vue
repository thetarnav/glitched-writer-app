<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import tabs from './modules/tabs'

import Navbar from './components/nav/Navbar.vue'
import TextCanvas from './components/text-canvas/TextCanvas.vue'
const Aside = defineAsyncComponent(() => import('./components/aside/Aside.vue'))
import ScreenLines from './components/ScreenLines.vue'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		Aside,
		TextCanvas,
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
	<div class="app" :class="{ 'tab-open': isTabOpen }">
		<header>
			<!-- Logo -->
			<div class="logo">
				<!-- <inline-svg :src="`./svg/logo.svg`" class="w-5 mr-1" /> -->
				<h6>Glitched Writer</h6>
				<div class="mono absolute top-full mt-1 text-2">v2.0.24</div>
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
		</main>
	</div>
	<!-- Screen Lines - Visual design elements -->
	<ScreenLines />
</template>

<style src="./assets/scss/base.scss" lang="scss"></style>

<style lang="scss" scoped>
@import './assets/scss/utils/mixins.scss';
.app {
	@apply flex flex-col w-screen h-screen overflow-hidden;
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
	@apply relative z-10;
	@apply flex space-x-2 md:space-x-3 justify-end;
	@apply border-t border-gray md:border-t-0;
	@apply transform translate-y-full lg:translate-y-0;

	a {
		@apply w-10 h-10 flex justify-center items-center bg-1;
		@include button-interaction(bg-2);
	}

	svg {
		@apply w-6 text-3;
		&.npm {
			@apply w-5 mt-0.5;
		}
	}
}
.logo,
.quick-links {
	@apply transition-base duration-500;
}
.tab-open {
	.logo,
	.quick-links {
		@apply opacity-0 lg:opacity-100 transform -translate-y-4 lg:translate-y-0;
	}
	.quick-links {
		@apply translate-y-0;
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
	@apply fixed md:absolute z-50 inset-0 bottom-[4.5rem] md:bottom-0;
	@apply lg:right-auto lg:w-1/2 lg:max-w-[600px];
}
</style>
