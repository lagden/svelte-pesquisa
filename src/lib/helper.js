/**
 * Helper para ler a query string
 * @return {object} Retorna um objeto URLSearchParams
 */
export function params() {
	const url = new URL(globalThis.location)
	return new URLSearchParams(url.search)
}

/**
 * Helper para transformar query string em objeto
 * @return {object} Retorna um objeto
 */
export function qs() {
	const data = {}
	for (const [k, v] of params()) {
		data[k] = v
	}
	return data
}

/**
 * Helper converte um valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @return {(boolean|string)} Se sucesso retorna o boolean
 */
export function parseBooleans(v) {
	if (typeof v === 'boolean') {
		return v
	}

	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(v)) {
		v = String(v).toLowerCase() === 'true' || String(v) === '1'
	}
	return v
}

/**
 * Helper para localizar no DOM o primeiro elemento input
 * @return {object} Retorna um objeto HTMLInputElement
 */
export function getEl(node) {
	let element
	if (node && node instanceof HTMLInputElement) {
		return node
	}

	if (typeof node?.assignedElements === 'function') {
		for (const _element of node.assignedElements({flatten: true})) {
			if (_element instanceof HTMLInputElement === true) {
				element = _element
				break
			}
		}
	}

	return element
}
