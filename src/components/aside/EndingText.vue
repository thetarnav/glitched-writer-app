<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getRandom, random } from '../../assets/utils'

const texts = [
	'Check out some Glitched Writer\'s <a href="https://codepen.io/collection/XWVEEa" target="_blank">usecase examples</a>!',
	'Like Glitched Writer? <a href="https://github.com/thetarnav/glitched-writer" target="_blank">Give it a Star</a>!',
	'Using Vue? There is a GW <a href="https://www.npmjs.com/package/vue-glitched-writer" target="_blank">Component package</a>',
	'Have a feature idea? <a href="https://github.com/thetarnav/glitched-writer/discussions/new" target="_blank">Request it on Github</a>.',
	'Found a bug? <a href="https://github.com/thetarnav/glitched-writer/issues/new" target="_blank">Please report it on Github</a>.',
	'Your selected options are saved in the URL!',
]

export default defineComponent({
	name: 'EndingText',
	setup() {
		const text = getRandom(texts)

		return {
			text,
		}
	},
})
</script>

<template>
	<div class="ending-text">
		<span v-html="text"></span>
	</div>
</template>
