/**
 * @jest-environment jsdom
 */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* global FocusEvent, KeyboardEvent, MouseEvent */

import treeloom from 'treeloom'
import createTypeahead from './createTypeahead'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' }
]

/**
 * Render a typeahead with treeloom inside a form, the way a page would, and return its real elements plus helpers
 * which drive it with real events.
 * @param {Object} [config]
 */
const render = (config = {}) => {
  document.body.innerHTML = "<form id='form'><div id='mount'></div></form><button id='elsewhere'>Elsewhere</button>"
  const item = createTypeahead({ name: 'fruit', options, ...config })
  // A root item standing in for the mount point (an empty parentItem marks it as the root)
  const parent = treeloom.createDomItem({ nodeName: 'div', parentItem: {} })
  parent.element = document.getElementById('mount')
  treeloom.renderHtml(item, parent)
  const search = document.querySelector('.typeahead-search')
  const list = document.querySelector('.typeahead-options')
  const key = (target, type, name) => target.dispatchEvent(new KeyboardEvent(type, { key: name, bubbles: true, cancelable: true }))
  return {
    item,
    search,
    list,
    submitted: () => new FormData(document.getElementById('form')).get('fruit'),
    listed: () => [...list.options].map(option => option.value),
    type: text => {
      search.focus()
      search.value = text
      key(search, 'keyup', text.slice(-1) || 'Backspace')
    },
    press: (target, name) => {
      key(target, 'keydown', name)
      key(target, 'keyup', name)
    },
    /** Focus leaves `from` for `to` (null: nowhere, as when clicking blank page). */
    moveFocus: (from, to) => {
      from.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: to }))
      if (to) to.focus()
    }
  }
}

describe('createTypeahead', () => {
  test('builds a container with a free-type input and the real select, an empty option first', () => {
    const item = createTypeahead({ name: 'fruit', options })
    expect(item.nodeName).toBe('div')
    expect(item.attributes.className).toBe('typeahead')
    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.attributes).toMatchObject({ name: 'fruit-search', type: 'text', autocomplete: 'off' })
    expect(selectItem.attributes).toMatchObject({ name: 'fruit', hidden: true, size: 1 })
    expect(selectItem.children.map(optionItem => optionItem.attributes.value)).toEqual(['', 'apple', 'apricot', 'banana'])
    expect(selectItem.children[0].attributes).toMatchObject({ hidden: true, selected: true })
  })

  test('a label names the input and the list; without one, neither gets an aria-label', () => {
    const [freeTypeInput, selectItem] = createTypeahead({ name: 'fruit', options, label: 'Fruit' }).children
    expect(freeTypeInput.attributes['aria-label']).toBe('Fruit')
    expect(selectItem.attributes['aria-label']).toBe('Fruit matches')
    const [plainInput, plainSelect] = createTypeahead({ name: 'fruit', options }).children
    expect(plainInput.attributes['aria-label']).toBeUndefined()
    expect(plainSelect.attributes['aria-label']).toBeUndefined()
  })

  test('pre-selects a given value: its option is selected (not the empty one) and its label pre-fills the input', () => {
    const [freeTypeInput, selectItem] = createTypeahead({ name: 'fruit', options, value: 'banana' }).children
    expect(freeTypeInput.attributes.value).toBe('Banana')
    expect(selectItem.children.find(optionItem => optionItem.attributes.value === 'banana').attributes.selected).toBe(true)
    expect(selectItem.children[0].attributes.selected).toBeUndefined()
  })

  test('readonly skips wiring any listeners and disables the real field', () => {
    const item = createTypeahead({ name: 'fruit', options, readonly: true })
    const [freeTypeInput, selectItem] = item.children
    expect(freeTypeInput.attributes.readonly).toBe(true)
    expect(selectItem.attributes.disabled).toBe(true)
    expect(freeTypeInput.eventListeners.keyup).toBeUndefined()
    expect(selectItem.eventListeners.change).toBeUndefined()
    expect(item.eventListeners.focusout).toBeUndefined()
  })

  test('wires the input (keyup, keydown), the list (keydown, mousedown, click, change) and focusout on the whole', () => {
    const item = createTypeahead({ name: 'fruit', options })
    const [freeTypeInput, selectItem] = item.children
    expect(Object.keys(freeTypeInput.eventListeners).sort()).toEqual(['keydown', 'keyup'])
    expect(Object.keys(selectItem.eventListeners).sort()).toEqual(['change', 'click', 'keydown', 'mousedown'])
    expect(Object.keys(item.eventListeners)).toEqual(['focusout'])
  })
})

describe('typeahead in a page', () => {
  test('untouched, it submits nothing (not whichever option a browser would select)', () => {
    const { submitted } = render()
    expect(submitted()).toBe('')
  })

  test('2+ characters show only the matching options, by label or value, nothing highlighted', () => {
    const { type, list, listed, submitted } = render()
    type('AP')
    expect(list.hidden).toBe(false)
    expect(listed()).toEqual(['apple', 'apricot'])
    expect(list.size).toBe(2)
    expect(list.selectedIndex).toBe(-1)
    // Nothing picked: while the list is open the field submits nothing at all
    expect(submitted()).toBeNull()
  })

  test('1 character, or no match, keeps the list collapsed with every option back in place', () => {
    const { type, list, listed } = render()
    type('a')
    expect(list.hidden).toBe(true)
    type('zz')
    expect(list.hidden).toBe(true)
    expect(listed()).toEqual(['', 'apple', 'apricot', 'banana'])
  })

  test('keys: Down moves into the list, arrows only move the highlight, Enter picks and goes back to the input', () => {
    const { type, press, search, list, listed, submitted } = render()
    type('ap')
    press(search, 'ArrowDown')
    expect(document.activeElement).toBe(list)
    expect(list.value).toBe('apple')
    // The browser moves the highlight itself and fires change: that must not pick
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    list.value = 'apricot'
    list.dispatchEvent(new Event('change', { bubbles: true }))
    expect(list.hidden).toBe(false)
    expect(search.value).toBe('ap')
    press(list, 'Enter')
    expect(search.value).toBe('Apricot')
    expect(submitted()).toBe('apricot')
    expect(list.hidden).toBe(true)
    expect(listed()).toEqual(['', 'apple', 'apricot', 'banana'])
    expect(document.activeElement).toBe(search)
  })

  test('Escape in the list closes it without picking and goes back to the input', () => {
    const { type, press, search, list, submitted } = render({ value: 'banana' })
    type('ap')
    press(search, 'ArrowDown')
    press(list, 'Escape')
    expect(list.hidden).toBe(true)
    expect(document.activeElement).toBe(search)
    // Editing the text already un-picked banana; the highlight (apple) is not a pick
    expect(submitted()).toBe('')
  })

  test('Escape in the input closes the list', () => {
    const { type, press, search, list } = render()
    type('ap')
    press(search, 'Escape')
    expect(list.hidden).toBe(true)
  })

  test('pointer: focus moving into the list keeps it open, and clicking an option picks it', () => {
    const { type, moveFocus, search, list, submitted } = render()
    type('ap')
    list.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    moveFocus(search, list)
    expect(list.hidden).toBe(false)
    list.options[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(search.value).toBe('Apricot')
    expect(submitted()).toBe('apricot')
    expect(list.hidden).toBe(true)
  })

  test('Safari: the input losing focus to nowhere while a pointer is down on the list keeps it open', () => {
    const { type, moveFocus, search, list } = render()
    type('ap')
    list.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    moveFocus(search, null)
    expect(list.hidden).toBe(false)
  })

  test("a phone's picker (change after a pointer, with no click on an option) picks", () => {
    const { type, search, list, submitted } = render()
    type('ap')
    list.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    list.value = 'apple'
    list.dispatchEvent(new Event('change', { bubbles: true }))
    expect(search.value).toBe('Apple')
    expect(submitted()).toBe('apple')
  })

  test('focus leaving the whole typeahead closes the list and keeps the last real pick', () => {
    const { type, press, moveFocus, search, list, submitted } = render()
    type('ap')
    press(search, 'ArrowDown')
    press(list, 'Enter')
    expect(submitted()).toBe('apple')
    // Reopen by typing the same label again (still the pick, still selected), clear the highlight, then leave
    type('Apple')
    expect(list.hidden).toBe(false)
    expect(submitted()).toBe('apple')
    moveFocus(search, list)
    list.selectedIndex = -1
    moveFocus(list, document.getElementById('elsewhere'))
    expect(list.hidden).toBe(true)
    expect(submitted()).toBe('apple')
  })

  test('editing the text after a pick un-picks it, and closing the list then submits nothing', () => {
    const { type, press, search, list, submitted } = render()
    type('ap')
    press(search, 'ArrowDown')
    press(list, 'Enter')
    type('Appl')
    expect(list.hidden).toBe(false)
    expect(submitted()).toBeNull()
    type('Applx')
    expect(list.hidden).toBe(true)
    expect(submitted()).toBe('')
  })
})
