#!/usr/bin/env node

import esbuild from 'esbuild'
import esbuildSvelte from 'esbuild-svelte'
import config from './svelte.config.js'

console.time('build')

try {
	const result = await esbuild.build({
		entryPoints: ['src/Pesquisa.svelte'],
		bundle: true,
		sourcemap: true,
		minify: false,
		splitting: false,
		format: 'esm',
		outdir: './dist',
		target: ['es2021'],
		plugins: [
			esbuildSvelte(config),
		],
	})
	console.log(result)
} catch (error) {
	console.error(error)
	process.exit(1)
} finally {
	console.timeEnd('build')
}
