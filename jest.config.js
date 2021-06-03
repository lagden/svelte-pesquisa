export default {
	moduleFileExtensions: ['js', 'svelte'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': 'svelte-jester'
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {},
	transformIgnorePatterns: [],
	// testPathIgnorePatterns: [],
	bail: false,
	verbose: true
}
