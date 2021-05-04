<template>
	<inline-svg src="./svg/screen-lines.svg" class="screen-lines" />
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
		@apply stroke-2 md:stroke-1;
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
}
</style>
