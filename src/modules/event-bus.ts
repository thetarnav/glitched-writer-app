import mitt, { Handler } from 'mitt'
const emitter = mitt()

class Emitter<T> {
	name: string

	constructor(name: string) {
		this.name = name
	}

	listen(handler: Handler<T>) {
		emitter.on(this.name, handler)
	}

	emit(payload: T) {
		emitter.emit(this.name, payload)
	}
}

export const finishEmitter = new Emitter<string>('gw-finish')

export const writerStateAction = new Emitter<'togglePause' | 'reset'>(
	'sriter-state-change',
)
