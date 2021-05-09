import { reactive, ref, toRefs } from '@vue/reactivity'
import { WriterDataResponse } from 'glitched-writer'
import { debounce } from 'lodash'

const state = reactive({
	nGhosts: 0,
	state: 'stale',
	progressP: 0,
	progressN: 0,
	letters: [] as boolean[],
})

export const updateState = debounce(onWriterStepRaw, 110, { maxWait: 220 })

function onWriterStepRaw(string: string, data: WriterDataResponse) {
	// Set number of ghosts
	state.nGhosts = data.state.nGhosts

	// Set verbal state
	{
		const {
			state: { isPaused, isTyping, finished },
		} = data
		if (finished) state.state = 'finished'
		else if (isPaused) state.state = 'paused'
		else if (isTyping) state.state = 'typing'
		else state.state = 'stale'
	}

	// Set progress & letters
	{
		const { charTable } = data.writer,
			nFinished = charTable.reduce(
				(acc, char) => acc + (char.finished ? 1 : 0),
				0,
			),
			p = nFinished / charTable.length

		state.letters = charTable.map(char => char.finished)
		state.progressN = nFinished
		state.progressP = Math.round(p * 100)
	}
}

export default function useState() {
	return {
		...toRefs(state),
	}
}
