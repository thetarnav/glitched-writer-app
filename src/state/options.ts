import { reactive } from 'vue'
import { presets, ConstructorOptions } from 'glitched-writer'
import copyToCB from 'copy-to-clipboard'

const defaultOptions = {
		...presets.default,
		html: true,
		letterize: true,
	},
	options = reactive({ ...defaultOptions })

function reset() {
	Object.entries(defaultOptions).forEach(([key, value]) => {
		// @ts-ignore
		options[key] = value
	})
}

function copy() {
	copyToCB(JSON.stringify(options))
}

export default function useOptions() {
	return { options, reset, copy }
}

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
		range: [0, 1],
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
