import { computed, reactive, ref, watch } from 'vue'

const initialTexts = [
		'Welcome!',
		'To <b>Glitch&shy;ed Writer!</b>',
		'A <a href="https://npmjs.com/package/glitched-writer">java&shy;script module</a> for ani&shy;mating text',
		'Play with options &amp; presets',
		'Create <i>uni&shy;que effects</i>',
		'and Enjoy!',
	],
	queue = reactive(initialTexts.map((text, id) => ({ text, id })))

export default function useQueue() {
	let i = -1
	function nextText(): string {
		i++
		if (i === queue.length) i = 0
		return queue[i].text
	}

	function reset(): void {
		for (let j = 0; j < initialTexts.length; j++) {
			queue.shift()
			queue.push({ text: initialTexts[j], id: j })
		}
	}

	return { queue, nextText, reset }
}
