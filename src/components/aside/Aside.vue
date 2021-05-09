<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import tabs from '../../modules/tabs'
import EndingText from './EndingText.vue'
const Options = defineAsyncComponent(() => import('./Options.vue'))
const Queue = defineAsyncComponent(() => import('./Queue.vue'))
const About = defineAsyncComponent(() => import('./About.vue'))
const Presets = defineAsyncComponent(() => import('./Presets.vue'))
export default defineComponent({
	name: 'Aside',
	components: {
		EndingText,
		Options,
		Queue,
		About,
		Presets,
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
			<h2>{{ capitalName }}</h2>
		</header>
		<!-- Content -->
		<div class="content-wrapper">
			<div class="content">
				<Options v-if="tabName === 'options'" />
				<Queue v-else-if="tabName === 'queue'" />
				<About v-else-if="tabName === 'about'" />
				<Presets v-else-if="tabName === 'presets'" />
				<EndingText />
			</div>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/utils/mixins';

.aside {
	@apply p-6 lg:p-8 pt-12 lg:pt-12 lg:pb-16 lg:pr-0;
	@apply flex flex-col;
}

header {
	@apply flex-shrink-0 h-14 mb-6 lg:mb-8 pl-4;
	@apply flex items-center;
	@apply bg-1 border-t border-gray;
}

.content {
	@apply bg-0 pb-20;

	&-wrapper {
		@apply justify-self-stretch overflow-y-scroll;
		@apply border-t border-b border-gray;
		@include hide-scrollbar;
	}
}

.ending-text {
	@apply mt-4 pt-4 px-4 border-t border-gray;
}
</style>

<style lang="scss">
.action-buttons {
	@apply fixed right-0 bottom-[4.5rem] mb-4 mr-6;
	@apply flex space-x-2;
	@apply md:absolute md:bottom-auto md:top-10 md:mr-10;
	@apply lg:mr-4;

	> button {
		@apply w-12 h-12;
	}

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
	@apply flex flex-col space-y-4 pt-4;

	&--item {
		@apply relative h-auto text-3;
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
