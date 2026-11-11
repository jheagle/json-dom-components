/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * A minimal component library on json-dom: base HTML element factories plus richer interactive components.
 */
import clearableInput from './clearableInput/index'
import components from './components/index'
import typeahead from './typeahead/index'

/**
 * Store a reference to the global scope which will be Window if rendered via browser
 */
const root = (typeof window !== 'undefined' ? window : {}) as unknown as Record<string, unknown>

const jsonDomComponents = {
  ...components,
  ...typeahead,
  ...clearableInput
}

root.jsonDomComponents = jsonDomComponents

export = jsonDomComponents
