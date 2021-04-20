<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { useStore, Getters } from '../../store'
import EndingText from './EndingText.vue'
const Options = defineAsyncComponent(() => import('./Options.vue'))
const Queue = defineAsyncComponent(() => import('./Queue.vue'))
const About = defineAsyncComponent(() => import('./About.vue'))

export default defineComponent({
	name: 'Aside',
	components: {
		EndingText,
		Options,
		Queue,
		About,
	},
	data() {
		return {}
	},
	setup() {
		const store = useStore()

		return {
			capitalName: store.getters.openTabCapital as Getters['openTabCapital'],
			tabActions: store.getters.tabActions as Getters['tabActions'],
			tabName: store.getters.openTabName as Getters['openTabName'],
		}
	},
})
</script>

<template>
	<aside class="aside">
		<!-- Headder -->
		<header>
			<h3>{{ capitalName }}</h3>
		</header>
		<!-- Content -->
		<div class="content-wrapper">
			<div class="content">
				<Options v-if="tabName === 'options'" />
				<Queue v-else-if="tabName === 'queue'" />
				<About v-else-if="tabName === 'about'" />
				<EndingText />
			</div>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
.aside {
	@apply bg-gray-100 lg:bg-opacity-60 lg:backdrop-filter lg:backdrop-blur flex flex-col;
}

header {
	@apply p-5;
}

.content {
	@apply px-5 pb-20;

	&-wrapper {
		@apply py-2 h-full overflow-y-scroll;
	}
}

.ending-text {
	@apply mt-6 pt-3 border-t-2 border-gray-300;
}
</style>

<style lang="scss">
.action-buttons {
	@apply fixed right-0 bottom-16 m-3 flex space-x-2;
	@apply md:absolute md:bottom-auto md:top-0;

	.copy {
		@apply hidden md:block;
	}
}

.aside-list {
	@apply flex flex-col space-y-4;

	&--item {
		@apply relative h-auto text-gray-600 focus-within:text-gray-900;
		@apply transition-opacity;

		&.item-style,
		.item-style {
			@apply py-3 px-4 rounded-md bg-white;
		}
	}
}
</style>
