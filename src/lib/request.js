import init, {generate_auto} from '@xet/totp-wasm-web'
import {template, parseBoolean, fullURL} from '@tadashi/common'

globalThis['@xet/totp-wasm'] = {
	initialized: false,
}

if (globalThis['@xet/totp-wasm'].initialized === false) {
	try {
		await init()
		globalThis['@xet/totp-wasm'].initialized = true
	} catch (error) {
		console.error('totp init error', error.message)
	}
}

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
		credentials: 'include',
		redirect: 'follow',
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

	if (parseBoolean(otp) === true && typeof generate_auto === 'function') {
		headers['x-auth-otp'] = generate_auto(2, BigInt(120))
	}

	// Make the fetch
	return globalThis.fetch(endpoint, {
		...fetchOpts,
		signal,
		headers,
	})
}

export default request
