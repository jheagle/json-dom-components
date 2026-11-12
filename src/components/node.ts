/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import treeloom from 'treeloom'
import type { Attributes, DomItem } from 'treeloom/dist/domItem/types'

/**
 * Create the DomItem for any node, the base every other component builds on.
 * @param nodeName - Any document node name: a tag name, #text, #comment or #document.
 * @param nodeValue - The text of a text or comment node, null for elements.
 * @param children
 * @param attributes
 */
const node = (nodeName: string, nodeValue: string | null = null, children: DomItem[] = [], attributes: Attributes = {}): DomItem =>
  treeloom.createDomItem({ nodeName, nodeValue, attributes, children })

export default node
