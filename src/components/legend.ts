/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import element from './element'
import text from './text'
import type { Attributes, DomItem } from 'treeloom/dist/domItem/types'

const legend = (content: string = '', children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem =>
  element('legend', content ? [text(content), ...children] : children, className, attributes)

export default legend
