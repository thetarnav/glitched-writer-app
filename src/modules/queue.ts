import { computed, reactive, ref, watch } from 'vue'

const initialTexts = [
		'Welcome.',
		'To Glitch&shy;ed Writer',
		'A java&shy;script module for writ&shy;ing text',
		'Play with options &amp; presets&hellip;',
		'Create <i>uni&shy;que effects</i>',
		'and <u>Enjoy</u>&#8252;',
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
