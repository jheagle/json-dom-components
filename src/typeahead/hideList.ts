/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import setSelectValue from './setSelectValue'
import showOptions from './showOptions'
import type { TypeaheadParts } from './types'

/**
 * Collapse the options list: every option back in place (the empty one first), hidden again, one row tall, and the
 * select set back to the last real pick (putting options back lets a browser select one of its own).
 * @param parts
 */
const hideList = (parts: TypeaheadParts): void => {
  const { selectItem } = parts
  showOptions(selectItem, [parts.emptyOption, ...parts.optionItems])
  selectItem.attributes.hidden = true
  selectItem.attributes.size = 1
  if (selectItem.element) {
    const element = selectItem.element as unknown as HTMLSelectElement
    element.hidden = true
    element.size = 1
  }
  setSelectValue(selectItem, parts.state.committed)
}

export default hideList
