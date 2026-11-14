/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'treeloom/dist/domItem/types'

/**
 * Make these option items the list's whole content, on the item (so a re-render agrees) and on the real select.
 * Filtering swaps the options themselves rather than hiding the rest: Safari ignores hidden on an <option>, so hidden
 * non-matches would still be listed there.
 * @param selectItem
 * @param optionItems
 */
const showOptions = (selectItem: DomItem, optionItems: DomItem[]): void => {
  selectItem.children = optionItems
  if (selectItem.element) {
    const elements = optionItems.map(optionItem => optionItem.element).filter(Boolean) as unknown as Node[]
    ;(selectItem.element as unknown as HTMLSelectElement).replaceChildren(...elements)
  }
}

export default showOptions
