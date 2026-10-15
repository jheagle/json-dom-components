"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHideList = void 0;
/**
 * Collapse the options list: hidden again, back to a single visible row's worth of height.
 * @param selectItem
 */
const hideList = selectItem => {
  selectItem.attributes.hidden = true;
  selectItem.attributes.size = 1;
  if (selectItem.element) {
    const element = selectItem.element;
    element.hidden = true;
    element.size = 1;
  }
};
/**
 * A ready-to-attach listener (ignores the event) which collapses the given select's options list.
 * @param selectItem
 */
const makeHideList = selectItem => () => hideList(selectItem);
exports.makeHideList = makeHideList;
exports.default = hideList;