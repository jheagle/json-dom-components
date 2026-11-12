/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import input from './input'
import type { Attributes, DomItem } from 'treeloom/dist/domItem/types'

const submit = (name: string = '', label: string = 'Submit', className?: string, attributes: Attributes = {}): DomItem => {
  attributes.value = label
  return input('submit', name, null, [], className, attributes)
}

export default submit
