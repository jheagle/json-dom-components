"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFilterOptions = void 0;
/**
 * Filter optionItems by whether their value or label text includes the search term (case-insensitive), hiding
 * everything else. Reveals the select (as a real dropdown, a few rows tall) once there is a real search term and
 * at least one match; otherwise keeps it collapsed - matching the reference Blade component's own behaviour.
 * @param searchTerm
 * @param optionItems
 * @param selectItem
 */
const filterOptions = (searchTerm, optionItems, selectItem) => {
  const term = searchTerm.trim().toLowerCase();
  let visibleCount = 0;
  optionItems.forEach(optionItem => {
    const label = (optionItem.children[0]?.nodeValue ?? '').toLowerCase();
    const value = String(optionItem.attributes.value ?? '').toLowerCase();
    const matches = term.length > 0 && (label.includes(term) || value.includes(term));
    optionItem.attributes.hidden = !matches;
    if (matches) {
      visibleCount++;
    }
    if (optionItem.element) {
      optionItem.element.hidden = !matches;
    }
  });
  const expand = term.length >= 2 && visibleCount > 0;
  selectItem.attributes.hidden = !expand;
  selectItem.attributes.size = expand ? Math.min(5, visibleCount) : 1;
  if (selectItem.element) {
    const element = selectItem.element;
    element.hidden = !expand;
    element.size = expand ? Math.min(5, visibleCount) : 1;
  }
};
/**
 * A ready-to-attach keyup listener: reads the real input's current value and filters the given options by it.
 * @param optionItems
 * @param selectItem
 */
const makeFilterOptions = (optionItems, selectItem) => event => filterOptions(event.target.value, optionItems, selectItem);
exports.makeFilterOptions = makeFilterOptions;
exports.default = filterOptions;