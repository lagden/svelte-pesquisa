/**
 * Helper para ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params() {
	const url = new URL(globalThis.location)
	return new URLSearchParams(url.search)
}

/**
 * Helper para ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function qs() {
	const data = {}
	for (const [k, v] of params()) {
		data[k] = v
	}
	return data
}
