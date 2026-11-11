/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/** One choice a typeahead can filter to and select. */
export type TypeaheadOption = {
  value: string
  label: string
}

/** What createTypeahead needs to build one. */
export type TypeaheadConfig = {
  /** The real field name - becomes the select's own name attribute, the field a form actually submits. */
  name: string
  options: TypeaheadOption[]
  /** The option.value to start pre-selected, if any. */
  value?: string
  placeholder?: string
  className?: string
  readonly?: boolean
}
