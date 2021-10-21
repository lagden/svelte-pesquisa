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
 * Gera uma url com a qs + data-*
 * @param {string} endpoint - Endereço de disparo
 * @param {object} data     - Objeto
 * @return {string} Retorna uma URL
 */
export function fullURL(endpoint, data = {}) {
	const url = new URL(endpoint)
	const _qs = qs()
	for (const [k, v] of Object.entries({..._qs, ...data})) {
		url.searchParams.set(k, v)
	}
	return url.href
}

/**
 * Helper converte um valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @return {(boolean|string)} Se sucesso retorna o boolean
 */
export function parseBooleans(v, force = true) {
	if (typeof v === 'boolean') {
		return v
	}
	const _v = String(v)
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(_v)) {
		return _v.toLowerCase() === 'true' || _v === '1'
	}
	return force ? Boolean(v) : v
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

export function template(templateString, templateVars) {
	return new Function('return `' + templateString + '`').call(templateVars)
}
