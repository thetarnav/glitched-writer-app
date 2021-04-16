const colors = require('tailwindcss/colors')

// @ts-ignore
module.exports = {
	mode: 'jit',
	// purge: [],
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: colors.trueGray,
			},
			spacing: {
				18: '4.5rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
