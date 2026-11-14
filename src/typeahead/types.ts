/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { DomItem } from 'treeloom/dist/domItem/types'

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
  /**
   * The field's accessible name: the input gets it as aria-label and the list gets "<label> matches". Leave it out
   * when the page labels the input itself (a <label for> pointing at the input's id).
   */
  label?: string
  className?: string
  readonly?: boolean
}

/** What one typeahead's listeners share: its parts, its choices and what has been picked so far. */
export type TypeaheadParts = {
  options: TypeaheadOption[]
  /** The option items the visitor can filter to (not the empty "nothing picked" option). */
  optionItems: DomItem[]
  /** The hidden, empty first option: selected while nothing is picked, so an untouched typeahead submits ''. */
  emptyOption: DomItem
  freeTypeInput: DomItem
  selectItem: DomItem
  wrapper: DomItem
  state: {
    /** The value of the last option actually picked ('' for none): what the form submits. */
    committed: string
    /** A pointer went down on the list and has not clicked yet (Safari does not focus a clicked select). */
    pointerInList: boolean
    /** The last input on the list was a key (arrows move the highlight, so their change events pick nothing). */
    usingKeys: boolean
  }
}
