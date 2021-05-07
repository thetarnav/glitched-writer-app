export function random(
	min: number,
	max: number,
	math?: 'floor' | 'round' | 'ceil',
): number {
	const result = Math.random() * (max - min) + min
	if (math) {
		// eslint-disable-next-line default-case
		switch (math) {
			case 'floor':
				return Math.floor(result)
			case 'round':
				return Math.round(result)
			case 'ceil':
				return Math.ceil(result)
		}
	}
	return result
}

export const clamp = (min: number, value: number, max: number) =>
	Math.min(Math.max(value, min), max)

export const deleteRandom = (array: any[]): boolean =>
	array.splice(random(0, array.length, 'floor'), 1).length > 0

export function getRandom<T>(iterable: Array<T>): T
export function getRandom(iterable: string): string
export function getRandom(iterable: any[] | string): any {
	return iterable[random(0, iterable.length, 'floor')]
}

export const lerp = (current: number, goal: number, p: number): number =>
	(1 - p) * current + p * goal

export const flipP = (p: number): number =>
	p >= 0 ? Math.abs(p - 1) : Math.abs(p) - 1

export const flipVal = (val: number, min: number, max: number): number =>
	Math.abs(val * (Math.sign(val) || 1) - max) + min

export const pToVal = (p: number, zero: number, hundred: number): number =>
	p * (hundred - zero) + zero

export function valToP(value: number, min: number, max: number): number {
	if (min > max) {
		;[min, max] = [max, min]
		value = flipVal(value, min, max)
	}
	return (value - min) / (max - min)
}

export function valToPwMid(
	value: number,
	min: number,
	max: number,
	turn = pToVal(0.5, min, max),
): number {
	if (min > max) {
		;[min, max] = [max, min]
		turn = flipVal(turn, min, max)
		value = flipVal(value, min, max)
	}
	return value < turn
		? (value - turn) / (turn - min)
		: (value - turn) / (max - turn)
}

export const isInRange = (
	n: number,
	min: number,
	max: number,
	exc = false,
): boolean => {
	if (min > max) {
		const tmpMin = min
		min = max
		max = tmpMin
	}
	return exc ? n > min && n < max : n >= min && n <= max
}

export function roundNumber(num: number, scale: number): number {
	if (!('' + num).includes('e')) {
		return +(Math.round(parseFloat(num + 'e+' + scale)) + 'e-' + scale)
	} else {
		var arr = ('' + num).split('e')
		var sig = ''
		if (+arr[1] + scale > 0) {
			sig = '+'
		}
		return +(
			Math.round(parseFloat(+arr[0] + 'e' + sig + (+arr[1] + scale))) +
			'e-' +
			scale
		)
	}
}
