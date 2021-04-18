<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import Navbar from './components/nav/Navbar.vue'
const Aside = defineAsyncComponent(() => import('./components/aside/Aside.vue'))
import { Tab } from './types'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		Aside,
	},
	data() {
		return {}
	},
	computed: {
		isTabOpen(): boolean {
			return this.$store.getters.isTabOpen()
		},
		openTabName(): Tab | null {
			return this.$store.getters.openTabName
		},
	},
	setup() {},
})
</script>

<template>
	<div class="app">
		<header>
			<!-- Logo -->
			<div class="logo">
				<inline-svg :src="`./svg/logo.svg`" class="w-6" />
				<h6>Glitched Writer</h6>
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
			<Aside v-if="isTabOpen" :key="openTabName" />
			<!-- Text Canvas -->
		</main>
		<div class="fixed left-5 bottom-5 hidden md:block">
			glitched-writer@2.0.22
		</div>
	</div>
</template>

<style src="./assets/scss/base.scss" lang="scss" />

<style lang="scss" scoped>
.app {
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
	@apply lg:fixed z-10 right-6 bottom-6;

	svg {
		@apply w-6 text-gray-600;
		&.npm {
			@apply w-5 mt-0.5;
		}
	}
}

.navbar {
	@apply w-full h-16 fixed z-50 left-0 bottom-0;
	@apply md:static md:w-auto md:h-auto;
}
.middle-wrapper {
	@apply w-full relative flex-grow;
}
.aside {
	@apply absolute z-10 inset-0 mb-16;
	@apply md:mb-0;
	@apply lg:right-auto lg:w-1/2;
}
</style>
