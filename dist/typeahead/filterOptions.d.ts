import type { DomItem } from 'treeloom/dist/domItem/types';
/**
 * Filter optionItems by whether their value or label text includes the search term (case-insensitive), hiding
 * everything else. Reveals the select (as a real dropdown, a few rows tall) once there is a real search term and
 * at least one match; otherwise keeps it collapsed - matching the reference Blade component's own behaviour.
 * @param searchTerm
 * @param optionItems
 * @param selectItem
 */
declare const filterOptions: (searchTerm: string, optionItems: DomItem[], selectItem: DomItem) => void;
/**
 * A ready-to-attach keyup listener: reads the real input's current value and filters the given options by it.
 * @param optionItems
 * @param selectItem
 */
export declare const makeFilterOptions: (optionItems: DomItem[], selectItem: DomItem) => (event: Event) => void;
export default filterOptions;
