<script lang="ts">
import { defineComponent } from 'vue'
import { getRandom } from '../../assets/utils'

const texts = [
	'Check out some Glitched Writer\'s <a href="https://codepen.io/collection/XWVEEa" target="_blank">usecase examples</a>!',
	'Like Glitched Writer? <a href="https://github.com/thetarnav/glitched-writer" target="_blank">Give it a Star</a>!',
	'Using Vue.js? There is a <a href="https://www.npmjs.com/package/vue-glitched-writer" target="_blank">vue-glitched-writer module</a>.',
	'Have a feature idea? <a href="https://github.com/thetarnav/glitched-writer/discussions" target="_blank">Request it on Github</a>.',
	'Found a bug? <a href="https://github.com/thetarnav/glitched-writer/issues/new" target="_blank">Please, report it on Github</a>.',
	'Your selected options are saved in the URL!',
]

export default defineComponent({
	name: 'EndingText',
	setup() {
		return {
			text: getRandom(texts),
		}
	},
})
</script>

<template>
	<div class="ending-text">
		<span v-html="text"></span>
	</div>
</template>
