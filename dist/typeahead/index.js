"use strict";

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