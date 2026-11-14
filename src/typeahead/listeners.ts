/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import filterOptions from './filterOptions'
import hideList from './hideList'
import selectOption from './selectOption'
import setSelectValue from './setSelectValue'
import type { TypeaheadParts } from './types'

/** Keys which move around or close the list: they never change the search text, so they never re-filter. */
const navigationKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab', 'Shift']

const listElement = (parts: TypeaheadParts): HTMLSelectElement | null =>
  parts.selectItem.element as unknown as HTMLSelectElement | null

const searchElement = (parts: TypeaheadParts): HTMLInputElement | null =>
  parts.freeTypeInput.element as unknown as HTMLInputElement | null

/**
 * Whether the options list is showing.
 * @param parts
 */
export const isListShown = (parts: TypeaheadParts): boolean => parts.selectItem.attributes.hidden !== true

/**
 * Close the list without picking: the select goes back to the last real pick (a highlight is not a pick).
 * @param parts
 */
export const closeList = (parts: TypeaheadParts): void => {
  hideList(parts)
}

/**
 * Pick a value from the list and give focus back to the free-type input. An empty value (nothing highlighted)
 * picks nothing.
 * @param parts
 * @param value
 */
export const pickFromList = (parts: TypeaheadParts, value: string): void => {
  parts.state.pointerInList = false
  if (!value) {
    return
  }
  selectOption(value, parts)
  searchElement(parts)?.focus()
}

/**
 * keyup on the free-type input: filter the list to the text. Editing the text after a pick un-picks it, since free
 * text is not one of the choices.
 * @param parts
 */
export const makeSearchKeyup = (parts: TypeaheadParts) => (event: Event): void => {
  if (navigationKeys.includes((event as KeyboardEvent).key)) {
    return
  }
  parts.state.pointerInList = false
  const text = (event.target as HTMLInputElement).value
  if (parts.state.committed) {
    const picked = parts.options.find(candidate => candidate.value === parts.state.committed)
    if (!picked || picked.label !== text) {
      parts.state.committed = ''
      setSelectValue(parts.selectItem, '')
    }
  }
  filterOptions(text, parts)
}

/**
 * keydown on the free-type input: Down arrow moves into the list (highlighting its first match), Escape closes it.
 * @param parts
 */
export const makeSearchKeydown = (parts: TypeaheadParts) => (event: Event): void => {
  const { key } = event as KeyboardEvent
  if (!isListShown(parts) || (key !== 'ArrowDown' && key !== 'Escape')) {
    return
  }
  event.preventDefault()
  if (key === 'Escape') {
    closeList(parts)
    return
  }
  const list = listElement(parts)
  if (list) {
    list.selectedIndex = 0
    parts.state.usingKeys = true
    list.focus()
  }
}

/**
 * keydown on the list: Enter picks the highlighted option, Escape closes the list and goes back to the input. Any
 * other key (arrows, letters) only moves the highlight.
 * @param parts
 */
export const makeListKeydown = (parts: TypeaheadParts) => (event: Event): void => {
  const { key } = event as KeyboardEvent
  parts.state.usingKeys = true
  if (key === 'Enter') {
    event.preventDefault()
    pickFromList(parts, listElement(parts)?.value ?? '')
  } else if (key === 'Escape') {
    event.preventDefault()
    closeList(parts)
    searchElement(parts)?.focus()
  }
}

/**
 * mousedown on the list: a pointer is choosing, so the input losing focus must not close the list (Safari does not
 * focus a clicked select, so focusout cannot tell).
 * @param parts
 */
export const makeListMousedown = (parts: TypeaheadParts) => (): void => {
  parts.state.pointerInList = true
  parts.state.usingKeys = false
}

/**
 * click on the list: clicking an option picks it (also when it was already highlighted, which fires no change).
 * @param parts
 */
export const makeListClick = (parts: TypeaheadParts) => (event: Event): void => {
  const target = event.target as HTMLOptionElement | null
  if (target && target.tagName === 'OPTION') {
    pickFromList(parts, target.value)
  }
}

/**
 * change on the list: a pick by pointer or by a phone's own picker (iOS shows a select as a native picker and only
 * reports the choice through change). Changes made with the keys only move the highlight.
 * @param parts
 */
export const makeListChange = (parts: TypeaheadParts) => (event: Event): void => {
  if (parts.state.usingKeys) {
    return
  }
  pickFromList(parts, (event.target as HTMLSelectElement).value)
}

/**
 * focusout on the whole typeahead: close the list once focus leaves it (moving between the input and the list keeps
 * it open), unless a pointer is still choosing in the list.
 * @param parts
 */
export const makeFocusout = (parts: TypeaheadParts) => (event: Event): void => {
  const next = (event as FocusEvent).relatedTarget as Node | null
  const wrapper = parts.wrapper.element as unknown as HTMLElement | null
  if ((next && wrapper && wrapper.contains(next)) || parts.state.pointerInList) {
    return
  }
  closeList(parts)
}
