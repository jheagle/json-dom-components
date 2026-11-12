import type { DomItem } from 'treeloom/dist/domItem/types';
/**
 * Show the clear button when there's a value to clear, hide it when the input is empty.
 * @param hasValue
 * @param clearButton
 */
declare const toggleClearButton: (hasValue: boolean, clearButton: DomItem) => void;
/**
 * A ready-to-attach input listener: shows/hides the clear button based on the real input's current value.
 * @param clearButton
 */
export declare const makeToggleClearButton: (clearButton: DomItem) => (event: Event) => void;
export default toggleClearButton;
