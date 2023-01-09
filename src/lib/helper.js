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
