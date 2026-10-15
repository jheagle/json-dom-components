"use strict";

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
 * Create a text node DomItem.
 * @param nodeValue
 */
const text = (nodeValue = '') => (0, node_1.default)('#text', nodeValue);
exports.default = text;