import { reactive, watch } from 'vue'
import { presets } from 'glitched-writer'
import copyToCB from 'copy-to-clipboard'
import { saveToUrl, loadFromUrl } from './urlquery'

const defaultOptions = {
	...presets.default,
	html: true,
	letterize: true,
}
const options = reactive({ ...defaultOptions, ...loadFromUrl() })

/**
 * Save options to URL
 */
watch(options, saveToUrl)

function reset() {
	setOptions(defaultOptions)
}

function copy() {
	copyToCB(JSON.stringify(options))
}

function setOptions(optionSet: Partial<typeof defaultOptions>) {
	Object.assign(options, {
		...optionSet,
		html: defaultOptions.html,
		letterize: defaultOptions.letterize,
		endless: defaultOptions.endless,
	})
}

export { defaultOptions, options, reset, copy, setOptions }

export type InputType = 'number' | 'range' | 'string' | 'boolean' | 'select'

export const inputDetails: {
	[key: string]:
		| {
				type: 'range' | 'number'
				range: [number, number]
		  }
		| {
				type: 'boolean' | 'string'
		  }
		| {
				type: 'select'
				list: any[]
		  }
} = {
	steps: {
		type: 'range',
		range: [0, 20],
	},
	interval: {
		type: 'range',
		range: [0, 300],
	},
	initialDelay: {
		type: 'range',
		range: [0, 3000],
	},
	changeChance: {
		type: 'number',
		range: [0, 1],
	},
	ghostChance: {
		type: 'number',
		range: [0, 1],
	},
	maxGhosts: {
		type: 'number',
		range: [0, 20],
	},
	glyphs: {
		type: 'string',
	},
	glyphsFromString: {
		type: 'boolean',
	},
	oneAtATime: {
		type: 'number',
		range: [0, 10],
	},
	html: {
		type: 'boolean',
	},
	fillSpace: {
		type: 'boolean',
	},
	letterize: {
		type: 'boolean',
	},
	endless: {
		type: 'boolean',
	},
	startFrom: {
		type: 'select',
		list: ['matching', 'previous', 'erase'],
	},
}
