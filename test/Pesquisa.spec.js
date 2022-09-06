/* globals describe, afterEach, beforeAll, afterAll, test, expect */
/* eslint no-unused-vars: 0 */

import timekeeper from 'timekeeper'
import '@testing-library/jest-dom'
import {
	// fireEvent,
	cleanup,
	render,
} from '@testing-library/svelte'

import Pesquisa from '../src/Pesquisa.svelte'
import Slot from './Slot.svelte'

beforeAll(() => {
	// Para o tempo
	timekeeper.freeze(1_604_416_038 * 1000)
})

afterAll(() => {
	timekeeper.reset()
})

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
