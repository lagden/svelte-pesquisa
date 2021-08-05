// Helper - Prepare event and dispatch
function dispatch(data, node, success, cb) {
	const _event = success ?
		new CustomEvent('response', {
			detail: {...data},
			bubbles: true,
			composed: true,
		}) :
		new ErrorEvent('error', {
			error: data,
			message: data.message,
			lineno: 72,
			filename: 'Pesquisa.svelte',
			bubbles: true,
			composed: true,
		})

	// Dispatch event
	node.dispatchEvent(_event)

	if (cb && typeof cb === 'function') {
		cb()
	}
}

export default dispatch
