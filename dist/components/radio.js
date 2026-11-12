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
const input_1 = __importDefault(require("./input"));
const radio = (name = '', value = '', checked = false, children = [], className, attributes = {}) => {
  attributes.value = value;
  if (checked) {
    attributes.checked = true;
  }
  return (0, input_1.default)('radio', name, null, children, className, attributes);
};
exports.default = radio;