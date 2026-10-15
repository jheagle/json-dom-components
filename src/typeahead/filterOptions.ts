import type { DomItem } from 'json-dom/dist/domItem/types'

/**
 * Filter optionItems by whether their value or label text includes the search term (case-insensitive), hiding
 * everything else. Reveals the select (as a real dropdown, a few rows tall) once there is a real search term and
 * at least one match; otherwise keeps it collapsed - matching the reference Blade component's own behaviour.
 * @param searchTerm
 * @param optionItems
 * @param selectItem
 */
const filterOptions = (searchTerm: string, optionItems: DomItem[], selectItem: DomItem): void => {
  const term = searchTerm.trim().toLowerCase()
  let visibleCount = 0
  optionItems.forEach(optionItem => {
    const label = (optionItem.children[0]?.nodeValue ?? '').toLowerCase()
    const value = String(optionItem.attributes.value ?? '').toLowerCase()
    const matches = term.length > 0 && (label.includes(term) || value.includes(term))
    optionItem.attributes.hidden = !matches
    if (matches) {
      visibleCount++
    }
    if (optionItem.element) {
      (optionItem.element as unknown as HTMLOptionElement).hidden = !matches
    }
  })
  const expand = term.length >= 2 && visibleCount > 0
  selectItem.attributes.hidden = !expand
  selectItem.attributes.size = expand ? Math.min(5, visibleCount) : 1
  if (selectItem.element) {
    const element = selectItem.element as unknown as HTMLSelectElement
    element.hidden = !expand
    element.size = expand ? Math.min(5, visibleCount) : 1
  }
}

/**
 * A ready-to-attach keyup listener: reads the real input's current value and filters the given options by it.
 * @param optionItems
 * @param selectItem
 */
export const makeFilterOptions = (optionItems: DomItem[], selectItem: DomItem) =>
  (event: Event): void => filterOptions((event.target as HTMLInputElement).value, optionItems, selectItem)

export default filterOptions
