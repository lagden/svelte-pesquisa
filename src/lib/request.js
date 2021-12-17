import {generate} from 'https://unpkg.com/@xet/totp-wasm-web@0.2.0/totp.js'
import {template, parseBooleans, fullURL} from './helper.js'

function request(endpoint, opts) {
	const {
		value,
		query,
		auth,
		storage,
		otp,
		prop,
		signal,
		method = 'post',
		headers = {},
	} = opts

	const fetchOpts = {
		method,
		// mode: 'cors',
		// cache: 'default',
		// credentials: 'include',
		// redirect: 'follow',
	}

	// Prepare request
	const data = typeof value === 'object' ? {...value} : {[prop]: value}

	if (method.toLowerCase() === 'get') {
		endpoint = fullURL(endpoint, data)
	} else {
		headers['Content-Type'] = 'application/json'

		let body = data
		if (query) {
			body = {
				query: template(query, data),
			}
		}
		fetchOpts.body = JSON.stringify(body)
	}

	// Headers
	if (auth) {
		// Authorization via attributes
		headers.Authorization = auth
	} else if (storage) {
		// Authorization via localStorage
		headers.Authorization = `Bearer ${globalThis.localStorage.getItem(storage)}`
	}

	if (parseBooleans(otp) === true && typeof generate === 'function') {
		headers['x-auth-otp'] = generate(2, BigInt(120))
	}

	// Make the fetch
	return globalThis.fetch(endpoint, {
		...fetchOpts,
		signal,
		headers,
	})
}

export default request
