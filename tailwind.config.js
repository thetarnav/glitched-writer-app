const plugin = require('tailwindcss/plugin')

// @ts-ignore
module.exports = {
	mode: 'jit',
	// purge: [],
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			0: '#FAF9EF', // Lightest Gray
			1: '#DEDCD6', // Light Gray
			2: '#A6A4A1', // Gray
			3: '#5A5654', // Dark Gray
			4: '#484540', // Darkest Gray
			gray: {
				lightest: '#FAF9EF', // 0
				light: '#DEDCD6', // 	1
				DEFAULT: '#A6A4A1', // 	2
				dark: '#5A5654', // 		3
				darkest: '#484540', // 	4
			},
		},
		fontFamily: {
			sans: [
				'Aileron',
				'Helvetica',
				'ui-sans-serif',
				'system-ui',
				'sans-serif',
			],
			mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
		},
		fontSize: {
			sm: '.75rem',
			base: '1rem',
			lg: '1.777rem',
			xl: '4.209rem',
		},
		lineHeight: {
			tight: '1rem',
			normal: '1.5rem',
			loose: '2rem',
		},
		letterSpacing: {
			tight: '-.035em',
			normal: '0',
			wide: '.035em',
		},
		extend: {
			spacing: {
				18: '4.5rem',
			},
			zIndex: {
				'-1': '-1',
			},
			transitionProperty: {
				'clip-path': 'clip-path',
			},
		},
	},
	variants: {
		extend: {},
	},
	// plugins: [
	// 	plugin(function ({ addUtilities }) {
	// 		const newUtilities = {
	// 			'.filter-none': {
	// 				filter: 'none',
	// 			},
	// 			'.filter-grayscale': {
	// 				filter: 'grayscale(100%)',
	// 			},
	// 		}

	// 		addUtilities(newUtilities, ['responsive'])
	// 	}),
	// ],
}
