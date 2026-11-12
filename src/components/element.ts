/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import node from './node'
import type { Attributes, DomItem } from 'treeloom/dist/domItem/types'

/**
 * Create the DomItem of a real HTML element.
 * @param nodeName - a tag name, e.g. 'div'
 * @param children
 * @param className - left out of attributes entirely when not given, instead of setting an empty className
 * @param attributes
 */
const element = (nodeName: string, children: DomItem[] = [], className?: string, attributes: Attributes = {}): DomItem => {
  if (className !== undefined) {
    attributes.className = className
  }
  return node(nodeName, null, children, attributes)
}

export default element
