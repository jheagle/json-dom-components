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
/**
 * A typeahead (filterable select) built on the base components.
 */
const createTypeahead_1 = __importDefault(require("./createTypeahead"));
exports.default = {
  createTypeahead: createTypeahead_1.default
};