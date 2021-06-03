/* global describe, afterEach, test, expect */
/* eslint no-unused-vars: 0 */

import {
	fireEvent,
	cleanup,
	render
} from '@testing-library/svelte'
import Pesquisa from '../src/Pesquisa.svelte'
import Slot from './Slot.svelte'

describe('Pesquisa', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Pesquisa, {
			props: {
				endpoint: 'https://test.com/endpoint'
			}
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot with slot', () => {
		const {container} = render(Slot)
		expect(container).toMatchSnapshot()
	})

	test('trigger should work', async () => {
		const {component, getByTitle} = render(Slot)
		const button = getByTitle('btn')
		const input = getByTitle('q')

		// input.value = '09750220'

		await fireEvent.click(button)

		expect(button).toMatchSnapshot()
		expect(input).toMatchSnapshot()

		// expect(mock).toHaveBeenCalled()
	})
})
