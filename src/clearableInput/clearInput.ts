/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import toggleClearButton from './toggleClearButton'
import type { DomItem } from 'treeloom/dist/domItem/types'

/**
 * Clear the input's real value and its attributes (so it stays correct across a re-render), hide the clear
 * button, and give focus back to the input - matching the common "search box" convention.
 * @param inputItem
 * @param clearButton
 */
const clearInput = (inputItem: DomItem, clearButton: DomItem): void => {
  inputItem.attributes.value = ''
  if (inputItem.element) {
    const element = inputItem.element as unknown as HTMLInputElement
    element.value = ''
    element.focus()
  }
  toggleClearButton(false, clearButton)
}

/**
 * A ready-to-attach click listener for the clear button.
 * @param inputItem
 * @param clearButton
 */
export const makeClearInput = (inputItem: DomItem, clearButton: DomItem) =>
  (): void => clearInput(inputItem, clearButton)

export default clearInput
