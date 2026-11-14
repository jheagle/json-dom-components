/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import hideList from './hideList'
import showOptions from './showOptions'
import type { DomItem } from 'treeloom/dist/domItem/types'
import type { TypeaheadParts } from './types'

/**
 * Whether an option's value or label text includes the search term (already trimmed and lower-cased).
 * @param optionItem
 * @param term
 */
export const optionMatches = (optionItem: DomItem, term: string): boolean => {
  const label = (optionItem.children[0]?.nodeValue ?? '').toLowerCase()
  const value = String(optionItem.attributes.value ?? '').toLowerCase()
  return term.length > 0 && (label.includes(term) || value.includes(term))
}

/**
 * Filter the list to the options whose value or label includes the search term (case-insensitive). Once there are
 * 2+ characters and at least one match, the list shows only the matches, a few rows tall; otherwise it collapses
 * with every option back in place.
 * @param searchTerm
 * @param parts
 */
const filterOptions = (searchTerm: string, parts: TypeaheadParts): void => {
  const term = searchTerm.trim().toLowerCase()
  const matches = parts.optionItems.filter(optionItem => optionMatches(optionItem, term))
  if (term.length < 2 || matches.length === 0) {
    hideList(parts)
    return
  }
  const { selectItem } = parts
  showOptions(selectItem, matches)
  selectItem.attributes.hidden = false
  selectItem.attributes.size = Math.max(2, Math.min(5, matches.length))
  if (selectItem.element) {
    const element = selectItem.element as unknown as HTMLSelectElement
    element.hidden = false
    element.size = selectItem.attributes.size as number
    // The current pick stays selected if it is still listed; otherwise nothing is highlighted (and, while the list is
    // open, the field submits nothing) until the visitor moves into the list
    if (matches.some(optionItem => optionItem.attributes.value === parts.state.committed)) {
      element.value = parts.state.committed
    } else {
      element.selectedIndex = -1
    }
  }
}

export default filterOptions
