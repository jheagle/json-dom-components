/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'json-dom/dist/domItem/types'

/**
 * Show the clear button when there's a value to clear, hide it when the input is empty.
 * @param hasValue
 * @param clearButton
 */
const toggleClearButton = (hasValue: boolean, clearButton: DomItem): void => {
  clearButton.attributes.hidden = !hasValue
  if (clearButton.element) {
    (clearButton.element as unknown as HTMLButtonElement).hidden = !hasValue
  }
}

/**
 * A ready-to-attach input listener: shows/hides the clear button based on the real input's current value.
 * @param clearButton
 */
export const makeToggleClearButton = (clearButton: DomItem) =>
  (event: Event): void => toggleClearButton((event.target as HTMLInputElement).value.length > 0, clearButton)

export default toggleClearButton
