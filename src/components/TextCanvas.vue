<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'
import { wait, ConstructorOptions, WriterDataResponse } from 'glitched-writer'
import { options as modelOptions } from '../modules/options'
import useQueue from '../modules/queue'
import { onWriterStep } from '../modules/state'
import { debounce } from 'lodash'
import tabs from '../modules/tabs'

export default defineComponent({
	components: {
		GlitchedWriter,
	},
	setup() {
		const { nextText } = useQueue()

		const text = ref(nextText())
		const afterFinish = async (
			string: string,
			data: WriterDataResponse,
		): Promise<any> => {
			onWriterStep(string, data)
			await wait(1200)
			let next = nextText()
			if (next === text.value) return afterFinish(string, data)
			text.value = next
		}

		/**
		 * Random is a dummy reactive value,
		 * it's purpose is to "trigger" options val change,
		 * so that glitched-writer could react to changes.
		 */
		const random = ref(Math.random())
		watch(modelOptions, () => (random.value = Math.random()))

		return {
			text,
			afterFinish,
			random,
			onWriterStep,
			isTabOpen: computed(() => tabs.isTabOpen()),
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
	watch: {
		random() {
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
	<figure class="text-canvas" :class="{ 'tab-open': isTabOpen }">
		<h1>
			<GlitchedWriter
				:text="text"
				appear
				:options="options"
				@step="onWriterStep"
				@finish="afterFinish"
			/>
		</h1>
	</figure>
</template>

<style lang="scss" scoped>
.text-canvas {
	@apply w-full h-full flex justify-center items-center overflow-hidden;

	@apply transition-transform duration-500;
	&.tab-open {
		@apply transform lg:translate-x-[15%];
	}
}
</style>

<style lang="scss">
.glitched-writer {
	@apply relative p-6 block font-mono text-black tracking-tight whitespace-pre;
	line-height: 1.1;

	&::after,
	&::before {
		content: attr(data-gw-string);
		@apply absolute opacity-0 inset-0 p-6;
		@apply text-gray-400 font-light;
	}
	&::before {
		@apply text-purple-400 -z-1;
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
