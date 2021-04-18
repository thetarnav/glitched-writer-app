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
