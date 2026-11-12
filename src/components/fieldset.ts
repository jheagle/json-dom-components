/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import element from './element'
import legend from './legend'
import type { Attributes, DomItem } from 'treeloom/dist/domItem/types'

const fieldset = (content: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('fieldset', content ? [legend(content), ...children] : children, className, attributes)

export default fieldset
