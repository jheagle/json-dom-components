/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import element from './element'
import type { Attributes, DomItem } from 'json-dom/dist/domItem/types'

const select = (children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('select', children, className, attributes)

export default select
