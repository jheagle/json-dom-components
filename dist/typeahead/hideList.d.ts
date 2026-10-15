import type { DomItem } from 'json-dom/dist/domItem/types';
/**
 * Collapse the options list: hidden again, back to a single visible row's worth of height.
 * @param selectItem
 */
declare const hideList: (selectItem: DomItem) => void;
/**
 * A ready-to-attach listener (ignores the event) which collapses the given select's options list.
 * @param selectItem
 */
export declare const makeHideList: (selectItem: DomItem) => () => void;
export default hideList;
