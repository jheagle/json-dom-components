"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeToggleClearButton = void 0;
/**
 * Show the clear button when there's a value to clear, hide it when the input is empty.
 * @param hasValue
 * @param clearButton
 */
const toggleClearButton = (hasValue, clearButton) => {
  clearButton.attributes.hidden = !hasValue;
  if (clearButton.element) {
    clearButton.element.hidden = !hasValue;
  }
};
/**
 * A ready-to-attach input listener: shows/hides the clear button based on the real input's current value.
 * @param clearButton
 */
const makeToggleClearButton = clearButton => event => toggleClearButton(event.target.value.length > 0, clearButton);
exports.makeToggleClearButton = makeToggleClearButton;
exports.default = toggleClearButton;