/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import hideList from './hideList'
import type { DomItem } from 'json-dom/dist/domItem/types'
import type { TypeaheadOption } from './types'

/**
 * A pick was made (directly, or via the select's own change event): copy the matching option's label back into
 * the free-type input's real value and its attributes (so it stays correct across a re-render), then collapse
 * the list again.
 * @param selectedValue
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
const selectOption = (selectedValue: string, options: TypeaheadOption[], freeTypeInput: DomItem, selectItem: DomItem): void => {
  const matched = options.find(candidate => candidate.value === selectedValue)
  const displayValue = matched ? matched.label : ''
  freeTypeInput.attributes.value = displayValue
  if (freeTypeInput.element) {
    (freeTypeInput.element as unknown as HTMLInputElement).value = displayValue
  }
  hideList(selectItem)
}

/**
 * A ready-to-attach change listener for the select: reads its real current value and applies the pick.
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
export const makeSelectOption = (options: TypeaheadOption[], freeTypeInput: DomItem, selectItem: DomItem) =>
  (event: Event): void => selectOption((event.target as HTMLSelectElement).value, options, freeTypeInput, selectItem)

export default selectOption
