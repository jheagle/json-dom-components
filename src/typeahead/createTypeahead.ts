/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import div from '../components/div'
import input from '../components/input'
import option from '../components/option'
import select from '../components/select'
import {
  makeFocusout,
  makeListChange,
  makeListClick,
  makeListKeydown,
  makeListMousedown,
  makeSearchKeydown,
  makeSearchKeyup
} from './listeners'
import type { DomItem } from 'treeloom/dist/domItem/types'
import type { TypeaheadConfig, TypeaheadParts } from './types'

/**
 * Build a filterable select: a free-type input to type into, and the real <select> (the field a form submits), hidden
 * until 2+ typed characters match something. With a pointer: click a match. With keys: Down arrow into the list,
 * arrows to move, Enter to pick, Escape to close. Editing the text after a pick un-picks it, and an untouched
 * typeahead submits '' (a hidden, empty first option), never whichever option the browser happened to select.
 * @param config
 * @returns The typeahead's container item.
 */
const createTypeahead = (config: TypeaheadConfig): DomItem => {
  const { name, options, value = '', placeholder = '', label, className, readonly = false } = config
  const selected = options.find(candidate => candidate.value === value)
  const emptyOption = option('', '', undefined, { hidden: true, ...(selected ? {} : { selected: true }) })
  const optionItems = options.map(choice => option(choice.value, choice.label, undefined, choice.value === value ? { selected: true } : {}))
  const freeTypeInput = input('text', `${name}-search`, selected ? selected.label : '', [], 'typeahead-search', {
    placeholder,
    autocomplete: 'off',
    ...(label ? { 'aria-label': label } : {}),
    ...(readonly ? { readonly: true } : {})
  })
  const selectItem = select([emptyOption, ...optionItems], 'typeahead-options', {
    name,
    hidden: true,
    size: 1,
    ...(label ? { 'aria-label': `${label} matches` } : {}),
    ...(selected ? { value } : {}),
    ...(readonly ? { disabled: true } : {})
  })
  const wrapper = div([freeTypeInput, selectItem], className ?? 'typeahead')
  if (!readonly) {
    const parts: TypeaheadParts = {
      options,
      optionItems,
      emptyOption,
      freeTypeInput,
      selectItem,
      wrapper,
      state: { committed: selected ? selected.value : '', pointerInList: false, usingKeys: false }
    }
    freeTypeInput.eventListeners.keyup = [{ listenerFunc: makeSearchKeyup(parts) }]
    freeTypeInput.eventListeners.keydown = [{ listenerFunc: makeSearchKeydown(parts) }]
    selectItem.eventListeners.keydown = [{ listenerFunc: makeListKeydown(parts) }]
    selectItem.eventListeners.mousedown = [{ listenerFunc: makeListMousedown(parts) }]
    selectItem.eventListeners.click = [{ listenerFunc: makeListClick(parts) }]
    selectItem.eventListeners.change = [{ listenerFunc: makeListChange(parts) }]
    wrapper.eventListeners.focusout = [{ listenerFunc: makeFocusout(parts) }]
  }
  return wrapper
}

export default createTypeahead
