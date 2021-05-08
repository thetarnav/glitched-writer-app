<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { clamp } from '../../../assets/utils'
import { options } from '../../../modules/options'
import useState from '../../../modules/state'

export default defineComponent({
	setup() {
		const { nGhosts, letters, progressN } = useState(),
			ghostsP = ref('0')

		watch(options, refreshGhosts)
		watch(nGhosts, refreshGhosts)

		function refreshGhosts() {
			const n = nGhosts.value,
				max = options.maxGhosts,
				p = clamp(0, n / max, 1)

			ghostsP.value = p * 100 + '%'
		}

		return {
			ghostsP,
			nGhosts,
			letters,
			nFinished: progressN,
		}
	},
})
</script>

<template>
	<div class="counters">
		<figure class="group">
			<figcaption class="mono">
				{{ nFinished }}/{{ letters.length }}
			</figcaption>
			<div class="progress-bar letters">
				<span
					v-for="(done, index) in letters"
					:key="index"
					class="letter"
					:class="{ done }"
				></span>
			</div>
		</figure>
		<figure class="group">
			<figcaption class="mono">{{ nGhosts }} Ghosts</figcaption>
			<div
				class="progress-bar ghosts"
				:style="{ '--progress': ghostsP }"
			></div>
		</figure>
	</div>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/variables';
.counters {
	@apply absolute md:fixed right-6 lg:right-8;
	@apply flex flex-col space-y-2;
	bottom: $v-position;
	@apply uppercase text-2;

	@apply animate-show-element transition-base duration-500;
}

.group {
	@apply flex flex-col space-y-0.5 items-end;
}

.progress-bar {
	@apply relative h-2 w-18 lg:w-28 bg-1;

	&.letters {
		@apply flex;

		.letter {
			@apply flex-grow bg-2 opacity-0 transition-opacity duration-200;
			will-change: opacity;

			&.done {
				@apply opacity-100;
			}
		}
	}

	&.ghosts {
		&:after {
			content: '';
			@apply absolute inset-0 bg-2 transform rotate-180 transition-clip-path duration-200;
			will-change: clip-path;
			clip-path: polygon(
				0 0,
				var(--progress, 0) 0,
				var(--progress, 0) 100%,
				0 100%
			);
		}
	}
}

.tab-open .counters {
	@apply opacity-0 transform translate-x-20;
}
</style>
