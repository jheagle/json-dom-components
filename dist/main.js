"use strict";

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
/**
 * A minimal component library on treeloom: base HTML element factories plus richer interactive components.
 */
const index_1 = __importDefault(require("./clearableInput/index"));
const index_2 = __importDefault(require("./components/index"));
const index_3 = __importDefault(require("./typeahead/index"));
/**
 * Store a reference to the global scope which will be Window if rendered via browser
 */
const root = typeof window !== 'undefined' ? window : {};
const treeloomComponents = {
  ...index_2.default,
  ...index_3.default,
  ...index_1.default
};
root.treeloomComponents = treeloomComponents;
module.exports = treeloomComponents;