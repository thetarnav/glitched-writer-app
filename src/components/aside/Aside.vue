<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import tabs from '../../modules/tabs'
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
		return {
			capitalName: tabs.openTabCapital,
			tabName: tabs.openTabName,
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
	@apply bg-0 lg:bg-opacity-60 lg:backdrop-filter lg:backdrop-blur flex flex-col;
}

header {
	@apply p-5;
}

.content {
	@apply px-6 pb-20;

	&-wrapper {
		@apply h-full overflow-y-scroll;
	}
}

.ending-text {
	@apply mt-6 pt-3 border-t-2 border-1;
}
</style>

<style lang="scss">
.action-buttons {
	@apply fixed right-0 bottom-[4.5rem] mx-6 my-4;
	@apply flex space-x-2;
	@apply md:absolute md:bottom-auto md:top-0;

	.copy {
		@apply hidden md:block;
	}
}

@keyframes list-item-appear {
	from {
		opacity: 0;
		transform: translateX(-3%);
	}
}

.aside-list {
	@apply flex flex-col space-y-4;

	&--item {
		@apply relative h-auto text-2 focus-within:text-3;
		@apply transition-opacity;

		&.item-style,
		.item-style {
			@apply py-3 px-4 bg-1;
		}

		&:not(.no-appear) {
			animation: list-item-appear 0.25s ease var(--list-delay, 0s) both;
		}
	}
}
</style>
