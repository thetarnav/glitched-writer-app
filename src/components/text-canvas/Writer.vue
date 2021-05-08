<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'
import { wait, ConstructorOptions, WriterDataResponse } from 'glitched-writer'
import { options as modelOptions } from '../../modules/options'
import useQueue from '../../modules/queue'
import { updateState } from '../../modules/state'
import { finishEmitter } from '../../modules/event-bus'
import { debounce } from 'lodash'
import { lerp } from '../../assets/utils'

export default defineComponent({
	components: {
		GlitchedWriter,
	},
	setup() {
		const { nextText } = useQueue(),
			text = ref(nextText())

		async function afterFinish(string: string, data: WriterDataResponse) {
			finishEmitter.emit(writerEl.value?.textContent ?? '')
			updateState(string, data)
			// wait time depends on previous written text to give user time to read
			await wait((writerEl.value?.textContent?.length ?? 1) * 55 + 300)
			let next = nextText()
			if (next === text.value) {
				afterFinish(string, data)
				return
			}
			text.value = next
		}

		/**
		 * Dummy reactive value,
		 * it's purpose is to "trigger" options val change,
		 * so that glitched-writer could react to changes.
		 */
		const dummy = ref(Math.random())
		watch(modelOptions, () => (dummy.value = Math.random()))

		/**
		 * Correcting the writer Element height
		 */
		const writerEl = ref(null as null | HTMLElement),
			scale = {
				now: 1,
				goal: 1,
			},
			y = {
				now: window.innerHeight / 2 - 20,
				goal: window.innerHeight / 2 - 20,
			}

		setInterval(() => {
			// correct height
			if (!writerEl.value) return
			const writer = writerEl.value,
				{ height: h } = writer.getBoundingClientRect(),
				vh = window.innerHeight,
				max = 0.2361 * vh

			scale.goal = h < max ? 1 : max / h
			y.goal = vh / 2 - h / 2
		}, 300)

		// Every frame - Writer position animation
		function nextFrame() {
			const writer = writerEl.value
			if (!writer) return
			const s = (scale.now = lerp(scale.now, scale.goal, 0.004)),
				t = (y.now = lerp(y.now, y.goal, 0.002))
			writer.style.transform = `scale(${s}) translateY(${t}px)`

			requestAnimationFrame(nextFrame)
		}
		requestAnimationFrame(nextFrame)

		return {
			text,
			afterFinish,
			dummy,
			writerEl,
			updateState,
		}
	},
	data() {
		return {
			options: {} as ConstructorOptions,
			debSetOptions: debounce(this.setOptions as () => void, 1000, {
				maxWait: 1500,
			}),
		}
	},
	computed: {},
	watch: {
		dummy() {
			this.debSetOptions()
		},
	},
	methods: {
		setOptions() {
			this.options = {
				...modelOptions,
			}
		},
	},
	created() {
		this.setOptions()
	},
})
</script>

<template>
	<figure class="writer-frame">
		<h1 class="writer" ref="writerEl">
			<GlitchedWriter
				:text="text"
				appear
				:options="options"
				@step="updateState"
				@finish="afterFinish"
			/>
		</h1>
	</figure>
</template>

<style lang="scss" scoped>
.writer-frame {
	@apply fixed z-50 top-0 left-0 w-full h-full flex items-center overflow-hidden pointer-events-none;
	@apply transition-base duration-500;
}
.tab-open .writer-frame {
	@apply opacity-0 lg:opacity-100 transform lg:translate-x-[15%];
}

.writer {
	@apply fixed top-6 md:top-0 inset-x-6 md:inset-x-[23.6vw];
}
</style>

<style lang="scss">
@import '../../assets/scss/utils/mixins';
.writer-frame .glitched-writer {
	* {
		font-size: inherit;
		font-family: inherit;
		font-weight: inherit;
	}

	@apply relative;
	@include antialiased;

	&::after,
	&::before {
		content: attr(data-gw-string);
		@apply absolute opacity-0 inset-x-0 top-0;
		@apply text-2 font-semibold;
	}
	&::before {
		@apply text-1 -z-1;
	}

	&.gw-writing {
		animation: glitch-skew 1s steps(10, end) infinite alternate-reverse;

		.gw-ghosts,
		.gw-glitched {
			opacity: 0.6;
			animation: glitch-blink 1s steps(20, end) infinite alternate-reverse;
		}

		&::after,
		&::before {
			opacity: 1;
		}
		&::after {
			animation: glitch-animation-1 1.5s steps(20, end) infinite
				alternate-reverse;
		}
		&::before {
			animation: glitch-animation-2 2s steps(20, end) infinite
				alternate-reverse;
		}
	}
}

@keyframes glitch-skew {
	$steps: 10;

	@for $i from 0 through $steps {
		#{percentage($i * 1 / $steps)} {
			transform: skew(random(10) - 5 + deg);
		}
	}
}
@keyframes glitch-blink {
	$steps: 20;

	@for $i from 0 through $steps {
		#{percentage($i * 1 / $steps)} {
			opacity: random(10) / 10;
		}
	}
}
@keyframes glitch-animation-1 {
	$steps: 20;

	@for $i from 0 through $steps {
		#{percentage($i * 1 / $steps)} {
			clip: rect(random(100) + px, 1000px, random(100) + px, 0);
			transform: skew(random(16) - 8 + deg) translatex(random(30) - 15 + px);
		}
	}
}
@keyframes glitch-animation-2 {
	$steps: 20;

	@for $i from 0 through $steps {
		#{percentage($i * 1 / $steps)} {
			clip: rect(random(100) + px, 1000px, random(100) + px, 0);
			transform: skew(random(10) - 5 + deg) translatex(random(20) - 10 + px);
		}
	}
}
</style>
