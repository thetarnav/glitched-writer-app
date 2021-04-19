<script lang="ts">
import { DefineComponent, defineComponent } from 'vue'

export default defineComponent({
	name: 'About',
	setup() {},
})
</script>

<template>
	<div class="about">
		<div class="about-header">
			<h5>What is Glitched Writer?</h5>
			<p>
				A lightweight, glitched, text writing module. Highly customizable
				settings. Decoding, decrypting, scrambling, and simply spelling out
				text.
			</p>
		</div>
		<div class="about-features">
			<h5>features:</h5>
			<ul>
				<li>
					Manages text animation of HTML Element. Write, pause, play, add,
					remove and write some more!
				</li>
				<li>
					Highly customizable behavior. Set of options let you animate the
					text the way is suits your design.
				</li>
				<li>Callback functions firing on finish and every step.</li>
				<li>
					Custom Event gw-finished will be dispatched on the HTML Element.
				</li>
				<li>
					For styling purposes writer attatches gw-writing class to the
					HTML Element and data-gw-string attribute with current string.
				</li>
				<li>Handles html tags & html entities.</li>
				<li>
					Can letterize string it into many span elements inside the parent
					element.
				</li>
				<li>Written fully in Typescript.</li>
			</ul>
		</div>
		<div class="about-links">
			<h5>Links:</h5>
			<div><IconButton icon="github" /> <span>GitHub</span></div>
			<div><IconButton icon="npm" /> <span>NPM</span></div>
			<div><IconButton icon="github" /> <span>Vue component</span></div>
			<div><IconButton icon="github" /> <span>Demos</span></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.about-header {
	@apply mb-3;
}
.about-header p {
	@apply mt-3;
}
.about-features ul {
	@apply list-disc p-3;
}
.about-features li {
	@apply p-1;
}
.about-links div {
	@apply flex items-center pt-2;
}
.about-links span {
	@apply pl-3;
}
.about-links h5 {
	@apply mb-3;
}
</style>
