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
	<figure class="counters">
		<div class="group">
			<p class="mono">{{ nFinished }}/{{ letters.length }}</p>
			<div class="progress-bar letters">
				<span
					v-for="(done, index) in letters"
					:key="index"
					class="letter"
					:class="{ done }"
				></span>
			</div>
		</div>
		<div class="group">
			<p class="mono">{{ nGhosts }} Ghosts</p>
			<div
				class="progress-bar ghosts"
				:style="{ '--progress': ghostsP }"
			></div>
		</div>
	</figure>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/variables';
.counters {
	@apply absolute md:fixed right-6 flex flex-col space-y-2;
	bottom: $v-position;
}

.group {
	@apply flex flex-col items-end;
}

p {
	@apply uppercase text-2 mb-0.5;
}

.progress-bar {
	@apply relative h-2 w-18 lg:w-28 bg-1;

	&.letters {
		@apply flex;

		.letter {
			@apply flex-grow bg-2 opacity-0 transition-opacity duration-200;

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
</style>
