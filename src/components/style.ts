/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import node from './node'
import text from './text'
import type { DomItem } from 'json-dom/dist/domItem/types'

const style = (styleContent: string = ''): DomItem => node('style', null, [text(styleContent)])

export default style
