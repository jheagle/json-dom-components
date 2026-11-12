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
const element_1 = __importDefault(require("./element"));
const legend_1 = __importDefault(require("./legend"));
const fieldset = (content = '', children = [], className, attributes = {}) => (0, element_1.default)('fieldset', content ? [(0, legend_1.default)(content), ...children] : children, className, attributes);
exports.default = fieldset;