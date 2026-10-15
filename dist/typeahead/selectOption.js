"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectOption = void 0;
const hideList_1 = __importDefault(require("./hideList"));
/**
 * A pick was made (directly, or via the select's own change event): copy the matching option's label back into
 * the free-type input's real value and its attributes (so it stays correct across a re-render), then collapse
 * the list again.
 * @param selectedValue
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
const selectOption = (selectedValue, options, freeTypeInput, selectItem) => {
  const matched = options.find(candidate => candidate.value === selectedValue);
  const displayValue = matched ? matched.label : '';
  freeTypeInput.attributes.value = displayValue;
  if (freeTypeInput.element) {
    freeTypeInput.element.value = displayValue;
  }
  (0, hideList_1.default)(selectItem);
};
/**
 * A ready-to-attach change listener for the select: reads its real current value and applies the pick.
 * @param options
 * @param freeTypeInput
 * @param selectItem
 */
const makeSelectOption = (options, freeTypeInput, selectItem) => event => selectOption(event.target.value, options, freeTypeInput, selectItem);
exports.makeSelectOption = makeSelectOption;
exports.default = selectOption;