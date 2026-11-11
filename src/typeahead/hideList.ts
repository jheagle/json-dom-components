/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'json-dom/dist/domItem/types'

/**
 * Collapse the options list: hidden again, back to a single visible row's worth of height.
 * @param selectItem
 */
const hideList = (selectItem: DomItem): void => {
  selectItem.attributes.hidden = true
  selectItem.attributes.size = 1
  if (selectItem.element) {
    const element = selectItem.element as unknown as HTMLSelectElement
    element.hidden = true
    element.size = 1
  }
}

/**
 * A ready-to-attach listener (ignores the event) which collapses the given select's options list.
 * @param selectItem
 */
export const makeHideList = (selectItem: DomItem) => (): void => hideList(selectItem)

export default hideList
