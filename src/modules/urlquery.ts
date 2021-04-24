import { debounce } from 'lodash'
import { defaultOptions } from './options'
import { stringify, parse } from 'query-string'

const debouncedFunc = (options: typeof defaultOptions) => {
	const different: { [key: string]: any } = {}

	Object.keys(options).forEach(optionName => {
		const key = (optionName as unknown) as keyof typeof options,
			value = options[key],
			defaultValue = defaultOptions[key]

		// glyphs are too long to save to URL
		if (key === 'glyphs') {
			if (
				typeof value === 'string' &&
				value !== defaultValue &&
				value.length < 100
			)
				different[key] = value
		}
		// For [number, number]
		// need to check exclusively
		// because [1] !== [1]
		else if (typeof value === 'object' && typeof defaultValue === 'object') {
			if (value[0] !== defaultValue[0] || value[1] !== defaultValue[1])
				different[key] = value
		}
		// For primitive values: normal check
		else if (value !== defaultValue) different[key] = value
	})

	const string = stringify(different)
	window.history.pushState({}, '', string.length ? '?' + string : '/')
}

/**
 * Saves options to URL.
 * @param options Options object.
 */
export const saveToUrl = debounce(debouncedFunc, 1000)

/**
 * Returns options object loaded from URL.
 * @returns object with options from url. All the values are parsed to required types. And keys correspond to writer options.
 */
export function loadFromUrl(): Partial<typeof defaultOptions> {
	const loaded = parse(location.search),
		options: Partial<typeof defaultOptions> = {},
		toFloat = (x: string) => Number.parseFloat(x) || 0,
		toInt = (x: string) => Number.parseInt(x) || 0

	Object.keys(loaded).forEach(optionName => {
		const key = (optionName as unknown) as keyof typeof defaultOptions,
			value = loaded[key],
			defaultValue = defaultOptions[key],
			push = (val: any) => (options[key] = val)

		if (value === null) return
		// For [number, number]
		if (typeof defaultValue === 'object')
			return push([toInt(value[0]), toInt(value[1])])
		if (typeof defaultValue === 'boolean') return push(value === 'true')
		if (typeof defaultValue === 'number' && typeof value === 'string')
			return push(toFloat(value))
		if (typeof defaultValue === 'string') return push(value)
	})

	return options
}
