export default {
	extensionsToTreatAsEsm: ['.svelte'],
	moduleFileExtensions: ['js', 'svelte'],
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
		'^.+\\.svelte$': ['svelte-jester', {preprocess: false}],
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'https://unpkg.com/@xet/totp-wasm-web@0.2.0/totp.js': '<rootDir>/custom-test-module.js',
		'https://www.unpkg.com/@tadashi/unflatten-object@2.0.1/src/unflatten.js': '<rootDir>/node_modules/@tadashi/unflatten-object/src/unflatten.js',
		'https://www.unpkg.com/@tadashi/flatten-object@3.1.0/src/flatten.js': '<rootDir>/node_modules/@tadashi/flatten-object/src/flatten.js',
	},
	bail: false,
	verbose: true,
}
