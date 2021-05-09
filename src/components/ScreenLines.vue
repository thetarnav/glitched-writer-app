<script lang="ts">
import { defineComponent } from 'vue'
import anime from 'animejs'

export default defineComponent({
	mounted() {
		anime({
			targets: '.screen-lines line',
			strokeDashoffset: [anime.setDashoffset, 0],
			opacity: 100,
			easing: 'easeInOutSine',
			duration: 1500,
			delay(el, i) {
				return i * 250
			},
		})
	},
})
</script>

<template>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1920 1080"
		fill="none"
		stroke="currentColor"
		width="100%"
		height="100%"
		preserveAspectRatio="none"
		class="screen-lines"
	>
		<line x1="0" y1="0" x2="1920" y2="1080" />
		<line x1="0" y1="1080" x2="1920" y2="0" />
		<line x1="733.37" y1="0" x2="733.37" y2="1080" />
		<line x1="1186.63" y1="0" x2="1186.63" y2="1080" />
		<line x1="0" y1="667.48" x2="1920" y2="667.48" />
		<line x1="0" y1="412.52" x2="1920" y2="412.52" />
	</svg>

	<div class="screen-circle-wrapper">
		<div class="screen-circle"></div>
	</div>
</template>

<style lang="scss">
.screen-lines,
.screen-circle-wrapper {
	@apply absolute inset-0 -z-1 h-screen w-screen pointer-events-none;
}
.screen-lines {
	@apply text-gray-light;
	line {
		@apply stroke-2 md:stroke-1 opacity-0;
	}
}

@keyframes opacity-show {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.screen-circle {
	&-wrapper {
		@apply flex justify-center items-center;
	}
	@apply border-[1px] border-gray-light rounded-full;
	$size: 61.8vmin;
	width: $size;
	height: $size;

	animation: opacity-show 2s 300ms both;
}
</style>
