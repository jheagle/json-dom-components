"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeClearInput = void 0;
const toggleClearButton_1 = __importDefault(require("./toggleClearButton"));
/**
 * Clear the input's real value and its attributes (so it stays correct across a re-render), hide the clear
 * button, and give focus back to the input - matching the common "search box" convention.
 * @param inputItem
 * @param clearButton
 */
const clearInput = (inputItem, clearButton) => {
  inputItem.attributes.value = '';
  if (inputItem.element) {
    const element = inputItem.element;
    element.value = '';
    element.focus();
  }
  (0, toggleClearButton_1.default)(false, clearButton);
};
/**
 * A ready-to-attach click listener for the clear button.
 * @param inputItem
 * @param clearButton
 */
const makeClearInput = (inputItem, clearButton) => () => clearInput(inputItem, clearButton);
exports.makeClearInput = makeClearInput;
exports.default = clearInput;