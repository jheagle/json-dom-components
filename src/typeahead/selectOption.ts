/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import hideList from './hideList'
import type { TypeaheadParts } from './types'

/**
 * Pick an option: the select takes its value (what the form submits), its label goes into the free-type input
 * (attributes and real value, so it stays correct across a re-render) and the list collapses. A value matching
 * nothing picks nothing: the input and the select are cleared.
 * @param selectedValue
 * @param parts
 */
const selectOption = (selectedValue: string, parts: TypeaheadParts): void => {
  const matched = parts.options.find(candidate => candidate.value === selectedValue)
  const displayValue = matched ? matched.label : ''
  parts.freeTypeInput.attributes.value = displayValue
  if (parts.freeTypeInput.element) {
    (parts.freeTypeInput.element as unknown as HTMLInputElement).value = displayValue
  }
  parts.state.committed = matched ? matched.value : ''
  hideList(parts)
}

export default selectOption
