/* global describe, afterEach, test, expect, jest */
/* eslint no-unused-vars: 0 */

import '@testing-library/jest-dom'
import {
	// fireEvent,
	cleanup,
	render,
} from '@testing-library/svelte'
import Pesquisa from '../src/Pesquisa.svelte'
import Slot from './Slot.svelte'

describe('Pesquisa', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Pesquisa, {
			props: {
				endpoint: 'https://test.com/endpoint',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot with slot', () => {
		const {container} = render(Slot)
		expect(container).toMatchSnapshot()
	})

	test('trigger should work', async () => {
		const {getByTitle} = render(Slot)
		const button = getByTitle('btn')
		const input = getByTitle('q')

		// await fireEvent.click(button)

		expect(button).toMatchSnapshot()
		expect(input).toMatchSnapshot()

		// expect(mock).toHaveBeenCalled()
	})
})
