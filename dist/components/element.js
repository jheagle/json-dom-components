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
const node_1 = __importDefault(require("./node"));
/**
 * Create the DomItem of a real HTML element.
 * @param nodeName - a tag name, e.g. 'div'
 * @param children
 * @param className - left out of attributes entirely when not given, instead of setting an empty className
 * @param attributes
 */
const element = (nodeName, children = [], className, attributes = {}) => {
  if (className !== undefined) {
    attributes.className = className;
  }
  return (0, node_1.default)(nodeName, null, children, attributes);
};
exports.default = element;