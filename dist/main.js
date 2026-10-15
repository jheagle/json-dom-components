"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
/**
 * A minimal component library on json-dom: base HTML element factories plus richer interactive components.
 */
require("core-js/stable");
const index_1 = __importDefault(require("./clearableInput/index"));
const index_2 = __importDefault(require("./components/index"));
const index_3 = __importDefault(require("./typeahead/index"));
/**
 * Store a reference to the global scope which will be Window if rendered via browser
 */
const root = typeof window !== 'undefined' ? window : {};
const jsonDomComponents = {
  ...index_2.default,
  ...index_3.default,
  ...index_1.default
};
root.jsonDomComponents = jsonDomComponents;
module.exports = jsonDomComponents;