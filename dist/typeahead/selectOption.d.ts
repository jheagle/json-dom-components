import type { DomItem } from 'json-dom/dist/domItem/types';
import type { TypeaheadOption } from './types';
/**
 * A pick was made (directly, or via the select's own change event): copy the matching option's label back into
 * the free-type input's real value and its attributes (so it stays correct across a re-render), then collapse
 * the list again.
 * @param selectedValue
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
declare const selectOption: (selectedValue: string, options: TypeaheadOption[], freeTypeInput: DomItem, selectItem: DomItem) => void;
/**
 * A ready-to-attach change listener for the select: reads its real current value and applies the pick.
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
export declare const makeSelectOption: (options: TypeaheadOption[], freeTypeInput: DomItem, selectItem: DomItem) => (event: Event) => void;
export default selectOption;
