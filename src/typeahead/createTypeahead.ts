/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import div from '../components/div'
import input from '../components/input'
import option from '../components/option'
import select from '../components/select'
import { makeFilterOptions } from './filterOptions'
import { makeHideList } from './hideList'
import { makeSelectOption } from './selectOption'
import type { DomItem } from 'json-dom/dist/domItem/types'
import type { TypeaheadConfig } from './types'

/**
 * A typeahead: a free-text input that filters a list of options as you type, and a (visually hidden until
 * needed) select carrying the real options and the real submitted value - picking one from the filtered list
 * copies its label back into the free-text input and collapses the list again.
 *
 * Ported from a PHP Blade reference implementation, reusing its two-field shape (visible free-type input +
 * collapsed select holding the real value) and its filtering rules (case-insensitive match on value or label,
 * list only expands once there are 2+ characters typed and at least one match) - but wired through json-dom's
 * own DomItem tree (via eventListeners set directly on each item, bound automatically on render) instead of
 * attaching to the real DOM by hand.
 *
 * This is a minimum/POC implementation: listeners are plain closures, not names registered for json-dom's
 * render-only/forwarding mode - fine for a component built and rendered locally, not yet for one whose events
 * need forwarding across a socket. See MAIN.md.
 */
const createTypeahead = (config: TypeaheadConfig): DomItem => {
  const { name, options, value = '', placeholder = '', className, readonly = false } = config

  const selected = options.find(candidate => candidate.value === value)

  const optionItems = options.map(choice => option(choice.value, choice.label, undefined, choice.value === value ? { selected: true } : {}))

  const freeTypeInput = input('text', `${name}-search`, selected ? selected.label : '', [], 'typeahead-search', {
    placeholder,
    ...(readonly ? { readonly: true } : {})
  })

  const selectItem = select(optionItems, 'typeahead-options', {
    name,
    hidden: true,
    size: 1,
    ...(value ? { value } : {}),
    ...(readonly ? { disabled: true } : {})
  })

  if (!readonly) {
    freeTypeInput.eventListeners.keyup = [{ listenerFunc: makeFilterOptions(optionItems, selectItem) }]
    freeTypeInput.eventListeners.blur = [{ listenerFunc: makeHideList(selectItem) }]
    selectItem.eventListeners.change = [{ listenerFunc: makeSelectOption(options, freeTypeInput, selectItem) }]
    selectItem.eventListeners.blur = [{ listenerFunc: makeHideList(selectItem) }]
  }

  return div([freeTypeInput, selectItem], className ?? 'typeahead')
}

export default createTypeahead
