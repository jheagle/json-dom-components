/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'treeloom/dist/domItem/types'

/**
 * Set the select's value, on its attributes (so it stays correct across a re-render) and on the real element.
 * @param selectItem
 * @param value
 */
const setSelectValue = (selectItem: DomItem, value: string): void => {
  selectItem.attributes.value = value
  if (selectItem.element) {
    (selectItem.element as unknown as HTMLSelectElement).value = value
  }
}

export default setSelectValue
