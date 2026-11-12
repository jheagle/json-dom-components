/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import node from './node'
import type { DomItem } from 'treeloom/dist/domItem/types'

/**
 * Create a text node DomItem.
 * @param nodeValue
 */
const text = (nodeValue: string = ''): DomItem => node('#text', nodeValue)

export default text
