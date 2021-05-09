<script lang="ts">
import { defineComponent } from 'vue'
import useState from '../../../modules/state'
import KeyActions from './KeyActions.vue'

export default defineComponent({
	components: {
		KeyActions,
	},
	setup() {
		const { state, progressP: p } = useState()
		return {
			state,
			p,
		}
	},
})
</script>

<template>
	<figure class="progress-info" :style="{ '--progress': p }">
		<div class="progress">
			<figcaption class="percent mono">{{ p }}%</figcaption>
			<div class="graph"></div>
		</div>
		<div class="state mono">{{ state }}</div>
		<KeyActions class="key-actions" />
	</figure>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/variables';
.progress-info {
	@apply absolute md:fixed right-6 lg:right-8;
	top: $v-position;
	@apply mt-3 md:mt-0;
	@apply flex flex-col space-y-1 items-end;
	@apply text-2 uppercase;
}

.progress {
	@apply flex space-x-2 items-center justify-end;
}

.graph {
	@apply w-6 h-6 bg-1 rounded-full overflow-hidden;
	will-change: background;
	background: radial-gradient(
			circle closest-side,
			transparent 100%,
			$gray-light 0
		),
		conic-gradient(
			$gray-light 0,
			$gray-light calc((100 - var(--progress, 0)) * 1%),
			$gray 0
		);
}

// HIDDEN
.progress,
.state,
.key-actions {
	@apply animate-show-element transition-base duration-500;
}
.tab-open {
	.progress,
	.state,
	.key-actions {
		@apply opacity-0 transform translate-x-20;
	}
}

.key-actions {
	@media (max-width: 768px) {
		--hide-el-d: -1;
	}
}
.tab-open {
	.key-actions {
		@apply -translate-x-20 md:translate-x-20;
	}
}
</style>
