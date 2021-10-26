export default {
	extensionsToTreatAsEsm: ['.svelte'],
	moduleFileExtensions: ['js', 'svelte'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': ['svelte-jester', {preprocess: false}],
	},
	testEnvironment: 'jsdom',
	// moduleNameMapper: {
	// 	'@xet/totp-wasm-web': '<rootDir>/node_modules/@xet/totp-wasm-web/totp.js',
	// },
	moduleNameMapper: {
		'https://unpkg.com/@xet/totp-wasm-web@0.1.2/totp.js': '<rootDir>/custom-test-module.js',
	},
	bail: false,
	verbose: true,
}
