function request(endpoint, opts) {
	let {value, query, match, auth, storage, signal, headers = {}} = opts

	// Prepare request
	let body = {value}
	if (query) {
		const _query = query.replace(match, value)
		body = {
			query: _query,
		}
	}
	body = JSON.stringify(body)

	// Headers
	// Authorization via attributes
	if (auth) {
		headers.Authorization = auth
	}

	headers = {
		'Content-Type': 'application/json',
		...headers,
	}

	// Authorization via localStorage
	if (storage) {
		headers.Authorization = `Bearer ${globalThis.localStorage.getItem(storage)}`
	}

	// Make the fetch
	return fetch(endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'default',
		credentials: 'include',
		redirect: 'follow',
		signal,
		headers,
		body,
	})
}

export default request
