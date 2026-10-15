"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.map.js");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const div_1 = __importDefault(require("../components/div"));
const input_1 = __importDefault(require("../components/input"));
const option_1 = __importDefault(require("../components/option"));
const select_1 = __importDefault(require("../components/select"));
const filterOptions_1 = require("./filterOptions");
const hideList_1 = require("./hideList");
const selectOption_1 = require("./selectOption");
/**
 * A typeahead: a free-text input that filters a list of options as you type, and a (visually hidden until
 * needed) select carrying the real options and the real submitted value - picking one from the filtered list
 * copies its label back into the free-text input and collapses the list again.
 *
 * Ported from a PHP Blade reference implementation, reusing its two-field shape (visible free-type input +
 * collapsed select holding the real value) and its filtering rules (case-insensitive match on value or label,
 * list only expands once there are 2+ characters typed and at least one match) - but wired through json-dom's
 * own DomItem tree (via eventListeners set directly on each item, bound automatically on render) instead of
 * attaching to the real DOM by hand.
 *
 * This is a minimum/POC implementation: listeners are plain closures, not names registered for json-dom's
 * render-only/forwarding mode - fine for a component built and rendered locally, not yet for one whose events
 * need forwarding across a socket. See MAIN.md.
 */
const createTypeahead = config => {
  const {
    name,
    options,
    value = '',
    placeholder = '',
    className,
    readonly = false
  } = config;
  const selected = options.find(candidate => candidate.value === value);
  const optionItems = options.map(choice => (0, option_1.default)(choice.value, choice.label, undefined, choice.value === value ? {
    selected: true
  } : {}));
  const freeTypeInput = (0, input_1.default)('text', `${name}-search`, selected ? selected.label : '', [], 'typeahead-search', {
    placeholder,
    ...(readonly ? {
      readonly: true
    } : {})
  });
  const selectItem = (0, select_1.default)(optionItems, 'typeahead-options', {
    name,
    hidden: true,
    size: 1,
    ...(value ? {
      value
    } : {}),
    ...(readonly ? {
      disabled: true
    } : {})
  });
  if (!readonly) {
    freeTypeInput.eventListeners.keyup = [{
      listenerFunc: (0, filterOptions_1.makeFilterOptions)(optionItems, selectItem)
    }];
    freeTypeInput.eventListeners.blur = [{
      listenerFunc: (0, hideList_1.makeHideList)(selectItem)
    }];
    selectItem.eventListeners.change = [{
      listenerFunc: (0, selectOption_1.makeSelectOption)(options, freeTypeInput, selectItem)
    }];
    selectItem.eventListeners.blur = [{
      listenerFunc: (0, hideList_1.makeHideList)(selectItem)
    }];
  }
  return (0, div_1.default)([freeTypeInput, selectItem], className ?? 'typeahead');
};
exports.default = createTypeahead;