<svelte:options tag="tadashi-pesquisa" />

<script>
	import flatten from '@tadashi/flatten-object'
	import unflatten from '@tadashi/unflatten-object'

	export let endpoint
	export let target = undefined
	export let auth = undefined
	export let storage = undefined
	export let query = undefined
	export let match = '${value}'
	export let key = 'id'
	export let parse = false
	export let shadow = false

	let node
	let currentResponse
	let isBusy = false
	let items = []

	// Helper - Prepare event and dispatch
	function _dispatch(data, success) {
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
				lineno : 62,
				filename : 'Pesquisa.svelte',
				bubbles: true,
				composed: true
			})
		}

		// Cleanup
		items = []

		// Dispatch event
		node.dispatchEvent(_event)
	}

	async function search(event) {
		// Busy, so, ignore request
		if (isBusy) {
			return
		}

		// Get input element
		const _target = document.querySelector(target)

		// Get value
		const value = _target?.value
		if (!value) {
			return
		}

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

		// Event to dispatch
		let _event

		try {
			// Now is busy
			isBusy = true

			// Make the fetch
			const response = await fetch(endpoint, {
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				credentials: 'include',
				redirect: 'follow',
				headers,
				body
			})

			// HttpError
			if (!response.ok) {
				const _error = new Error(response.statusText)
				_error.status = response.status
				_error.statusText = response.statusText
				if (/application\/json/g.test(response.headers.get('content-type'))) {
					_error.body = await response.json()
				}
				throw _error
			}

			// Success
			currentResponse = await response.json()

			// Flat
			if (parse) {
				const flat = flatten(currentResponse)
				const _data = flat?.[parse]
				const preItems = (Array.isArray(_data) && _data.length > 0 && _data) ?? []
				if (preItems.length > 1) {
					items = [...preItems]
					currentResponse = flat
					return
				}
				items = []
			}

			// Dispatch success
			_dispatch(currentResponse, true)
		} catch (error) {
			console.error('Pesquisa Error', {...error})
			// Dispatch error
			_dispatch(error, false)
		} finally {
			// Free
			isBusy = false
		}
	}

	function itemSelected(idx) {
		return () => {
			currentResponse[parse] = [currentResponse[parse][idx]]
			_dispatch(unflatten(currentResponse), true)
		}
	}
</script>

<div class="_tadashi_pesquisa">
	<div class="_tadashi_pesquisa__target">
		<slot />
		{#if items && items.length > 0}
			<div class="_tadashi_pesquisa__items">
				{#each items as item, idx (item?.[key ?? 'id'] ?? item)}
					<div class="_tadashi_pesquisa__item" on:click={itemSelected(idx)}>{item?.[key ?? 'id']}</div>
				{/each}
			</div>
		{/if}
	</div>
	<button
		type="button"
		class="_tadashi_pesquisa__trigger"
		bind:this={node}
		class:_tadashi_pesquisa__trigger___loading={isBusy}
		class:_tadashi_pesquisa__trigger___shadow={shadow}
		on:click={search}
		{...$$restProps}
	>✓</button>
</div>

<style>
	:host {
		--tadashi_pesquisa_grid_gap: 0.5em;

		--tadashi_pesquisa__trigger_align_items: center;
		--tadashi_pesquisa__trigger_background_color: hsl(210deg 50% 50%);
		--tadashi_pesquisa__trigger_background_image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" width="16" height="16"><path fill="hsl(0deg 0% 100%)" d="M497.914 497.913c-18.783 18.782-49.225 18.782-68.008 0l-84.863-84.863c-34.888 22.382-76.13 35.717-120.659 35.717-123.915 0-224.384-100.454-224.384-224.384s100.469-224.383 224.384-224.383c123.931 0 224.384 100.452 224.384 224.383 0 44.514-13.352 85.771-35.718 120.676l84.864 84.863c18.781 18.782 18.781 49.209 0 67.991zM224.384 64.109c-88.511 0-160.274 71.747-160.274 160.273s71.763 160.274 160.274 160.274c88.526 0 160.274-71.748 160.274-160.274s-71.748-160.273-160.274-160.273z"></path></svg>');
		--tadashi_pesquisa__trigger_border: none;
		--tadashi_pesquisa__trigger_border_radius: 0.15em;
		--tadashi_pesquisa__trigger_box_shadow: 0 0 8px hsla(0deg 0% 0% / 30%);
		--tadashi_pesquisa__trigger_color: hsl(0deg 0% 100% / 0%);
		--tadashi_pesquisa__trigger_cursor: pointer;
		--tadashi_pesquisa__trigger_filter_brightness: 1.3;
		--tadashi_pesquisa__trigger_font_size: 1em;
		--tadashi_pesquisa__trigger_font_weight: 300;
		--tadashi_pesquisa__trigger_grid_gap: 5px;
		--tadashi_pesquisa__trigger_height: 36px;
		--tadashi_pesquisa__trigger_outline: 0;
		--tadashi_pesquisa__trigger_opacity: 0.5;
		--tadashi_pesquisa__trigger_padding: 0;
		--tadashi_pesquisa__trigger_transition_duration: 0.5s;
		--tadashi_pesquisa__trigger_width: 36px;

		--tadashi_pesquisa__trigger___loading_background_image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 100 100" width="40" height="40"><path fill="hsl(0deg 0% 100%)" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.5s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>');

		--tadashi_pesquisa__items_grid_gap: 0.3em;
		--tadashi_pesquisa__items_top: calc(100% + 3px);
		--tadashi_pesquisa__items_background_color: hsl(225deg 5% 17%);
		--tadashi_pesquisa__items_color: hsl(0deg 0% 100%);
		--tadashi_pesquisa__items_border_radius: 3px;

		--tadashi_pesquisa__item_padding: 0.7em;
		--tadashi_pesquisa__item_border_radius: 3px;
		--tadashi_pesquisa__item___hover_background_color: hsl(225deg 3% 30%);
		--tadashi_pesquisa__item___active_background_color: hsl(225deg 3% 30%);
	}

	._tadashi_pesquisa {
		position: relative;
		display: grid;
		align-items: center;
		grid-gap: var(--tadashi_pesquisa_grid_gap);
		grid-template-columns: 1fr auto;
	}

	._tadashi_pesquisa__target {
		position: relative;
	}

	._tadashi_pesquisa__items {
		display: grid;
		grid-gap: var(--tadashi_pesquisa__items_grid_gap);
		grid-template-columns: 1fr;
		width: 100%;
		position: absolute;
		top: var(--tadashi_pesquisa__items_top);
		right: auto;
		bottom: auto;
		left: auto;
		background-color: var(--tadashi_pesquisa__items_background_color);
		color: var(--tadashi_pesquisa__items_color);
		border-radius: var(--tadashi_pesquisa__items_border_radius);
	}

	._tadashi_pesquisa__item {
		cursor: pointer;
		padding: var(--tadashi_pesquisa__item_padding);
		border-radius: var(--tadashi_pesquisa__item_border_radius);
	}

	._tadashi_pesquisa__item:hover {
		background-color: var(--tadashi_pesquisa__item___hover_background_color);
	}

	._tadashi_pesquisa__item:active {
		background-color: var(--tadashi_pesquisa__item___active_background_color);
	}

	._tadashi_pesquisa__trigger {
		align-items: var(--tadashi_pesquisa__trigger_align_items);
		background-color: var(--tadashi_pesquisa__trigger_background_color);
		background-image: var(--tadashi_pesquisa__trigger_background_image);
		background-repeat: no-repeat;
		background-position: center;
		border: var(--tadashi_pesquisa__trigger_border);
		border-radius: var(--tadashi_pesquisa__trigger_border_radius);
		box-sizing: border-box;
		color: var(--tadashi_pesquisa__trigger_color);
		cursor: var(--tadashi_pesquisa__trigger_cursor);
		font-size: var(--tadashi_pesquisa__trigger_font_size);
		font-weight: var(--tadashi_pesquisa__trigger_font_weight);
		height: var(--tadashi_pesquisa__trigger_height);
		outline: var(--tadashi_pesquisa__trigger_outline);
		overflow: hidden;
		padding: var(--tadashi_pesquisa__trigger_padding);
		position: relative;
		transition: filter var(--tadashi_pesquisa__trigger_transition_duration);
		width: var(--tadashi_pesquisa__trigger_width);
		will-change: filter;

		display: inline-grid;
		grid-auto-flow: column;
		grid-template-columns: auto;
		grid-gap: var(--tadashi_pesquisa__trigger_grid_gap);
	}

	._tadashi_pesquisa__trigger___shadow {
		box-shadow: var(--tadashi_pesquisa__trigger_box_shadow);
	}

	._tadashi_pesquisa__trigger___loading {
		background-image: var(--tadashi_pesquisa__trigger___loading_background_image);
	}

	._tadashi_pesquisa__trigger:disabled {
		cursor: not-allowed;
		opacity: var(--tadashi_pesquisa__trigger_opacity);
	}

	._tadashi_pesquisa__trigger:not(:disabled):active {
		filter: brightness(var(--tadashi_pesquisa__trigger_filter_brightness));
	}
</style>
