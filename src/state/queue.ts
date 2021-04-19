import { computed, reactive, ref, watch } from 'vue'

const initialTexts = [
		'Welcome',
		'To the Glitched Writer!',
		'An NPM Package for text writing animation.',
		'Test options and presets',
		'Create unique effects',
		'And Enjoy!',
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
		// while (queue.length > 0) {
		// 	queue.pop
		// }
		// let j = 0
		for (let j = 0; j < initialTexts.length; j++) {
			queue.shift()
			queue.push({ text: initialTexts[j], id: j })
		}
		// while (queue.length < initialTexts.length) {
		// }
	}

	return { queue, nextText, reset }
}
