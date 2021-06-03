import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const ignoreWarnings = new Set([
	// 'css-unused-selector',
	'a11y-no-onchange',
	'a11y-label-has-associated-control'
])

export default {
	input: ['src/Pesquisa.svelte'],
	output: [
		{
			format: 'es',
			entryFileNames: '[name].js',
			dir: 'dist',
			sourcemap: true
		},
		{
			format: 'es',
			entryFileNames: '[name].js',
			dir: 'public/module',
			sourcemap: true
		}
	],
	plugins: [
		svelte({
			emitCss: false,
			compilerOptions: {
				// dev: !production,
				customElement: true
			},
			onwarn(warning, handler) {
				// console.log('warning.code', warning.code)
				if (ignoreWarnings.has(warning.code)) {
					return
				}
				handler(warning)
			}
		}),
		resolve({browser: true}),
		commonjs()
	],
	watch: {
		clearScreen: false
	}
}
