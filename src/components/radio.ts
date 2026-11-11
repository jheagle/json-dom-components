/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import input from './input'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const radio = (name: string = '', value: string = '', checked: boolean = false, children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  attributes.value = value
  if (checked) {
    attributes.checked = true
  }
  return input('radio', name, null, children, className, attributes)
}

export default radio
