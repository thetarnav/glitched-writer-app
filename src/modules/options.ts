import { reactive, watch } from 'vue'
import { presets as rawPresets } from 'glitched-writer'
import copyToCB from 'copy-to-clipboard'
import { saveToUrl, loadFromUrl } from './urlquery'
import { clamp } from '../assets/utils'

export type CompletePreset = typeof rawPresets.default
export type Preset = Partial<
	Omit<CompletePreset, 'html' | 'letterize' | 'endless'>
>
export type OptionName = keyof CompletePreset

const presets: {
	[presetName: string]: Preset
} = {}

/**
 * Fill preset object with modified presets from "rawPresets"
 */
Object.keys(rawPresets).forEach((presetName: any) => {
	const key: keyof typeof rawPresets = presetName,
		preset = rawPresets[key]

	// Change "oneAtATime" from boolean type to number
	if (typeof preset.oneAtATime === 'boolean')
		preset.oneAtATime = preset.oneAtATime ? 1 : 0

	// Parse "glyphs" from different types to only string
	if (typeof preset.glyphs !== 'string' && preset.glyphs)
		preset.glyphs = [...preset.glyphs].join('')

	// Parse "maxGhosts" from float to int
	if (preset.maxGhosts !== undefined && !Number.isInteger(preset.maxGhosts))
		preset.maxGhosts = clamp(0, preset.maxGhosts * 15, 20)

	// Remove functional (not-stylistic) options:
	preset.html = undefined
	preset.letterize = undefined
	preset.endless = undefined

	presets[key] = {
		...preset,
		glyphs: preset.glyphs as string,
		oneAtATime: preset.oneAtATime,
	}
})

/**
 * VARIABLES:
 */
const defaultOptions: CompletePreset = {
	...(presets.default as CompletePreset),
	html: true,
	letterize: true,
	endless: false,
}
const options = reactive({ ...defaultOptions, ...loadFromUrl() })

/**
 * Save options to URL
 */
watch(options, saveToUrl)

/**
 * METHODS:
 */
function reset() {
	setOptions(defaultOptions)
}

function copy() {
	copyToCB(JSON.stringify(options))
}

function setOptions(optionSet: Preset) {
	Object.assign(options, optionSet)
}

/**
 * EXPORTS:
 */
export { defaultOptions, options, reset, copy, setOptions, presets }

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
