<script lang="ts">
import { defineComponent } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'

export default defineComponent({
	components: {
		GlitchedWriter,
	},
	computed: {
		isTabOpen(): boolean {
			return this.$store.getters.isTabOpen()
		},
	},
	setup() {},
})
</script>

<template>
	<figure class="text-canvas" :class="{ 'tab-open': isTabOpen }">
		<h1>
			<GlitchedWriter text="Hello World" appear />
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
