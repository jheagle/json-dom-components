/**
 * @jest-environment jsdom
 */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import clearInput from './clearInput'
import createClearableInput from './createClearableInput'
import toggleClearButton from './toggleClearButton'

describe('createClearableInput', () => {
  test('builds a container with the text input and a clear button, hidden when there is no value', () => {
    const item = createClearableInput({ name: 'search' })
    expect(item.nodeName).toBe('div')
    expect(item.attributes.className).toBe('clearable-input')

    const [inputItem, clearButton] = item.children
    expect(inputItem.attributes).toMatchObject({ type: 'text', name: 'search' })
    expect(clearButton.nodeName).toBe('button')
    expect(clearButton.attributes.hidden).toBe(true)
  })

  test('a non-empty initial value starts with the clear button visible', () => {
    const item = createClearableInput({ name: 'search', value: 'hello' })
    const [inputItem, clearButton] = item.children
    expect(inputItem.attributes.value).toBe('hello')
    expect(clearButton.attributes.hidden).toBe(false)
  })

  test('readonly skips wiring any listeners and keeps the clear button hidden and disabled', () => {
    const item = createClearableInput({ name: 'search', value: 'hello', readonly: true })
    const [inputItem, clearButton] = item.children
    expect(inputItem.attributes.readonly).toBe(true)
    expect(clearButton.attributes.hidden).toBe(true)
    expect(clearButton.attributes.disabled).toBe(true)
    expect(inputItem.eventListeners.input).toBeUndefined()
    expect(clearButton.eventListeners.click).toBeUndefined()
  })

  test('a non-readonly one wires input on the field and click on the clear button', () => {
    const item = createClearableInput({ name: 'search' })
    const [inputItem, clearButton] = item.children
    expect(inputItem.eventListeners.input).toHaveLength(1)
    expect(clearButton.eventListeners.click).toHaveLength(1)
  })
})

describe('toggleClearButton', () => {
  test('shows the button when there is a value, hides it when there is not', () => {
    const item = createClearableInput({ name: 'search' })
    const [, clearButton] = item.children
    toggleClearButton(true, clearButton)
    expect(clearButton.attributes.hidden).toBe(false)
    toggleClearButton(false, clearButton)
    expect(clearButton.attributes.hidden).toBe(true)
  })
})

describe('clearInput', () => {
  test('empties the input and hides the clear button', () => {
    const item = createClearableInput({ name: 'search', value: 'hello' })
    const [inputItem, clearButton] = item.children
    clearInput(inputItem, clearButton)
    expect(inputItem.attributes.value).toBe('')
    expect(clearButton.attributes.hidden).toBe(true)
  })
})
