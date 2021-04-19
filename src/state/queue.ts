import { computed, reactive, ref, watch } from 'vue'

const initialTexts = [
		'Welcome!',
		'To <b>Glitched Writer!</b>',
		'A <a href="https://npmjs.com/package/glitched-writer">javascript module</a> for animating text',
		'Play with options and presets',
		'Create <i>unique effects</i>',
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
