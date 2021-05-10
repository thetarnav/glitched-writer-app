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
				<h6>What is Glitched Writer?</h6>
				<p>
					A lightweight text writing module, with highly customizable
					settings. For decoding, glitching, decrypting, scrambling, or
					simply spelling out text.
				</p>
			</div>
			<div class="about-features">
				<h6>Features:</h6>
				<ul>
					<li>
						Manages text animation of HTML Element. Write, pause, play,
						add, remove and write some more!
					</li>
					<li>
						Highly customizable behavior. Set of options let's you animate
						text the way it suits your design.
					</li>
					<li>
						Callback functions firing for every step and finished text.
					</li>
					<li>
						Custom Event "gw-finished" will also be dispatched on the HTML
						Element.
					</li>
					<li>
						For styling purposes writer attatches "gw-writing" class to
						the HTML Element and "data-gw-string" attribute with current
						string.
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
				<h6>Links:</h6>
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
			<p class="text-sm leading-tight mt-5">
				Website source code on
				<a
					href="https://github.com/thetarnav/glitched-writer-app"
					target="_blank"
					>github</a
				>, <br />
				created by
				<a target="_blank" href="https://github.com/thetarnav"
					>Damian Tarnawski</a
				>,<br />
				with the help of
				<a target="_blank" href="https://github.com/kacper317"
					>Kacper Dąbrowski</a
				>.
			</p>
		</div>
	</transition>
	<div class="action-buttons">
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
.about {
	@apply mx-4;
}
h6 {
	@apply mb-2 mt-5;
}
.about-features {
	li {
		@apply relative my-2;

		&:before {
			content: '';
			@apply absolute bg-2 w-2 h-px right-full top-3 mr-2;
		}
	}
}
.about-links {
	ul {
		@apply mt-2 flex flex-col space-y-2;
	}
	li {
		@apply relative;
		&:before {
			content: '';
			@apply absolute bg-2 w-2 h-px right-full top-3 mr-2;
		}
	}
	a {
		@apply flex space-x-2;
	}
	svg {
		@apply w-5;
	}
}
</style>
