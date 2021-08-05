// const esModules = ['@xet/totp-wasm-web'].join('|')

export default {
	extensionsToTreatAsEsm: ['.svelte'],
	moduleFileExtensions: ['js', 'svelte'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': ['svelte-jester', {preprocess: false}],
	},
	testEnvironment: 'jsdom',
	// testEnvironment: 'node',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	moduleNameMapper: {
		'@xet/totp-wasm-web': '<rootDir>/node_modules/@xet/totp-wasm-web/totp.js',
	},
	bail: false,
	verbose: true,
}
