import { reactive, ref, toRefs } from '@vue/reactivity'
import { WriterDataResponse } from 'glitched-writer'
import { debounce } from 'lodash'

const state = reactive({
	nGhosts: 0,
	state: 'stale' as 'stale' | 'finished' | 'paused' | 'typing',
	progressP: 0,
	progressN: 0,
	letters: [] as boolean[],
})

export const updateState = debounce(onWriterStepRaw, 80, { maxWait: 150 })

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
	state.letters = data.writer.charTable.map(char => char.finished)
	state.progressN = data.state.progress.done
	state.progressP = Math.round(data.state.progress.percent * 100)
}

export const pauseState = () => (state.state = 'paused')

export default function useState() {
	return {
		...toRefs(state),
	}
}
