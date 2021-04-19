<script lang="ts">
import { defineComponent, ref } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'
import { wait } from 'glitched-writer'
import useOptions from '../state/options'
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
		const { options } = useOptions()
		const { nextText } = useQueue()

		const text = ref(nextText())

		const afterFinish = async (): Promise<any> => {
			await wait(1200)
			let next = nextText()
			if (next === text.value) return afterFinish()
			text.value = next
		}

		return { options, text, afterFinish }
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
