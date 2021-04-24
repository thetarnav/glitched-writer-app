<script lang="ts">
import { defineComponent } from 'vue'
import tabs from '../../modules/tabs'

export default defineComponent({
	name: 'About',
	methods: {
		closeTab() {
			tabs.tab = -1
		},
	},
})
</script>

<template>
	<transition name="slow-fade" appear>
		<div class="about">
			<div class="about-header">
				<h5>What is Glitched Writer?</h5>
				<p>
					A lightweight, glitched, text writing module. Highly customizable
					settings. Decoding, decrypting, scrambling, and simply spelling
					out text.
				</p>
			</div>
			<div class="about-features">
				<h5>Features:</h5>
				<ul>
					<li>
						Manages text animation of HTML Element. Write, pause, play,
						add, remove and write some more!
					</li>
					<li>
						Highly customizable behavior. Set of options let you animate
						the text the way is suits your design.
					</li>
					<li>Callback functions firing on finish and every step.</li>
					<li>
						Custom Event gw-finished will be dispatched on the HTML
						Element.
					</li>
					<li>
						For styling purposes writer attatches gw-writing class to the
						HTML Element and data-gw-string attribute with current string.
					</li>
					<li>Handles html tags & html entities.</li>
					<li>
						Can letterize string it into many span elements inside the
						parent element.
					</li>
					<li>Written fully in Typescript.</li>
				</ul>
			</div>
			<div class="about-links">
				<h5>Links:</h5>
				<ul>
					<li>
						<a
							href="https://github.com/thetarnav/glitched-writer"
							target="_blank"
						>
							<inline-svg src="./svg/github.svg" />
							<span> Github </span>
						</a>
					</li>
					<li>
						<a
							href="https://www.npmjs.com/package/glitched-writer"
							target="_blank"
						>
							<inline-svg src="./svg/npm.svg" />
							<span> NPM </span>
						</a>
					</li>
					<li>
						<a
							href="https://www.npmjs.com/package/vue-glitched-writer"
							target="_blank"
						>
							<inline-svg src="./svg/github.svg" />
							<span> Vue component </span>
						</a>
					</li>
					<li>
						<a
							href="https://codepen.io/collection/XWVEEa"
							target="_blank"
						>
							<inline-svg src="./svg/codepen.svg" />
							<span> Demos </span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</transition>
	<div class="action-buttons">
		<IconButton icon="close" class="close" @click="closeTab" />
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
.about-links {
	ul {
		@apply mt-2 flex flex-col space-y-3;
	}
	a {
		@apply flex space-x-2;
	}
}
</style>
