/**
 * @jest-environment jsdom
 */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

test('the package exports the flat component object directly, not wrapped under a default key', () => {
  // A regression test for a real bug: `export default` here compiles to `exports.default = ...`, which browserify's
  // standalone option (used for the plain <script> tag / global consumption case, see MAIN.md) then exposes as
  // `window.jsonDomComponents = { default: {...} }` instead of the real object - every destructured factory
  // (text, option, ...) silently becomes undefined. `export =` avoids this, matching json-dom's own main.ts.
  const jsonDomComponents = require('./main')
  expect(jsonDomComponents.default).toBeUndefined()
  expect(typeof jsonDomComponents.text).toBe('function')
  expect(typeof jsonDomComponents.createTypeahead).toBe('function')
  expect(typeof jsonDomComponents.createClearableInput).toBe('function')
})
