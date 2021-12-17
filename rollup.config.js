import svelte from 'rollup-plugin-svelte'
// import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const ignoreWarnings = new Set([
	// 'css-unused-selector',
	'a11y-no-onchange',
	'a11y-label-has-associated-control',
])

const totp = 'https://unpkg.com/@xet/totp-wasm-web@0.2.0/totp.js'

export default {
	input: ['src/Pesquisa.svelte'],
	output: [
		{
			format: 'es',
			entryFileNames: '[name].js',
			dir: 'dist',
			sourcemap: true,
		},
		{
			format: 'es',
			entryFileNames: '[name].js',
			dir: 'public/module',
			sourcemap: true,
		},
	],
	external: [totp],
	plugins: [
		svelte({
			emitCss: false,
			compilerOptions: {
				// dev: !production,
				customElement: true,
			},
			onwarn(warning, handler) {
				// console.log('warning.code', warning.code)
				if (ignoreWarnings.has(warning.code)) {
					return
				}
				handler(warning)
			},
		}),
		resolve({browser: true}),
		commonjs(),
		// copy({
		// 	targets: [
		// 		{
		// 			src: 'node_modules/@xet/totp-wasm-web/totp_bg.wasm',
		// 			dest: ['dist', 'src', 'public/module'],
		// 		},
		// 	],
		// }),
	],
	watch: {
		clearScreen: false,
	},
}
