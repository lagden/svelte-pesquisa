// Helper - Prepare event and dispatch
function dispatch(data, node, success, cb) {
	let _event
	if (success) {
		_event = new CustomEvent('response', {
			detail: {...data},
			bubbles: true,
			composed: true
		})
	} else {
		_event = new ErrorEvent('error', {
			error: data,
			message : data.message,
			lineno : 72,
			filename : 'Pesquisa.svelte',
			bubbles: true,
			composed: true
		})
	}

	// Dispatch event
	node.dispatchEvent(_event)

	if (cb && typeof cb === 'function') {
		cb()
	}
}

export default dispatch
