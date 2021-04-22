<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'
import { wait, ConstructorOptions } from 'glitched-writer'
import { options as modelOptions } from '../state/options'
import useQueue from '../state/queue'

export default defineComponent({
	components: {
		GlitchedWriter,
	},
	computed: {
		isTabOpen(): boolean {
			return this.$store.getters.isTabOpen()
		},
	},
	setup() {
		const { nextText } = useQueue()

		const text = ref(nextText())
		const afterFinish = async (): Promise<any> => {
			await wait(1200)
			let next = nextText()
			if (next === text.value) return afterFinish()
			text.value = next
		}

		/**
		 * Random is a dummy reactive value,
		 * it's purpose is to "trigger" options val change,
		 * so that glitched-writer could react to changes.
		 */
		const random = ref(Math.random())
		watch(modelOptions, () => (random.value = Math.random()))

		return { text, afterFinish, random }
	},
	data() {
		return {
			options: {} as ConstructorOptions,
		}
	},
	watch: {
		random() {
			this.setOptions()
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
				@finish="afterFinish"
			/>
		</h1>
	</figure>
</template>

<style lang="scss" scoped>
.text-canvas {
	@apply w-full h-full flex justify-center items-center;

	@apply transition-transform;
	&.tab-open {
		@apply transform lg:translate-x-[15%];
	}
}
</style>
