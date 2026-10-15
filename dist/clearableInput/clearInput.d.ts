import type { DomItem } from 'json-dom/dist/domItem/types';
/**
 * Clear the input's real value and its attributes (so it stays correct across a re-render), hide the clear
 * button, and give focus back to the input - matching the common "search box" convention.
 * @param inputItem
 * @param clearButton
 */
declare const clearInput: (inputItem: DomItem, clearButton: DomItem) => void;
/**
 * A ready-to-attach click listener for the clear button.
 * @param inputItem
 * @param clearButton
 */
export declare const makeClearInput: (inputItem: DomItem, clearButton: DomItem) => () => void;
export default clearInput;
