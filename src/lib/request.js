function request(endpoint, opts) {
	const {value, query, match, auth, storage} = opts

	// Prepare request
	let body = {value}
	if (query) {
		const _query = query.replace(match, value)
		body = {
			query: _query
		}
	}
	body = JSON.stringify(body)

	// Default header
	const headers = {
		'Content-Type': 'application/json'
	}

	// Authorization via attributes
	if (auth) {
		headers.Authorization = auth
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
		headers,
		body
	})
}

export default request
