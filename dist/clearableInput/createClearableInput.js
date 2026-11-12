"use strict";

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const button_1 = __importDefault(require("../components/button"));
const div_1 = __importDefault(require("../components/div"));
const input_1 = __importDefault(require("../components/input"));
const clearInput_1 = require("./clearInput");
const toggleClearButton_1 = require("./toggleClearButton");
/**
 * A regular text input with a small "x" button on its right inner edge to clear it - the common "search box"
 * pattern. The button only shows once there's a value to clear.
 *
 * Minimum/POC implementation: like the typeahead, its listeners are plain closures, not names registered for
 * treeloom's render-only/forwarding mode. See MAIN.md.
 */
const createClearableInput = config => {
  const {
    name,
    value = '',
    placeholder = '',
    className,
    readonly = false
  } = config;
  const inputItem = (0, input_1.default)('text', name, value || null, [], 'clearable-input-field', {
    placeholder,
    ...(readonly ? {
      readonly: true
    } : {})
  });
  const clearButton = (0, button_1.default)('×', 'clearable-input-clear', {
    'aria-label': 'Clear',
    hidden: value.length === 0,
    ...(readonly ? {
      hidden: true,
      disabled: true
    } : {})
  });
  if (!readonly) {
    inputItem.eventListeners.input = [{
      listenerFunc: (0, toggleClearButton_1.makeToggleClearButton)(clearButton)
    }];
    clearButton.eventListeners.click = [{
      listenerFunc: (0, clearInput_1.makeClearInput)(inputItem, clearButton)
    }];
  }
  return (0, div_1.default)([inputItem, clearButton], className ?? 'clearable-input');
};
exports.default = createClearableInput;