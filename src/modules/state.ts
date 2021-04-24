import { reactive, ref, toRefs } from '@vue/reactivity'
import { WriterDataResponse } from 'glitched-writer'

const state = reactive({
	nGhosts: 0,
	state: 'stale',
	progress: 0,
})

export function onWriterStep(string: string, data: WriterDataResponse) {
	state.nGhosts = data.state.nGhosts

	{
		const {
			state: { isPaused, isTyping, finished },
		} = data
		if (finished) state.state = 'finished'
		else if (isPaused) state.state = 'paused'
		else if (isTyping) state.state = 'typing'
		else state.state = 'stale'
	}

	{
		const { charTable } = data.writer,
			nFinished = charTable.reduce(
				(acc, char) => acc + (char.finished ? 1 : 0),
				0,
			),
			p = nFinished / charTable.length

		state.progress = Math.round(p * 100)
	}
}

export default function useState() {
	return {
		...toRefs(state),
	}
}
