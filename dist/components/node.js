"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const json_dom_1 = __importDefault(require("json-dom"));
/**
 * Create the DomItem for any node, the base every other component builds on.
 * @param nodeName - Any document node name: a tag name, #text, #comment or #document.
 * @param nodeValue - The text of a text or comment node, null for elements.
 * @param children
 * @param attributes
 */
const node = (nodeName, nodeValue = null, children = [], attributes = {}) => json_dom_1.default.createDomItem({
  nodeName,
  nodeValue,
  attributes,
  children
});
exports.default = node;