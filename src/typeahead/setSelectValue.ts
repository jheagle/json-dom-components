/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'treeloom/dist/domItem/types'

/**
 * Set the select's value, on its attributes and its options' selected flags (so a re-render agrees) and on the real
 * element.
 * @param selectItem
 * @param value
 */
const setSelectValue = (selectItem: DomItem, value: string): void => {
  selectItem.attributes.value = value
  selectItem.children.forEach(optionItem => {
    if (optionItem.attributes.value === value) {
      optionItem.attributes.selected = true
    } else {
      delete optionItem.attributes.selected
    }
  })
  if (selectItem.element) {
    (selectItem.element as unknown as HTMLSelectElement).value = value
  }
}

export default setSelectValue
